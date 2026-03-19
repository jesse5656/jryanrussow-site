README.md for Cloudflare Tunnel Setup

# Cloudflare Tunnel — Setup Guide

## What This Is

Cloudflare Tunnel creates a secure connection between
our TrueNAS server and Cloudflare's network.

This allows our websites to talk to our server
WITHOUT opening any ports on our router.

## Why We Need This

```
Our websites (jryanrussow.com, midwestguard.net)
are hosted on Cloudflare Pages — they're just static files.

Our business tools (n8n, Odoo, Nextcloud)
run on our TrueNAS server at home/office.

The tunnel connects them securely.
```

## How It Works — Simple Version

```
Normal (dangerous) way:
  Internet → Open port on router → Your server
  Problem: Hackers can find and attack open ports

Cloudflare Tunnel (safe) way:
  Your server → Outbound connection to Cloudflare → Internet
  
  The connection goes FROM your server TO Cloudflare.
  Since it's outbound, no ports need to be open.
  Cloudflare handles all incoming traffic.
```

## What We're Exposing Through the Tunnel

| Subdomain | Points To | Purpose |
|-----------|-----------|---------|
| hooks.jryanrussow.com | n8n webhook endpoints | Receive form data |
| cloud.jryanrussow.com | Nextcloud | Client file portal |
| hooks.midwestguard.net | n8n webhook endpoints | Receive form data |
| files.midwestguard.net | Nextcloud | Business file portal |

Things we are NOT exposing through the tunnel:
- n8n admin panel (Tailscale only)
- Odoo admin (Tailscale only)
- TrueNAS admin (Tailscale only)
- Any internal management tools

## Installation

### Step 1: Install cloudflared on TrueNAS

```bash
# SSH into your TrueNAS server
ssh root@[TRUENAS-IP]

# For TrueNAS SCALE (Debian-based):
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg \
  | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] \
  https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" \
  | sudo tee /etc/apt/sources.list.d/cloudflared.list

sudo apt update
sudo apt install cloudflared

# Verify installation
cloudflared --version
```

### Step 2: Authenticate with Cloudflare

```bash
cloudflared tunnel login

# This will print a URL
# Open that URL in your browser
# Log into your Cloudflare account
# Select the domain you want to use
# A certificate will be downloaded to your server
```

### Step 3: Create the Tunnel

```bash
# Create a tunnel (pick a name you'll remember)
cloudflared tunnel create jrr-services

# This creates:
# - A tunnel ID (like a3b2c1d4-e5f6-...)
# - A credentials file at ~/.cloudflared/<tunnel-id>.json
#
# SAVE THE TUNNEL ID — you'll need it for the config file
```

### Step 4: Create the Configuration File

```bash
nano ~/.cloudflared/config.yml
```

Paste this (replace YOUR-TUNNEL-ID):

```yaml
tunnel: YOUR-TUNNEL-ID
credentials-file: /root/.cloudflared/YOUR-TUNNEL-ID.json

ingress:
  # n8n webhooks for jryanrussow.com
  - hostname: hooks.jryanrussow.com
    service: http://localhost:5679
    originRequest:
      noTLSVerify: true

  # Nextcloud for coaching clients
  - hostname: cloud.jryanrussow.com
      service: http://localhost:8080
    originRequest:
      noTLSVerify: true

  # n8n webhooks for midwestguard.net
  - hostname: hooks.midwestguard.net
    service: http://localhost:5679
    originRequest:
      noTLSVerify: true

  # Nextcloud for MIDWESTGuard
  - hostname: files.midwestguard.net
    service: http://localhost:8080
    originRequest:
      noTLSVerify: true

  # Catch-all: return 404 for anything else
  - service: http_status:404
```

### Step 5: Create DNS Records

