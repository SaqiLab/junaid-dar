window.attachNavListeners = function() {
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(link => {
    link.removeEventListener('click', navClickHandler);
    link.addEventListener('click', navClickHandler);
  });
};

async function loadPage(pageSlug) {
  const config = window.APP_CONFIG;
  const pageItem = config.navItems.find(item => item.slug === pageSlug);
  if (!pageItem) return loadPage('home');
  const mainContainer = document.getElementById('page-main');
  if (!mainContainer) return;
  // show skeleton
  mainContainer.innerHTML = `<div class="skeleton" style="height: 300px;"></div>`;
  try {
    const response = await fetch(`pages/${pageItem.pageFile}`);
    if (!response.ok) throw new Error('Page not found');
    let html = await response.text();
    // inject config colours & educator data into page if needed (optional)
    html = html.replace(/{{educatorName}}/g, config.educatorName)
               .replace(/{{mainColor}}/g, config.mainColor)
               .replace(/{{accentColor}}/g, config.accentColor);
    mainContainer.innerHTML = html;
    // update active class in nav
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === `#${pageSlug}`) a.classList.add('active');
      else a.classList.remove('active');
    });
  } catch (err) {
    mainContainer.innerHTML = `<div class="hero"><h2>⚠️ Page could not be loaded</h2><p>Please check network or try again.</p></div>`;
  }
}

function navClickHandler(e) {
  e.preventDefault();
  const slug = this.getAttribute('data-page') || this.getAttribute('href')?.slice(1);
  if (!slug) return;
  window.location.hash = slug;
  loadPage(slug);
  // close mobile menu if open
  const navMenu = document.getElementById('navLinks');
  if (navMenu && navMenu.classList.contains('show')) navMenu.classList.remove('show');
}

function handleHashChange() {
  let hash = window.location.hash.slice(1);
  if (!hash || hash === '') hash = 'home';
  loadPage(hash);
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', () => {
  if (!window.location.hash) window.location.hash = 'home';
  handleHashChange();
});