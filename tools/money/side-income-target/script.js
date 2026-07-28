var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var want = parseFloat(document.getElementById('want-amount').value);
  var bufferRaw = document.getElementById('tax-buffer').value;
  var buffer = bufferRaw === '' ? 0 : parseFloat(bufferRaw);

  if (isNaN(want) || want <= 0) {
    formError.hidden = false;
    return;
  }
  if (isNaN(buffer) || buffer < 0) buffer = 0;
  formError.hidden = true;

  var target = want * (1 + buffer / 100);

  document.getElementById('target-income').textContent = formatYen(target);
  currentResult = formatYen(target) + '円/月';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('side-income-target', '副収入の月額目標計算', currentResult, '/money/side-income-target/');
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
