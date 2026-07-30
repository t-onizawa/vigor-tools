const FESTIVAL = {
  id: "honjo-matsuri",
  name: "本庄まつり",
  officialName: "金鑚神社大祭",
  prefecture: "埼玉県",
  city: "本庄市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "毎年11月2日・3日",
    features: {
      hasDashi: true, hasMikoshi: null, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "both",
      hayashiNote: "人形山車10基が中山道を巡行し、交差点などでお囃子を叩き合う。"
    },
    access: { nearestStation: "JR高崎線 本庄駅" },
    mapReference: {
      label: "金鑚神社", pointType: "shrine", query: "金鑚神社 本庄市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=金鑚神社+本庄市",
      note: "金鑚神社と中山道を中心とした本庄市街地で行われます。"
    },
    highlightComment: "明治5年から大正13年に建造された市指定8基を含む、人形山車10基が中山道を巡行する。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=L5DaP7RcvsU",
      contentId: "L5DaP7RcvsU",
      title: "令和元年度本庄まつり　Honjo Matsuri（Honjo Festival）2019",
      publisher: "本庄市観光協会",
      publisherType: "tourism",
      purpose: "festival_atmosphere",
      publishedYear: 2019,
      checkedDate: "2026-07-31"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "L5DaP7RcvsU",
      sourceUrl: "https://www.youtube.com/watch?v=L5DaP7RcvsU",
      publisher: "本庄市観光協会",
      publisherType: "tourism",
      checkedDate: "2026-07-31"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.honjo-kanko.jp/event/honjomatsuri/", "https://www.honjo-kanko.jp/honjo-matsuri/highlight/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-11-02", "2026-11-03"],
    access: { hasParking: null, parkingNote: "2026年の臨時駐車場・交通規制詳細は未確認。" },
    confirmation: {
      confirmedDate: "2026-07-30", sources: ["https://www.honjo-kanko.jp/topics/"],
      note: "本庄市観光協会が2026年11月2日・3日の開催と献燈募集を案内。詳細プログラム待ち。"
    }
  }]
};
