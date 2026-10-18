# 毎日品質改善 2026-10-18

## 実行環境・方針

- git fetch origin成功後、origin/main `306844dec147c963aaaf63058d1ae526fbdb2eac`から実行専用worktree `/private/tmp/vigor-matsuri-4-20261018`を作成。HEAD一致・cleanを確認。通常作業ツリー・ローカルmainの差分を持ち込んでいない。
- BacklogのPhase 2、Roadmap H2安定運用、素材ガイド1〜8節に従う。指定済みで見どころなしの優先対象は0件。
- 開催直前枠は直近7日内の調査記録（未完了を含む）を除き2件。通常枠は未調査の両方なし6件、4週間超経過した画像のみ不足12件。合計20件。調査未完了は不採用確定と混同しない。

## 結果

- データ反映12祭り（直前2、通常10）。画像10件・座標2件・文化財指定情報1件（画像対象と重複）。
- 動画追加：なし（0件）。既存動画配列は変更していない。
- note修正0件。highlightComment・SEO・タイトル・説明文・UI・体験タグは変更なし。
- 未反映8祭り。詳しい見送り理由は下記。大磯は表示検証後に試験適用を取り下げた。
- 全322件：backgroundImage未設定239件、atmosphereMedia未設定233件、両方なし201件、mapReference座標未設定271件。
- eventStatus例外：該当なし（0件）。初回・変更後ともhard issue 0件。神田祭のoff_year_has_dates（2026-05-15）は既存参考情報として未修正。
- PMレビュー閾値15件超には該当しない。

## 画像追加（10件）

- iizaka-kenka-matsuri：ぶらっとWebTV / https://www.youtube.com/watch?v=HBREsDm2M1Y / 優先度3。0〜3も比較したが文字入り・低解像度。提灯屋台と担ぎ手が判別でき、左下の題字は主役を隠さない。
- matsukawa-chochin-matsuri：kukimaturi / https://www.youtube.com/watch?v=8Ccn1Y8u10Q / 優先度1。文字オーバーレイのない夜の提灯山車の実写。複数の山車に灯る提灯が判別できる。
- shinobu-sanzan-akatsuki-mairi：福島市公式ユーチューブ［ふくしまチャンネル］ / https://www.youtube.com/watch?v=UY4YEMjNSX8 / 優先度3。0〜3は製作場面・低解像度・字幕入り。デフォルトの大わらじは全体が判別でき、下部字幕は主役を隠さない。
- ikiko-jinja-nakizumo：下野新聞チャンネル / https://www.youtube.com/watch?v=mmSYVDfnCBU / 優先度3。0〜3も文字入り・低解像度。力士役に抱き上げられた幼児が明瞭で、下部見出しは主役を隠さない。
- isesaki-matsuri：群馬県伊勢崎市【動画で見るいせさき】 / https://www.youtube.com/watch?v=cGFNZ-uSVfk / 優先度3。0は文字入りデフォルトと同じで、1〜3は低解像度の人物中心の場面。中央の神輿と担ぎ手が判別でき、周囲の文字は神輿を隠さない。
- kamakura-matsuri-yabusame：西田忠夫 / https://www.youtube.com/watch?v=GdRw-F_UBM0 / 優先度3。0は文字入りデフォルトと同じで、1〜3は低解像度の人物・遠景。馬上で弓を引く射手が明瞭で、上部題字は射手と馬を隠さない。
- kashima-jingu-saitousai：茨城新聞動画ニュース / https://www.youtube.com/watch?v=DKPsjTeZUQo / 優先度3。0〜3は低解像度・字幕入り。色鮮やかな衣装と組み合わせた樫棒が明瞭で、下部字幕は樫棒を隠さない。
- kawasaki-sannosai：太田裕 / https://www.youtube.com/watch?v=lEcivP5DoFM / 優先度1。文字オーバーレイのない銀柳街渡御の実写。孔雀を頂く神輿と周囲の担ぎ手が判別できる。
- ome-taisai：Matsuri Japan / https://www.youtube.com/watch?v=cAXb_-rZ0FQ / 優先度3。0は文字入りデフォルトと同じで、1〜3は低解像度の遠景。上部の山車とお囃子が明瞭で、下部題字は山車上の演者を隠さない。
- shibukawa-heso-matsuri：渋川市公式チャンネル / https://www.youtube.com/watch?v=g-tPCzqwcMA / 優先度3。0〜3は低解像度・字幕入り。腹に顔を描いた踊り手の腹部が判別でき、上部題字は腹部を隠さない。

