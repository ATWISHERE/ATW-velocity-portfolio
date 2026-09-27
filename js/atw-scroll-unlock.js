
(function() {
  // 1. Only hide the old transition curtain — DO NOT override html/body overflow (which breaks position:sticky!)
  const style = document.createElement('style');
  style.id = 'atw-scroll-unlock-css';
  style.textContent = `
    .transition-w, .preloader, .page-transition {
      display: none !important;
      opacity: 0 !important;
      pointer-events: none !important;
      z-index: -1 !important;
    }
  `;
  document.head.appendChild(style);

  // 2. Gently resume scroll ONLY if a button/menu locked it, without breaking sticky containers
  function unlockIfStuck() {
    [document.documentElement, document.body].forEach(el => {
      if (!el) return;
      el.classList.remove('lenis-stopped', 'no-scroll', 'is-loading', 'overflow-hidden', 'w-editor');
      if (el.style.overflow === 'hidden' || el.style.overflowY === 'hidden') {
        el.style.removeProperty('overflow');
        el.style.removeProperty('overflow-y');
      }
      if (el.style.position === 'fixed') {
        el.style.removeProperty('position');
      }
    });

    if (window.lenis && typeof window.lenis.start === 'function') {
      try { window.lenis.start(); } catch (e) {}
    }

    const pre = document.getElementById('atw-green-preloader');
    if (pre && sessionStorage.getItem('atw_visited_resume') === '1') {
      pre.style.display = 'none';
    }
  }

  // 3. Trigger unlock when returning from Resume page, switching tabs, or clicking any button/menu
  window.addEventListener('pageshow', () => {
    sessionStorage.setItem('atw_visited_resume', '1');
    unlockIfStuck();
    setTimeout(unlockIfStuck, 100);
  });
  window.addEventListener('popstate', unlockIfStuck);
  window.addEventListener('focus', unlockIfStuck);

  window.addEventListener('click', () => {
    setTimeout(unlockIfStuck, 60);
    setTimeout(unlockIfStuck, 350);
    setTimeout(unlockIfStuck, 800);
  }, true);
})();
