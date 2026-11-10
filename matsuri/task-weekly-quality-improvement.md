# VIGOR MATSURI — 日次品質改善タスク

（ファイル名の`weekly`は旧名称の名残。Scheduled Task側の参照を変えないため、
ファイル名は変更しない。実行頻度は平日毎日。）

Codex Scheduled Task用の実行指示書。Codex側のプロンプトは本ファイルを
読み込んで指示通りに実行する形にする。基準・運用ルールの変更は本ファイル
のみを更新し、Codex側のプロンプト自体は書き換えない。

---

## このタスクの目的と、1回の「完走」の定義（2026-11-10改訂）

目的は「監査」ではなく、素材（backgroundImage・atmosphereMedia・
mapReference.lat/lng）を**安全に1件ずつ確実に増やすこと**。

**1回の実行 = 祭り3件を「調査 → 採否判断 → データ反映 → commit」まで
終わらせること。** 件数のノルマより完走を優先する。

- 3件を完走できなかった場合でも、完走できた分は必ずcommit・pushする。
- 調査の途中で時間・手間が尽きそうな場合は、次の「進捗の保存」に従って
  途中メモを残してから終了する。何も残さず終了してはならない。
- 3件を完走した時点で終了してよい。4件目以降は行わない
  （ノルマではなく上限。完走しない大量調査より、完走した3件を優先する）。
- 「完走」には、調査の結果「採用できる素材なし（見送り）」と判断して
  その記録をcommitした場合も含む。ただし見送りは、基準を満たさない理由を
  research/{slug}.mdに具体的に残した場合に限る。
- 1祭りあたりの調査は、画像・動画それぞれ**候補5件の確認まで**を目安にする。
  それ以上は掘らず、見送りとして記録して次の祭りへ進む。
- 1回の実行で扱わないもの：全件の整合性チェック（週次タスクの担当。下記）、
  日付・開催有無・中止延期の判断（要確認リストへ回す。下記）。

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

**push前（反映直前）にも `git fetch origin` を行う。** origin/mainが
更新されていた場合は最新origin/mainを安全に取り込んで、下記「テスト」を
再実行する。コンフリクトまたは検証失敗時はpushしない（派生ファイルのみの
競合は次節に従う）。

## 派生ファイルのマージ競合時の対応（2026-10-06追加）

上記「コンフリクト時はpushしない」には例外がある。最新origin/mainの
取り込み時に発生する競合が、以下の「ビルド時に全件から機械的に
再生成されるだけの派生ファイル」**のみ**に限られる場合は、停止せず
自動的に解消してよい。

対象ファイル（いずれもfestivals/配下の全件を読み直して丸ごと再生成
する仕組みであり、内容に手動編集は一切含まれないため、競合の解消に
判断は不要）：

- `matsuri/features/**/index.html`
- `matsuri/prefectures/**/index.html`
- `matsuri/regions/**/index.html`
- `matsuri/months/**/index.html`
- `matsuri/shared/prefecture-hub-slugs.js`
- `matsuri/shared/region-hub-slugs.js`
- `matsuri/shared/search-index.js`

**解消手順：**
1. 競合しているファイルが上記一覧のみであることを確認する（1件でも
   上記以外（`festivals/<slug>/data.js`・`festivals/<slug>/index.html`・
   `research/*.md`・`research/quality-queue.json`・`Backlog.md`等）が
   含まれる場合は、この手順を使わず通常どおり停止して報告する）
2. 競合している対象ファイルについて、どちらの内容を採用するかは
   問わない（`git checkout --theirs` 等でどちらかを機械的に採用して
   コンフリクトマーカーを解消すればよい。最終的に再生成で上書き
   されるため、採用した側の内容は結果に影響しない）
