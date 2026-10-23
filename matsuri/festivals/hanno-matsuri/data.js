const FESTIVAL = {
  id: "hanno-matsuri",
  name: "飯能まつり",
  officialName: null,
  prefecture: "埼玉県",
  city: "飯能市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "例年11月第1土曜日・日曜日",
    features: {
      hasDashi: true, hasMikoshi: null, hasDanceOnDashi: null, hasParade: true, highlightTime: "both",
      hayashiNote: "初日は底抜け屋台、2日目は11か町の山車巡行・総覧・引き合わせが中心。"
    },
    access: { nearestStation: "西武池袋線 飯能駅・JR八高線 東飯能駅" },
    mapReference: {
      label: "飯能駅北口周辺", pointType: "viewing_point", query: "飯能駅 埼玉県飯能市", lat: 35.8508472, lng: 139.3203652,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=飯能駅+埼玉県飯能市",
      note: "中心市街地で底抜け屋台と山車の巡行が行われます。"
    },
    highlightComment: "初日の底抜け屋台から、翌日の11か町の山車総覧・引き合わせへ展開する二段構成が特徴。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "j2SjrnpPIWc",
      sourceUrl: "https://www.youtube.com/watch?v=j2SjrnpPIWc",
      publisher: "Japan Walk Boy",
      publisherType: "individual",
      checkedDate: "2026-08-05",
      note: "複数の山車と夜の祭り風景を文字装飾なしで捉え、横長背景で主役が明確なため採用。"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/452.html", "https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/minzoku/index.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-11-07", "2026-11-08"],
    schedule: [
      { date: "2026-11-07", dayLabel: "1日目（2026年・飯能市公式の発表）", items: [{ time: "12:00〜21:00", label: "開催時間（催し物の内容は公式が決まり次第更新としており、未発表）" }] },
      { date: "2026-11-08", dayLabel: "2日目（2026年・飯能市公式の発表）", items: [{ time: "9:00〜21:00", label: "開催時間（催し物の内容は公式が決まり次第更新としており、未発表）" }] }
    ],
    access: { hasParking: null, parkingNote: "2026年の臨時駐車場・交通規制詳細は未発表。" },
    confirmation: {
      confirmedDate: "2026-10-23", sources: ["https://www.city.hanno.lg.jp/kanko_bunka_sports/kankojoho/oshirase/10535.html"],
      note: "飯能市公式（2026年8月27日更新）で、2026年11月7日（土）正午から午後9時、8日（日）午前9時から午後9時の開催日時を確認。催し物の内容・交通規制は公式が決まり次第更新としており、未発表のため掲載していない。"
    }
  }]
};
