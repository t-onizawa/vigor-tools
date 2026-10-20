# 毎日品質改善 実行報告 2026-10-20

## 実行環境

- 開始時fetch成功。origin/main `57ab39b4f2ab18c44e4e890025e6dcf8403a25ed` から今回専用worktree `/private/tmp/vigor-matsuri-4-20261020` を新規作成。HEAD一致・cleanを確認した。
- 通常作業ツリーはmainがahead 1、_notes-draft/に既存の変更・未追跡ファイルあり。ローカルmainや既存差分は基点にせず、変更・commit・pushは行っていない。
- 最新のタスク指示書、AGENTS、CONCEPT、Backlog、Roadmap、schema-design、素材ガイドを確認。Phase 2の既存素材改善に限定し、UI・SEO文言・体験タグ・日程・見どころ文は変更しない。

## 件数・結果

- 調査20件。開催直前枠2件（中津川ふるさとじまん祭・菓子まつり、越後山古志「牛の角突き」大会）は反映0件。
- 通常選定18件（未調査の両方なし3件、背景のみ不足13件、動画のみ不足2件）。本タスク調査日の表記に「+###」がある記録も認識し、直近4週間以内の再調査を除外した。
- 格付け設定済みで見どころ未設定の優先枠：該当なし（0件）。
- 反映5祭り。画像あり（5件）、動画なし（0件）、位置情報なし（0件）、note修正0件、eventStatus例外修正0件。公的指定の記録1件（青柏祭、素材調査中に市公式で確認）。
- 画像対象：貴船まつり（manazuru-kibune-matsuri）、青柏祭の曳山行事（でか山）（seihakusai-dekayama）、ふるさと宮まつり（utsunomiya-miya-matsuri）、山形花笠まつり（yamagata-hanagasa-matsuri）、湯かけまつり（yugawara-yukake-matsuri）。
- 見送り15祭り。うち5件は画像を試験適用後、390×844で画像内題字とページH1が重なるため取り下げ。試験適用のデータ・詳細HTMLは元の状態へ戻し、ハブ等も再生成した。残りはロゴ・接写・低解像度、本編構成や投稿者継続性の確認未完了、直接候補未確保等。
- 母数331件。反映後：backgroundImage未設定240、atmosphereMedia未設定242、両方なし207、mapReference.lat/lng未設定267。今回は動画ありの祭りへ画像を補ったため「両方なし」は減っていない。
- 15件超のPMレビュー条件には該当しない。

## 調査対象・一次情報・採否

### 1. 中津川ふるさとじまん祭・菓子まつり（nakatsugawa-furusato-jiman-kashi-matsuri）

枠：開催直前／結果：見送り・保留

一次情報：https://www.kankou-gifu.jp/event/detail_1092.html

開催直前枠。岐阜県公式ページを直接確認。10/23〜25の東美濃ふれあいセンター、菓子・物産・芸能の催しを対象とし、夏のおいでん祭とは区別した。動画探索を行ったが、個別の祭り動画ページを直接確認できる候補を確保できず保留。画像の無断転用や推測での登録はしない。座標は既存設定済み。

### 2. 越後山古志「牛の角突き」大会（yamakoshi-ushi-no-tsunotsuki）

枠：開催直前／結果：見送り・保留

一次情報：https://niigata-kankou.or.jp/experience/1985

開催直前枠。新潟観光公式URLは取得エラーで本文再確認未完了。動画探索のうえ既知候補 https://www.youtube.com/watch?v=VZ01HnBwfSw を直接再確認。山古志闘牛会1220人、2:06:00、4763回。2020年8月15日の通し記録で動画追加はしない。今回新たな背景画像の直接確認までは至らず保留。Googleマップの一意な地点座標も確認しておらずnullを維持。

### 3. 大関ケ原祭（daisekigahara-sai）

枠：通常選定／結果：見送り・保留

一次情報：https://daisekigaharasai.pref.gifu.lg.jp/mainevent/

通常・本タスク未調査枠。2026年公式ページへ直接アクセスし範囲を照合。https://www.youtube.com/watch?v=5ILjoBISa60 を直接確認。岐阜県広報4400人、3:15、854回、2025年祭りの紹介番組。hqdefaultと0〜3を直接確認。デフォルトは題字が大きく、代替はレポーター・説明字幕が中心で低解像度。2026年のプログラムとの内容差と本編の解説割合を十分確認できず、画像・動画とも保留。既存座標を維持。

### 4. 関市刃物まつり（seki-hamono-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://seki-hamono.jp/

