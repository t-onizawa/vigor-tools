document.querySelectorAll('.opt').forEach(function(opt) {
  opt.querySelector('input[type="radio"]').addEventListener('change', function() {
    var name = this.name;
    document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
      r.closest('.opt').classList.remove('is-selected');
    });
    opt.classList.add('is-selected');
    document.getElementById(name).style.borderColor = '';
  });
});

var form = document.getElementById('check-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  var scores = [];
  var incomplete = false;

  for (var i = 1; i <= 5; i++) {
    var selected = form.querySelector('input[name="q' + i + '"]:checked');
    if (!selected) {
      incomplete = true;
      document.getElementById('q' + i).style.borderColor = '#ddb89a';
    } else {
      scores.push(parseInt(selected.value, 10));
    }
  }

  if (incomplete) {
    formError.hidden = false;
    return;
  }

  formError.hidden = true;
  showResult(scores);
});

function showResult(scores) {
  var total = scores.reduce(function (a, b) { return a + b; }, 0);
  var box = document.getElementById('verdict-box');

  box.classList.remove('v-wait', 'v-think', 'v-buy');

  var cls, label, title, desc;

  if (total <= 3) {
    cls = 'v-wait';
    label = 'SCORE ' + total + ' / 10';
    title = '今はまだ、準備期間かもしれません';
    desc = '本業・環境・資金のどこかに余裕がまだ足りないようです。<br>焦らず、準備を整えるところから始めても大丈夫です。';
  } else if (total <= 6) {
    cls = 'v-think';
    label = 'SCORE ' + total + ' / 10';
    title = 'もう少し考えて';
    desc = 'あと1〜2つ、条件が揃えば動きやすくなります。<br>何が足りないか、質問を見返してみてください。';
  } else {
    cls = 'v-buy';
    label = 'SCORE ' + total + ' / 10';
    title = '始めてみていい';
    desc = '本業・スキル・環境・資金のバランスが整っています。<br>小さく始めてみるタイミングだと思います。';
  }

  box.classList.add(cls);
  document.getElementById('verdict-score').textContent = label;
  document.getElementById('verdict-title').textContent = title;
  document.getElementById('verdict-desc').innerHTML = desc;

  var currentResult = title + '（' + total + '/10）';

  document.getElementById('save-history-btn').onclick = function () {
    var saved = false;
    if (typeof VigorHistory !== 'undefined') {
      saved = VigorHistory.save(
        'side-business-check',
        '副業しどき診断',
        currentResult,
        '/work/side-business-check/'
      );
    }
    if (saved) {
      document.getElementById('history-save-block').hidden = true;
      document.getElementById('history-saved-block').hidden = false;
    }
  };

  document.getElementById('history-save-block').hidden = false;
  document.getElementById('history-saved-block').hidden = true;

  form.hidden = true;
  resultSection.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('reset-btn').addEventListener('click', function () {
  form.reset();
  document.querySelectorAll('.opt').forEach(function (opt) {
    opt.classList.remove('is-selected');
  });
  document.querySelectorAll('.q-block').forEach(function (b) {
    b.style.borderColor = '';
  });
  form.hidden = false;
  resultSection.hidden = true;
  formError.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
