const Progress = {
  key: 'openskill_progress',
  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch { return {}; }
  },
  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  ensure(courseId) {
    const p = this.get();
    if (!p[courseId]) p[courseId] = { lessons: {}, quizzes: {}, tasks: {} };
    this.save(p);
    return p[courseId];
  },
  markLesson(courseId, lessonId) {
    const p = this.get();
    if (!p[courseId]) p[courseId] = { lessons: {}, quizzes: {}, tasks: {} };
    p[courseId].lessons[lessonId] = true;
    this.save(p);
    this.updateUI(courseId);
  },
  markQuiz(courseId, quizId, score, total) {
    const p = this.get();
    if (!p[courseId]) p[courseId] = { lessons: {}, quizzes: {}, tasks: {} };
    p[courseId].quizzes[quizId] = { score, total, at: Date.now() };
    this.save(p);
    this.updateUI(courseId);
  },
  markTask(courseId, taskId) {
    const p = this.get();
    if (!p[courseId]) p[courseId] = { lessons: {}, quizzes: {}, tasks: {} };
    p[courseId].tasks[taskId] = true;
    this.save(p);
    this.updateUI(courseId);
  },
  percent(courseId, totals) {
    const c = this.get()[courseId] || { lessons: {}, quizzes: {}, tasks: {} };
    const lDone = Object.keys(c.lessons || {}).length;
    const qDone = Object.keys(c.quizzes || {}).length;
    const tDone = Object.keys(c.tasks || {}).length;
    const L = totals.lessons || 1;
    const Q = totals.quizzes || 1;
    const T = totals.tasks || 1;
    const pct = Math.round((lDone / L) * 40 + (qDone / Q) * 30 + (tDone / T) * 30);
    return Math.min(100, pct);
  },
  updateUI(courseId) {
    const bar = document.querySelector('[data-progress-bar]');
    const label = document.querySelector('[data-progress-label]');
    if (!bar && !label) return;
    const totals = {
      lessons: parseInt(document.body.dataset.lessons || '8', 10),
      quizzes: parseInt(document.body.dataset.quizzes || '4', 10),
      tasks: parseInt(document.body.dataset.tasks || '6', 10)
    };
    const pct = this.percent(courseId, totals);
    if (bar) bar.style.width = pct + '%';
    if (label) label.textContent = pct + '% complete';
    document.querySelectorAll('[data-mark-lesson]').forEach(btn => {
      const id = btn.getAttribute('data-mark-lesson');
      if (this.get()[courseId]?.lessons?.[id]) {
        btn.textContent = '\u2713 Done';
        btn.disabled = true;
        btn.classList.add('opacity-60');
      }
    });
    document.querySelectorAll('[data-mark-task]').forEach(btn => {
      const id = btn.getAttribute('data-mark-task');
      if (this.get()[courseId]?.tasks?.[id]) {
        btn.textContent = '\u2713 Task done';
        btn.disabled = true;
        btn.classList.add('opacity-60');
      }
    });
  },
  init(courseId) {
    this.ensure(courseId);
    this.updateUI(courseId);
    document.querySelectorAll('[data-mark-lesson]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.markLesson(courseId, btn.getAttribute('data-mark-lesson'));
      });
    });
    document.querySelectorAll('[data-mark-task]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.markTask(courseId, btn.getAttribute('data-mark-task'));
      });
    });
  }
};
