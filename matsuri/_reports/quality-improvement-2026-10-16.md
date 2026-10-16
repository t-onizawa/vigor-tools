# 毎日品質改善 実行記録 2026-10-16

## 実行環境・集計

- origin/main `9c1b2ff3dd9ea9fc5fe952d6e6d81879a9e849f0`をfetch後に直接基点として新規専用worktreeを作成。開始時HEAD一致・cleanを確認。通常作業ツリーは変更しない。
- 素材調査20件：開催直前枠15件、通常枠5件。開催中止の八代妙見祭は開催直前枠から除外。
- 品質改善8祭り（画像4・動画1・座標3）。eventStatus例外修正2祭り（うち竹ン芸は品質改善と重複）、データ変更は合計9祭り。
- 素材・座標の追加見送り12祭り。候補の確認未完了は不採用確定と区別し、次回再調査対象とする。
- note修正0件、notableDesignation未設定補完0件、highlightComment補完対象0件。
- 変更後の母数312件：背景未設定241、動画未設定223、両方なし196、座標未設定276。
- 既存参考情報：神田祭 off_year_has_dates（2026-05-15）。本タスクでは修正しない。

## 対象別の結果・根拠

各記録のURLは実際に開いた動画ページ・一次情報。検索のみのものは明記する。

### funabashi-daijingu-reitaisai（開催直前枠）

画像・動画追加なし。公式 https://www.oohijinja.jp/history.html は502で取得不能。候補 https://www.youtube.com/watch?v=KHX_mlapAxM「船橋大神宮 例大祭 2015/10/20 奉納相撲大会 五人抜き戦2」を直接確認。oha taira（555人）、9分20秒、5,606回視聴、説明なし。奉納相撲の特定対戦の記録で、神楽等を含む祭り全体の入口動画としては3節の一場面のみの基準で不採用。既存背景は維持。

### hanno-matsuri（開催直前枠）

素材追加なし。検索と https://www.hanno-matsuri.com/ の直接確認を実施。案内は9月25日〜10月1日の展示・体験WEEKであり、11月の飯能まつり本体動画を確認できない。別企画を祭り本体として流用しない。既存画像・座標は維持。動画候補は直接確認できず保留。

### jidai-matsuri（開催直前枠）

座標追加。https://ja.kyoto.travel/event/major/jidai/ を直接確認。Googleマップを既存query「平安神宮」で検索し、平安神宮（京都市左京区岡崎西天王町97、公式heianjingu.or.jp）に一意に遷移。place URLの!3d35.0159823!4d135.7824263より緯度35.0159823、経度135.7824263を記録。表示中心だけを根拠にしない。動画は既存を維持し、新規背景の採否は保留。

### kasuga-wakamiya-onmatsuri（開催直前枠）

座標追加。https://onmatsuri.kasugataisha.or.jp/ を直接確認。Googleマップを既存query「春日大社」で検索し、春日大社（奈良市春日野町160、公式kasugataisha.or.jp）を一意に特定。place URLの!3d34.6815454!4d135.8484719を採用。背景・動画の新規採用なし。前回の解説動画候補を内容未確認のまま採用しない。

### kumano-hayatama-reitaisai-mifune-matsuri（開催直前枠）

背景追加。https://matsurito.jp/matsuri/kumanomifune/index.html と https://www.youtube.com/watch?v=hQy5aYGaTc0 を直接確認。「祭りドキュメンタリー#26 和歌山県・熊野速玉祭」、まつりと 日本のまつり探検プロジェクト（7,360人）、12分45秒、約3.5万回視聴。hqdefault画像を直接開き、御船島を囲んで進む複数の早船が判別できる現地実写と確認。小ロゴは船を隠さず優先度1で採用。publisherTypeはガイド4節によりlocal_media。動画は構成中の解説比率を確定できず保留（尺だけを理由に不採用とはしない）。

### matsudo-jinja-reitaisai（開催直前枠）

座標追加。Googleマップで既存query「松戸神社 千葉県松戸市」を検索、松戸神社（松戸1457、公式matsudojinja.com）を一意に特定。place URL !3d35.7806206!4d139.8977664を採用。https://www.city.matsudo.chiba.jp/miryoku/kankoumiryokubunka/matsuri/summer/matsudojinjya.html から短編 https://www.youtube.com/watch?v=k-OlQRFu6AE を直接確認。「平成に甦った松戸の大まつり『神幸祭』（短編）」、まっちゃんねる（千葉県松戸市公式）（4,770人）、3分29秒、2,308回視聴、公開2016/03/30、説明は2015/10/18撮影。神具・巡行の実写を確認。hqdefaultと0は題字のみ、1〜3は120×90の神具・人物で背景解像度不足。動画は公開年2016を既存UIが開催年として表示すると撮影年2015と食い違うため追加保留。schema/UIは変更せずレビュー候補とする。

