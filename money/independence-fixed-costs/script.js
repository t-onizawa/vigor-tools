var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var insurance = parseFloat(document.getElementById('insurance-cost').value) || 0;
  var tax = parseFloat(document.getElementById('tax-reserve').value) || 0;
  var tools = parseFloat(document.getElementById('work-tools').value) || 0;
  var other = parseFloat(document.getElementById('other-costs').value) || 0;

  if (insurance === 0 && tax === 0 && tools === 0 && other === 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var total = insurance + tax + tools + other;

  document.getElementById('total-cost').textContent = formatYen(total);
  currentResult = formatYen(total) + '円/月';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  resultSection.hidden = false;
  form.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save('independence-fixed-costs', '独立後の固定費見積もり', currentResult, '/money/independence-fixed-costs/');
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
