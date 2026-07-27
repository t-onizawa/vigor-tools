# VIGOR MATSURI — 祭りデータ スキーマ設計（情報設計担当）

```
Version: 0.4（試作検証用）
Created: 2026-07-27
Updated: 2026-07-27
Scope: 石岡のおまつり1件のプロトタイプ検証のみ。8件展開時の見直しを前提とする。
```

`CONCEPT.md` のデータ項目・開催確認ステータス（6段階）を、実際に1件分
組み立てられる形に構造化したもの。本書はスキーマの設計意図を記録する
文書であり、実データファイル・実装コードは含まない
（実データ・詳細ページはCodex CLIの実装フェーズで作成する）。

---

## 設計方針

1. **恒常情報と年度別情報を分離する**
   「山車が出る」「最寄駅」等は年をまたいでも変わらない情報。
   「今年の開催日」「今年の開催確認ステータス」は年ごとに変わる情報。
   同じオブジェクトに混在させると、年度更新のたびに恒常情報を
   誤って書き換えるリスクがあるため、`constantInfo` と `yearlyInfo`
   （年配列）に分ける。

2. **値の意味を3種類＋αで区別する**
   ```
   true / false   確認できている事実（あり／なしが判明している）
   null           未確認（分からない。存在しないとは言っていない）
   "n/a"（文字列） 該当なし（その祭りにはそもそも当てはまらない項目）
   空文字 ""       原則使用しない
   ```
   `false` と `null` を同じ「情報なし」として扱わないことが最重要。
   「幌獅子は出ないと確認済み」と「幌獅子について未調査」は
   ユーザーへの見せ方が全く異なる。
   `"n/a"` は今回の4項目（山車・神輿・踊り・曳き回し）では使わない
   （山車祭りを対象にしている以上、いずれも「その祭りに当てはまる質問」
   のため）。将来、祭り種別によっては成立しない項目が増えた場合の
   ための予約枠として定義だけ残す。

   **v0.3で修正：** v0.2時点の実装（詳細ページのバッジ表示）は
   `true`/`false`/それ以外（`null`扱い）の3分岐しかなく、`"n/a"`が
   来ても`null`と同じ「未確認」表示になっていた。8件展開前の
   今の段階で、`true`／`false`／`null`／`"n/a"`の4分岐を明示的に
   区別する実装に修正する（Codex CLIへの実装プロンプトを参照）。
   「未確認」（分からない）と「該当なし」（そもそも聞く意味がない）
   は意味が異なるため、表示も別にする。

3. **確認メタデータ（出典URL・確認日・確認ステータス）は
   グループ単位で持つ**
   フィールド1つ1つに出典を付けると管理コストが跳ね上がり、
   「情報量で戦わない」というVIGOR MATSURIの方針（CONCEPT.md）に反する。
   `constantInfo` と `yearlyInfo[年]` それぞれに1つの `confirmation`
   ブロックを持たせ、そのグループの情報がいつ・何を根拠に
   確認されたかを記録する。

4. **開催確認ステータス（6段階）は年度別情報にのみ持たせる**
   「開催確認済み／開催予定・詳細待ち／未確認／中止／延期／終了」は
   「今年その祭りが実施されるか」を表すものであり、恒常情報
   （山車の有無等の事実確認）とは性質が違う。恒常情報側は
   単純に `verified: true/false` で十分。

5. **駐車場は恒常情報に置かない**
   臨時駐車場の有無・場所・台数は年度によって変動するため、
   `hasParking` / `parkingNote` は `yearlyInfo[年].access` に置く。
   恒常情報（`constantInfo.access`）には最寄り駅など、年度によって
   変化しにくい情報だけを残す。過去年度に駐車場が存在したことを
   根拠に当年の `hasParking` を `true` にはしない
   （未確認なら必ず `null`）。

