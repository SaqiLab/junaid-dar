(function() {
  function renderFooter() {
    const config = window.APP_CONFIG;
    if (!config) return;
    const container = document.getElementById('footer-container');
    if (!container) return;
    const year = new Date().getFullYear();
    let socialHtml = '';
    if (config.socialLinks) {
      socialHtml = `<div style="margin-top: 0.5rem;">`;
      if (config.socialLinks.twitter) socialHtml += `<a href="${config.socialLinks.twitter}" target="_blank" style="margin:0 0.5rem; color:var(--text-secondary);">🐦 Twitter</a>`;
      if (config.socialLinks.linkedin) socialHtml += `<a href="${config.socialLinks.linkedin}" target="_blank" style="margin:0 0.5rem; color:var(--text-secondary);">🔗 LinkedIn</a>`;
      if (config.socialLinks.github) socialHtml += `<a href="${config.socialLinks.github}" target="_blank" style="margin:0 0.5rem; color:var(--text-secondary);">🐙 GitHub</a>`;
      socialHtml += `</div>`;
    }
    container.innerHTML = `
      <footer class="site-footer">
        <p>© ${year} ${config.siteTitle} — Empowering learners worldwide</p>
        ${socialHtml}
        <p style="font-size:0.8rem; margin-top:0.5rem;">✨ Light / Dark mode • Configurable primary & accent colours</p>
      </footer>
    `;
  }
  document.addEventListener('DOMContentLoaded', renderFooter);
})();