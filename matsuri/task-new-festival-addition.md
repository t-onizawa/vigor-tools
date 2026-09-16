# VIGOR MATSURI — 平日新規祭り追加・自動公開タスク

Codex Scheduled Task用の実行指示書。Codex側のプロンプトは本ファイルを
読み込んで指示通りに実行する形にする。基準・運用ルールの変更は本ファイル
のみを更新し、Codex側のプロンプト自体は書き換えない。

---

## 実行環境の強制確認

実行開始時に必ず `git fetch origin` を行い、`git rev-parse --show-toplevel`、
`git rev-parse --git-dir`、`git status --short --branch` を確認する。

通常作業ツリー、またはローカルmainの未push・未commit状態を参照している
場合は、そこで作業・commit・pushしてはならない。origin/mainを直接基点
として、その実行専用の新しいGit worktreeを作成し、以降の全作業を専用
worktree内の matsuri/ だけで行う。ローカルmainをworktree作成元に
使わない。

専用worktree作成後、HEADが作成時点のorigin/mainと一致し、作業ツリーが
cleanであることを確認する。確認できなければ変更せず停止して報告する。

反映直前にも `git fetch origin` を行い、作業開始時からorigin/mainが
更新されていた場合は最新origin/mainを安全に取り込んで全検証を再実行
する。コンフリクトまたは検証失敗時はpushしない。

## Git・公開権限

このScheduled Taskの各定期実行について、品質基準と全検証を満たした
変更をorigin/mainへ直接pushし、本番公開することをFounderが明示的に
許可する。

過去に指定した以下の運用は、このScheduled Taskに限り撤回する。

- mainへ直接pushしない
- PR経由で公開する
- push前にFounderの個別承認を待つ

このタスクではPRを作成しない。各実行時の追加承認は不要とし、通常
フローの一部として自動pushする。

ただし、次の安全条件をすべて満たす場合に限る。

1. 独立した専用Git worktreeを使用している
2. 変更が許可範囲内に限定されている
3. 指定された静的・ブラウザ検証がすべて成功している
4. `git fetch origin` 後、最新の `origin/main` を取り込んでいる
5. 競合が発生していない
6. pushがfast-forwardとして成立する
7. force pushを使用しない

条件を満たした場合：

commit
→ `git fetch origin`
→ 最新`origin/main`との分岐確認
→ 必要なら専用ブランチへ最新mainを取り込み
→ 再検証
→ `git push origin HEAD:main`
→ GitHub Pages build/deploy確認
→ 本番確認

競合、non-fast-forward、検証失敗がある場合はpushせず停止して報告する。

VIGOR MATSURIの平日新規祭り追加・自動公開を実行する。

対象は現在のVIGOR MATSURI。変更範囲は matsuri/ のみ。

毎回独立専用Git worktreeを使い、元の作業ツリーや未コミット差分には
触れない。

---

## 全国展開方針

VIGOR MATSURIは地方単位で順番に全国展開する。

地方の進行順は以下で固定する。

1. 関東
2. 東北
3. 中部
4. 近畿
5. 中国
6. 四国
7. 九州・沖縄
8. 北海道

関東は2026-08-14時点で掲載対象完了と判定済み。東北・中部・近畿・中国・
四国・九州沖縄・北海道も順次初期カバレッジ完了と判定され、2026-09-11
時点で「全国の初期掲載フェーズ完了」に到達済み（詳細はBacklog.mdの
実行ログを参照）。

現在は特定の対象エリアに絞らず、下記「全国完了時」のフローに従い、
全国から取りこぼし候補・新たに公開された候補・過去の保留候補を再確認
するフェーズとする。

## 地方・都道府県・areaTag

### 関東（完了済み）
- 茨城県：ibaraki
- 栃木県：tochigi
- 群馬県：gunma
- 埼玉県：saitama
- 千葉県：chiba
- 東京都：tokyo
- 神奈川県：kanagawa

### 東北
- 青森県：aomori
- 岩手県：iwate
- 宮城県：miyagi
- 秋田県：akita
- 山形県：yamagata
- 福島県：fukushima

### 中部
- 新潟県：niigata
- 富山県：toyama
- 石川県：ishikawa
- 福井県：fukui
- 山梨県：yamanashi
- 長野県：nagano
- 岐阜県：gifu
- 静岡県：shizuoka
- 愛知県：aichi

### 近畿
- 三重県：mie
- 滋賀県：shiga
- 京都府：kyoto
- 大阪府：osaka
- 兵庫県：hyogo
- 奈良県：nara
- 和歌山県：wakayama

