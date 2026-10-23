# JSON-LD subEvent 時刻の分類（40件）— 2026-10-23

対象: 静的HTMLのEvent JSON-LDに出力されている `subEvent` のうち、名称に「頃・ごろ・予定・目安・終了」を含むもの（check-static-consistency.js の `jsonld.subevent-approx`）。

**生成ロジックの一括変更は実施していない（Founder承認待ち）。**

## 原因の整理

生成ロジック（generate-static-content.js）は、`schedule` の `time` が厳密な `H:MM` なら、行の `label` をそのまま `subEvent` の名称にし、その時刻を `startDate` として出力する。label・time の意味（目安か確定か、開始か終了か）は見ていない。

## A. 実際に確定時刻として誤出力されているもの（17件・11ページ）

目安・頃・予定の時刻、または「終了（予定/目安）」の時刻が、`H:MM` の厳密な時刻として `startDate` に出力されている。委任ルール8-3（目安時刻は「頃」「〜」付きで非出力）に反する。

| slug | 状態 | startDate | subEvent名 |
|---|---|---|---|
| daito-tanabata-matsuri | ended | 2026-08-06 20:30 | 打ち上げ花火（頃） |
| fujisan-omikubi-matsuri | ended | 2026-08-01 21:00 | 終了予定 |
| fukashi-jinja-tenjin-matsuri | ended | 2026-07-24 17:00 | 各町会の舞台境内曳き入れ（前後する目安） |
| guzuyaki-matsuri | ended | 2026-08-29 19:00 | 駅前イベント開始予定 |
| guzuyaki-matsuri | ended | 2026-08-29 21:00 | ぐず練り回し終了予定 |
| guzuyaki-matsuri | ended | 2026-08-30 21:00 | 花火大会開始予定 |
| kakegawa-matsuri | ended | 2026-10-09 21:00 | 終了予定 |
| kakegawa-matsuri | ended | 2026-10-10 21:00 | 終了予定 |
| kakegawa-matsuri | ended | 2026-10-11 21:00 | 終了予定 |
| kanazawa-hyakumangoku-matsuri | ended | 2026-06-06 18:00 | 百万石行列終了予定 |
| miyazaki-jingu-taisai | confirmed | 2026-10-31 16:30 | 御神幸行列 終了予定 |
| miyazaki-jingu-taisai | confirmed | 2026-10-31 21:00 | 神武さま広場 終了予定 |
| miyazaki-jingu-taisai | confirmed | 2026-11-01 16:00 | 御神幸行列 終了予定 |
| odora-matsuri | ended | 2026-07-19 20:00 | 終了予定 |
| takato-daruma-ichi | ended | 2026-02-11 15:00 | 終了目安 |
| takato-joka-matsuri | ended | 2026-09-05 19:00 | 花火（予定） |
| yagorodon-matsuri | confirmed | 2026-11-03 06:00 | 弥五郎どんを起こす行事（頃） |

## B. 問題なし（誤検知）（1件）

| slug | 状態 | startDate | subEvent名 | 理由 |
|---|---|---|---|---|
| takayama-hachiman-matsuri | ended | 2026-10-09 18:00 | 宵祭開始（21:30頃まで） | 「21:30頃」は終了側の目安で、開始時刻18:00は固定。startDateは固定の開始なので問題なし |

## C. 判断不能（22件・13ページ）

名称が「終了」（終了時刻の標識）だが、`startDate` にその時刻が入っている。**意味の誤り（終了時刻を開始として出力）**であることは確実。一方、時刻自体が公式の確定値か目安かは、各祭りの一次情報を再確認しないと判断できないため「判断不能」とする。

