const FESTIVAL = {
  id: "ohara-hadaka-matsuri",
  name: "大原はだか祭り",
  officialName: null,
  prefecture: "千葉県",
  city: "いすみ市",
  areaTag: "chiba",
  constantInfo: {
    schedulePattern: "毎年9月23日・24日固定",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "day",
      hayashiNote: null
    },
    access: {
      nearestStation: "JR外房線 大原駅（徒歩約15分）"
    },
    mapReference: {
      label: "鹿島神社",
      pointType: "shrine",
      query: "鹿島神社 千葉県いすみ市大原1595",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=鹿島神社+千葉県いすみ市大原1595",
      note: "鹿島神社は大原地区の神輿10基が集まる中心地点です。"
    },
    highlightComment: "初日「汐ふみ」では、神輿が太平洋の荒波に突進しもみ合う。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "ZqexWGNN1HU",
      sourceUrl: "https://www.youtube.com/watch?v=ZqexWGNN1HU",
      publisher: "太田裕",
      publisherType: "individual",
      checkedDate: "2026-07-29",
      note: "神輿が荒波に突進する「汐ふみ」が鮮明でサムネイルに文字オーバーレイがない。背景素材としてのみ採用（atmosphereMediaは空配列のまま）。"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "https://www.city.isumi.lg.jp/soshikikarasagasu/suisanshokoka/kankopromotionhan/2/2/786.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "scheduled_pending_official",
      dates: ["2026-09-23", "2026-09-24"],
      access: {
        hasParking: true,
        parkingNote: "大原海水浴場に270台分の無料駐車場あり（第三者情報）。大原町役場にも駐車場があるが台数に限りがあり、電車利用が推奨されている。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: ["https://www.city.isumi.lg.jp/soshikikarasagasu/suisanshokoka/kankopromotionhan/2/2/786.html"],
        note: "毎年9月23日・24日固定という恒常パターンによる確認。"
      }
    }
  ]
};
