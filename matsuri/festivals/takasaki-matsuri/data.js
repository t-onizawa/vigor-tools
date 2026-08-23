const FESTIVAL = {
  id: "takasaki-matsuri",
  name: "高崎まつり",
  officialName: "第52回高崎まつり",
  prefecture: "群馬県",
  city: "高崎市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年8月に2日間",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "江戸型山車と神輿に加え、高崎ならではの巨大だるまみこし・創作だるまみこしが市街地に登場する。"
    },
    access: { nearestStation: "JR各線・上信電鉄 高崎駅" },
    mapReference: {
      label: "高崎駅西口駅前通り", pointType: "viewing_point", query: "高崎駅西口駅前通り", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=高崎駅西口駅前通り",
      note: "山車・神輿が集まる高崎駅西口側の中心市街地を基準地点とした。"
    },
    highlightComment: "市内に38台ある江戸型山車から2026年は24台が出場し、巨大・創作だるまみこしと市街地を巡る。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=rTzcVTaR4N4",
      contentId: "rTzcVTaR4N4",
      title: "山車・みこし・花火が競演　夏の一大イベント高崎まつりに９５万人　群馬・高崎市(25/08/25)",
      publisher: "群馬テレビ・ぐんテレ",
      publisherType: "local_media",
      purpose: "festival_atmosphere",
      publishedYear: 2025,
      checkedDate: "2026-08-01"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "7s0uJ43p4Ek",
      sourceUrl: "https://www.youtube.com/watch?v=7s0uJ43p4Ek",
      publisher: "sugazane",
      publisherType: "individual",
      checkedDate: "2026-08-01"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.takasaki-matsuri.jp/gaiyou/", "https://www.city.takasaki.gunma.jp/site/sightseeing/2157.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-08-22", "2026-08-23"],
    access: { hasParking: null, parkingNote: "駅前通りなどで両日交通規制。公式交通規制図を確認してください。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.takasaki-matsuri.jp/gaiyou/", "https://www.city.takasaki.gunma.jp/site/sightseeing/2157.html"], note: "第52回は2026年8月22日・23日。高崎山車まつりは24台出場予定。" }
  }]
};