## 座標追加（2件）

- 秩父夜祭 chichibu-yomatsuri：秩父神社、35.9976189,139.0841388。番場町1-3・公式サイト一致。
- おぢや牛の角突き ojiyashi-ushi-no-tsunotsuki：小千谷闘牛場、37.3365655,138.8566505。小栗山2453・公式サイト一致。

Googleマップの既存queryから一意のplaceを開き、!3d/!4dの地点座標を使用。ビュー中心値ではない。

## 調査20件・一次情報・結果

### chichibu-yomatsuri

開催直前枠。画像・動画は既存のまま。Googleマップで秩父神社を検索し、番場町1-3・公式サイトchichibu-jinja.or.jpの一意の地点を確認。place URLの!3d35.9976189!4d139.0841388を採用（表示中心座標ではない）。座標2項目のみ補完。

一次情報は research/chichibu-yomatsuri.md に記録。

### ojiyashi-ushi-no-tsunotsuki

開催直前枠。Googleマップで小千谷闘牛場（小栗山2453、tsunotsuki.com）を一意に確認。place URLの!3d37.3365655!4d138.8566505を採用。県観光公式掲載動画 https://www.youtube.com/watch?v=1nzEHbOCawg を直接確認。クワスコ34人、3:52、1443回、2018年初場所。hqdefaultと0〜3を開き、デフォルトは人のみ、2・3は牛が写るが120×90の低解像度で背景の画質を満たさず見送り。動画は投稿者の継続活動・全体構成の確認を残し保留。国重要無形の表示は観光紹介であり指定機関・自治体による指定詳細確認までは行わずnotableDesignation追加なし。

一次情報は research/ojiyashi-ushi-no-tsunotsuki.md に記録。

### fukushima-dashi-matsuri

通常枠（未調査の両方なし）。主催事務局の福島民報社 https://corp.minpo.jp/event/第18回ふくしま山車祭り/ を直接開き、26年ダイジェストリンク https://www.youtube.com/watch?v=wfLER8UxaME を確認。民報印刷48人、0:49、54回、限定公開。サムネイルは前景の人物が山車を遮り暗いため背景は見送り。動画はDVDダイジェストの全体構成を未確認のため保留（短尺だけを不採用理由にしない）。

一次情報は research/fukushima-dashi-matsuri.md に記録。

### iizaka-kenka-matsuri

通常枠（未調査の両方なし）。https://www.youtube.com/watch?v=HBREsDm2M1Y を直接確認。ぶらっとWebTV402人、1:36、3323回、2013年宮入り。背景は優先度3で採用。動画は宮入り一場面に限られるため追加しない。今回の背景採否は動画の尺・発信元の格付けとは独立に判断。

一次情報は research/iizaka-kenka-matsuri.md に記録。

### matsukawa-chochin-matsuri

通常枠（未調査の両方なし）。https://kuki-chochinmatsuri.com/html/matukawa.html の紹介リンクから https://www.youtube.com/watch?v=8Ccn1Y8u10Q を直接確認。kukimaturi501人、17:47、8385回。2016年10月9日の松川町と説明される。文字なしの提灯山車の背景を優先度1で採用。動画は長尺の運行記録のため追加しない。

一次情報は research/matsukawa-chochin-matsuri.md に記録。

### nihonmatsu-chochin-matsuri

通常枠（未調査の両方なし）。市公式と観光連盟 https://www.nihonmatsu-kanko.jp/?p=1473 を直接確認。動画探索で https://www.ntv.co.jp/matsuri/backnumber/11.html を直接開いた。提灯制作継承の番組内容であり、祭りの雰囲気紹介とは役割が違う。今回登録可能なYouTube動画ページの直接確認に至らず画像・動画追加なし。素材調査未完了として次回候補。

一次情報は research/nihonmatsu-chochin-matsuri.md に記録。

### shinobu-sanzan-akatsuki-mairi

