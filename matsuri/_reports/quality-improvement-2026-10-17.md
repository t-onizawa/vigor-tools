# 毎日品質改善 実行記録 2026-10-17

## 集計・実行環境

- `git fetch origin`後のorigin/main `48fe2b75fffbde68b58a60d3d10021b847bb15b0`から新規専用worktreeを作成し、開始時HEAD一致・cleanを確認。通常作業ツリーは変更しない。
- 調査20件：開催直前枠16件、通常枠4件。優先枠のnotableDesignationあり・highlightCommentなしは0件。
- 品質改善6祭り：画像2件、動画0件、座標4件、公的指定情報1件。挙母祭りは画像・座標の重複対象。
- `confirmed_but_all_past`例外で2祭りをendedへ変更。品質改善と合わせて8祭りのdata.js変更。
- 素材・座標等の追加見送り14祭り。候補不足・直接取得不能・対象違い・長尺・文字主体・撮影年と公開年の問題等。確認未完了は不採用確定と区別して記録。
- note修正0件、highlightComment変更0件。
- 変更後の母数317件：backgroundImage未設定244、atmosphereMedia未設定228、両方なし199、座標未設定273。

## 調査20件の内訳

| 枠 | 祭り | slug | 今回の反映 |
|---|---|---|---|
| 開催直前 | 船橋大神宮例大祭 | funabashi-daijingu-reitaisai | 追加見送り |
| 開催直前 | 飯能まつり | hanno-matsuri | 追加見送り |
| 開催直前 | 挙母祭り | koromo-matsuri | 画像・座標 |
| 開催直前 | 三谷祭 | miya-matsuri | 座標 |
| 開催直前 | 金魚と鯉の郷まつり | nagasu-kingyo-koi-no-sato-matsuri | 追加見送り |
| 開催直前 | 名古屋まつり | nagoya-matsuri | 追加見送り |
| 開催直前 | 中畑町八幡社 おまんと祭 | nakahata-hachimansha-omanto-matsuri | 座標 |
| 開催直前 | おはら祭 | ohara-matsuri | 追加見送り |
| 開催直前 | 醸造安全祈願祭（酒まつり） | oomiwa-sake-matsuri | 追加見送り |
| 開催直前 | 佐賀インターナショナルバルーンフェスタ | saga-international-balloon-fiesta | 追加見送り |
| 開催直前 | 西大寺 秋の大茶盛式 | saidaiji-aki-ochamori | 追加見送り |
| 開催直前 | とちぎ秋まつり | tochigi-aki-matsuri | 追加見送り |
| 開催直前 | 上野天神祭（伊賀上野天神祭） | ueno-tenjin-matsuri | 座標 |
| 開催直前 | うたの秋祭り | utano-aki-matsuri | 画像 |
| 開催直前 | 弥五郎どん祭り | yagorodon-matsuri | 追加見送り |
| 開催直前 | よこすかみこしパレード | yokosuka-mikoshi-parade | 追加見送り |
| 通常 | 火の国長洲金魚まつり | hinokuni-nagasu-kingyo-matsuri | 追加見送り |
| 通常 | 稲佐神社のお火たき祭 | inasa-jinja-ohitaki-matsuri | 追加見送り |
| 通常 | 題目立（上深川） | kamifukawa-daimokutate | 追加見送り |
| 通常 | 奈良豆比古神社の翁舞 | narazuhiko-okina-mai | 国指定文化財情報 |

## 対象別の根拠・URL

### 船橋大神宮例大祭（funabashi-daijingu-reitaisai）

一次情報の直接確認先：https://www.oohijinja.jp/history.html

動画候補 https://www.youtube.com/watch?v=Um4RJdIPVF0「伝統的な舞楽をご覧あれ！船橋の神楽」を直接確認。船橋市（1.18万人）、15分00秒、6,728回視聴。説明で船橋大神宮と飯山満町大宮神社など複数の神社を扱う解説番組と確認。この例大祭1ページの範囲を越えるため動画不採用。既存背景・座標は維持。神社公式のhistory.htmlは取得時タイムアウト。投稿元を検索スニペットだけでは確定していない。

