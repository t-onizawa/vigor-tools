const fs = require("fs");
const path = require("path");

const MATSURI_ROOT = path.resolve(__dirname, "..");
const SITE_NAV_VERSION = "2";

function listFestivalPages(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name, "index.html"))
    .filter((file) => fs.existsSync(file));
}

const targets = [
  { file: path.join(MATSURI_ROOT, "index.html"), sharedPath: "shared" },
  { file: path.join(MATSURI_ROOT, "en", "index.html"), sharedPath: "../shared" },
  ...listFestivalPages(path.join(MATSURI_ROOT, "festivals"))
    .map((file) => ({ file, sharedPath: "../../shared" })),
  ...listFestivalPages(path.join(MATSURI_ROOT, "en", "festivals"))
    .map((file) => ({ file, sharedPath: "../../../shared" }))
];

function occurrenceCount(source, text) {
  return source.split(text).length - 1;
}

function addTags(target) {
  const cssTag = `<link rel="stylesheet" href="${target.sharedPath}/site-nav.css?v=${SITE_NAV_VERSION}">`;
  const scriptTag = `<script src="${target.sharedPath}/site-nav.js?v=${SITE_NAV_VERSION}"></script>`;
  let source = fs.readFileSync(target.file, "utf8");

  source = source
    .replace(`${target.sharedPath}/site-nav.css?v=1`, `${target.sharedPath}/site-nav.css?v=${SITE_NAV_VERSION}`)
    .replace(`${target.sharedPath}/site-nav.js?v=1`, `${target.sharedPath}/site-nav.js?v=${SITE_NAV_VERSION}`);

  if (!source.includes(cssTag)) {
    if (!source.includes("</head>")) throw new Error(`${target.file}: </head>がありません`);
    source = source.replace("</head>", `  ${cssTag}\n</head>`);
  }
  if (!source.includes(scriptTag)) {
    if (!source.includes("</body>")) throw new Error(`${target.file}: </body>がありません`);
    source = source.replace("</body>", `  ${scriptTag}\n</body>`);
  }
  fs.writeFileSync(target.file, source);
}

function verify(target) {
  const source = fs.readFileSync(target.file, "utf8");
  const cssTag = `<link rel="stylesheet" href="${target.sharedPath}/site-nav.css?v=${SITE_NAV_VERSION}">`;
  const scriptTag = `<script src="${target.sharedPath}/site-nav.js?v=${SITE_NAV_VERSION}"></script>`;
  if (occurrenceCount(source, cssTag) !== 1 || occurrenceCount(source, scriptTag) !== 1) {
    throw new Error(`${target.file}: site-navタグが各1件ではありません`);
  }
  if (source.indexOf(cssTag) > source.indexOf("</head>")) {
    throw new Error(`${target.file}: CSSタグが</head>より後です`);
  }
  if (source.indexOf(scriptTag) > source.indexOf("</body>")) {
    throw new Error(`${target.file}: JSタグが</body>より後です`);
  }
  if (source.includes(`${target.sharedPath}/site-nav.css?v=1`) || source.includes(`${target.sharedPath}/site-nav.js?v=1`)) {
    throw new Error(`${target.file}: site-navの旧v1参照が残っています`);
  }
}

targets.forEach(addTags);
targets.forEach(verify);

const jpFestivalCount = targets.filter(({ file }) => file.includes(`${path.sep}festivals${path.sep}`) && !file.includes(`${path.sep}en${path.sep}`)).length;
const enFestivalCount = targets.filter(({ file }) => file.includes(`${path.sep}en${path.sep}festivals${path.sep}`)).length;
console.log(`site-nav追加・検証成功: 合計${targets.length}件（JP詳細${jpFestivalCount}、EN詳細${enFestivalCount}、一覧2）`);