### 中国
- 鳥取県：tottori
- 島根県：shimane
- 岡山県：okayama
- 広島県：hiroshima
- 山口県：yamaguchi

### 四国
- 徳島県：tokushima
- 香川県：kagawa
- 愛媛県：ehime
- 高知県：kochi

### 九州・沖縄
- 福岡県：fukuoka
- 佐賀県：saga
- 長崎県：nagasaki
- 熊本県：kumamoto
- 大分県：oita
- 宮崎県：miyazaki
- 鹿児島県：kagoshima
- 沖縄県：okinawa

### 北海道
- 北海道：hokkaido

areaTagは上記ローマ字表記で統一する。

## 新規祭り追加

現在の対象エリア内から、品質基準をすべて満たす祭りを最大5件追加する。

5件は上限でありノルマではない。

品質基準を満たす候補が2件なら2件、1件なら1件、0件なら変更なしで
正常終了する。

件数を合わせるために品質基準を緩めてはならない。

現在の対象エリア内では、各都道府県の掲載密度が極端に偏らないよう
配慮する。特に、下記「初期カバレッジ目標」（都道府県あたり3件）に
届いていない県を優先する。

ただし、品質基準を満たす代表的・著名な祭りは優先してよい。

## 通常フロー

専用worktreeで

調査
→ 実装
→ 静的・ブラウザ検証
→ commit
→ mainへ反映
→ origin/mainへpush
→ GitHub Pages build/deploy確認
→ 本番HTTP 200・表示確認
→ 完了報告

通常時はPRを作成しない。

## 採用条件（すべて必須）

- 現在の対象エリア内
- 既存祭りと非重複
- 正式名称・通称の関係を確認できる
- 開催主体が明確
- 1ページで扱う範囲が明確
- 自治体・神社・寺院・観光協会・保存会等の一次情報がある
- 開催時期または恒常開催パターンを確認できる
- 2026年日程未確認なら推測でconfirmedにしない
- 既存スキーマで正確に表現できる
- highlightCommentを一次情報から作成できる
- featuresを無理に付与しない
- 既存祭りとの差異を説明できる

backgroundImage・atmosphereMediaは、新規祭りの調査中に品質基準を満たす
素材が自然に見つかった場合のみ採用する。採用基準は`atmosphere-media-guide.md`
の既存基準（7節＝backgroundImage、1〜6節＝atmosphereMedia）にそのまま従う
（画像の選び方の優先順位・thumbnailVariantの使い方を含む）。画像・動画
探索自体を目的に時間を使わない。素材補完は週次品質改善タスクの責務と
する。

mapReference.lat/lngの記録基準は`atmosphere-media-guide.md` 8節に従う。
mapUrl作成の際に確認できた座標をそのまま記録する（追加の探索時間は
発生しない）。

## 新しい地方・都道府県を初めて追加する場合

index.htmlの都道府県フィルターに対象地方の

```
<optgroup label="地方名">
```

が存在しない場合は新設する。

その地方に属する都道府県のうち、実際に初掲載となる県の`<option>`を
追加する。

同一地方のoptgroupは1つだけとし、重複作成しない。

data.js側のスキーマ変更は行わない。

## FESTIVAL_SLUGSの登録先（重要）

新規祭りのslugは、`matsuri/shared/festival-slugs.js`内のFESTIVAL_SLUGS
配列に追加する（festival-list.js側にはこの配列は存在しない。誤って
こちらへ追加・新設しないこと）。

## ページ作成時の必須要素

新規祭りのindex.html作成時、以下を含める。

- `<title>`・meta description・og:title/description・twitter:title/
  descriptionを一貫させ、以下を含む：開催地（都道府県・市区町村）、
  2026年の具体的な開催日程、featuresで確認できている特徴、駐車場の
  有無、最寄り駅・アクセス拠点
- 日程表現はeventStatusに応じて出し分ける：
  confirmed→「{日付}開催」、scheduled_pending_official/unconfirmed→
  「{日付}開催予定（公式詳細発表待ち）」
- og:site_nameは"MATSURI"に統一する
- 調査中にbackgroundImageが見つかった場合、og:image・twitter:imageを
  `https://i.ytimg.com/vi/{contentId}/hqdefault.jpg` に設定する。
  見つからない場合は汎用画像
  （`https://vigorlab.net/matsuri/shared/brand/og-image.png?v=1`。末尾の
  `?v=1`はキャッシュバスティング用のバージョン番号で、画像ファイル
  自体を更新した場合のみ数字を上げる。既存ページのコピー時はそのまま
  維持する）のままにする
