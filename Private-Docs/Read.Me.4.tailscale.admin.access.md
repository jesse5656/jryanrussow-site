README.md for Tailscale Configuration

# Tailscale — Secure Admin Access

## What This Is

Tailscale is how you securely access your TrueNAS server
and all admin panels from anywhere in the world.

It creates an encrypted VPN mesh between your devices.
No ports need to be open. No VPN server to manage.

## Simple Explanation

```
Think of Tailscale as a private, invisible network
that connects all your devices together.

Your laptop, your phone, and your TrueNAS server
are all on this private network.

Nobody else can see it or access it.

Even if you're at a coffee shop, you can access
your TrueNAS admin panel as if you were sitting
right next to the server.
```

## What We Use Tailscale For

```
TAILSCALE (private admin access)
├── TrueNAS admin panel (storage management)
├── n8n admin panel (workflow builder)
├── Odoo admin panel (CRM, invoicing)
├── Nextcloud admin (user management)
├── SSH access to TrueNAS
├── Direct database access if needed
└── Any future admin tools

CLOUDFLARE TUNNEL (public access)
├── Webhook endpoints (forms)
├── Nextcloud client portals
└── Any public-facing services

Rule of thumb:
  If CLIENTS need to access it → Cloudflare Tunnel
  If only YOU need to access it → Tailscale
```

## Installation

### On TrueNAS

```bash
# SSH into TrueNAS
ssh root@[TRUENAS-LOCAL-IP]

# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Start and authenticate
sudo tailscale up

# This will print a URL
# Open it in your browser
# Log into your Tailscale account (or create one)
# Authorize the device

# Check your Tailscale IP
tailscale ip -4

# You'll get something like: 100.100.100.1
# WRITE THIS DOWN — this is how you'll access TrueNAS remotely
```

### On Your Laptop (Windows/Mac/Linux)

```
1. Go to https://tailscale.com/download
2. Download and install for your OS
3. Open Tailscale
4. Log in with the same account you used for TrueNAS
5. You're connected

Your laptop will get its own Tailscale IP (like 100.100.100.2)
```

### On Your Phone (iOS/Android)

```
1. Install "Tailscale" from App Store or Google Play
2. Log in with the same account
3. Enable the VPN when prompted
4. You can now access all your services from your phone
```

## Accessing Services via Tailscale

Once Tailscale is running on both your device and TrueNAS:

```
Replace [TRUENAS-TS-IP] with your TrueNAS Tailscale IP

TrueNAS Admin:     https://[TRUENAS-TS-IP]
n8n Admin:         http://[TRUENAS-TS-IP]:5679
Odoo Admin:        http://[TRUENAS-TS-IP]:8069
Nextcloud Admin:   http://[TRUENAS-TS-IP]:8080
Filebrowser:       http://[TRUENAS-TS-IP]:8082
AI Worker (Ollama): http://[TRUENAS-TS-IP]:11434

Example with a real IP:
  n8n → http://100.100.100.1:5679
```

## MagicDNS (Optional but Recommended)

Instead of remembering IP addresses, you can use names:

```
1. Go to https://login.tailscale.com/admin/dns
2. Enable MagicDNS
3. Now you can use device names:

   http://truenas:5679    (n8n)
   http://truenas:8069    (Odoo)
   http://truenas:8080    (Nextcloud)

   Much easier to remember!
```

## Security Best Practices

```
DO:
  ✅ Use Tailscale for all admin access
  ✅ Keep Tailscale updated on all devices
  ✅ Use the same Tailscale account across all devices
  ✅ Review connected devices monthly
  ✅ Remove old devices you no longer use

DON'T:
  ❌ Share your Tailscale account credentials
  ❌ Expose admin panels through Cloudflare Tunnel
  ❌ Open ports on your router for admin access
  ❌ Disable Tailscale's key expiry
```

## Troubleshooting

### Can't reach TrueNAS via Tailscale

```
CHECK 1: Is Tailscale running on your device?
  Look for the Tailscale icon in your system tray/menu bar

CHECK 2: Is Tailscale running on TrueNAS?
  SSH into TrueNAS locally and run:
  tailscale status
  
CHECK 3: Can you ping the TrueNAS Tailscale IP?
  ping 100.x.x.x

CHECK 4: Is the service actually running?
  The problem might not be Tailscale — the service
  (n8n, Odoo, etc.) might be stopped.
```