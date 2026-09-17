# VIGOR MATSURI — 週次データ保守タスク

Codex Scheduled Task用の実行指示書。Codex側のプロンプトは本ファイルを
読み込んで指示通りに実行する形にする。基準・運用ルールの変更は本ファイル
のみを更新し、Codex側のプロンプト自体は書き換えない。

---

VIGOR MATSURIの週次データ整合性チェックと、検証成功時の自動反映を実行
してください。

## 対象

- VIGOR MATSURIプロジェクト
- 作業範囲は matsuri/ のみ
- 専用Git worktreeを使用する
- 現在のローカル作業ツリーや未コミット差分には触れない
- matsuri外へ越境しない

## 調査・確認

- scheduled_pending_official / unconfirmed の祭りを優先して公式情報を
  再確認する
- 開催日確定、変更、中止、延期を確認する
- yearlyInfo.dates と eventStatus の整合を確認する
- confirmation.confirmedDate と sources を確認する
- 公式リンク切れを確認する
- atmosphereMedia の削除・非公開を確認する
- slug、id、既存enum、pointTypeを確認する
- canonical、JSON-LDを確認する
- 「開催中／まもなく開催」の日付整合を確認する
- 全data.jsに node --check を実行する
- git diff --check を実行する
- プロジェクト既定の関連テストとbuildを実行する
- 更新対象ページをブラウザで検証する

## 通常フロー

1. 専用Git worktreeで調査する
2. 一次情報で確定できる変更だけ反映する
3. 静的検証、テスト、build、ブラウザ検証を行う
4. すべて成功した場合だけcommitする
5. mainへ取り込む
6. origin/mainへpushする
7. GitHub Pagesのbuild／deploy完了と成功を確認する
8. 本番ページを確認する
9. 完了報告する

通常時はGitHub Pull Requestを作成しない。auto-mergeも使用しない。

## AI経由流入の定点観測（2026-09-18追加）

目的は、ChatGPT等AI経由の参照流入（openai/organic等）がどのページに
どれくらい来ているかを継続的に把握することのみ。判断・対応・データ
変更は一切行わず、記録のみを行う（本タスクの他の変更可否ルールには
影響しない、完全に独立した観測項目）。

- GA4で過去7日間の`セッションの参照元/メディア`のうち、`openai`、
  `perplexity`、`copilot`等AI関連と判断できるsource/mediumを確認する
- 該当があれば、それぞれのセッション数と主なランディングページ
  （`ページパスとスクリーンクラス`）を確認する
- 取得方法は`_analytics/scripts/fetch_analytics.py`のロジックを参考に
  アドホックなGA4 Data APIクエリを書いて取得することを優先する
  （sessionSourceMedium×pagePathをディメンションに指定し、
  `openai`等を含む行に絞る）。API取得が困難な場合のみGA4管理画面
  （探索レポート）で代替取得する
- 該当がない週は「該当なし」と報告する

## 自動反映してよい変更

- 開催日確定
- eventStatus更新
- confirmation.confirmedDate更新
- 公式情報源更新
- 明確なリンク切れ修正
- 削除・非公開になった動画の除去
- 既存enum、slug、日付、canonical、JSON-LDの明確な不整合修正

## 必ず見送る変更

- 新しいスキーマが必要
- UI、SEO方針、GA4設計の変更
- 祭りのページ範囲や同一性の再判断
- 公式情報同士の矛盾
- 推測が必要
- matsuri外の変更が必要
- テスト、build、deploy、本番確認の失敗

見送り条件に該当する変更は反映・commit・pushせず、保留事項として報告
する。検証失敗後に成功したように扱わない。mainやorigin/mainへ反映する
前に、反映対象の差分がmatsuri/内だけであることを再確認する。

## 変更なしの場合

- commitしない
- pushしない
- 「変更なし」と報告する

## 完了報告

- 確認件数
- 更新した祭り
- 見送った項目
- 根拠URL
- commit hash（変更なしの場合は「なし」）
- main反映結果
- GitHub Pages結果
- 本番確認
- matsuriスコープclean
- AI経由流入（該当source/medium・セッション数・主なランディング
  ページ）。該当なしの場合は「該当なし」と明記する

---

## 変更履歴

```
2026-09-16（新設）
    Codexプロンプトを毎回チャットで書き換える運用の負荷を下げるため、
    実運用プロンプトの全文を本ファイルへ移設。Codex側のプロンプトは
    本ファイルを参照する短い指示のみとする。移設時の内容変更はなし
    （既存運用プロンプトをそのまま移設）。

2026-09-18（AI経由流入の定点観測を追加）
    GA4で新居浜太鼓祭りのページにopenai/organic経由の流入が集中して
    いることを発見した際、以後はブラウザ操作でのアドホック調査ではなく
    Codexにデータ取得を任せる方針に変更した（トークン消費対策）。
    その一環として、週次でAI経由流入（openai等）の有無・セッション数・
    ランディングページを記録するだけの観測項目を追加した。判断・対応・
    データ変更は行わず、記録のみ。
```
