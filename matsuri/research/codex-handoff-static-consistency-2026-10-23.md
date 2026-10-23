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
