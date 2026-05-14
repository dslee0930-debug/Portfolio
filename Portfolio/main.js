/* ============================================
   MAIN.JS — Cursor / Scroll / Theme
   ============================================ */

/* ── Cursor ──────────────────────────────── */
(function initCursor() {
  const glow = document.querySelector('.c-cursor-glow');
  const dot  = document.querySelector('.c-cursor-dot');
  if (!glow || !dot) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    cx += (mx - cx) * 0.07;
    cy += (my - cy) * 0.07;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .c-exp-item, .c-skill-row, .c-lang-row, .c-work-thumb').forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('c-cursor-glow--hover'));
    el.addEventListener('mouseleave', () => glow.classList.remove('c-cursor-glow--hover'));
  });
})();

/* ── Scroll Reveal ───────────────────────── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.fi');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); });
  }, { threshold: 0.08 });

  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 7) * 0.055 + 's';
    observer.observe(el);
  });
})();

/* ── Theme Toggle ────────────────────────── */
(function initTheme() {
  const html   = document.documentElement;
  const toggle = document.querySelector('.c-theme-toggle');
  if (!toggle) return;

  /* Persist preference */
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateIcon(saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    toggle.textContent = theme === 'dark' ? '☀' : '◑';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
})();

/* ── Language Switcher ───────────────────── */
(function initLang() {
  document.querySelectorAll('.c-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.c-lang-btn').forEach(b => b.classList.remove('c-lang-btn--active'));
      btn.classList.add('c-lang-btn--active');
    });
  });
})();

/* ── Active Nav Link ─────────────────────── */
(function initActiveNav() {
  const links    = document.querySelectorAll('.c-nav__link[href^="#"]');
  const sections = [];

  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link });
  });

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const match = sections.find(s => s.el === e.target);
      if (match) {
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('c-nav__link--active'));
          match.link.classList.add('c-nav__link--active');
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s.el));
})();
