# 毎日品質改善 実行報告 2026-10-23

## 環境・件数

- 開始時fetch成功。origin/main cdea0838e160d50cfdcd045c14fbb6f4cbfec18aから今回専用worktree /private/tmp/vigor-matsuri-4-20261023 を作成、HEAD一致・clean確認。通常作業ツリーはahead1/behind31と未追跡ファイルあり。ローカルmainや未コミット差分を基点にせず未変更。
- 最新タスク、AGENTS、Backlog、Roadmap、CONCEPT、素材ガイド、関連スキーマを確認。Phase 2の許可範囲のみ。
- 調査8件。開催直前3件（浅草の酉の市、春日若宮おん祭、宮﨑神宮大祭）、通常5件（深志神社天神祭、七久里神社秋季祭典、高遠だるま市、高遠城下まつり、高遠燈籠祭）。除外期間適用後の候補全8件で枯渇し20件未満。格付け設定済み/見どころ不足枠0件。
- 公開データ反映1祭り。位置情報追加あり（1件）、浅草の酉の市 asakusa-tori-no-ichi、35.7225235 / 139.7919508。地図note1件を座標補完に合わせて修正。
- 画像追加なし（0件）、動画追加なし（0件）。画像・動画の見送り/保留8件、祭り単位では反映1・見送り7。基準を満たさない画像、長尺記録、構成・撮影年・継続性未確認を区別して記録。
- eventStatus例外は該当なし（0件）。auto-end-festivals --regenerate成功。全339件hard0・heuristic1（kanda-matsuri off_year_has_dates=2026-05-15）、修正なし。
- 母数339、反映後：backgroundImage未設定248、atmosphereMedia未設定250、両方なし215、lat/lng未設定267。15件超PMレビュー条件非該当。

## 対象・一次情報・採否

### 浅草の酉の市（asakusa-tori-no-ichi）

枠：開催直前／結果：座標追加・地図note修正

一次情報：https://otorisama.or.jp/kotoshi.html

鷲神社公式で令和8年11月7日・19日、各日0〜24時と確認。候補 https://www.youtube.com/watch?v=_N3q5EXEbO0 を直接確認：Tokyo VR（1.37万人）、8479回、46:58、2022年浅草酉の市。長尺歩行記録のため代表動画は追加しない。hqdefault/0は中央の大きな題字、1〜3は120×90で背景用途に不足し画像なし。Google Mapsを既存queryで検索し浅草 鷲神社、千束3丁目18-7、otorisama.or.jpを一意に照合。place URLの!3d35.7225235!4d139.7919508を採用しlat/lng追加。座標未確認という古い地図noteを、鷲神社一点を示す注記へ修正。巡行・市全体の範囲を表す座標ではない。

### 春日若宮おん祭（kasuga-wakamiya-onmatsuri）

枠：開催直前／結果：追加なし

一次情報：https://onmatsuri.kasugataisha.or.jp/

祭り公式を直接確認。新候補 https://www.youtube.com/watch?v=29jwHw0THUQ を直接確認：奈良県世界遺産室（1.25万人）、約14万回、30秒ダイジェスト、書家による解説を含む紹介。hqdefaultは解説者と一覧の書、0〜3はいずれも120×90の解説者・書・神社前。祭礼主体の背景ではないため追加なし。代表動画は構成全体の確認が未完了で保留、既存座標維持。

### 宮﨑神宮大祭（miyazaki-jingu-taisai）

枠：開催直前／結果：追加なし

一次情報：https://www.miyazaki-city.tourism.or.jp/feature/miyazaki_festival

市観光特集・イベント12284の本文取得は503。新しい年度情報を確定せず既存データ維持。既存 https://www.youtube.com/watch?v=whrU8Y9Yps8 を直接確認：宮崎市公式チャンネル (miyazaki city channel )、1.11万人、6198回、1:33。hqdefault/0は神武さまの題字、1は暗い画像、2は行列と字幕の120×90、3は朝日と文字の120×90で背景追加なし。動画は既存採用を維持し重複追加しない。Google Maps検索は神宮・社叢・社務所等の複数結果に分かれたためlat/lngを推測しない。

### 深志神社天神祭（fukashi-jinja-tenjin-matsuri）

枠：通常／結果：追加なし

一次情報：https://www.fukashi-tenjin.or.jp/news/%E4%BB%A4%E5%92%8C8%E5%B9%B4%E3%80%80%E5%A4%A9%E7%A5%9E%E7%A5%AD%E3%81%AE%E3%81%94%E6%A1%88%E5%86%85/