通常枠（未調査の両方なし）。https://www.youtube.com/watch?v=UY4YEMjNSX8 を直接確認。福島市公式ユーチューブ［ふくしまチャンネル］7870人、1:47、1836回。市街地を練り歩き羽黒神社へ奉納する大わらじの説明と画像を確認。背景は優先度3で採用。動画はナレーション主体の割合・公開年の正確な表示を確認しきれず保留。

一次情報は research/shinobu-sanzan-akatsuki-mairi.md に記録。

### yamato-hassaku-matsuri

通常枠（未調査の両方なし）。観光協会の2023年引き回しリンク https://www.youtube.com/watch?v=eeSvgcW1Sds を直接確認。【公式】山都町山の都創造チャンネル829人、4:39:22、1万回。背景hqdefaultと0〜3は告知コラージュ中心、3も低解像度で大造り物が判別できず不採用。動画は4時間超のライブ記録のため不採用。

一次情報は research/yamato-hassaku-matsuri.md に記録。

### kanda-matsuri

通常枠（片方不足・4週間超）。既存動画 https://www.youtube.com/watch?v=MThJ2cvI-Zk を直接確認。江戸総鎮守 神田明神 公式チャンネル -KANDAMYOUJIN-8610人、3:09、1843回。背景hqdefault・0は題字のみ、1・2は赤い説明帯付きコラージュ、3は群衆中心の低解像度で代表背景に不向き。新規画像追加なし。既存動画は維持。

一次情報は research/kanda-matsuri.md に記録。

### odawara-hojo-godai-matsuri

通常枠（片方不足・4週間超）。観光協会ページは取得403だったがブラウザで直接確認できた。既存 https://www.youtube.com/watch?v=quCaBlDVBVA を直接確認。小田原市公式チャンネル7280人、1:55、6209回。2023年5月3日と説明。hqdefaultと0〜3を確認。大きな英語題字が武者を覆い、代替は人物中心・120×90の低画質で背景見送り。既存動画維持。

一次情報は research/odawara-hojo-godai-matsuri.md に記録。

### oiso-sagicho

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=pI-nGnDhqyM を直接確認。旅channel花鳥風月597人、6:28、245回、2024年1月14日の現地訪問と説明。hqdefault・0〜3を比較。390×844で題字帯が支配的となり炎が端へ切れるため背景は最終不採用。元のnullを維持。タイトルにある国指定は指定機関・自治体の根拠を今回直接確認していないためnotableDesignationへ転記しない。既存動画維持。

一次情報は research/oiso-sagicho.md に記録。

### ome-taisai

通常枠（片方不足・4週間超）。公式ページをブラウザで直接確認。既存 https://www.youtube.com/watch?v=cAXb_-rZ0FQ を直接確認。Matsuri Japan1330人、1:14:29、9093回。2026年12台の山車・喧嘩囃子を説明。hqdefault・0〜3を比較し、デフォルトの山車上の演者とお囃子が判別できるため優先度3で採用。既存長尺動画の採否変更は本タスクでは行わず維持。

一次情報は research/ome-taisai.md に記録。

### sagami-odako-matsuri

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=F8ZFzFwTH9I を直接確認。表示投稿者は新戸大凧保存会、千葉ハルカ【秘書とセラピストとカメラ】、登録者数非表示、4:44、3061回。hqdefaultは大凧と集合写真だが、自動抽出0〜3は子ども・婚礼の場面でタイトル・説明と一致しない。内容一致を保証できないため新規画像採用なし。既存動画のURL・タイトル不一致疑いを人間レビューへ報告し、本タスクでは推測で既存データを修正しない。

一次情報は research/sagami-odako-matsuri.md に記録。

### shibukawa-heso-matsuri

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=g-tPCzqwcMA を直接確認。渋川市公式チャンネル2770人、5:02、3880回。はら踊りや路上パフォーマンスを説明。hqdefault・0〜3を比較し、腹部の顔と踊りが明瞭なデフォルトを優先度3で採用。既存動画維持。

一次情報は research/shibukawa-heso-matsuri.md に記録。

