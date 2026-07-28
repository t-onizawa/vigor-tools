const OUTPUTS = {
  start: {
    label: '何から始めるかわからない',
    5: {
      first: g => `「${g}」について思いつくことを3つだけ書き出す。それだけでいい。`,
      do:    () => '書き出した3つの中から「一番やりやすそうなもの」を1つ選ぶ。',
      not:   () => '手順・スケジュール・全体計画はまだ不要。今日は選ぶだけでいい。',
      next:  () => '選んだ1つを「次の5分でできる形」に落とし込む。',
    },
    15: {
      first: g => `「${g}」に関して思いつくことを5つ書き出す。質より数を優先する。`,
      do:    () => '書き出した中から「一番小さくできるもの」を1つ選び、15分だけ手を動かす。',
      not:   () => '全体の計画・優先順位・完璧な手順はまだ考えなくていい。',
      next:  () => '15分動いた後に「次にやるとしたら何か」を一言メモしておく。',
    },
    30: {
      first: g => `「${g}」に関してやりたいこと・気になることを思いつく限り書き出す。`,
      do:    () => '書き出したものを「今日できる」「来週できる」「後でいい」に分類する。',
      not:   () => '全部を今日やろうとしなくていい。分類するだけで十分前進している。',
      next:  () => '「今日できる」から1つ選んで、具体的な次のアクションを決める。',
    },
  },
  lazy: {
    label: '面倒くさい',
    5: {
      first: g => `タイマーを5分セットして、「${g}」に関係することを何でもいいので始める。`,
      do:    () => '5分経ったら止めていい。終わりが見えると動きやすくなる。',
      not:   () => 'やる気が出るまで待たなくていい。やる気は動いた後に来る。',
      next:  () => '5分後に「続きをやれそうか」だけ自分に確認する。',
    },
    15: {
      first: g => `「${g}」の中で、一番ラクにできる部分だけを選ぶ。`,
      do:    () => 'タイマーを15分セットして、選んだ部分だけを始める。それだけでいい。',
      not:   () => '全部やろうとしなくていい。一番ラクな部分だけでOK。',
      next:  () => '15分後に「続きをやってもいいか」だけ自分に確認する。',
    },
    30: {
      first: g => `「${g}」が面倒に感じる理由を1分で書き出す。`,
      do:    () => '書き出した「面倒の正体」に名前をつける。名前がつくと扱いやすくなる。',
      not:   () => '面倒な気持ちを消そうとしなくていい。気持ちはそのままで行動できる。',
      next:  () => '面倒の中で「一番小さく対処できるもの」を1つ選んで動き始める。',
    },
  },
  perfect: {
    label: '完璧にやろうとしている',
    5: {
      first: g => `「${g}」の60点版でできる最小のアクションを1つ決める。`,
      do:    () => '決めたアクションを5分だけやる。完璧でなくていい。',
      not:   () => '完璧な準備・完璧な状態になるまで待たなくていい。',
      next:  () => '「今日のゴールは完成ではなく前進」と一言メモしておく。',
    },
    15: {
      first: g => `「${g}」の70点版を想像して、今すぐできる最小のアクションを1つ決める。`,
      do:    () => '決めたアクションを15分だけやる。動いてから直せばいい。',
      not:   () => '完璧な計画・完璧な準備・完璧なタイミングはまだ不要。まず動くことが優先。',
      next:  () => 'やってみた後に「次に直すとしたらどこか」を1つだけ決める。',
    },
    30: {
      first: g => `「${g}」について「完璧」とはどんな状態かを具体的に書き出す。`,
      do:    () => '書き出した「完璧」のうち今日なくても困らないものに線を引く。残ったものだけをやる。',
      not:   () => '条件が全部揃ってから始めなくていい。今日の出来が60点でも、それが今日の100点。',
      next:  () => '残ったものの中から「今日できること」を1つ選ぶ。',
    },
  },
  time: {
    label: '時間がない',
    5: {
      first: g => `「${g}」について、5分でできることを1つだけ決める。`,
      do:    () => '決めた1つをタイマー5分でやりきる。それ以上やろうとしない。',
      not:   () => '5分以上かかることは今日やらなくていい。短くても積み重ねが大事。',
      next:  () => '次に5分を確保できるタイミングをカレンダーに入れる。',
    },
    15: {
      first: g => `「${g}」の中で、15分でできる最小のアクションを1つだけ選ぶ。`,
      do:    () => '選んだ1つだけに集中する。他のことは考えない。15分全力でやる。',
      not:   () => '15分で全部終わらせようとしなくていい。今日の分だけ進めばいい。',
      next:  () => '次に15分を確保できるタイミングをカレンダーに入れておく。',
    },
    30: {
      first: g => `「${g}」について「30分でどこまで進めるか」のゴールを1つ設定する。`,
      do:    () => '設定したゴールに向けて30分集中する。途中で止まってもいい。進んだ分だけ前進。',
      not:   () => '30分で全部完了させなくていい。今日できる分だけやれば十分。',
      next:  () => '30分後に「どこまで進んだか」を一言メモする。次のスタート地点になる。',
    },
  },
  worry: {
    label: '不安がある',
    5: {
      first: g => `「${g}」に対して今感じている不安を2つだけ書き出す。`,
      do:    () => '書き出した不安に名前をつける。「なんとなく怖い」→「〇〇が心配」にする。',
      not:   () => 'すべての不安を解消してから動く必要はない。名前をつけるだけで前進できる。',
      next:  () => '不安のうち「今日動けば少し解消できるもの」が1つでもないか探す。',
    },
    15: {
      first: g => `「${g}」に対して今感じている不安を3つ書き出す。`,
      do:    () => '書き出した不安の中から「今日行動することで解消できるもの」を1つ選んで動く。',
      not:   () => '全部の不安を今日解消しなくていい。1つ動くだけで不安は少し小さくなる。',
      next:  () => '動いてみた後に「不安は変わったか」を一言メモする。',
    },
    30: {
      first: g => `「${g}」に関する不安を思いつく限り書き出す。5つ以上出してみる。`,
      do:    () => '書き出した不安を「今日解決できる」「時間が解決する」「そもそも起きないかも」に分類する。',
      not:   () => '不安をゼロにしてから動こうとしなくていい。分類するだけで頭が整理される。',
      next:  () => '「今日解決できる」の中から1つ選んで、具体的な行動を1つ決める。',
    },
  },
  other: {
    label: 'その他',
    5: {
      first: g => `「${g}」について、今感じていることを3行で書き出す。`,
      do:    () => '書き出した中で「一番引っかかっていること」に5分だけ向き合う。',
      not:   () => '今すぐ解決策を出さなくていい。まず整理するだけでいい。',
      next:  () => '「次に動けるとしたら、何をする？」を一言書いておく。',
    },
    15: {
      first: g => `「${g}」について止まっている本当の理由を探す。`,
      do:    () => '「なぜ動けないのか」を15分かけてメモに書き出す。書くうちに見えてくることがある。',
      not:   () => '原因がわからなくてもいい。書き出すこと自体が前進。',
      next:  () => '書き出した中から「明日できること」を1つだけ選ぶ。',
    },
    30: {
      first: g => `「${g}」について、止まっている理由・今の気持ち・本当はどうしたいかを自由に書き出す。`,
      do:    () => '書き出した内容を読み返して「今日行動できること」が1つでもないか探す。',
      not:   () => '全部を今日解決しなくていい。書き出して整理するだけで十分前進している。',
      next:  () => '「今日行動できること」を1つ選んで、次のアクションを決める。',
    },
  },
};