3. マージを完了させた上で、以下を実行し、派生ファイルを現在の
   `festivals/`配下の内容（自分がこの実行で変更した分を含む、
   マージ後の最新状態）から再生成する：
   ```
   node matsuri/scripts/generate-feature-hub-pages.js
   node matsuri/scripts/generate-prefecture-hub-pages.js
   node matsuri/scripts/generate-region-hub-pages.js
   node matsuri/scripts/generate-month-hub-pages.js
   node matsuri/scripts/generate-search-index.js
   ```
4. 再生成後、通常どおり下記「テスト」をやり直してからpushする
5. 完了報告に「派生ファイル競合を自動解消した」旨と対象ファイル数を
   明記する

この対応により、新規祭り追加タスクと本タスクなど、複数のScheduled
Taskが同じ派生ファイルを別々に再生成した際に発生する機械的な競合で
毎回停止することを防ぐ（詳細は`task-new-festival-addition.md`の
変更履歴参照）。

---

## 進捗の保存（作業キューと調査メモ。2026-11-10追加）

過去の実行では、調査途中の結果がどこにも残らず、毎回ゼロから始まって
いた。これを防ぐため、進捗は**必ずリポジトリ（origin/main）に残す。**
実行ごとのworktreeは終了時に消えるため、commit・pushされていない
メモは次回に引き継がれない。

保存先（いずれも`matsuri/research/`配下。`_config.yml`でresearch/は
公開除外済みのため、新規ファイルを追加しても`_config.yml`の変更は不要）：

| ファイル | 役割 |
| --- | --- |
| `research/quality-queue.json` | 作業キュー（次に調査する祭りの順番と状態） |
| `research/{slug}.md` | 祭りごとの調査メモ（従来どおり。日付付きの節を追記） |
| `research/quality-review-list.md` | 要確認リスト（人の判断が要る項目の隔離先。下記） |

### 作業キュー `research/quality-queue.json`

形式（ファイルが無い場合は、初回実行で下記の形で新規作成する）：

```json
{
  "version": 1,
  "updatedOn": "YYYY-MM-DD",
  "items": [
    {
      "slug": "example-matsuri",
      "lane": "-1 | 0 | 1 | 2 | 4",
      "reason": "候補にした理由（例：backgroundImage null かつ atmosphereMedia 空）",
      "status": "queued | in_progress | done | skipped",
      "lastTouchedOn": "YYYY-MM-DD | null",
      "result": "added-image | added-video | added-geo | rejected-all | needs-review | null",
      "memo": "途中経過の1〜2行（次回の続きに必要なことだけ）"
    }
  ]
}
```

運用ルール：

1. **開始時**：`quality-queue.json`を読む。`in_progress`の祭りがあれば、
   それを最優先で続きから再開する（最初からやり直さない。
   `research/{slug}.md`の途中メモと`memo`を読む）。
2. `in_progress`が無ければ、`queued`の先頭から順に3件を取る。
3. **キューの補充**：`queued`が3件未満なら、下記「対象選定」に従って
   festivals/配下から候補を最大30件までキューに追加する。補充も
   1件の作業としてcommitする（補充だけで1回が終わってもよい。補充後に
   余力があれば調査に進む）。キューに既にいる祭り、`done`/`skipped`で
   「前回調査から4週間以内」の祭りは追加しない。
4. 各祭りの調査に着手した時点で`status`を`in_progress`にし、完走（反映
   またはcommit済みの見送り記録）した時点で`done`にする。見送り・保留は
   `result`に理由の種別を残す。
5. 以前の`research/{slug}.md`の記録（調査日・採否・理由）がある祭りは、
   従来どおり「直近7日以内（開催直前枠）／4週間以内（通常枠）は除外」を
   適用する。

### 蒸発禁止（途中メモの必須化）

- **1祭りの調査が終わるごと**（採用・見送りいずれも）に、`research/
  {slug}.md`の記録とキューの更新を**即commitし、pushする**。
  3件まとめて最後にcommitしない。
