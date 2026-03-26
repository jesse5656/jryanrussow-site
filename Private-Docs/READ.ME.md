git add .
git commit -m "update"
git push origin HEAD:main
git push origin master
npx wrangler deploy

# Navigate to your project
cd /path/to/jryanrussow-site

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial site launch"

# Connect to GitHub (use the URL from your new repo)
git remote add origin https://github.com/jesse5656/jryanrussow-site.git

# Push
git branch -M main
git push -u origin main

What Problem Are We Solving?

Let me start with the fundamental issue:
YOUR WEBSITE (Cloudflare Pages)
════════════════════════════════
- It's just files sitting on Cloudflare's servers
- HTML, CSS, JavaScript — that's it
- It CANNOT run backend code
- It CANNOT connect to a database
- It CANNOT send emails
- It CANNOT create records in Odoo
- It's like a printed brochure — it just displays information

THE PROBLEM:
When someone fills out your application form and clicks "Submit"...
where does that data go?

The website itself can't DO anything with it.
It's just files. It has no brain.

The Solution: A Webhook Bridge
What Is a Webhook?
Think of it like this:

REAL WORLD ANALOGY
══════════════════

A webhook is like a mailbox with a robot behind it.

1. Someone puts a letter in the mailbox (form submission)
2. The robot behind the mailbox reads the letter
3. The robot does things based on what the letter says:
   - Files a copy in your cabinet (Odoo CRM)
   - Creates a folder with the person's name (Nextcloud)
   - Sends them a welcome letter back (email)
   - Texts you to let you know (notification)

The MAILBOX is the webhook URL
The ROBOT is n8n
The LETTER is the form data
WHAT HAPPENS WHEN SOMEONE FILLS OUT YOUR FORM
══════════════════════════════════════════════

Step 1: VISITOR
        Fills out the form on jryanrussow.com
        (this page is hosted on Cloudflare Pages)

Step 2: JAVASCRIPT
        Your main.js code collects all the form data
        and sends it as a message to a specific URL

        That URL looks like:
        https://hooks.jryanrussow.com/webhook/lead

Step 3: CLOUDFLARE TUNNEL
        That URL actually points to your TrueNAS server
        through a secure Cloudflare Tunnel
        (no ports open on your router — completely safe)

Step 4: N8N
        n8n is running on your TrueNAS
        It's listening for messages at /webhook/lead
        When a message arrives, it wakes up and processes it

Step 5: N8N DOES THINGS
        Based on your workflow, n8n:
        ├── Creates a lead in Odoo CRM
        ├── Creates a folder in Nextcloud
        ├── Sends you an email notification
        ├── Sends the visitor a confirmation email
        └── Whatever else you've configured

Step 6: VISITOR
        Gets redirected to your thank-you page
        They never knew any of this happened
        It all took about 2-3 seconds

┌──────────────────────────────────────────────────┐
│              VISITOR'S BROWSER                    │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │  jryanrussow.com/application.html    │         │
│  │                                      │         │
│  │  Name: [John Smith          ]        │         │
│  │  Email: [john@example.com   ]        │         │
│  │  Message: [I want to join   ]        │         │
│  │                                      │         │
│  │  [ Submit Application ]              │         │
│  └──────────────┬───────────────────────┘         │
│                 │                                   │
│                 │ User clicks submit                │
│                 │ JavaScript collects form data     │
│                 │ Sends POST request                │
└─────────────────┼──────────────────────────────────┘
                  │
                  │  HTTPS POST to:
                  │  hooks.jryanrussow.com/webhook/lead
                  │
                  │  Body (JSON):
                  │  {
                  │    "name": "John Smith",
                  │    "email": "john@example.com",
                  │    "message": "I want to join"
                  │  }
                  │
                  ▼
┌──────────────────────────────────────────────────┐
│              CLOUDFLARE                           │
│                                                    │
│  DNS: hooks.jryanrussow.com                       │
│  → Routes through Cloudflare Tunnel               │
│  → Encrypted connection to your TrueNAS           │
│                                                    │
│  No ports open on your router                      │
│  No IP address exposed                             │
│  DDoS protection included                          │
│  SSL/TLS handled automatically                     │
└──────────────────┬───────────────────────────────┘
                   │
                   │  Secure tunnel
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│              YOUR TRUENAS SERVER                  │
│                                                    │
│  ┌─────────────────────────────────────┐         │
│  │  NGINX (reverse proxy)              │         │
│  │  Receives request                    │         │
│  │  Routes to n8n based on hostname     │         │
│  └──────────────┬──────────────────────┘         │
│                 │                                   │
│                 ▼                                   │
│  ┌─────────────────────────────────────┐         │
│  │  N8N (workflow automation)          │         │
│  │                                      │         │
│  │  Webhook received!                   │         │
│  │  Running workflow "New Lead"...      │         │
│  │                                      │         │
│  │  ┌─────────────────────────────┐    │         │
│  │  │ Step 1: Create Odoo Lead    │    │         │
│  │  │ Step 2: Create NC Folder    │    │         │
│  │  │ Step 3: Send Welcome Email  │    │         │
│  │  │ Step 4: Notify Jesse        │    │         │
│  │  │ Step 5: Return "success"    │    │         │
│  │  └─────────────────────────────┘    │         │
│  └──────────────┬──────────────────────┘         │
│                 │                                   │
│     ┌───────────┼────────────┐                     │
│     │           │            │                      │
│     ▼           ▼            ▼                      │
│  ┌──────┐  ┌────────┐  ┌─────────┐               │
│  │ Odoo │  │Nextclou│  │ Email   │               │
│  │ CRM  │  │d       │  │ Server  │               │
│  │      │  │        │  │         │               │
│  │Lead  │  │Folder  │  │Welcome  │               │
│  │create│  │created │  │email    │               │
│  │d     │  │        │  │sent     │               │
│  └──────┘  └────────┘  └─────────┘               │
│                                                    │
└──────────────────────────────────────────────────┘
                  │
                  │  n8n returns: {"status": "success"}
                  │
                  ▼
