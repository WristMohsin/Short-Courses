(function() {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme') || 'system';
  function apply(theme) {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
  apply(stored);
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') apply('system');
  });
})();
