/**
 * ============================================================
 *  Cloudflare Pages Middleware — HTMLRewriter
 *  functions/_middleware.js
 *
 *  Intercepts every HTML page request and injects
 *  header.html + footer.html at Cloudflare's edge —
 *  before the browser ever receives the document.
 *
 *  Benefits:
 *  - Zero FOUC
 *  - Full SEO — nav in initial HTML payload
 *  - Works without JavaScript
 *  - Simpler main.js
 * ============================================================
 */

export async function onRequest(context) {
  const { request, next } = context;
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

  if (skip) return next();

  // ── Fetch page + both partials in parallel ────────────────
  const [pageResponse, headerResponse, footerResponse] = await Promise.all([
    next(),
    fetch(new URL('/partials/header.html', url.origin).href),
    fetch(new URL('/partials/footer.html', url.origin).href),
  ]);

  // ── Pass through anything that isn't HTML ─────────────────
  const contentType = pageResponse.headers.get('Content-Type') || '';
  if (!contentType.includes('text/html')) {
    return pageResponse;
  }

  // ── Read partial strings ──────────────────────────────────
  const [headerHTML, footerHTML] = await Promise.all([
    headerResponse.ok ? headerResponse.text() : Promise.resolve('<!-- header partial missing -->'),
    footerResponse.ok ? footerResponse.text() : Promise.resolve('<!-- footer partial missing -->'),
  ]);

  // ── Rewrite mount points with real HTML ───────────────────
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