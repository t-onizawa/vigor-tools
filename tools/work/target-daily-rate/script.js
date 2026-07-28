var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var income = parseFloat(document.getElementById('target-income').value);
  var days = parseFloat(document.getElementById('working-days').value);

  if (isNaN(income) || income <= 0 || isNaN(days) || days <= 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var dailyRate = income / days;
  var hourlyRate = dailyRate / 8;

  document.getElementById('daily-rate').textContent = formatYen(dailyRate);
  document.getElementById('hourly-rate-note').textContent =
    '1日8時間換算で、時給約' + formatYen(hourlyRate) + '円になります';

  currentResult = formatYen(dailyRate) + '円/日';

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
      'target-daily-rate',
      '独立後の目標日給計算',
      currentResult,
      '/work/target-daily-rate/'
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