### 飯能まつり（hanno-matsuri）

一次情報の直接確認先：https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/452.html

動画候補 https://www.youtube.com/watch?v=ixaGgw4FgJw「【生放送】飯能まつり2024」を直接確認。飯能ケーブルテレビ株式会社 (飯能日高テレビ)（4,830人）、1時間42分55秒、6,926回視聴。祭り本体の生中継記録であり、3節の長尺記録基準により入口動画には不採用。既存背景と座標は維持。市の文化財公開予定ページも直接確認。

### 挙母祭り（koromo-matsuri）

一次情報の直接確認先：https://aichinow.pref.aichi.jp/events/detail/1754/

背景と座標を追加。https://www.tourismtoyota.jp/movies/detail/779/?type=spot が埋め込む https://www.youtube.com/watch?v=AJyR1hjGza0 を直接確認。「挙母祭り Koromo Festival - 豊田市 Toyota City」、VISIT TOYOTA CITY [Tourism TOYOTA]（834人）、1分00秒、9,085回視聴。hqdefaultと0〜3を実際に開いた。0は同じコラージュ、1〜3は120×90の行列・人物で背景解像度不足。優先度3で、紙吹雪の中の山車と曳き手が明瞭、下部文字と右上ロゴが山車を隠さないデフォルトを採用。動画説明には第2日曜・神輿渡御・棒の手等の記述があり、観光協会の挙母祭りページの第3日曜・山車中心の説明と一致しないため、動画追加は保留（data.jsの開催情報をこの動画説明で上書きしない）。Googleマップは既存queryで挙母神社（挙母町5丁目1、公式koromojinja.com）に一意に遷移。place URL !3d35.0852769!4d137.1620107を採用。

### 三谷祭（miya-matsuri）

一次情報の直接確認先：https://aichinow.pref.aichi.jp/events/detail/155/

座標追加。公式 https://38fes.jp/ と愛知県のイベントページを直接確認。既存queryでGoogleマップの八劔神社（三谷町七舗139、公式yaturugijinjya.com）を一意に特定。place URL !3d34.8165412!4d137.2480733より緯度34.8165412・経度137.2480733。公式トップでYouTube候補を確認できず、画像・動画は追加なし。動画が存在しないと断定するものではない。

### 金魚と鯉の郷まつり（nagasu-kingyo-koi-no-sato-matsuri）

一次情報の直接確認先：https://www.town.nagasu.lg.jp/soshiki/machizukuri/shoko/178721620226511/

町公式の秋の祭り案内を直接確認して検索。春の火の国長洲金魚まつり・夏ののしこら祭と区別した。今回の検索で秋の祭り本体に一致するYouTube候補は確定できず、画像・動画を追加しない。既存座標を維持。春の金魚映像を会場が同じという理由で流用しない。

### 名古屋まつり（nagoya-matsuri）

一次情報の直接確認先：https://www.city.nagoya.jp/houdou/pressr7/3002889/3003980.html

市の開催方針ページと https://www.nagoya-festival.jp/ を直接確認して動画候補を調査。検索で現れた「どまつり」は別イベントのため対象外。公式トップで登録可能なYouTube本体動画のリンクは確認できず、画像・動画追加なし。久屋大通公園エディオン久屋広場の座標は今回未確認で保留。

### 中畑町八幡社 おまんと祭（nakahata-hachimansha-omanto-matsuri）

一次情報の直接確認先：https://aichinow.pref.aichi.jp/events/detail/1107/

座標追加。https://nishio-saijiki.com/fes/single/12 を直接確認し「映像を探す」を実行。中畑のおまんと祭の映像検索結果は0件と表示。アーカイブ素材は事前相談の案内があり、画像・映像をダウンロード転載しない。Googleマップは既存queryで中畑町八幡社（西尾市中畑町宮前33）を一意に特定。place URL !3d34.8722678!4d137.014661より座標を追加。YouTube背景・動画は追加なし。

