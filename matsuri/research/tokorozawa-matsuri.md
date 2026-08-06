# ところざわまつり 調査記録

- 確認日: 2026-08-07
- 判定: 掲載（2026年開催確認済み）

## 範囲・同一性・開催主体

ところざわまつり実行委員会が「ところざわまつり」として案内する、所沢市中央地区内各通り一帯の単独イベントを対象とする。2026年の公式実施概要は「令和8年ところざわまつり」と記載するが、年度を除いた催事名と公式サイト名は一貫して「ところざわまつり」であり、正式名称と通称の混同はない。所沢市民フェスティバルなど別会場・別主催の催事はページ範囲に含めない。

実施主体はところざわまつり実行委員会、事務局は所沢商工会議所。所沢市、所沢商工会議所、所沢商店街連合会、所沢市まちづくり観光協会が後援することを公式実施概要で確認した。

## 2026年・スキーマ・見どころ判断

公式実施概要と所沢市募集ページで、2026年10月11日の開催を確認したため `confirmed` とした。会場は所沢市中央地区、交通規制は10時から21時。山車の曳き廻し10基、神輿、子どもオープニングマーチ、民踊流しなどが2026年版の催物として明示されている。

山車と神輿が運行されるため `hasDashi: true`、`hasMikoshi: true`、市街地を進むため `hasParade: true`。民踊流しは路上であり、山車上の踊りではないため `hasDanceOnDashi: false` とした。昼から夜まで山車・神輿が運行されるため `highlightTime: "both"`。highlightCommentは2026年公式実施概要の山車10基、神輿、重松流祭囃子の記載だけから作成した。

既存の川越まつりが川越氷川祭を起源とする神幸祭と山車の曳っかわせ、飯能まつりが底抜け屋台と11か町の山車総覧を特色とするのに対し、ところざわまつりは所沢駅西口から中央地区にかけて10基の山車・神輿・重松流祭囃子を同日に展開する市民参加型の祭りとして区別できる。

## 素材

公式ページの掲載画像は転載せず、投稿者・代表範囲・横長背景としての品質を直接確認できた再利用可能な素材は採用していない。数合わせを避け、`atmosphereMedia: []`、`backgroundImage: null` とした。

## 出典

- https://tokorozawa-cci.or.jp/matsuri/about/index.html
- https://tokorozawa-cci.or.jp/matsuri/about/outline.html
- https://tokorozawa-cci.or.jp/matsuri/schedule/index.html
- https://tokorozawa-cci.or.jp/matsuri/announce/
- https://www.city.tokorozawa.saitama.jp/iitokoro/event/main/omaturi/maturibosyu.html
