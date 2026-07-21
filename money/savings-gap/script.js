var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var targetEl = document.getElementById('target-savings');
  var currentEl = document.getElementById('current-savings');

  if (targetEl.value === '' || currentEl.value === '') {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var target = parseFloat(targetEl.value) || 0;
  var current = parseFloat(currentEl.value) || 0;
  var gap = target - current;

  var resultLabel = document.getElementById('result-label');
  if (gap <= 0) {
    resultLabel.textContent = 'すでに目標額に達しています。余裕額は';
    gap = Math.abs(gap);
  } else {
    resultLabel.textContent = 'あと必要な金額は';
  }

  document.getElementById('gap-amount').textContent = formatYen(gap);
  currentResult = formatYen(gap) + '円';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('savings-gap', '退職までに必要な貯金差額計算', currentResult, '/money/savings-gap/');
  }
  if (saved) {
    document.getElementById('history-save-block').hidden = true;
    document.getElementById('history-saved-block').hidden = false;
  }
});

document.getElementById('reset-btn').addEventListener('click', function () {
  form.reset();
  formError.hidden = true;
  resultSection.hidden = true;
  form.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
