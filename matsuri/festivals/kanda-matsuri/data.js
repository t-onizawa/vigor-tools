const FESTIVAL = {
  id: "kanda-matsuri",
  name: "神田祭",
  officialName: "神田祭",
  prefecture: "東京都",
  city: "千代田区",
  areaTag: "tokyo",
  constantInfo: {
    schedulePattern: "本祭は隔年（奇数年）、例大祭は毎年5月15日",
    features: {
      hasDashi: null,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "daytime",
      hayashiNote: "本祭年には神幸祭と氏子町会の神輿宮入が行われる。"
    },
    access: { nearestStation: "JR・東京メトロ 御茶ノ水駅、東京メトロ 新御茶ノ水駅・末広町駅" },
    mapReference: {
      label: "神田明神",
      pointType: "shrine",
      query: "神田明神 東京都千代田区",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=神田明神+東京都千代田区",
      note: "本祭年の神幸祭は神田・日本橋・大手町・秋葉原一帯を巡ります。"
    },
    highlightComment: "隔年の本祭では神幸祭と町神輿の宮入りが行われる。次回の本祭は2027年。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=MThJ2cvI-Zk",
      contentId: "MThJ2cvI-Zk",
      title: "令和七年 神田祭 ３分ハイライト",
      publisher: "江戸総鎮守 神田明神 公式チャンネル -KANDAMYOUJIN-",
      publisherType: "official",
      purpose: "festival_atmosphere",
      publishedYear: 2025,
      checkedDate: "2026-08-01"
    }],
    backgroundImage: null,
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-30",
      sources: ["https://kandamatsuri.com/", "https://www.kandamyoujin.or.jp/event/detail/?id=69"]
    }
  },
  yearlyInfo: [{
    year: 2026,
    eventStatus: "off_year",
    dates: ["2026-05-15"],
    access: { hasParking: false, parkingNote: "専用駐車場の公式案内は確認できない。公共交通機関の利用を前提とする。" },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: ["https://www.kandamyoujin.or.jp/event/detail/?id=69", "https://kandamatsuri.com/"],
      note: "2026年は陰祭年のため、神幸祭・神輿宮入は実施されない。5月15日14時から例大祭を斎行し、献饌、巫女舞、祝詞奏上、玉串拝礼、創生神楽・里神楽の奉納を行った。次回の本祭は2027年。"
    }
  }]
};
