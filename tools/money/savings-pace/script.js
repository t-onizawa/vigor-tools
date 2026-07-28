var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var gap = parseFloat(document.getElementById('gap-amount').value);
  var months = parseFloat(document.getElementById('months-left').value);

  if (isNaN(gap) || gap <= 0 || isNaN(months) || months <= 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var pace = gap / months;

  document.getElementById('monthly-pace').textContent = formatYen(pace);
  currentResult = formatYen(pace) + '円/月';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('savings-pace', '独立準備の貯金ペース計算', currentResult, '/money/savings-pace/');
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
