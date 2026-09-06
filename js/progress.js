const Progress = {
  key: 'openskill_progress',
  get() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch { return {}; }
  },
  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  markComplete(courseId, lessonId) {
    const p = this.get();
    if (!p[courseId]) p[courseId] = { lessons: {}, quizzes: {}, projects: [] };
    p[courseId].lessons[lessonId] = true;
    this.save(p);
  },
  isComplete(courseId, lessonId) {
    const p = this.get();
    return p[courseId]?.lessons?.[lessonId] === true;
  },
  getCourseProgress(courseId, totalLessons) {
    const p = this.get();
    const completed = Object.keys(p[courseId]?.lessons || {}).length;
    return totalLessons ? Math.round((completed / totalLessons) * 100) : 0;
  }
};
