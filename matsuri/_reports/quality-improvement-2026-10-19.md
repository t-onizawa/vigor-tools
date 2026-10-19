# 品質改善 実行報告 2026-10-19

## 実行環境・選定

- 開始時にfetch成功。origin/main `0563fe6e88a23d08b16e9288b5f0f613a37c280e` から新規専用worktree `/private/tmp/vigor-matsuri-4-20261019` を作成し、HEAD一致・cleanを確認。
- 通常作業ツリーはmainがahead 1 / behind 3。ローカルmainを基点にせず、未pushコミットは一切変更していない。
- 指示書、Backlog、Roadmap、schema-design、素材ガイドに従いmatsuri/のみ変更。
- 調査20件。開催直前枠は直近7日以内の確認済みを除外して該当なし（0件）。格付けあり見どころ未設定も0件。
- 通常選定20件（未調査の両方なし5件、前回から4週間以上経過した両方なし15件）。選定時の両方なし候補24件。
- 下表の一次情報を直接開いて確認。ただし福山ばら祭は本文取得が限定的で範囲再確認未完了。個別YouTubeページを直接確認できたのは11件。未到達・本編構成未確認を「素材が存在しない」「基準不適合確定」と扱わず保留した。

## 反映結果

- 反映7祭り。画像あり（3件）、動画なし（0件）、位置情報あり（4件）。note修正0件、公的指定追加0件、見どころ文変更0件。
- 画像対象：鬼小十郎まつり（onikojuro-matsuri）、仙台みちのくYOSAKOIまつり（sendai-michinoku-yosakoi-matsuri）、深谷まつり（fukaya-matsuri）。
- 位置情報対象：嚴島神社 管絃祭（itsukushima-kangen-sai、34.2959896, 132.3198285）、藤崎八旛宮例大祭（fujisaki-hachimangu-reitaisai、32.8083094, 130.7185242）、博多祇園山笠（hakata-gion-yamakasa、33.5929546, 130.4104589）、筥崎宮 放生会（hakozakigu-hojoya、33.6149865, 130.4228677）。
- 座標は既存label/queryに一致するGoogleマップplaceの!3d/!4dを採用。地図中心の@座標、神社の部分施設・大鳥居、巡行全域の代用点は採らない。
- 見送り13祭り。主な理由は画像の題字・低解像度、動画の通し記録・単独演舞、候補ページまたは本編構成の直接確認未完了。詳細は下表。
- 古川祭・函館港まつりは実表示後に画像試験適用を取り下げ、元のnullへ戻した。0.jpgはデフォルトと同一であり、文字なし代替画像とは扱わない。深谷まつりはデフォルト（優先度3）を採用。
- 母数327祭り。反映後：backgroundImage未設定241、atmosphereMedia未設定238、両方なし203、mapReference.lat/lng未設定267。
- 15件超のPMレビュー条件には該当しない。

## 調査一覧・一次情報・判断

### 1. 蔵の町むらた 布袋まつり（murata-hotei-matsuri）

一次情報：https://www.town.murata.miyagi.jp/kanko/event/hotei/index.html

結果：見送り／保留。未調査枠。町公式で布袋人形・山車行列のページ範囲を直接確認し、祭り名で動画を探索した。今回、採用候補となる動画ページの直接確認に至らず画像・動画は未追加。町公式の写真を利用条件未確認のまま転用しない。座標は設定済み。

### 2. おながわ秋の収獲祭（onagawa-aki-no-shukakusai）

一次情報：https://onagawa-matsuri.jp/autumn/

結果：見送り／保留。未調査枠。公式の開催御礼・炭火焼き秋刀魚と食の催しを直接確認。秋の収獲祭として探索し、春・みなと祭りとは区別した。今回登録可能なYouTube動画を直接確認できず、画像・動画は保留。既存座標は維持。

### 3. 鬼小十郎まつり（onikojuro-matsuri）

一次情報：https://onikojuro.jp/topics/1664/

結果：画像追加。未調査枠。白石市公式 https://www.city.shiroishi.miyagi.jp/soshiki/17/17678.html の公式YouTube再生リストから https://www.youtube.com/watch?v=rEXbIns4m7o を直接確認。宮城県白石市役所1570人、57:45、3672回。2022年10月1日開催の記録と明記。城を背にした甲冑武者が写る文字なし背景を優先度1で採用。動画は57分の合戦通し記録のため追加しない。

