# VIGOR LAB — tools/ 移行設計

```
Version: 0.3
Created: 2026-07-28
Updated: 2026-07-28
Scope: VIGOR TOOLSをリポジトリルート直下からtools/配下へ移動し、
       ルートindex.htmlをVIGOR LABトップへ再設計する。
       実装はCodex CLIへ渡す。Claude Code自身はファイルを変更しない。
```

VIGOR LABを複数プロジェクト構成（`tools/`＝VIGOR TOOLS、`matsuri/`＝
VIGOR MATSURI、ルート＝VIGOR LAB）へ整理するための調査・移行設計。
検索流入・外部流入がまだ小さいため、既存URL維持よりも将来の構造の
正しさを優先し、一括でURLを変更する方針（ユーザー指示に基づく）。

---

## 0. 調査結果の要点（最初に読む）

実際にリポジトリを調査した結果、**相対パスのリスクは当初懸念より
小さい**ことが分かった。理由は、VIGOR TOOLS配下のファイル
（カテゴリフォルダ・共有ファイルの両方）が**まるごと1階層下へ
移動する**ため、多くの相対パス（`../../`等の段数）はそのまま
成立し続けるため。

修正が必要なのは実質2種類だけ。

1. **ルート絶対パス（`/`始まり）で、移動先が変わるファイルへの参照**
   （`/shared-history.js`・`/shared-profile.js`・`/card-status.js`・
   `/history/`）。`/assets/...`は移動しないため変更不要。
2. **共有CSS/JS（`shared.css`等）への相対パス参照**。ファイル名の
   直前に`shared/`という1階層を挿入するだけでよい（`../`の数は
   変わらない。詳細は3節）。
3. **絶対URL（`https://vigorlab.net/...`）を使うcanonical・OGP・
   sitemap.xml**。すべて`/tools/`を挿入する。

---

## 1. 移動対象となるディレクトリ・ファイル一覧

### tools/配下へ移動するディレクトリ

```
ai/                  → tools/ai/
buy/                 → tools/buy/
life/                → tools/life/
money/               → tools/money/
work/                → tools/work/
thinking/            → tools/thinking/
travel/              → tools/travel/
history/             → tools/history/
dcap-agile-sheet/    → tools/dcap-agile-sheet/
_template/           → tools/_template/
```

（ユーザー提示の目標構成では`ai/buy/life/money/work/`のみ例示されて
いたが、実際の調査で`thinking/`・`travel/`・`history/`・
`dcap-agile-sheet/`・`_template/`も同じくVIGOR TOOLSのカテゴリ／
基盤ファイルであることを確認した。これらも同様に`tools/`配下へ
移動する）

### tools/shared/ へ統合するファイル（現在ルート直下）

```
shared.css           → tools/shared/shared.css
shared-history.js    → tools/shared/shared-history.js
shared-profile.js    → tools/shared/shared-profile.js
card-status.js       → tools/shared/card-status.js
```

### tools/ 直下へ移動するファイル（現在ルート直下、VIGOR TOOLSの
旧トップページ本体）

```
index.html（現行のVIGOR TOOLSトップ）→ tools/index.html
style.css（現行index.html専用）      → tools/style.css
script.js（worry-cardクリック処理）  → tools/script.js
```

これら3ファイルは現在「ルート直下のindex.htmlとその専用CSS/JS」
という単位で完結しており、相互の相対参照（`href="style.css"`・
`src="script.js"`）は同じフォルダ内の関係を保ったまま移動するため
**変更不要**（0節参照）。

### 移動しない（ルートに残す）

```
CNAME                GitHub Pagesのカスタムドメイン設定。
                      仕様上リポジトリルート直下必須
robots.txt            Sitemap行のURLは変更不要（vigorlab.net/sitemap.xml
                      のまま）
sitemap.xml            中身は更新が必要（7節）が、ファイル自体はルート
assets/                ブランド画像・favicon等。絶対パス`/assets/...`
                      を各所が参照しているため、動かすと影響範囲が
                      広がる。移動しない
CHARTER.md / VISION.md / Roles.md / Backlog.md / CLAUDE.md
                      組織文書。VIGOR LAB全体に関わるためルートのまま
matsuri/               今回のスコープ外。既存の姉妹プロジェクトとして
                      変更しない（1節末尾の確認結果を参照）
.gitignore / .git/ / .claude/
                      変更しない
```

