var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var transport = parseFloat(document.getElementById('transport-cost').value) || 0;
  var stay = parseFloat(document.getElementById('stay-cost').value) || 0;
  var activity = parseFloat(document.getElementById('activity-cost').value) || 0;
  var misc = parseFloat(document.getElementById('misc-cost').value) || 0;

  if (transport === 0 && stay === 0 && activity === 0 && misc === 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var total = transport + stay + activity + misc;

  document.getElementById('total-cost').textContent = formatYen(total);
  currentResult = formatYen(total) + '円';

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
      'travel-budget',
      '旅行予算シミュレーター',
      currentResult,
      '/travel/budget/'
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
