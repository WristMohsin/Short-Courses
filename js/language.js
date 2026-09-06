const i18n = {
  en: {
    "hero.title": "Learn Industry Skills<br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600\">Completely Free</span>",
    "hero.subtitle": "High-quality free alternative to Skill Up paid courses. Official documentation, free university material, curated free YouTube, real projects, quizzes, and bilingual (English + Roman Urdu) support.",
    "paths.title": "Learning Paths",
    "paths.subtitle": "Structured roadmaps from absolute beginner to job-ready projects. Choose a path and follow the free curriculum."
  },
  ru: {
    "hero.title": "Industry Skills Seekho<br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600\">Bilkul Free</span>",
    "hero.subtitle": "Skill Up ke paid courses ka high-quality free alternative. Official documentation, free university material, curated free YouTube, real projects, quizzes, aur bilingual (English + Roman Urdu) support.",
    "paths.title": "Learning Paths",
    "paths.subtitle": "Absolute beginner se job-ready projects tak structured roadmaps. Path choose karo aur free curriculum follow karo."
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'EN | RU' : 'RU | EN';
  document.documentElement.lang = lang === 'ru' ? 'ur' : 'en';
}

document.getElementById('langToggle')?.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ru' : 'en');
});

setLanguage(currentLang);
