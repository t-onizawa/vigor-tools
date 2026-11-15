const FESTIVAL = {
  id: "motomiya-aki-matsuri", name: "もとみや秋祭り", officialName: "もとみや秋祭り",
  prefecture: "福島県", city: "本宮市", areaTag: "fukushima",
  constantInfo: {
    schedulePattern: "例年10月下旬",
    features: { hasDashi: true, hasMikoshi: true, hasDanceOnDashi: null, hasParade: true, highlightTime: "both", hayashiNote: "安達太良神社の秋季例大祭を中心に、先囃子と神輿が市街地を巡ります。" },
    access: { nearestStation: "JR本宮駅から中心市街地まで徒歩約3分" }, mapReference: null,
    highlightComment: "先囃子が市街地を練り歩き、裸神輿や女性が担ぐ真結女御輿が祭りを彩ります。", atmosphereMedia: [], backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-11-16", sources: ["https://www.city.motomiya.lg.jp/site/kanko/motomiya-akimatsuri.html", "https://www.city.motomiya.lg.jp/site/kanko/2026motomiyaaki.html"] }
  },
  yearlyInfo: [{ year: 2026, eventStatus: "ended", dates: ["2026-10-23", "2026-10-24", "2026-10-25"],
    access: { hasParking: null, parkingNote: "来場者用駐車場は最新の公式案内を確認してください。" },
    confirmation: { confirmedDate: "2026-11-16", sources: ["https://www.city.motomiya.lg.jp/site/kanko/motomiya-akimatsuri.html", "https://www.city.motomiya.lg.jp/site/kanko/2026motomiyaaki.html"], note: "本宮市が10月23〜25日の開催を報告。安達太良神社秋季例大祭を中心とする祭り。" },
    schedule: [
      { date: "2026-10-23", dayLabel: "宵祭り", items: [{ time: "13:00", label: "先囃子合同出発式" }, { time: "17:40", label: "先囃子合同火入れ式" }] },
      { date: "2026-10-24", dayLabel: "本祭り", items: [{ time: "10:00", label: "神輿渡御・安達太良太鼓奉納" }, { time: "16:30", label: "裸神輿出発" }] },
      { date: "2026-10-25", dayLabel: "後祭り", items: [{ time: "8:00", label: "先囃子運行" }, { time: "19:30", label: "先囃子合同解散式" }] }
    ]
  }]
};
