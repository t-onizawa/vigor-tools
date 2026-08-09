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
        parkingNote: "2026年公式チラシ裏面に臨時駐車場12か所を掲載。混雑が予想されるため、公共交通機関の利用を推奨。"
      },
      confirmation: {
        confirmedDate: "2026-08-09",
        sources: [
          "https://www.city.sosa.lg.jp/page/page000941.html",
          "https://www.city.sosa.lg.jp/data/doc/1783319652_doc_145_0.pdf",
          "https://www.city.sosa.lg.jp/data/doc/1783319655_doc_145_0.pdf"
        ],
        note: "匝瑳市公式ページと2026年公式チラシで、祭礼日を8月4日・5日、両日の神輿渡御予定、臨時駐車場を直接確認。チラシに併記された8月2日の山車巡行は、祭礼日とは分けて本ページの日程対象外とした。"
      }
    }
  ]
};
