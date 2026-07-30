const FESTIVAL = {
  id: "maebashi-matsuri",
  name: "前橋まつり",
  officialName: null,
  prefecture: "群馬県",
  city: "前橋市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年10月第2土曜日・日曜日",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "both",
      hayashiNote: "祇園山車と神輿連合渡御に加え、市民参加のだんべえ踊りが同じ開催期間に行われる。"
    },
    access: { nearestStation: "JR両毛線 前橋駅・上毛電鉄 中央前橋駅" },
    mapReference: {
      label: "前橋中心商店街", pointType: "viewing_point", query: "前橋中央通り商店街 群馬県前橋市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=前橋中央通り商店街+群馬県前橋市",
      note: "中心商店街を主会場に市内一円で行われます。"
    },
    highlightComment: "祇園山車と神輿連合渡御が中心市街地を進み、市民参加の「だんべえ踊り」が加わる。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/kankoseisaku/gyomu/1/30004.html", "https://maebashi-festival.jp/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "unconfirmed", dates: ["2026-10-10", "2026-10-11"],
    access: { hasParking: null, parkingNote: "2026年の駐車場・交通規制は未確認。" },
    confirmation: {
      confirmedDate: "2026-07-30", sources: ["https://www.city.maebashi.gunma.jp/soshiki/sangyokeizai/kankoseisaku/gyomu/1/2190.html"],
      note: "前橋市公式は第78回の日程を実施委員会後に決定すると案内。datesは例年パターンから算出した参考値で、公式発表ではない。"
    }
  }]
};
