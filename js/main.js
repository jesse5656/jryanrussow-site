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
 *  8.  Scroll Animations
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
 *  21. Footer Year
 *  22. Shared Helpers
 *  23. Init
 * ============================================================
 */


/* ============================================================
   1. CONFIG
   ============================================================ */
const CONFIG = {
  webhookBase: 'https://automation.midwestguard.net/webhook',

  webhooks: {
    contact:     '/contact-form',
    application: '/application-form',
    quiz:        '/quiz-result',
    checkin:     '/daily-checkin',
    workbook:    '/workbook-download',
  },

  toastDuration:    5000,
  animateThreshold: 0.15,
  counterDuration:  1800,
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

  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('nav-open') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeNav();
      toggle.focus();
    }
  });

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
    document.querySelectorAll('[data-modal-open]').forEach((btn) => {
      btn.addEventListener('click', () => open(btn.dataset.modalOpen));
    });

    document.querySelectorAll('[data-modal-close], .modal-close').forEach((btn) => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) close(overlay.id);
      });
    });

    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close(overlay.id);
      });
    });

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

  function show(message, type, duration) {
    type     = type     || 'info';
    duration = duration !== undefined ? duration : CONFIG.toastDuration;

    const icons = {
      success: '\u2713',
      error:   '\u2715',
      info:    '\u2139',
      warning: '\u26A0',
    };

    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.setAttribute('role', 'alert');
    toast.innerHTML =
      '<span class="toast-icon">' + (icons[type] || icons.info) + '</span>' +
      '<span class="toast-msg">'  + message + '</span>' +
      '<button class="toast-close" aria-label="Dismiss">\u00D7</button>';

    getContainer().appendChild(toast);

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        toast.classList.add('is-visible');
      });
    });

    toast.querySelector('.toast-close').addEventListener('click', function() {
      dismiss(toast);
    });

    if (duration > 0) {
      setTimeout(function() { dismiss(toast); }, duration);
    }

    return toast;
  }

  function dismiss(toast) {
    toast.classList.add('is-hiding');
    toast.addEventListener('transitionend', function() {
      toast.remove();
    }, { once: true });
  }

  return {
    show:    show,
    success: function(msg, d) { return show(msg, 'success', d); },
    error:   function(msg, d) { return show(msg, 'error',   d); },
    info:    function(msg, d) { return show(msg, 'info',     d); },
    warning: function(msg, d) { return show(msg, 'warning',  d); },
  };
})();


/* ============================================================
   8. SCROLL ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  var elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: CONFIG.animateThreshold }
  );

  elements.forEach(function(el) { observer.observe(el); });
}


/* ============================================================
   9. ANIMATED STAT COUNTERS
   ============================================================ */
function initStatCounters() {
  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(function(el) {
      el.textContent =
        (el.dataset.prefix || '') +
        el.dataset.counter +
        (el.dataset.suffix || '');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function(el) { observer.observe(el); });

  function animateCounter(el) {
    var target   = parseFloat(el.dataset.counter);
    var suffix   = el.dataset.suffix   || '';
    var prefix   = el.dataset.prefix   || '';
    var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    var duration = CONFIG.counterDuration;
    var start    = performance.now();

    function step(now) {
      var elapsed  = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var ease     = 1 - Math.pow(1 - progress, 3);
      var value    = target * ease;

      el.textContent = prefix + value.toFixed(decimals) + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
}


/* ============================================================
   10. PROGRESS BARS
   ============================================================ */
function initProgressBars() {
  document.querySelectorAll('.progress-bar[data-progress]').forEach(function(bar) {
    var value = Math.min(Math.max(parseInt(bar.dataset.progress) || 0, 0), 100);
    setTimeout(function() { bar.style.width = value + '%'; }, 100);
  });
}


/* ============================================================
   11. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;

      var target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      var header = document.querySelector('.site-header');
      var offset = header ? header.offsetHeight + 16 : 80;
      var top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
      target.focus({ preventScroll: true });
    });
  });
}


/* ============================================================
   12. ALERT DISMISS
   ============================================================ */
function initAlertDismiss() {
  document.querySelectorAll('.alert-dismiss').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var alert = btn.closest('.alert');
      if (alert) alert.classList.add('is-dismissed');
    });
  });
}


