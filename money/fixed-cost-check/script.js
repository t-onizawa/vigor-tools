const STORAGE_KEY = 'vigor-fixed-cost-checklist';
const MEMO_KEY = 'vigor-fixed-cost-memo';

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
    result.textContent = 'すべて確認完了。見直し候補メモに書き留めておきましょう。';
  } else if (count >= Math.ceil(TOTAL * 0.7)) {
    result.className = 'result halfway';
    result.textContent = 'ほぼ把握できています。最後まで確認してみましょう。';
  } else if (count >= 1) {
    result.className = 'result incomplete';
    result.textContent = '見直しが進んでいます。さらに続けてみましょう。';
  } else {
    result.className = 'result incomplete';
    result.textContent = 'まず把握するところから始めましょう。';
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

// 見直し候補メモ
const memoFields = {
  today: document.getElementById('memo-today'),
  cancel: document.getElementById('memo-cancel'),
  plan: document.getElementById('memo-plan'),
  next: document.getElementById('memo-next'),
};

function saveMemo() {
  const data = {};
  Object.entries(memoFields).forEach(([k, el]) => { data[k] = el.value; });
  localStorage.setItem(MEMO_KEY, JSON.stringify(data));
}

function restoreMemo() {
  const saved = localStorage.getItem(MEMO_KEY);
  if (!saved) return;
  const data = JSON.parse(saved);
  Object.entries(memoFields).forEach(([k, el]) => { if (data[k]) el.value = data[k]; });
}

Object.values(memoFields).forEach(el => el.addEventListener('input', saveMemo));

document.getElementById('memo-clear-btn').addEventListener('click', () => {
  if (confirm('メモをすべて消去しますか？')) {
    Object.values(memoFields).forEach(el => { el.value = ''; });
    localStorage.removeItem(MEMO_KEY);
  }
});

restoreMemo();