通常・本タスク未調査枠。主催公式へ直接アクセス。検索候補 zqMB_rX0w7A は実際の動画ページが非公開だったため不採用。別候補 https://www.youtube.com/watch?v=HxuD-qh1etc を直接確認し、関市観光協会_公式チャンネル761人、約35秒、404回、2024年10月12・13日の祭りと説明されることを確認。hqdefaultと0〜3を開いたがデフォルトはSEKIのロゴ、代替は低解像度の人・看板で背景に不向き。本編全体の内容品質を十分確認できておらず動画は保留。既存座標維持。

### 5. 秋の高山祭（八幡祭）（takayama-hachiman-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.hidatakayama.or.jp/akinotakayamamatsuri/

通常・本タスク未調査枠。観光協会の秋の高山祭公式案内に直接アクセス。https://www.youtube.com/watch?v=Q2-Iz9TiMkw を直接確認。飛騨・高山観光コンベンション協会7210人、3:21、6824回、2022/11/04公開。説明には屋台・祭行列・宵祭、実再生の冒頭には祭屋台を確認。撮影年は説明から確定しない。デフォルトは彫刻の接写で祭りの主役全体を背景として示しにくいため採用せず、動画も全体の構成割合の確認が未完了で保留。春の山王祭と混同しない。

### 6. 久喜提燈祭り「天王様」（kuki-chochin-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.kuki.lg.jp/miryoku/summer_fes/1002873.html

通常・背景のみ不足。市公式で昼夜の山車と駅西口集合を確認。既存動画 https://www.youtube.com/watch?v=pYawH48dVi0 を直接確認。久喜市公式動画チャンネル3670人、3:00、4691回。hqdefaultと0〜3を確認し、中央の山車が見えるデフォルトを試験適用したが390×844では左右の題字がページ見出しと近接・重なるため取り下げ。データは元のまま。新規動画検索では生中継候補が中心で、直接採用確認済みの別候補なし。

### 7. 間々田のじゃがまいた（mamada-jagamaita）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.oyama.tochigi.jp/cal.php?category=0&day=5&lc=0&mode=detail&month=5&year=2026

通常・背景のみ不足。市公式URLと神社の紹介ページを探索。既存動画 https://www.youtube.com/watch?v=GP39EIGBdUc を直接確認。北関東おまつりinfo7370人、35:32、4629回。hqdefaultと0〜3を比較し試験適用したが390×844で右上題字が見出しと重なるため背景追加を取り下げ。新規代表動画の採用確認は未完了。既存の長尺動画の採否を本タスクでは変更していない。

### 8. 貴船まつり（manazuru-kibune-matsuri）

枠：通常選定／結果：画像追加

一次情報：https://www.town.manazuru.kanagawa.jp/soshiki/sangyoukankou/kanko/2258.html

通常・背景のみ不足。一次情報URLへ直接アクセスし新規動画も探索。既存動画 https://www.youtube.com/watch?v=1-zR3BV_uCM を直接開いた。ANNnewsCH（確認済み）509万人、2:09、2898回。2026年7月25日の真鶴の祭りと直接確認。 優先度1。飾り付けた小早船と海上渡御の現地実写。左上の透かしはごく薄く、船の判別を妨げない。 390×844・1440×900でヒーローを確認し、画像題字とH1の重なりがないためbackgroundImageのみ追加。動画は既存登録済みであり重複追加しない。座標は今回Googleマップで直接確定しておらず追加しない。

### 9. 南房総白浜海女まつり（minamiboso-shirahama-ama-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.cm-boso.com/amamatsuri2026.html

通常・背景のみ不足。観光協会URLに直接アクセスし動画も探索。既存動画 https://www.youtube.com/watch?v=_-uYgkE7IhE を直接確認。南房総いいとこどり動画43人、2:29、419回。hqdefaultと0〜3を比較。題字を除くと夜泳の灯りは見えるが、390×844の実表示で題字がページ見出しに重なるため背景試験適用を取り下げ。追加なし。一次情報で7/20を含む案内も見つかるため、既存datesとの比較は関連企画を含むページ範囲の確認候補として報告し、日程は修正しない。

### 10. 水戸黄門まつり（mito-koumon-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://mitokoumon.com/koumon/honsai.html

通常・背景のみ不足。本祭公式へ直接アクセスし花火大会とは区別して動画探索。既存 https://www.youtube.com/watch?v=KsrAxgLMUjM を直接確認。Japan Trip Guide2990人、3:59、3212回。hqdefaultと0〜3を比較。夜の山車のデフォルトを試験適用したが390×844で元の題字が見出しと重なるため取り下げ。2026年の新規候補は告知や一部記録の検索結果のみで、直接採用確認には至らず保留。

### 11. 山あげ祭（nasukarasuyama-yamaage-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.nasukarasuyama.lg.jp/yamaage-matsuri/

