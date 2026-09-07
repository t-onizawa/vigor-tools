# VIGOR MATSURI — 多言語化（英語版）設計文書

```
Version: 0.1（設計レビュー段階、実装未着手）
Created: 2026-09-07
Scope: 英語版MVPの設計。将来10言語まで拡張可能な構造を前提とするが、
       実際に作るのは英語のみ・対象数ページに限定する。
```

本書はschema-design.md・atmosphere-media-guide.mdと同じ位置付けの設計
文書であり、実データ・実装コードは含まない。実装はCodex CLIへの個別
プロンプトで行う（本書末尾のタスク分割を参照）。

---

## 0. 目的

「海外ユーザーが日本の祭りを探し、理解し、旅行計画を立てられるサイト」
を作る。ただし今回は**設計のみ**。実装はTravelpayouts（Booking.com/
Agoda）の審査待ち期間を使った先行準備であり、公開・大規模展開はしない。

## 1. 大方針（確認済み）

- 日本語版を唯一の正とする
- 英語は翻訳版として管理する
- URLはSEOを考慮した構成にする
- 将来的に他言語も追加しやすい設計にする
- 保守コストをできるだけ増やさない

## 2. 前提の確認（設計に入る前に整理した2点）

### 2.1 URL階層：`/en/`（サイトルート）ではなく`/matsuri/en/`

理由：
- `/en/`をサイトルート直下に作ることは、VIGOR TOOLS（現在50本で固定・
  新規開発停止中、Founder Review 2026-09-04決裁）を含むLAB全体の
  多言語化を前提にした構造になる。TOOLS側の多言語化計画は存在しない
  時点で、LAB全体構造を先に決め打ちするのは時期尚早
- root直下への新規ディレクトリ作成はmatsuri担当の権限外（root CLAUDE.md
  の境界ルール）
- `matsuri/en/`ならmatsuri担当の権限内で完結し、将来LAB全体で多言語化
  する話が出た場合もリダイレクト1回（`/en/*` → `/matsuri/en/*`等）で
  移行できる。今の選択が将来の選択肢を狭めない

### 2.2 スコープ外にした機能：地域ページ・開催年ページ・パンくず

いずれも**現在の日本語版に存在しない**。日本語版のURLはトップの一覧
ページ1件のみで、都道府県・特徴・開催月による絞り込みは全てクライアント
サイドJSのフィルターであり、`/matsuri/kanto/`のような静的な地域別URLや
`/matsuri/2026/`のような年別アーカイブURL、構造化されたパンくずリストは
存在しない。

英語版でこれらを新設すると、英語版が日本語版の上位互換（スーパーセット）
になり、「日本語版を唯一の正とする」方針と矛盾する。**これらは英語版
MVPのスコープから除外する。** 将来SEO上の必要性が具体的に見えた場合は、
まず日本語版で先に作ってから翻訳する順序にする。

英語版MVPで作るページ種別は以下の2つのみ：
- 一覧ページ（`matsuri/en/index.html`）
- 祭り詳細ページ（`matsuri/en/festivals/<slug>/index.html`）

---

## 3. URL設計

```
一覧          https://vigorlab.net/matsuri/en/
祭り詳細      https://vigorlab.net/matsuri/en/festivals/<slug>/
```

- `<slug>`は日本語版と**完全に同じ値**を使う（例：`ishioka-omatsuri`）。
  slugを翻訳・変更しない。理由：hreflangの対応付けが機械的に行える、
  将来の多言語展開でも言語ごとにslugを管理する必要がない
- 末尾スラッシュ・index.html配置は日本語版の慣習に合わせる

---

## 4. データ構造：JP data.jsを唯一の事実源にする

**これが本設計の中核判断。** Founderのレビューで確認済み。

### 4.1 構造

```
matsuri/festivals/<slug>/data.js       … 既存。事実データ（無変更）
matsuri/en/festivals/<slug>/translation.js  … 新設。英語の翻訳テキストのみ
```

`translation.js`は以下のような、翻訳対象フィールドだけを持つ小さな
オブジェクトにする（変数名はJPの`FESTIVAL`と衝突しないよう
`FESTIVAL_TRANSLATION_EN`とする）：

```js
const FESTIVAL_TRANSLATION_EN = {
  id: "ishioka-omatsuri",              // JP側data.jsとの対応キー
  name: "Ishioka Matsuri",
  officialName: "Hitachi Sōja-gū Grand Festival",
  highlightComment: "The roofed \"horo-jishi\" float, where musicians perform inside a covered structure, is rare nationwide...",
  hayashiNote: null,                    // JP側にnullならEN側もnull
  metaDescriptionOverride: null         // 通常はhighlightComment等から自動生成。個別上書きが必要な場合のみ設定
};
```

