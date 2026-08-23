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
    year: 2026, eventStatus: "scheduled_pending_official", dates: ["2026-10-25"],
    access: { hasParking: false, parkingNote: "直近回は会場駐車場なし。2026年の交通規制・コース詳細は公式発表待ち。" },
    confirmation: {
      confirmedDate: "2026-08-24", sources: ["https://yokosuka-kanko.com/events/47th_mikoshi/"],
      note: "横須賀市観光協会公式で第47回を2026年10月25日に開催予定と確認。イベント詳細は公開待ち。"
    }
  }]
};