| slug | 状態 | startDate | subEvent名 |
|---|---|---|---|
| fukudomi-jinja-okunchi | ended | 2026-10-19 13:30 | 終了 |
| fukushima-dashi-matsuri | ended | 2026-06-06 19:30 | 山車祭り終了 |
| inasa-jinja-ohitaki-matsuri | confirmed | 2026-12-26 21:00 | 終了 |
| inasa-jinja-okunchi | ended | 2026-10-19 16:00 | 終了 |
| matsukawa-chochin-matsuri | ended | 2026-10-11 21:00 | 祭り終了 |
| nagasu-kingyo-koi-no-sato-matsuri | ended | 2026-10-17 16:00 | まつり終了 |
| nagasu-kingyo-koi-no-sato-matsuri | ended | 2026-10-18 16:00 | まつり終了 |
| nakatsugawa-furusato-jiman-kashi-matsuri | confirmed | 2026-10-23 16:30 | 終了 |
| nakatsugawa-furusato-jiman-kashi-matsuri | confirmed | 2026-10-24 16:30 | 終了 |
| nakatsugawa-furusato-jiman-kashi-matsuri | confirmed | 2026-10-25 16:00 | 終了 |
| onagawa-aki-no-shukakusai | ended | 2026-10-11 16:00 | 収獲祭終了 |
| seki-hamono-matsuri | ended | 2026-10-10 17:00 | 本町通り 刃物大廉売市終了 |
| seki-hamono-matsuri | ended | 2026-10-11 17:00 | 本町通り 刃物大廉売市終了 |
| sendai-michinoku-yosakoi-matsuri | ended | 2026-10-10 20:30 | 勾当台公園会場 終了 |
| sendai-michinoku-yosakoi-matsuri | ended | 2026-10-11 16:15 | 定禅寺通パレード会場 終了 |
| sendai-michinoku-yosakoi-matsuri | ended | 2026-10-11 20:30 | 勾当台公園会場 終了 |
| shimabara-otemon-ichi | ended | 2026-10-17 16:00 | 終了 |
| shimabara-otemon-ichi | ended | 2026-10-18 16:00 | 終了 |
| tottori-shanshan-matsuri | ended | 2026-08-13 21:00 | 前夜祭終了 |
| tottori-shanshan-matsuri | ended | 2026-08-14 21:00 | 終了 |
| yobuko-kunchi | ended | 2026-10-17 21:00 | 終了 |
| yobuko-kunchi | ended | 2026-10-18 13:00 | 終了 |

## 影響範囲

- 開催前・開催中の祭り（優先度高）: inasa-jinja-ohitaki-matsuri, miyazaki-jingu-taisai, nakatsugawa-furusato-jiman-kashi-matsuri, yagorodon-matsuri
- それ以外は終了済み（過去の構造化データ）で、検索結果への実害は小さい。
- 表示（本文・時程表）には影響しない。JSON-LD（検索エンジン向け構造化データ）のみ。

## 修正方針（案・承認待ち）

| 案 | 内容 | 影響 | 承認 |
|---|---|---|---|
| 1. データ修正（委任範囲） | 該当行の `time` を「21:00頃」「〜21:00」等にして `subEvent` を非出力にする。1祭り1コミット、1日5祭り以内 | 該当ページのJSON-LDのみ。まず開催前の4ページ（宮崎神宮大祭、中津川、稲佐神社お火たき祭、弥五郎どん祭り）から。25ページ全件で約5日 | 委任範囲内（件数上限に注意）。全件は「大規模変更」に該当するため事前報告を推奨 |
| 2. 生成ロジックの規則追加 | `subEvent` を出力しない条件を追加する（labelが「終了」「終了予定」「終了目安」「頃」「予定」「目安」を含む場合） | 40件のsubEventが一括で消える（開始時刻として正しいものは残る）。生成ロジックの変更で、全ページの再生成が必要 | **Founder承認が必要**（共通生成ロジック・JSON-LD出力仕様の変更） |
| 3. 併用（推奨） | 開催前の4ページは案1で即時修正し、案2は承認後に実施。案2の後、チェックの `jsonld.subevent-approx` が0になることを確認 | 最小の差分で、先に実害の大きいものを解消 | 案1は委任範囲、案2は承認 |

## 別件（JSON-LDの構造）

- 日程が非連続のページ（例：浅草の酉の市 11/7・11/19、おぢや牛の角突き等）では、親Eventが `startDate`〜`endDate` の連続した期間として出力される。実際は離れた複数日。生成ロジックの制約で、`eventSchedule` や日別Eventでの出力が必要になる。Founder承認が必要な生成ロジックの課題として別途記録する。