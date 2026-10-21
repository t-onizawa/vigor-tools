# 毎日品質改善 実行報告 2026-10-21

## 実行環境・件数

- git fetch origin成功。origin/main `bb0eb3f0a43c99b7630c2167c0864e0bf6a92d36` から専用worktree `/private/tmp/vigor-matsuri-4-20261021` を作成しHEAD一致・clean確認。通常作業ツリーの未追跡3ファイルには触れていない。
- 最新タスク、AGENTS、CONCEPT、Backlog、Roadmap、schema-design、素材ガイドに従いPhase 2の既存品質改善のみ実行。
- 調査16件（開催直前3、通常13）。除外期間適用後の対象候補が16件で枯渇したため20件未満。通常の両方なし候補0件、片方不足13件。候補数を満たすための除外期間短縮はしない。
- 公開データ反映2祭り：TAGAWAの座標1件、大田原の市指定無形民俗文化財記録1件。
- 画像追加：なし（0件）。動画追加：なし（0件）。note修正：0件。eventStatus例外：該当なし（0件）、auto-end-festivals --regenerate成功。
- 位置情報追加：あり（1件）、TAGAWAコールマイン・フェスティバル～炭坑節まつり～（tagawa-coalmine-festival）、33.6404722 / 130.8147968。県観光公式の会場住所とGoogle Mapsの公園本体を照合、地点URLの!3d/!4dを使用。
- 反映後母数331：backgroundImage未設定240、atmosphereMedia未設定242、両方なし207、座標未設定266。
- 祭り単位見送り14件（反映2件を除く）。画像・動画は16件とも追加なし：未確認候補、単一場面、長尺記録、撮影年代と表示年度の不一致等。個人投稿という理由だけでは除外していない。
- 15件超のPMレビュー条件には非該当。

## 対象・一次情報・結果

### 1. 富士宮まつり（fujinomiya-matsuri）

枠：開催直前／結果：見送り・保留

一次情報：https://www.city.fujinomiya.lg.jp/1025200000/event/p000045.html

富士宮市の2026年11月3〜5日案内と祭り公式 https://akimiya.com/r6seri を直接確認。公式の競り合い写真群は確認したが、既存backgroundImage形式に適合する動画サムネイルを直接検証できず画像・動画は保留。検索に出た富士市の「富士まつり」は別祭りのため除外。mapReferenceは浅間大社「周辺」であり神社一点の座標で代用しない。

### 2. 松浦水軍まつり（matsuura-suigun-matsuri）

枠：開催直前／結果：見送り・保留

一次情報：https://www.nagasaki-tabinet.com/event/60838

長崎県観光連盟で2026年10月24・25日、市役所周辺を確認。https://www.youtube.com/watch?v=8pHHfTSWfuE を直接開き6:04、2025年松浦党武者行列、登録者3860人を確認。武者行列の一場面を全体代表へ転用せず動画保留。既存背景・座標は維持。

### 3. TAGAWAコールマイン・フェスティバル～炭坑節まつり～（tagawa-coalmine-festival）

枠：開催直前／結果：座標追加

一次情報：https://www.crossroadfukuoka.jp/event/11555

県観光連盟で2026年10月31日・11月1日、田川市伊田2734-1の石炭記念公園ほかと確認。公式 https://tagawa-coalmine.com/photogallery/ は写真ギャラリーで、適合する新規動画サムネイルは未確認。画像・動画保留。Google Mapsで石炭記念公園本体・同住所・田川市公式へのリンクが一致し、地点URLの!3d33.6404722!4d130.8147968を直接確認。lat/lngのみ追加（地図中心の@値や博物館ではない）。

### 4. 春日部夏まつり（kasukabe-natsumatsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://visit-kasukabe.jp/events.html

観光協会案内で駅東口の祭り範囲を照合。https://www.youtube.com/watch?v=vMR9ug0PE_4 を直接確認。第42回1日目ダイジェスト1:50、登録者12人、説明にコマ送りと明記。本編の内容品質・継続発信者確認が未完了で動画保留。既存画像維持。駅と東口の地点を同一視せず座標保留。

