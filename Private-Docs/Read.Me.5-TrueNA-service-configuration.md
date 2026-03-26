README.md for Docker/VM Services

# TrueNAS Services — Setup and Configuration

## What This Is

Our TrueNAS server runs all the backend services
for both jryanrussow.com and midwestguard.net.

Each service runs in its own Docker container or VM
for isolation and easy management.

## Service Overview

```
TrueNAS Server
│
├── Docker Containers
│   ├── n8n (workflow automation)
│   │   └── Port 5679
│   ├── Nextcloud (file sharing & client portal)
│   │   └── Port 8080
│   ├── Filebrowser (simple file management)
│   │   └── Port 8082
│   ├── Nginx (reverse proxy)
│   │   └── Ports 80, 443
│   ├── Ollama (AI/LLM inference)
│   │   └── Port 11434
│   └── cloudflared (Cloudflare Tunnel)
│       └── No port (outbound only)
│
├── Virtual Machine
│   └── Odoo (CRM, Sales, Projects, Accounting)
│       └── Ports 8069, 8072
│
└── ZFS Storage
    ├── /mnt/pool/services     (container data)
    ├── /mnt/pool/coaching     (jryanrussow data)
    ├── /mnt/pool/midwestguard (MIDWESTGuard data)
    ├── /mnt/pool/backups      (automated backups)
    └── /mnt/pool/ai-models    (LLM model files)
```

## Docker Compose Configuration

Create this file at `/mnt/pool/services/docker-compose.yml`:

```yaml
version: "3.8"

services:

  # ================================
  # N8N — Workflow Automation
  # ================================
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: always
    ports:
      - "5679:5678"
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
      - WEBHOOK_URL=https://hooks.jryanrussow.com/
      - N8N_ENCRYPTION_KEY=your-random-encryption-key-here
      - GENERIC_TIMEZONE=America/Chicago
    volumes:
      - /mnt/pool/services/n8n/data:/home/node/.n8n
    networks:
      - services

  # ================================
  # NEXTCLOUD — File Sharing & Portal
  # ================================
  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: always
    ports:
      - "8080:80"
    environment:
      - MYSQL_HOST=nextcloud-db
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=your-db-password-here
      - NEXTCLOUD_ADMIN_USER=admin
      - NEXTCLOUD_ADMIN_PASSWORD=your-admin-password-here
      - NEXTCLOUD_TRUSTED_DOMAINS=cloud.jryanrussow.com files.midwestguard.net
    volumes:
      - /mnt/pool/services/nextcloud/html:/var/www/html
      - /mnt/pool/coaching:/var/www/html/data/coaching
      - /mnt/pool/midwestguard:/var/www/html/data/midwestguard
    depends_on:
      - nextcloud-db
    networks:
      - services

  nextcloud-db:
    image: mariadb:10.11
    container_name: nextcloud-db
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=your-root-password-here
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=your-db-password-here
    volumes:
      - /mnt/pool/services/nextcloud/db:/var/lib/mysql
    networks:
      - services

  # ================================
  # NGINX — Reverse Proxy
  # ================================
  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /mnt/pool/services/nginx/conf.d:/etc/nginx/conf.d
      - /mnt/pool/services/nginx/nginx.conf:/etc/nginx/nginx.conf
      - /mnt/pool/services/nginx/ssl:/etc/nginx/ssl
    networks:
      - services

  # ================================
  # FILEBROWSER — Simple File Access
  # ================================
  filebrowser:
    image: filebrowser/filebrowser:latest
    container_name: filebrowser
    restart: always
    ports:
      - "8082:80"
    volumes:
      - /mnt/pool:/srv
      - /mnt/pool/services/filebrowser/database.db:/database.db
      - /mnt/pool/services/filebrowser/config.json:/.filebrowser.json
    networks:
      - services

  # ================================
  # OLLAMA — Local AI/LLM
  # ================================
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    restart: always
    ports:
      - "11434:11434"
    volumes:
      - /mnt/pool/ai-models:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    networks:
      - services

  # ================================
  # CLOUDFLARED — Cloudflare Tunnel
  # ================================
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: always
    command: tunnel run
    environment:
      - TUNNEL_TOKEN=your-tunnel-token-here
    networks:
      - services

networks:
  services:
    driver: bridge
```

## Starting All Services

```bash
# Navigate to the docker-compose file
cd /mnt/pool/services

# Pull all images (first time or to update)
docker compose pull

# Start everything
docker compose up -d

# Check status
docker compose ps

# You should see all containers as "Up"
```

## Stopping Services

