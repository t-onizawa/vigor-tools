# AGENTS.md — Codex向け repo共通ルール

このファイルはCodexが自動で読み込む前提の指示書。人間・Claude Code向けの
詳細な方針は`CLAUDE.md`（Codexは読まない）を参照。作業対象がtools/や
matsuri/に関わる場合は、可能なら該当ディレクトリの文脈
（`matsuri/CONCEPT.md`・`matsuri/schema-design.md`・`Backlog.md`等）も
読んでから作業する。

## リポジトリ構成

```
/
├── tools/      VIGOR TOOLS（小ツール群）
└── matsuri/    VIGOR MATSURI（祭りガイド）
```

tools/とmatsuri/は別プロダクト。root直下・共通アセット（`assets/`）・
`robots.txt`・`sitemap.xml`の大規模変更は、担当タスクの範囲を超える。

## sitemap.xml：追記のみの例外あり

- 自分のタスクで新規ページ（祭りページ等）を作成した場合、**そのページ
  分だけ**、既存の`<url>`エントリと同じテンプレートで`</urlset>`直前に
  追記してよい。
- 禁止：既存エントリの並び替え・削除・書式変更・複数ページの一括登録。
  これらは統括担当（人間）の作業。
- 追記後は、sitemap.xmlがXMLとして正しくパースできることを確認する。

## 共有ファイルを扱うときの注意

`Backlog.md`・`matsuri/Backlog.md`・`CLAUDE.md`・`Roadmap.md`等は
複数のセッション/タスクが並行して書き込む可能性がある共有ファイル。

- 自分の担当範囲外の内容を書き換えない（既存の記述を消さない・
  上書きしない）。追記は末尾または明確に自分の担当セクションに限定する
- push前に必ず`git fetch`/`git pull`し、他のコミットと分岐していないか
  確認する。分岐していた場合は自動マージを試み、コンフリクトが出たら
  自分の変更を優先して安易に解決せず、変更内容を報告してユーザーに委ねる

## 禁止事項（明示の指示がない限り）

- 破壊的なgit操作（force push、`git reset --hard`、履歴の書き換え）
- note等、外部サービスへのコンテンツの自動公開（下書き作成までは可、
  公開は人間が行う）
- 新しいScheduled Task/定期実行タスクの追加
- 本文・CSS・JS等、依頼されたスコープ外のファイルの変更

## コミット規約

- コミットメッセージは日本語
- prefixを使う：`add:` `fix:` `improve:` `refactor:` `docs:` `seo:`
  `ui:` `feat:` `content:` `report:` など、変更の性質を先頭に明記する
- 1コミット1意図。複数の意図が混ざる場合は分割する
- 明示の指示がない限りコミットはするがpushはしない
  （レビュー後に人間またはClaude側でpushする運用が基本。ただし
  Scheduled Taskとして「pushしてよい」と明示されたタスクは、そのタスクの
  指示に従う）

---

```
変更履歴
2026-08-07（初版制定）
  Codexが読む共通ルールの受け皿がなく、CLAUDE.mdを更新しても
  Codexタスクへ反映されない問題（matsuri祭り追加時のsitemap.xml
  登録漏れ11件）を受けて新設。sitemap.xml追記の例外、共有ファイルの
  扱い、禁止事項、コミット規約を明記した。
```