/* ============================================================
   13. QUIZ ENGINE
   ============================================================ */
function initQuiz() {
  var quizWrap = document.querySelector('.quiz-wrap');
  if (!quizWrap) return;

  var questions   = quizWrap.querySelectorAll('.quiz-question');
  var resultPane  = quizWrap.querySelector('.quiz-result');
  var progressBar = quizWrap.querySelector('.progress-bar');
  var pctLabel    = quizWrap.querySelector('.progress-pct');
  var stepTracker = quizWrap.querySelector('.step-tracker');

  if (!questions.length) return;

  var currentIndex = 0;
  var answers      = {};

  showQuestion(0);

  quizWrap.addEventListener('click', function(e) {
    if (e.target.matches('[data-quiz-next]'))    handleNext();
    if (e.target.matches('[data-quiz-back]'))    handleBack();
    if (e.target.matches('[data-quiz-restart]')) handleRestart();
  });

  quizWrap.addEventListener('change', function(e) {
    if (e.target.matches('.answer-option input[type="radio"]')) {
      var question = e.target.closest('.quiz-question');
      if (question) {
        var key = question.dataset.questionKey || currentIndex;
        answers[key] = e.target.value;
      }
    }
  });

  function showQuestion(index) {
    questions.forEach(function(q, i) {
      q.classList.toggle('is-active', i === index);
    });
    currentIndex = index;
    updateProgress();
    updateStepTracker();
  }

  function handleNext() {
    var currentQ  = questions[currentIndex];
    var required  = currentQ.dataset.required !== 'false';
    var hasAnswer = currentQ.querySelector('input:checked');
    var textInput = currentQ.querySelector('input[type="text"], textarea');
    var hasText   = textInput && textInput.value.trim().length > 0;

    if (required && !hasAnswer && !hasText) {
      Toast.warning('Please select an answer before continuing.');
      return;
    }

    var key = currentQ.dataset.questionKey || currentIndex;
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
    Object.keys(answers).forEach(function(k) { delete answers[k]; });

    quizWrap.querySelectorAll('input').forEach(function(i) {
      i.checked = false;
      if (i.type === 'text') i.value = '';
    });

    if (resultPane) resultPane.classList.remove('is-active');
    showQuestion(0);
  }

  function showResult() {
    questions.forEach(function(q) { q.classList.remove('is-active'); });

    if (resultPane) {
      resultPane.classList.add('is-active');
      updateProgress(true);
    }

    var totalPoints = Array.from(questions).reduce(function(sum, q) {
      return sum + (parseInt(q.dataset.points) || 1);
    }, 0);

    var earnedPoints = Object.keys(answers).reduce(function(sum, key) {
      var q = quizWrap.querySelector('[data-question-key="' + key + '"]');
      if (!q) return sum;
      var selected = q.querySelector('input[value="' + answers[key] + '"]');
      return sum + (parseInt(selected ? selected.dataset.points : 0) || 0);
    }, 0);

    var pct     = Math.round((earnedPoints / totalPoints) * 100) || 0;
    var scoreEl = quizWrap.querySelector('.result-score-number');
    if (scoreEl) scoreEl.textContent = pct + '%';

    submitToWebhook(CONFIG.webhooks.quiz, {
      answers:   answers,
      score:     pct,
      timestamp: new Date().toISOString(),
      page:      window.location.pathname,
    });
  }

  function updateProgress(complete) {
    var pct = complete
      ? 100
      : Math.round((currentIndex / questions.length) * 100);

    if (progressBar) progressBar.style.width = pct + '%';
    if (pctLabel)    pctLabel.textContent     = pct + '%';
  }

  function updateStepTracker() {
    if (!stepTracker) return;
    stepTracker.querySelectorAll('.step').forEach(function(step, i) {
      step.classList.toggle('active',    i === currentIndex);
      step.classList.toggle('completed', i < currentIndex);
    });
  }
}


