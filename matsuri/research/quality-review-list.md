# 要確認リスト（日次品質改善タスク）

人の判断が要る項目の隔離先。運用ルールは`task-weekly-quality-improvement.md`
の「要確認リスト」を参照。

- 日次タスクは`open`で1行追記する。既存行は書き換えない
- `resolved`への変更はPM・Founderが行う

| 追記日 | slug | 項目 | 気づいた内容（1〜2行） | 根拠URL | 状態 |
| --- | --- | --- | --- | --- | --- |
| 2026-11-10 | kanda-matsuri | dates / off_year_has_dates | `check-data-integrity.js`が`off_year_has_dates`（eventStatus=off_year なのに dates=2026-05-15 が入っている。小規模な例大祭の可能性）をheuristicで検出。次回本祭は2027年で、2027年の候補日として2027-05-08 / 05-09 / 05-15 / 05-16 の4つが挙がっているが、どれが正しいか未確定（Founder提供の情報。リポジトリ内に出典なし・未検証）。2027年の`yearlyInfo`は未追加。日程・年度の変更はFounder承認事項のため、日次タスクでは変更しない | https://www.kandamyoujin.or.jp/event/detail/?id=69 , https://kandamatsuri.com/ | open |
