# VIGOR LAB プロジェクトルール

## 判断基準の参照

組織原則・役割・開発方式で迷ったら `CHARTER.md` を、
プロダクト（VIGOR TOOLS）の企画・ブランド表現・収益化で迷ったら
`VISION.md` を、誰が何を担当しているかは `Roles.md` を、
note等で発信する文章の文体で迷ったら `NoteStyleGuide.md` を、
LAB全体の中長期ロードマップ・収益設計で迷ったら `Roadmap.md` を参照する。

```
CHARTER.md          VIGOR LAB全体の組織原則・唯一のMission・役割の権限定義
Roles.md             現在の役割の担当者（人事台帳）
VISION.md            VIGOR TOOLSの Vision / Brand / Principles
Backlog.md           次に何を検討するか（育てる候補）
Roadmap.md           LAB全体の中長期ロードマップ・収益設計・Founderレビュー
NoteStyleGuide.md    note記事の文体ガイド（VIGOR LAB全体の発信文章に共通適用）
CLAUDE.md            実装者への実務ルール（このファイル）
```

CLAUDE.md は「どう作るか」（ファイル構成・公開前チェックなど実務ルール）のみを扱う。
組織原則やプロダクト哲学と重複する内容は、今後 CHARTER.md / VISION.md 側に
寄せていく方針（詳細は CHARTER.md の Documents / Non-Goals を参照）。

`matsuri/` は VIGOR TOOLS とは別プロダクト「VIGOR MATSURI」（VIGOR LABの
姉妹プロジェクト）。企画判断基準は `matsuri/CONCEPT.md`、未着手項目は
`matsuri/Backlog.md` を参照する。本書の開発方針・小ツールの基本方針・
デザイン方針はVIGOR LAB全体の運用ルールとして両プロダクトに共通適用される。

---

## リポジトリ構成と各プロジェクトの責務

```
/
├── CLAUDE.md                          VIGOR LAB全体の実務ルール（このファイル）
├── CHARTER.md / Roles.md / VISION.md / Backlog.md   組織原則・VIGOR TOOLS企画
├── NoteStyleGuide.md                   note等の発信文章の文体ガイド（LAB全体共通）
├── Roadmap.md                           LAB全体の中長期ロードマップ・収益設計
├── sitemap.xml / robots.txt / assets/  VIGOR LAB全体の横断基盤
├── index.html / style.css / script.js  VIGOR TOOLSのルート
├── tools/                              VIGOR TOOLS（小ツール群）
└── matsuri/                            VIGOR MATSURI（祭りガイド）
    └── CONCEPT.md / Backlog.md / schema-design.md  matsuri固有の企画・仕様
```