神社公式の令和8年案内を直接確認し、7月24・25日、舞台の曳き入れ、2基の神輿御神幸等を照合。舞台という物件の文化財指定を祭り全体の指定へ転用しない。候補 https://www.youtube.com/watch?v=V8B4HhkdAQs を直接確認：リチャードアキラch（2750人）、1177回、1:41:03のライブ記録。動画は長尺のため見送り。hqdefault/0は舞台を大きな題字が隠す。1〜3は120×90の舞台・神社場面で背景解像度不足。画像なし、既存座標維持。

### 七久里神社秋季祭典（裸まつり）（nanakuri-jinja-hadaka-matsuri）

枠：通常／結果：追加なし

一次情報：https://msnav.com/109253/

南信州ナビ公式で2026年10月3日、19時から奉納煙火・桶振り等を直接確認。候補 https://www.youtube.com/watch?v=OGV9Y1MAyUE を直接確認：地域文化資産（5500人）、1497回、2:58ダイジェスト。hqdefault/0は桶振り青年の暗い実写と説明文字。1は題字、2は同場面、3は練り込みの120×90。背景用途では暗さ・説明文字・低解像度のため見送り。動画は本編の解説割合・公開年と撮影年代の照合が未完了で保留（解説主体と推測で断定しない）。既存座標維持。

### 高遠だるま市（takato-daruma-ichi）

枠：通常／結果：追加なし

一次情報：https://www.pref.nagano.lg.jp/tokyokanko/pressreleases/documents/2026arukumadayori2gatsugou.pdf

県の2026年2月案内と伊那谷観光局の鉾持神社・参道のだるま市説明を直接確認。候補 https://www.youtube.com/watch?v=K8bRhcQQgBE を直接確認：Nishiyama2021_山のあなた（480人）、169回、4:06、2025年2月11日の市と説明。hqdefault/0は複数写真と題字の合成、1〜3は参拝・だるまの120×90。ヒーロー用途の単一構図・解像度を満たせず画像見送り。再生終盤3:27で橋など周辺観光の実写を確認、祭り全体の映像構成と発信者継続性の確認は未完了で動画保留。既存座標維持。

### 高遠城下まつり（takato-joka-matsuri）

枠：通常／結果：追加なし

一次情報：https://db.go-nagano.net/topics_detail11/id=21786

県観光公式で城下通りのよさこい・阿波踊り・他芸能・花火を照合。候補 https://www.youtube.com/watch?v=6Jt47YEFaik を直接確認：afterglow.of.awaodori（796人）、274回、8:01、2026年9月5日の5団体の流し踊りと説明。祭り全体のうち阿波踊りのみで新規代表動画は見送り。hqdefault/0は城下風景に大きな題字、1〜3は120×90の踊りで背景画質不足。画像なし。既存mapReferenceは通り・駐車場周辺を示し候補複数のため座標は維持。

### 高遠燈籠祭（takato-toro-matsuri）

枠：通常／結果：追加なし

一次情報：https://inashi-kankoukyoukai.jp/events/takato_toromatsuri2026/

観光協会URLは取得不能のため、県観光公式 https://db.go-nagano.net/topics_detail11/id=11811 を直接確認し、宵祭り・本祭りと点灯の範囲を照合。候補 https://www.youtube.com/watch?v=_oADyPTxrjQ を直接確認：Shun Shimizu（2人）、82回、2:30、2026年灯籠祭の通り・ほおずき提灯等を説明。hqdefault/0は夜の通りの実写だがブレが強く、1〜3は120×90。背景追加なし。動画は本編全体の構成・発信者ページの確認未完了で保留。少数登録者という理由だけでは除外していない。既存座標維持。

## 検証・反映

- 全JS381ファイルnode --check、339件のid/slug/ファイル存在・FESTIVAL_SLUGS重複登録チェック、全詳細JSON-LDパース、git diff --check成功。
- generate-static-content対象asakusa-tori-no-ichi、特徴/都道府県/地方/月ハブおよび検索インデックスを全再生成。最終派生差分は浅草詳細HTMLの地図noteとgeo追加のみ。
- 浅草詳細を390×844と1440×900でスクリーンショット・title/H1/canonical・geo・横スクロールなし・console errorなし確認。新規画像/動画追加がないためヒーロー素材・ギャラリークリックの追加テストは対象外。
- 既存表示不具合：今回の表示確認ではなし。既知の浅草JSON-LDの非連続日程（11/7・19）を親Eventの連続範囲で表す制約は既存researchにも記録されている。今回変更せず人間判断事項として維持。
- 反映前再fetchを実施し、更新時は最新mainを取り込み全検証を再実行する。競合自動解消は現時点なし。
- push・Pages成功・本番200/data.js一致・IndexNow結果とコミットhashは完了報告へ記載。
- 次回：除外期間明けの両方なし候補と開催直前枠。高遠だるま市の本編構成、七久里の撮影年代など未確認事項は再評価候補（除外期間を短縮しない）。
