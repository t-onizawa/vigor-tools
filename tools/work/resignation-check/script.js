const STORAGE_KEY = 'vigor-resignation-check';

const progressText = document.querySelector('.progress-text');
const barFill = document.querySelector('.bar-fill');
const result = document.querySelector('.result');
const resetBtn = document.querySelector('.reset-btn');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const TOTAL = checkboxes.length;

function updateProgress() {
  let count = 0;
  checkboxes.forEach(cb => { if (cb.checked) count++; });

  progressText.textContent = `${count} / ${TOTAL} 確認済み`;
  barFill.style.width = `${(count / TOTAL) * 100}%`;

  if (count === TOTAL) {
    result.className = 'result complete';
    result.textContent = '確認完了 — 退職の準備が整っています。';
  } else if (count >= Math.ceil(TOTAL * 0.7)) {
    result.className = 'result halfway';
    result.textContent = 'もう少しです。最後まで確認してみましょう。';
  } else if (count >= 1) {
    result.className = 'result incomplete';
    result.textContent = '確認が進んでいます。引き続き確認してみましょう。';
  } else {
    result.className = 'result incomplete';
    result.textContent = '確認すべき項目があります。一つずつ確認してみましょう。';
  }

  const state = {};
  checkboxes.forEach((cb, i) => { state[i] = cb.checked; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restoreState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const state = JSON.parse(saved);
  checkboxes.forEach((cb, i) => { if (state[i]) cb.checked = true; });
}

checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

resetBtn.addEventListener('click', () => {
  if (confirm('チェックをすべてリセットしますか？')) {
    checkboxes.forEach(cb => { cb.checked = false; });
    localStorage.removeItem(STORAGE_KEY);
    updateProgress();
  }
});

restoreState();
updateProgress();