### 4. 仙台みちのくYOSAKOIまつり（sendai-michinoku-yosakoi-matsuri）

一次情報：https://michinoku-yosakoi.net/overview/

結果：画像追加。未調査枠。公式の開催概要・観覧案内を直接確認。https://www.youtube.com/watch?v=IljdhxyiMIY を直接確認。仙台みちのくYOSAKOIまつり公式2140人、5:02、481回。2023年10月8日市民広場の決勝ステージ。踊り手と大旗が明瞭な背景を優先度1で採用（右下ロゴは小さく主役を隠さない）。動画は単独チームの一演舞に限られ、祭り全体の複数の要素を伝える代表枠としては追加しない。

### 5. 柳津虚空蔵尊秋祭り（yanaizu-kokuzouson-aki-matsuri）

一次情報：https://kokuzouson.com/akimaturi2026/

結果：見送り／保留。未調査枠。寺院公式の秋祭り案内を直接確認。献膳行列・護摩祈祷の秋祭りとして動画を探索したが、今回該当する動画ページの直接確認に至らず保留。福島県柳津の虚空蔵尊や裸まいりの素材と取り違えない。既存座標は維持。

### 6. 嚴島神社 管絃祭（itsukushima-kangen-sai）

一次情報：https://www.itsukushimajinja.jp/jp-sp/event.html

結果：位置情報追加。4週間超の再調査。神社公式の年中行事と管絃祭の範囲を直接確認。動画探索では今回登録可能なYouTube候補の直接確認に至らず、画像・動画を追加しない。Googleマップの既存queryで嚴島神社本体（宮島町1-1・itsukushimajinja.jp）と本殿拝殿・大鳥居を区別し、神社本体のplace URLの!3d34.2959896!4d132.3198285を採用。建物や世界遺産登録を祭り自身の指定情報へ転記しない。

### 7. 藤崎八旛宮例大祭（fujisaki-hachimangu-reitaisai）

一次情報：https://fujisakigu.or.jp/

結果：位置情報追加。4週間超の再調査。公式サイト・例大祭資料を直接確認。https://www.youtube.com/watch?v=xjZH4lZiTc4 を直接確認。J:COMチャンネル・J:テレ26.3万人、4:01:50、8.6万回。hqdefault・0〜3を確認。デフォルトは大きな告知文字、代替は低解像度の行列や人物。2025年神幸行列は2026年の神前祭典・奉納行事のみというページ説明と差があるため背景採用は保留。動画は4時間の生中継記録で追加しない。Googleマップで熊本総鎮守藤崎八旛宮（井川淵町3-1、公式サイト一致）を社務所・大鳥居と区別し、本体のplace URLの!3d32.8083094!4d130.7185242を採用。

### 8. 深谷まつり（fukaya-matsuri）

一次情報：https://www.city.fukaya.saitama.jp/doraku/guide/guide05.html

結果：画像追加。4週間超の再調査。市公式の深谷まつりページを直接確認し、七夕まつりと区別。https://www.youtube.com/watch?v=BzM6Ssk1_Mg を直接確認。北関東おまつりinfo7360人、39:29、3442回。2026年の山車・屋台巡行と明記。hqdefault・0〜3を開き、0はデフォルトと同じ、1〜3は120×90で背景には低画質だった。実表示で主役が判別できるデフォルトを優先度3で採用。右上題字は左側の山車装飾・太鼓・演者を隠さない。動画は39分の山車中心の記録で、神輿は撮れていないと説明されるため代表動画追加なし。

### 9. 福山ばら祭（fukuyama-bara-matsuri）

一次情報：https://fukuyama-matsuri.jp/bara/

結果：見送り／保留。4週間超の再調査。祭り公式ページを直接開いたが本文抽出が限定的で、今回会場・ローズパレード範囲の再確認は未完了。公式動画を探索し、市のYouTubeチャンネル利用規約の所在は見つかったが、今回登録可能な動画ページの直接確認に至らず保留。ばらの一般風景だけを祭り映像として採用しない。座標は既存設定を維持。

### 10. 古川祭（furukawa-matsuri）

一次情報：https://www.hida-kankou.jp/features/204

