const FESTIVAL = {
  id: "enoshima-tennosai",
  name: "江の島天王祭",
  officialName: "江島神社 八坂神社例祭（江の島天王祭）",
  prefecture: "神奈川県",
  city: "藤沢市",
  areaTag: "kanagawa",
  constantInfo: {
    schedulePattern: "例年7月第2日曜日を中心に開催",
    features: {
      hasDashi: "n/a", hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "daytime",
      hayashiNote: "江島神社八坂神社の神輿が海へ入り、対岸の小動神社の神輿と行き合う海の祭礼。"
    },
    access: { nearestStation: "小田急江ノ島線 片瀬江ノ島駅" },
    mapReference: {
      label: "江の島弁天橋周辺", pointType: "viewing_point", query: "江の島弁天橋", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=江の島弁天橋",
      note: "神輿の渡御経路に近い江の島弁天橋周辺を観覧基準地点とした。"
    },
    highlightComment: "海へ入った江島神社と小動神社の神輿が行き合い、二基で揉み合う「行合祭」が見どころ。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=G_LYJVQ816E",
      contentId: "G_LYJVQ816E",
      title: "江ノ島天王祭海上渡御2026",
      publisher: "oyr55",
      publisherType: "individual",
      purpose: "festival_atmosphere",
      publishedYear: 2026,
      checkedDate: "2026-08-01"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "G_LYJVQ816E",
      sourceUrl: "https://www.youtube.com/watch?v=G_LYJVQ816E",
      publisher: "oyr55",
      publisherType: "individual",
      checkedDate: "2026-08-01",
      note: "江の島東浜で神輿が海へ入る場面を文字なしで捉え、横長トリミングでも海上渡御の主役が明確なため採用。"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.fujisawa-kanko.jp/event/20260601.html", "https://enoshimajinja.or.jp/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-07-12"],
    access: { hasParking: null, parkingNote: "2026年祭礼用駐車場は未確認。公共交通機関の利用を推奨。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.fujisawa-kanko.jp/event/20260601.html"], note: "2026年7月12日開催。神輿の海上渡御は午前11時頃と案内された。" }
  }]
};
