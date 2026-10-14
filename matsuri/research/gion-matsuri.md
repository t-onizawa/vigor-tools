# 祇園祭 調査記録

- 確認日: 2026-08-28
- 判定: 掲載

## 範囲・2026年・features

八坂神社の祭礼「祇園祭」の7月1日〜31日を一体として扱い、山鉾巡行だけに限定しない。京都市公式観光情報で2026年の期間と前祭・後祭の巡行日を確認し終了済み。山鉾と神輿が公式日程に明記されるためhasDashi・hasMikoshi・hasParadeをtrueとした。highlightCommentは山鉾数と辻回しの一次情報を根拠とした。

## 素材

素材探索は行わず `backgroundImage: null`、`atmosphereMedia: []`。

## 一次情報

- https://ja.kyoto.travel/event/single.php?event_id=6603
- https://ja.kyoto.travel/event/single.php?event_id=6778

## backgroundImage・atmosphereMedia調査（2026-09-01）

京都市公式「祇園祭 山鉾行事」（https://www.youtube.com/watch?v=0JmFraeZ-Gk、6分17秒、2024年公開）を直接確認。複数場面の自治体動画として動画に採用。大きな文字・帯のため画像不採用。

### 2026-10-14 毎日品質改善

- 通常選定（背景のみ不足）。https://www.youtube.com/watch?v=0JmFraeZ-Gk を直接確認。京都市景観政策課まちなみチャンネル（登録者576人）、6分17秒、3,526回視聴。デフォルト・0〜3を直接確認。フレームは120×90で字幕も入り背景に適さない。デフォルトは文字が左右端にあり中央の山鉾全体・曳き手は明瞭に判別できるため優先度3でbackgroundImage採用。既存動画は変更しない。
- 位置情報は今回追加なし。Googleマップ上の一意な地点・座標の直接確認が完了していないため推測では記入しない。
