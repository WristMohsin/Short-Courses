const FALLBACK_PATHS = [
  { title: 'Web Development', desc: 'HTML → CSS → JS → Vue/React → Laravel → Capstone', href: 'courses/web-development.html', color: 'from-blue-500 to-cyan-500', level: 'Beginner → Advanced', duration: '4–6 months', skills: ['HTML','CSS','JavaScript','Laravel'] },
  { title: 'UI/UX & Graphics', desc: 'Principles → Free tools → Figma → Portfolio case study', href: 'courses/uiux-design.html', color: 'from-pink-500 to-rose-500', level: 'Beginner → Advanced', duration: '4–6 months', skills: ['Figma','Design','Prototyping'] },
  { title: 'Digital Marketing + SEO', desc: 'Social → SEO → Analytics → ASO → Campaign plan', href: 'courses/digital-marketing.html', color: 'from-green-500 to-emerald-500', level: 'Beginner → Intermediate', duration: '4–6 months', skills: ['SEO','Social','Analytics'] },
  { title: 'Content Writing', desc: 'Clarity → SEO blogs → Copywriting → Portfolio', href: 'courses/content-writing.html', color: 'from-amber-500 to-orange-500', level: 'Beginner → Intermediate', duration: '3–4 months', skills: ['SEO Writing','Copy'] },
  { title: 'Video Editing', desc: 'DaVinci Resolve free → Color → Capstone video', href: 'courses/video-editing.html', color: 'from-red-500 to-pink-500', level: 'Beginner → Advanced', duration: '4–6 months', skills: ['Editing','Color'] },
  { title: 'Unity Game Dev', desc: 'C# → Unity → Mini-games → itch.io publish', href: 'courses/unity-game-dev.html', color: 'from-indigo-500 to-violet-500', level: 'Beginner → Advanced', duration: '4–6 months', skills: ['Unity','C#'] },
  { title: '3D Modeling (Blender)', desc: 'Modeling → Texturing → Lighting → Portfolio renders', href: 'courses/3d-modeling.html', color: 'from-teal-500 to-cyan-500', level: 'Beginner → Advanced', duration: '4–6 months', skills: ['Blender','3D'] }
];

function pathCardHTML(p) {
  const letter = (p.title || 'C').charAt(0);
  const skills = (p.skills || []).slice(0, 4).map(s =>
    `<span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">${s}</span>`
  ).join('');
  return `
    <a href="${p.href}" class="path-card group">
      <div class="w-11 h-11 rounded-xl bg-gradient-to-br ${p.color || 'from-orange-500 to-purple-600'} mb-4 flex items-center justify-center text-white font-bold">${letter}</div>
      <h3 class="font-bold text-lg mb-1 group-hover:text-orange-500 transition">${p.title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">${p.desc}</p>
      <div class="flex flex-wrap gap-1.5 mb-3">${skills}</div>
      <div class="text-xs text-gray-500 flex justify-between gap-2">
        <span>${p.level || ''}</span>
        <span>${p.duration || ''}</span>
      </div>
    </a>`;
}

function renderPaths(paths) {
  const el = document.getElementById('pathCards');
  if (!el) return;
  el.innerHTML = paths.map(pathCardHTML).join('');
}

function renderCourses(courses) {
  const el = document.getElementById('courseGrid');
  if (!el) return;
  el.innerHTML = courses.map(c => `
    <a href="${c.href}" class="path-card p-5">
      <div class="text-xs font-medium text-orange-600 dark:text-orange-400 mb-1">${c.level || ''}</div>
      <h3 class="font-semibold mb-1 leading-snug">${c.title}</h3>
      <p class="text-xs text-gray-500 mb-2">${c.duration || ''} ${c.feeOriginal ? '• was ' + c.feeOriginal : ''}</p>
      <span class="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">100% Free</span>
    </a>
  `).join('');
}

async function loadCourses() {
  renderPaths(FALLBACK_PATHS);
  try {
    const res = await fetch('data/courses.json');
    if (!res.ok) throw new Error('fetch failed');
    const data = await res.json();
    if (data.paths && data.paths.length) renderPaths(data.paths);
    if (data.courses && data.courses.length) renderCourses(data.courses);
  } catch (e) {
    console.warn('Using built-in course list', e);
    const grid = document.getElementById('courseGrid');
    if (grid && !grid.innerHTML.trim()) {
      renderCourses(FALLBACK_PATHS.map(p => ({
        title: p.title,
        href: p.href,
        level: p.level,
        duration: p.duration,
        feeOriginal: 'Paid course'
      })));
    }
  }
}

document.addEventListener('DOMContentLoaded', loadCourses);
