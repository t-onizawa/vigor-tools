# 醸造安全祈願祭（酒まつり） 調査記録

確認日：2026-10-17

## 一次情報

- https://oomiwa.or.jp/omatsuri/nenkan/
- https://oomiwa.or.jp/omatsuri/11gatsu/
- https://oomiwa.or.jp/access/
- https://www.pref.nara.lg.jp/ikasu-nara/seishu/oomiwa/index.html

## 同一性・開催主体・ページ範囲

開催主体：大神神社。
大神神社が行う11月14日の醸造安全祈願祭。「酒まつり」は神社公式に併記された呼称。前後の月次祭・七五三や各蔵元の蔵開きは含めない。

## 採用・既存掲載との違い

既存312件のslug・名称と照合し重複なし。醸造安全の祈願と大杉玉の掛け替えを中心とする祭典。試飲フェスや既存の神幸行列とは目的・範囲が異なる。

## 日程・eventStatus

2026年日程：2026-11-14。一次情報に掲載された日付を採用し、推測していない。eventStatus=confirmed。確認日時点で開催前の公式日程。
恒常パターン：毎年11月14日。

## features・highlightComment

features={"hasDashi":null,"hasMikoshi":null,"hasDanceOnDashi":false,"hasParade":null,"highlightTime":"day","hayashiNote":"四人の巫女が杉を持ち「うま酒みわの舞」を奉納する拝殿の祭典。山車上の踊りへ分類しない。"}
四人の巫女が杉を持ち「うま酒みわの舞」を奉納する拝殿の祭典。山車上の踊りへ分類しない。
未確認はnullとし、行事内容から否定できる山車上の踊りのみfalse。highlightCommentは一次情報の奉納・儀式・行列の説明を要約したもの：酒造家や杜氏が新酒の醸造安全を祈り、杉を手にした巫女の神楽と新しい大杉玉が酒造りの季節を伝える。

## アクセス・駐車場・地図

JR桜井線・三輪駅がアクセス拠点。公式交通案内を確認。
2026年酒まつり当日の一般駐車場の利用条件は未確認。常設駐車場の情報から当日の利用可否を推測しない。
hasParking=null：祭礼当日の利用を確定しない。
Google Mapsで「大神神社 拝殿 奈良県桜井市三輪1422」を直接検索して確認。該当施設を識別し座標 34.5287719, 135.8530464 を採用。 地図は会場の基準地点で、巡行範囲や鑑賞場所の確約ではない。

## 素材

backgroundImage=null、atmosphereMedia=[]。直接確認した適合素材なし。素材探索のための追加調査は行わない。

## 実装・検証

既存スキーマ・テンプレートを使用。research/は既存_config.ymlのexclude対象。静的・ブラウザ・公開確認の実測結果は同日Backlog実績と完了報告に記載する。

### 2026-10-17 素材調査未完了（次回再調査）

- 大神神社の年間祭事表を直接確認。動画付き奈良新聞記事 https://www.nara-np.co.jp/news/20251114161609.html の直接取得を試みたが取得不能。検索要約で投稿者や映像を確定せず、画像・動画追加を保留。既存座標を維持。記事本文未取得を不採用確定としない。

### 2026-11-14 素材調査途中

- 奈良テレビNEWSの https://www.youtube.com/watch?v=sUn_Rf-yChA を直接開き、投稿者・2024年の酒まつり・1分24秒を確認。動画にはニュースキャスターと祭礼の現地映像がある。全体の構成と動画採否は未確認。
- https://i.ytimg.com/vi/sUn_Rf-yChA/hqdefault.jpg は文字付きの杉玉の写真。0は同じ画像、1はニュースキャスター、2は杉玉、3は参列者の画像。背景としての適否は未確定。次回は他の候補も確認し、画像・動画をそれぞれ判断する。
- 追加候補 https://www.youtube.com/watch?v=5XqPJTQ_fM0 はサムネイル https://i.ytimg.com/vi/5XqPJTQ_fM0/hqdefault.jpg を直接確認。巫女の舞が写るが中央に縦書き文字が重なる。動画ページの直接確認と自動フレームの確認は未実施。
