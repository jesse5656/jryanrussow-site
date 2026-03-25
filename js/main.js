/**
 * ============================================================
 *  J RYAN RUSSOW — main.js
 *  js/main.js
 *
 *  TABLE OF CONTENTS:
 *  1.  Config
 *  2.  DOM Ready Helper
 *  3.  Mobile Navigation
 *  4.  Active Nav Link
 *  5.  Accordion
 *  6.  Modal
 *  7.  Toast Notifications
 *  8.  Scroll Animations (IntersectionObserver)
 *  9.  Animated Stat Counters
 *  10. Progress Bars
 *  11. Smooth Scroll
 *  12. Alert Dismiss
 *  13. Quiz Engine
 *  14. Daily Check-In
 *  15. Application Form
 *  16. Contact Form
 *  17. Webhook Utility
 *  18. Checkin Tabs
 *  19. Rating Buttons
 *  20. Page Loader
 *  21. Shared Helpers
 *  22. Init
 * ============================================================
 */


/* ============================================================
   1. CONFIG
   ============================================================ */
const CONFIG = {
  /** n8n webhook base — your Cloudflare tunnel URL */
  webhookBase: 'https://your-n8n-instance.com/webhook',

  /** Individual webhook paths */
  webhooks: {
    contact:     '/contact-form',
    application: '/application-form',
    quiz:        '/quiz-result',
    checkin:     '/daily-checkin',
    workbook:    '/workbook-download',
  },

  /** Toast auto-dismiss duration (ms) */
  toastDuration: 5000,

  /** IntersectionObserver threshold */
  animateThreshold: 0.15,

  /** Stat counter animation duration (ms) */
  counterDuration: 1800,
};


/* ============================================================
   2. DOM READY HELPER
   ============================================================ */
function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}


/* ============================================================
   3. MOBILE NAVIGATION
   ============================================================ */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('nav-open') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeNav();
      toggle.focus();
    }
  });

  // Close when a nav link is clicked
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });

  function closeNav() {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}


/* ============================================================
   4. ACTIVE NAV LINK
   ============================================================ */
function initActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelectorAll('.nav-link').forEach((link) => {
    // Skip external links
    if (link.hostname !== window.location.hostname) return;

    const linkPath = new URL(link.href, window.location.origin)
      .pathname.replace(/\/$/, '') || '/';

    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}


/* ============================================================
   5. ACCORDION
   ============================================================ */
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const bodyId   = trigger.getAttribute('aria-controls');
      const body     = bodyId ? document.getElementById(bodyId) : null;

      if (!body) return;

      // Close siblings unless accordion has class "accordion-multi"
      const accordion = trigger.closest('.accordion');
      if (accordion && !accordion.classList.contains('accordion-multi')) {
        accordion.querySelectorAll('.accordion-trigger').forEach((t) => {
          if (t !== trigger) {
            t.setAttribute('aria-expanded', 'false');
            const sibId   = t.getAttribute('aria-controls');
            const sibBody = sibId ? document.getElementById(sibId) : null;
            if (sibBody) sibBody.classList.remove('is-open');
          }
        });
      }

      // Toggle current item
      trigger.setAttribute('aria-expanded', String(!expanded));
      body.classList.toggle('is-open', !expanded);
    });
  });
}


/* ============================================================
   6. MODAL
   ============================================================ */
const Modal = (() => {
  let activeModal = null;

  function open(modalId) {
    const overlay = document.getElementById(modalId);
    if (!overlay) return;

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = overlay;

    // Focus first focusable element inside
    const focusable = overlay.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) setTimeout(() => focusable.focus(), 50);
  }

  function close(modalId) {
    const overlay = modalId
      ? document.getElementById(modalId)
      : activeModal;

    if (!overlay) return;

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModal = null;
  }

  function init() {
    // Open triggers: <button data-modal-open="modal-id">
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      btn.addEventListener('click', () => open(btn.dataset.modalOpen));
    });

    // Close buttons inside modals
    document.querySelectorAll('[data-modal-close], .modal-close').forEach((btn) => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) close(overlay.id);
      });
    });

    // Click backdrop to close
    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(overlay.id);
      });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) close();
    });
  }

  return { init, open, close };
})();


/* ============================================================
   7. TOAST NOTIFICATIONS
   ============================================================ */
const Toast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('role', 'region');
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * @param {string}  message
   * @param {'success'|'error'|'info'|'warning'} type
   * @param {number}  [duration]
   */
  function show(message, type = 'info', duration = CONFIG.toastDuration) {
    const icons = {
      success: '✓',
      error:   '✕',
      info:    'ℹ',
      warning: '⚠',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-msg">${message}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    getContainer().appendChild(toast);

    // Double rAF ensures transition fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('is-visible'));
    });

    toast.querySelector('.toast-close').addEventListener('click', () => {
      dismiss(toast);
    });

    if (duration > 0) {
      setTimeout(() => dismiss(toast), duration);
    }

    return toast;
  }

  function dismiss(toast) {
    toast.classList.add('is-hiding');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }

  return {
    show,
    success: (msg, d) => show(msg, 'success', d),
    error:   (msg, d) => show(msg, 'error',   d),
    info:    (msg, d) => show(msg, 'info',     d),
    warning: (msg, d) => show(msg, 'warning',  d),
  };
})();


