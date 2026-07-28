const FESTIVAL = {
  id: "sawara-aki-matsuri",
  name: "佐原の大祭 秋祭り",
  officialName: null,
  prefecture: "千葉県",
  city: "香取市佐原（新宿地区）",
  areaTag: "chiba",
  constantInfo: {
    schedulePattern: "10月第2土曜日を中日とする金・土・日曜日の3日間",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: null,
      hasParade: true,
      highlightTime: "both",
      hayashiNote: "佐原囃子。日本三大囃子の一つとされ、山車の運行にあわせて町中に響く。演奏形態（山車の下段に下座連が乗り演奏する形式）は佐原の大祭に共通する特徴。"
    },
    access: {
      nearestStation: "JR成田線 佐原駅（駅前が祭り区域、徒歩0分）"
    },
    mapReference: {
      label: "諏訪神社",
      pointType: "shrine",
      query: "諏訪神社 千葉県香取市佐原イ1020",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=諏訪神社+千葉県香取市佐原イ1020",
      note: "諏訪神社は秋祭りの祭礼の中心となる神社です。山車の曳き回しは新宿地区（小野川西側、佐原駅前一帯）に広がります。"
    },
    highlightComment: null,
    atmosphereMedia: [],
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/aki.html",
        "https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/index.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "unconfirmed",
      dates: ["2026-10-09", "2026-10-10", "2026-10-11"],
      access: {
        hasParking: null,
        parkingNote: "2025年実績では利根川河川敷臨時駐車場1,000台（無料、大型バス可）。2026年分は未確認。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: ["https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/aki.html"],
        note: "香取市公式サイトには2025年（10月10日〜12日）の情報のみ掲載されており、2026年開催の公式発表は確認できていない。dates欄は「10月第2土曜日を中日とする金・土・日」という恒常パターンから機械的に算出した参考値であり、公式発表ではない。このためeventStatusはscheduled_pending_officialではなくunconfirmedとする。"
      }
    }
  ]
};