6. **外部メディア（`atmosphereMedia`）は恒常情報に置き、任意項目とする**
   YouTube・Instagram等の外部動画・投稿へのリンクは、「その祭りが
   一般的にどういう雰囲気か」を伝える参考素材として扱うため
   `constantInfo.atmosphereMedia`（配列）に置く。年度別の公式告知
   動画・その年限定の交通案内動画のような、年ごとに内容が変わる
   メディアが必要になった場合は、実際の需要が出た時点で
   `yearlyInfo` 側に別フィールドを追加する（今は両方に持たせず、
   過剰設計を避ける）。

   **著作権・掲載方針：**
   - 画像・サムネイルをダウンロードして自サイトの画像として
     転載しない
   - YouTubeは公式プレーヤー（iframe埋め込み）を使う
   - Instagramは公式埋め込み、または通常のリンクを使う
   - 投稿者側の削除・非公開化により表示できなくなる可能性を
     許容する（リンク切れ・埋め込み失敗時も詳細ページ全体は
     壊れない実装にする）
   - 掲載優先順位：祭り公式 → 自治体 → 観光協会 → 地元メディア →
     個人投稿（`publisherType`の並びに対応）
   - `atmosphereMedia` が空配列でも詳細ページは成立する設計を
     維持する（`highlightComment`同様、空ならセクション自体を
     非表示にする）

---

## スキーマ（例示）

```json
{
  "id": "ishioka-omatsuri",
  "name": "石岡のおまつり",
  "officialName": "常陸國總社宮例大祭",
  "prefecture": "茨城県",
  "city": "石岡市",
  "areaTag": "ibaraki",

  "constantInfo": {
    "schedulePattern": "9月、敬老の日を最終日とする土・日・月の3日間",
    "features": {
      "hasDashi": true,
      "hasMikoshi": true,
      "hasDanceOnDashi": true,
      "hasParade": true,
      "highlightTime": "night",
      "hayashiNote": "幌獅子の中に囃子連が乗り込み、大太鼓・小太鼓・笛・鉦を演奏する。屋根付きの小屋に囃子連が入る形式は全国的にも珍しいとされる。"
    },
    "access": {
      "nearestStation": "JR常磐線 石岡駅（西口からすぐ）"
    },
    "highlightComment": null,
    "atmosphereMedia": [],
    "confirmation": {
      "verified": true,
      "confirmedDate": "2026-07-27",
      "sources": [
        "https://ishiokamatsuri.com/about/",
        "https://social.ja-kyosai.or.jp/prefecture/festival/ibaraki/"
      ]
    }
  },

  "yearlyInfo": [
    {
      "year": 2026,
      "eventStatus": "scheduled_pending_official",
      "dates": ["2026-09-19", "2026-09-20", "2026-09-21"],
      "yearTownInCharge": "森木町",
      "access": {
        "hasParking": null,
        "parkingNote": "2026年の臨時駐車場情報は未確認"
      },
      "confirmation": {
        "confirmedDate": "2026-07-27",
        "sources": ["https://ishiokamatsuri.com/news/reitaisai-2026/"],
        "note": "石岡市公式サイト・常陸國總社宮公式サイトでは2026年情報が未掲載（2025年情報のみ確認済み）。祭り公認サイトの告知のみを根拠としており、一次情報での裏取りが1件のみのため『開催予定・公式詳細待ち』とした。"
      }
    }
  ]
}
```

`eventStatus` の取りうる値（CONCEPT.mdの6段階に対応）：

```
confirmed                  開催確認済み
scheduled_pending_official  開催予定・公式詳細待ち
unconfirmed                 未確認
cancelled                   中止
postponed                   延期
ended                       終了
```

`atmosphereMedia` 1件あたりの構造。媒体を問わない共通配列のため、
YouTube固有の`videoId`ではなく`contentId`を使う。石岡のおまつりで
実際に調査・確認できた候補（研究記録は`research/ishioka-omatsuri.md`
参照）を例として示す：