- 「関連する祭り」セクション用の静的プレースホルダーを追加する：
  ```html
  <section class="info-section" id="related-festivals-section"
    aria-labelledby="related-festivals-heading" hidden>
    <h2 id="related-festivals-heading">関連する祭り</h2>
    <div class="feature-grid" id="related-festivals-list"></div>
  </section>
  ```
  （出典セクションの直前に配置。中身の描画は既存の
  `shared/festival-detail.js`が自動で行うため、空のプレースホルダー
  でよい）
- 「当日の目安スケジュール」セクション用の静的プレースホルダーを
  追加する：
  ```html
  <section class="info-section" id="schedule-section"
    aria-labelledby="schedule-heading" hidden>
    <h2 id="schedule-heading">当日の目安スケジュール</h2>
    <div id="schedule-list-container"></div>
  </section>
  ```
  （primary-infoセクションの直後、atmosphere-media-sectionの直前に
  配置。中身の描画は既存の`shared/festival-detail.js`が自動で行うため、
  空のプレースホルダーでよい）
- 調査中に一次情報（自治体・祭り公式実行委員会等）で開催当日の具体的な
  時刻スケジュール（例：9:00 神事開始、15:00 山車巡行 等）が確認できた
  場合のみ、`yearlyInfo[年].schedule`に追加してよい（構造・記法は
  `schema-design.md`を参照）。この情報の探索自体を目的に時間を使わない
  （backgroundImage・atmosphereMediaと同じ運用方針）
- 「よくある質問」セクション用の静的プレースホルダーを追加する：
  ```html
  <section class="info-section" id="faq-section"
    aria-labelledby="faq-heading">
    <h2 id="faq-heading">よくある質問</h2>
    <div id="faq-list"></div>
  </section>
  ```
  （related-festivals-sectionの直後、出典・確認日セクションの直前に
  配置。hidden属性は付けない（開催日・駐車場・最寄り駅から必ず1件以上
  生成されるため）。中身の描画は既存の`shared/festival-detail.js`が
  data.jsの既存フィールドから自動生成するため、空のプレースホルダーで
  よい。FAQ用に新しい調査・執筆をする必要はない）
- `<script>`タグの読み込み順を
  `shared/festival-slugs.js` → `./data.js` → `shared/festival-detail.js`
  にする（既存ページと同じ順序）

## 停止条件

以下に該当する候補は採用しない。

- 新スキーマが必要
- 新eventStatusが必要
- 同一性が曖昧
- ページ範囲が曖昧
- 複数イベント混在の恐れ
- 公式情報同士の矛盾
- 2026年日程を推測する必要がある
- features判断に確信がない
- highlightCommentの一次根拠が弱い
- matsuri外の変更が必要
- 既存データへ大きな影響がある

該当候補は見送り、他の確実な候補だけで継続してよい。

静的・ブラウザ検証失敗時はcommit・main反映・push禁止。

build・deploy・本番確認失敗時はそれ以上の公開操作を停止し、失敗内容と
Git状態・公開状態を報告する。

## 地方完了判定

現在の対象エリア内で品質基準を満たす新規候補が1回見つからなかっただけ
では、地方完了とは判定しない。

新規採用0件が3回連続した場合、その地方は掲載対象完了と判定する。

1件以上採用できた場合、連続0件カウントは0へ戻す。

【初期カバレッジ判定】上記の候補枯渇に加え、現在の対象エリア内の
全都道府県にそれぞれ3件以上掲載された時点でも、その地方は「初期
カバレッジ完了」と判定し、次の地方へ進む。これは深さ（候補を尽くす
こと）ではなく広さ（全国に早く行き渡らせること）を優先する判断で
あり、地方単位の深掘りは全国の初期掲載フェーズ完了後にまとめて行う
（下記「全国完了時」を参照）。

候補枯渇・初期カバレッジ、いずれかの条件を満たした時点でその地方を
完了済みとしてBacklog.mdへ記録する。

タスクは停止しない。

次回実行から、上記の全国展開順に従って次の未完了地方へ自動的に対象
エリアを切り替える。

例：

東北完了 → 次回から中部
中部完了 → 次回から近畿
近畿完了 → 次回から中国

以後同様。

## 全国完了時

北海道まで完了した場合は、「全国の初期掲載フェーズ完了」とBacklog.md
へ記録する。

その後もタスク自体は停止しない。

全国完了後の実行では、以下を優先順位順に確認する。