**このファイルに絶対に含めないもの：** `dates`, `eventStatus`,
`features`（true/false/null/"n/a"）, `access.hasParking`,
`confirmation`, `schedule`, `backgroundImage`, `atmosphereMedia`。
これらは全てJP側`data.js`から直接読み込む。

### 4.2 レンダリング時の合成

英語版の`index.html`は、日本語版のdata.jsと自分のtranslation.jsの
**両方**を`<script>`タグで読み込む：

```html
<script src="../../../festivals/ishioka-omatsuri/data.js"></script>
<script src="./translation.js"></script>
<script src="../../../shared/i18n-strings.js"></script>
<script src="../../../shared/festival-detail.js"></script>
```

`festival-detail.js`側で、`FESTIVAL`（事実データ）と
`FESTIVAL_TRANSLATION_EN`（翻訳テキスト、存在する場合のみ）をマージ
して描画する。translation.js側に無いフィールドはJP側の値をそのまま
使う（フォールバック）ため、翻訳が未着手の項目があってもページは壊れ
ない。

### 4.3 このデータ構造の効果

- **日程・開催確認状況の二言語間ズレが構造的に発生しない。** JP側で
  eventStatusを`confirmed`→`ended`に直せば、英語版も次回読み込み時に
  自動的に反映される。Data Integrity v0.1のチェック対象もJP側1箇所の
  ままでよい（英語版専用の整合性チェックを別途作る必要がない）
- **将来10言語への拡張コストが最小。** 言語を1つ増やすごとに必要な
  ファイルは、その言語の`translation.js`（4〜5個のテキストフィールド）
  だけ。事実データの二重管理は言語数に比例して増えない
- **AI翻訳との相性が良い。** 翻訳対象がname・highlightComment・
  hayashiNote・officialName等、数個の独立した文字列フィールドに
  限定されているため、将来AI翻訳を導入する場合も「この4〜5フィールド
  を訳す」という単純なタスクに落とし込める（第10節で詳述）

---

## 5. レンダリング設計：ロケール判定とUI文言辞書

### 5.1 ロケール判定

各ページの`<html lang="ja">`／`<html lang="en">`を
`document.documentElement.lang`で読み取るだけで判定する。新しい
設定ファイルやURL解析ロジックは不要（既存のHTML属性を再利用するだけ）。

### 5.2 UI文言辞書（新設：`shared/i18n-strings.js`）

「開催日」「駐車場」「開催地・アクセス」「見どころ」「よくある質問」
「当日の目安スケジュール」「宿泊」「関連する祭り」「出典・確認日」等、
`festival-detail.js`内にハードコードされている日本語UI文言を、以下の
ような辞書に切り出す：

```js
const UI_STRINGS = {
  ja: {
    dates: "開催日", parking: "駐車場", access: "開催地・アクセス",
    highlights: "見どころ", faq: "よくある質問",
    schedule: "当日の目安スケジュール", lodging: "宿泊",
    related: "関連する祭り", sources: "出典・確認日"
    // ...
  },
  en: {
    dates: "Dates", parking: "Parking", access: "Location & Access",
    highlights: "Highlights", faq: "FAQ",
    schedule: "Event Schedule", lodging: "Where to Stay",
    related: "Related Festivals", sources: "Sources & Last Verified"
    // ...
  }
};
```

### 5.3 日付フォーマット

現在の`formatDate`/`formatDateList`は`Intl.DateTimeFormat("ja-JP", ...)`
固定。ロケールに応じて`"en-US"`（例：`Sep 19, 2026 (Sat)`）に切り替える
関数を追加する。既存のJP向け関数は**変更しない**（新しい関数を追加し、
`festival-detail.js`内の呼び出し箇所でロケール分岐する）。

### 5.4 既存コードへの影響（第11節と対応）

- `festival-detail.js`は関数追加・条件分岐の追加のみ。ロケール判定が
  `"ja"`（またはlang属性なし）の場合は**現状と完全に同じ動作**になる
  設計にする（デフォルトフォールバックをJP挙動にする）
- 既存174件超のJPページの`data.js`・`index.html`は**一切変更しない**
- 変更が入る共有ファイルは`festival-detail.js`・`festival-list.js`
  （英語一覧ページを作る場合）のみ。変更後は**既存JPページ全件の
  レンダリングが変化しないことをタスク完了条件として必須化する**
  （回帰確認）