- 時間・手間が尽きそうな場合、またはこれ以上続けられないと判断した場合は、
  終了する前に必ず次を行う：
  1. 調査中の祭りの`status`を`in_progress`のまま、`memo`に「どこまで
     確認したか／次に何をするか」を書く
  2. `research/{slug}.md`に、確認済みの候補URL・見送った候補とその理由・
     未確認の候補を日付付きで追記する
  3. これらを`research/`配下のみの変更としてcommit・pushする
     （素材の反映が0件の回でもcommit・pushする。メモのみの変更では、
     静的コンテンツ・ハブ・検索インデックスの再生成とIndexNow通知は不要）
- 「何も残さずに終了」「調査したが記録がない」は、この運用で最も避ける
  べき状態として扱う。0件で終わる場合も、必ず上記のメモを残す。

---

## 要確認リスト（人の判断が要る項目の隔離。2026-11-10追加）

調査の過程で、次のような**人の判断が要る項目**に気づいた場合は、その場で
調査・修正を深追いしない。`research/quality-review-list.md`に1行追記し、
本流（素材の調査・反映）を続ける。

対象の例：

- 開催日・開催年度・中止・延期・休止に関わる疑い（例：神田祭の
  `off_year_has_dates`）。日付・eventStatusの判断は本タスクでは行わない
- `highlightComment`・SEO文言・タイトル・説明文・体験タグの修正要否
- 一次情報同士の食い違い、非公式情報源しか見つからない事実
- 表示崩れ・既存不具合（今回の変更が原因でないもの）
- その他、基準の境界線で判断に迷うもの

形式（表に1行追記。既存行は書き換えない）：

```
| 追記日 | slug | 項目 | 気づいた内容（1〜2行） | 根拠URL | 状態 |
| 2026-11-10 | example | dates | ... | https://... | open |
```

- 状態は`open`で追記する。`resolved`への変更はPM・Founderが行う
  （本タスクは変更しない）
- 同じ内容を重複して追記しない（追記前にリストを検索する）
- 本タスクは要確認リストの項目を**修正しない**。完了報告には「今回追記した
  件数」と、`open`の累計件数のみを書く（毎日同じ内容を詳しく再報告しない）
- 要確認リストへの追記は`research/`配下の変更のため、素材の反映と同じ
  commitに含めてよい

---

## 日次では行わないこと（2026-11-10変更）

次は日次タスクの担当から外す。

- **全件（festivals/配下の全データ）の整合性チェックと、その結果の読解・
  報告。** 週次の`task-weekly-data-maintenance.md`
  （`weekly-health-check.js`）が担当する。気づいた不整合は、日次では
  修正せず要確認リストへ1行追記するだけとする。
- **`eventStatus`の`ended`化。** 通常のended化は日次cron（`auto-end-
  festivals.js`）が担当する。本タスクでは行わない
  （2026-10-13に追加した例外は廃止。理由：cronが稼働している現在、
  本タスクで重複して持つ必要がなく、全件確認を日次に残す原因になるため）。

日次で行う確認は、**自分が変更した祭りに限った確認**だけとする（下記
「テスト」）。

---

## 対象選定

素材の追加（画像・動画・位置情報）に絞る。backgroundImageを最優先とする。
キューへ追加する候補の選び方は以下（優先順）。判断基準は`atmosphere-media-
guide.md`の既存基準（7節＝backgroundImage、1〜6節＝atmosphereMedia、8節＝
mapReference.lat/lng）をそのまま適用し、**基準を緩めない。**

-1. `constantInfo.notableDesignation`が設定済みで`constantInfo.
   highlightComment`が`null`の祭り。ただし`highlightComment`は本タスクで
   自動変更しないため、素材（画像・動画）の調査を優先枠として行い、
   見どころ文の補完は**要確認リストへ追記**する
   （従来は本タスクで補っていたが、`highlightComment`は元々「自動変更
   しない」項目のため、判断を要するものとして要確認リストへ集約する）。
