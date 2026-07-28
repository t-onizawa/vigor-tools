var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var mover = parseFloat(document.getElementById('mover-cost').value) || 0;
  var deposit = parseFloat(document.getElementById('deposit-cost').value) || 0;
  var furniture = parseFloat(document.getElementById('furniture-cost').value) || 0;
  var other = parseFloat(document.getElementById('other-cost').value) || 0;

  if (mover === 0 && deposit === 0 && furniture === 0 && other === 0) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  var total = mover + deposit + furniture + other;

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
      'moving-cost',
      '引越し費用シミュレーター',
      currentResult,
      '/life/moving-cost/'
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