### shinjo-matsuri

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=-39otyNlToM を直接確認。スマイル・リレー・チャレンジ1.2万人、23:13、2.3万回。隣町に住む撮影者と説明。hqdefaultと0〜3を開いたが大きな題字・人物中心・低解像度のため背景不採用。既存動画の採否は変更しない。公式サイトの指定表示は確認したが指定機関・自治体の詳細裏付け調査は行わず転記しない。

一次情報は research/shinjo-matsuri.md に記録。

### ikiko-jinja-nakizumo

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=mmSYVDfnCBU を直接開き、投稿者下野新聞チャンネル（1.61万人、1:16、2314回）を確認。優先度3。0〜3も文字入り・低解像度。力士役に抱き上げられた幼児が明瞭で、下部見出しは主役を隠さない。背景のみ採用し、既存動画配列は変更しない。素材調査中に鹿沼市公式ページで市指定（平成2年3月31日）・国選択（平成8年11月28日）を直接確認したため、notableDesignationにそのまま記録。国指定重要無形民俗文化財とは記載しない。

一次情報は research/ikiko-jinja-nakizumo.md に記録。

### isesaki-matsuri

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=cGFNZ-uSVfk を直接開き、投稿者群馬県伊勢崎市【動画で見るいせさき】（1630人、1:55、2057回）を確認。優先度3。0は文字入りデフォルトと同じで、1〜3は低解像度の人物中心の場面。中央の神輿と担ぎ手が判別でき、周囲の文字は神輿を隠さない。背景のみ採用し、既存動画配列は変更しない。

一次情報は research/isesaki-matsuri.md に記録。

### kamakura-matsuri-yabusame

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=GdRw-F_UBM0 を直接開き、投稿者西田忠夫（2640人、3:01、2930回）を確認。優先度3。0は文字入りデフォルトと同じで、1〜3は低解像度の人物・遠景。馬上で弓を引く射手が明瞭で、上部題字は射手と馬を隠さない。背景のみ採用し、既存動画配列は変更しない。

一次情報は research/kamakura-matsuri-yabusame.md に記録。

### kashima-jingu-saitousai

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=DKPsjTeZUQo を直接開き、投稿者茨城新聞動画ニュース（9.63万人、2:10、2208回）を確認。優先度3。0〜3は低解像度・字幕入り。色鮮やかな衣装と組み合わせた樫棒が明瞭で、下部字幕は樫棒を隠さない。背景のみ採用し、既存動画配列は変更しない。

一次情報は research/kashima-jingu-saitousai.md に記録。

### kawasaki-sannosai

通常枠（片方不足・4週間超）。既存 https://www.youtube.com/watch?v=lEcivP5DoFM を直接開き、投稿者太田裕（6510人、4:24、2726回）を確認。優先度1。文字オーバーレイのない銀柳街渡御の実写。孔雀を頂く神輿と周囲の担ぎ手が判別できる。背景のみ採用し、既存動画配列は変更しない。

一次情報は research/kawasaki-sannosai.md に記録。

## 人間レビュー・次回候補

- 相模の大凧まつり：既存動画F8ZFzFwTH9Iのタイトル・説明は大凧だが、直接開いた自動抽出0〜3は婚礼・子どもの場面。差し替わりや内容混在の可能性があり、既存動画を残すか・除去するか人間確認を推奨。推測修正なし。
- 神田祭：off_year_has_datesは例大祭の可能性があるため専管タスクへ参考報告。
- 新庄・青梅の既存長尺動画は今回は背景採否だけ判断し、既存動画配列は維持。
- 次回：ふくしま山車祭りの主催側ダイジェスト、小千谷候補の投稿者継続性・本編構成、二本松の直接動画候補、八朔祭の別の大造り物画像。通常の除外期間・未完了記録を確認して選定。

## 再生成・検証