結果：見送り／保留。4週間超の再調査。飛騨市公式観光サイトで屋台と起し太鼓の範囲を直接確認。https://www.youtube.com/watch?v=r_cMYT31MrU を直接確認。飛騨市公式チャンネル2470人、27:13、7060回。2024年4月19・20日開催と説明。hqdefault・0〜3を比較。0はデフォルトと同じ文字入り画像で、1〜3は120×90の低解像度。実表示で大きな題字が目立つため背景の試験適用を取り下げ、nullを維持。動画本編の構成割合を十分確認できていないため動画追加も保留。まつり広場の座標は未確定のまま。

### 11. 五所川原立佞武多（goshogawara-tachineputa）

一次情報：https://www.city.goshogawara.lg.jp/tourism/view/tachineputa.html

結果：見送り／保留。4週間超の再調査。市公式で市街地運行を直接確認。https://www.youtube.com/watch?v=0aKe1AlUpys を直接確認。ゆきと支配人 青森網羅_YukitoManager1.63万人、45:18、3.5万回。2025年8月8日と説明。hqdefault・0〜3を開いたが、デフォルトは切り抜き合成のような構成で現地の一場面と確証が持てず、代替2・3は120×90で背景には低画質、0は人物中心。背景追加なし。動画は45分の合同運行記録で追加なし。巡行コース全体を1点の座標に置換しない。

### 12. 郡上おどり（gujo-odori）

一次情報：https://www.gujohachiman.com/kanko/odori_schedule.html

結果：見送り／保留。4週間超の再調査。観光協会の夜ごとに会場が変わる日程を直接確認。名古屋・岐阜・京都の別会場イベントは除外。https://www.youtube.com/watch?v=YAO1iUMIaAE を直接確認。郡上どっとcom1.62万人、5:20、538回。2021年公開の過去撮影映像で、撮影年は明記されていない。hqdefault・0〜3は大きな題字や説明枠・低解像度の踊り場面で背景採用なし。動画は一曲の記録で、撮影年と公開年の混同も避けて保留。

### 13. 博多祇園山笠（hakata-gion-yamakasa）

一次情報：https://www.crossroadfukuoka.jp/event/11429

結果：位置情報追加。4週間超の再調査。県公式観光ページを直接確認し、動画探索で振興会の動画紹介・KBCの特集・よかなびの動画一覧を見つけた。今回、個別YouTube動画ページの直接確認までは至らず画像・動画は保留。Googleマップで上川端町1-41の櫛田神社を一意に確認し、place URLの!3d33.5929546!4d130.4104589を採用。神事の巡行全域を示す座標ではない。

### 14. 函館港まつり（hakodate-port-festival）

一次情報：https://www.hakodate-minatomatsuri.org/traffic/

結果：見送り／保留。4週間超の再調査。公式の交通規制・パレードコースを直接確認。https://www.youtube.com/watch?v=dMYB5zo2Oog を直接確認。函館市公式動画チャンネル3240人、1:23、792回。2026年8月2日の十字街・松風コースで、いか踊りなどを紹介。hqdefault・0〜3を比較し、0はデフォルトと同じ大きな題字の画像、1〜3は120×90の低画質。実表示で題字が支配的になるため背景試験適用を取り下げ、nullを維持。動画はナレーション比率を確認しきれていないため保留。参照地点は駅前・松風町周辺という範囲であり駅舎の座標に安易に置換しない。

### 15. 筥崎宮 放生会（hakozakigu-hojoya）

一次情報：https://hakozakigu.or.jp/omatsuri/

結果：位置情報追加。4週間超の再調査。筥崎宮公式の放生会案内を直接確認。https://www.youtube.com/watch?v=iZ5UfuWAYfg を直接確認。まつりにいこう2020人、26:08、8663回。hqdefault・0〜3は露店と歩行者中心で、神事や祭りの主役が分かる背景を確定できず見送り。動画は26分の記録で構成確認を残し保留。Googleマップで神社本体（箱崎1-22-1・hakozakigu.or.jp）を本殿・拝殿と区別し、place URLの!3d33.6149865!4d130.4228677を採用。

### 16. 花巻まつり（hanamaki-matsuri）

一次情報：https://www.city.hanamaki.iwate.jp/kanko/oshirase/1021701.html