```json
{
  "type": "youtube",
  "url": "https://www.youtube.com/watch?v=o9Otb5uYHCU",
  "contentId": "o9Otb5uYHCU",
  "title": "5分で振り返る！令和6(2024)年 常陸國總社宮例大祭（石岡のおまつり）",
  "publisher": "茨城県石岡市",
  "publisherType": "government",
  "purpose": "festival_atmosphere",
  "publishedYear": 2024,
  "checkedDate": "2026-07-27"
}
```

```
type           youtube / instagram / tiktok
publisherType  official / government / tourism / local_media / individual
purpose        festival_atmosphere / official_update / access_information
publishedYear  投稿・公開された年（分かる場合のみ）。動画タイトルに
               「令和6(2024)年」等の年号が入っている場合、この値を
               詳細ページ側で「参考：◯年の様子」のように明示し、
               当年（2026年）の映像だと誤認させない
checkedDate    そのリンクの有効性・内容を確認した日（confirmationの
               confirmedDateと同じ考え方。項目単位で持つのは、
               メディアはリンク切れ・削除の可能性があり、
               恒常情報全体のconfirmationとは別に鮮度管理したいため）
```

**表示方針：** ページの軽さを優先し、`atmosphereMedia`配列の**先頭1件のみ
を埋め込み表示**（YouTubeは公式プレーヤー、Instagramは公式埋め込み）し、
2件目以降は外部リンクの一覧として表示する。どれを先頭に置くかは
データ作成時に「代表として最も適切な1件」を人が選んで並べる
（自動選定ロジックは持たない。過剰設計を避ける）。

---

## 詳細ページの情報順序（モバイル優先）

CONCEPT.mdの優先項目（いつ／今年確認済みか／どこで／山車神輿踊り曳き回し／
昼夜／アクセス）を、そのままページ上から下の順序に対応させる。

```
1. 祭り名・エリア
2. 今年（2026年）の開催日 ＋ 開催確認ステータスバッジ
3. 開催地（市区町村）
4. 特徴バッジ：山車／神輿／踊り／曳き回し（あり・なし・未確認・
   該当なしの4状態を明示）
5. 見どころの時間帯（昼／夜／両方）
6. アクセス（最寄駅は恒常情報、駐車場の有無・注意事項は当年の
   `yearlyInfo.access` から表示。未確認なら「未確認」と明示する）
7. お囃子の特徴
8. 一言見どころコメント（`constantInfo.highlightComment` が `null` の
   場合、この項目セクション自体を表示しない。空欄や「未確認」表示は
   出さない）
9. 参考動画・SNS投稿（`constantInfo.atmosphereMedia` が空配列の場合、
   このセクション自体を表示しない）
10. 出典・確認日（透明性のため必ず表示）
11. 歴史・由来の補足（最後、折りたたみ等で主役にしない）
```

歴史解説を主役にせず「現地で何が見られるか」を先に見せる、という
CONCEPT.mdの方針をページ構成レベルで固定する。

---

## 調査担当からのフィードバック（スキーマへの指摘）

調査を実際に行った結果、以下の点をスキーマに反映した。

- **出典が1系統しかない年度情報がありうる**ことが分かった
  （2026年の日程は祭り公認サイトの告知のみで、市公式・神社公式は
  未更新）。`confirmation.sources` を配列にし、`note` で
  「裏取り件数が少ない」ことを明記できるようにした。単純な
  `verified: true/false` だけでは、この"1件しか根拠がない"という
  状態を表現できないため、`eventStatus` を
  `scheduled_pending_official` として区別した。
- 駐車場は「有無」自体も年度で変わりうる（2025年実績の台数リストは
  存在するが、2026年に同じ場所・台数が使えるかは未確認）ことが
  分かった。当初案では `hasParking` を恒常情報に置いていたが、
  過去年度の実績を根拠に当年も `true` とみなすのは誤認を生むため、
  `yearlyInfo[年].access.hasParking` に移し、未確認の年は必ず
  `null` とする設計に修正した（v0.2）。
