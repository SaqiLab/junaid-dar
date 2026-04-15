(function() {
  function renderHeader() {
    const config = window.APP_CONFIG;
    if (!config) return;
    const container = document.getElementById('header-container');
    if (!container) return;
    const currentPath = window.location.hash.slice(1) || 'home';
    const navItems = config.navItems.map(item => `
      <li><a href="#${item.slug}" data-page="${item.slug}" class="${currentPath === item.slug ? 'active' : ''}">${item.label}</a></li>
    `).join('');
    container.innerHTML = `
      <header class="site-header">
        <div class="header-container">
          <div class="logo"><h1>${config.siteTitle}</h1></div>
          <button class="hamburger" aria-label="Menu" id="hamburgerBtn">☰</button>
          <ul class="nav-links" id="navLinks">${navItems}</ul>
          <button class="theme-toggle" id="themeToggleBtn" aria-label="Dark/Light mode">🌓 Theme</button>
        </div>
      </header>
    `;
    // attach event listeners
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) themeBtn.addEventListener('click', () => window.toggleTheme());
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
    }
    // reattach router link listeners after header is added
    if (window.attachNavListeners) window.attachNavListeners();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHeader);
  } else {
    renderHeader();
  }
})();