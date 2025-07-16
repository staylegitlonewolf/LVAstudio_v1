export function toggleFontMode(button) {
  const isClean = document.body.classList.toggle('clean-mode');
  button.textContent = isClean ? 'Epic' : 'Light';
  button.classList.remove('light-btn', 'epic-btn');
  button.classList.add(isClean ? 'light-btn' : 'epic-btn');
}
export function setupThemeAndLogo(restorePortalContent, attachCardEvents) {
  window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.toggle-mode-btn');
    const isClean = document.body.classList.contains('clean-mode');
    button.textContent = isClean ? 'Epic' : 'Light';
    button.classList.remove('light-btn', 'epic-btn');
    button.classList.add(isClean ? 'light-btn' : 'epic-btn');
    document.getElementById('logo-btn').addEventListener('click', () => {
      if (document.getElementById('portalContent').innerHTML.includes('Experience the Future of Web Builds')) {
        restorePortalContent(attachCardEvents);
      }
    });
  });
} 