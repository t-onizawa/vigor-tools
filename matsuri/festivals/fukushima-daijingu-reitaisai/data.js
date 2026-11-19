const FESTIVAL = {
  id: "fukushima-daijingu-reitaisai", name: "福島大神宮例大祭", officialName: "福島大神宮例大祭",
  prefecture: "北海道", city: "松前郡福島町", areaTag: "hokkaido",
  constantInfo: {
    schedulePattern: "例年9月",
    features: { hasDashi: true, hasMikoshi: true, hasDanceOnDashi: null, hasParade: true, highlightTime: "both", hayashiNote: "福島町の祭礼行列では、四ヶ散米行列や神輿に各町内会の山車が続きます。" },
    access: { nearestStation: "木古内駅から函館バスで福島下車、徒歩約5分" }, mapReference: null,
    highlightComment: "福島町の祭礼行列では、四ヶ散米行列や神輿に各町内会の山車が続きます。", atmosphereMedia: [], backgroundImage: {type:"youtube",contentId:"hvXQWENFWPs",sourceUrl:"https://www.youtube.com/watch?v=hvXQWENFWPs",publisher:"泰平山実行委員会",publisherType:"individual",checkedDate:"2026-11-19",note:"優先度1。2026年祭礼行列の踊りを写した文字のない現地実写。"},
    confirmation: { verified: true, confirmedDate: "2026-11-15", sources: ["https://be-happy-fukushima.com/event/fukushima-daijingu/", "https://hokkaidojinjacho.jp/%E7%A6%8F%E5%B3%B6%E5%A4%A7%E7%A5%9E%E5%AE%AE/"] }
  },
  yearlyInfo: [{ year: 2026, eventStatus: "ended", dates: ["2026-09-11", "2026-09-12", "2026-09-13", "2026-09-16"],
    access: { hasParking: null, parkingNote: "来場者用駐車場は最新の公式案内を確認してください。" },
    confirmation: { confirmedDate: "2026-11-15", sources: ["https://be-happy-fukushima.com/oshirase/annual-festival/"], note: "2026年の公式案内に記載された4日間。9月14・15日の行事は記載がないため含めない。" },
    schedule: [
      { date: "2026-09-11", dayLabel: "宵宮祭", items: [{ time: "18:30", label: "宵宮祭" }] },
      { date: "2026-09-12", dayLabel: "祭礼行列", items: [{ time: "8:00", label: "神輿渡御" }] },
      { date: "2026-09-13", dayLabel: "祭礼行列", items: [{ time: "9:00", label: "神輿渡御" }] },
      { date: "2026-09-16", dayLabel: "本祭", items: [{ time: "10:00", label: "本祭" }] }
    ]
  }]
};