結果：見送り／保留。4週間超の再調査。市公式の山車・神輿・花巻ばやし・鹿踊のプログラムを直接確認。動画探索で花巻ケーブルテレビの番組案内は見つかったが、今回個別のYouTube動画ページの直接確認に至らず画像・動画追加なし。上町おまつり広場の座標も未確定のまま。関連行事の文化財公開を祭り自身の指定情報へ転記しない。

### 17. 火の国まつり（hinokuni-matsuri）

一次情報：https://kumamoto-guide.jp/hinokunimatsuri/index.html

結果：見送り／保留。4週間超の再調査。公式ページでおてもやん総おどりを直接確認し、長洲町の別の火の国イベントとは区別した。公式YouTubeチャンネルを検索で発見したが、今回個別の動画ページ直接確認までは至らず画像・動画は保留。花畑広場の座標は今回未確認のまま。

### 18. 日田祇園（hita-gion）

一次情報：https://www.city.hita.oita.jp/site/hitanioideyo/2459.html

結果：見送り／保留。4週間超の再調査。市公式で山鉾巡行・集団顔見世の範囲を直接確認。動画探索を行ったが、今回採用できる個別YouTube動画の直接確認に至らず画像・動画追加なし。日田駅前の参照点座標は未確認のまま。

### 19. 日向ひょっとこ夏祭り（hyuga-hyottoko-natsu-matsuri）

一次情報：https://hyuga.or.jp/app/events/view/11

結果：見送り／保留。4週間超の再調査。観光協会・実行委員会公式を直接確認。https://www.youtube.com/watch?v=j9vRi14-h0Q を直接確認。ケーブルメディアワイワイ4.88万人、2:02:05、7478回。2026年8月1日の祭り中継。hqdefault・0〜3は告知文字が多い画像やレポーター等の場面で、権利条件（切り抜き・引用禁止の記載）も確認を残すため背景採用なし。動画は2時間の生中継記録で追加しない。あくがれ広場座標は未確認のまま。

### 20. 犬山祭（inuyama-matsuri）

一次情報：https://inuyama.gr.jp/event/detail/1/

結果：見送り／保留。4週間超の再調査。観光協会公式で車山とからくり奉納の範囲を直接確認。https://www.youtube.com/watch?v=45RDdMwTSfA を直接確認。犬山市公式YouTube「ONE CHAN」1030人、19:55、1987回。2023年4月1・2日を公募メンバーが撮影と説明。hqdefault・0〜3は中央題字が山車を覆う、または120×90の低解像度・人物中心で背景見送り。動画は本編構成を十分確認できていないため保留。針綱神社の座標は未確認のまま。

## 再生成・検証

- 詳細ページ再生成：onikojuro-matsuri、sendai-michinoku-yosakoi-matsuri、fukaya-matsuri、itsukushima-kangen-sai、fujisaki-hachimangu-reitaisai、hakata-gion-yamakasa、hakozakigu-hojoya。試験適用を取り下げた2件も再生成して元の状態に復元。
- 特徴・都道府県・地方・月の4種類のハブと検索インデックスを全件再生成。検索インデックスは結果として差分なし。ハブのCSS v52→v53も現行生成器に従う派生差分。
- 全data.jsおよびshared JSのnode --check、git diff --check、327件id/slug/登録一覧の重複・対応、JSON-LDパースを確認。
- data.jsの意味的差分はbackgroundImageと既存mapReference.lat/lngのみであることを機械比較。
- 7ページを390×844・1440×900で確認。採用画像3件のヒーローを両サイズで視認。文字重なり・アスペクト比崩れ・横スクロール・localhost由来console errorなし。動画追加なしのため新規ギャラリー展開テストは対象外。
- 既存表示不具合：今回確認範囲ではなし。
- eventStatus例外修正：該当なし（0件）。参考情報：神田祭のoff_year_has_dates（2026-05-15）は既存のため修正していない。
- 反映直前のfetch・競合の有無、commit hash、main push、GitHub Pages・本番確認結果は実行完了時のチャット報告に記載する。

## 次回候補

未調査の両方なし、4週間を経過した両方なしを引き続き優先。今回保留した本編構成・ナレーション比率・権利条件・一次情報本文の確認は未解決のまま採用しない。開催直前枠は最新日程と7日除外を再計算する。

