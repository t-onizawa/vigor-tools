# mapReference ジオコーディング記録

- 実施日: 2026-09-09
- データ提供元: Nominatim（事前照会済みの確定結果を反映）
- 方針: クエリと一致する結果のみ採用し、該当なし・不一致は `lat` / `lng` を `null` のまま保留する。

## 採用（12件）

| slug | query | lat | lng | 判断 |
|---|---|---:|---:|---|
| abiko-kappa-matsuri | 手賀沼公園 千葉県我孫子市 | 35.8654984 | 140.0142915 | 採用 |
| akita-kanto-matsuri | 竿燈大通り 秋田市 | 39.7178572 | 140.1158692 | 採用 |
| anan-summer-festival | 徳島県阿南市 阿南市役所 | 33.9218049 | 134.6595651 | 採用 |
| annaka-matsuri | 安中市役所 群馬県安中市 | 36.3262683 | 138.8871540 | 採用 |
| asakusa-samba-carnival | 雷門通り 東京都台東区浅草 | 35.7111969 | 139.7941835 | 採用 |
| awa-yawatanmachi | 鶴谷八幡宮 千葉県館山市 | 35.0052277 | 139.8665318 | 採用 |
| chagu-chagu-umakko | 盛岡駅 | 39.7014998 | 141.1365544 | 採用 |
| chichibu-ryusei-matsuri | 椋神社 埼玉県秩父市下吉田 | 36.0452223 | 139.0329552 | 採用 |
| enoshima-tennosai | 江の島弁天橋 | 35.3044597 | 139.4821935 | 採用 |
| fukaya-matsuri | 深谷駅 埼玉県深谷市 | 36.1918042 | 139.2812595 | 採用 |
| fukuyama-bara-matsuri | 広島県福山市ばら公園 | 34.4812194 | 133.3715221 | 採用 |
| funabashi-daijingu-reitaisai | 意富比神社 船橋大神宮 | 35.6957478 | 139.9931505 | 採用 |

全件について、緯度24.0〜45.6・経度122.9〜146.0の日本国内範囲内であることを確認済み。複数候補が返った場合は、重要度スコアが明確に上回る候補、またはクエリ文言と完全一致する名称を採用した。

## 保留（13件）

| slug | query | 判断理由 |
|---|---|---|
| abare-matsuri | 能登町宇出津 八坂神社 | Nominatim該当0件 |
| aizutajima-gion-matsuri | 田出宇賀神社 南会津町 | 該当0件 |
| aomori-nebuta-matsuri | 青森ねぶた祭 運行コース 青森市 | 該当0件（経路表現のため） |
| bitchu-takahashi-matsuyama-odori | JR備中高梁駅 | 該当0件 |
| chichibu-yomatsuri | 秩父神社 埼玉県秩父市番場町1-3 | 該当0件（住所指定が詳細すぎる可能性） |
| daito-tanabata-matsuri | 島根県雲南市大東町大東 商店街 | 該当0件 |
| dekansho-matsuri | 篠山城跡三の丸広場 | 該当0件 |
| fuchu-kurayami-matsuri | 大國魂神社 東京都府中市宮町3-1 | 該当0件 |
| fujioka-matsuri | 藤岡市 中央通り 群馬県 | 該当0件（通り名のみで曖昧） |
| fukagawa-hachiman-matsuri | 富岡八幡宮 東京都江東区富岡1-20-3 | 該当0件 |
| fukiage-natsumatsuri | 吹上神社 埼玉県鴻巣市吹上本町4-14 | 該当0件 |
| fukushima-waraji-matsuri | 国道13号 信夫通り 福島市 | 候補3件はいずれも沿道の無関係施設（美術館・小学校・中学校）で、クエリ対象と一致しないため保留 |
| furukawa-matsuri | 飛騨古川まつり広場 | 該当0件 |

保留13件は `mapReference.lat` / `mapReference.lng` を `null` のまま維持した。
