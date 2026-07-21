// Worry card: カード余白クリックで推奨ツールへ遷移（子リンクは独立動作・キーボード操作は子リンクで完結）
document.querySelectorAll('.worry-card[data-href]').forEach(function(card) {
  card.addEventListener('click', function(e) {
    if (e.target.closest('a')) return;
    location.href = this.dataset.href;
  });
});
