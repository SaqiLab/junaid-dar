(function() {
  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('educore-theme', theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem('educore-theme');
    if (saved) return saved;
    if (window.APP_CONFIG && window.APP_CONFIG.defaultTheme) return window.APP_CONFIG.defaultTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  window.applyTheme = function() {
    const theme = getPreferredTheme();
    setTheme(theme);
  };

  window.toggleTheme = function() {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  window.applyTheme();
})();