README.md — Master System Documentation

# Master System Documentation
## jryanrussow.com + midwestguard.net Infrastructure

Last updated: 3/19/2026
Maintained by: Jesse R Russow

## System Overview

This document describes the complete technology stack
that powers both businesses.

```
INTERNET-FACING (what the public sees)
├── jryanrussow.com ........... Cloudflare Pages (static site)
├── midwestguard.net ........... Cloudflare Pages (static site)
├── cloud.jryanrussow.com ..... Nextcloud (client portal)
├── files.midwestguard.net ..... Nextcloud (business files)
├── hooks.jryanrussow.com ..... n8n (webhook endpoints only)
└── hooks.midwestguard.net ..... n8n (webhook endpoints only)

ADMIN-ONLY (accessible via Tailscale)
├── TrueNAS admin panel
├── n8n workflow builder
├── Odoo ERP (CRM, sales, projects, accounting)
├── Nextcloud admin
├── Filebrowser
├── Ollama AI API
└── SSH access to all systems

INFRASTRUCTURE
├── TrueNAS .................... Storage + Docker + VM host
├── Cloudflare ................. DNS + CDN + Tunnels + Pages
├── Tailscale .................. Zero-trust admin VPN
├── Nginx ...................... Reverse proxy
├── Docker ..................... Container runtime
└── ZFS ........................ Data storage + snapshots
```

## Data Flow: Form Submission (Detailed)

```
1. VISITOR fills out form on jryanrussow.com
   │
   │  The visitor's browser runs JavaScript (main.js)
   │  which collects the form data into a JSON object:
   │  {
   │    "name": "John Smith",
   │    "email": "john@example.com",
   │    "form_type": "application",
   │    ...
   │  }
   │
   ▼
2. JAVASCRIPT sends an HTTP POST request
   │
   │  fetch('https://hooks.jryanrussow.com/webhook/lead', {
   │    method: 'POST',
   │    headers: { 'Content-Type': 'application/json' },
   │    body: JSON.stringify(data)
   │  })
   │
   │  This request goes out over the internet
   │  to Cloudflare's servers.
   │
   ▼
3. CLOUDFLARE receives the request
   │
   │  Cloudflare sees: "This is for hooks.jryanrussow.com"
   │  It checks its DNS records and finds a CNAME:
   │    hooks.jryanrussow.com → TUNNEL-ID.cfargotunnel.com
   │
   │  Cloudflare routes the request through the tunnel
   │  to your TrueNAS server.
   │
   │  Along the way, Cloudflare:
   │  - Checks its WAF rules (blocks malicious requests)
   │  - Applies rate limiting
   │  - Handles SSL termination
   │
   ▼
4. CLOUDFLARED (on TrueNAS) receives the request
   │
   │  The cloudflared daemon on TrueNAS has a persistent
   │  outbound connection to Cloudflare. Requests come
   │  through this connection.
   │
   │  cloudflared checks its config.yml:
   │    hostname: hooks.jryanrussow.com → http://localhost:5679
   │
   │  It forwards the request to port 5679 (n8n).
   │
   ▼
5. NGINX (optional layer) receives the request
   │
   │  If you have Nginx in front of n8n, it:
   │  - Applies rate limiting
   │  - Logs the request
   │  - Forwards to n8n
   │
   │  If cloudflared points directly to n8n, skip this step.
   │
   ▼
6. N8N receives the webhook
   │
   │  n8n has a workflow with a Webhook trigger node
   │  listening at path: /webhook/lead
   │
   │  The incoming JSON data is available to all
   │  subsequent nodes in the workflow.
   │
   │  n8n runs through each step:
   │
   ├──→ 6a. CREATE ODOO LEAD
   │    │
   │    │  n8n sends an HTTP request to Odoo's API:
   │    │  POST http://localhost:8069/api/crm.lead/create
   │    │  Body: { name, email, description, source }
   │    │
   │    │  Odoo creates a new lead in the CRM pipeline.
   │    │  Returns the lead ID.
   │    │
   │    ▼
   ├──→ 6b. CREATE NEXTCLOUD FOLDER
   │    │
   │    │  n8n calls Nextcloud's WebDAV API:
   │    │  MKCOL /remote.php/dav/files/admin/Leads/John-Smith/
   │    │
   │    │  A folder is created for this lead.
   │    │  Future documents will go here.
   │    │
   │    ▼
   ├──→ 6c. SEND WELCOME EMAIL
   │    │
   │    │  n8n sends an email via SMTP:
   │    │  To: john@example.com
   │    │  From: ryan@jryanrussow.com
   │    │  Subject: "Application Received"
   │    │  Body: Confirmation + next steps
   │    │
   │    ▼
   ├──→ 6d. NOTIFY JESSE
   │    │
   │    │  n8n sends an email to jesse@midwestguard.net
   │    │  with all the lead details.
   │    │
   │    │  (Could also send a push notification,
   │    │   Slack message, SMS, etc.)
   │    │
   │    ▼
   └──→ 6e. RETURN SUCCESS
        │
        │  n8n responds to the original webhook request:
        │  HTTP 200: { "status": "success" }
        │
        │  This response travels back through:
        │  n8n → cloudflared → Cloudflare → visitor's browser
        │
        ▼
7. JAVASCRIPT receives the response
   │
   │  The fetch() promise resolves.
   │  response.ok === true
   │
   │  JavaScript redirects the browser:
   │  window.location.href = '/thank-you.html?type=application'
   │
   ▼
8. VISITOR sees the thank-you page
   │
   │  The thank-you page loads from Cloudflare Pages.
   │  JavaScript reads the URL parameter (?type=application)
   │  and shows the appropriate message.
   │
   │  Meanwhile, in the background:
   │  - A new lead exists in Odoo CRM
   │  - A folder exists in Nextcloud
   │  - The visitor got a welcome email
   │  - Jesse got a notification email
   │
   DONE ✅
```

