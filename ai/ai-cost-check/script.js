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
  var hours = parseFloat(document.getElementById('saved-hours').value);
  var hourlyValue = parseFloat(document.getElementById('hourly-value').value);

  if (isNaN(fee) || fee < 0 || isNaN(hours) || hours < 0 || isNaN(hourlyValue) || hourlyValue < 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var timeValue = hours * hourlyValue;

  document.getElementById('fee-amount').textContent = formatYen(fee);
  document.getElementById('time-value').textContent = formatYen(timeValue);

  currentResult = '月額' + formatYen(fee) + '円 / 時間削減価値' + formatYen(timeValue) + '円';

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
      'ai-cost-check',
      'AI利用料、元取れてる？計算',
      currentResult,
      '/ai/ai-cost-check/'
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
