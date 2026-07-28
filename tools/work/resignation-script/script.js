var STORAGE_KEY = 'vigor-resignation-script-draft';
var textEl = document.getElementById('script-text');
var saveBlock = document.getElementById('history-save-block');
var savedBlock = document.getElementById('history-saved-block');

var templates = {
  family: '私事で恐縮ですが、家庭の事情により、○月末をもって退職させていただきたく存じます。\n' +
    '在職中は大変お世話になりました。引き継ぎについては責任を持って対応いたします。',
  career: 'いつもお世話になっております。\n' +
    'この度、キャリアの方向性を見つめ直し、○月末をもって退職させていただきたいと考えております。\n' +
    'ご相談のお時間をいただけますと幸いです。',
  honest: '突然のご相談で申し訳ありません。\n' +
    '正直に申し上げると、今後の働き方について自分の中で考えが固まり、退職を考えています。\n' +
    '一度お時間をいただけないでしょうか。'
};

document.querySelectorAll('.tpl-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tpl-btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    textEl.value = templates[btn.dataset.tpl];
    saveDraft();
    updateSaveButtonVisibility();
  });
});

function saveDraft() {
  try {
    localStorage.setItem(STORAGE_KEY, textEl.value);
  } catch (e) {
    // 保存に失敗しても入力は継続できる
  }
}

function restoreDraft() {
  var raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return;
  }
  if (raw) textEl.value = raw;
}

function updateSaveButtonVisibility() {
  var hasContent = textEl.value.trim() !== '';
  saveBlock.hidden = !hasContent;
  if (!hasContent) savedBlock.hidden = true;
}

textEl.addEventListener('input', function () {
  saveDraft();
  updateSaveButtonVisibility();
  if (!savedBlock.hidden) {
    savedBlock.hidden = true;
    saveBlock.hidden = false;
  }
});

document.getElementById('copy-btn').addEventListener('click', function () {
  if (!textEl.value.trim()) return;
  navigator.clipboard.writeText(textEl.value).then(function () {
    var note = document.getElementById('copy-note');
    note.hidden = false;
    setTimeout(function () { note.hidden = true; }, 2000);
  }).catch(function () {
    textEl.select();
  });
});

document.getElementById('save-history-btn').addEventListener('click', function () {
  var saved = false;
  if (typeof VigorHistory !== 'undefined') {
    saved = VigorHistory.save(
      'resignation-script',
      '退職の伝え方テンプレート',
      '退職の伝え方を準備した',
      '/work/resignation-script/'
    );
  }
  if (saved) {
    saveBlock.hidden = true;
    savedBlock.hidden = false;
  }
});

restoreDraft();
updateSaveButtonVisibility();
