// worker.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log('Worker hit:', path);

    // --- explicit skip checks ---
    const isStaticDir =
      path.startsWith('/css/') ||
      path.startsWith('/js/') ||
      path.startsWith('/images/') ||
      path.startsWith('/partials/');

    const isStaticExt = /\.(css|js|ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|pdf|xml|txt|json|map)$/i.test(path);

    if (isStaticDir || isStaticExt) {
      console.log('Skipping (static asset):', path);
      return env.ASSETS.fetch(request);
    }

    // --- HTML pages ---
    const pageResponse = await env.ASSETS.fetch(request);
    console.log('Page response status:', pageResponse.status);

    const contentType = pageResponse.headers.get('Content-Type') || '';
    if (!contentType.includes('text/html')) {
      console.log('Non-HTML, passing through:', path, contentType);
      return pageResponse;
    }

    const origin = `https://${url.hostname}`;

    const [headerResponse, footerResponse] = await Promise.all([
      env.ASSETS.fetch(`${origin}/partials/header.html`),
      env.ASSETS.fetch(`${origin}/partials/footer.html`),
    ]);

    console.log('header status:', headerResponse.status);
    console.log('footer status:', footerResponse.status);

    const [headerHTML, footerHTML] = await Promise.all([
      headerResponse.ok ? headerResponse.text() : Promise.resolve('<!-- header missing -->'),
      footerResponse.ok ? footerResponse.text() : Promise.resolve('<!-- footer missing -->'),
    ]);

    return new HTMLRewriter()
      .on('#site-header-mount', {
        element(el) { el.replace(headerHTML, { html: true }); },
      })
      .on('#site-footer-mount', {
        element(el) { el.replace(footerHTML, { html: true }); },
      })
      .transform(pageResponse);
  },
};