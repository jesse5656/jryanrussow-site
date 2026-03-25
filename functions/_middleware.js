export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── Skip non-HTML assets ──────────────────────────────────
    const skip =
      url.pathname.startsWith('/css/') ||
      url.pathname.startsWith('/js/') ||
      url.pathname.startsWith('/partials/') ||
      url.pathname.startsWith('/functions/') ||
      url.pathname.match(
        /\.(ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|pdf|xml|txt|json)$/i
      );

    if (skip) return env.ASSETS.fetch(request);

    // ── Fetch page first ──────────────────────────────────────
    const pageResponse = await env.ASSETS.fetch(request);

    // ── Pass through anything that isn't HTML ─────────────────
    const contentType = pageResponse.headers.get('Content-Type') || '';
    if (!contentType.includes('text/html')) {
      return pageResponse;
    }

    // ── Fetch partials directly from asset store ──────────────
    const origin = url.origin;

    const [headerResponse, footerResponse] = await Promise.all([
      env.ASSETS.fetch(new Request(`${origin}/partials/header.html`)),
      env.ASSETS.fetch(new Request(`${origin}/partials/footer.html`)),
    ]);

    const [headerHTML, footerHTML] = await Promise.all([
      headerResponse.ok ? headerResponse.text() : Promise.resolve('<!-- header missing -->'),
      footerResponse.ok ? footerResponse.text() : Promise.resolve('<!-- footer missing -->'),
    ]);

    // ── Rewrite mount points ──────────────────────────────────
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
  }
};