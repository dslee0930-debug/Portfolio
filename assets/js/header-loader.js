/* ============================================
   HEADER-LOADER.JS — Load language-specific header fragments
   ============================================ */
(function initHeaderInclude() {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  const headerPath = location.pathname.includes('/work/') ? '../../header.html' : './header.html';

  fetch(headerPath)
    .then(response => {
      if (!response.ok) throw new Error('Header fragment not found');
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      adjustHeaderLinks();
      setActiveNavLink();
    })
    .catch(error => {
      console.warn('Header load failed:', error);
    });

  function adjustHeaderLinks() {
    if (!location.pathname.includes('/work/')) return;
    document.querySelectorAll('.c-nav__link, .c-lang-btn').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('./')) return;
      const updatedHref = '../' + href;
      link.setAttribute('href', updatedHref);
    });
  }

  function setActiveNavLink() {
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.c-nav__link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('#')[0];
      const isActive = targetPage === currentPage || (currentPage === '' && targetPage === 'index.html');
      link.classList.toggle('c-nav__link--active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }
})();