### おはら祭（ohara-matsuri）

一次情報の直接確認先：https://www.kagoshima-yokanavi.jp/event/10001

市観光サイトを直接再確認。前回候補の https://www.youtube.com/watch?v=tgrQyeoaGuc は公開年2026と撮影年不明の問題が残る。既存UIは公開年を開催年として表示するため、開催前の2026年映像との誤認を避けて追加しない。今回別の対象一致ダイジェストは確定できず、画像・動画なしを維持。公開年表示の修正はUI方針判断として報告する。

### 醸造安全祈願祭（酒まつり）（oomiwa-sake-matsuri）

一次情報の直接確認先：https://oomiwa.or.jp/omatsuri/nenkan/

大神神社の年間祭事表を直接確認。動画付き奈良新聞記事 https://www.nara-np.co.jp/news/20251114161609.html の直接取得を試みたが取得不能。検索要約で投稿者や映像を確定せず、画像・動画追加を保留。既存座標を維持。記事本文未取得を不採用確定としない。

### 佐賀インターナショナルバルーンフェスタ（saga-international-balloon-fiesta）

一次情報の直接確認先：https://www.sibf.jp/index.html

https://www.city.saga.lg.jp/city-promotion/promotion/18/index.html の2023公式ダイジェスト埋込 https://www.youtube.com/watch?v=Q5EY8j0qU-M を直接確認。「//Digest Movie// 2023 Saga International Balloon Fiesta」、- Official - Saga International Balloon Fiesta（7,750人）、18分03秒、約1.1万回視聴。hqdefaultと0〜3を直接開いた。デフォルト/0は会場空撮と大ロゴで気球本体を主役として判別できず、1は人物コラージュ、2・3はインタビュー人物でいずれも背景不採用。長いダイジェストで、今回本編全体のインタビュー比率を確定していないため動画は採用保留。既存データを変更しない。

### 西大寺 秋の大茶盛式（saidaiji-aki-ochamori）

一次情報の直接確認先：https://saidaiji.or.jp/news/851/

西大寺公式 https://saidaiji.or.jp/news/851/ の取得はタイムアウト。代替一次情報 https://narashikanko.or.jp/event/detail_10207.html を直接確認し、秋の大茶盛式と春・新春の大茶盛式を区別して調査した。画像の無断転載禁止が明記されており、ページの写真は流用しない。対象一致のYouTube候補を確定できず画像・動画追加なし。2026年の日程や既存座標は変更しない。

### とちぎ秋まつり（tochigi-aki-matsuri）

一次情報の直接確認先：https://www.city.tochigi.lg.jp/site/tourism/26060.html

市公式の開催案内と県の観光動画の候補を調査。既存画像・動画は維持。主な不足は蔵の街大通りの座標だが、通り全域から一点を選ぶ判断は行わず、Googleマップ上で参照点を確定できていないため座標追加を保留。地図の中心座標を安易に記録しない。

### 上野天神祭（伊賀上野天神祭）（ueno-tenjin-matsuri）

一次情報の直接確認先：https://www.kankomie.or.jp/event/5285

座標追加。観光三重の祭り案内を直接確認。Googleマップで既存query「菅原神社 上野天神宮」を検索し、菅原神社（伊賀市上野東町2929、公式sugawara25.jp）を一意に特定。place URL !3d34.766387!4d136.1329381より座標を記録。画像・動画の新規採用はなし。

### うたの秋祭り（utano-aki-matsuri）

一次情報の直接確認先：https://www.uda-kankou.jp/event/3275

