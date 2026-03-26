export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const skip =
      url.pathname.startsWith('/css/') ||
      url.pathname.startsWith('/js/') ||
      url.pathname.startsWith('/partials/') ||
      url.pathname.startsWith('/functions/') ||
      url.pathname.match(
        /\.(ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|pdf|xml|txt|json)$/i
      );

    if (skip) return env.ASSETS.fetch(request);

    const pageResponse = await env.ASSETS.fetch(request);

    const contentType = pageResponse.headers.get('Content-Type') || '';
    if (!contentType.includes('text/html')) {
      return pageResponse;
    }

    const headerRequest = new Request(`${url.origin}/partials/header.html`, request);
    const footerRequest = new Request(`${url.origin}/partials/footer.html`, request);

    const [headerResponse, footerResponse] = await Promise.all([
      env.ASSETS.fetch(headerRequest),
      env.ASSETS.fetch(footerRequest),
    ]);

    console.log('header status:', headerResponse.status);
    console.log('footer status:', footerResponse.status);

    const [headerHTML, footerHTML] = await Promise.all([
      headerResponse.ok ? headerResponse.text() : Promise.resolve('<!-- header missing -->'),
      footerResponse.ok ? footerResponse.text() : Promise.resolve('<!-- footer missing -->'),
    ]);

    console.log('headerHTML length:', headerHTML.length);
    console.log('footerHTML length:', footerHTML.length);

    const rewriter = new HTMLRewriter()
      .on('#site-header-mount', {
        element(el) {
          el.replace(headerHTML, { html: true });
        },
      })
      .on('#site-footer-mount', {
        element(el) {
          el.replace(footerHTML, { html: true });
        },
      });

    return rewriter.transform(pageResponse);
  },
};