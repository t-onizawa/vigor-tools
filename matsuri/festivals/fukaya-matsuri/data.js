const FESTIVAL = {
  id: "fukaya-matsuri",
  name: "深谷まつり",
  officialName: null,
  prefecture: "埼玉県",
  city: "深谷市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "毎年7月最終土曜日",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: null,
      hasParade: true,
      highlightTime: null,
      hayashiNote: "居囃子のほか、花魁ソーランが披露される。起源は深谷城にあった三社天王を天和年間に移し祭祀した「八坂まつり」で、300年余りの歴史を持つ。"
    },
    access: {
      nearestStation: "JR深谷駅（北口ロータリー周辺が会場）"
    },
    mapReference: {
      label: "JR深谷駅",
      pointType: "viewing_point",
      query: "深谷駅 埼玉県深谷市",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=深谷駅+埼玉県深谷市",
      note: "JR深谷駅北口ロータリー・市役所通り一帯が深谷まつりの会場です。"
    },
    highlightComment: null,
    atmosphereMedia: [],
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: ["https://www.city.fukaya.saitama.jp/doraku/guide/guide05.html"]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "ended",
      dates: ["2026-07-25"],
      access: {
        hasParking: null,
        parkingNote: "駐車場情報は未確認（深谷七夕まつりの情報と混在しやすいため実装時に要再確認）。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: ["https://www.city.fukaya.saitama.jp/doraku/guide/guide05.html"],
        note: "毎年7月最終土曜日固定という恒常パターンによる確認。開催時間16:00〜21:00。"
      }
    }
  ]
};