const goalInput = document.getElementById('input-goal');
const errorMsg = document.getElementById('error-msg');
const convertBtn = document.getElementById('convert-btn');
const formSection = document.getElementById('form-section');
const resultSection = document.getElementById('result-section');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');

let selectedReason = null;
let selectedTime = null;

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    document.querySelectorAll(`.choice-btn[data-group="${group}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    if (group === 'reason') selectedReason = btn.dataset.value;
    if (group === 'time') selectedTime = Number(btn.dataset.value);
    errorMsg.textContent = '';
  });
});

convertBtn.addEventListener('click', () => {
  const goal = goalInput.value.trim();
  if (!goal) { errorMsg.textContent = '「やりたいこと」を入力してください。'; return; }
  if (!selectedReason) { errorMsg.textContent = '止まっている理由を選んでください。'; return; }
  if (!selectedTime) { errorMsg.textContent = '今日使える時間を選んでください。'; return; }
  errorMsg.textContent = '';

  const out = OUTPUTS[selectedReason][selectedTime];
  const reasonLabel = OUTPUTS[selectedReason].label;

  document.getElementById('result-goal').textContent = goal;
  document.getElementById('result-reason').textContent = reasonLabel;
  document.getElementById('result-time').textContent = `${selectedTime}分`;
  document.getElementById('label-do').textContent = `${selectedTime}分でやること`;
  document.getElementById('out-first').textContent = out.first(goal);
  document.getElementById('out-do').textContent = out.do(goal);
  document.getElementById('out-not').textContent = out.not(goal);
  document.getElementById('out-next').textContent = out.next(goal);

  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

copyBtn.addEventListener('click', () => {
  const goal = document.getElementById('result-goal').textContent;
  const reason = document.getElementById('result-reason').textContent;
  const time = document.getElementById('result-time').textContent;
  const text = [
    `【やりたいこと】`,
    goal,
    ``,
    `【止まっている理由】`,
    reason,
    ``,
    `【今日使える時間】`,
    time,
    ``,
    `【最初のDo】`,
    document.getElementById('out-first').textContent,
    ``,
    `【${time}でやること】`,
    document.getElementById('out-do').textContent,
    ``,
    `【やらなくていいこと】`,
    document.getElementById('out-not').textContent,
    ``,
    `【次に確認すること】`,
    document.getElementById('out-next').textContent,
    ``,
    `---`,
    `VIGOR TOOLS 15分Do変換ツール`,
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    const orig = copyBtn.textContent;
    copyBtn.textContent = 'コピーしました';
    setTimeout(() => { copyBtn.textContent = orig; }, 2000);
  }).catch(() => {
    copyBtn.textContent = 'コピーに失敗しました';
    setTimeout(() => { copyBtn.textContent = '結果をコピー'; }, 2000);
  });
});

resetBtn.addEventListener('click', () => {
  goalInput.value = '';
  selectedReason = null;
  selectedTime = null;
  document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  resultSection.classList.add('hidden');
  errorMsg.textContent = '';
  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