- **tools/** はVIGOR TOOLS担当の責務。本ファイルの「小ツールの基本方針」
  「デザイン方針」「公開前チェック」に従う。
- **matsuri/** はVIGOR MATSURI担当の責務。企画判断は`matsuri/CONCEPT.md`、
  未着手項目は`matsuri/Backlog.md`を優先する。デザイン方針・公開前チェックは
  共通適用されるが、matsuri固有のスキーマ・テンプレート仕様は
  `matsuri/schema-design.md`等が優先する。
- **root直下**（CLAUDE.md, sitemap.xml, robots.txt, assets/, index.html等）は
  VIGOR LAB全体の統括担当の責務。tools/matsuriの個別ページ内容や
  プロダクト固有仕様には踏み込まない。

## 変更範囲のルール（境界）

- tools担当は `tools/` 配下のみを変更する。root直下・`matsuri/`配下への
  変更が必要な場合は提案に留め、実際の変更は統括担当に依頼する。
- matsuri担当は `matsuri/` 配下のみを変更する。root直下・`tools/`配下への
  変更が必要な場合は同様に統括担当に依頼する。
- 統括担当は root直下・`sitemap.xml`・`robots.txt`・`assets/`（共通アセット）・
  SEO/計測の横断設定を担当する。tools/matsuriの個別ページ内容や
  プロダクト固有仕様には踏み込まない。
- 越境が必要な場合（例：matsuri用の新コンポーネントをroot共通CSSに追加する等）
  は無断で変更せず、必ず該当担当へ相談する。

---

## プロジェクトの目的

VIGOR LAB は、会社員に依存しない収入源を作り、将来的に独立するための小さな実験室である。

ここでは、小さな Web ツール、テンプレート、チェックシート、診断ツール、比較表、プロンプト集などを作り、公開・検証していく。

目的は、最初から完璧なサービスを作ることではない。  
小さく作り、外に出し、反応を見て育てること。

---

## 開発方針

- 完璧を待たず、小さく作って早く出す
- v0.1 を優先する
- 過剰設計しない
- まず動くものを作る
- 出してから改善する
- 反応を見て残すものを育てる
- ユーザーが疲れていても使える、シンプルな道具にする

---

## 共通基盤を変更するときのルール

以下は「共通基盤」に該当し、変更前に影響範囲（tools/matsuri双方への
影響）を確認する。

- root直下の `style.css` / `script.js` / 共通head要素
- `assets/` 配下の共通アセット（favicon, OGP画像, manifest等）
- `sitemap.xml` / `robots.txt`
- 計測タグ（Analytics/Search Console等、導入時）

変更手順：
1. tools・matsuri双方の既存ページへの影響を確認する
2. 影響がある場合は変更前に該当プロダクト担当へ共有・相談する
3. 一括置換のような大規模変更は必ず事前相談する（無断で進めない）

## schema・データ構造変更時の相談ルール

- プロダクト固有のデータ構造（例：`matsuri/schema-design.md`）は
  プロダクト担当が管理する。
- スキーマ・データ構造の変更は既存ページ・既存データとの互換性に
  影響するため、統括担当・プロダクト担当のどちらが起点でも、
  実施前に相手へ共有し合意を取ってから進める。
- 影響範囲が不明な場合は、まず影響を受けるファイル一覧を洗い出してから
  相談する。

## SEO・計測など横断機能の管理責任

- SEO基盤（sitemap.xml, robots.txt, canonical, meta description, OGP,
  favicon/manifestの共通head設計）はVIGOR LAB統括担当が管理責任を持つ。
- 各ページへの実際の反映内容（meta description本文、OGP画像の中身等）は
  プロダクト担当が行い、統括担当は横断的な仕組み・一貫性を担保する。
- 計測基盤（Search Console, Analytics等）の導入方針は統括担当が設計し、
  必要に応じてFounder確認を行った上で進める。導入後の数字の解釈・活用は
  Founder判断および各プロダクト担当の改善判断とする。
- 新規プロジェクト追加時は、統括担当がsitemap.xml・robots.txtへの登録、
  共通head設計への準拠を確認する。

### sitemap.xml追記の例外（2026-08-07追記）

`sitemap.xml`は原則統括担当の管轄だが、**既存の自動化タスクが自分で
作成した1ページ分だけを、既存エントリと同じ`<url>`テンプレートで
`</urlset>`直前に追記する場合に限り**、プロダクト担当（自動化タスク）
が直接行ってよい。

条件：
- 追記のみ。既存の`<url>`エントリの並び替え・削除・書式変更はしない
- 自分が同じタスクで作成したページ以外は対象にしない
- `<loc>`・`<lastmod>`・`<changefreq>`・`<priority>`は既存の同種
  ページと同じテンプレートを使う

一括置換・既存エントリの整理・複数ページをまとめた大規模な登録作業は、
引き続き統括担当が行う（このルールの例外にならない）。

---

## 小ツールの基本方針

まずは以下を優先する。

- HTML / CSS / JavaScript のみ
- 外部 API なし
- ログインなし
- 保存機能なし
- GitHub Pages で公開しやすい構成
- スマホ優先
- 軽く、読みやすく、壊れにくい
- README を用意する

基本ファイル構成は以下。

```
index.html
style.css
script.js
README.md
```

---

## デザイン方針

- 白、黒、薄いグレー基調
- 余白多め
- 落ち着いた実用ツール感
- 40代会社員が仕事帰りにスマホで使っても恥ずかしくない雰囲気
- 派手すぎない
- 操作に迷わない
- メインの行動が一目で分かる

---

## VIGOR LAB の思想

- 小さく出す
- 出してから考える
- 反応を見て育てる
- 完璧主義で止まらない
- 会社に依存しない場所を少しずつ増やす
- 自分の可能性を咲かせるために、何個も何十個も小さな種をまく

---

## DCAp の思想

DCAp は、**Do → Check → Act → small plan** の流れ。  
最後の p は小文字。

これは計画表ではない。  
行動に戻すための考え方である。

Plan から始めるのではなく、まず小さな Do から始める。

DCAp が助ける人は以下。

- 考えすぎて止まる人
- 完璧じゃないと動けない人
- 実物がないのに予想だけで考え続ける人
- 話してばかりで作り始められない人

---

## 最初に作るツール候補

1. DCAp アジャイルシート
2. 15分 Do 変換ツール
3. Ray-Ban Meta 購入前チェックリスト
4. 独立準備の現在地診断
5. AI 作業仕分けシート

---

## 公開前チェック

作業完了前に、以下を確認する。

- [ ] ローカルで動くか
- [ ] スマホで見やすいか
- [ ] 操作に迷わないか
- [ ] メインの行動が目立っているか
- [ ] 文章が分かりやすいか
- [ ] 不要な機能がないか
- [ ] README があるか
- [ ] GitHub Pages で公開しやすいか
- [ ] v0.1 として外に出せるか

---

## 最重要ルール

迷ったら必ずこれを基準にする。

> **「今日出せる最小版は何か？」**

完璧な設計より、公開できる小さな成果物を優先する。
