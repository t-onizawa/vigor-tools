# 週次データ保守 2026-10-26

専用worktree、開始時origin/main: `7aefc9e7`。祭りデータの変更なし。日次ended化の代行・再実行なし。比較用health-check-last.jsonを更新。

| チェック | 結果 | 内容 |
|---|---|---|
| data.js 構文 (node --check 相当) | OK | 353件中 不正0件 |
| git diff --check | OK | 問題なし |
| データ整合性 (check-data-integrity) | OK | hard 0件 / heuristic 1件 |
| id / slug / FESTIVAL_SLUGS 整合 | OK | 問題0件 |
| 詳細ページ canonical / JSON-LD | OK | 問題0件 |
| 開催日と eventStatus の整合 | OK | ended矛盾0件 / 開催中2件 / 14日以内に開催13件 |
| 日次ended化の更新漏れ（読み取り専用） | OK | 日本時間 2026-10-26 / 残存0件（全年度、週次では修正しない） |
| 出典URL (GET確認) | 要確認 | 720件中 リンク切れ(404/410)14件 / 要確認(403・429・5xx・timeout等)69件 / 前回から新規に異常63件 |
| 動画 (YouTube oEmbed) | OK | 139本中 削除・非公開・埋込不可0本 / 要確認0本 / 前回から新規0本 |
| 今週末ページ自動更新 | OK | 最終成功 2026-10-25T22:07:31Z (1.5時間前, run 40238688265) |
| 日次cron / ended化ステップ | OK | 最新schedule: completed/success / 開始 2026-10-25T21:38:48Z (2.0時間前) / ended化: completed/success（週次では再実行しない） |

## 確認・保留

- 日次cron成功: https://github.com/t-onizawa/vigor-tools/actions/runs/40236458665
- 羽村春祭り：市の年間予定は例年4月第2土日の記載のみ。2026年個別の開催根拠を確認できず、unconfirmedを維持。
  https://www.city.hamura.tokyo.jp/0000008921.html
- 小山祇園祭：須賀神社の2026年予定に7月19日の神輿渡御あり。一方で複数日の関連神事と「7月21日（火）祝日」という不整合が残る。ページの開催日範囲の判断を伴うため自動確定・ended化は行わない。
  https://sugajinja.or.jp/gionsai/
- 神田祭のoff_yearと例大祭日付の併存は既存のheuristic候補として保留。
- 新規異常のうち鹿児島・福井観光サイトをブラウザで確認したところ、PHPの脆弱性対策に伴う一時閲覧停止の公式案内が表示された。503を恒久リンク切れとして削除・置換しない。
  https://www.kagoshima-kankou.com/event/52271
  https://www.fuku-e.com/event/detail_5233.html
- 琴浦町の新規404をブラウザでも確認。代替URLは確定できず保留。
  https://www.town.kotoura.tottori.jp/docs/2026092500035/
- 台東区公式リンクは証明書名不一致で閲覧不能。警告の回避はしていない。その後ブラウザがエラーページのURLポリシー制限を返し続けたため、残りの新規異常URLのブラウザ確認は未完了。取得不能を正常扱いせず保留。全720件のHTTP結果はhealth-check-last.jsonに保存済み。
  https://t-navi.city.taito.lg.jp/event/1408

## 検証

- generate-weekend-page.js --check：当日JSTの本番生成物検証PASS。
- test-weekend-page.js --release-gate：15テスト成功、公開条件3項目達成。
- .github/scripts/test-verify-weekend-pages.js：5ケースPASS。
- 本番ホームを `https://vigorlab.net/matsuri/?internal=1` で確認。353件表示、まもなく開催は10/30バルーンフェスタ、10/31宮﨑神宮大祭・炭坑節まつり。ホームconsole errorなし。公開ページ変更なし。

## AI経由流入（2026-10-19〜25）

API認証を用いる方法は以前の実行制限のため再試行せず、GSC Wizardは契約期限切れで取得できなかった。代替のGA4管理画面で、期間を過去7日間（10/19〜25）、セッションの参照元／メディアとページパスとスクリーンクラスを選択して観測。

- openai / organic：1セッション。時代祭 `/matsuri/festivals/jidai-matsuri/` 1セッション。
- chatgpt.com / ai-assistant：3セッション。ページ別は11月ハブ `/matsuri/months/november/` 2、10月ハブ `/matsuri/months/october/` 2。同一セッションの複数ページ訪問があり得るため、ページ別を合算して総数にしない。これは指定されたpagePathの内訳で、着地ページ限定の計測ではない。
- その他AI参照元の網羅確認はブラウザ制限により未完了。「該当なし」とは判定していない。記録のみで設計・データ変更なし。

公開データ更新はなし。保存した比較用スナップショットと本レポートのみcommit対象。公開HTML変更なしのためIndexNow通知は対象外。