### miyazaki-jingu-taisai（開催直前枠）

代表動画追加。https://www.kanko-miyazaki.jp/event/1269 と https://www.youtube.com/watch?v=whrU8Y9Yps8 を直接確認。「宮崎神宮大祭2019 神武さま」、宮崎市公式チャンネル (miyazaki city channel )（1.1万人）、1分33秒、6,190回視聴。公開日2019/10/17を展開確認しpublishedYear:2019。説明は御鳳輦・稚児行列・ミスシャンシャン馬等を紹介。実写・フレームで参道と行列を確認、複数の祭り要素を伝える短い公式紹介として採用。既存動画なしで重複なし。明確な確認済みバッジは確認できず、公式性は市のチャンネル名・説明から確認。背景はhqdefault/0/1/3が題字、2は120×90の行列画像のため不採用。

### nagasu-kingyo-koi-no-sato-matsuri（開催直前枠）

素材追加なし。https://www.town.nagasu.lg.jp/soshiki/machizukuri/shoko/178721620226511/ を直接確認し、秋の金魚と鯉の郷まつりと春の火の国長洲金魚まつり・夏ののしこら祭を区別して検索。対象祭りの動画ページで投稿者・実写内容を確定できるYouTube候補は得られず保留。別行事の金魚映像を転用しない。座標は既存を維持。

### ohara-matsuri（開催直前枠）

素材追加なし。https://www.kagoshima-yokanavi.jp/event/10001 の埋込から https://www.youtube.com/watch?v=tgrQyeoaGuc を直接確認。「おはら祭PV（フルバージョン）（観光振興課）」、鹿児島市（3,510人）、2分22秒、1,310回視聴、公開2026/01/30。実際の総踊りを本編・画像で確認。撮影年は確定できず、既存UIが公開年を開催年として表示するため、2026年11月開催前の映像を2026年開催時と誤認させる懸念があり動画追加保留。hqdefault/0は左側に縦書き文字、1〜3は120×90かつロゴ入り。背景は文字の多さ・ヒーロー文字との重なりリスクから不採用。UIは本タスクでは変更しない。

### saga-international-balloon-fiesta（開催直前枠）

素材追加なし。https://www.sibf.jp/news/2024/20241204a.html と https://www.city.saga.lg.jp/city-promotion/promotion/18/index.html の検索結果を調査。公式2024候補は約13分で運営役員・ボランティア等も扱う。今回、候補の本編構成と背景全フレームの直接確認までは完了せず保留。前回確認済みのタイトル画像のみで気球の背景に採用しない。座標は地点未確定のまま推測で補完しない。

### tochigi-aki-matsuri（開催直前枠）

追加なし。https://www.city.tochigi.lg.jp/site/tourism/26060.html を直接確認し既存画像・動画を維持。主な不足は「蔵の街大通り」の座標だが、通りのどの一点を参照するかの直接確認が完了していないため保留。通り全域の代表位置を推測して埋めない。

### ueno-tenjin-matsuri（開催直前枠）

素材追加なし。https://www.kankomie.or.jp/event/5285 を直接確認して祭りの対象を調査。背景・動画の直接確認済み候補を今回確定できず保留。神社座標も未確認のため維持。検索結果の要約だけでは投稿者・素材を確定しない。

### yagorodon-matsuri（開催直前枠）

素材追加なし。https://soo-navi.jp/soo-festival/yagoroudon-festival/ を直接確認。検索で見つかった「山之口弥五郎どん祭り」（宮崎県都城市）を岩川八幡神社（鹿児島県曽於市）の祭りと混同しない。曽於市側の別候補 https://www.youtube.com/watch?v=0dgBIRmudf8 は直接確認未完了で保留。背景・動画・座標は追加なし。

### yobuko-kunchi（開催直前枠）

背景追加。https://www.city.karatsu.lg.jp/page/52392.html と https://www.youtube.com/watch?v=FDPnfBScMfc を直接確認。「呼子くんち、闇夜に親子鯨輝く（2024年11月9日）」、佐賀新聞[SagaShimbun]（2.46万人）、36秒、1,074回視聴。説明で親子鯨山車を曳く実際の祭りと確認。hqdefaultと0〜3を直接開いた。0はデフォルトと同じ、1〜3は120×90で報道見出しが残る。優先度3で主役の親子鯨を隠さないデフォルトを採用。動画は36秒で夜の曳山という特定場面中心のため入口動画としては追加しない。

### yokosuka-mikoshi-parade（開催直前枠）

素材追加なし。https://yokosuka-kanko.com/events/46th_mikoshi/ を直接確認して対象パレードを調査。直接確認済みの新規YouTube候補は得られず保留。横須賀中央大通りの参照点座標も未確認のため推測で追加しない。

### hinokuni-nagasu-kingyo-matsuri（通常枠）

