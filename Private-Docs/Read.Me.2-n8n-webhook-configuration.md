# n8n Webhook Bridge — Configuration Guide

## What This Is

n8n is a workflow automation tool running on our TrueNAS server.
It receives form submissions from our websites and processes them.

Think of it as the "brain" that connects our website
to our business tools (Odoo, Nextcloud, Email).

## How It Works — Simple Explanation

```
Someone fills out a form on jryanrussow.com
             │
             ▼
JavaScript sends the data to a URL
(https://hooks.jryanrussow.com/webhook/lead)
             │
             ▼
Cloudflare receives the request
and forwards it through our secure tunnel
             │
             ▼
Nginx on TrueNAS receives it
and routes it to n8n
             │
             ▼
n8n runs a workflow:
  1. Creates a lead in Odoo CRM
  2. Creates a folder in Nextcloud
  3. Sends a welcome email to the person
  4. Sends a notification to Jesse
  5. Returns "success" to the website
             │
             ▼
The visitor's browser gets the "success" response
and redirects to the thank-you page
```

## Where n8n Runs

```
Location:    TrueNAS server (Docker container)
Internal IP: http://localhost:5679
Tailscale:   http://truenas.tailnet:5679
Public:      https://hooks.jryanrussow.com (webhooks only)
             (n8n admin panel is NOT public)
```

## Accessing the n8n Admin Panel

The admin panel (where you build and edit workflows)
is only accessible through Tailscale for security.

```
1. Make sure Tailscale is connected on your device
2. Open browser
3. Go to: http://[YOUR-TRUENAS-TAILSCALE-IP]:5679
4. Log in with your n8n credentials
```

NEVER expose the admin panel to the public internet.
Only webhook endpoints are public.

## Webhook Endpoints

These are the URLs that receive form data from websites:

### For jryanrussow.com

| Endpoint | Purpose | Receives from |
|----------|---------|---------------|
| /webhook/lead | Application form | application.html |
| /webhook/contact | Contact form | contact.html |
| /webhook/quiz | Scale quiz | quiz.html |
| /webhook/workbook | Workbook download | workbook.html |

### For midwestguard.net

| Endpoint | Purpose | Receives from |
|----------|---------|---------------|
| /webhook/mwg-inquiry | Service inquiry | contact form |
| /webhook/mwg-quote | Quote request | quote form |

## Workflow Documentation

### Workflow 1: "New Lead from Website"

```
TRIGGER:  Webhook at /webhook/lead
RECEIVES: { name, email, phone, business, revenue, goals, why }

STEP 1 — Validate Data
  Check that name and email exist
  If missing → return error

STEP 2 — Create Odoo CRM Lead
  POST to Odoo API
  Create lead with:
    - Name: "Website Application: {name}"
    - Email: {email}
    - Phone: {phone}
    - Description: all form data
    - Source: "Website - Application Form"
    - Stage: "New Lead"

STEP 3 — Create Nextcloud Folder
  Create folder: /Leads/{name}-{date}/
  This will hold any future documents for this person

STEP 4 — Send Welcome Email
  To: {email}
  From: ryan@jryanrussow.com
  Subject: "Application Received — J Ryan Russow"
  Body: Confirmation message with next steps

STEP 5 — Notify Jesse
  To: jesse@midwestguard.net
  Subject: "New Application: {name}"
  Body: Full form data

STEP 6 — Return Success
  HTTP 200: { "status": "success" }
  This tells the website to redirect to thank-you page
```

### Workflow 2: "Workbook Download"

```
TRIGGER:  Webhook at /webhook/workbook
RECEIVES: { name, email }

STEP 1 — Send Email with PDF
  To: {email}
  Attach: Three_Pillar_Roadmap_Workbook.pdf
  (pulled from Nextcloud shared resources folder)

STEP 2 — Create Odoo Lead
  Tag as "Lead Magnet - Workbook"
  Lower priority than direct applications

STEP 3 — Add to Email List
  Subscribe to "Three Pillar Leads" list in Odoo

STEP 4 — Return Success
```

