const FESTIVAL = {
  id: "nikko-toshogu-shunki-reitaisai",
  name: "日光東照宮春季例大祭",
  officialName: "春季例大祭",
  prefecture: "栃木県",
  city: "日光市",
  areaTag: "tochigi",
  constantInfo: {
    schedulePattern: "毎年5月17日・18日",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "daytime",
      hayashiNote: "17日は流鏑馬神事、18日は神輿3基を中心とする百物揃千人武者行列が行われる。"
    },
    access: { nearestStation: "JR日光駅・東武日光駅（世界遺産めぐりバス利用）" },
    mapReference: {
      label: "日光東照宮",
      pointType: "shrine",
      query: "日光東照宮 栃木県日光市",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=日光東照宮+栃木県日光市",
      note: "18日の行列は二荒山神社から御旅所を経て東照宮へ還御します。"
    },
    highlightComment: "神輿3基と鎧武者が約1kmを進む「百物揃千人武者行列」が、春季例大祭を締めくくる。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=_8ZXncgd8BU",
      contentId: "_8ZXncgd8BU",
      title: "日光東照宮春季例大祭",
      publisher: "15Tube〜栃木県公式〜",
      publisherType: "government",
      purpose: "festival_atmosphere",
      publishedYear: 2016,
      checkedDate: "2026-07-30"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "_8ZXncgd8BU",
      sourceUrl: "https://www.youtube.com/watch?v=_8ZXncgd8BU",
      publisher: "15Tube〜栃木県公式〜",
      publisherType: "government",
      checkedDate: "2026-07-30"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-30",
      sources: ["https://toshogu.jp/pages/28/", "https://www.nikko-kankou.org/public/event/27"]
    }
  },
  yearlyInfo: [{
    year: 2026,
    eventStatus: "ended",
    dates: ["2026-05-17", "2026-05-18"],
    access: { hasParking: null, parkingNote: "祭り専用駐車場は未確認。公式観光案内は周辺道路・駐車場の混雑を案内している。" },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: ["https://www.nikko-kankou.org/public/event/27", "https://toshogu.jp/pages/28/"],
      note: "17日の流鏑馬神事と18日の百物揃千人武者行列を同一の春季例大祭として確認。"
    }
  }]
};
