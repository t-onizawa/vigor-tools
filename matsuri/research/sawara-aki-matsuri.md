# 佐原の大祭 秋祭り 素材調査

## 2026-09-03 毎日品質改善

香取市公式ページと公式運営の動画候補を調査した。ライブ配信は長尺で、夏祭り向け制作動画は秋祭りのページ範囲と一致しないため流用しない。今回、秋祭り全体の投稿者・内容・画像を直接確認でき、既存基準をすべて満たす新規候補を確定できなかったため、backgroundImage・atmosphereMediaとも未設定を維持する。

- 根拠: https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/aki.html

### 2026-09-30 毎日品質改善

- backgroundImageを優先し、同じ探索でatmosphereMedia候補も調査。検索候補の動画ページ・画像を直接確認して採用基準を満たす素材を確定できなかったため、推測で採用せず見送り。

### 2026-10-06 highlightComment・notableDesignation追加

週次おすすめnoteタスクの選定基準改善（まだ開催されていない祭りを
優先する修正）をきっかけに、佐原の大祭がこれまでhighlightComment
未設定のまま放置されていたことが判明。香取市公式サイトを直接確認し、
以下を追加した。

- `highlightComment`：中日の「山車整列・揃い曳き」（14台全てが
  勢揃いする、秋祭り特有の演目）と「のの字廻し」を記載
- `notableDesignation`：「佐原の山車行事」が2004年2月6日付で国指定
  重要無形民俗文化財に指定されていること、「関東3大山車祭りの一つ」
  と称されることを確認（新設フィールド、schema-design.md 14番参照）

根拠：
- https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/aki.html
  （秋祭り特有の「乱曳き」「山車整列・揃い曳き」、14台・新宿地区・
  諏訪神社の祭礼であることを確認）
- https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/index.html
  （国指定重要無形民俗文化財「佐原の山車行事」2004年2月6日指定、
  「関東3大山車祭りの一つ」との記載を確認）