1. 各地方で取りこぼした品質基準適合候補
2. 新たに公式情報が公開された候補
3. 過去に保留した候補
4. 上記1〜3だけでは候補が確保できない場合、都道府県単位で新規候補を
   積極的に探索する（2026-09-16改訂：保留候補の再確認だけに頼ると
   ストックが枯渇し掲載ペースが早期に頭打ちになるため追加）。

   探索元の例（いずれも一次情報の手がかりとして使うのみで、それ自体を
   出典として引用しない。最終的な採用可否は必ず一次情報を直接確認して
   判断する）：
   - 都道府県・市区町村の観光協会公式サイトのイベントカレンダー
   - Wikipedia「日本の祭り一覧」・都道府県別祭りカテゴリ
   - 神社庁・寺院・保存会等の公式サイト
   - 地域ポータルサイトの観光イベント情報

   探索対象は、初期カバレッジ目標（都道府県あたり3件）に対して掲載
   密度が低い都道府県を優先する。特定の都道府県を毎回同じ順序で
   ローテーションし、探索範囲が偏らないようにする。

品質基準・採用条件・停止条件は初期展開時と完全に同一のまま緩めない。
候補数を確保するための基準緩和・推測での採用は行わない。一次情報で
確認できない候補は見送る。

品質基準を満たす候補がなければ変更なしで正常終了する。

## 変更可能

- `matsuri/festivals/<slug>/data.js`
- `matsuri/festivals/<slug>/index.html`
- `matsuri/research/<slug>.md`
- `matsuri/shared/festival-slugs.js`
- `matsuri/index.html`
- `matsuri/Backlog.md`

## 変更禁止

- 新スキーマ
- 一覧UIの再設計
- 詳細UIの再設計
- GA4
- analytics.js
- title/meta方針
- root配下
- matsuri外
- 自動化設定

sitemap.xmlのみ例外的に変更可能。今回の実行で自分が新規作成したページ
分だけ、既存の`<url>`エントリと同じテンプレートで`</urlset>`直前に
追記してよい（root CLAUDE.md「sitemap.xml追記の例外（2026-08-07
追記）」に基づく）。並び替え・削除・既存エントリの書式変更・複数回分
をまとめた一括登録は対象外とし、行わない。追加したURLは完了報告に
記載する。

新規ページを1件以上作成した場合、sitemap.xmlへの追記を必ず実行する。

実行しなかった場合は、その判断理由を完了報告に具体的に記載する
（例：「担当範囲外と誤認した」「安全確認でブロックされた」「該当
手順の実行を失念した」等）。実行しようとしてエラーが発生した場合は、
エラーメッセージをそのまま完了報告に記載する。理由の記載なしに
sitemap.xmlへの追記を省略してはならない。

## 検証

- `node --check`
- `git diff --check`
- `node matsuri/scripts/check-data-integrity.js` を実行し、hard issue
  が0件であることを確認する（1件でもあれば、その内容を完了報告に
  記載し、commit・push前に対処するか判断を仰ぐ）
- slug/id/data.js/index.html/canonical一致
- FESTIVAL_SLUGS重複なし
- 新規祭りのslugがshared/festival-slugs.jsに追加されていること
- 新規祭りのindex.htmlがshared/festival-slugs.jsを読み込んでいること
- 一覧件数
- 都道府県フィルター
- 開催前フィルター
- 開催中・まもなく開催
- title/H1/canonical
- JSON-LD
- 390×844
- 1440×900
- 横スクロールなし
- console errorなし
- GitHub Pages build成功
- 本番新規URL HTTP 200

## Git

変更がある場合のみ

commit → mainへ反映 → origin/mainへpush

PRは作成しない。

変更が0件の場合はcommit・pushを行わない。

## 完了報告

- 現在の対象エリア
- 追加件数
- 追加した祭り
- 候補の発見経路（取りこぼし再確認／新規公式情報／過去の保留候補／
  全国完了時の新規探索。新規探索の場合は使った探索元も明記する）
- 見送り候補と理由
- 一次情報URL
- eventStatus判断
- features判断
- commit hash
- 本番反映結果
- sitemap追加URL（新規ページを作成したにもかかわらず追記しなかった
  場合は、その理由を必ず明記する）
- 連続0件回数
- 地方完了判定の有無
- 次回対象エリア
- 対象エリア内・都道府県別の掲載件数（初期カバレッジ目標3件との対比）
- 保留事項
- matsuriスコープclean

## SNS（X）投稿下書き（2026-09-16追加）

