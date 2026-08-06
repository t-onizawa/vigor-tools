# 南越谷阿波踊り 調査記録

- 確認日: 2026-08-07
- 判定: 掲載（2026年開催確認済み）

## 範囲・同一性・開催主体

南越谷阿波踊り実行委員会と一般社団法人南越谷阿波踊り振興会が「南越谷阿波踊り」として案内する、前夜祭と本祭を一体のページ範囲とする。2026年は「第40回 南越谷阿波踊り」と案内され、回次を除いた催事名は公式サイト全体で一貫している。7月の「南越谷プレ阿波踊り」や越谷市民まつりは別イベントのため含めない。

主催は南越谷阿波踊り実行委員会・一般社団法人南越谷阿波踊り振興会、共催は越谷市・越谷市施設管理公社。名称、開催主体、会場群が公式サイト内で明確に分離されている。

## 2026年・スキーマ・見どころ判断

公式トップページで第40回の前夜祭を2026年8月21日、本祭を22日・23日と確認し、2026年度参加連ページで95連、会場案内で会場別プログラムを確認したため `confirmed` とした。公式は開催当日の駐車場を用意しないと明記しているため `hasParking: false`。

阿波踊りは山車・神輿を前提としないため `hasDashi: "n/a"`、`hasMikoshi: "n/a"`。踊りは路上や舞台で行い山車上ではないため `hasDanceOnDashi: false`、流し踊りとして駅周辺を進むため `hasParade: true` とした。公式が明示する流し踊り・舞台踊り・組踊り・輪踊りをhighlightCommentに用いた。

既存の東京高円寺阿波おどりが高円寺駅・新高円寺駅周辺の8演舞場で流し踊りを中心にするのに対し、南越谷は流し踊りだけでなく舞台踊り・組踊り・輪踊りを複数形式で見比べられる点と、2026年に95連が参加する点で区別できる。

## 素材

公式サイトの画像・文章は無断転載禁止と明記されているため使用しない。公式トップページの動画導線は確認したが、投稿者ページ・尺・祭り全体の代表範囲・サムネイル品質の全条件をこの調査で確定していないため採用せず、`atmosphereMedia: []`、`backgroundImage: null` とした。

## 出典

- https://www.minamikoshigaya-awaodori.jp/
- https://www.minamikoshigaya-awaodori.jp/aboutus/mk_awaodori.html
- https://www.minamikoshigaya-awaodori.jp/odori/
- https://www.minamikoshigaya-awaodori.jp/info_program/
- https://www.minamikoshigaya-awaodori.jp/ren_info/ren_info.php
- https://www.city.koshigaya.saitama.jp/toiawase/sosiki2/kankyokezai/keizaisinkou/manholecard.html