### matsuri/ への影響（確認結果）

`matsuri/`配下を全ファイル調査した結果、ルート絶対パス参照
（`/assets/...`等）・`shared.css`への依存のどちらも**ゼロ件**
だった（matsuriは独自の`matsuri/shared/`を持ち、ルートの共有
ファイルを一切参照しない設計になっているため）。**今回の移行で
matsuri配下のファイルは1つも変更しない。**

---

## 2. ルートに残すファイル（新設計）

移行後のルート直下は以下の構成になる。

```
index.html      新規作成：VIGOR LABトップ（8節参照）
style.css       新規作成：VIGOR LABトップ専用の最小スタイル
                （tools/style.cssとは別ファイル。worry-grid等
                VIGOR TOOLS固有のスタイルは持たない）
CNAME
robots.txt
sitemap.xml     更新（7節）
CHARTER.md / VISION.md / Roles.md / Backlog.md / CLAUDE.md
tools/
matsuri/
assets/
```

新しいルート`style.css`を既存の（tools/へ移動する）`style.css`と
同名にするのは意図的。両者は完全に別内容のファイルであり、
移動後に名前が衝突することはない（片方は`tools/style.css`、
もう片方はルート`style.css`で、物理的に別ファイル）。

---

## 3. 全相対パスへの影響

### 3-1. 変更不要なもの（重要）

VIGOR TOOLS配下のファイルは**サブツリーごと1階層下へ移動する**ため、
以下の相対パスは移行後もそのまま成立する。

- カテゴリ内・ツール間の相互リンク（例：パンくずの
  `<a href="../../">VIGOR TOOLS</a>`）
- 各ツール自身のローカルCSS/JS（`href="style.css"` /
  `src="script.js"`、ツールごとに専用ファイルを持つもの）
- `_template/`内の相対パス例示（`../../shared.css`等）。これは
  「カテゴリ/ツール名/」という2階層下に配置される想定の例示であり、
  `tools/`が新しい基準点になっても意味は変わらない

### 3-2. 変更が必要なもの

**共有ファイルへの相対パス（`shared.css`・`shared-history.js`・
`shared-profile.js`・`card-status.js`）：** これらは移行後
`tools/shared/`という1階層深いフォルダへ移る。参照元ページも
同時に1階層深くなる（例：`buy/index.html`→`tools/buy/index.html`）
ため、**`../`の数は変わらず、ファイル名の直前に`shared/`を
挿入するだけでよい。**

```
変更前                        変更後
../shared.css              →  ../shared/shared.css
../../shared.css           →  ../../shared/shared.css
../shared-history.js       →  ../shared/shared-history.js
../../shared-history.js    →  ../../shared/shared-history.js
../shared-profile.js       →  ../shared/shared-profile.js
../../shared-profile.js    →  ../../shared/shared-profile.js
```

対象は`shared.css`（59ファイル）・`shared-history.js`（相対参照分。
残りは絶対パス、4節）・`shared-profile.js`（3ファイル）。

---

## 4. 内部リンクへの影響

### 4-1. ルート絶対パス（`/`始まり）の書き換え

| 現在の参照 | 出現数（概算） | 変更後 |
|---|---|---|
| `/shared-history.js` | 31 | `/tools/shared/shared-history.js` |
| `/card-status.js` | 3 | `/tools/shared/card-status.js` |
| `/history/`（リンク） | 30 | `/tools/history/` |
| `/assets/...` | 多数 | **変更不要**（assetsは移動しない） |

`shared-profile.js`は現在すべて相対パス参照（3件、3-2節で対応済み）
のため、この表には含めない。

### 4-2. card-status.js自体のロジックへの影響

`card-status.js`は`href.indexOf(match) !== -1`という部分一致判定で
対象ツールを識別しており（例：`match: 'subscriptions/'`）、判定対象
はパスの一部分（ツールのフォルダ名）であって絶対パス全体ではない。
**`/tools/`が前に付いても部分一致には影響しない**ため、ロジック自体の
変更は不要。読み込み元パスの修正（上表）のみで足りる。

