const FESTIVAL = {
  id: "omiya-nakasendo-matsuri",
  name: "大宮夏まつり 中山道まつり",
  officialName: "中山道まつり",
  prefecture: "埼玉県",
  city: "さいたま市大宮区",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "例年8月1日・2日",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: false,
      hasParade: true,
      highlightTime: "night",
      hayashiNote: "2日は民踊輪おどり、阿波おどり、和太鼓演奏も行われる。"
    },
    access: {
      nearestStation: "JR・東武・ニューシャトル 大宮駅（東口）"
    },
    mapReference: {
      label: "大宮駅東口周辺",
      pointType: "viewing_point",
      query: "大宮駅東口 埼玉県さいたま市",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=大宮駅東口+埼玉県さいたま市",
      note: "中山道まつりは大宮駅東口周辺で開催されます。"
    },
    highlightComment: "大宮駅東口の中山道に神輿と山車が集まり、2日は揃い渡御・揃い巡行を行う。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-30",
      sources: [
        "https://visitsaitamacity.jp/events/24",
        "https://musashiichinomiya-hikawa.or.jp/about/index.html"
      ]
    }
  },
  yearlyInfo: [{
    year: 2026,
    eventStatus: "confirmed",
    dates: ["2026-08-01", "2026-08-02"],
    access: {
      hasParking: false,
      parkingNote: "両日とも大宮駅東口周辺で交通規制あり。公式は車での来場を控えるよう案内し、駐輪場も設けない。"
    },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: [
        "https://visitsaitamacity.jp/events/24",
        "https://www.city.saitama.lg.jp/006/014/008/003/015/003/p131231.html"
      ],
      note: "1日は氷川神社例大祭でお祓いを受けた町会の神輿・山車が巡行。2日は中山道まつりの神輿揃い渡御・山車揃い巡行などを実施。"
    }
  }]
};
