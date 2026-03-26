# jryanrussow.com — Website

## What This Is

The personal brand and coaching website for J Ryan Russow.
Static HTML/CSS/JS site hosted on Cloudflare Pages.

## How It Works

```
This website is a collection of HTML files.
It has no backend, no database, no server-side code.

When someone fills out a form:
1. JavaScript collects the form data
2. JavaScript sends it to our n8n server via webhook
3. n8n processes it (creates CRM leads, sends emails, etc.)
4. The visitor sees a thank-you page

The webhook URL is configured in js/main.js
```

## File Structure

```
jryanrussow-site/
│
├── index.html                 ← Homepage
├── about.html                 ← About page
├── compound-circle.html       ← Premium coaching offer
├── three-pillar-method.html   ← Wealth building pillar
├── body-code.html             ← Strength training pillar
├── mind-forge.html            ← Mindset pillar
├── application.html           ← Application form
├── contact.html               ← Contact form
├── quiz.html                  ← Lead magnet quiz
├── workbook.html              ← Workbook download form
├── thank-you.html             ← Post-submission confirmation
├── privacy.html               ← Privacy policy
├── 404.html                   ← Error page
│
├── css/
│   └── styles.css             ← All site styles
│
├── js/
│   └── main.js                ← Form handling + navigation
│
├── assets/
│   ├── images/                ← Photos, logo, og-image
│   └── downloads/
│       └── Three_Pillar_Roadmap_Workbook.pdf
│
├── _headers                   ← Cloudflare security headers
├── _redirects                 ← Cloudflare URL redirects
├── robots.txt                 ← Search engine instructions
├── sitemap.xml                ← Page list for search engines
├── .gitignore                 ← Files Git should ignore
└── README.md                  ← This file
```

## Prerequisites

- A computer with a web browser
- VSCodium installed (https://vscodium.com)
- Git installed (https://git-scm.com)
- A GitHub account (https://github.com)
- A Cloudflare account (https://cloudflare.com)

## How to Edit the Site

### 1. Open in VSCodium

```bash
# Open your terminal
cd /path/to/jryanrussow-site
codium .
```

Or: Open VSCodium → File → Open Folder → select jryanrussow-site

### 2. Edit any file

All files are plain text. Edit them like any document.
- HTML files = content and structure
- css/styles.css = colors, fonts, layout
- js/main.js = form handling and interactivity

### 3. Preview locally

Open index.html directly in your browser:
- Double-click the file, OR
- Right-click → Open With → your browser

Note: Forms won't actually submit locally (no webhook to receive them).
Everything else will work.

### 4. Save and deploy

```bash
# In terminal (or use VSCodium's built-in Git panel):
git add .
git commit -m "Describe what you changed"
git push
```

Cloudflare Pages will automatically detect the change and redeploy.
Takes about 30-60 seconds.

## Configuration

### Webhook URL

The forms send data to your self-hosted n8n instance.
This URL is configured in `js/main.js`:

```javascript
const CONFIG = {
  webhookBase: 'https://hooks.jryanrussow.com/webhook',
};
```

Change this URL if your webhook endpoint changes.

### Form Types

Each form sends a hidden `form_type` field so n8n knows
what kind of submission it is:

| Form | form_type value | Webhook path |
|------|----------------|--------------|
| Application | application | /webhook/lead |
| Contact | contact | /webhook/contact |
| Quiz | scale_quiz | /webhook/quiz |
| Workbook | workbook_download | /webhook/workbook |

## Deployment

This site is deployed on Cloudflare Pages.
It auto-deploys when you push to the `main` branch on GitHub.

### First-time setup:

1. Push code to GitHub
2. Log into dash.cloudflare.com
3. Workers & Pages → Create → Pages → Connect to Git
4. Select this repository
5. Build command: (leave empty)
6. Build output: (leave empty)
7. Deploy

### Custom domain:

1. In Cloudflare Pages → your project → Custom domains
2. Add: jryanrussow.com
3. Add: www.jryanrussow.com
4. SSL is automatic

## Dependencies

This site has ZERO dependencies.
No npm. No node_modules. No build step.
Just files.

The only external resource is Google Fonts (Inter),
loaded via CSS.

## Related Systems

This website is part of a larger infrastructure:

| System | Purpose | Location |
|--------|---------|----------|
| Cloudflare Pages | Hosts this website | cloudflare.com |
| n8n | Processes form submissions | TrueNAS server |
| Odoo | CRM, invoicing, projects | TrueNAS server |
| Nextcloud | Client file portal | TrueNAS server |
| Cloudflare Tunnel | Connects website to TrueNAS | TrueNAS server |

See the infrastructure README for details on each system.

## Contact

Jesse R Russow
jesse@midwestguard.net