**今回の実行で1件も追加できなかった場合は、この節自体を出力しない。**
無理に文面を作らない。

1件以上追加できた場合のみ、完了報告の一番最後に、以下の形式でX投稿
用の下書きをそのまま追記する（Founderがコピペしてそのまま手動投稿
する運用のため、完成した投稿文としてそのまま使える状態で出力する
こと）。

```
【お祭り追加】
新しいお祭りを{追加件数}件追加しました。

{1件目の祭り名}（{1件目の都道府県。「県」「都」「府」は省略可}）
https://vigorlab.net/matsuri/festivals/{1件目のslug}/?utm_source=x&utm_medium=social&utm_campaign=new_festival&utm_content={実行日、YYYY-MM-DD形式}
{2件目の祭り名}（{2件目の都道府県}）
{3件目の祭り名}（{3件目の都道府県}）
（3件を超える場合も同様に列挙する）

#祭り #山車 #神輿
```

ルール：

- リンクを付けるのは**追加順で1件目の祭りのみ**。2件目以降は祭り名
  ＋都道府県のみを列挙し、リンクは付けない（Xの仕様上プレビュー
  カードは1つしか表示されず、複数貼ると文字数を圧迫するだけのため）
- 追加が1件のみの場合は、その1件だけを上記フォーマットで出力する
  （「1件追加しました」＋リンク付き1行のみ）
- ハッシュタグは`#祭り #山車 #神輿`で固定する
- 見送った候補・不採用にした候補は含めない（実際に公開できた祭り
  のみ）
- この下書きはコピペしてそのまま使える完成形として出力し、
  「以下のような文面はいかがでしょうか」のような前置きは付けない

---

## 変更履歴

```
2026-09-15（新設）
    Codexプロンプトを毎回チャットで書き換える運用の負荷を下げるため、
    実運用プロンプトの全文を本ファイルへ移設。Codex側のプロンプトは
    本ファイルを参照する短い指示のみとする。移設時、「現在の対象
    エリアは東北」という記述が2026-09-11の全国初期掲載フェーズ完了
    まで更新されずに残っていた不整合を修正し、mapReference.lat/lng
    の記録基準（atmosphere-media-guide.md 8節参照）を追加した。

2026-09-16（全国完了時：新規探索の積極化）
    全国初期掲載フェーズ完了後の実行が「保留候補の再確認」のみに
    限定されており、直近5回の追加が全て過去の見送り候補の再調査で
    新規発見がゼロだったため、「全国完了時」節に都道府県観光協会の
    イベントカレンダー・Wikipedia祭りカテゴリ等からの積極的な新規
    探索を優先順位4番目として追加した。品質基準・採用条件・停止条件
    は変更していない。完了報告に候補の発見経路を明記する項目を追加。

2026-09-16（backgroundImage採用基準の参照を明示化）
    週次品質改善タスク側は`atmosphere-media-guide.md` 7節を明示参照
    していたが、本タスクは「品質基準を満たす素材」とだけ記載しており
    節番号を明示していなかった。7節改訂（thumbnailVariant・画像の
    選び方の優先順位）が新規追加時にも確実に適用されるよう、採用条件
    セクションに7節（backgroundImage）・1〜6節（atmosphereMedia）への
    明示参照を追加した。

2026-09-16（汎用OGP画像のURLを修正）
    汎用画像（backgroundImageが見つからない場合のog:image/twitter:image
    フォールバック）が、root直下の共通アセット
    （vigorlab.net/assets/brand/og-image.png）を指していたが、この画像は
    実際にはVIGOR TOOLSのブランド画像だったため、MATSURIのページの
    リンクカードがVIGOR TOOLSの内容で表示される不具合があった。matsuri
    専用の汎用画像（matsuri/shared/brand/og-image.png）を新設し、参照先
    をそちらに変更した。あわせて、Xのリンクカードキャッシュが旧画像を
    覚えてしまっていたため、画像URLに`?v=1`のキャッシュバスティング
    パラメータを追加した（画像ファイルを更新する場合のみ番号を上げる）。

2026-09-16（SNS(X)投稿下書きの自動生成を追加）
    Backlog.mdの「SNS（X）展開：下書き生成ワークフロー」設計（v0.1：
    下書き生成＋人が手動投稿）に基づき、新規祭り追加ができた場合のみ、
    完了報告の末尾にXへそのまま投稿できる下書き文を出力するルールを
    追加した。追加0件の回は出力しない。リンクは追加順1件目の祭りのみ
    に付け、2件目以降は祭り名＋都道府県の列挙のみとする。
```
