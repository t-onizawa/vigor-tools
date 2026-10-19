# 今週末の祭り・段階2 実装／検証報告

初回報告時点の状態：実装済み・認証権限不足により未push。本番検証未完了。
その後Founderがworkflow権限を付与し、本番検証を再開。結果は末尾の追記を参照。

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

## 権限付与後の本番検証（2026-10-19追記）

- dcee3022と4bc50e41をmainへpush済み。
- 失敗検証：run [39205238211](https://github.com/t-onizawa/vigor-tools/actions/runs/39205238211)。simulate_failure=true、05:34:25 UTCにfailure確定。生成・コミット・Pages処理はすべてskipped。
- 実際の失敗メールをGmailで確認。受信先tetsuya.onizawa@gmail.com、送信元notifications@github.com、Date 2026-10-19 05:34:45 UTC（14:34:45 JST）、件名「[t-onizawa/vigor-tools] Run failed: Update weekend page - main (4bc50e4)」。本文のrun URLが39205238211で一致。INBOXラベルあり。通知設定を変更せず受信確認できた。
- 初回通常検証：run [39205262435](https://github.com/t-onizawa/vigor-tools/actions/runs/39205262435)、05:35:38 UTCにsuccess。
- SUMMARY：date=2026-10-19 changed=true weekend=10/24-10/25 confirmed_weekend=6 upcoming=9 warnings=0。
- botが`bc6c7c080489334b50bf92cbbda4dbf440d20269`を作成し、mainへpush。祭りデータは変更していない。
- 明示Pages要求はGITHUB_TOKENで成功。Pages run [39205279764](https://github.com/t-onizawa/vigor-tools/actions/runs/39205279764)は生成SHA bc6c7c08で成功。既存Jekyll/legacy方式を維持し、PATやサイト全体のデプロイ方式変更は不要だった。
- 本番HTMLと生成HTMLはcmp成功。独立したキャッシュ回避URLでもHTTP 200、Age: 0、X-Cache: MISS、Last-Modified: 2026-10-19 05:35:27 GMTで一致。
- SHA256：`bdfe94765096b4fcb4f5ce227aa3566a7f8b745489db42d8f16e0f121fe462ac`。
- キャッシュ回避の追加コミット：`830efb14`、応答ヘッダー記録：`214b6cca`。internal=1を維持し、weekend_run=run ID-実行回数とshaパラメータ、Cache-Control: no-cacheを追加。照合URL・Age/X-Cache等をStep Summaryへ保存する。
- 段階2チェックは維持。段階3ではFounder依頼に合わせて削除または差し替える。

### 最終結果

段階2の手動本番検証は完了。

- キャッシュ回避版の通常run：[39205387045](https://github.com/t-onizawa/vigor-tools/actions/runs/39205387045)。開始2026-10-19 05:35:55 UTC、最終成功2026-10-19 05:37:11 UTC（14:37:11 JST）。
- `gh run list --workflow weekend-page.yml --status success --limit 1`で同runがcompleted / successとして表示された。CLI既定出力の日時は開始日時であり、完了日時は`gh run view 39205387045 --json updatedAt,status,conclusion`でも照合した。
- SUMMARYはchanged=false、--checkとSTAGE2チェック成功。mainは214b6ccaのまま、差分なし時にコミット・pushが増えないことを確認。
- Pages run [39205404224](https://github.com/t-onizawa/vigor-tools/actions/runs/39205404224)は214b6ccaを対象にsuccess。Pages APIもstatus=built、commit=214b6cca、updated_at=05:37:08 UTC。
- workflow内の一度のcurl・cmpによる照合が成功。run ID・実行回数・SHAを含むURLとno-cacheヘッダーを使用。
- 独立した未使用URLでも本番HTMLを照合：HTTP 200 / Age: 0 / X-Cache: MISS / Last-Modified 05:37:07 GMT。SHA256は前述と同じ。今回の本番照合にキャッシュ起因の誤検知は見られなかった。
- 再試行機構なし。Pages状態監視のみ。通常pushとAPI要求に伴う標準Pages runの一部はGitHub側でcancelledになったが、上記対象SHAの最終Pages runとweekend-page runはいずれもsuccess。
- 追加変更ファイル：`.github/workflows/weekend-page.yml`（キャッシュ回避）、本報告書。bot生成分は`matsuri/this-weekend/index.html`。
- noindex,follow、トップリンクなし、sitemap未登録を最終確認。check-weekend-stage2.jsは変更していない。

残課題：cronと祭りデータpush起動は定義検証のみで、実発火は未観測。祭りデータを検証目的で変更していない。毎日の自動実行の継続性や将来の全地点のCDN挙動を保証するものではない。通知については今回の失敗runと一致する受信メールを実確認済みであり、追加のFounder確認は不要。段階3への移行のみ別途Founder承認が必要。
