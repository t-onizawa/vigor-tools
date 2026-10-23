const FESTIVAL = {
  id: "honjo-matsuri",
  name: "本庄まつり",
  officialName: "金鑚神社大祭",
  prefecture: "埼玉県",
  city: "本庄市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "毎年11月2日・3日",
    features: {
      hasDashi: true, hasMikoshi: null, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "both",
      hayashiNote: "人形山車10基が中山道を巡行し、交差点などでお囃子を叩き合う。"
    },
    access: { nearestStation: "JR高崎線 本庄駅" },
    mapReference: {
      label: "金鑚神社", pointType: "shrine", query: "金鑚神社 本庄市", lat: 36.2431934, lng: 139.1769984,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=金鑚神社+本庄市",
      note: "金鑚神社と中山道を中心とした本庄市街地で行われます。"
    },
    highlightComment: "明治5年から大正13年に建造された市指定8基を含む、人形山車10基が中山道を巡行する。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=L5DaP7RcvsU",
      contentId: "L5DaP7RcvsU",
      title: "令和元年度本庄まつり　Honjo Matsuri（Honjo Festival）2019",
      publisher: "本庄市観光協会",
      publisherType: "tourism",
      purpose: "festival_atmosphere",
      publishedYear: 2019,
      checkedDate: "2026-07-31"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "L5DaP7RcvsU",
      sourceUrl: "https://www.youtube.com/watch?v=L5DaP7RcvsU",
      publisher: "本庄市観光協会",
      publisherType: "tourism",
      checkedDate: "2026-07-31"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.honjo-kanko.jp/event/honjomatsuri/", "https://www.honjo-kanko.jp/honjo-matsuri/highlight/"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-11-02", "2026-11-03"],
    schedule: [
      { date: "2026-11-02", dayLabel: "1日目（2026年・本庄市観光協会の発表）", items: [
        { time: "午後", label: "各町内の山車の曳き廻し（時刻は公式に記載なし）" }
      ]},
      { date: "2026-11-03", dayLabel: "2日目（2026年・本庄市観光協会の発表）", items: [
        { time: "11:00〜17:00", label: "金鑚神楽本庄組による神楽奉納（数回に分けて開催）" },
        { time: "11:00〜12:00", label: "前パレード：民踊流し（銀座通り→本庄ガスECOはにぽんプラザ）" },
        { time: "12:10〜", label: "金鑚神社御神幸祭・山車出発" },
        { time: "13:00〜14:00", label: "前パレード：南京玉すだれ演舞（本庄ガスECOはにぽんプラザ・ホンダプロモーション本庄銀座店前）" },
        { time: "14:30〜", label: "山車の駅前通り巡行" },
        { time: "15:00〜17:00", label: "前パレード：明るい社会づくり平和行進（中山道→銀座通り→本庄ガスECOはにぽんプラザ）" },
        { time: "19:00〜", label: "山車の勢揃い・当番町引継式（本庄ガスECOはにぽんプラザ）" }
      ]}
    ],
    access: { hasParking: null, parkingNote: "2026年の駐車場は公式の本文に記載なし。交通規制図は広報ほんじょうおしらせ版10月15日号に折り込まれているとのみ案内されており、規制の時間帯・範囲は未確認。11/3のみ、本庄まつりとこだま秋まつりを行き来するためのバス料金割引券（現金のみ・交通系ICカード不可）が配布される。" },
    confirmation: {
      confirmedDate: "2026-10-23", sources: ["https://www.honjo-kanko.jp/topics/none/20261014_10704/"],
      note: "本庄市観光協会の2026年10月14日の記事で、令和8年11月2日（月）・3日（火・祝）の時程（山車の曳き廻し、神楽奉納、御神幸祭・山車巡行、前パレード、勢揃い・当番町引継式）とバス料金割引券を確認。11/2は「午後」のみで具体的な時刻の記載なし。交通規制の時間帯・範囲と駐車場は公式本文に記載がなく、規制図（広報折込）の原文も確認できていないため未掲載。"
    }
  }]
};