### Workflow 3: "Contact Form"

```
TRIGGER:  Webhook at /webhook/contact
RECEIVES: { name, email, subject, message }

STEP 1 — Send Notification to Jesse
STEP 2 — Send Confirmation to Visitor
STEP 3 — Create Odoo Lead (tagged "General Inquiry")
STEP 4 — Return Success
```

### Workflow 4: "Quiz Submission"

```
TRIGGER:  Webhook at /webhook/quiz
RECEIVES: { name, email, company, q1-q5 answers }

STEP 1 — Score the Quiz (using n8n logic or AI worker)
STEP 2 — Create Odoo Lead with score
STEP 3 — Send Personalized Results Email
STEP 4 — If score is high → tag as "Hot Lead"
STEP 5 — Return Success
```

## How to Create a New Webhook Workflow

1. Open n8n admin panel (via Tailscale)
2. Click "New Workflow"
3. Add a "Webhook" node
   - Set HTTP Method to POST
   - Set Path to your desired endpoint (e.g., "lead")
   - Note: the full URL will be
     http://localhost:5679/webhook/lead
4. Add processing nodes (Odoo, Nextcloud, Email, etc.)
5. Connect the nodes in order
6. Click "Active" toggle (top right) to enable
7. Save

## Testing Webhooks

You can test a webhook without using the website.
Open a terminal and run:

```bash
# Test the lead webhook
curl -X POST https://hooks.jryanrussow.com/webhook/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Person",
    "email": "test@example.com",
    "phone": "555-0000",
    "business": "Test Company",
    "form_type": "application"
  }'

# You should get back:
# {"status": "success"}

# Then check:
# - Odoo CRM for the new lead
# - Nextcloud for the new folder
# - Your email for the notification
```

## Troubleshooting

### Form submissions aren't arriving

```
CHECK 1: Is the tunnel running?
  ssh into TrueNAS → systemctl status cloudflared

CHECK 2: Is n8n running?
  http://[TAILSCALE-IP]:5679 — can you reach the admin panel?

CHECK 3: Is the workflow active?
  Open n8n → check that the workflow toggle is ON (green)

CHECK 4: Is the webhook path correct?
  Compare the path in main.js with the path in n8n

CHECK 5: Check n8n execution log
  Open n8n → Executions → look for errors
```

### n8n is running but webhook returns 404

```
- The workflow might not be active (toggle it on)
- The webhook path might be wrong
- n8n might need to be restarted after creating the webhook
```

### n8n is running but Odoo connection fails

```
- Check that Odoo is running on TrueNAS
- Check the Odoo API URL in the n8n node
- Check the Odoo API credentials
- Try accessing Odoo directly via Tailscale
```

## Backup

n8n workflows can be exported as JSON:

```
1. Open n8n admin panel
2. Click on a workflow
3. Click the three dots menu (top right)
4. Click "Download"
5. Save the JSON file

Store backups in:
TrueNAS: /mnt/pool/backups/n8n/
Nextcloud: /Internal/Backups/n8n/
```

## Security Notes

- The n8n admin panel is NEVER exposed to the public internet
- Only webhook endpoints (/webhook/*) are publicly accessible
- Webhook endpoints go through Cloudflare's WAF
- All traffic is encrypted (HTTPS via Cloudflare)
- Rate limiting is configured in Nginx
- Consider adding a shared secret to webhooks for extra security
  (see "Webhook Authentication" section below)

## Webhook Authentication (Optional Extra Security)

To prevent random people from sending fake data to your webhooks,
add a shared secret:

In n8n webhook node:
  - Set Header Auth
  - Header Name: X-Webhook-Secret
  - Header Value: (generate a random string)

In main.js on the website:
```javascript
headers: {
  'Content-Type': 'application/json',
  'X-Webhook-Secret': 'your-secret-here'
}
```

This way, n8n will reject any request that doesn't
include the correct secret header.