## Data Flow: Client Onboarding (After Payment)

```
1. Jesse converts lead to "Won" in Odoo CRM
   │
   ▼
2. Odoo creates a Sales Order
   Jesse sends a Quote/Proposal to the client
   │
   ▼
3. Client signs (Odoo Sign) and pays (Stripe/PayPal)
   │
   ▼
4. n8n detects the payment (webhook from payment provider OR scheduled check)
   │
   ├──→ Creates Odoo Project from template
   │    "Compound Performance Circle — John Smith"
   │    with all 12 weekly tasks pre-loaded
   │
   ├──→ Creates Nextcloud client folder structure
   │    /Clients/John-Smith/
   │    ├── Coaching Agreement.pdf
   │    ├── Session Notes/
   │    ├── Custom Plans/
   │    ├── Progress Reports/
   │    └── Resources/
   │
   ├──→ Copies shared resources into client folder
   │    - Three-Pillar Roadmap Workbook
   │    - Body Code starter template
   │    - Mind Forge journal prompts
   │
   ├──→ Grants Nextcloud portal access
   │    Client can now log into cloud.jryanrussow.com
   │    and see their folder
   │
   ├──→ Sends onboarding email to client
   │    - Portal login instructions
   │    - First session scheduling link
   │    - What to prepare
   │
   └──→ Creates recurring calendar events
        - Weekly coaching calls
        - Monthly progress reviews
```

## Service Port Reference

| Port | Service | Access Method |
|------|---------|---------------|
| 80 | Nginx HTTP | Internal only |
| 443 | Nginx HTTPS | Internal only |
| 5679 | n8n | Tailscale + Tunnel (webhooks only) |
| 8069 | Odoo Web | Tailscale only |
| 8072 | Odoo Longpoll | Tailscale only |
| 8080 | Nextcloud | Tailscale + Tunnel |
| 8082 | Filebrowser | Tailscale only |
| 11434 | Ollama AI | Tailscale only |

## Domain DNS Records

