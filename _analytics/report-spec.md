# VIGOR LAB 週次Analyticsレポート仕様

このファイルは、毎週日曜夜に自動生成する週次Analyticsレポート
（`_analytics/weekly/{日付}.md`、最新版は`_analytics/latest.md`）の
作成手順を定義する。レポート生成時は本書の該当セクションを参照すること。

## 対象読者

- Founder（週次意思決定）
- VIGOR TOOLS PM / VIGOR MATSURI PM（判断材料として共通利用）

## 基本方針

- 目的はGA4とGoogle Search Console（以下、Search Console）の
  「計測・保存・変化の記録」とする
- 戦略判断・実装判断・PM判断は行わず、判断が必要な事項は
  PM Review Candidatesとして整理する
- 実装、SEO修正、新規ツール追加、新機能追加、統合判断、Backlog更新、
  Roadmap更新は行わない

## 作業開始前

以下を必ず確認する。

- `git fetch`
- `git status`
- `origin/main`との差分
- `gh pr list`
- 他セッションの未コミット差分

Analyticsレポート以外の変更が存在する場合は、それらを変更・commitしない。

前回レポートが存在する場合は、必ず読んでから作成する。

## 集計期間

- Search Consoleで取得可能な最新の確定済み7日間を基準とする
- GA4も必ず同じ期間へ揃える
- 比較期間は直前の7日間とする
- 期間が一致しない場合は、その理由をData Notesへ記載する

## GA4取得項目

### 全体

- アクティブユーザー
- 新規ユーザー
- セッション
- 表示回数
- エンゲージメント率
- 平均エンゲージメント時間
- Organic Search
- Direct
- Referral

### Google Organic

- セッション
- アクティブユーザー
- 新規ユーザー
- 上位ランディングページ
- ページ別ユーザー
- エンゲージメント時間

### VIGOR TOOLS

- Organic流入
- 表示回数
- 上位ページ
- 初反応ページ

取得方法と未取得時の扱いは、後述の「セクション: VIGOR TOOLS」に従う。

### VIGOR MATSURI

- Organic流入
- 表示回数
- 上位ページ

内部アクセス除外が有効であれば、除外済みデータを利用する。

## Search Console取得項目

### Web検索

- クリック
- 表示回数
- CTR
- 平均順位
- 上位クエリ
- 上位ページ

### 動画検索

存在する場合、以下を取得する。

- クリック
- 表示回数
- CTR
- 平均順位
- 上位クエリ
- 上位ページ

### その他

存在する場合、画像検索、Discover、ニュースを取得する。

MATSURIはWeb検索と動画検索を必ず合算したクリック数も算出する。

## 前週比較

主要指標について、今週、前週、差分、増減率をまとめる。
絶対数が小さい場合は増減率だけを強調しない。

## 抽出事項

### New Signals

- 初表示クエリ
- 初クリックページ
- 表示急増ページ
- 動画検索で伸びたページ
- TOOLSで初めて反応したページ

### Watch

- 急落
- GA4とSearch Consoleの乖離
- 不自然なアクセス
- 計測異常

## プロダクト評価

TOOLSとMATSURIをそれぞれ以下から選択する。

- Growing
- Early signal
- Stable
- Flat
- Investigate

理由は事実ベースで3行以内とする。

## 保存先と変更範囲

- `_analytics/weekly/YYYY-MM-DD.md`を作成する
- `_analytics/latest.md`を毎回上書きする
- レポート生成時に変更してよいのは上記2ファイルのみとする

## Markdown構成

以下の順序を基本とし、後述する追加セクションの配置指示も反映する。

```markdown
# VIGOR LAB Weekly Analytics

Report date

Period

Previous period

Internal traffic filtering

## Executive Summary

## KPI

### Overall

### VIGOR TOOLS

### VIGOR MATSURI

## Search Console

### Web

### Video

### Other

## Week over Week

## Top Pages

## Top Queries

## New Signals

## Watch

## Product Status

### TOOLS

### MATSURI

## PM Review Candidates

## Data Notes

## Roadmap進捗

## Next Actions
```

## commit

- Analyticsレポートの2ファイルのみcommitする
- コミットメッセージは
  `chore: update weekly analytics report YYYY-MM-DD`とする
- pushは行わない

## 最終報告

以下だけを報告する。

- 集計期間
- SC表示回数
- Webクリック
- 動画クリック
- 合計クリック
- TOOLSステータス
- MATSURIステータス
- 気になった変化3つ
- 保存ファイル
- commit hash

## セクション: VIGOR TOOLS（PR1で追加）

### 目的

TOOLS単体の動きを分離し、TOOLS PMが次に何を調べるべきか判断できる
最小限のデータを出す。