```bash
# These commands tell Cloudflare which subdomains
# should route through your tunnel

cloudflared tunnel route dns jrr-services hooks.jryanrussow.com
cloudflared tunnel route dns jrr-services cloud.jryanrussow.com
cloudflared tunnel route dns jrr-services hooks.midwestguard.net
cloudflared tunnel route dns jrr-services files.midwestguard.net

# Verify in Cloudflare dashboard:
# DNS → you should see CNAME records pointing to
# YOUR-TUNNEL-ID.cfargotunnel.com
```

### Step 6: Test the Tunnel

```bash
# Run the tunnel manually first to check for errors
cloudflared tunnel run jrr-services

# You should see output like:
# INF Starting tunnel
# INF Connection established connIndex=0
# INF Connection established connIndex=1
# INF Connection established connIndex=2
# INF Connection established connIndex=3
#
# 4 connections = healthy tunnel

# In another terminal (or from your laptop), test:
curl https://hooks.jryanrussow.com/webhook/test

# If n8n is running, you should get a response
# If not, you'll get a 502 or 503 (that's okay —
# it means the tunnel works but n8n isn't ready yet)

# Press Ctrl+C to stop the tunnel when done testing
```

### Step 7: Install as a System Service

```bash
# This makes the tunnel start automatically when TrueNAS boots

sudo cloudflared service install

# Start it now
sudo systemctl start cloudflared

# Enable it to start on boot
sudo systemctl enable cloudflared

# Check status
sudo systemctl status cloudflared

# You should see:
# Active: active (running)
```

## Maintenance

### Check tunnel status

```bash
# From TrueNAS terminal
sudo systemctl status cloudflared

# From Cloudflare dashboard
# Go to: Zero Trust → Networks → Tunnels
# Your tunnel should show "HEALTHY" with green dot
```

### Restart the tunnel

```bash
sudo systemctl restart cloudflared
```

### View tunnel logs

```bash
sudo journalctl -u cloudflared -f

# -f means "follow" — shows new logs in real time
# Press Ctrl+C to stop watching
```

### Update cloudflared

```bash
sudo apt update
sudo apt upgrade cloudflared
sudo systemctl restart cloudflared
```

## Adding a New Service to the Tunnel

If you add a new service to TrueNAS and want to expose it:

```bash
# 1. Edit the config
nano ~/.cloudflared/config.yml

# 2. Add a new entry ABOVE the catch-all:
#   - hostname: newservice.jryanrussow.com
#     service: http://localhost:PORT_NUMBER

# 3. Create the DNS record
cloudflared tunnel route dns jrr-services newservice.jryanrussow.com

# 4. Restart the tunnel
sudo systemctl restart cloudflared
```

## Security Notes

- The tunnel only exposes what you list in config.yml
- Everything else on TrueNAS is invisible to the internet
- All traffic through the tunnel is encrypted
- Cloudflare's WAF and DDoS protection apply automatically
- For admin access to n8n/Odoo/TrueNAS, use Tailscale instead

## Troubleshooting

### Tunnel won't start

```
CHECK: Is cloudflared installed?
  cloudflared --version

CHECK: Does the credentials file exist?
  ls ~/.cloudflared/
  You should see: config.yml and a .json file

CHECK: Is the config.yml valid?
  cloudflared tunnel run jrr-services
  Look for error messages
```

### Tunnel is running but sites return 502

```
This means the tunnel works but the service behind it doesn't.

CHECK: Is the service running?
  For n8n: curl http://localhost:5679
  For Nextcloud: curl http://localhost:8080

If those return errors, fix the service first.
The tunnel is fine.
```

### DNS not resolving

```
CHECK: Did you create the DNS route?
  cloudflared tunnel route dns jrr-services hooks.jryanrussow.com

CHECK: In Cloudflare dashboard → DNS
  Look for a CNAME record for "hooks"
  It should point to YOUR-TUNNEL-ID.cfargotunnel.com

If missing, run the route command again.
DNS changes can take up to 5 minutes to propagate.
```