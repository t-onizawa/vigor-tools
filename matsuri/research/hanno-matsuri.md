# 飯能まつり 調査記録

確認日: 2026-07-30

## 出典

- 飯能市「文化財公開予定日一覧」
  https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/452.html
- 飯能市「有形文化財（民俗）」
  https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/minzoku/index.html
- 飯能市「令和7年飯能まつり」
  https://www.city.hanno.lg.jp/shiseijoho/shichoshitsu/shichoblog/shisei2025/shisei202511/12579.html

## 恒常情報

- 例年11月第1土曜・日曜。初日は底抜け屋台、2日目は11か町の山車巡行・総覧・引き合わせ。
- 二丁目山車・河原町山車・原町山車人形「神武天皇」は市指定有形民俗文化財。
- 神輿の有無は一次情報で確定できないため `null`。
- 山車上の踊りは十分な根拠を確認できず `null`。

## 2026年

- 飯能市文化財公開予定で11月7日・8日を確認。
- 予定表段階のため `scheduled_pending_official`。詳細プログラム・交通情報は未発表。

## 素材

- 2026-07-31に動画ページと投稿者ページを直接確認。
- 候補「第48回飯能まつり」
  https://www.youtube.com/watch?v=ongkRogdeRc
  - 投稿者: 飯能ケーブルテレビ株式会社（飯能日高テレビ、地域報道、登録者約4,820人）
  - 尺: 1時間55分53秒
  - 実映像: 祭礼中継であることを確認。
  - atmosphereMedia: 不採用。尺そのものではなく、生中継をそのまま収録した構成で、初見の入口として短時間に祭り固有の見どころを把握しにくい。
  - backgroundImage: 不採用。大きな番組文字、日時、キャラクター、局ロゴが画面を占める。

## backgroundImage再調査（2026-08-05）

- 候補「【飯能まつり】勇壮な山車と熱気あふれる祭り風景 4K 2025.11」
  https://www.youtube.com/watch?v=j2SjrnpPIWc
  - 投稿者: Japan Walk Boy（地域・街歩き映像を公開する第三者。動画ページとチャンネルページを直接確認）
  - サムネイル: https://i.ytimg.com/vi/j2SjrnpPIWc/maxresdefault.jpg
  - 対象一致: 飯能まつりの夜の山車と囃子方・見物客を写した実写と確認。
  - 判定: 採用。複数の山車と祭りの夜景が横長画面で明瞭に判別でき、文字装飾がなく、一覧カードと詳細ヒーローの背景として成立する。
- 結論: `constantInfo.backgroundImage` に反映。atmosphereMediaは今回の対象外のため変更なし。

### 2026-09-11 毎日品質改善
- 既存背景元 https://www.youtube.com/watch?v=j2SjrnpPIWc を直接確認（1時間12分45秒）。長尺通し記録のため動画不採用。

### 2026-09-16 開催間近の祭り・週次品質改善

- atmosphereMedia: 既存の飯能ケーブルテレビによる1時間55分53秒の生中継と、背景元の1時間12分45秒の長尺通し記録を再確認したが、いずれも入口用途に適した編集構成ではないため不採用を維持。新たに品質基準を満たす公式・自治体・観光協会の代表動画は確認できなかった。
- mapReference: Google Mapsで「飯能駅北口 埼玉県飯能市」を検索し、飯能駅北口（35.8508472, 139.3203652）を名称・住所一致で確認して採用。
- backgroundImage: 既に採用済みのため変更なし。
- 将来再調査: 山車総覧と引き合わせを短くまとめた公式または地域報道のダイジェストが公開された場合に再評価する。
