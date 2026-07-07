const RESULTS = {
  ai_solo: {
    tag: 'AIに任せる',
    tagClass: 'tag--ai-solo',
    lead: 'このタスク、AIに丸投げして大丈夫です。',
    body: '定型的で正解があり、ミスしても修正しやすい作業です。AIが最も力を発揮するゾーンです。',
    action: 'ChatGPTやClaudeに「〇〇してください」と指示するだけで進みます。まずやってみましょう。',
    caution: '出てきた内容は必ず自分の目で確認してから使いましょう。',
    link: null,
  },
  ai_partner: {
    tag: 'AIと一緒にやる',
    tagClass: 'tag--ai-partner',
    lead: 'AIをパートナーにして、あなたが仕上げましょう。',
    body: 'AIは素材を作るのが得意です。最終的な判断・修正・責任はあなたが持ちます。',
    action: '下書きをAIに頼んで自分の言葉で直す。アイデアをAIに出してもらって自分で選ぶ。',
    caution: '機密情報は入力しない。AIの出力をそのまま「最終版」にしない。',
    link: null,
  },
  self: {
    tag: '自分でやる',
    tagClass: 'tag--self',
    lead: 'このタスクは、あなたが主役です。',
    body: '価値観・責任・人間関係が絡む作業はAIには任せられません。あなたの経験と判断が必要です。',
    action: '最終的な決断は自分でする。「参考に聞く」程度ならAIを使ってもOK。',
    caution: '「どこから動けばいい？」で止まっているなら、15分Do変換ツールを使ってみましょう。',
    link: { text: '15分Do変換ツールで行動に変換する →', href: '../../thinking/15min-do/' },
  },
  human: {
    tag: '人に相談する',
    tagClass: 'tag--human',
    lead: 'このタスクには、人の経験・知識・共感が必要です。',
    body: '専門知識・組織判断・感情的なサポートが必要な作業は、AIより人の方が適切です。',
    action: '専門家（弁護士・税理士・医師）や、信頼できる上司・同僚に相談しましょう。',
    caution: '相談の「準備」にAIを使うのはOK。質問の整理や情報収集にAIを活用できます。',
    link: null,
  },
};

function goStep2(type) {
  document.getElementById('step1').classList.add('hidden');
  document.getElementById('step2-' + type).classList.remove('hidden');
}

function showResult(type) {
  document.querySelectorAll('.step-block').forEach(el => el.classList.add('hidden'));
  const r = RESULTS[type];
  const tagEl = document.getElementById('result-tag');
  tagEl.textContent = r.tag;
  tagEl.className = 'sort-tag ' + r.tagClass;
  document.getElementById('result-lead').textContent = r.lead;
  document.getElementById('result-body').textContent = r.body;
  document.getElementById('result-action').textContent = r.action;
  document.getElementById('result-caution').textContent = r.caution;

  const linkEl = document.getElementById('result-link');
  if (r.link) {
    linkEl.textContent = r.link.text;
    linkEl.href = r.link.href;
    linkEl.classList.remove('hidden');
  } else {
    linkEl.classList.add('hidden');
  }

  document.getElementById('result-section').classList.remove('hidden');
  document.getElementById('result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function retry() {
  document.querySelectorAll('.step-block').forEach(el => el.classList.add('hidden'));
  document.getElementById('result-section').classList.add('hidden');
  document.getElementById('step1').classList.remove('hidden');
  document.getElementById('step1').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
