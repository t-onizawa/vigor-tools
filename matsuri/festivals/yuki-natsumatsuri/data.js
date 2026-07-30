const FESTIVAL = {
  id: "yuki-natsumatsuri",
  name: "結城夏祭り",
  officialName: "健田須賀神社夏季大祭",
  prefecture: "茨城県",
  city: "結城市",
  areaTag: "ibaraki",
  constantInfo: {
    schedulePattern: "例年7月中旬（出御・中日・還御）と7月31日の夏越祭",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: "n/a",
      hasParade: "n/a",
      highlightTime: "night",
      hayashiNote: "中日には万燈神輿・子供みこしのパレードとお囃子演奏会が行われる。"
    },
    access: {
      nearestStation: "JR水戸線 結城駅（北口）"
    },
    mapReference: {
      label: "健田須賀神社",
      pointType: "shrine",
      query: "健田須賀神社 茨城県結城市結城195",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=健田須賀神社+茨城県結城市結城195",
      note: "健田須賀神社と氏子町内が祭りの会場です。"
    },
    highlightComment: "「日本一のあばれ神輿」と伝わる大神輿が、出御と還御で氏子町内を渡御する。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-30",
      sources: [
        "https://www.city.yuki.lg.jp/kankou/event/page000147.html",
        "https://www.ibarakiken-jinjacho.or.jp/ibaraki/kensei/jinja/13001.html"
      ]
    }
  },
  yearlyInfo: [{
    year: 2026,
    eventStatus: "ended",
    dates: ["2026-07-12", "2026-07-15", "2026-07-19", "2026-07-31"],
    access: {
      hasParking: true,
      parkingNote: "出御・中日・還御は結城市観光駐車場を封鎖し、旧市役所北側砂利駐車場を来場者用に案内。交通規制・歩行者天国あり。"
    },
    confirmation: {
      confirmedDate: "2026-07-30",
      sources: ["https://www.city.yuki.lg.jp/kankou/event/page000147.html"],
      note: "主要行事の出御（7/12）・中日（7/15）・還御（7/19）は終了済み。7/31の夏越祭のみ残るが、Founder確認済みの判断に従い祭り全体は終了扱い。"
    }
  }]
};
