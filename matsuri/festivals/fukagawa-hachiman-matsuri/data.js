const FESTIVAL = {
  id: "fukagawa-hachiman-matsuri",
  name: "深川八幡祭り",
  officialName: "富岡八幡宮例大祭",
  prefecture: "東京都",
  city: "江東区",
  areaTag: "tokyo",
  constantInfo: {
    schedulePattern: "3年に1度、大規模な神輿連合渡御を行う「本祭り」が実施される（次回は2026年）",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: null,
      hayashiNote: null
    },
    access: {
      nearestStation: "東京メトロ東西線「門前仲町」駅（徒歩3分）／都営大江戸線「門前仲町」駅（徒歩6分）／JR京葉線「越中島」駅（徒歩15分）"
    },
    mapReference: {
      label: "富岡八幡宮",
      pointType: "shrine",
      query: "富岡八幡宮 東京都江東区富岡1-20-3",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=富岡八幡宮+東京都江東区富岡1-20-3",
      note: "富岡八幡宮は深川八幡祭りの中心となる神社です。"
    },
    highlightComment: "「水かけ祭り」として知られ、沿道から担ぎ手に一斉に水を浴びせる。江戸三大祭りの一つとされる。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "UgDHWDI0zvA",
      sourceUrl: "https://www.youtube.com/watch?v=UgDHWDI0zvA",
      publisher: "AQUA Geo Graphic",
      publisherType: "individual",
      checkedDate: "2026-07-29",
      note: "神輿連合渡御・水掛けの様子が鮮明でサムネイルに文字オーバーレイがない。背景素材としてのみ採用（atmosphereMediaは空配列のまま）。"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "https://www.baynet.ne.jp/fukagawamatsuri/",
        "http://www.tomiokahachimangu.or.jp/"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "scheduled_pending_official",
      dates: ["2026-08-12", "2026-08-13", "2026-08-14", "2026-08-15", "2026-08-16"],
      access: {
        hasParking: false,
        parkingNote: "富岡八幡宮公式サイトに「御鎮座400年事業関連工事のため、現在駐車できる台数が限られております」と明記。公共交通機関の利用が案内されている。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: ["http://www.tomiokahachimangu.or.jp/"],
        note: "富岡八幡宮公式サイトに掲載の令和8年例祭行事日程で直接確認。神輿連合渡御は8月16日（日）。2026年は3年に1度の本祭り年。"
      }
    }
  ]
};