---

## 6. hreflang設計

対応する英語ページが**実際に存在する**JPページにのみ、相互参照の
hreflangを追加する（存在しないページへのhreflangはSearch Consoleで
エラーになる既知の失敗パターンのため、機械的に「対がある時だけ」を
徹底する）。

```html
<!-- matsuri/festivals/ishioka-omatsuri/index.html (JP) -->
<link rel="alternate" hreflang="ja" href="https://vigorlab.net/matsuri/festivals/ishioka-omatsuri/">
<link rel="alternate" hreflang="en" href="https://vigorlab.net/matsuri/en/festivals/ishioka-omatsuri/">
<link rel="alternate" hreflang="x-default" href="https://vigorlab.net/matsuri/festivals/ishioka-omatsuri/">

<!-- matsuri/en/festivals/ishioka-omatsuri/index.html (EN) -->
<link rel="alternate" hreflang="ja" href="https://vigorlab.net/matsuri/festivals/ishioka-omatsuri/">
<link rel="alternate" hreflang="en" href="https://vigorlab.net/matsuri/en/festivals/ishioka-omatsuri/">
<link rel="alternate" hreflang="x-default" href="https://vigorlab.net/matsuri/festivals/ishioka-omatsuri/">
```

`x-default`は常に日本語版（日本語版が唯一の正であり、かつサイトの
主要言語のため）。

---

## 7. canonical・robots

- **各言語ページは自分自身に対するself-referencing canonicalを持つ。**
  英語ページのcanonicalを日本語ページに向けない（「これは重複コンテンツ
  だから無視してよい」という誤ったシグナルになる、多言語SEOでの典型的
  な誤り）。言語間の関係はcanonicalではなくhreflangで表現する
- robots.txt：現行の`Allow: /`のまま変更不要。`matsuri/en/`配下も
  通常にクロール対象とする

---

## 8. title・description・OGP・JSON-LDの多言語対応

- title/description/OGP：JP版と同じく**各ページ個別の静的テキスト**
  として`index.html`に直書きする（実行時生成しない、既存JP方針を踏襲）。
  ただし機械翻訳の直訳ではなく、英語圏での検索意図（"Ishioka Matsuri
  dates", "Japan festival September"等）を意識して作成する
- `og:locale`（`en_US`）・`og:locale:alternate`（`ja_JP`）を追加する
  （JP側にも`og:locale: ja_JP`・`og:locale:alternate: en_US`を対で
  追加、対応する英語ページがある場合のみ）
- `og:site_name`は言語を問わず`"MATSURI"`で統一（ブランド一貫性）
- JSON-LD（Event）：`festival-detail.js`のJSON-LD生成ロジックは、EN
  ロケールの場合、翻訳済みの`name`・`description`を使い、
  `inLanguage: "en"`（JP側は`"ja"`）を追加する。schema.org側の特別な
  多言語機構は使わない（ページごとに完結したJSON-LDでよい）
- FAQPage JSON-LD：`buildFaqItems()`が生成する質問文もUI_STRINGS経由の
  テンプレートにし、日程・駐車場の値はJP側data.jsの値をそのまま英語の
  文型に流し込む（新しい翻訳フィールドは増やさない）

---

## 9. 翻訳対象・非対象グロッサリー

| 分類 | 扱い |
|---|---|
| 地名（都道府県・市区町村） | 翻訳ではなくローマ字化＋英語表記慣習（例：`Ishioka, Ibaraki Prefecture`）。直訳しない |
| 山車・神輿・お囃子等の文化固有語 | 初出はローマ字＋簡潔な英語説明を併記（例：`a *dashi* (festival float)`, `*mikoshi* (portable shrine)`）。2回目以降はローマ字表記のみでよい。日本語のまま・完全な意訳のみ、はどちらも避ける |
| 神社・団体等の固有名詞（officialName） | ローマ字化＋説明的な英語表記。文字通りの逐語訳はしない |
| 年号 | `2026年` → `2026`（漢数字・年の助数詞を除去するだけ） |
| 日付 | 英語の日付表記慣習に変換（`Sep 19–21, 2026 (Sat–Mon)`等）。第5.3節のフォーマッタで処理、翻訳者が手動で書式を決めない |
| 画像alt属性 | **翻訳する。** アクセシビリティ・画像SEOの両面で英語ページには英語altが必須 |
| eventStatusの文言 | 第4.1節のとおり新規翻訳フィールドを作らず、UI_STRINGS側にeventStatus別の英語テンプレート（confirmed→"Confirmed for {dates}"等）を用意し、JP側のeventStatus値をそのまま流し込む |