通常・背景のみ不足。市公式へ直接アクセス。https://www.youtube.com/watch?v=M4SQBolG2KQ を直接確認。那須烏山市714人、3:10、3.5万回。hqdefaultは列車と市名、0も同じ画像、1〜3は人物寄りの120×90で、野外歌舞伎の舞台全体を背景で伝える構図を確定できず見送り。追加動画も直接採用確認に至らず、既存動画を維持。

### 12. 佐原の大祭 夏祭り（sawara-natsu-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/index.html

通常・背景のみ不足。香取市の一次情報と夏祭り動画探索。既存 https://www.youtube.com/watch?v=w5blXOurDeM を直接確認。おかえり 日本の祭り6760人、6:59、1.6万回、2022年夏祭りを説明。hqdefaultと0〜3を比較。デフォルトを試験適用したが390×844で左の大きな題字とH1が重なるため取り下げ。既存atmosphereMedia.publisherType=officialの妥当性は確認候補として残し、本タスクでは修正していない。

### 13. 青柏祭の曳山行事（でか山）（seihakusai-dekayama）

枠：通常選定／結果：画像追加

一次情報：https://www.city.nanao.lg.jp/koryu-s/event/event_syokai/seihakusai.html

通常・背景のみ不足。一次情報URLへ直接アクセスし新規動画も探索。既存動画 https://www.youtube.com/watch?v=INpjrYRy51U を直接開いた。【公式】ほっと石川旅ねっとYouTube チャンネル2920人、1:18、7286回。巨大な曳山の画像を直接確認。七尾市公式本文で国指定重要無形民俗文化財「青柏祭の曳山行事」と明記されることを今回の素材調査中に確認し、notableDesignationへ記録（専用の格付け調査はしていない）。 優先度3。巨大なでか山と町並みを判別できる実写。下部題字は上側の曳山本体を隠さない。0は同じ画像、1〜3は120×90のため背景に拡大すると画質が不足する。 390×844・1440×900でヒーローを確認し、画像題字とH1の重なりがないためbackgroundImageのみ追加。動画は既存登録済みであり重複追加しない。座標は今回Googleマップで直接確定しておらず追加しない。

### 14. 新宿エイサーまつり（shinjuku-eisa-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.shinjuku-eisa.com/?page=schedule

通常・背景のみ不足。主催公式の複数会場の祭りを確認し新規探索。既存 https://www.youtube.com/watch?v=Nit1c0I46NY を直接確認。新宿区公式チャンネル8200人、5:14、1686回、2015年7月25日のまつりと沖縄グルメフェスタの紹介。hqdefaultと0〜3は大きなロゴ、人物接写、字幕、低解像度のため背景採用を見送り。新規ライブ候補の本編確認は未完了で追加動画なし。

### 15. 湘南ひらつか七夕まつり（shonan-hiratsuka-tanabata-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://tanabata-hiratsuka.com/

通常・背景のみ不足。公式URLは取得エラーのため平塚市公式の終了・日程案内も探索。既存 https://www.youtube.com/watch?v=C2h2Cyqm0cY を直接確認。Uncle in Yokohama4830人、5:54、248回、2026年七夕飾り。hqdefaultと0〜3を確認。デフォルトは中央題字が飾りを覆い、代替は120×90で背景用途に画質不足。追加なし。

### 16. ふるさと宮まつり（utsunomiya-miya-matsuri）

枠：通常選定／結果：画像追加

一次情報：https://www.utsunomiya-cvb.org/event/detail_20002.html

通常・背景のみ不足。一次情報URLへ直接アクセスし新規動画も探索。既存動画 https://www.youtube.com/watch?v=kAlToe4SJaQ を直接開いた。下野新聞チャンネル1.61万人、1:01、9034回。宇都宮の第50回の神輿を直接確認。観光公式は40基を超えるみこしが大通りを練り歩く祭りと案内。 優先度3。提灯を付けた神輿と担ぎ手の夜の実写。下部ニュース字幕は神輿上部と提灯の判別を妨げない。0は同じ画像、1〜3は低解像度かつ字幕が多く背景用途に不向き。 390×844・1440×900でヒーローを確認し、画像題字とH1の重なりがないためbackgroundImageのみ追加。動画は既存登録済みであり重複追加しない。座標は今回Googleマップで直接確定しておらず追加しない。

### 17. 山形花笠まつり（yamagata-hanagasa-matsuri）

枠：通常選定／結果：画像追加

一次情報：https://www.hanagasa.jp/

