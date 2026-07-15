var subList = document.getElementById('sub-list');
var formError = document.getElementById('form-error');
var resultSection = document.getElementById('result-section');
var rowCount = 0;
var currentMonthlyTotal = 0;
var currentAnnualTotal = 0;

function addRow() {
  rowCount++;
  var row = document.createElement('div');
  row.className = 'sub-row';
  row.innerHTML =
    '<input type="text" class="sub-name" placeholder="サービス名（任意）例：Netflix">' +
    '<input type="number" class="sub-amount" inputmode="numeric" min="0" placeholder="金額">' +
    '<select class="sub-cycle">' +
    '<option value="monthly">月額</option>' +
    '<option value="annual">年額</option>' +
    '</select>' +
    '<button type="button" class="sub-row-remove" aria-label="削除">×</button>';

  row.querySelector('.sub-row-remove').addEventListener('click', function () {
    row.remove();
  });

  subList.appendChild(row);
}

// v0.1: 最初から3行用意しておく（入力の手間を減らす）
addRow();
addRow();
addRow();

document.getElementById('add-row-btn').addEventListener('click', addRow);

function formatYen(n) {
  return Math.round(n).toLocaleString('ja-JP');
}

document.getElementById('calc-btn').addEventListener('click', function () {
  var rows = subList.querySelectorAll('.sub-row');
  var monthlyTotal = 0;
  var annualTotal = 0;
  var hasValidInput = false;

  rows.forEach(function (row) {
    var amountRaw = row.querySelector('.sub-amount').value;
    var cycle = row.querySelector('.sub-cycle').value;
    if (amountRaw === '') return;

    var amount = parseFloat(amountRaw);
    if (isNaN(amount) || amount < 0) return;

    hasValidInput = true;
    if (cycle === 'annual') {
      annualTotal += amount;
      monthlyTotal += amount / 12;
    } else {
      monthlyTotal += amount;
      annualTotal += amount * 12;
    }
  });

  if (!hasValidInput) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  currentMonthlyTotal = monthlyTotal;
  currentAnnualTotal = annualTotal;

  document.getElementById('monthly-total').textContent = formatYen(monthlyTotal);
  document.getElementById('annual-total').textContent = formatYen(annualTotal);

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;
  document.getElementById('profile-save-block').hidden = false;
  document.getElementById('profile-saved-block').hidden = true;

  resultSection.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'subscriptions',
      'サブスク年間総額計算',
      '月額' + formatYen(currentMonthlyTotal) + '円 / 年間' + formatYen(currentAnnualTotal) + '円',
      '/money/subscriptions/'
    );
  }
  if (saved) {
    document.getElementById('history-save-block').hidden = true;
    document.getElementById('history-saved-block').hidden = false;
  }
});

document.getElementById('save-profile-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorProfile !== 'undefined') {
    saved = VigorProfile.save(
      'monthlySubscriptionTotal',
      Math.round(currentMonthlyTotal),
      'サブスク年間総額計算',
      '/money/subscriptions/'
    );
  }
  if (saved) {
    document.getElementById('profile-save-block').hidden = true;
    document.getElementById('profile-saved-block').hidden = false;
  }
});

document.getElementById('reset-btn').addEventListener('click', function () {
  subList.innerHTML = '';
  rowCount = 0;
  addRow();
  addRow();
  addRow();
  formError.hidden = true;
  resultSection.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
