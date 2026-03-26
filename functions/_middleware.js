/**
 * ============================================================
 *  Cloudflare Worker — HTMLRewriter Header/Footer Injection
 *  functions/_middleware.js
 * ============================================================
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
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

  if (skip) return fetch(request);

  // ── Fetch page ────────────────────────────────────────────
  const pageResponse = await fetch(request);

  // ── Pass through non-HTML ─────────────────────────────────
  const contentType = pageResponse.headers.get('Content-Type') || '';
  if (!contentType.includes('text/html')) {
    return pageResponse;
  }

  // ── Fetch partials ────────────────────────────────────────
  const origin = url.origin;

  const [headerResponse, footerResponse] = await Promise.all([
    fetch(`${origin}/partials/header.html`),
    fetch(`${origin}/partials/footer.html`),
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