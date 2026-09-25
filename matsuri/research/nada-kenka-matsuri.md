# 灘のけんか祭り 調査記録

- 確認日: 2026-08-28
- 判定: 掲載

## 範囲・2026年・features

通称「灘のけんか祭り」と正式な祭礼「松原八幡神社秋季例大祭」の関係を姫路観光コンベンションビューロー公式で確認し、この祭礼だけを扱う。2026年10月14日宵宮、15日本宮を確認したためconfirmed。屋台と神輿の公式記載によりhasDashi・hasMikoshi・hasParadeをtrueとした。highlightCommentは屋台の練り競いと三基の神輿合わせを根拠とした。

## 素材

素材探索は行わず `backgroundImage: null`、`atmosphereMedia: []`。

## 一次情報

- https://www.himeji-kanko.jp/feature/17/
- https://himeji-kanko.jp/fc/article.php?eid=00147

## backgroundImage・atmosphereMedia調査（2026-09-01 夜）

自治体・神社・観光協会・公式運営等の一次情報ページと公式動画候補を調査したが、今回の調査時間内に動画ページ上で投稿者・内容を直接確認でき、既存基準をすべて満たす素材候補を特定できなかった。推測で採用せず、backgroundImage・atmosphereMediaとも未設定を維持する。

### 2026-09-14 毎日品質改善
- backgroundImageを優先し、同じ探索でatmosphereMedia候補も調査。画像・動画ページを採用基準どおり直接確認できる候補を確定できなかったため、推測で採用せず見送り。

### 2026-09-25 毎日品質改善

- 採用候補: [灘のけんか祭り…兵庫・姫路市](https://www.youtube.com/watch?v=vaUu6KwjKmY)。動画ページ上で投稿者「読売新聞オンライン動画」、登録者12.9万人、2023-10-20公開、1分50秒、1,692回視聴を直接確認。説明文と本編で本宮の神輿合わせ、屋台、巡行を確認した。全国紙の現地取材映像で、短時間に祭りの複数要素を伝える代表動画として採用。`publisherType`はガイドに従い`local_media`、`publishedYear`は2023年。
- backgroundImage: 同動画のデフォルトサムネイルを直接確認。文字・ロゴがなく、三基の神輿と担ぎ手を鮮明に捉えて主役を判別できるため、優先度1で採用。`thumbnailVariant`は設定しない。