0. 開催まで概ね1〜2ヶ月以内（開催済みは対象外）の祭りのうち、
   backgroundImage・atmosphereMedia・mapReference.lat/lng
   （mapReference自体は確定済みのもの）のいずれかが欠けているもの。
   理由：開催が近づく祭りほど「祭り名＋年」のピンポイント検索が増え、
   素材の充実が流入に直結する（Search Consoleの実測で確認済み）。
1. 一度も本タスクで調査履歴がない「backgroundImage null かつ
   atmosphereMedia 空配列」の祭り。地域・追加時期を問わず全体から選ぶ。
2. 前回調査から4週間以上経過した「両方なし」の祭り。
3. （除外）直近4週間以内に本タスクで不採用判定済みの祭り
   （research/{slug}.mdの記録で確認する）。
4. 片方だけ欠けている祭り（backgroundImageのみ欠け → atmosphereMediaのみ
   欠け、の順）。

mapReferenceが確定済み（label・queryがある）でlat/lngのみnullの祭りは、
`atmosphere-media-guide.md` 8節の基準に従い座標を確認できれば記録する。
mapReference自体が`null`の祭りへの新規調査は対象外。

atmosphereMediaもbackgroundImageと同様に新規探索の対象とする。ただし
調査の主軸はbackgroundImageとし、atmosphereMediaは同じ祭りの中で並行して
探索する。

検索結果の要約・スニペットだけで投稿者・内容を確定させず、必ず動画ページ・
画像を直接開いて確認する。research/{slug}.mdの記録文言が、画像・動画の
実際の内容と一致していることを確認する（不一致がある場合は文言を修正する
か、一致するまで採用しない）。

素材調査の過程で、UNESCO無形文化遺産・国指定重要無形民俗文化財等の公的
指定を一次情報（指定機関または自治体公式サイト）上でたまたま目にした場合は、
`constantInfo.notableDesignation`に記録する（schema-design.md 14番参照）。
この指定の有無だけを確認するための専用調査は行わない。

品質基準を満たした素材は、その回ですべて反映する。反映件数に上限は設けない。
backgroundImageのみ、atmosphereMediaのみ、mapReference.lat/lngのみ、
複数同時、いずれの反映も可とする。品質基準を満たさない素材は反映しない。

## 自動反映の範囲

以下のみ自動反映対象とする。

- backgroundImage追加
- atmosphereMedia追加
- mapReference.lat/lng追加
- notableDesignationの記録（上記のとおり偶然確認できた場合）
- 軽微なnote修正（素材の説明noteを含む）

以下は自動変更しない（必要なら要確認リストへ）。

- highlightComment
- SEO文言・タイトル・説明文・体験タグ・検索意図に影響する文章
- dates・eventStatus・開催年度
- 大きなUI変更・新機能追加

判断に迷うものは変更せず、要確認リストへ追記する。

## 静的コンテンツ・ハブページ・検索インデックス再生成

backgroundImage・atmosphereMedia・mapReference.lat/lng・notableDesignationの
いずれかを1件以上反映した場合、**そのcommitの前に**以下をすべて実行する
（素材の反映がなく、research/配下のメモのみの変更の場合は不要）。

```
node matsuri/scripts/generate-static-content.js {変更したslug1} {変更したslug2} ...
node matsuri/scripts/generate-feature-hub-pages.js
node matsuri/scripts/generate-prefecture-hub-pages.js
node matsuri/scripts/generate-region-hub-pages.js
node matsuri/scripts/generate-month-hub-pages.js
node matsuri/scripts/generate-search-index.js
```

理由：`generate-static-content.js`は詳細ページのEvent JSON-LDにimage・geoを
書き込むため、data.js更新後に再実行しないとJSON-LDが古いまま残る（変更した
slugのみを指定する）。ハブページのカードはatmosphereMedia/backgroundImageを
サムネイルとして直接使うため、4つのハブ生成と検索インデックスは
全件を決定論的に再生成する（部分実行はできず、軽いので4つとも実行する）。

