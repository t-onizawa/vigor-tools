# 今週末ページ：Pages後続コミットによる誤検知の修正

修正コミット：`fe28a61797a14c36032e6b8b2bc5b05692de0097`（mainへpush済み）。

## 原因と変更

失敗run39229082798のログで、EXPECTED_SHA=979a79c3の完全一致を待ち、後続3360094dへ進んだPagesに対して約10分後に失敗したことを確認。
cron初回run39337916506はschedule / success、完了2026-10-20 07:53:54 JSTを確認した。

- 実際に生成HTMLをpushした場合のみchanged=trueを出力し、Pages要求・待機・本番照合を実行する。
- 差分なしの場合はコミットせず、Step Summaryに「差分なし、本番照合は不要」を記録。Pagesの要求・待機・照合をすべてスキップする。
- 差分ありのPages待機は、builtのコミットがEXPECTED_SHA自身または子孫なら完了とする。fetch後、`git merge-base --is-ancestor`で判定する。
- 本番比較は取得時点の最新origin/mainのHTMLをgit showで読み出し、そのSHAを固定して記録する。古いcheckoutのHTMLとは比較しない。
- Pagesのstatus=erroredは、SHA一致の有無にかかわらず即失敗。無関係SHAは成功扱いしない。HTML不一致も失敗。
- 既存の監視上限、concurrency、rebase、run ID付きキャッシュ回避、internal=1は維持。生成・push・ビルド要求・本番取得の再試行は追加していない。

## 回帰テスト

一時Gitリポジトリの実履歴とAPI／HTTPスタブで以下5ケースを検証。ローカルとActions内ですべてPASS。

1. 同一SHAのbuiltを許容。
2. 子孫SHAのbuiltを許容し、最新mainのHTMLを比較（古いcheckoutは異なるHTML）。
3. 別SHAのerroredでも即失敗し、HTTP取得しない。
4. 無関係SHAのbuiltは成功にせずタイムアウト。
5. 古い本番HTMLは比較不一致で失敗。

既存15テストと公開ゲート（index・トップリンク・sitemap）も成功。workflowのbash構文を確認した。

## 手動実行・2連続pushの実測

|種類|run|結果|完了JST|
|---|---|---|---|
|workflow_dispatch(false)|[39350836620](https://github.com/t-onizawa/vigor-tools/actions/runs/39350836620)|success|2026-10-20 09:59:19|
|push 1|[39350881461](https://github.com/t-onizawa/vigor-tools/actions/runs/39350881461)|success|2026-10-20 09:59:47|
|push 2|[39350925861](https://github.com/t-onizawa/vigor-tools/actions/runs/39350925861)|success|2026-10-20 10:00:19|

祭りの実データは変えず、対象パスmatsuri/festivals/内の`_weekend-workflow-probe.txt`を追加→削除した。
`_`始まりの検証マーカーのためJekyllの公開対象外。最終状態ではファイルは存在しない。

- push1：`2f52a10a`、完了00:59:29 UTC。
- push2：`15260456`、完了00:59:58 UTC。実測間隔29秒（Actionsイベント時刻では30秒）。
- 両push runでchanged=false、Pages要求と本番照合ステップはskipped。botコミットなし。
- 先行Pages run39350881953はcancelledとなり、最新ビルドは後続pushの39350926201へ進んだが、weekend-pageの両runに誤検知なし。
- 検証前後で祭りデータとthis-weekend/index.htmlの差分はゼロ。
- 2連続push時は差分なし分岐を本番実測。差分ありの子孫SHA分岐とerroredは回帰テストで検証しており、本番の祭りデータを改変して発生させていない。

## 変更ファイル

- .github/workflows/weekend-page.yml
- .github/scripts/verify-weekend-pages.sh
- .github/scripts/test-verify-weekend-pages.js
- 本報告書（ローカル保存）

元の作業ツリーにあった未pushの段階3報告と未追跡のhandoffファイルは保持。修正本体と検証pushは専用作業ツリーから反映した。