- CONCEPT.mdが定義する「一言見どころコメント」がv0.1のスキーマから
  抜けていた。`constantInfo.highlightComment` として追加したが、
  裏付けのある紹介文を今回の調査だけでは作れなかったため `null` の
  ままとした。詳細ページ側は `null` の場合にセクション自体を
  非表示にする設計とし、空欄や「未確認」表示で埋めない
  （Tool Principle「前提と責任範囲を明記する」と同じ考え方で、
  書けないものは無理に書かない）。
- `atmosphereMedia`の候補調査でInstagram・TikTokを調べた結果、
  YouTubeに比べて未ログイン状態での確認可能な情報が大幅に少ないことが
  分かった（投稿日・埋め込み可否がページ上で確認できない、
  ログイン壁で本文が隠れる等）。個人投稿を候補に含める方針
  （優先順位5位）は維持するが、実際に個人投稿を採用する際は
  「誤解を招く内容がないか」「特定人物が主役になっていないか」を
  ログインした状態で改めて確認する工程が別途必要になる
  （今回のリサーチ担当の権限では検証しきれない領域があることを
  記録しておく）。

---

## この文書の使い方

- 実データ・詳細ページの実装は本書ではなく、Codex CLIへの実装プロンプト
  （別途作成）で扱う
- 8件展開時にスキーマの過不足が見つかった場合は、本書をv0.2として改訂する
- 調査結果の詳細は `research/ishioka-omatsuri.md` を参照

---

## 変更履歴

```
v0.1  2026-07-27
    初版。恒常情報／年度別情報の分離、true/false/null/"n/a"の区別、
    確認メタデータのグループ単位保持、開催確認ステータス6段階の
    年度別情報への割り当てを設計。石岡のおまつりの調査結果を反映し、
    「出典が1系統のみの年度情報」を表現できる構造に調整した。

v0.2  2026-07-27
    駐車場情報（hasParking / parkingNote）をconstantInfoから
    yearlyInfo[年].accessへ移動。過去年度の実績を根拠に当年をtrueと
    しないよう明記し、未確認の年は必ずnullとする方針を追加。
    CONCEPT.md記載の「一言見どころコメント」が抜けていたため
    constantInfo.highlightCommentを追加（今回はnull、詳細ページでは
    null時にセクション非表示）。

v0.3  2026-07-27
    実装レビューで発覚した"n/a"分岐の未実装を修正対象として明記
    （true/false/null/"n/a"の4分岐を詳細ページ側に反映するよう
    Codex CLIへ指示、Claude Codeはコードを直接変更しない）。
    外部メディア（constantInfo.atmosphereMedia）を新設。恒常情報側の
    任意項目とし、yearlyInfo側には現時点で複製しない（過剰設計を
    避ける）。著作権・掲載方針（自サイトへの画像転載禁止、公式埋め込み
    利用、リンク切れ許容、publisherType優先順位、空配列でもページが
    成立すること）を明記した。

v0.4  2026-07-27
    atmosphereMediaの`videoId`を媒体非依存の`contentId`に変更し、
    typeの取りうる値をyoutube/instagram/tiktokに更新（external_link
    は今回の調査対象外としたため一旦外した）。`publishedYear`を追加し、
    投稿年が分かる場合は詳細ページ側で「参考：◯年の様子」等の表現で
    当年の情報と誤認させない方針を明記。表示方針として「配列先頭1件
    のみ埋め込み、以降はリンク一覧」をページの軽さ優先の設計として
    追加（自動選定はせず人が代表1件を選ぶ）。石岡のおまつりの
    YouTube候補（茨城県石岡市公式チャンネル『5分で振り返る！令和6
    (2024)年...』）を実例として反映。Instagram・TikTokの調査結果は
    `research/ishioka-omatsuri.md`に別途記録。
```