### 4-3. history/との相互リンク

「判断履歴を見る →」リンク（30件）は`/history/`から
`/tools/history/`に変更。history側から各ツールへ戻るリンクがある
場合は、history/index.htmlの内容を確認のうえ、同様に相対パスの
考え方（3節）を適用する。

---

## 5. CSS・JS・画像参照への影響

- CSS/JSは3〜4節でカバー済み。
- 画像・favicon等（`assets/brand/配下`）はすべて`/assets/...`という
  ルート絶対パスで参照されており、`assets/`自体を移動しないため
  **変更不要**。
- 新しいルート`index.html`（VIGOR LABトップ）・新しい`tools/index.html`
  （旧ルート）とも、同じ`/assets/brand/favicon.svg`等をそのまま
  使い回せる（ブランドアセットは1つの資産としてVIGOR LAB全体で
  共有する、という現状の設計と自然に合致する）。

---

## 6. canonical・構造化データ・OGPへの影響

- 構造化データ（JSON-LD）：サイト内0件。影響なし。
- canonical・OGP（`og:url`）：VIGOR TOOLS配下の全59ページが
  `https://vigorlab.net/{path}`形式の絶対URLを持つ。すべてに
  `/tools`を挿入する（例：`https://vigorlab.net/buy/rayban-meta/`
  → `https://vigorlab.net/tools/buy/rayban-meta/`）。
- ルート`/`のcanonical・OGP（`og:title`＝「VIGOR TOOLS — 小さな
  実用ツール集」等）は、8節の新トップページ用の内容に差し替える。
- `og:image`（`https://vigorlab.net/assets/brand/og-image.png`）は
  `assets/`が移動しないため変更不要。ただしVIGOR LABトップと
  VIGOR TOOLSトップで同じOG画像を使い続けるかは、ブランド上の
  判断（Product Lead）が必要な領域のため、今回は現状の画像を
  そのまま両方で使う前提とし、変更提案はしない。
- matsuri配下のページはcanonical・OGPタグ自体を持っていない
  （現状仕様）。今回の移行で新規に追加することはしない
  （スコープ外）。

---

## 7. sitemap.xml・robots.txtへの影響

- **robots.txt：** `Sitemap: https://vigorlab.net/sitemap.xml`の
  1行のみで、パス固有の記述がないため**変更不要**。
- **sitemap.xml：** 「ルート以外すべて」ではなく、**tools/へ移動する
  カテゴリに属するURLだけを対象にした許可リスト方式**で書き換える
  （調査時点でmatsuri関連のURLはsitemap.xmlに1件も含まれていない
  ことを確認済みだが、将来追加された場合に誤って書き換えないよう、
  対象を明示的に絞る）。

  対象プレフィックス（このいずれかで始まるURLのみ`/tools`を挿入）：
  ```
  https://vigorlab.net/ai/
  https://vigorlab.net/buy/
  https://vigorlab.net/life/
  https://vigorlab.net/money/
  https://vigorlab.net/work/
  https://vigorlab.net/thinking/
  https://vigorlab.net/travel/
  https://vigorlab.net/history/
  https://vigorlab.net/dcap-agile-sheet/
  ```

  変更しない（そのまま維持する）：
  ```
  https://vigorlab.net/           （新VIGOR LABトップ）
  https://vigorlab.net/matsuri/   および配下の全URL
  ```

  加えて、**新設される`/tools/`（VIGOR TOOLSの新トップ）の
  sitemapエントリを1件追加する**（旧構成ではルート`/`とVIGOR TOOLS
  トップが同一URLだったため、`/tools/`というURLは今回新たに
  生まれるものであり、単純なURL置換だけでは漏れる）。
- **参考（今回のスコープ外）：** 調査の過程で、`matsuri/`配下の
  2ページがsitemap.xmlに1件も含まれていないことが分かった
  （移行前から存在した抜け漏れで、今回の移行が原因ではない）。
  別タスクとして追加を検討することを推奨する。

---

## 8. ルートindex.htmlをVIGOR LABトップへ変更する方針

現行のルート`index.html`はVIGOR TOOLSのトップページそのものであり、
これは丸ごと`tools/index.html`として移設する（1節）。ルートには
**新規にVIGOR LABトップページを作成する。**

