export default {
  async fetch(request) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Normalize paths: / -> /index.html, /about -> /about.html
    if (path === '/' || path.endsWith('/')) {
      path += 'index.html';
    } else if (!/\.[a-zA-Z]{2,}$/.test(path)) {
      path += '.html'; // Auto-append .html for clean URLs
    }

    // Map of content types
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf'
    };

    // Get file extension and set Content-Type
    const ext = path.match(/\.[a-zA-Z]{2,}$/)?.[0] || '';
    const contentType = mimeTypes[ext] || 'text/plain';

    try {
      // Fetch file directly from GitHub (raw)
      const response = await fetch(`https://raw.githubusercontent.com/jesse5656/jryanrussow-site/main${path}`);
      if (response.ok) {
        return new Response(response.body, {
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400', // Cache 1 day
          }
        });
      }
    } catch (e) {}

    // Fallback: Return 404 page if no match
    return new Response('404 Not Found', { status: 404 });
  }
};
