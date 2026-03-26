/**
 * Cloudflare Pages Middleware — Header/Footer Injection
 * functions/_middleware.js
 */

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // ── Skip non-HTML assets ──────────────────────────────────
  const skip =
    url.pathname.startsWith('/css/') ||
    url.pathname.startsWith('/js/') ||
    url.pathname.startsWith('/partials/') ||
    url.pathname.match(
      /\.(ico|png|jpg|jpeg|webp|svg|gif|woff|woff2|ttf|pdf|xml|txt|json)$/i
    );

  if (skip) {
    return next(request);
  }

  // ── Get the page response ─────────────────────────────────
  const response = await next(request);

  // ── Pass through non-HTML ─────────────────────────────────
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  // ── Fetch partials using ASSETS binding ───────────────────
  const [headerRes, footerRes] = await Promise.all([
    env.ASSETS.fetch('https://placeholder/partials/header.html'),
    env.ASSETS.fetch('https://placeholder/partials/footer.html'),
  ]);

  const [headerHTML, footerHTML] = await Promise.all([
    headerRes.ok ? headerRes.text() : Promise.resolve('<!-- header missing -->'),
    footerRes.ok ? footerRes.text() : Promise.resolve('<!-- footer missing -->'),
  ]);

  // ── Rewrite mount points with HTMLRewriter ────────────────
  const rewriter = new HTMLRewriter()
    .on('#site-header-mount', {
      element(el) {
        el.replace(headerHTML);
      },
    })
    .on('#site-footer-mount', {
      element(el) {
        el.replace(footerHTML);
      },
    });

  return rewriter.transform(response);
}