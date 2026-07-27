# VIGOR MATSURI — 詳細ページ テンプレート化方針

```
Version: 0.1
Created: 2026-07-27
Scope: 石岡のおまつり1件を共通構造へ移行するところまで。
       8件展開・一覧ページ・絞り込みページは対象外。
```

石岡のおまつりのプロトタイプ（`matsuri/festivals/ishioka-omatsuri/`）を
8件展開する前に、共通化すべき部分と祭りごとに残す部分を整理する。
フレームワーク・ビルドツールは導入せず、GitHub Pagesでそのまま動く
静的構成を維持する。

---

## 1. 現状4ファイルの構造レビュー

| ファイル | 現状 |
|---|---|
| `style.css` | **石岡固有の記述なし。** 色・レイアウト・バッジ表現まで完全に汎用 |
| `script.js` | **ほぼ完全にデータ駆動。** グローバル変数`FESTIVAL`（`data.js`が定義）を読むだけで、石岡固有のロジックは一切ない |
| `index.html` | 骨格（各セクションのid構造）はほぼ汎用。`<title>`タグと`data.js`への参照のみが個別 |
| `data.js` | 完全に石岡固有 |

つまり現状のscript.js／style.cssは、**すでに実質「共通コンポーネント」
として書かれている**。8件展開に向けた作業は「新しい共通ロジックを
書く」ことではなく、「すでに汎用な2ファイルを共有できる場所に
物理的に移す」ことが中心になる。

### レビューで見つかった2つの不備

1. **`highlightComment`（一言見どころコメント）のレンダリングコードが
   存在しない。** `data.js`にはフィールドがあるが、石岡の値が`null`
   だったため、`script.js`にも`index.html`にも対応するセクションが
   一度も作られていない。「値があれば表示、`null`なら非表示」という
   設計（schema-design.md）はまだ実装されていない。8件展開前に
   実装が必要（次のCodexプロンプトに含める）。

2. **`renderAtmosphereMedia()`は`type === "youtube"`のみ対応。**
   Instagram・TikTokの場合は無条件でセクションごと削除される
   （沈黙のフォールバック）。現時点でInstagram/TikTokの採用候補が
   ないため今回は対応を広げず、**「YouTube以外は今のところ未対応」
   と明記した上で据え置く**（過剰設計を避けるため、需要が出てから拡張）。

---

## 2. ディレクトリ構成案

```
matsuri/
  shared/
    festival-detail.css   ← 現style.cssを移動
    festival-detail.js    ← 現script.jsを移動（highlightComment対応を追加）
  festivals/
    ishioka-omatsuri/
      index.html            ← ../../shared/ を参照するよう更新
      data.js               ← 変更なし
    （次フェーズ）sawara-natsu-matsuri/
      index.html
      data.js
```

祭りごとに残るのは `index.html`（骨格のコピー、`<title>`のみ変更）と
`data.js`（完全に個別）の2つだけになる。

---

## 3. 共通化候補（ご指定8項目）への対応状況

| 項目 | 実装場所（現状） | 移行後 |
|---|---|---|
| true/false/null/"n/a"の表示分岐 | `availabilityState()` | `shared/festival-detail.js`へ移動、そのまま流用 |
| 開催確認ステータスのラベル変換 | `eventStatusLabels` | 同上 |
| 日付表示 | `formatDate()` | 同上 |
| 出典・確認日表示 | `createSourceBlock()` | 同上 |
| atmosphereMediaの代表1件表示 | `renderAtmosphereMedia()`（YouTube限定） | 同上、YouTube限定のまま |
| 空配列/null時のセクション非表示 | `atmosphereMedia`のみ実装済み。`highlightComment`は未実装 | 同上へ移動＋`highlightComment`分を新規実装 |
| 詳細ページの情報順序 | `index.html`のセクション並び | 各`festivals/<slug>/index.html`に物理的に複製（静的サイトのため、順序そのものを1箇所で共有する仕組みは持たない） |
| モバイル向け基本スタイル | `style.css`全体 | `shared/festival-detail.css`へ移動、そのまま流用 |

---

## 4. 過剰設計・複雑化リスクの確認

以下は**やらない**。

- ビルドツール・バンドラー（Webpack/Vite等）やフレームワークの導入
- 汎用的な「JSONを渡せば何でも描画できる」レンダリングエンジン化
  （VIGOR MATSURIのスキーマ専用のシンプルな関数群のままにする）
- `index.html`の骨格までJavaScriptで完全自動生成すること
  （祭り8件程度の規模では、HTMLを複製する方が人間が中身を目で
  確認しやすく、壊れたときの原因も追いやすい。完全自動生成は
  「id属性の対応関係がコードの中でしか分からない」状態を生み、
  非エンジニアが今後手を入れる余地を狭める）
- CSSのユーティリティクラス化・独自デザインシステム化

**残るリスク：** `index.html`を祭りごとに手でコピーするため、id属性の
typoが起きると`shared/festival-detail.js`側は該当要素を見つけられず
黙って例外を投げる（`document.getElementById`が`null`を返し、
`.textContent`アクセスでエラーになる）。8件規模ではこのエラーは
ブラウザのコンソールに出るため気づけると判断し、追加の検証機構は
今回作らない。祭りの件数が大きく増えた場合に再検討する。

---

## 5. 8件目以降を追加する際の想定手順（参考、今回は実施しない）

```
1. matsuri/festivals/ 配下に新しい祭りのフォルダを作成
2. 既存フォルダの index.html をコピーし、<title> タグのみ変更
   （<link>・<script src> のパスはそのまま使える）
3. data.js を新規作成（schema-design.mdのスキーマに沿って）
4. ブラウザで表示確認
```

---

## 6. 次の検証対象（佐原の大祭 夏祭り）で確認したい観点

次フェーズで実施する。今回は着手しない。

- 石岡と特徴のパターンが異なるデータ（例：神輿の比重が異なる、
  曳き回しの有無が違う等）でテンプレートのレイアウトが崩れないか
- `highlightComment`に実際に値が入るケースの表示（今回新規実装する分）
- 出典が複数系統・年度別情報の書きぶりが違う場合の見え方

---

## この文書の使い方

- 8件展開時の実装方針に迷ったとき → 本書の「共通化候補への対応状況」
- 新しい共通化候補が出てきたとき → 本書に追記し、過剰設計リスクの
  確認を必ず行ってから着手する
- スキーマそのものの変更は本書ではなく `schema-design.md` を参照

---

## 変更履歴

```
v0.1  2026-07-27
    初版。石岡のおまつり4ファイルの構造レビュー、共通化候補8項目への
    対応状況、ディレクトリ構成案（shared/ + festivals/<slug>/）、
    過剰設計リスクの確認を整理。highlightCommentのレンダリング未実装、
    atmosphereMediaのYouTube限定対応という2つの不備を記録した。
```