背景追加。市公式 https://www.city.uda.lg.jp/soshiki/41/1076.html の「うたの秋祭り～神輿渡御祭～」に対応する https://www.youtube.com/watch?v=vtWRdLV__gs を直接確認。「うたの秋祭り～神輿渡御祭～（奈良県宇陀市）」、宇陀市役所公式（1,010人）、6分17秒、3,410回視聴。hqdefaultと0〜3を実際に開いた。0はデフォルトと同じ行列、1は会食、2は行列、3は境内の集団。1〜3は120×90で字幕が残る。優先度3で毛槍を持つ時代装束の行列と後方の神輿が明瞭なデフォルトを採用。字幕は下端で主役を隠さない。動画全体の解説比率までは確定していないため、atmosphereMediaは保留。

### 弥五郎どん祭り（yagorodon-matsuri）

一次情報の直接確認先：https://www.kagoshima-kankou.com/event/20481

鹿児島県の対象案内を直接確認し、宮崎県山之口の同名祭りと区別。継続候補 https://www.youtube.com/watch?v=0dgBIRmudf8「【お祭り】県下三大祭りの弥五郎どん祭りに行ってみたら大迫力の光景が広がっていた‼︎」を直接確認。アマキンTV（2.78万人）、9分48秒、8,127回視聴。説明・タグは鹿児島・曽於市。hqdefaultは取材・食事中心のコラージュと大きい題字、0は黒画面、1〜3は出演者・インタビュー・食事の低解像度画像で、主役の巨像が判別できず背景不採用。動画は祭り全体の入口としての適合を確認しきれず保留。座標未確認。

### よこすかみこしパレード（yokosuka-mikoshi-parade）

一次情報の直接確認先：https://yokosuka-kanko.com/events/46th_mikoshi/

観光協会公式のパレード案内を直接確認し検索。候補記事 https://kkchannel.jp/2024/238/ 等は見つかったが、今回は対象一致YouTubeページの直接確認まで完了せず、画像・動画を追加しない。横須賀中央大通りの一点も確定できず座標は維持。検索結果だけで投稿者・内容を採用判定しない。

### 火の国長洲金魚まつり（hinokuni-nagasu-kingyo-matsuri）

一次情報の直接確認先：https://www.town.nagasu.lg.jp/soshiki/machizukuri/shoko/177820668614735/

通常枠。町公式で春の祭りと確認し、秋の同会場イベントと区別。https://www.youtube.com/watch?v=xKAoaagu9Dw「１５センチ超える金魚も 火の国長洲金魚まつり（熊本） (23/05/03 18:45)」を直接確認。TKUofficial（5.95万人）、49秒、3,625回視聴。hqdefaultと0〜3を直接開いた。デフォルト/0は会場の常設金魚像中心で、金魚すくい等の祭り体験を主役として十分に伝えない。1は低解像度の金魚、2はインタビュー人物、3は金魚すくいの子どもだが120×90かつテロップあり。背景追加なし。短いニュースで入口動画としての複数要素を確定できず動画も見送り。既存座標は維持。

### 稲佐神社のお火たき祭（inasa-jinja-ohitaki-matsuri）

一次情報の直接確認先：https://www.asobo-saga.jp/events/detail/33b5b433-c136-4d3e-86f7-b1461d1c17ce

通常枠。佐賀県観光公式のお火たき祭ページを直接確認し、白石町観光協会の写真・動画ギャラリーを検索。10月のおくんちとは区別した。今回、登録できるYouTube候補の直接確認までは至らず画像・動画追加なし。写真の利用条件・動画内容を検索スニペットだけで推定しない。座標も未確認のため維持。

### 題目立（上深川）（kamifukawa-daimokutate）

一次情報の直接確認先：https://yamatoji.nara-kankou.or.jp/01shaji/01jinja/01north_area/yahashirajinja-nara_kamihukawa/event/u4a0d6q7f9/

通常枠。県観光公式の題目立案内を直接確認。Googleマップで既存query「八柱神社 奈良県奈良市上深川町511」を検索し、八柱神社の地点は表示されたが住所が上深川町240となり、既存住所511と一致しなかった。place URLには34.6433556,135.9845795があるが、同一地点と断定して座標を追加しない。住所・mapReference自体を変更せず整合性専管領域の参考情報として報告する。今回対象一致YouTube候補は確定できず画像・動画追加なし。

