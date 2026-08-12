# 坂戸よさこい 調査記録

- 確認日: 2026-08-12
- 判定: 掲載（2026年開催確認済み）

## 範囲・同一性・開催主体

坂戸よさこい実行委員会が坂戸市文化会館ふれあ大駐車場と周辺道路の演舞会場で開催する「坂戸よさこい」を対象とする。2026年の正式名称は「第26回坂戸よさこい」、継続名称・通称は「坂戸よさこい」。会場内の出店を含む同一主催の1日行事をページ範囲とし、市制施行50周年の別行事は含めない。

公式サイトが主催を坂戸よさこい実行委員会、事務局を坂戸市商工労政課として明示し、坂戸市公式ページも同じ日付・会場を掲載しているため、開催主体が明確である。

## 2026年・スキーマ・見どころ判断

実行委員会公式サイトと坂戸市公式ページで2026年10月11日の開催、公式出店要項で11時から19時までの予定を確認したため `confirmed` とした。

山車・神輿を用いる祭りではないため `hasDashi: "n/a"`、`hasMikoshi: "n/a"`、山車上の踊りではないため `hasDanceOnDashi: false`。公式の祭り紹介が街中の演舞会場で行う「流し踊り」を明記するため `hasParade: true`、昼から夕刻・夜までの開催時間により `highlightTime: "both"` とした。highlightCommentは公式紹介の流し踊り、個性ある衣装、各チームの演舞という説明から作成した。

既存の南越谷阿波踊りが阿波踊りの連による流し踊り・舞台踊りを軸にするのに対し、本祭りはよさこいチームごとに異なる楽曲・振付・衣装の表現を街中の複数演舞会場で披露する点で区別できる。

## 素材

公式サイトが埋め込む公式YouTube動画をブラウザで再生し、発行者・内容・公開年を確認したため `atmosphereMedia` に採用した。動画サムネイルはイラストと大会名の文字が大きく、祭りの情景を代表する背景素材として不適合のため `backgroundImage: null` とした。

## 出典

- https://www.sakadoyosakoi.com/
- https://www.sakadoyosakoi.com/aboutus.html
- https://www.sakadoyosakoi.com/outline.html
- https://www.city.sakado.lg.jp/site/shiseishikou50syuunenn/59114.html
- https://www.sakadoyosakoi.com/images/store/Tent%20stalls.pdf
- https://www.youtube.com/watch?v=ClmWk0cJDB0