### 5. 勝浦大漁まつり（katsuura-tairyo-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.katsuura.lg.jp/site/city-promotion/3881.html

https://www.youtube.com/watch?v=Kznyp0TV0dU を直接確認。2025年9月13日川津区、14:16、登録者450人、川津区参加と説明。長尺の地区別記録で代表追加見送り。市の参照URLはイベント一覧で2026年の個別日程根拠には使わない。背景維持、地図地点座標は未確定。

### 6. 岸和田だんじり祭（9月祭礼）（kishiwada-danjiri-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.kishiwada.lg.jp/site/danjiri/

市公式 https://www.city.kishiwada.lg.jp/site/danjiri/202409danjiri.html の春木・駅前・宮入り別動画を確認。既存背景元 https://www.youtube.com/watch?v=sI9JLjCcYCM は令和6年度春木地区3:54、登録者2780人。9月祭礼全体を代表する構成確認が不十分なため動画保留。既存画像維持。駅地点座標未確認。

### 7. 中之条町 鳥追い祭り（nakanojo-torioi-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.town.nakanojo.gunma.jp/soshiki/9/1285.html

町公式の鳥追い太鼓・みかん投げの範囲を確認。https://www.youtube.com/watch?v=q_o_Ggar77o を直接確認。まつりと 日本のまつり探検プロジェクト、13:31、登録者7370人。全体構成の解説割合を今回確定しておらず動画保留（長さだけを不採用理由にしない）。既存画像維持、中心商店街に神社一点を代用しない。

### 8. 二宮神社例大祭（しょうが祭り）（ninomiya-shrine-shogamatsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.akirunokanko.com/?p=2123

観光協会参照記事は2019年の案内で2026年日程更新の根拠にしない。https://www.youtube.com/watch?v=wCcPkaSs4aE を直接確認。2024.09.09二宮神社秋季例大祭、1:18:49、登録者1890人。長尺記録のため動画見送り。地図では二宮2252の神社名・住所を確認できたが、地点!3d/!4dは未確認で座標登録せず。

### 9. 大洗八朔祭（oarai-hassaku-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.oarai-info.jp/season/postid_2678/

観光協会の祭礼紹介を直接確認。https://www.youtube.com/watch?v=fNn0bxLYS0s を直接確認。大洗八朔祭2019年、6:45、登録者1720人。本編構成・発信者継続性の検証未完了につき動画保留。既存画像維持、曲がり松商店街の範囲を一点に推測しない。

### 10. 大原はだか祭り（ohara-hadaka-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.isumi.lg.jp/soshikikarasagasu/suisanshokoka/kankopromotionhan/2/2/786.html

市公式で汐ふみ・大別れ式等の複数の行事からなる祭りと確認。https://www.youtube.com/watch?v=ZqexWGNN1HU を直接確認。2024年汐ふみ渡御8:49、登録者6510人。汐ふみ一場面のため全体代表は見送り。既存画像維持。地図では大原1595の鹿島神社名・住所を確認したが地点!3d/!4d未確認で座標登録せず。

### 11. 大田原屋台まつり（ohtawara-yatai-matsuri）

枠：通常選定／結果：公的指定記録

一次情報：https://www.city.ohtawara.tochigi.jp/docs/2018112200063/

市文化財ページを直接確認し、市指定無形民俗文化財、2018年10月25日指定、保存団体が屋台まつり実行委員会と確認したためnotableDesignationへ正確に記録。https://www.youtube.com/watch?v=GYntbicSnmo は2026年屋台まつり①29:19、登録者3980人。既存背景維持、長尺記録を代表動画へ追加しない。金燈籠交差点の地点座標未確定。

### 12. 佐倉の秋祭り（sakura-aki-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.sakura.lg.jp/soshiki/sakuranomiryoku/event_kanko/16470.html

