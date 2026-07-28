const FESTIVAL = {
  id: "sawara-natsu-matsuri",
  name: "佐原の大祭 夏祭り",
  officialName: "八坂神社祇園祭",
  prefecture: "千葉県",
  city: "香取市佐原（本宿地区）",
  areaTag: "chiba",
  constantInfo: {
    schedulePattern: "例年7月10日以降の最初の金・土・日曜日の3日間",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: false,
      hasParade: true,
      highlightTime: "both",
      hayashiNote: "佐原囃子。山車の下段（中天上）に下座連が乗り演奏する。日本三大囃子の一つとされる。手踊り（手古舞の流れをくむ）は山車の前で披露されるもので、山車本体の上で行われるものではない。"
    },
    access: {
      nearestStation: "JR成田線 佐原駅（徒歩約10分）"
    },
    mapReference: {
      label: "忠敬橋（小野川・本宿地区）",
      pointType: "viewing_point",
      query: "忠敬橋 千葉県香取市佐原",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=忠敬橋+千葉県香取市佐原",
      note: "山車の曳き回し・のの字廻しは本宿地区一帯で行われます。忠敬橋周辺は代表的な観覧スポットの一つです。"
    },
    highlightComment: null,
    atmosphereMedia: [],
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-27",
      sources: [
        "https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/index.html",
        "https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/natsu.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "ended",
      dates: ["2026-07-10", "2026-07-11", "2026-07-12"],
      access: {
        hasParking: true,
        parkingNote: "利根川河川敷臨時駐車場1,000台（無料）。シャトルバス運行あり（500円/人）。"
      },
      confirmation: {
        confirmedDate: "2026-07-27",
        sources: [
          "https://www.city.katori.lg.jp/sightseeing/matsuri/introduction/natsu.html",
          "https://www.city.katori.lg.jp/yotei/event/calendar/calendar.html"
        ],
        note: "香取市公式サイトに基づく。調査時点（2026-07-27）で祭りは既に終了している。神輿の巡行は最終日（7/12）のみ、山車の運行台数は初日9台・2日目以降10台という日ごとの違いがあるが、本スキーマでは構造化せず本欄に記録するに留める。"
      }
    }
  ]
};
