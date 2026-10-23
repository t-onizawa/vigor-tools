# 毎日品質改善 実行報告 2026-10-22

- 開始時fetch成功。origin/main c4fa317d14f65756cf0cad9be2f36eddd5c7dec1から専用worktree /private/tmp/vigor-matsuri-4-20261022 を作成しHEAD一致・clean確認。通常作業ツリーはahead1/behind2、既存未追跡あり。変更せず維持。
- 最新タスク・AGENTS・Backlog・Roadmap・CONCEPT・素材ガイドを確認。公開データは変更なし。調査は22日に開始、完了報告は23日。
- 対象候補6件を調査。除外期間適用後の開催直前枠4件、通常の両方なし未調査枠2件。通常の残り候補は除外期間内であり、候補枯渇のため20件未満。優先指定済み/見どころ不足枠は0件。
- 反映0件。画像なし（0件）、動画なし（0件）、座標なし（0件）、note0件、eventStatus例外0件（auto-end-festivals --regenerate成功）。
- 母数333：画像未設定242、動画未設定244、両方なし209、座標未設定266。今回の公開データ反映なしのため前後同数。
- 見送り・保留6件。長尺記録、告知映像、一場面の短尺、題字と代替画像の確認未完了、直接動画ページ未確認等。未確認を不採用確定と区別し、基準は緩めない。
- 静的コンテンツ・4種ハブ・検索インデックス再生成：該当なし（対象0件）。派生ファイル競合自動解消なし。PMレビュー条件非該当。

## 調査対象と結果

### 金田稲荷神社神幸祭（kanada-inari-jinko-sai）

枠：開催直前／反映なし

一次情報：https://www.town.fukuchi.lg.jp/fukuchi_trip/event/89.html

町公式を直接確認し、山笠の村回り・神社集結・獅子楽等の範囲を照合。県観光URLは502。既存背景元 https://www.youtube.com/watch?v=nwCW92wynm0 を直接確認。PONTA 7132、8090人、6162回、56:41、2025年10月25日撮影との説明。長尺記録を新たな代表動画へ追加しない。既存画像維持。町公式住所は金田405、既存queryは408であり、座標を推測追加しない（整合性担当への参考）。

### 鞍馬の火祭（kurama-hi-matsuri）

枠：開催直前／反映なし

一次情報：https://ja.kyoto.travel/event/single.php?event_id=4978

市観光公式を直接開いた。候補 https://www.youtube.com/watch?v=elo0eZagAkc を直接確認。京都新聞、4.17万人、7141回、5:39、2025年10月22日の松明行事と説明。hqdefaultを直接視認し、下部に大きな題字あり。代替フレーム・ヒーロー実装・本編全体の検証は未完了で、画像・動画とも保留（品質不採用の確定ではない）。座標追加なし。

### 八代妙見祭（yatsushiro-myouken-sai）

枠：開催直前／反映なし

一次情報：https://myouken.com/

祭り公式と八代市動画ギャラリー https://www.kinasse-yatsushiro.jp/galleries/movie を直接確認。候補 https://www.youtube.com/watch?v=YKGs_Yl47cU を直接確認。八代妙見祭オフィシャル、1290人、3706回、1:13、2022年開催を告知するTrailer。hqdefaultは獅子実写に大きなTRAILER2022等の文字。代替フレーム検証は未完了のため背景保留。告知映像を代表動画へ追加しない。既存動画・座標維持。

### 吉野ヶ里ふるさと炎まつり（yoshinogari-furusato-honoo-matsuri）

枠：開催直前／反映なし

一次情報：https://www.yoshinogari.jp/news/2026/2026_10_21.html

公園公式の2026年10月21日告知本文を直接確認。10月24・25日は荒天予想により両日中止と明記。eventStatus等は整合性チェック専管のため変更していない。既存背景元 https://www.youtube.com/watch?v=dhjHCixg_vA を直接確認。佐賀新聞[SagaShimbun]、2.46万人、421回、29秒、2025年の点火・たいまつ行列の説明。一場面の短い動画を代表追加せず、既存背景維持。祭りの広場の地点座標未確認。

### 身延山御会式（minobusan-oeshiki）

枠：通常選定／反映なし

一次情報：https://www.kuonji.jp/event1011-13/

久遠寺公式の御会式案内を直接開き、他寺院の御会式や別日演奏会を混在させない。山梨県観光 https://www.yamanashi-kankou.jp/kankou/internettv/n_1083.html に2012年10月12日撮影の万燈行列と県著作権の記載を直接確認。ただしYouTubeリンクの直接取得が失敗し、投稿者・実画像の検証は未完了で画像・動画は保留。既存座標維持。

### 正ノ木祭（shonoki-matsuri）

枠：通常選定／反映なし

一次情報：https://www.inazumijinjya.com/event/detail/31

稲積神社公式の正ノ木祭案内を直接開き、神社例大祭の範囲を照合。動画候補の検索を行ったが、直接動画ページで投稿者・実写内容を確認できる候補を確保できなかった。画像・動画とも追加なし。既存座標維持。

## 重要な参考情報（変更していない）

- 吉野ヶ里ふるさと炎まつり：公園公式の10月21日告知で10月24・25日両日中止。既存データのconfirmedとの不一致を確認。開催状況修正は整合性担当または人間へ委ねる。
- 金田稲荷神社：町公式住所405と既存query408の相違。地点推測なし。
- check-data-integrity：333件、hard0、heuristic1（kanda-matsuri off_year_has_dates=2026-05-15）、修正なし。
- 新規表示不具合：今回公開変更なしのため変更由来なし。新規の全面的な表示監査はしていない。
- 公開変更なしのためPages・本番データ反映検証・IndexNow通知は対象外。調査記録のみcommit/pushし、hashはチャットへ報告。
- 次回：未確認の鞍馬代替フレーム・身延の県公式動画ページ、除外期間明け候補。吉野ヶ里の中止反映は優先して整合性担当へ確認を推奨。