通常選定。素材追加なし。https://www.town.nagasu.lg.jp/soshiki/machizukuri/shoko/177820668614735/ を直接確認。春の火の国長洲金魚まつりを秋の金魚と鯉の郷まつり・夏ののしこら祭と区別して検索。投稿者・内容を直接確認できる対象一致YouTube候補は得られず保留。既存座標は維持。

### inasa-jinja-ohitaki-matsuri（通常枠）

通常選定。素材追加なし。https://www.asobo-saga.jp/events/detail/33b5b433-c136-4d3e-86f7-b1461d1c17ce と観光協会の写真・動画ギャラリーの候補を調査。年末のお火たき祭を10月のおくんちと区別した。直接確認済みのYouTube候補は得られず追加保留。座標未確認。検索スニペットだけで画像の利用可否や動画内容を確定しない。

### nagasaki-takenge（通常枠）

通常選定。背景追加。https://matsurito.jp/matsuri/takengei/index.html と https://www.youtube.com/watch?v=KSnlO2V6UyI を直接確認。「祭りドキュメンタリー#17 長崎県・竹ン芸」、まつりと 日本のまつり探検プロジェクト（7,360人）、12分49秒、約3.1万回視聴。hqdefaultを直接開き、青竹上の白装束の演者が判別できる現地実写と確認。左上小ロゴは演者を隠さず優先度1で採用。publisherTypeはlocal_media。動画は本編の構成比率を確定できず保留。別途、全件整合性チェックのconfirmed_but_all_past例外により2026/10/14・15終了後のeventStatusをendedへ更新（日程や開催判断は変更しない）。

### noshikora-matsuri（通常枠）

通常選定。背景追加。https://www.town.nagasu.lg.jp/soshiki/machizukuri/shoko/17902261583662624/ と https://www.youtube.com/watch?v=TEhFQIYuK44 を直接確認。「２０２５年 のしこら祭」、ohjaga（3,850人）、10分24秒、449回視聴。説明で長洲町の金魚みこしタイムレースの撮影と確認。hqdefaultは金魚みこし本体と担ぎ手が明瞭な文字装飾なしの実写で優先度1採用。個人投稿・動画尺は背景不採用理由にしない。動画は一つの競技の記録中心で3節の一場面のみの基準により不採用。

### ushibuka-haiya-matsuri（通常枠）

通常選定。素材追加なし。https://ushibuka-haiya.com/ を直接確認し関連する映像案内を検索。公式トップからYouTubeの祭り本体動画を特定できず、牛深総合センターの歴史映画等を未確認のまま祭りの入口動画として採用しない。直接確認可能なYouTube候補は今回確定できず保留。座標は既存を維持。

### nada-kenka-matsuri（全件整合性の例外枠）

全件整合性チェックの例外修正のみ（20件の素材調査枠には含めない）。confirmed_but_all_pastに該当し、2026/10/14・15が全て過去日のためeventStatusをconfirmedからendedへ機械的に更新。日程・一次情報・素材の再判定や変更は行わない。

## 既存表示仕様の要レビュー事項

`shared/festival-detail.js`の既存処理（変更前HEADにも存在）は、schema上「投稿・公開された年」であるpublishedYearを「過去開催時の様子（◯年）」として表示する。松戸の短編候補は2015年撮影・2016年公開、おはら祭PV候補は2026年1月公開・撮影年不明のため、公開年を開催年と誤認させる。この2動画の追加は保留し、UI・スキーマは変更していない。既存仕様の問題だけで他の品質改善は停止しない。

## 再生成・検証

- 詳細静的コンテンツ対象：nada-kenka-matsuri、nagasaki-takenge、kumano-hayatama-reitaisai-mifune-matsuri、miyazaki-jingu-taisai、matsudo-jinja-reitaisai、yobuko-kunchi、noshikora-matsuri、jidai-matsuri、kasuga-wakamiya-onmatsuri。
- 特徴・都道府県・地方・月の4ハブと検索インデックスを再生成。
- 全data.js・shared・scriptsのnode --check：338ファイル成功。
- git diff --check成功、整合性チェックhard 0件、slug/id/index整合・重複なし312件。
- 画像4件は390×844と1440×900で確認。UI要素の重なり・アスペクト比崩れ・横スクロールなし。素材に元々ある小ロゴ・報道見出しは背景の採用優先度に従い記録済み。
- 動画はギャラリー表示・クリック再生とアスペクト比を確認。
- 公開前にorigin/mainを再fetchし、変更があれば安全に取り込んで検証を再実行する。

## 次回候補

松戸・おはらの動画は公開年と撮影年の表示方針レビュー待ち。上野天神祭・弥五郎どん祭り・佐賀バルーンフェスタは動画ページと画像の直接確認を継続。通常枠では未調査の八朔祭（山都町）等を対象選定ルールに従って検討する。
