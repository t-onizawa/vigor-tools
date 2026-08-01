const FESTIVAL = {
  id: "kinugawa-ryuo-matsuri", name: "鬼怒川温泉 龍王祭", officialName: "龍王祭",
  prefecture: "栃木県", city: "日光市", areaTag: "tochigi",
  constantInfo: {
    schedulePattern: "例年7月下旬",
    features: { hasDashi: "n/a", hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "night",
      hayashiNote: "五龍王神社の神事と龍王太鼓奉納に続き、鬼怒川温泉街で万燈神輿と女樽神輿が渡御する。" },
    access: { nearestStation: "東武鬼怒川線 鬼怒川温泉駅または鬼怒川公園駅" },
    mapReference: { label: "鬼怒川温泉 くろがね橋", pointType: "viewing_point", query: "くろがね橋 鬼怒川温泉", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=くろがね橋+鬼怒川温泉", note: "本祭はくろがね橋周辺、神事は龍王峡で行われます。" },
    highlightComment: "龍王太鼓が響く鬼怒川温泉街を、灯りをまとった万燈神輿と女性だけで担ぐ女樽神輿が渡御する。",
    atmosphereMedia: [{
      type: "youtube", url: "https://www.youtube.com/watch?v=zqyU-lq8mlU", contentId: "zqyU-lq8mlU",
      title: "鬼怒川温泉竜王祭2026", publisher: "蕎麦好きおやじ", publisherType: "individual",
      purpose: "festival_atmosphere", publishedYear: 2026, checkedDate: "2026-08-01"
    }],
    backgroundImage: {
      type: "youtube", contentId: "zqyU-lq8mlU", sourceUrl: "https://www.youtube.com/watch?v=zqyU-lq8mlU",
      publisher: "蕎麦好きおやじ", publisherType: "individual", checkedDate: "2026-08-01"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.nikko-kankou.org/event/403"] }
  },
  yearlyInfo: [{ year: 2026, eventStatus: "ended", dates: ["2026-07-24", "2026-07-25"],
    access: { hasParking: true, parkingNote: "鬼怒川温泉駅前有料駐車場。温泉街では交通規制あり。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.nikko-kankou.org/event/403"], note: "2026年は25日の女樽神輿渡御が中止、花火は実施なし。本祭期間終了済み。" } }]
};
