# Codex週次保守担当への変更案：静的ページ整合性チェックの組み込み — 2026-10-23

**これは変更案であり、MATSURI PMは既存のScheduled Task・workflowを変更していない。Codex側の担当と、Founderの承認のもとで反映する。**

## 目的
data.js（唯一の正）と、生成済みの静的HTML・ハブ・検索インデックスの食い違いを、週次保守で検知する。**読み取り専用・自動修正なし**。

## 追加するステップ（task-weekly-data-maintenance.md の「機械チェック」節への挿入案）

```
- 静的ページ整合性チェックを実行する（読み取り専用）:
    node matsuri/scripts/check-static-consistency.js --baseline matsuri/research/static-consistency-baseline.json
  - 出力のERROR/WARN/INFOの件数と、基準値（2026-10-23: ERROR 10 / WARN 56 / INFO 15）からの増減、
    新規（+）・解消（-）の項目を、完了報告にそのまま貼る。
  - 基準値より増えた項目（新規ERROR・新規WARN）は、原因を一次調査し、報告する。
  - **本タスクでは修正しない。** head文言（title・description・og・twitter）の修正は、
    Founder承認が必要な更新（matsuri/CLAUDE.md 8-4）。data.js起点の修正（schedule等）は
    8節の委任範囲に従う。
  - スクリプトが存在しない・エラー終了した場合は、`git ls-tree origin/main` で存在を確認し、
    失敗として報告する（確認済み扱いにしない）。
  - 基準値ファイル（static-consistency-baseline.json）は本タスクで更新しない。更新はPMがFounder承認後に行う。
```

## 判断基準（報告時）
- `status.stale-pending`（終了済み・確定済みなのにtitle/descriptionが「開催予定」等のまま）が増えた → 日次cronのended化後にheadが更新されないことが原因。報告のみ（修正は承認待ち）。
- `og.title` / `twitter.title` が `title` と異なる → ERROR。報告する。
- `jsonld.*` のERROR（日付不一致・Event欠落・eventStatus不一致）→ 最優先で報告。
- `hub.*` / `searchIndex.*` のERROR → 派生ファイル再生成漏れの可能性。`generate-*` の再実行で解消するか報告（再生成の実行は既存の手順どおり）。
- `jsonld.subevent-approx`（WARN）→ 目安・終了時刻のsubEvent出力。件数を記録（生成ロジックの課題としてFounder承認待ち）。

## 役割の重複がないことの確認
- 日次cron: ended化（auto-end）と今週末ページ更新のみ。head文言は更新しない。
- 週次保守（本変更）: 検知と報告のみ。修正は行わない。
- 毎日の品質改善・新規追加: 本チェックとは対象が異なる（素材補完・新規追加）。
- 公式情報確認台帳（PM）: 開催前の公式更新の確認。本チェックとは独立。

## 基準値
`matsuri/research/static-consistency-baseline.json`（2026-10-23保存・339件対象）。
- ERROR 10（終了済みなのに「開催予定／日程未発表」が残る10ページ）
- WARN 56（subEventの目安時刻40、og/twitter description の別文面10、確定済みで「開催予定」が残る4、他2）
- INFO 15（日付のない旧形式タイトル・説明など設計上の差）

---

## 状況メモ（2026-10-26 PM追記）— Codex担当への引き渡し

**確認結果:** コミット `b3c5751b`（週次データ保守 2026-10-26）のレポートには、静的整合性チェック（`check-static-consistency.js`）が**含まれていない**。`task-weekly-data-maintenance.md` も 2026-10-23（`fea49489`）から更新がなく、本ファイルの変更案は未反映。MATSURI PMはworkflow・Scheduled Taskを変更していない（変更はCodex担当・Founder側）。

**重複しない根拠（週次レポートの現行項目との差）:**
- 週次レポートの「詳細ページ canonical / JSON-LD：問題0件」「開催日と eventStatus の整合：ended矛盾0件」は、data.js側の整合とcanonical/JSON-LD構造の検査。静的HTMLのtitle・description・og・twitter・H1・ハブカードとdata.jsの突き合わせはしていない。
- 実際に、同じ週次レポートが「ended矛盾0件」と報告した2026-10-26時点で、本チェッカーは終了済みなのにheadに「開催予定」が残るページを8件検出している（下記）。この種の異常は現行の週次項目では検知されない。

**2026-10-26時点のチェッカー出力（PM修正後・origin/main反映前の作業ツリー）:** ERROR 8 / WARN 14 / INFO 11（353件対象）
- ERROR 8件は全て `status.stale-pending`（終了済みなのにhead文言が「開催予定」のまま）: funabashi-daijingu-reitaisai / ikegami-honmonji-oeshiki / kanada-inari-jinko-sai / kanuma-imamiya-matsuri / niihama-taiko-matsuri / ohara-hadaka-matsuri / umi-hachimangu-hojoya / yokosuka-mikoshi-parade。日次cronのended化（status変更）後にheadが再生成されないことが原因。報告のみ（修正はFounder承認後にPMが個別に実施）。
- PMがFounder承認の下で本日修正済み: 秩父龍勢祭り・あんなか祭り・下仁田秋まつり・若松みなと祭り（head）、JSON-LD subEvent（25ページ・40件）。

**Codex担当にお願いしたいこと（実施判断はFounder/Codex）:**
1. `task-weekly-data-maintenance.md` に、本ファイル「追加ステップ」の1項目（`node matsuri/scripts/check-static-consistency.js --baseline matsuri/research/static-consistency-baseline.json`、読み取り専用）を追加し、週次レポートの表に「静的ページ整合性」行を足す。
2. 失敗（スクリプト不在・エラー終了）は「確認済み」にせず失敗として記録する。
3. 基準値ファイルは週次タスクでは更新しない（PMがFounder承認後に更新）。

### 2026-10-26 基準値更新（Founder承認済み）
Founder承認の下でhead修正12件（秩父龍勢・あんなか・下仁田・若松・鹿沼・新居浜・横須賀・船橋・池上・大原・金田・宇美）とJSON-LD subEvent修正（25ページ）を実施した結果を新基準値として保存した。
- 新基準値: ERROR 0 / WARN 14 / INFO 14（353件対象）。旧基準値（2026-10-23: ERROR 10 / WARN 56 / INFO 15）はgit履歴に残る。
- **ERROR 0は「正常」の判定ではない。** チェッカーが検査する項目（head文言・JSON-LD・ハブカードとdata.jsの整合）に矛盾が検出されないという意味に限る。残るWARN 14（og/twitterの別文面、確定済みで「開催予定」が残る等）とINFO 14（日付のない旧形式title等）は未解決の確認事項で、事実の正しさ（公式との一致）は検査していない。
- 「例年」表記に直したページ（船橋・池上・大原）は、設計上 title/description の日付なしINFOが新規に出る（意図した表記）。
- 週次保守への組み込み案（上記「追加ステップ」「報告基準」）は未反映のまま。実施はCodex担当・Founder判断。MATSURI PMはworkflowを変更していない。
