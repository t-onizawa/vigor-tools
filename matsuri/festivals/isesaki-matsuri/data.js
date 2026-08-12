const FESTIVAL = {
  id: "isesaki-matsuri",
  name: "いせさきまつり",
  officialName: "いせさきまつり",
  prefecture: "群馬県",
  city: "伊勢崎市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年秋季（開催日は年度ごとに発表）",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "本町通り周辺で山車・屋台の巡行競演、みこし、民踊流し、郷土芸能などを行う。公式プログラムでは民踊流しと山車・屋台巡行が別項目で、踊りは山車上ではなく路上で行う。"
    },
    access: { nearestStation: "JR両毛線・東武伊勢崎線 伊勢崎駅" },
    mapReference: {
      label: "伊勢崎市本町通り", pointType: "viewing_point", query: "伊勢崎市 本町通り 群馬県", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=伊勢崎市+本町通り+群馬県",
      note: "伊勢崎市が2026年の会場として示す本町通りを基準地点とした。"
    },
    highlightComment: "本町通りで山車・屋台の巡行競演とみこしが続き、2日間を通じて民踊や郷土芸能も披露される。",
    atmosphereMedia: [{ type: "youtube", url: "https://www.youtube.com/watch?v=cGFNZ-uSVfk", contentId: "cGFNZ-uSVfk", title: "【伊勢崎市伝統】令和5年度いせさきまつり", publisher: "群馬県伊勢崎市【動画で見るいせさき】", publisherType: "government", purpose: "festival_atmosphere", publishedYear: 2023, checkedDate: "2026-08-12" }],
    backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-08-06", sources: ["https://www.city.isesaki.lg.jp/soshiki/keizai/bunka/kankou/gyoji/1427.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "scheduled_pending_official", dates: ["2026-09-26", "2026-09-27"],
    access: { hasParking: null, parkingNote: "2026年の駐車場・交通規制は公式詳細待ち。" },
    confirmation: { confirmedDate: "2026-08-06", sources: ["https://www.city.isesaki.lg.jp/material/files/group/17/0326_28_nagekomi_bunkakankou.pdf"], note: "伊勢崎市が2026年9月26日・27日、本町通りほかでの開催を発表。詳細は決定次第案内すると明記されているため、開催予定・公式詳細待ちとした。" }
  }]
};
