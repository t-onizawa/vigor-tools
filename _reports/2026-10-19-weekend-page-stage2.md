# 今週末の祭り・段階2 実装／検証報告

状態：実装済み・認証権限不足により未push。本番検証未完了。

## 実装

- 実装コミット：`dcee3022d21658bc0edb5e14438760ac287f71c7`
- 毎日04:07 JST（UTC `7 19 * * *`）、手動実行、mainの`matsuri/festivals/**`へのpushで起動。
- 手動入力`simulate_failure`はboolean。trueの場合は生成・push前にexit 1。
- Node 22で`--summary`生成、SUMMARYをStep Summaryへ転記、`--check`と既存テストを実行。
- `::warning::`を加工せず標準出力へ流してActions注釈として扱う。
- 段階2専用チェックでnoindex,follow・トップリンクなし・sitemap登録なしを検証。
- 生成HTMLのみstageし、差分がなければコミットしない。concurrencyで直列化。
- fetch/rebase後にも整合性をチェック。競合・不整合・push拒否はジョブ失敗。再試行なし。
- Pagesビルドを明示要求し、最大10分間状態を監視。対象SHAのビルド成功と本番HTMLのバイト一致を成功条件にする。
- 差分なしでも明示ビルドと本番照合は実施する。コミットは増やさない。

## Pages構成と採用理由

GitHub APIで既存設定を確認：build_type=legacy、source=main:/、独自ドメインvigorlab.net。
既存の標準Pagesビルド実績：run 39203830940、SHA 73e6c0be、success。

採用案：GITHUB_TOKENのcontents:write/pages:writeで更新し、POST /repos/{owner}/{repo}/pages/buildsを明示呼出し。
既存のJekyllと_config.ymlのexcludeを維持でき、PAT保存やサイト全体のビルド方式変更が不要。
ただしActions内のGITHUB_TOKENによるAPI実行は未実測のため、採用案の成立確認は残っている。

比較：

- PATでpush：通常のpushトリガーを利用できるが、追加シークレット・期限・権限管理が必要。今回は不採用。
- actions/jekyll-build-pagesとdeploy-pagesを組込み：PAT不要だが、既存の全サイトデプロイ方式の切替が必要。現方式が成立しない場合の代替案。
- 既存PagesビルドAPIの明示要求：変更範囲が最小。APIはGitHub App installation tokenとPages writeをサポートする。

参考：https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build

## 実施済み検証

- 既存の12テスト成功。
- YAMLのcron・手動入力・push対象を検査。全runステップのbash -n成功。
- メモリ上で初回差分／2回目差分なしを検証済み。
- 現行本番HTMLと段階1のローカルHTMLはバイト一致（curl、internal=1付与）。
- 既存の祭りデータ・トップ・sitemapに変更なし。
- 実際のActions更新確認用に生成元コメントを追加。生成HTML自体は手元では更新せず、初回Actionsに生成させる。

## ブロッカーと未検証事項

HTTPSのgit pushはOAuth Appにworkflowスコープがなく拒否された。
SSH接続はHost key verification failedで失敗。ホスト検証を無効化する回避は行っていない。
現在のgh認証はrepo等のスコープのみ。workflow定義はリモートに存在しないため手動起動は404。

- Actionsからmainへのpush実績：未確認。
- この実装によるPages再デプロイ実績：未確認。
- この実装による本番HTML一致：未確認（段階1の一致のみ確認）。
- weekend-page.ymlの最終成功日時：なし。
- simulate_failure=trueの実行：未実施。GitHub側のfailure、通知先アカウント、メール受信は未確認。
- cron／pushトリガーの実発火：未確認（定義検証のみ）。

## 再開方法とFounder確認

1. Founderが`gh auth refresh -h github.com -s workflow`で認証権限を追加するか、同等権限の認証を用意する。
2. fetchして差分確認後にpush。手動simulate_failure=falseを実行し、Actionsの生成コミット、main、Pagesビルド対象SHA、本番HTMLの一致を確認。
3. 差分なし実行でコミットが増えないことを確認。
4. simulate_failure=trueを実行し、Actionsでfailureと後続処理が実行されないことを確認。
5. FounderがGitHubのActions通知設定、通知先アカウント・メール受信を確認する。メール通知をこの報告では確認済みとしない。
6. `gh run list --workflow weekend-page.yml --status success --limit 1`で成功日時を記録する。

段階3（index,follow、トップリンク、sitemap登録）は別途Founder承認が必要。

## 変更ファイル

- `.github/workflows/weekend-page.yml`
- `matsuri/scripts/check-weekend-stage2.js`
- `matsuri/scripts/generate-weekend-page.js`
- 本報告ファイル（非公開の_reports配下）
