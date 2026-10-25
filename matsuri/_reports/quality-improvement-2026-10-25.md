# 毎日品質改善 2026-10-25

## 環境と対象選定

- git fetch origin後、origin/main `e39c8f06c5453bfe955aaa221b653c4089aa64a1` から新規専用worktree `/private/tmp/vigor-matsuri-4-20261025` を作成。HEAD一致・clean確認済み。
- 通常作業ツリーの未コミット差分・未pushコミットは変更していない。変更はmatsuri/のみ。
- 指示書・Backlog・Roadmap・CONCEPTを確認。素材ガイド・スキーマは前回読了版から変更なしとgit diffで確認。
- 対象349件。原則20件に対し、今回の調査対象は6件（開催直前3件、通常3件）。
- 通常選定の履歴に行頭「+」付き見出しがあったため、それも読んで直近確認を除外。履歴形式を修正するタスクには広げない。
- origin上の履歴のみでは21件が候補だったが、前回10/24実行の未反映worktreeに残る15件の実調査記録も重複除外に利用し、残る6件をすべて調査した。未反映の前回変更を今回の差分に混ぜてはいない。

|枠|祭り / slug|結果|
|---|---|---|
|開催直前|おぢや牛の角突き / ojiyashi-ushi-no-tsunotsuki|追加なし・候補保留／不採用|
|開催直前|徳守神社まつり（徳守大祭） / tokumori-jinja-taisai|追加なし・候補保留／不採用|
|開催直前|牛窓秋祭り / ushimado-aki-matsuri|背景画像1件追加|
|通常|備前焼まつり / bizen-yaki-matsuri|背景画像1件追加|
|通常|勝山祭（勝山喧嘩だんじり） / katsuyama-kenka-danjiri|背景画像1件追加|
|通常|津山納涼ごんごまつり / tsuyama-gongo-matsuri|追加なし・候補保留／不採用|

## 反映内容

- 反映3祭り、画像（backgroundImage）追加あり・3件：牛窓秋祭り/ushimado-aki-matsuri、備前焼まつり/bizen-yaki-matsuri、勝山祭（勝山喧嘩だんじり）/katsuyama-kenka-danjiri。
- 動画（atmosphereMedia）追加：なし（0件）。
- 位置情報追加：なし（0件）。
- note修正：0件。eventStatus例外修正：該当なし（0件）。
- 全画像は動画ページ上の投稿者・内容とhqdefault実画像を直接確認し、優先度1で採用。画像と動画の判定を混同しない。
- 反映後349件中：背景未設定255件、動画未設定260件、両方なし222件、座標未設定268件。
- 新規スキーマ・UI・見どころ文・SEO文言・年度日程・体験タグは変更しない。

## 見送り・確認保留

追加なし3祭り：小千谷、徳守、ごんご。個別researchに投稿者・視聴回数・尺・画像0〜3の確認結果を追記。

- 小千谷：県観光サイト埋込の2018年映像を直接確認。背景hqdefaultは牛が写らず、代替フレームは小さく画質を確定できない。動画の発信継続性・構成判定は未完で保留。
- 徳守：神社公式の2024年PRを直接確認。分割画像・文字帯とクレジット、小さな代替フレームのため背景見送り。代表動画の全体構成判定は未完で保留。
- ごんご：公式サイト埋込は2025年の15秒告知CM。大きな文字・広告グラフィック中心のため画像・動画とも不採用。
- 牛窓・備前焼・勝山は画像だけ採用。14分超の映像やニュースの代表動画適性までは確定できず、動画追加を保留した。素材が存在しない・すべて品質不適合と断定していない。

## 検証・再生成

- 全data.js/shared JSのnode --check：361ファイルPASS。
- git diff --check：PASS。
- FESTIVAL_SLUGS349件・重複0、slug/id/data.js/index.html整合PASS。
- check-data-integrity：hard0、heuristic1（神田祭 off_year_has_dates）。要確認候補として保持、変更なし。
- 変更3slugの静的詳細HTML、特徴・都道府県・地方・月ハブ、検索インデックスを再生成。
- 変更3ページのJSON-LDを実際にパースし、Event.imageとcanonicalを確認。
- 変更3ページの390×844・1440×900でヒーローを目視確認。文字重なり・画像引き伸ばし・横スクロールなし、console errorなし。
- 動画追加0件のためギャラリー操作の追加検証は該当なし。
- 既存表示不具合の追加発見：なし。
- 反映直前fetch時にorigin/mainの更新なし。派生ファイル競合：なし。
- main反映・Pages・本番200/data一致・IndexNowの実行結果とcommit hashは実行完了報告に記載。

## 一次情報・採用素材

- 牛窓：https://www.okayama-kanko.jp/setouchi/event/detail_15888.html ／ https://www.youtube.com/watch?v=d3zjAxEylwI
- 備前焼：https://www.city.bizen.okayama.jp/soshiki/105/39340.html ／ https://www.youtube.com/watch?v=D5eyKmGPRq0
- 勝山：https://www.okayama-kanko.jp/event/detail_12692.html ／ https://www.youtube.com/watch?v=sYSsK6oXOtc
- 徳守：https://www.tokumori.or.jp/akimatsuri2026.html
- 小千谷：https://niigata-kankou.or.jp/event/detail_15158.html
- ごんご：https://gongo.e-tsuyama.com/

## 前回の未反映作業（今回の反映件数に含めない）

10/24専用worktree `/private/tmp/vigor-matsuri-4-20261024` の変更は未commit・未pushのまま保全した。画像2・動画1・座標1の草案を今回の3件として数えていない。通常作業ツリーにも取り込んでいない。
前回調査15件（直近調査の重複除外に使用）：
- hanno-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- miya-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- ohara-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- onomichi-betcha-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- oomiwa-sake-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- saga-international-balloon-fiesta：2026-10-24調査済み（前回worktreeのresearch記録）
- saidaiji-aki-ochamori：2026-10-24調査済み（前回worktreeのresearch記録）
- tochigi-aki-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- ueno-tenjin-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- yagorodon-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- yokosuka-mikoshi-parade：2026-10-24調査済み（前回worktreeのresearch記録）
- kure-kameyama-jinja-aki-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- mihara-shinmei-ichi：2026-10-24調査済み（前回worktreeのresearch記録）
- miyoshi-kinsai-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）
- saijo-sake-matsuri：2026-10-24調査済み（前回worktreeのresearch記録）

前回の参考情報：三谷祭は2026年の海中渡御のみ取り止め、他行事は予定通り。既存見どころ文・年度noteとの整合は別担当へ引継ぎ（本タスクでは変更しない）。根拠 https://38fes.jp/ ／ https://38fes.jp/wp-content/themes/miyamatsuri/pdf/2026_kaichutogyo_chushi.pdf

## 次回改善候補

- 前回未反映の草案は、最新mainとの差分と当日の検証を再確認してから別途扱う。
- 小千谷・徳守の動画適性、牛窓の既存参照地点の一意性は保留理由を解消できる場合に再確認。
- 次回も新規追加分・直近確認履歴を含めて再選定。今回反映3件なので15件超のPMレビュー条件には該当しない。

