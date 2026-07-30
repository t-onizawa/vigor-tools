const FESTIVAL = {
  id: "mashiko-gion-matsuri",
  name: "益子祇園祭",
  officialName: "鹿島神社八坂神社祭礼",
  prefecture: "栃木県",
  city: "益子町",
  areaTag: "tochigi",
  constantInfo: {
    schedulePattern: "毎年7月23日〜25日",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "both",
      hayashiNote: "5町会が当番制で担い、神輿渡御、御神酒頂戴式、屋台の神前奉納「御上覧」を行う。"
    },
    access: { nearestStation: "真岡鐵道 益子駅（徒歩約10分）" },
    mapReference: {
      label: "鹿島神社", pointType: "shrine", query: "鹿島神社 栃木県益子町", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=鹿島神社+栃木県益子町",
      note: "鹿島神社と益子町中心部で行われます。"
    },
    highlightComment: "当番町が大杯の燗酒を飲み干す「御神酒頂戴式」と、屋台を神前へ奉納する「御上覧」が見どころ。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.tochigiji.or.jp/event/e17543/", "https://kashimajinja.com/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-07-23", "2026-07-24", "2026-07-25"],
    access: { hasParking: null, parkingNote: "2026年の専用駐車場・交通規制詳細は未確認。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.tochigiji.or.jp/event/e17543/"], note: "7月23日出御祭、24日御神酒頂戴式、25日還御祭・御上覧を公的観光サイトで確認。" }
  }]
};
