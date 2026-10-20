// 実際のGit履歴で同一SHA・子孫SHA・無関係SHAを検証。外部API/本番取得はスタブ化。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const script = path.join(__dirname, 'verify-weekend-pages.sh');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'weekend-pages-race-test-'));
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
try {
  const source = path.join(temp, 'source');
  fs.mkdirSync(source);
  git(source, 'init', '-b', 'main');
  git(source, 'config', 'user.name', 'test');
  git(source, 'config', 'user.email', 'test@example.invalid');
  fs.mkdirSync(path.join(source, 'matsuri/this-weekend'), { recursive: true });
  const html = path.join(source, 'matsuri/this-weekend/index.html');
  const commit = (text) => { fs.writeFileSync(html, text); git(source, 'add', '.'); git(source, 'commit', '-m', 'test'); return git(source, 'rev-parse', 'HEAD'); };
  const a = commit('old HTML\n');
  const b = commit('latest main HTML\n');
  git(source, 'checkout', '-b', 'sibling', a);
  const sibling = commit('unrelated HTML\n');
  git(source, 'checkout', 'main');

  const bin = path.join(temp, 'bin');
  fs.mkdirSync(bin);
  const stub = `#!${process.execPath}
const fs=require('node:fs'),path=require('node:path');
const tool=path.basename(process.argv[1]),args=process.argv.slice(2);
if(tool==='gh') process.stdout.write(process.env.TEST_BUILD);
else if(tool==='curl') {
 fs.appendFileSync(process.env.TEST_CURL_LOG,'curl\\n');
 fs.writeFileSync(args[args.indexOf('-o')+1],process.env.TEST_HTML);
 fs.writeFileSync(args[args.indexOf('--dump-header')+1],'HTTP/2 200\\nAge: 0\\nX-Cache: MISS\\n');
}
`;
  for (const name of ['gh', 'curl', 'sleep']) fs.writeFileSync(path.join(bin, name), stub, { mode: 0o755 });
  const cases = [
    ['同一SHA', b, b, 'built', 'latest main HTML\n', true, true],
    ['子孫SHAは最新main HTMLと比較', a, b, 'built', 'latest main HTML\n', true, true],
    ['別SHAの実ビルド失敗も即失敗', a, sibling, 'errored', 'latest main HTML\n', false, false],
    ['無関係なSHAは成功扱いしない', b, sibling, 'built', 'latest main HTML\n', false, false],
    ['古いHTMLは不一致で失敗', a, b, 'built', 'old HTML\n', false, true],
  ];
  for (const [i, [name, expected, build, status, production, success, curl]] of cases.entries()) {
    const cwd = path.join(temp, `run-${i}`);
    git(temp, 'clone', source, cwd);
    git(cwd, 'checkout', a);
    const summary = path.join(cwd, 'summary');
    const curlLog = path.join(cwd, 'curl-log');
    const run = spawnSync('bash', [script], { cwd, encoding: 'utf8', env: {
      ...process.env, PATH: `${bin}:${process.env.PATH}`, BUILD_URL: 'test-build', EXPECTED_SHA: expected,
      RUNNER_TEMP: cwd, GITHUB_STEP_SUMMARY: summary, GITHUB_RUN_ID: 'test', GITHUB_RUN_ATTEMPT: '1',
      TEST_BUILD: JSON.stringify({ status, commit: build }), TEST_HTML: production, TEST_CURL_LOG: curlLog,
    } });
    assert.equal(run.status === 0, success, `${name}: ${run.stdout}\n${run.stderr}`);
    assert.equal(fs.existsSync(curlLog), curl, name);
    if (success) assert(fs.readFileSync(summary, 'utf8').includes(`比較main SHA: ${b}`));
    console.log(`PASS ${name}`);
  }
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
