(function initSystem() {
  const config = window.APP_CONFIG;
  if (config) {
    document.documentElement.style.setProperty('--color-primary', config.mainColor);
    document.documentElement.style.setProperty('--color-accent', config.accentColor);
  }
  // set up router listeners after header is loaded
  setTimeout(() => {
    if (window.attachNavListeners) window.attachNavListeners();
  }, 100);
})();