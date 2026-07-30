const FESTIVAL = {
  id: "sanja-matsuri",
  name: "三社祭",
  officialName: "浅草神社例大祭",
  prefecture: "東京都",
  city: "台東区",
  areaTag: "tokyo",
  constantInfo: {
    schedulePattern: "毎年5月第3金曜日〜日曜日",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "both",
      hayashiNote: "金曜日には大行列と、東京都無形民俗文化財のびんざさら舞が奉納される。"
    },
    access: { nearestStation: "東京メトロ銀座線・都営浅草線・東武線 浅草駅" },
    mapReference: {
      label: "浅草神社",
      pointType: "shrine",
      query: "浅草神社 東京都台東区",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=浅草神社+東京都台東区",
      note: "本社神輿は浅草神社から氏子44町を渡御します。"
    },
    highlightComment: "本社神輿3基が早朝に同時に宮出しされ、浅草の氏子44町を一日かけて渡御する。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-30",
      sources: ["https://www.sanjasama.jp/", "https://www.sanjasama.jp/detail260517miyatogyo.html"]
    }
  },
  yearlyInfo: [{
    year: 2026,
    eventStatus: "ended",
    dates: ["2026-05-15", "2026-05-16", "2026-05-17"],
    access: { hasParking: false, parkingNote: "専用駐車場の公式案内は確認できない。公共交通機関の利用を前提とする。" },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: ["https://www.sanjasama.jp/", "https://www.sanjasama.jp/detail260517miyadashi.html", "https://www.sanjasama.jp/detail260517miyairi.html"],
      note: "公式日程で5月15日〜17日の主要行事と、本社神輿3基の宮出し・各町渡御・宮入りを確認。"
    }
  }]
};
