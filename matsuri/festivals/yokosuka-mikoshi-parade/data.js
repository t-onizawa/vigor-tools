const FESTIVAL = {
  id: "yokosuka-mikoshi-parade",
  name: "よこすかみこしパレード",
  officialName: "よこすかみこしパレード",
  prefecture: "神奈川県",
  city: "横須賀市",
  areaTag: "kanagawa",
  constantInfo: {
    schedulePattern: "例年10月",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: null, hasParade: true, highlightTime: "daytime",
      hayashiNote: "木遣を先頭に、市内各地域の神輿と山車が掛け声やお囃子とともに合同パレードを行う。"
    },
    access: { nearestStation: "京急本線 横須賀中央駅" },
    mapReference: {
      label: "横須賀中央大通り", pointType: "viewing_point", query: "横須賀中央大通り 神奈川県横須賀市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=横須賀中央大通り+神奈川県横須賀市",
      note: "主要観覧地点は横須賀中央大通り。年度により終点・式典会場やコースが変更されるため公式マップを確認してください。"
    },
    highlightComment: "市内各地域の神輿と山車が横須賀中央大通りに集結し、木遣を先頭に合同パレードを行う。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://yokosuka-kanko.com/events/46th_mikoshi/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "scheduled_pending_official", dates: [],
    access: { hasParking: false, parkingNote: "直近回は会場駐車場なし。2026年の交通規制・コース詳細は公式発表待ち。" },
    confirmation: {
      confirmedDate: "2026-07-31", sources: ["https://yokosuka-kanko.com/wp-content/uploads/2026/06/%E4%BB%A4%E5%92%8C8%E5%B9%B4%E5%BA%A6%E5%AE%9A%E6%99%82%E7%B7%8F%E4%BC%9A%E8%B3%87%E6%96%99.pdf"],
      note: "観光協会の2026年度事業資料で第47回を2026年10月に開催予定と確認。具体日は未発表。"
    }
  }]
};