```bash
# Stop everything
docker compose down

# Stop a specific service
docker compose stop n8n

# Restart a specific service
docker compose restart nextcloud
```

## Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f n8n

# Last 100 lines
docker compose logs --tail 100 n8n
```

## ZFS Storage Layout

```bash
# Create the datasets (run once)
zfs create pool/services
zfs create pool/coaching
zfs create pool/midwestguard
zfs create pool/backups
zfs create pool/ai-models

# Create subdirectories
mkdir -p /mnt/pool/services/{n8n/data,nextcloud/html,nextcloud/db}
mkdir -p /mnt/pool/services/{nginx/conf.d,nginx/ssl}
mkdir -p /mnt/pool/services/filebrowser
mkdir -p /mnt/pool/coaching/{clients,resources,reports}
mkdir -p /mnt/pool/midwestguard/{clients,internal,hr}
mkdir -p /mnt/pool/backups/{daily,weekly,monthly}
```

## ZFS Snapshots (Automated Backups)

```bash
# Create a snapshot manually
zfs snapshot pool/coaching@$(date +%Y-%m-%d-%H%M)
zfs snapshot pool/midwestguard@$(date +%Y-%m-%d-%H%M)
zfs snapshot pool/services@$(date +%Y-%m-%d-%H%M)

# List snapshots
zfs list -t snapshot

# Automate with cron (every 4 hours)
crontab -e

# Add these lines:
0 */4 * * * zfs snapshot pool/coaching@auto-$(date +\%Y\%m\%d-\%H\%M)
0 */4 * * * zfs snapshot pool/midwestguard@auto-$(date +\%Y\%m\%d-\%H\%M)
0 */4 * * * zfs snapshot pool/services@auto-$(date +\%Y\%m\%d-\%H\%M)

# Clean up snapshots older than 30 days (add to cron)
0 3 * * * zfs list -t snapshot -o name -H | grep "auto-" | head -n -180 | xargs -r -n1 zfs destroy
```

## Updating Services

```bash
# Pull latest images
cd /mnt/pool/services
docker compose pull

# Restart with new images
docker compose up -d

# Clean up old images
docker image prune -f
```

## Odoo VM Setup

Odoo runs in a separate VM because it's resource-intensive
and benefits from its own isolated environment.

```
VM Configuration:
  OS: Ubuntu 22.04 LTS (or Debian 12)
  RAM: 4GB minimum (8GB recommended)
  CPU: 2 cores minimum
  Disk: 50GB (stored on ZFS)
  Network: Bridge mode (accessible from TrueNAS network)

After creating the VM, install Odoo:
  https://www.odoo.com/documentation/17.0/administration/install.html

Access Odoo at:
  http://[VM-IP]:8069 (local)
  http://[TRUENAS-TS-IP]:8069 (via Tailscale, with port forwarding)
```

## Service Health Check Script

Create this at `/mnt/pool/services/healthcheck.sh`:

```bash
#!/bin/bash

# Service Health Check
# Run manually or via cron to monitor services

echo "=== Service Health Check ==="
echo "Date: $(date)"
echo ""

# Check each service
services=(
  "n8n|http://localhost:5679|5679"
  "Nextcloud|http://localhost:8080|8080"
  "Filebrowser|http://localhost:8082|8082"
  "Ollama|http://localhost:11434/api/tags|11434"
  "Odoo|http://localhost:8069|8069"
)

for service in "${services[@]}"; do
  IFS='|' read -r name url port <<< "$service"
  
  response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url")
  
  if [ "$response" -ge 200 ] && [ "$response" -lt 400 ]; then
    echo "✅ $name (port $port): UP (HTTP $response)"
  else
    echo "❌ $name (port $port): DOWN (HTTP $response)"
  fi
done

echo ""

# Check Docker containers
echo "=== Docker Containers ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""

# Check disk usage
echo "=== Storage ==="
zfs list -o name,used,avail,refer | head -20

echo ""

# Check tunnel
echo "=== Cloudflare Tunnel ==="
if systemctl is-active cloudflared > /dev/null 2>&1; then
  echo "✅ Tunnel: ACTIVE"
else
  echo "❌ Tunnel: INACTIVE"
fi

# Check Tailscale
echo ""
echo "=== Tailscale ==="
tailscale status
```

Make it executable and schedule it:

```bash
chmod +x /mnt/pool/services/healthcheck.sh

# Run it manually
/mnt/pool/services/healthcheck.sh

# Schedule daily check at 7am (add to cron)
crontab -e
0 7 * * * /mnt/pool/services/healthcheck.sh | mail -s "Daily Health Check" jesse@midwestguard.net
```