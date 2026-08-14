const FESTIVAL = {
  id: "morioka-sansa-odori",
  name: "盛岡さんさ踊り",
  officialName: "第49回盛岡さんさ踊り",
  prefecture: "岩手県",
  city: "盛岡市",
  areaTag: "iwate",
  constantInfo: {
    schedulePattern: "毎年8月1日〜4日",
    features: {
      hasDashi: "n/a", hasMikoshi: "n/a", hasDanceOnDashi: false, hasParade: true, highlightTime: "night",
      hayashiNote: "太鼓・笛・唄と踊り手が団体ごとに中央通を進み、最終日は太鼓大パレードと大輪踊りが行われる。"
    },
    access: { nearestStation: "JR・IGR盛岡駅から盛岡市中央通会場まで徒歩約15分" },
    mapReference: { label: "盛岡市中央通会場", pointType: "viewing_point", query: "盛岡市中央通 岩手県庁", lat: null, lng: null, mapUrl: "https://www.google.com/maps/search/?api=1&query=盛岡市中央通+岩手県庁", note: "公式が案内する県庁前約1kmのパレード会場を基準地点とした。" },
    highlightComment: "太鼓・笛・踊り手が盛岡市中央通を進む夜のパレード。最終日は太鼓大パレードから観客も参加できる大輪踊りへ続く。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-08-14", sources: ["https://www.sansaodori.jp/", "https://www.sansaodori.jp/info/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"],
    access: { hasParking: null, parkingNote: "祭り専用駐車場の有無は確認できていない。公式は盛岡駅から会場まで徒歩約15分と案内。" },
    confirmation: { confirmedDate: "2026-08-14", sources: ["https://www.sansaodori.jp/", "https://www.sansaodori.jp/info/guidance_seat.php"], note: "公式サイトで2026年8月1日〜4日、各日18時開始のパレード・輪踊りを確認。全日程終了済みのためended。" }
  }]
};
