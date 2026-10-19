// 段階2の公開制御。段階3へ移行するときはFounder承認のうえ別途変更する。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { ROBOTS_CONTENT } = require('./generate-weekend-page');
assert.equal(ROBOTS_CONTENT, 'noindex,follow');
assert.match(read('matsuri/this-weekend/index.html'), /<meta name="robots" content="noindex,follow">/);
assert.doesNotMatch(read('matsuri/index.html'), /href=["'][^"']*this-weekend(?:\/|["'?#])/);
assert.doesNotMatch(read('sitemap.xml'), /<loc>\s*https:\/\/vigorlab\.net\/matsuri\/this-weekend\/?\s*<\/loc>/);
console.log('STAGE2 PASS: noindex,follow / トップリンクなし / sitemap登録なし');
