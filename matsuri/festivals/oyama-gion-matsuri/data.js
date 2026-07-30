const FESTIVAL = {
  id: "oyama-gion-matsuri",
  name: "小山祇園祭",
  officialName: "須賀神社祇園祭",
  prefecture: "栃木県",
  city: "小山市",
  areaTag: "tochigi",
  constantInfo: {
    schedulePattern: "例年7月第3日曜日",
    features: {
      hasDashi: "n/a", hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "daytime",
      hayashiNote: "須賀神社の大神輿が小山市街地を渡御する。"
    },
    access: { nearestStation: "JR宇都宮線・水戸線・両毛線 小山駅" },
    mapReference: {
      label: "須賀神社", pointType: "shrine", query: "須賀神社 栃木県小山市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=須賀神社+栃木県小山市",
      note: "須賀神社と小山駅西口周辺の市街地で行われます。"
    },
    highlightComment: "『下野国誌』で「当国第一」と記された祇園祭で、須賀神社の大神輿が市街地を渡御する。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.city.oyama.tochigi.jp/kankou-bunka/miryoku/event/summer/page003807.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "unconfirmed", dates: ["2026-07-19"],
    access: { hasParking: null, parkingNote: "2026年の専用駐車場・交通規制詳細は未確認。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.city.oyama.tochigi.jp/kankou-bunka/miryoku/event/summer/page003807.html"], note: "市公式の例年第3日曜日という開催パターンから算出した参考日。2026年の個別開催告知は未確認。" }
  }]
};
