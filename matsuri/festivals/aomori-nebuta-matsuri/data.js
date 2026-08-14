const FESTIVAL = {
  id: "aomori-nebuta-matsuri",
  name: "青森ねぶた祭",
  officialName: "青森ねぶた祭",
  prefecture: "青森県",
  city: "青森市",
  areaTag: "aomori",
  constantInfo: {
    schedulePattern: "毎年8月2日〜7日",
    features: {
      hasDashi: true, hasMikoshi: "n/a", hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "笛・太鼓・手振り鉦のねぶた囃子と『ラッセラー』の掛け声に合わせ、跳人が大型ねぶたの周囲で跳ねる。"
    },
    access: { nearestStation: "JR・青い森鉄道 青森駅から運行コースまで徒歩圏" },
    mapReference: { label: "青森ねぶた祭 運行コース", pointType: "viewing_point", query: "青森ねぶた祭 運行コース 青森市", lat: null, lng: null, mapUrl: "https://www.google.com/maps/search/?api=1&query=青森ねぶた祭+運行コース+青森市", note: "公式運行コース周辺を観覧の基準地点とした。日ごとの運行情報は公式マップを確認。" },
    highlightComment: "夜の市街地を大型ねぶたが進み、最終日は昼の運行に続いて受賞ねぶたの海上運行と花火で締めくくる。",
    atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-08-14", sources: ["https://www.nebuta.jp/", "https://www.nebuta.jp/info/schedule/schedule.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-08-02", "2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07"],
    access: { hasParking: true, parkingNote: "公式が8月2日〜6日の臨時駐車場を案内。7日は利用条件が異なるため公式交通案内を確認。" },
    confirmation: { confirmedDate: "2026-08-14", sources: ["https://www.nebuta.jp/info/schedule/schedule.html", "https://www.nebuta.jp/info/reserved-seats/individual.html"], note: "2026年8月2日〜7日の運行内容と令和8年度観覧席案内を確認。確認時点で全日程終了済みのためended。" }
  }]
};