/* ============================================================
   14. DAILY CHECK-IN
   ============================================================ */
function initDailyCheckin() {
  var form = document.getElementById('checkin-form');
  if (!form) return;

  var dateEl = form.querySelector('.checkin-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    });
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    var submitBtn = form.querySelector('[type="submit"]');
    setLoading(submitBtn, true);

    var data = {};
    new FormData(form).forEach(function(value, key) {
      data[key] = value;
    });

    form.querySelectorAll('.rating-btn.selected').forEach(function(btn) {
      var metric = btn.closest('[data-metric]');
      if (metric && metric.dataset.metric) {
        data[metric.dataset.metric] = btn.dataset.value;
      }
    });

    data.timestamp = new Date().toISOString();
    data.page      = window.location.pathname;

    var success = await submitToWebhook(CONFIG.webhooks.checkin, data);

    setLoading(submitBtn, false);

    if (success) {
      Toast.success('Check-in saved! Keep the streak alive.');
      var todayDot = document.querySelector('.streak-day.today');
      if (todayDot) todayDot.classList.add('done');
    } else {
      Toast.error('Something went wrong. Please try again.');
    }
  });
}


/* ============================================================
   15. APPLICATION FORM
   ============================================================ */
function initApplicationForm() {
  var form = document.getElementById('application-form');
  if (!form) return;

  var steps    = form.querySelectorAll('.application-section[data-step]');
  var activeStep = 0;

  if (steps.length > 1) {
    showStep(0);

    form.querySelectorAll('[data-step-next]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (validateStep(steps[activeStep])) showStep(activeStep + 1);
      });
    });

    form.querySelectorAll('[data-step-back]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        showStep(activeStep - 1);
      });
    });
  }

  function showStep(index) {
    steps.forEach(function(s, i) {
      s.style.display = i === index ? '' : 'none';
    });
    activeStep = index;

    var tracker = form.querySelector('.step-tracker');
    if (tracker) {
      tracker.querySelectorAll('.step').forEach(function(step, i) {
        step.classList.toggle('active',    i === index);
        step.classList.toggle('completed', i < index);
      });
    }

    window.scrollTo({
      top: form.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth',
    });
  }

  function validateStep(stepEl) {
    var required = stepEl.querySelectorAll('[required]');
    var valid    = true;

    required.forEach(function(field) {
      if (!field.value.trim()) {
        field.style.borderColor = 'var(--red)';
        field.addEventListener('input', function() {
          field.style.borderColor = '';
        }, { once: true });
        valid = false;
      }
    });

    if (!valid) {
      Toast.warning('Please fill in all required fields.');
      if (required[0]) required[0].focus();
    }

    return valid;
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (steps.length > 1 && !validateStep(steps[activeStep])) return;

    var submitBtn = form.querySelector('[type="submit"]');
    setLoading(submitBtn, true);

    var data = {};
    new FormData(form).forEach(function(value, key) {
      if (data[key]) {
        data[key] = [].concat(data[key], value);
      } else {
        data[key] = value;
      }
    });

    data.timestamp = new Date().toISOString();
    data.source    = window.location.href;

    var success = await submitToWebhook(CONFIG.webhooks.application, data);

    setLoading(submitBtn, false);

    if (success) {
      window.location.href = '/Thank-You-Confirmation/thank-you.html';
    } else {
      Toast.error('Submission failed. Please try again or email us directly.');
    }
  });
}


/* ============================================================
   16. CONTACT FORM
   ============================================================ */
