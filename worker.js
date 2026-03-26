export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    console.log('Worker hit:', url.pathname);

    const skip =
      url.pathname.startsWith('/css/') ||
      url.pathname.startsWith('/js/') ||
      url.pathname.startsWith('/partials/') ||
      url.pathname.match(
        /\.(ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|pdf|xml|txt|json)$/i
      );

    if (skip) {
      return env.ASSETS.fetch(request);
    }

    const pageResponse = await env.ASSETS.fetch(request);
    console.log('Page response status:', pageResponse.status);

    const contentType = pageResponse.headers.get('Content-Type') || '';
    if (!contentType.includes('text/html')) {
      return pageResponse;
    }

    const origin = `https://${url.hostname}`;  // ← more reliable than url.origin

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