通常・背景のみ不足。一次情報URLへ直接アクセスし新規動画も探索。既存動画 https://www.youtube.com/watch?v=MCrwX722jYc を直接開いた。山形花笠まつり1640人、1:43、7.2万回。花笠の踊り手の列を画像で直接確認。公式サイトの開催案内と対応する祭りであることを照合。 優先度3。花笠を手にした踊り手の列が明瞭な実写。右下題字は踊り手の上体と花笠を隠さない。0は同じ画像、1〜3は120×90の接写で背景用途には低画質。 390×844・1440×900でヒーローを確認し、画像題字とH1の重なりがないためbackgroundImageのみ追加。動画は既存登録済みであり重複追加しない。座標は今回Googleマップで直接確定しておらず追加しない。

### 18. 湯かけまつり（yugawara-yukake-matsuri）

枠：通常選定／結果：画像追加

一次情報：https://www.yugawara.or.jp/event/972/

通常・背景のみ不足。一次情報URLへ直接アクセスし新規動画も探索。既存動画 https://www.youtube.com/watch?v=SVOVCNYy9j0 を直接開いた。湯河原温泉観光152人、3:19、545回。説明文は湯河原湯かけまつり、制作は湯河原さいとうスタジオと記載。公式観光の神輿パレードのページに対応する現地画像と確認。 優先度3。神輿・担ぎ手・湯しぶきが判別できる実写。下部題字は画面上側の神輿を隠さない。0は同じ画像、1〜3は低解像度・説明文字・白飛びした湯しぶきで背景用途に不向き。 390×844・1440×900でヒーローを確認し、画像題字とH1の重なりがないためbackgroundImageのみ追加。動画は既存登録済みであり重複追加しない。座標は今回Googleマップで直接確定しておらず追加しない。

### 19. あびこカッパまつり（abiko-kappa-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.abikokappa.website/

通常・動画のみ不足。公式ページと動画探索を実施。既存背景の動画 https://www.youtube.com/watch?v=EtIe6SWw8ag を直接再確認。dutch1173、61人、2:46、1560回。2014年第7回のカッパダンス・イベント・河童大行進と説明されるが、今回本編の構成・現在の祭りとの相違・チャンネル継続性の確認を完了できておらず動画登録は保留。既存背景は変更しない。

### 20. 藤岡まつり（fujioka-matsuri）

枠：通常選定／結果：見送り・保留

一次情報：https://www.city.fujioka.gunma.jp/soshiki/kikakubu/hisho/1/reiwa8/11161.html

通常・動画のみ不足。市公式の記者会見および祭り案内を探索。既存背景の動画 https://www.youtube.com/watch?v=4JsAXD-tpnk を直接確認。Ohayashi Listener199人、15:14、2914回。2025年8月31日撮影、山車・お囃子の記録。本編の全体性を確定できていないため新規代表動画に登録しない。背景は維持。

## 検証・再生成

- 詳細静的コンテンツ再生成対象：manazuru-kibune-matsuri、seihakusai-dekayama、utsunomiya-miya-matsuri、yamagata-hanagasa-matsuri、yugawara-yukake-matsuri。不採用へ戻した5件も再生成して試験適用を除去。
- 特徴・都道府県・地方・月のハブ4種類および検索インデックスの全生成器を実行。既存動画のサムネイルが従来からハブの代替画像として使われていたため、最終的なハブ・検索インデックス差分はなし。
- 全JSのnode --check、git diff --check、全331件のid/slug/登録一覧の対応・重複、既存静的JSON-LDのパース、変更5ページのimage一致を確認。
- 最終採用5件の詳細ヒーローを390×844・1440×900で目視確認。横スクロールなし。ローカルページ由来console errorなし。動画追加0件のため新規ギャラリー展開テストは対象外。
- 表示確認で見つけた既存不具合：今回の確認範囲ではなし。今回の素材で生じる題字重複は採用取り下げで解消し、UI自体は変更していない。
- auto-end-festivals.js --regenerate：SUMMARY as_of=2026-10-20 ended=0 errors=0。
- check-data-integrity.js：331件、hard issue 0件。参考情報は既存の神田祭 off_year_has_dates（2026-05-15）のみ。未修正。
- その他参考候補：南房総白浜海女まつりの7/20の扱い（関連企画を含む範囲の確認）、佐原夏祭りの既存動画publisherType。推測で修正していない。
- 反映直前fetch・競合、commit hash、main push、Pages、本番200・data.js確認、IndexNowの出力は完了時のチャットに記載する。

## 次回改善候補

開催直前枠は7日除外を再計算。通常枠は残る背景のみ不足・動画のみ不足の祭りへ回す。秋の高山祭の短編、あびこカッパまつりの既存背景動画は、本編構成・現在との相違・投稿者継続性等を確認完了できた場合に動画採用を再検討する。今回の保留を「素材が存在しない」とは扱わない。