function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    var submitBtn = form.querySelector('[type="submit"]');
    setLoading(submitBtn, true);

    var data = {};
    new FormData(form).forEach(function(value, key) { data[key] = value; });
    data.timestamp = new Date().toISOString();
    data.source    = window.location.href;

    var success = await submitToWebhook(CONFIG.webhooks.contact, data);

    setLoading(submitBtn, false);

    if (success) {
      showFormSuccess(form, 'Thanks for reaching out! I will be in touch within 24 hours.');
      form.reset();
    } else {
      showFormError(form, 'Something went wrong. Please email me directly at jesse@jryanrussow.com');
    }
  });
}


/* ============================================================
   17. WEBHOOK UTILITY
   ============================================================ */
async function submitToWebhook(path, data) {
  var url = CONFIG.webhookBase + path;

  try {
    var res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    });

    if (!res.ok) {
      console.error('[Webhook] ' + path + ' responded with status ' + res.status);
      return false;
    }

    console.info('[Webhook] ' + path + ' submitted successfully.');
    return true;

  } catch (err) {
    console.error('[Webhook] ' + path + ' network error: ' + err.message);
    return false;
  }
}


/* ============================================================
   18. CHECKIN TABS
   ============================================================ */
function initCheckinTabs() {
  var tabGroups = document.querySelectorAll('.checkin-tabs');
  if (!tabGroups.length) return;

  tabGroups.forEach(function(tabGroup) {
    var tabs   = tabGroup.querySelectorAll('.checkin-tab');
    var panels = document.querySelectorAll('.checkin-panel');

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var target = tab.dataset.tab;

        tabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });

        panels.forEach(function(p) { p.classList.remove('is-active'); });

        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        var panel = document.getElementById('checkin-panel-' + target);
        if (panel) panel.classList.add('is-active');
      });
    });

    if (tabs[0]) tabs[0].click();
  });
}


/* ============================================================
   19. RATING BUTTONS
   ============================================================ */
function initRatingButtons() {
  document.querySelectorAll('.rating-wrap').forEach(function(wrap) {
    wrap.querySelectorAll('.rating-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        wrap.querySelectorAll('.rating-btn').forEach(function(b) {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });

        btn.classList.add('selected');
        btn.setAttribute('aria-pressed', 'true');
      });
    });
  });
}


/* ============================================================
   20. PAGE LOADER
   ============================================================ */
function initPageLoader() {
  var loader = document.getElementById('page-loader');
  if (!loader) return;

  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('is-done');
      loader.addEventListener('transitionend', function() {
        loader.remove();
      }, { once: true });
    }, 300);
  });
}


/* ============================================================
   21. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ============================================================
   22. SHARED HELPERS
   ============================================================ */
function setLoading(btn, isLoading) {
  if (!btn) return;
  btn.classList.toggle('is-loading', isLoading);
  btn.disabled = isLoading;
}

function showFormSuccess(form, message) {
  removeFormMessages(form);
  var el = document.createElement('div');
  el.className = 'success-message';
  el.innerHTML = '<p>' + message + '</p>';
  form.insertAdjacentElement('beforebegin', el);
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showFormError(form, message) {
  removeFormMessages(form);
  var el = document.createElement('div');
  el.className = 'error-message';
  el.innerHTML = '<p>' + message + '</p>';
  form.insertAdjacentElement('beforebegin', el);
}

function removeFormMessages(form) {
  var parent = form.parentElement;
  parent.querySelectorAll('.success-message, .error-message').forEach(function(el) {
    el.remove();
  });
}


/* ============================================================
   23. INIT
   ============================================================
   Header and footer are injected at the edge by the
   Cloudflare Worker / middleware before the browser
   receives the HTML — so all DOM inits fire immediately.
   ============================================================ */
onReady(function() {
  initMobileNav();
  initActiveNavLink();
  initAccordions();
  Modal.init();
  initScrollAnimations();
  initStatCounters();
  initSmoothScroll();
  initAlertDismiss();
  initQuiz();
  initDailyCheckin();
  initCheckinTabs();
  initRatingButtons();
  initApplicationForm();
  initContactForm();
  initPageLoader();
  initProgressBars();
  initFooterYear();
});