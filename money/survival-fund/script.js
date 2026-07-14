var form = document.getElementById('calc-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');
var currentResult = '';

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var savings = parseFloat(document.getElementById('savings').value);
  var monthlyExpense = parseFloat(document.getElementById('monthly-expense').value);
  var severanceRaw = document.getElementById('severance').value;
  var severance = severanceRaw === '' ? 0 : parseFloat(severanceRaw);

  if (isNaN(savings) || savings < 0 || isNaN(monthlyExpense) || monthlyExpense <= 0) {
    formError.hidden = false;
    return;
  }
  if (isNaN(severance) || severance < 0) severance = 0;

  formError.hidden = true;
  showResult(savings, monthlyExpense, severance);
});

function formatYen(n) {
  return n.toLocaleString('ja-JP');
}

function showResult(savings, monthlyExpense, severance) {
  var total = savings + severance;
  var months = Math.floor(total / monthlyExpense);

  document.getElementById('months-number').textContent = months;

  var state;
  if (months >= 12) {
    state = '十分な備えがあります';
  } else if (months >= 6) {
    state = '一定の余裕があります';
  } else if (months >= 3) {
    state = '慎重な計画が必要です';
  } else {
    state = '今はまだ、準備期間かもしれません';
  }
  document.getElementById('months-state').textContent = state;

  var formulaText = '貯蓄額 ' + formatYen(savings) + '円';
  if (severance > 0) {
    formulaText += ' + 退職金見込み ' + formatYen(severance) + '円';
  }
  formulaText += ' ÷ 月の生活費 ' + formatYen(monthlyExpense) + '円 = 約' + months + 'ヶ月';
  document.getElementById('breakdown-formula').textContent = formulaText;

  currentResult = months + 'ヶ月';

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  form.hidden = true;
  resultSection.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'survival-fund',
      '生活防衛資金シミュレーター',
      currentResult,
      '/money/survival-fund/'
    );
  }
  if (saved) {
    document.getElementById('history-save-block').hidden = true;
    document.getElementById('history-saved-block').hidden = false;
  }
  // 保存に失敗した場合は何も変えない。エラー表示はしない（壊れにくい設計を優先する）。
});

document.getElementById('reset-btn').addEventListener('click', function () {
  form.reset();
  formError.hidden = true;
  resultSection.hidden = true;
  form.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
