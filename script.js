// Worry card: カード全体クリックで推奨ツールへ遷移（子リンクは独立動作）
document.querySelectorAll('.worry-card[data-href]').forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (e.target.closest('a')) return;
    location.href = this.dataset.href;
  });
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      location.href = this.dataset.href;
    }
  });
});
