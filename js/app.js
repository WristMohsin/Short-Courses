(function () {
  const grid = document.getElementById('courseGrid');
  const search = document.getElementById('courseSearch');
  const chips = document.querySelectorAll('.chip[data-filter]');
  let activeFilter = 'all';

  function applyFilter() {
    if (!grid) return;
    const q = (search?.value || '').toLowerCase().trim();
    grid.querySelectorAll('.course-card').forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const title = (card.getAttribute('data-title') || '') + ' ' + (card.textContent || '');
      const matchCat = activeFilter === 'all' || cat === activeFilter;
      const matchQ = !q || title.toLowerCase().includes(q);
      card.style.display = matchCat && matchQ ? '' : 'none';
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });
  search?.addEventListener('input', applyFilter);

  try {
    const raw = localStorage.getItem('openskill_progress');
    if (!raw) return;
    const data = JSON.parse(raw);
    const web = data['web-dev'];
    if (!web) return;
    const lessons = Object.keys(web.lessons || {}).length;
    const tasks = Object.keys(web.tasks || {}).length;
    const quizzes = Object.keys(web.quizzes || {}).length;
    const pct = Math.min(100, Math.round(lessons * 8 + tasks * 6 + quizzes * 5));
    if (pct < 1) return;
    const wrap = document.getElementById('continueWrap');
    const bar = document.getElementById('continueBar');
    const pctEl = document.getElementById('continuePct');
    if (wrap) {
      wrap.hidden = false;
      if (bar) bar.style.width = pct + '%';
      if (pctEl) pctEl.textContent = pct + '% complete · Web Development';
    }
  } catch (e) {}
})();
