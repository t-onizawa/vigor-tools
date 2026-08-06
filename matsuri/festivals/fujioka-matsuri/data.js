const FESTIVAL = {
  id: "fujioka-matsuri",
  name: "藤岡まつり",
  officialName: "令和8年度藤岡まつり",
  prefecture: "群馬県",
  city: "藤岡市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "開催日は年度ごとに発表（2026年は9月）",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "子供みこし・宮神輿・大人神輿と祇園山車行進が中心市街地で行われる。おどり大行進やダンスは路上で行い、山車上の踊りではない。"
    },
    access: { nearestStation: "JR八高線 群馬藤岡駅" },
    mapReference: {
      label: "藤岡市中央通り", pointType: "viewing_point", query: "藤岡市 中央通り 群馬県", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=藤岡市+中央通り+群馬県",
      note: "公式が神輿・山車・市民パレードの会場として示す本通り・中央通り周辺のうち、中央通りを観覧の基準地点とした。"
    },
    highlightComment: "子供みこし・宮神輿・大人神輿に続き、祇園山車が中心市街地を進む二日間の祭り。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-08-07", sources: ["https://www.city.fujioka.gunma.jp/soshiki/keizaibu/shokokanko/2/1/1953.html", "https://www.city.fujioka.gunma.jp/soshiki/kikakubu/hisho/1/reiwa8/11161.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-09-26", "2026-09-27"],
    access: { hasParking: true, parkingNote: "会場内に駐車場はないが、公式がドン・キホーテUNY藤岡店、ぐんまみらい信用組合藤岡支店、藤岡市総合学習センター、ふじまる南側駐車場を臨時駐車場として案内している。" },
    confirmation: { confirmedDate: "2026-08-07", sources: ["https://www.city.fujioka.gunma.jp/soshiki/keizaibu/shokokanko/2/1/1953.html", "https://www.city.fujioka.gunma.jp/soshiki/kikakubu/hisho/1/reiwa8/11161.html"], note: "暑さ対策で当初の7月開催から9月26日・27日へ変更。藤岡市が2026年8月1日更新の公式ページで両日の神輿・踊り・市民パレード・祇園山車行進の時刻を発表済み。" }
  }]
};
