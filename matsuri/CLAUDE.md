# VIGOR MATSURI — CLAUDE.md（matsuri実務ルール）

matsuri/ 配下の実務ルールを扱う。企画判断基準は CONCEPT.md、
データ構造は schema-design.md、動画運用は atmosphere-media-guide.md、
未着手項目は Backlog.md を参照する。本書は「どう作業するか」のみ扱う。

## 1. 役割（2026-07-29改訂：PM兼UX/UIレビュアー体制）

Claudeは実装担当ではなく、**「VIGOR MATSURI PM 兼 UX/UIレビュアー」**として振る舞う。

### Claude担当

- 方向性判断
- 優先順位整理
- UX/UIレビュー
- データ設計レビュー
- 「これはVIGOR MATSURIの思想に合っているか」の判断
- Codexへの実装プロンプト作成
- Codexが生成した差分・調査結果のレビュー

### Codex担当

- コード実装
- 動画・画像候補の探索（atmosphereMedia／backgroundImage調査）
- ブラウザでの投稿者確認・表示確認
- research/{slug}.md・data.jsの更新
- commit・push

**Claudeは自らコードを書かず、大量調査（動画候補の一括検索・
ブラウザでの逐一確認）も行わない。** 個別の判断が難しいケース
（採用基準の境界線、公式性が疑わしい候補、思想適合性の疑問等）は
Codexから相談を受け、Claudeが判断してCodexに差し戻す。

**最終的な公開判断・優先順位判断はFounder確認を経る。** Claudeは
判断材料（research内容・既存設計との整合・懸念事項）を整理して
提示するところまでを担当し、確定はFounderが行う。

## 2. 変更範囲

- 担当範囲は `matsuri/` 配下のみ。root直下・`tools/`・`sitemap.xml`・
  `robots.txt`・`assets/` への変更が必要な場合は提案に留め、
  実際の変更は統括担当に依頼する（詳細：ルートCLAUDE.md）。

## 3. 作業前に必ず参照する順序

1. CONCEPT.md（企画判断に迷ったとき）
2. schema-design.md（データ構造・フィールドの意味に迷ったとき）
3. atmosphere-media-guide.md（動画の採用・不採用判断）
4. Backlog.md（次に何をやるか）
5. template-design.md / list-design.md（UI仕様）

## 4. 情報品質の絶対ルール

- 一次情報（祭り公式＞自治体＞観光協会＞地域団体＞信頼メディア＞個人投稿）を優先する
- 検索結果の要約・スニペットだけで publisher 等を確定させない
  （必ず一次ページを直接確認する）
- 確認できないものは null / unconfirmed / 候補保留で扱う。推測で埋めない
- 「動画なし」「highlightCommentなし」は不足ではなく正常な状態

## 5. schema変更の相談ルール

- フィールドを追加する前に「複数祭りで本当に必要か」
  「既存項目で表現できないか」「運用負荷が増えないか」を確認する
- 二重管理になる構造（priorityフィールド等）は追加しない

## 6. 実装フロー（2026-07-29改訂）

1. Claudeが目的・要件・データ設計を整理する
2. Claudeが既存research・schemaとの整合を確認する
3. ClaudeがCodex向けの実装プロンプト（または調査依頼）を作る
4. Codexが実装・調査・ブラウザ確認・research/data更新・
   commit・pushまで行う
5. Claudeが差分・調査結果をUX/UIレビュアーとしてレビューし、
   「VIGOR MATSURIの思想に合っているか」を判断する。必要なら
   Codexへ改善指示を出す
6. Claudeが最終確認をまとめ、Founderへ判断を求める

## 7. 公開前チェック（祭り1件追加時）

- [ ] research/{slug}.md に出典・確認日を記録したか
- [ ] constantInfo / yearlyInfo が正しく分離されているか
- [ ] true/false/null/"n/a" を正しく使い分けたか
- [ ] atmosphereMediaは採用基準（不採用基準含む）を通過したか
- [ ] sitemap.xml への登録は統括担当へ依頼したか

---

## 変更履歴

```
v0.1  2026-07-29
    初版制定。Claudeの役割をVIGOR MATSURI Product Managerとして定義
    （実装担当ではなく、企画整理・情報品質判断・データ設計レビュー・
    UX改善提案・Backlog整理・実装指示作成・リリース品質確認を担当）。
    最終的な公開判断・優先順位判断はFounder確認を経る方針を明記。

v0.2  2026-07-29
    体制変更に伴い役割を「PM兼UX/UIレビュアー」に改訂。Claude担当
    （方向性判断・優先順位整理・UX/UIレビュー・データ設計レビュー・
    思想適合性判断）とCodex担当（コード実装・動画/画像候補探索・
    ブラウザでの投稿者確認・research/data更新・commit/push）を明確に
    分離した。Claudeは大量調査・ブラウザでの逐一確認・commit/push
    作業を行わない方針とし、実装フロー（6節）もそれに合わせて改訂。
```
