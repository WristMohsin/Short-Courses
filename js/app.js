async function loadCourses() {
  try {
    const res = await fetch('data/courses.json');
    const data = await res.json();
    renderPaths(data.paths);
    renderCourses(data.courses);
  } catch (e) {
    console.error('Failed to load courses', e);
    renderFallback();
  }
}

function renderPaths(paths) {
  const container = document.getElementById('pathCards');
  if (!container) return;
  container.innerHTML = paths.map(p => `
    <a href="${p.href}" class="group block p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-orange-400 dark:hover:border-orange-500 transition shadow-sm hover:shadow-md">
      <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} mb-4 flex items-center justify-center text-white font-bold text-lg">${p.title.charAt(0)}</div>
      <h3 class="font-bold text-lg mb-2 group-hover:text-orange-500 transition">${p.title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">${p.desc}</p>
      <div class="flex flex-wrap gap-1.5 mb-4">
        ${p.skills.slice(0,4).map(s => `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">${s}</span>`).join('')}
      </div>
      <div class="text-xs text-gray-500 flex justify-between">
        <span>${p.level}</span>
        <span>${p.duration}</span>
      </div>
    </a>
  `).join('');
}

function renderCourses(courses) {
  const container = document.getElementById('courseGrid');
  if (!container) return;
  container.innerHTML = courses.map(c => `
    <a href="${c.href}" class="block p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 bg-white dark:bg-gray-800/40 transition">
      <div class="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">${c.level}</div>
      <h3 class="font-semibold mb-1 leading-snug">${c.title}</h3>
      <p class="text-xs text-gray-500 mb-3">${c.duration} • Originally ${c.feeOriginal}</p>
      <span class="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">100% Free</span>
    </a>
  `).join('');
}

function renderFallback() {
  const pathCards = document.getElementById('pathCards');
  if (pathCards) {
    pathCards.innerHTML = `
      <a href="courses/web-development.html" class="block p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h3 class="font-bold text-lg mb-2">Web Development</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">HTML → CSS → JS → Frameworks → Full Stack</p>
      </a>
      <a href="courses/uiux-design.html" class="block p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h3 class="font-bold text-lg mb-2">UI/UX & Graphics</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">Figma, Design Principles, Portfolio</p>
      </a>
      <a href="courses/digital-marketing.html" class="block p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
        <h3 class="font-bold text-lg mb-2">Digital Marketing + SEO</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">SEO, Ads, Analytics, ASO</p>
      </a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', loadCourses);