### jryanrussow.com (Cloudflare DNS)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | @ | jryanrussow.pages.dev | Yes |
| CNAME | www | jryanrussow.pages.dev | Yes |
| CNAME | hooks | TUNNEL-ID.cfargotunnel.com | Yes |
| CNAME | cloud | TUNNEL-ID.cfargotunnel.com | Yes |
| MX | @ | (your email provider) | — |
| TXT | @ | v=spf1 ... | — |

### midwestguard.net (Cloudflare DNS)

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | @ | midwestguard.pages.dev | Yes |
| CNAME | www | midwestguard.pages.dev | Yes |
| CNAME | hooks | TUNNEL-ID.cfargotunnel.com | Yes |
| CNAME | files | TUNNEL-ID.cfargotunnel.com | Yes |
| MX | @ | (your email provider) | — |
| TXT | @ | v=spf1 ... | — |

## Backup Strategy

```
AUTOMATED (runs without you doing anything):
├── ZFS Snapshots: Every 4 hours
│   └── Keeps last 30 days of snapshots
│   └── Can restore any file to any 4-hour window
│
├── Weekly Full Backup: Sunday 2:00 AM
│   └── Compressed archive of all data
│   └── Stored on separate disk or Cloudflare R2
│
└── Monthly Off-Site: 1st of each month
    └── Encrypted backup to Cloudflare R2 (cloud storage)
    └── Keeps last 12 monthly backups

MANUAL (do these periodically):
├── Export n8n workflows as JSON (monthly)
├── Export Odoo database backup (monthly)
├── Test restore procedure (quarterly)
└── Review and clean up old data (quarterly)
```

## Credentials Storage

```
IMPORTANT: Never store credentials in plain text in these README files.

Use one of these methods:
├── Bitwarden (recommended — self-hostable)
├── KeePass database on encrypted volume
├── Environment variables in docker-compose
│   (use .env file that is NOT committed to Git)
└── Odoo's built-in credential storage

What needs credentials:
├── Cloudflare account
├── Cloudflare Tunnel token
├── Tailscale account
├── n8n admin login
├── n8n encryption key
├── Odoo admin login
├── Odoo API key
├── Nextcloud admin login
├── Nextcloud database password
├── Email SMTP credentials
├── Payment gateway API keys (Stripe/PayPal)
└── AI model API keys (if using external APIs)
```

## Emergency Procedures

### Everything is down

```
1. Check TrueNAS hardware (power, network cable)
2. Check internet connection
3. SSH into TrueNAS (locally or via Tailscale)
4. Run: docker compose ps (are containers running?)
5. Run: /mnt/pool/services/healthcheck.sh
6. Check logs: docker compose logs --tail 50
7. Restart all services: docker compose restart
8. Check Cloudflare Tunnel: systemctl status cloudflared
```

### Single service is down

```
1. Identify which service: healthcheck.sh
2. Check its logs: docker compose logs [service-name]
3. Restart it: docker compose restart [service-name]
4. If still down: docker compose down [service-name]
   then: docker compose up -d [service-name]
```

### Website is up but forms don't work

```
1. Check: Is the tunnel running? (systemctl status cloudflared)
2. Check: Is n8n running? (curl http://localhost:5679)
3. Check: Is the workflow active? (open n8n admin via Tailscale)
4. Test webhook manually: curl -X POST https://hooks.jryanrussow.com/webhook/lead \
   -H "Content-Type: application/json" \
   -d '{"name":"test","email":"test@test.com"}'
5. Check n8n execution log for errors
```

### Need to restore data from backup

```
1. List available snapshots: zfs list -t snapshot
2. Find the snapshot you want (by date)
3. Restore a single file:
   zfs diff pool/coaching@snapshot-name
   cp /mnt/pool/coaching/.zfs/snapshot/[name]/path/to/file /restore/location
4. Restore entire dataset:
   zfs rollback pool/coaching@snapshot-name
   WARNING: This removes all changes made after the snapshot
```