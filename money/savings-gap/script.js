var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

// 万円単位の表示用フォーマット。整数ならそのまま、端数があれば小数第1位まで表示する
function formatMan(n) {
  var rounded = Math.round(n * 10) / 10;
  if (Number.isInteger(rounded)) {
    return rounded.toLocaleString('ja-JP');
  }
  return rounded.toLocaleString('ja-JP', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
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

  // 入力は万円単位。計算は円単位に揃えてから行う
  var targetYen = (parseFloat(targetEl.value) || 0) * 10000;
  var currentYen = (parseFloat(currentEl.value) || 0) * 10000;
  var gapYen = targetYen - currentYen;

  var resultLabel = document.getElementById('result-label');
  if (gapYen <= 0) {
    resultLabel.textContent = 'すでに目標額に達しています。余裕額は';
    gapYen = Math.abs(gapYen);
  } else {
    resultLabel.textContent = 'あと必要な金額は';
  }

  var gapMan = gapYen / 10000;
  document.getElementById('gap-amount').textContent = formatMan(gapMan);
  document.getElementById('gap-amount-yen').textContent = formatYen(gapYen);
  currentResult = formatMan(gapMan) + '万円';

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
