const FESTIVAL = {
  id: "matsudo-jinja-reitaisai",
  name: "松戸神社例大祭・神幸祭",
  officialName: "松戸神社神幸祭",
  prefecture: "千葉県",
  city: "松戸市",
  areaTag: "chiba",
  constantInfo: {
    schedulePattern: "例大祭は毎年10月18日、神幸祭は数年に一度",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: true,
      highlightTime: "daytime",
      hayashiNote: "神幸祭実施年は、大榊・四神・獅子屋台・宮神輿と氏子町会の山車が古式行列を組む。"
    },
    access: { nearestStation: "JR常磐線・京成松戸線 松戸駅（西口から徒歩約7分）" },
    mapReference: {
      label: "松戸神社", pointType: "shrine", query: "松戸神社 千葉県松戸市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=松戸神社+千葉県松戸市",
      note: "神幸祭は松戸神社を中心に松戸駅周辺を巡幸します。"
    },
    highlightComment: "木彫彩色の青龍・白虎・朱雀・玄武を先頭に、宮神輿と山車が松戸宿を巡る古式行列。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.matsudojinja.com/announcements/shen-xing-ji-yu-zhai-xing-noozhi-rase", "https://www.matsudo-kankou.jp/sightseeing/%E6%9D%BE%E6%88%B8%E7%A5%9E%E7%A4%BE%E7%A5%9E%E5%B9%B8%E7%A5%AD/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-10-18"],
    access: { hasParking: null, parkingNote: "神幸祭専用駐車場・交通規制の詳細は未確認。" },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: ["https://www.matsudojinja.com/announcements/shen-xing-ji-yu-zhai-xing-noozhi-rase"],
      note: "2026年は御社殿創建400年と重なる神幸祭実施年。例大祭自体は毎年行われるためoff_yearは使用しない。"
    }
  }]
};