/* ============================================================
   8. SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: CONFIG.animateThreshold }
  );

  elements.forEach((el) => observer.observe(el));
}


/* ============================================================
   9. ANIMATED STAT COUNTERS
   ============================================================
   Usage: <span data-counter="247" data-suffix="+" data-prefix="$"></span>
   ============================================================ */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach((el) => {
      el.textContent =
        (el.dataset.prefix || '') +
        el.dataset.counter +
        (el.dataset.suffix || '');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.counter);
    const suffix   = el.dataset.suffix   || '';
    const prefix   = el.dataset.prefix   || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = CONFIG.counterDuration;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease     = 1 - Math.pow(1 - progress, 3);
      const value    = target * ease;

      el.textContent = prefix + value.toFixed(decimals) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
}


/* ============================================================
   10. PROGRESS BARS
   ============================================================
   Usage: <div class="progress-bar" data-progress="65"></div>
   ============================================================ */
function initProgressBars() {
  document.querySelectorAll('.progress-bar[data-progress]').forEach((bar) => {
    const value = Math.min(
      Math.max(parseInt(bar.dataset.progress) || 0, 0),
      100
    );
    setTimeout(() => { bar.style.width = `${value}%`; }, 100);
  });
}


/* ============================================================
   11. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      // Account for sticky header height
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight + 16 : 80;
      const top    = target.getBoundingClientRect().top
                     + window.scrollY
                     - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      target.focus({ preventScroll: true });
    });
  });
}


/* ============================================================
   12. ALERT DISMISS
   ============================================================ */
function initAlertDismiss() {
  document.querySelectorAll('.alert-dismiss').forEach((btn) => {
    btn.addEventListener('click', () => {
      const alert = btn.closest('.alert');
      if (alert) alert.classList.add('is-dismissed');
    });
  });
}


/* ============================================================
   13. QUIZ ENGINE
   ============================================================ */
function initQuiz() {
  const quizWrap = document.querySelector('.quiz-wrap');
  if (!quizWrap) return;

  const questions   = quizWrap.querySelectorAll('.quiz-question');
  const resultPane  = quizWrap.querySelector('.quiz-result');
  const progressBar = quizWrap.querySelector('.progress-bar');
  const pctLabel    = quizWrap.querySelector('.progress-pct');
  const stepTracker = quizWrap.querySelector('.step-tracker');

  if (!questions.length) return;

  let currentIndex = 0;
  const answers    = {};

  showQuestion(0);

  // Button delegation
  quizWrap.addEventListener('click', (e) => {
    if (e.target.matches('[data-quiz-next]'))    handleNext();
    if (e.target.matches('[data-quiz-back]'))    handleBack();
    if (e.target.matches('[data-quiz-restart]')) handleRestart();
  });

  // Store radio answers on change
  quizWrap.addEventListener('change', (e) => {
    if (e.target.matches('.answer-option input[type="radio"]')) {
      const question = e.target.closest('.quiz-question');
      if (question) {
        const key = question.dataset.questionKey || currentIndex;
        answers[key] = e.target.value;
      }
    }
  });

  function showQuestion(index) {
    questions.forEach((q, i) => q.classList.toggle('is-active', i === index));
    currentIndex = index;
    updateProgress();
    updateStepTracker();
  }

  function handleNext() {
    const currentQ  = questions[currentIndex];
    const required  = currentQ.dataset.required !== 'false';
    const hasAnswer = currentQ.querySelector('input:checked');
    const textInput = currentQ.querySelector('input[type="text"], textarea');
    const hasText   = textInput && textInput.value.trim().length > 0;

    if (required && !hasAnswer && !hasText) {
      Toast.warning('Please select an answer before continuing.');
      return;
    }

    const key = currentQ.dataset.questionKey || currentIndex;
    if (hasAnswer) answers[key] = hasAnswer.value;
    if (hasText)   answers[key] = textInput.value.trim();

    if (currentIndex < questions.length - 1) {
      showQuestion(currentIndex + 1);
    } else {
      showResult();
    }
  }

  function handleBack() {
    if (currentIndex > 0) showQuestion(currentIndex - 1);
  }

  function handleRestart() {
    Object.keys(answers).forEach((k) => delete answers[k]);

    quizWrap.querySelectorAll('input').forEach((i) => {
      i.checked = false;
      if (i.type === 'text') i.value = '';
    });

    if (resultPane) resultPane.classList.remove('is-active');
    showQuestion(0);
  }

  function showResult() {
    questions.forEach((q) => q.classList.remove('is-active'));

    if (resultPane) {
      resultPane.classList.add('is-active');
      updateProgress(true);
    }

    // Calculate score
    const totalPoints = Array.from(questions).reduce((sum, q) => {
      return sum + (parseInt(q.dataset.points) || 1);
    }, 0);

    const earnedPoints = Object.keys(answers).reduce((sum, key) => {
      const q = quizWrap.querySelector(`[data-question-key="${key}"]`);
      if (!q) return sum;
      const selected = q.querySelector(`input[value="${answers[key]}"]`);
      return sum + (parseInt(selected?.dataset.points) || 0);
    }, 0);

    const pct     = Math.round((earnedPoints / totalPoints) * 100) || 0;
    const scoreEl = quizWrap.querySelector('.result-score-number