### 方針

- 情報量を絞る。VIGOR LAB自体はプロダクトではなく「複数プロダクトの
  母体」であるため、CHARTER.mdのMission「もやもやを、使えるカタチに
  する。」を掲げた上で、2つのプロダクトへの入口を示すだけの
  ごく短いページにする
- 構成案：
  1. VIGOR LABラベル＋Mission一文
  2. 短い説明（1〜2文）
  3. プロダクトカード2枚（確定）：
     - **VIGOR TOOLS** — 「仕事や暮らしの迷いを整理する、小さな
       実用ツール。」→ `/tools/`
     - **祭を探す**（画面上の表示名。「VIGOR MATSURI」という
       プロダクト名は内部的には残るが、このカードの表示名は
       「祭を探す」とする）— 「山車、神輿、踊り、開催時期から
       祭を探せます。」→ `/matsuri/`

  「祭を探す」カードには「行ってみたい祭りを、見つけやすくする。」
  のような大きなキャッチフレーズは使わない（上記の短い説明のみ）。
  VIGOR TOOLS側の確定ヒーローコピー「小さく動くための、道具箱。」
  （VISION.md記載、変更しない方針）は`tools/index.html`側に
  残ったままであり、このLABトップのカードでは重複させない。
- デザインは既存サイトと同じ白・黒・薄いグレー基調を維持する
- コピー（見出し・説明文の正確な文言）はCodex実装時の初稿とし、
  最終的な文言確定はFounder／Product Leadの確認を推奨する
  （CLAUDE.mdの役割分担どおり、Claude Codeはここでは設計止まりとする）

### 依存関係の確認結果

**`matsuri/index.html`は既に実装済みであることを確認した**
（並行して進んでいたMATSURI側セッションのコミット
`079da5c feat: 祭り一覧ページを追加`、`895b3ac docs: 一覧ページの
設計を追加`により、`matsuri/index.html`・
`matsuri/shared/festival-list.js`・`matsuri/shared/festival-list.css`
が作業ツリーに存在している）。VIGOR LABトップから`/matsuri/`への
リンクはリンク切れにならない。

再確認として、`matsuri/`配下を再調査し、`matsuri/index.html`・
`festival-list.js`・`festival-list.css`を含めても**ルート絶対パス
参照は引き続きゼロ件**であることを確認した（1節の結論は変更なし。
今回の移行対象にmatsuriは含まれない）。

なお、現在の作業ツリーにはmatsuri配下に多数の未コミット変更
（`festivals/*/data.js`・`festivals/*/index.html`・`research/*.md`・
`schema-design.md`・`template-design.md`等）が存在する。これは
MATSURI側セッションの作業中の変更であり、**今回のtools/移行タスクの
対象外**のため、このタスクでは一切触れない・コミットしない。

---

## 9. GitHub PagesとCNAMEへの影響

- 現在のリポジトリに`.github/workflows/`は存在せず、GitHub Pagesは
  「mainブランチのルートから配信」という設定（Actionsを使わない
  標準デプロイ）と推測される。**ビルドステップが無いため、
  ファイル移動がそのまま即座に公開構成へ反映される。**
- `CNAME`はGitHub Pagesの仕様上リポジトリルート直下に必須のため、
  移動しない（1節で確認済み）。
- `_template/`のようにアンダースコアで始まるフォルダは、GitHub
  Pages標準のJekyll処理でデフォルト除外される（`.nojekyll`が
  現状存在しないため）。これは移行前から`_template/`に対して
  起きている既存の挙動であり、`tools/_template/`に移しても同じ
  挙動が続くだけで、新たな問題ではない（そもそも`_template/`は
  開発者向けの雛形であり公開ページとして意図されていない）。

---

## 10. 移行後に確認すべき代表ページ

Codex実装後、ローカルHTTPサーバー経由で以下を確認する
（`file://`ではfetchやパス解決の一部が正しく検証できないため、
これまでの検証と同様に`python3 -m http.server`等を使う）。

