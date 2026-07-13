// Highlight selected option in each question block
document.querySelectorAll('.opt').forEach(function(opt) {
  opt.querySelector('input[type="radio"]').addEventListener('change', function() {
    var name = this.name;
    document.querySelectorAll('input[name="' + name + '"]').forEach(function(r) {
      r.closest('.opt').classList.remove('is-selected');
    });
    opt.classList.add('is-selected');
    // Clear error highlight on this block
    document.getElementById(name).style.borderColor = '';
  });
});

var form = document.getElementById('check-form');
var resultSection = document.getElementById('result-section');
var formError = document.getElementById('form-error');

form.addEventListener('submit', function(e) {
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
  var total = scores.reduce(function(a, b) { return a + b; }, 0);
  var box = document.getElementById('verdict-box');

  box.classList.remove('v-wait', 'v-think', 'v-buy');

  var cls, label, title, desc;

  if (total <= 3) {
    cls   = 'v-wait';
    label = 'SCORE ' + total + ' / 10';
    title = '今は待とう';
    desc  = 'カートに入れたまま1週間置いてみてください。<br>欲しい気持ちが続いていたら、そのとき改めてこのチェックを。';
  } else if (total <= 6) {
    cls   = 'v-think';
    label = 'SCORE ' + total + ' / 10';
    title = 'もう少し考えて';
    desc  = 'あと1〜2つ、条件が揃えば買えます。<br>下のスコアを見て、何が足りないか確認してください。';
  } else {
    cls   = 'v-buy';
    label = 'SCORE ' + total + ' / 10';
    title = '買っていい';
    desc  = '必要性も予算も揃っています。<br>後悔しない買い物だと思います。';
  }

  box.classList.add(cls);
  document.getElementById('verdict-score').textContent = label;
  document.getElementById('verdict-title').textContent = title;
  document.getElementById('verdict-desc').innerHTML = desc;

  // Animate score bars after short delay
  var barIds = ['bar-budget', 'bar-time', 'bar-need', 'bar-impact', 'bar-research'];
  setTimeout(function() {
    scores.forEach(function(s, i) {
      document.getElementById(barIds[i]).style.width = (s / 2 * 100) + '%';
    });
  }, 150);

  form.hidden = true;
  resultSection.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('reset-btn').addEventListener('click', function() {
  form.reset();
  document.querySelectorAll('.opt').forEach(function(opt) {
    opt.classList.remove('is-selected');
  });
  document.querySelectorAll('.q-block').forEach(function(b) {
    b.style.borderColor = '';
  });
  document.querySelectorAll('.score-bar').forEach(function(b) {
    b.style.width = '0%';
  });
  form.hidden = false;
  resultSection.hidden = true;
  formError.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
