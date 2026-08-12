# 花園のささら 調査記録

- 確認日: 2026-08-13
- 判定: 掲載（2026年開催終了）

## 範囲・同一性・開催主体

花園神社の例祭で奉納される三匹獅子舞「花園のささら」を対象とする。観光いばらきと北茨城市観光協会が同じ名称・開催地を案内し、問い合わせ先を花園神社としている。例祭の露店や周辺の別行事を混在させず、神社と御仮屋で行われるささら演舞をページ範囲とした。

## 2026年・スキーマ・見どころ判断

県公式観光情報で2026年5月5日の演舞時刻と例大祭を確認し、確認日現在は終了しているため `ended`。ページ範囲が獅子舞奉納で山車・神輿・行列を扱わないため `hasDashi`、`hasMikoshi`、`hasParade` は `"n/a"`、山車上の踊りではないため `hasDanceOnDashi: false`。日中の演舞なので `highlightTime: "day"` とした。

既存の踊り中心の祭りと異なり、8〜13歳ほどの男児が角の異なる三匹の獅子を演じ、笛・太鼓とともに古い型を伝える点が固有。highlightCommentは県公式の獅子構成・演者・囃子の説明から作成した。

## 素材

素材探索は行っていないため `backgroundImage: null`、`atmosphereMedia: []`。

## 出典

- https://www.ibarakiguide.jp/event.php?code=1275&mode=detail
- https://www.kitaibarakishi-kankokyokai.gr.jp/page/page000708.html