```
1. /                              新VIGOR LABトップが表示され、
                                   /tools/ と /matsuri/ へのリンクが
                                   正しいこと
2. /tools/                        旧ルートの内容（hero・困りごとから
                                   探す等）がそのまま表示されること
3. /tools/buy/                    カテゴリ一覧ページ。shared.cssが
                                   読み込まれ、パンくずが正しいこと
4. /tools/buy/rayban-meta/        ツール詳細ページ。shared.css・
                                   style.css・パンくず（2階層）・
                                   canonical/OGPのURLが
                                   https://vigorlab.net/tools/buy/
                                   rayban-meta/ になっていること
5. /tools/history/                判断履歴ページが表示され、
                                   ローカルストレージの読み書きが
                                   機能すること
6. /tools/money/subscriptions/    shared-profile.js依存ページの
                                   動作確認
7. /tools/money/ または
   /tools/work/                   card-status.jsによるカード状態
                                   バッジが表示されること
8. /matsuri/festivals/
   ishioka-omatsuri/              matsuriが今回の変更の影響を
                                   受けていないことの確認（回帰なし）
9. /sitemap.xml                   全URLが/tools/を含む形に更新され、
                                   1件ずつ実在するページに解決すること
10. 旧URL（例：/buy/rayban-meta/） 意図的に404になること
                                   （リダイレクトは作らない方針の確認）
```

---

## 11. ロールバック手順

- 移行はCodex CLIによる**1回のまとまった変更（可能な限り単一コミット）**
  として実施する。「一括で変更し、旧構造と新構造を混在させない」
  というご指示に沿い、部分的な移動を段階的にコミットしない。
- `git mv`を使い、ファイル履歴（blame）を保持したまま移動する
  （新規作成＋旧ファイル削除ではなく、リネームとして扱う）。
- ロールバックは該当コミットに対する`git revert`で行う
  （force-pushや`git reset --hard`は使わない。過去の運用方針
  どおり、破壊的操作は避ける）。
- GitHub Pagesにはステージング環境がないため、**プッシュ前に
  ローカルHTTPサーバーで10節の代表ページを必ず確認**してから
  デプロイする。デプロイ後は実際の公開URLでも同じ代表ページを
  確認し、問題があれば速やかに`git revert`する。

---

## この文書の使い方

- Codex CLIへの実装プロンプトは本書の1〜11節の内容をそのまま
  指示として使う
- 8節の「未解決の依存関係」は実装着手前に判断が必要
- 実装後のレビューは10節のチェックリストを基準に行う

---

## 変更履歴

```
v0.1  2026-07-28
    初版。VIGOR TOOLSのtools/配下への移行設計。相対パスの大半は
    サブツリーごと移動するため変更不要であること、共有ファイル
    （shared.css等）は"../"の数を変えずshared/を挿入するだけで
    対応できることを確認。ルート絶対パス参照4種
    （shared-history.js/shared-profile.js/card-status.js/history/）と
    canonical・OGP・sitemap.xml（59件+新規1件）の更新が必要と特定。
    matsuri配下は依存ゼロで無影響と確認。ルートindex.htmlの
    VIGOR LABトップ化方針を整理した。

v0.2  2026-07-28
    matsuri/index.htmlの実装状況を再確認。並行するMATSURI側セッションで
    既にmatsuri/index.html・festival-list.js/cssが実装済み（コミット
    079da5c・895b3ac）であることを確認し、8節の依存関係を「解決済み」
    に更新。再調査後もmatsuri配下のルート絶対パス参照はゼロ件のまま
    であることを確認した。現在の作業ツリーにmatsuri側の未コミット
    変更が多数存在するが、今回のtools/移行タスクの対象外として扱う
    方針を明記した。

v0.3  2026-07-28
    MATSURI側の未コミット変更がコミットされ、作業ツリーがクリーンに
    なったことを確認した。root直下のファイル一覧を再取得し、既存の
    移動対象リストに漏れがないことを確認した。sitemap.xmlの書き換え
    方針を「ルート以外すべて」から「tools/へ移動するカテゴリの
    プレフィックスのみを対象とする許可リスト方式」に変更した
    （matsuri関連URLを誤って書き換えないため）。ルートindex.htmlの
    プロダクトカード文言を確定（MATSURI側カードの画面上表示名を
    「祭を探す」とし、大きなキャッチフレーズは使わない方針とした）。
```
