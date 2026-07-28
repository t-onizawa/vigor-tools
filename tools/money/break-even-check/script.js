var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var fee = parseFloat(document.getElementById('monthly-fee').value);
  var count = parseFloat(document.getElementById('usage-count').value);

  if (isNaN(fee) || fee < 0 || isNaN(count) || count <= 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var perUse = fee / count;

  document.getElementById('per-use-cost').textContent = formatYen(perUse);
  currentResult = '1回あたり' + formatYen(perUse) + '円';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'break-even-check',
      '「元取れてる？」損益分岐点チェック',
      currentResult,
      '/money/break-even-check/'
    );
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
