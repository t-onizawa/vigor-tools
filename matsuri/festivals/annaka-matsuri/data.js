const FESTIVAL = {
  id: "annaka-matsuri",
  name: "あんなか祭り",
  officialName: "あんなか祭り",
  prefecture: "群馬県",
  city: "安中市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年10月中旬（山車曳行は隔年）",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: null, hasParade: true, highlightTime: "both",
      hayashiNote: "隔年の山車曳行では各地区の山車が出会うと、飾りと祭囃子を披露する。"
    },
    access: { nearestStation: "JR信越本線 安中駅" },
    mapReference: {
      label: "安中市役所前通り", pointType: "viewing_point", query: "安中市役所 群馬県安中市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=安中市役所+群馬県安中市",
      note: "近年の中心会場は安中市役所本庁舎と市役所前通り。山車の運行経路は年度案内を確認してください。"
    },
    highlightComment: "隔年で各地区の山車が安中市街を巡り、出会うと山車飾りと祭囃子を披露する。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.city.annaka.lg.jp/page/21641.html", "https://www.city.annaka.lg.jp/page/2058.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "unconfirmed", dates: [],
    access: { hasParking: null, parkingNote: "2026年の会場・駐車場・交通規制は公式発表未確認。" },
    confirmation: {
      confirmedDate: "2026-07-31", sources: ["https://www.city.annaka.lg.jp/page/21641.html"],
      note: "市公式で例年10月中旬・山車曳行は隔年と確認。2026年の具体日程と山車実施内容は未発表。"
    }
  }]
};
