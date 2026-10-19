# 今週末の祭り・段階3 正式公開報告

Founder承認日・公開日：2026-10-19。正式公開と本番検証を完了。

## コミット順と公開

1. matsuri側の元コミット`508e67ef`をcherry-pickし、`6c557cee`としてmainへ取り込み。
2. root側コミット`59e6abcc`をその上に作成。
3. `89e0f17c..59e6abcc`を1回のpushでmainに反映。途中のindex化のみの状態はpushしていない。

## root側変更

- sitemap.xml：既存書式で`</urlset>`直前に1件だけ追記。loc=https://vigorlab.net/matsuri/this-weekend/、lastmod=2026-10-19、changefreq=weekly、priority=0.6。既存エントリは変更していない。
- .github/workflows/weekend-page.yml：生成後とfetch/rebase後の両方で`node matsuri/scripts/test-weekend-page.js --release-gate`を実行。既存の通常テスト実行をrelease-gate付きへまとめ、段階2チェック呼出しを置換。
- matsuri/scripts/check-weekend-stage2.js：削除。
- 本報告書は公開後の実測結果として_reports配下に追加。公開のpushを1回に保つため、報告コミット自体はローカル保存とする。

## 検証結果

- sitemapのXML解析成功。既存471件を維持し末尾に1件追加、計472件。対象URLは1件のみ。
- YAMLのrunステップはbash -n成功。
- ローカルの生成--check、12テスト、公開ゲート3項目すべて成功。
- 手動Actions：[39205975251](https://github.com/t-onizawa/vigor-tools/actions/runs/39205975251)、workflow_dispatch / simulate_failure=false / success。
- 開始2026-10-19 05:42:57 UTC、完了05:44:16 UTC（14:44:16 JST）。
- Actionsログでも12テストと公開ゲート（index・トップリンク・sitemap）全項目達成を、生成後とrebase後の2回確認。
- SUMMARY：date=2026-10-19 changed=false weekend=10/24-10/25 confirmed_weekend=6 upcoming=9 warnings=0。生成差分なし、botによる追加コミットなし。
- 既存のPagesビルド要求成功。Pages run [39205994428](https://github.com/t-onizawa/vigor-tools/actions/runs/39205994428)はsuccess、対象SHA=`59e6abcc63a8cfe27de4964ffbb6b7773b3b3b08`。
- Pages API：status=built、対象SHA一致、updated_at=2026-10-19 05:44:10 UTC。
- workflow内の本番HTML照合成功。独立検証でも以下3ファイルはすべてmainとcmp一致。
  - /matsuri/this-weekend/：HTTP 200、meta robots=index,follow。
  - /matsuri/：`<a href="/matsuri/this-weekend/">今週末の祭りを見る →</a>`の静的リンクあり。
  - /sitemap.xml：471→472件。旧リストをそのまま維持し、末尾1件のみ追加。
- 本番ページのSHA256：`b63de77266ea445206e19adbbb48c028bbc6ad373f8c5227b700843f74ff8fcb`（mainと一致）。
- 独立検証URLはinternal=1とrun IDを含む未使用クエリを付与。HTTP 200、Age: 0、X-Cache: MISS、Last-Modified: 2026-10-19 05:44:10 GMT。今回のキャッシュ起因の誤検知なし。
- `gh run list --workflow weekend-page.yml --status success --limit 1`でもrun39205975251を確認。CLI既定表示の日時は開始日時。

## 残課題

実装・手動本番検証に未完了項目なし。毎日のcronと祭りデータ更新pushによる実発火は今後の運用で確認する。正式公開は検索エンジンへのインデックス登録完了を意味しない。