### データ取得元：GA4「TOOLS週次」Exploration（保存済みレポート）

初回のみ、GA4管理画面で以下の設定のExplorationを作成し、
「TOOLS週次」という名前で保存する（FounderまたはGoogleアカウントに
ログイン済みの担当者が一度だけ作業する。以後は毎週このExplorationを
開くだけでよい）。

- レポート種別：探索（自由形式）
- ディメンション：ページパス+スクリーン名
- フィルタ：ページパス+スクリーン名 が 正規表現 `^/tools/` に一致
- 期間：直近7日間（相対指定。固定日付にしないこと。これにより
  毎週開くだけで自動的に対象期間がローリングする）
- 指標：表示回数、セッションのデフォルトチャネルグループ別セッション数

### 毎週の取得手順

TOOLS週次Explorationは「高速化・精度向上のためのオプション」であり、
必須条件ではない。以下の優先順位で取得する。

1. GA4に「TOOLS週次」Explorationが存在する場合は、それを開いて
   4項目（Organic流入、表示回数、上位ページ、初反応ページ）を読み取る
2. 存在しない場合は、GA4の標準レポート（「エンゲージメント」→
   「ページとスクリーン」等）でページパスを`/tools/`に絞り込める範囲で
   代替取得する。標準レポートの絞り込みで4項目のうち取得できるものだけ
   埋める
3. 上記いずれの方法でも取得できなかった項目は、無理に埋めず、
   Data Notesに「未取得・理由（Explorationなし／標準レポートで
   絞り込み不可 等）」を記録する
4. 初反応ページの比較（前週の`_analytics/weekly/{前回日付}.md`との
   突き合わせ）は、取得元がExploration・標準レポートいずれの場合も
   同じロジックで行う

### レポートへの反映先

既存の「### VIGOR TOOLS」セクション（`## KPI`配下）の内容を、
上記4項目に基づく記述に置き換える。見出し・レポート全体の構成は
変更しない。

## セクション: Next Actions（PR2で追加）

### 目的

数字を読むことではなく、Founderが翌週何をするかを5分で決められる
ようにする。

### 生成ルール

- レポート末尾（Data Notesの後）に「## Next Actions」を追加する
- 構成は以下の3見出し、各1〜2行
  ```
  ## Next Actions

  ### TOOLS
  [1〜2行]

  ### MATSURI
  [1〜2行]

  ### LAB全体
  [1〜2行]
  ```
- 各行は、同じレポート内（Executive Summary / Product Status / Watch）
  に既に書かれている内容だけを根拠にする。新しい調査・新しい主張を
  追加しない
- 語尾は提案形（「〜を推奨」「〜が候補」）に統一する。断定・指示形
  （「〜すべき」「〜する」）は使わない。最終判断はFounderおよび各PM
  （TOOLS PM / MATSURI PM）が行うため
- 該当する動きがない週は「動きなし、継続観察のみ」と書く（無理に
  何か書き出さない）

## セクション: Roadmap進捗（PR3で追加）

### 目的

現在値だけでなく、`Roadmap.md`の目標に対する達成率を出す。

### 目標値の参照方法（ベタ書き禁止）

- レポート生成のたびに`Roadmap.md`の「## 4. 収益設計」内のKPIテーブル
  （時期／月間PV／月間UU／月間収益目標／成功の定義の列を持つ表）を
  読み込む
- 今日の日付から見て、まだ到達していない直近のマイルストーン行
  （時期列が最も近い将来のもの）を「目標」として選ぶ
- 目標値はレンジ表記のまま使う。達成率算出には、過大評価を避けるため
  レンジの下限を使う

### 今月換算値の算出方法

- `_analytics/weekly/`配下に直近4週分のレポートが存在する場合、
  その4週分の週次PV・UUの合計を「今月換算値（実績）」とする
- 4週分が揃っていない場合（運用開始直後など）は、当該週の日割り値×30を
  「今月換算値（参考値・週次外挿）」とし、参考値である旨を明記する

### レポートへの追記形式

「## Roadmap進捗」セクションを新設し、以下の表形式で出す。

```markdown
## Roadmap進捗

| 指標 | 今月換算値 | 目標（{該当時期}末） | 達成率 |
|---|---:|---:|---:|
| 月間PV | {値}{（参考値・週次外挿）の場合は付記} | {目標レンジ} | {達成率}% |
| 月間UU | {値}{同上} | {目標レンジ} | {達成率}% |
```

達成率は「今月換算値 ÷ 目標レンジ下限 × 100」で算出する。

### レポート内の配置

「## Next Actions」セクションの前に配置する（Data Notesの後、
Next Actionsの前）。