- 詳細再生成対象：chichibu-yomatsuri、ojiyashi-ushi-no-tsunotsuki、iizaka-kenka-matsuri、matsukawa-chochin-matsuri、shinobu-sanzan-akatsuki-mairi、ikiko-jinja-nakizumo、isesaki-matsuri、kamakura-matsuri-yabusame、kashima-jingu-saitousai、kawasaki-sannosai、ome-taisai、shibukawa-heso-matsuri。
- 特徴・都道府県・地方・月ハブ4種と検索インデックスを全件再生成。
- node --check：data.js・shared・scripts全348ファイル成功。git diff --check成功。
- 画像10件：390×844と1440×900を実表示確認。見出し・カードの可読性、アスペクト比、横スクロールなしを確認。文字入り背景は画像内の題字が残るがUI本文の可読性は維持。今回に起因する機能不具合なし。
- 新規動画0件につき、新規ギャラリークリック検証は該当なし。
- localhost由来console errorなし。既存表示不具合は今回検出なし。外部動画の内容不一致は表示崩れではなく上記レビュー事項。
- 派生ファイル競合：発生なし（push直前に最新originを再取得して確認する）。
- main反映・Pages・本番確認・commit hashは実行チャットの完了報告で確定結果を記載する。

## 対象名・一次情報URL・反映一覧

|枠|祭り名・slug|一次情報|反映|
|---|---|---|---|
|直前|秩父夜祭 (chichibu-yomatsuri)|https://navi.city.chichibu.lg.jp/p_festival/1030/|座標|
|通常|ふくしま山車祭り (fukushima-dashi-matsuri)|https://www.f-kankou.jp/event/41521|なし|
|通常|飯坂けんか祭り (iizaka-kenka-matsuri)|https://www.f-kankou.jp/event/38041|画像|
|通常|生子神社の泣き相撲 (ikiko-jinja-nakizumo)|https://www.city.kanuma.tochigi.jp/0299/info-0000001969-0.html|画像・指定情報|
|通常|いせさきまつり (isesaki-matsuri)|https://www.city.isesaki.lg.jp/soshiki/keizai/bunka/kankou/gyoji/1427.html|画像|
|通常|鎌倉まつり 流鏑馬 (kamakura-matsuri-yabusame)|https://www.trip-kamakura.com/subsite/detail.php?id=8|画像|
|通常|神田祭 (kanda-matsuri)|https://kandamatsuri.com/|なし|
|通常|鹿島神宮 祭頭祭 (kashima-jingu-saitousai)|https://kashimajingu.jp/news/%E7%A5%AD%E9%A0%AD%E7%A5%AD%E3%81%AE%E5%BE%A1%E6%A1%88%E5%86%85%E4%BB%A4%E5%92%8C6%E5%B9%B4/|画像|
|通常|川崎山王祭 (kawasaki-sannosai)|https://www.takemikatsuchi.net/schedulelist/sannousai/|画像|
|通常|松川提灯祭り (matsukawa-chochin-matsuri)|https://www.f-kankou.jp/event/38202|画像|
|通常|二本松の提灯祭り (nihonmatsu-chochin-matsuri)|https://www.city.nihonmatsu.lg.jp/kankou/matsuri/cyochin/page000417.html|なし|
|通常|小田原北條五代祭り (odawara-hojo-godai-matsuri)|https://www.odawara-kankou.com/topics/article/hojogodai.html|なし|
|通常|大磯の左義長 (oiso-sagicho)|https://www.town.oiso.kanagawa.jp/isotabi/meguru/pagedate/14419.html|なし|
|直前|おぢや牛の角突き (ojiyashi-ushi-no-tsunotsuki)|https://niigata-kankou.or.jp/event/15158|座標|
|通常|青梅大祭 (ome-taisai)|http://ometaisai.g2.xrea.com/|画像|
|通常|相模の大凧まつり (sagami-odako-matsuri)|https://www.city.sagamihara.kanagawa.jp/shisei/1026709/mayor/1009760/1035149/1035150.html|なし|
|通常|渋川へそ祭り (shibukawa-heso-matsuri)|https://www.city.shibukawa.lg.jp/kankou-site/kankou/000382/000385/p011548.html|画像|
|通常|新庄まつり (shinjo-matsuri)|https://shinjo-matsuri.jp/|なし|
|通常|信夫三山暁まいり (shinobu-sanzan-akatsuki-mairi)|https://www.city.fukushima.fukushima.jp/kankounavi/contents/enjoy/1/5940.html|画像|
|通常|八朔祭（山都町） (yamato-hassaku-matsuri)|https://kumamotoyamatotour.wixsite.com/mysite/hassakumatsuri2|なし|

