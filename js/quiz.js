document.querySelectorAll('[data-quiz]').forEach(quiz => {
  const options = quiz.querySelectorAll('.quiz-option');
  options.forEach(opt => {
    opt.addEventListener('click', function () {
      if (quiz.dataset.answered === '1') return;
      quiz.dataset.answered = '1';
      options.forEach(o => {
        o.classList.remove('correct', 'wrong');
        if (o.dataset.correct === 'true') o.classList.add('correct');
        else if (o === this && o.dataset.correct !== 'true') o.classList.add('wrong');
      });
      const feedback = quiz.querySelector('.quiz-feedback');
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.textContent = this.dataset.correct === 'true'
          ? '\u2713 Sahi jawab!'
          : '\u2717 Galat. Green option sahi hai \u2014 upar wapas padho.';
      }
    });
  });
});