市公式で山車・御神酒所・神輿、2026年10月9〜11日を確認。https://www.youtube.com/watch?v=WhNX6yJwvpw を直接再生し、佐倉市公式チャンネル9290人、4:03、2020/08/13公開、説明の2014〜2018年開催映像を確認。冒頭の昼の山車、中盤の夜の山車・囃子、終盤の行列を視認。試験適用したが、現行表示は公開年2020を「過去開催時の様子（2020年）」と表示し、撮影年代と一致しないため採用を取り下げた。data.jsは試験前の状態に復元。別の公式候補 https://www.youtube.com/watch?v=yqkfWfP2Rrw は2022年復活の紹介番組10:17で、本編の解説割合未確認につき保留。既存背景維持。神社と本殿が検索結果に分かれる地図は選択・地点照合未完了で座標保留。

### 13. 下館祇園まつり（shimodate-gion）

枠：通常選定／結果：見送り・保留

一次情報：https://www.chikuseikanko.jp/sightseeing/events-festivals/page000011.html

観光協会ページはロボット確認表示のため本文取得不能。市公式 https://www.city.chikusei.lg.jp/chikusei_channel.php?code=52&mode=detail の祭り・宮出し紹介を確認。https://www.youtube.com/watch?v=BmhVeZsy6u8 は2025年駅前どっこい6:02、登録者4530人。駅前一場面のため代表動画は見送り、既存背景維持。羽黒神社地点座標未確認。

### 14. 館林まつり（tatebayashi-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.tatebayashi.gunma.jp/s059/kanko/020/20210506113415.html

既存source URLは現在「第27回館林手筒花火大会」記事を表示し、館林まつり本体と異なる内容（整合性専管領域につき変更しない）。https://www.youtube.com/watch?v=wZ4GbVM6-Bo を直接確認。第55回館林まつり2026年7月18日、40:51、登録者461人、パレード・神輿の長尺記録。動画見送り、既存背景維持。本町通りの範囲の座標は推測しない。

### 15. 土浦八坂神社祇園祭（tsuchiura-gion）

枠：通常選定／結果：見送り・保留

一次情報：https://www.tuchiura-yasakajinja.com/

八坂神社公式を直接確認。https://www.youtube.com/watch?v=w_1yPzL-HfI は2026年度中日本祇園1:18:39、登録者1130人。長尺記録で入口動画に不向きのため見送り。既存背景維持、真鍋の八坂神社地点座標未確認。

### 16. 八日市場の祇園祭（yokaichiba-gion）

枠：通常選定／結果：見送り・保留

一次情報：https://maruchiba.jp/event/detail_12967.html

千葉県観光公式参照ページに直接アクセス。https://www.youtube.com/watch?v=3TJFWL6L-Ts を直接確認。2026年8月5日LIVE、6:25:17、登録者1.25万人。通しライブのため代表動画は見送り。既存背景維持、八重垣神社地点座標未確認。

## 検証・反映

- 全JS372ファイルのnode --check成功。331件のid/slug/data.js/index.html、FESTIVAL_SLUGS重複・登録、JSON-LDパース確認成功。git diff --check成功。
- 静的再生成：tagawa-coalmine-festival、ohtawara-yatai-matsuri。特徴・都道府県・地方・月の全ハブと検索インデックスを再生成。最終的な公開HTML差分はTAGAWAのEvent JSON-LDのgeo追加のみ（他は同一結果）。
- 390×844・1440×900で上記2ページのtitle/H1/canonical、スクリーンショット、横スクロールなし、console errorなしを確認。
- 動画試験適用の佐倉は公開年2020が開催年として表示され撮影年2014〜2018と不一致。試験変更を取り下げ、UI変更はしていない。既存表示設計の参考事項として報告。
- 整合性専管領域の参考：kanda-matsuri off_year_has_dates（2026-05-15）のheuristic1件、hard0件。館林まつりの参照市URLは現在「第27回館林手筒花火大会」を表示。いずれも本タスクでは修正していない。
- 反映直前fetch・分岐確認、Pages・本番200・data.js照合、IndexNowはコミット後に実施し、結果はチャット完了報告へ記載する。
- 派生ファイル競合：現時点なし。競合が発生した場合は許可された派生ファイルのみ自動解消対象。
- 次回：開催直前枠の未確認候補、除外期間明けの両方なし祭りを優先。佐倉の撮影年代と公開年の表示区別は人間レビュー候補。館林のsource URLは整合性チェック担当へ参考情報。
