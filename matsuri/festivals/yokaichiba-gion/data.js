const FESTIVAL = {
  id: "yokaichiba-gion",
  name: "八日市場の祇園祭",
  officialName: "八重垣神社祇園祭",
  prefecture: "千葉県",
  city: "匝瑳市",
  areaTag: "chiba",
  constantInfo: {
    schedulePattern: "毎年8月4日・5日固定",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "night",
      hayashiNote: "「あんりゃあ、どした」という独特の掛け声とともに、水を掛け合いながら渡御する。"
    },
    access: {
      nearestStation: "JR総武本線 八日市場駅（徒歩約5分）"
    },
    mapReference: {
      label: "八重垣神社",
      pointType: "shrine",
      query: "八重垣神社 千葉県匝瑳市八日市場イ2939",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=八重垣神社+千葉県匝瑳市八日市場イ2939",
      note: "八重垣神社は八日市場の祇園祭の中心となる神社です。"
    },
    highlightComment: "初日夜は女性だけで担ぐ「女神輿」が特徴。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "phMt_hzgi_U",
      sourceUrl: "https://www.youtube.com/watch?v=phMt_hzgi_U",
      publisher: "NORTHCHIBA（NPO法人）",
      publisherType: "local_media",
      checkedDate: "2026-07-29",
      note: "神輿と提灯が鮮明でサムネイルに文字オーバーレイがない。背景素材としてのみ採用（atmosphereMediaは空配列のまま）。"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "https://maruchiba.jp/event/detail_12967.html",
        "https://www.city.sosa.lg.jp/page/page000941.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "ended",
      dates: ["2026-08-04", "2026-08-05"],
      access: {
        hasParking: true,
        parkingNote: "無料駐車場あり（大型バス用はなし、第三者情報）。"
      },
      confirmation: {
        confirmedDate: "2026-08-07",
        sources: ["https://www.city.sosa.lg.jp/page/page000941.html"],
        note: "匝瑳市公式ページに掲載されたチラシPDFで「令和8年 8/4火・5水」と、裏面で両日の神輿渡御予定を直接確認。"
      }
    }
  ]
};
