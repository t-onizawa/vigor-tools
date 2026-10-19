const FESTIVAL = {
  id: "shimonita-aki-matsuri",
  name: "下仁田秋まつり",
  officialName: "諏訪神社秋季例大祭",
  prefecture: "群馬県",
  city: "下仁田町",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年10月中旬の土・日曜日",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: true, hasParade: true, highlightTime: "both",
      hayashiNote: "七台の山車がすれ違う際にお囃子を競り合い、山車上では女性の踊り子が舞う。"
    },
    access: { nearestStation: "上信電鉄 下仁田駅" },
    mapReference: {
      label: "下仁田町市街地", pointType: "viewing_point", query: "下仁田駅 群馬県下仁田町", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=下仁田駅+群馬県下仁田町",
      note: "山車巡行は下仁田駅周辺の市街地で行われます。年度の交通規制図を確認してください。"
    },
    highlightComment: "七台の山車が寸前まで近づいてすれ違い、互いのお囃子を競り合う。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.town.shimonita.lg.jp/kanko/m03/m06/m01/03.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-10-10", "2026-10-11"],
    access: { hasParking: null, parkingNote: "町公式に駐車場の記載はなし。交通規制は10月10日15:00〜21:00（町内）、11日14:00〜16:00（石神通り）・15:00〜21:00（町内）。" },
    confirmation: {
      confirmedDate: "2026-10-19", sources: ["https://www.town.shimonita.lg.jp/kanko/m03/m06/m01/03.html"],
      note: "下仁田町公式の2026年10月9日更新で、10月10日（土）・11日（日）の開催と両日の巡行時刻を確認。下仁田ねぎ祭りとは別イベント。"
    }
  }]
};