┌──────────────────────────────────────────────────┐
│              VISITOR'S BROWSER                    │
│                                                    │
│  JavaScript receives "success" response            │
│  Redirects visitor to:                             │
│  jryanrussow.com/thank-you.html                   │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │  "Thank you! Your application has    │         │
│  │   been received. I'll be in touch    │         │
│  │   within 48 hours."                  │         │
│  └──────────────────────────────────────┘         │
│                                                    │
└──────────────────────────────────────────────────┘

##How Each Piece Work --- In Plain English##

#1 The Form (HTML)
<!-- This lives in application.html on Cloudflare Pages -->
<form id="applicationForm">
  <label>Your Name</label>
  <input type="text" name="name" required />

  <label>Your Email</label>
  <input type="email" name="email" required />

  <label>Why do you want to join?</label>
  <textarea name="why" required></textarea>

  <button type="submit">Submit Application</button>
</form>

#2 The JavaScript (main.js)
This is the code that catches the form submission and sends it to your server:
javascript

// When the page loads, find the form
const form = document.getElementById('applicationForm');

// When someone clicks "Submit"
form.addEventListener('submit', async function(event) {

  // STOP the form from doing the normal browser thing
  // (which would refresh the page)
  event.preventDefault();

  // COLLECT all the form data
  const formData = new FormData(form);

  // CONVERT it to a simple JavaScript object
  // { name: "John Smith", email: "john@example.com", why: "..." }
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  // SEND it to your n8n webhook
  // This URL points to YOUR server through Cloudflare Tunnel
  const response = await fetch('https://hooks.jryanrussow.com/webhook/lead', {
    method: 'POST',                              // "I'm sending data"
    headers: { 'Content-Type': 'application/json' }, // "It's in JSON format"
    body: JSON.stringify(data)                    // The actual data
  });

  // If n8n says "got it!"
  if (response.ok) {
    // Send visitor to thank you page
    window.location.href = '/thank-you.html';
  } else {
    // Something went wrong — show error
    alert('Something went wrong. Please email jesse@midwestguard.net');
  }

});
What fetch does: It sends an invisible HTTP request from the visitor's browser to your server. The visitor doesn't see anything — they just see a loading state on the button, then they get redirected.

#3 Cloudflare Tunnel

This is how the internet reaches your TrueNAS without opening any ports:

WITHOUT A TUNNEL (dangerous — don't do this):
══════════════════════════════════════════════
Internet → Your Public IP → Open Port 5679 → n8n

Problems:
- Your home IP is exposed
- Port 5679 is open to the entire internet
- Hackers can scan and find it
- DDoS attacks hit your home connection
- No WAF protection


WITH CLOUDFLARE TUNNEL (what we're doing):
══════════════════════════════════════════════
Internet → Cloudflare's servers → Encrypted tunnel → Your TrueNAS → n8n

Benefits:
- Your IP is NEVER exposed
- ZERO open ports on your router
- Cloudflare's DDoS protection
- Cloudflare's WAF (web application firewall)
- Free SSL certificates
- Works even if your ISP changes your IP

How it works:
- You install "cloudflared" on your TrueNAS
- It creates an OUTBOUND connection to Cloudflare
  (outbound = your server calls Cloudflare, not the other way)
- Since it's outbound, no ports need to be open
- Cloudflare receives requests for hooks.jryanrussow.com
  and forwards them through the tunnel to your server



#4 n8n (The Brain)
N8N WORKFLOW: "New Lead from Website"
═════════════════════════════════════

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│          │    │          │    │          │    │          │
│ Webhook  │───→│ Create   │───→│ Create   │───→│  Send    │
│ Trigger  │    │ Odoo     │    │Nextcloud │    │  Email   │
│          │    │ Lead     │    │ Folder   │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │
     │ This block LISTENS for
     │ incoming data at:
     │ /webhook/lead
     │
     │ When data arrives, it
     │ passes it to the next block

Each block is configured in n8n's visual editor.
You drag, drop, and connect blocks.
No code required for most workflows.