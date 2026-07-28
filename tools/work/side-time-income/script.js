var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var hours = parseFloat(document.getElementById('hours-per-week').value);
  var rate = parseFloat(document.getElementById('hourly-rate').value);

  if (isNaN(hours) || hours <= 0 || isNaN(rate) || rate <= 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var monthlyIncome = hours * rate * 4.3;

  document.getElementById('monthly-income').textContent = formatYen(monthlyIncome);
  currentResult = formatYen(monthlyIncome) + '円/月';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('side-time-income', '副業に使える時間から月収目標を逆算', currentResult, '/work/side-time-income/');
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