### 奈良豆比古神社の翁舞（narazuhiko-okina-mai）

一次情報の直接確認先：https://narashikanko.or.jp/event/detail_10203.html

通常枠。奈良市観光協会の行事ページを直接確認。動画 https://www.youtube.com/watch?v=72ug9qSSDrA「『奈良豆比古神社の翁舞』ショート版 昭和53年度」を直接確認。奈良県無形文化遺産映像アーカイブ（3,320人）、3分00秒、155回視聴。hqdefaultと0〜3を開いた。デフォルト/0/1は題字中心、2・3は1978年撮影の低解像度の舞台映像に字幕が重なり背景不採用。公開年を撮影年（昭和53年＝1978年）と取り違える表示を避け動画も保留。素材調査で偶然見つかった https://nara-archive.net/each.php?id=DgKduUDClcg を直接確認し、管理元が奈良県文化財保存課と明記、指定区分が国指定重要無形民俗文化財であることを確認したため、既存フィールドnotableDesignationに『国指定重要無形民俗文化財「奈良豆比古神社の翁舞」』を追加。指定年は推測せず記入しない。highlightCommentは変更しない。

## eventStatus例外修正

- 熊野速玉大社例大祭・御船祭（kumano-hayatama-reitaisai-mifune-matsuri）：2026-10-15・16が全て過去日。
- 宇美八幡宮放生会（umi-hachimangu-hojoya）：2026-10-15・16が全て過去日。

新たな開催判断はせず、confirmedからendedへの機械的変更のみ。素材調査20件には含めない。

## 整合性専管領域・Founder確認候補（未修正）

- 神田祭：既存ヒューリスティックoff_year_has_dates、2026-05-15。小規模例大祭の可能性があるためこのタスクでは変更しない。
- 題目立の八柱神社：既存queryの上深川町511に対しGoogleマップ住所は上深川町240。同一地点か一次情報で再確認するまで座標追加・住所修正をしない。
- 挙母祭りの公式チャンネル動画説明が、観光協会の祭りページの内容と一致しない。画像は実写の山車を直接確認して採用したが、動画追加や日程等の変更は行わない。説明欄誤記の可能性があり、祭り公式の案内を優先することを推奨。
- 既存UIはpublishedYear（schema上は投稿・公開された年）を「過去開催時の様子（◯年）」と表示する。奈良豆比古神社の候補は1978年撮影の最近公開された動画であり、公開年を開催年として表示しないよう動画追加は保留。前回のおはら祭PV等の課題も未修正。UI・スキーマの変更は本タスクの対象外。

## 再生成・検証

- 詳細静的コンテンツ：koromo-matsuri、utano-aki-matsuri、miya-matsuri、nakahata-hachimansha-omanto-matsuri、ueno-tenjin-matsuri、narazuhiko-okina-mai、kumano-hayatama-reitaisai-mifune-matsuri、umi-hachimangu-hojoya。
- 特徴・都道府県・地方・月の4ハブと検索インデックスを全件再生成。
- node --check：全data.js・shared・scriptsの343ファイル成功。
- git diff --check成功。整合性hard 0件・heuristic 1件。slug/id/index・重複なし・JSON-LDパース317件成功。
- 画像2件は390×844・1440×900で確認。UI要素の重なり・アスペクト比崩れ・横スクロールなし。
- 動画追加は0件のため、新規ギャラリー・クリック展開検証は該当なし。
- 今回反映ページの表示確認で新しい機能不具合は検出されていない。既存表示仕様の課題は上記に別記。

## 次回候補

今回の直接取得不能候補（醸造安全祈願祭）、本編構成の確認を残したうたの秋祭り・佐賀バルーンフェスタ、未調査の通常枠候補（牛深ハイヤ祭り・八朔祭〔山都町〕）を対象選定ルールに従って検討。題目立の住所と動画の公開年表示は人間レビュー対象。
