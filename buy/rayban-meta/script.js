const STORAGE_KEY = 'vigor-rayban-meta-checklist';
const TOTAL = 24;

const progressText = document.querySelector('.progress-text');
const barFill = document.querySelector('.bar-fill');
const result = document.querySelector('.result');
const resetBtn = document.querySelector('.reset-btn');
const checkboxes = document.querySelectorAll('.checklist:not(.checklist--ref) input[type="checkbox"]');
const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

function updateProgress() {
  let count = 0;
  checkboxes.forEach(cb => { if (cb.checked) count++; });

  progressText.textContent = `${count} / ${TOTAL} 確認済み`;
  barFill.style.width = `${(count / TOTAL) * 100}%`;

  if (count === TOTAL) {
    result.className = 'result complete';
    result.textContent = '購入準備OK — 自信を持って購入へ進めます';
  } else {
    result.className = 'result incomplete';
    result.textContent = `あと ${TOTAL - count} 項目を確認してください`;
  }

  const state = {};
  allCheckboxes.forEach((cb, i) => { state[i] = cb.checked; });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function restoreState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  const state = JSON.parse(saved);
  allCheckboxes.forEach((cb, i) => { if (state[i]) cb.checked = true; });
}

checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));

resetBtn.addEventListener('click', () => {
  allCheckboxes.forEach(cb => { cb.checked = false; });
  localStorage.removeItem(STORAGE_KEY);
  updateProgress();
});

restoreState();
updateProgress();