---

## 10. 将来のAI翻訳導入を見据えたデータ構造

第4節の設計により、翻訳作業の単位は常に「1festival・1言語あたり
4〜5個の独立した文字列フィールド」に固定される。将来AI翻訳を導入する
場合の想定フローは：

```
1. JP data.jsから翻訳対象フィールド（name, highlightComment,
   hayashiNote, officialName）を抽出
2. AI翻訳API等で下訳を生成
3. 人間（Founder or Claude）がレビュー・文化的ニュアンスを調整
4. translation.js（言語ごとに1ファイル）として保存
```

新しい言語を追加する際、スキーマ変更・レンダリングロジックの大幅な
変更は不要。`matsuri/<lang>/festivals/<slug>/translation.js`を追加し、
`UI_STRINGS`に該当言語のキーを追加し、対応する日付フォーマットの
ロケールを1行加えるだけで拡張できる設計にしてある。

---

## 11. 既存コードへの影響範囲（まとめ）

| ファイル | 影響 |
|---|---|
| 既存174件超の`matsuri/festivals/*/data.js` | **変更なし** |
| 既存174件超の`matsuri/festivals/*/index.html` | 対応する英語版ができた時だけ、hreflang 3行・og:locale 2行を追加（それ以外は変更なし） |
| `matsuri/shared/festival-detail.js` | ロケール分岐・翻訳データ合成ロジックを追加。JP挙動をデフォルトフォールバックにし、既存JPページのレンダリング結果が変化しないことを完了条件とする |
| `matsuri/shared/festival-list.js` | 英語一覧ページを作る場合のみ、同様の追加 |
| `matsuri/shared/i18n-strings.js` | 新設ファイル |
| `matsuri/shared/festival-detail.css` | 変更不要（英語でもレイアウトは同じ想定） |
| `matsuri/scripts/check-data-integrity.js` | 変更不要（チェック対象は引き続きJP data.jsのみ、第4.3節の効果） |

---

## 12. タスク分割（実装着手時にCodexへ渡す粒度）

実装は着手しない。着手する場合は以下の順序・粒度で分割する想定。

```
Task 1（基盤・非公開影響ゼロ）
  - shared/i18n-strings.js 新設
  - festival-detail.jsにロケール分岐・EN日付フォーマッタ追加
    （lang="ja"時は現状と完全に同じ出力になることを回帰確認必須）
  - 既存JPページを最低5件、変更前後で出力差分が無いことを確認

Task 2（パイロット1ページ）
  - 対象：石岡のおまつり（ishioka-omatsuri）
    理由：JPコンテンツが厚い、宿泊CTA・アフィリエイトも既に設定済みで
    英語版での収益導線検証もそのまま行える
  - matsuri/en/festivals/ishioka-omatsuri/ 新設
    （index.html・translation.js）
  - JP側index.htmlにhreflang・og:locale追加
  - canonical・JSON-LD（inLanguage含む）・OGP・meta descriptionを
    英語で作成
  - sitemap.xmlへの追加は統括担当への依頼（自己登録の信頼性が低いため
    最初から依頼ルートを使う）

Task 3（一覧ページ）
  - matsuri/en/index.html 新設。地域・特徴フィルター等の複雑なUIは
    最初から移植せず、まずは翻訳済みページへの静的リンク一覧のみで
    最小構成にする（保守コストを増やさない方針に合わせる）

Task 4（検証・計測）
  - 英語ページのSearch Console登録
  - GA4での英語ページ流入確認
  - 宿泊CTA（第6回Founder Reviewで運用中のRakuten Travel/将来のBooking.com）
    のクリック計測が英語ページでも機能することを確認

Task 5（拡張判断、Task 1-4の結果を見てから）
  - 対象を宿泊CTAと同じ6件（青森ねぶた祭・おわら風の盆・秩父夜祭・
    高山祭・郡上おどり）まで拡大するかを判断
```

---

## 変更履歴

```
v0.1  2026-09-07
    初版制定。Founderからの英語版設計レビュー依頼を受けて作成。
    URL階層を/en/から/matsuri/en/へ変更する提案、地域・年別ページ・
    パンくずをMVPスコープから除外する提案、JP data.jsを唯一の事実源と
    しtranslation.jsで翻訳テキストのみを管理するデータ構造を設計。
    実装は未着手（Travelpayouts審査待ち期間の設計準備として作成）。
```