実行後、`git status`で該当ファイルに想定外の差分がないか確認する。

## テスト（自分が変更した祭りに限る）

変更した祭りについて、commit前に以下を確認する。

- `node --check`（変更した`data.js`）
- `git diff --check`
- 変更後に`node matsuri/scripts/check-data-integrity.js`を1回実行し、
  **今回の変更が原因のhard issueが無いこと**を確認する（終了コードと、
  変更したslugに関する出力だけを見る。他の祭りの出力は読み込まず、調査も
  報告もしない。他に気づいた不整合は要確認リストへ回す）
- backgroundImage採用時：詳細ページヒーローを390×844と1440×900で確認し、
  文字重なり・アスペクト比崩れがないこと
- atmosphereMedia採用時：詳細ページのギャラリー表示・クリック展開が正常に
  動作すること
- console errorがないこと、横スクロールが発生しないこと

`node --check`、`git diff --check`、今回の変更が原因のhard issue、または
今回の変更によって生じた機能不具合がある場合は、その祭りの反映を取り下げ、
見送りとして記録する（他の祭りの作業は続ける）。

既存の表示不具合や、今回の変更が原因ではない文字重なり・アスペクト比崩れ・
横スクロール・console errorを発見した場合は、要確認リストに対象ページ、
再現条件、症状を追記する。それだけを理由に素材調査・反映・commit・push
を止めない。表示不具合そのものは本タスクで修正しない。

## 反映（commit・push）

- **1祭り1コミット**を原則とする（`git revert`で個別に取り消せる単位）。
  メモのみの更新（途中経過・要確認リスト・キュー補充）は、別コミットまたは
  対応する祭りのコミットに含めてよい。
- commit後、上記「実行環境の強制確認」のとおりpush前に`git fetch origin`を行い、
  問題がなければ既存運用ルールに従いmainへ反映する。
- 反映後は、mainへのpushが成功したこと（commit hash）を確認する。

## IndexNow通知

commit・push・Pages反映（本番200）まで完了し、公開ページ（`index.html`）を
1件以上変更した場合のみ、次を実行する。

```
node matsuri/scripts/indexnow-notify-changed.js --from {作業開始時のorigin/mainのSHA} --to HEAD
```

- 変更のない回、またはresearch/配下のメモのみの回は実行しない
- 本番が200のページだけが通知される。失敗しても作業は続行し、出力を
  そのまま完了報告に貼る（リトライしない）

---

## 完了報告（必須項目。2026-11-10改訂）

**報告の冒頭（1〜3行目）に、次の3項目を必ず書く。** この3項目が書かれて
いない報告は未完了として扱う。

1. **追加した件数**：画像（backgroundImage）N件／動画（atmosphereMedia）N件／
   位置情報（mapReference.lat/lng）N件。対象の祭り名・slugを併記する
2. **commit hash**：今回pushしたすべてのcommit（メモのみのcommitも含める）。
   push前に`git log origin/main --oneline`等で、実際にmainへ入っている
   ことを確認したhashだけを書く。commitが0件の場合は「commitなし」と書く
3. **0件で終わった場合の理由（1行）**：追加が全種類で0件のときのみ、
   `0件の理由：…`の1行を書く。例：「3件とも基準を満たす素材なし（記録済み）」
   「着手前に環境確認で停止」「調査途中で時間切れ（途中メモをcommit済み）」。
   理由なしの「0件」は不可

続けて、次を簡潔に報告する（冗長な再掲は不要）。

- 完走した祭り：祭り名・slug・結果（採用／見送り＋理由の種別）
- `in_progress`のまま残した祭り（あれば）：slugと次回やること
- キューの状況：`queued`／`in_progress`／`done`の件数
- 要確認リスト：今回追記した件数、`open`の累計件数
- 静的コンテンツ・ハブページ・検索インデックス再生成：実行有無、対象slug
  （素材の反映0件の回は「該当なし」）
