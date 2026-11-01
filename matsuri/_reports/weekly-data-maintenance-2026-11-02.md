# 週次データ保守 2026-11-02

専用worktree、開始時origin/main `90fbca9a`。祭りデータの更新なし。日次のended化を週次で代行・再実行していない。

| チェック | 結果 | 内容 |
|---|---|---|
| data.js 構文 (node --check 相当) | OK | 375件中 不正0件 |
| git diff --check | OK | 問題なし |
| データ整合性 (check-data-integrity) | OK | hard 0件 / heuristic 1件 |
| id / slug / FESTIVAL_SLUGS 整合 | OK | 問題0件 |
| 詳細ページ canonical / JSON-LD | OK | 問題0件 |
| 開催日と eventStatus の整合 | OK | ended矛盾0件 / 開催中6件 / 14日以内に開催8件 |
| 日次ended化の更新漏れ（読み取り専用） | OK | 日本時間 2026-11-02 / 残存0件（全年度、週次では修正しない） |
| 出典URL (GET確認) | 要確認 | 771件中 リンク切れ(404/410)18件 / 要確認(403・429・5xx・timeout等)30件 / 前回から新規に異常6件 |
| 動画 (YouTube oEmbed) | OK | 144本中 削除・非公開・埋込不可0本 / 要確認0本 / 前回から新規0本 |
| 今週末ページ自動更新 | OK | 最終成功 2026-11-01T22:43:38Z (0.9時間前, run 41358473267) |
| 日次cron / ended化ステップ | OK | 最新schedule: completed/success / 開始 2026-11-01T22:42:26Z (0.9時間前) / ended化: completed/success（週次では再実行しない） |

## 保留事項

- 羽村春祭りは[羽村市の例年情報](https://www.city.hamura.tokyo.jp/0000008921.html)で2026年単独日程を確認できず、未確認を維持。
- 小山祇園祭は[須賀神社](https://sugajinja.or.jp/gionsai/)が2026年7月19日の神輿渡御等を記載する一方、前後にも複数行事があり7月21日の祝日表記に誤りがある。対象とする行事範囲の判断が必要なため保留。
- 神田祭のoff_yearと例大祭日付の併存はheuristic候補であり、機械的な修正をしない。
- pointTypeは既存設計書の定義外の値がデータに広くあり、場所の意味を踏まえた設計判断を要するため一括修正しない。
- 新規異常6件：萩時代まつり `https://www.hagishi.com/?p=32498` (404)、貝がら節祭 `https://www.tottori-guide.jp/tourism/tour/view/73` (503)、熊野大花火 `https://www.kumano-kankou.info/kumano-fireworks/` (DNS)、おぢや牛の角突き `https://niigata-kankou.or.jp/event/15158` (404)、さぬき高松まつり `https://www.city.takamatsu.kagawa.jp/smph/kanko/takamatsumatsuri/matsuri.html` (timeout)、八代妙見祭 `https://myouken.com/八代妙見祭/八代妙見祭について/` (404)。検索サービスの過去取得データでは一部ページが閲覧でき、HTTPチェックとの食い違いがある。ブラウザ操作が利用できず現在の実表示と恒久的な移転先を確認できないため、いずれも自動修正しない。

## 検証

- `generate-weekend-page.js --check` PASS、`test-weekend-page.js --release-gate` 15テスト成功、`test-verify-weekend-pages.js` 5ケース成功。
- 本番ホーム・今週末ページは `?internal=1` でHTTP 200。ブラウザ表示・consoleは今回未確認。
- 祭り関連の公開HTML変更なし。IndexNow通知の対象外。
- AI流入の定点観測：10/26〜11/1は取得できず、該当なしとは判定していない。以前のGA4 API実行に対する自動承認拒否が未解消で、GSC Wizardも契約期限切れ、ブラウザ操作は利用できない。

比較用ヘルスチェックスナップショットを更新。個別URLの結果は `matsuri/research/health-check-last.json` を参照。
