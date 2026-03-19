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