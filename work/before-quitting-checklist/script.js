const STORAGE_KEY = 'vigor-before-quitting-checklist';

const progressText = document.querySelector('.progress-text');
const barFill = document.querySelector('.bar-fill');
const result = document.querySelector('.result');
const resetBtn = document.querySelector('.reset-btn');
const nextStepBlock = document.getElementById('next-step-block');
const relatedToolsBlock = document.getElementById('related-tools-block');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const TOTAL = checkboxes.length;

const COMPLETE_MESSAGE =
  `${TOTAL}項目、すべてチェックできました。\n` +
  '独立前に確認したい主な項目は整理できています。\n' +
  'ただし、審査・税金・保険などは個人差があるため、\n' +
  '必要に応じて専門窓口にも確認してください。';

function updateProgress() {
  let count = 0;
  checkboxes.forEach(cb => { if (cb.checked) count++; });

  progressText.textContent = `${count} / ${TOTAL} 確認済み`;
  barFill.style.width = `${(count / TOTAL) * 100}%`;

  const isComplete = count === TOTAL;
  nextStepBlock.hidden = !isComplete;
  relatedToolsBlock.hidden = isComplete;

  if (isComplete) {
    result.className = 'result complete';
    result.textContent = COMPLETE_MESSAGE;
  } else if (count >= Math.ceil(TOTAL * 0.7)) {
    result.className = 'result halfway';
    result.textContent = 'ほぼ確認できています。最後まで見てみましょう。';
  } else if (count >= 1) {
    result.className = 'result incomplete';
    result.textContent = '確認が進んでいます。さらに続けてみましょう。';
  } else {
    result.className = 'result incomplete';
    result.textContent = 'まず信用・与信まわりから確認しましょう。';
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
