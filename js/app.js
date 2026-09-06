async function loadCourses() {
  try {
    const res = await fetch('data/courses.json');
    const data = await res.json();
    const body = document.getElementById('catalogBody');
    if (body && data.courses && data.courses.length) {
      body.innerHTML = data.courses.map(c => `
        <a href="${c.href}" class="table-row">
          <span><strong>${c.title}</strong><br><span class="text-xs text-[var(--muted)]">${c.level || ''}</span></span>
          <span class="text-[var(--muted)] text-sm">${c.duration || ''}</span>
          <span class="text-[var(--muted)] text-sm">${c.feeOriginal || ''}</span>
          <span class="text-xs font-semibold text-[var(--accent)]">Open →</span>
        </a>`).join('');
    }
  } catch (e) {
    console.warn('catalog static fallback', e);
  }
}
document.addEventListener('DOMContentLoaded', loadCourses);