- 派生ファイル競合の自動解消：発生有無（発生時は対象ファイル数）
- 表示確認で見つけた既存不具合：要確認リストに追記した旨（なければ「なし」）
- 見送り件数と理由
- 次回改善候補

日次では、反映後のbackgroundImage／atmosphereMedia／mapReference.lat/lng
未設定件数（母数含む）の集計は求めない（週次側の担当）。

---

## 変更履歴

```
2026-09-15（新設）
    Codexプロンプトを毎回チャットで書き換える運用の負荷を下げるため、
    実運用プロンプトの全文を本ファイルへ移設。atmosphereMediaの優先度を
    backgroundImageと同等へ引き上げる改訂と、mapReference.lat/lngの
    品質改善対象への追加を反映済みの状態で新設。

2026-09-16（開催直前祭りの先回り対応を最優先枠に追加）
    Search Console直近7日の実測で、上位クエリ・上位ページが軒並み
    「1〜2ヶ月以内に開催予定の祭り名＋年」のロングテール検索だったことを
    確認し、対象選定に「開催まで概ね1〜2ヶ月以内」を最優先枠（0番）として
    追加した。

2026-09-19（0番枠に重複排除ルールが無かった不具合を修正）
    0番枠にも重複排除（直近7日以内に確認済みなら除外）を追加し、残りの
    調査枠を1〜4番へ必ず充てることを明記した。

2026-09-29（静的コンテンツ・ハブページ・検索インデックス再生成ステップを追加）
    data.js更新後にEvent JSON-LDとハブのサムネイルが古いまま残る問題への
    対応として、再生成ステップを追加した。

2026-10-06（派生ファイルのマージ競合を自動解消するルール／
            notableDesignation設定済み祭りのhighlightComment補完を追加）
    詳細は`task-new-festival-addition.md`の変更履歴を参照。

2026-10-13（eventStatus例外修正を追加）
    週次データ整合性チェックの停止中に`eventStatus`未更新が23件蓄積した
    事例を受け、`confirmed_but_all_past`のみ本タスクでも直接修正できる
    例外を追加した。

2026-10-20（IndexNow通知を追加／eventStatus例外をスクリプト化）

2026-11-10（日次の運用を「完走できる量」に組み替え：Founder決定）
    背景：連日「未完了・素材追加0件・commit 0件」で終わっていた。全件の
    整合性チェック（重大な問題0件）は終わるが、所定の20件の調査と採否判断
    が終わらず、画像・動画・位置情報の追加が0件、途中経過がどこにも残らず
    毎回ゼロから始まっていた。原因は、(1)1回のノルマが大きすぎる、
    (2)進捗が残らない、(3)人の確認が要る項目が本流を止める、にあると
    判断し、次の5点を変更した。
    1. 1回の単位を「20件調査」から「3件を調査→採否→反映→commitまで
       完走」へ変更（件数より完走を優先。上限3件、1祭り候補5件確認まで）
    2. 作業キュー（research/quality-queue.json）と調査メモを追加し、
       次回は続きから開始。時間切れ時も途中メモをcommit・pushしてから
       終了することを必須化（蒸発禁止）。1祭り終了ごとにcommit・push
    3. 全件の整合性チェックを日次から外し、週次タスクの担当に分離。
       日次は素材追加に絞り、テストは変更した祭りに限定。あわせて
       eventStatus例外修正（10/13追加）を廃止（日次cronが担当）
    4. 完了報告の冒頭に「追加件数」「commit hash」「0件の場合の理由1行」を
       必須化
    5. 人の判断が要る項目は要確認リスト（research/quality-review-list.md）
       へ隔離し、本流を止めない。highlightComment補完（-1番）も判断を
       要するため、素材調査＋要確認リスト追記へ変更
    採用基準・品質基準（atmosphere-media-guide.md）は変更していない。
```
