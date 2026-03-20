export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;
    if (path === '/') path = '/index.html';
    try {
      const resp = await fetch(`https://raw.githubusercontent.com/jesse5656/jryanrussow-site/main${path}`);
      if (resp.ok) {
        const contentType = path.endsWith('.html') ? 'text/html' :
                          path.endsWith('.css') ? 'text/css' :
                          path.endsWith('.js') ? 'application/javascript' :
                          'text/plain';
        return new Response(resp.body, { headers: { 'Content-Type': contentType } });
      }
    } catch (e) {}
    return new Response('404', { status: 404 });
  }
};