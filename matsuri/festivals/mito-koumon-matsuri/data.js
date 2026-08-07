const FESTIVAL = {
  id: "mito-koumon-matsuri",
  name: "水戸黄門まつり",
  officialName: "第66回水戸黄門まつり 本祭",
  prefecture: "茨城県",
  city: "水戸市",
  areaTag: "ibaraki",
  constantInfo: {
    schedulePattern: "例年8月上旬の土曜日・日曜日（本祭）",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: "n/a", hasParade: true, highlightTime: "both",
      hayashiNote: "本祭では山車巡行・叩き合い、水戸ふるさとみこし渡御、水戸黄門カーニバル、提灯行列が行われる。"
    },
    access: { nearestStation: "JR常磐線 水戸駅" },
    mapReference: {
      label: "水戸駅北口〜大工町", pointType: "viewing_point", query: "南町3丁目交差点 水戸市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=南町3丁目交差点+水戸市",
      note: "本祭は水戸駅北口から大工町交差点までの国道50号を中心に行われます。"
    },
    highlightComment: "15台の山車が囃子を競う大叩き合いと、水府提灯の行列が水戸の中心街を昼夜でつなぐ。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=KsrAxgLMUjM",
      contentId: "KsrAxgLMUjM",
      title: "水戸黄門まつり MITO KOMON FESTIVAL 2025",
      publisher: "Japan Trip Guide",
      publisherType: "individual",
      purpose: "festival_atmosphere",
      publishedYear: 2025,
      checkedDate: "2026-07-31"
    }],
    backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://mitokoumon.com/koumon/honsai.html", "https://www.city.mito.lg.jp/page/124507.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-08-01", "2026-08-02"],
    access: { hasParking: null, parkingNote: "本祭期間は国道50号などで交通規制。祭り専用駐車場は未確認。" },
    confirmation: {
      confirmedDate: "2026-08-07", sources: ["https://mitokoumon.com/koumon/honsai.html", "https://www.city.mito.lg.jp/page/124507.html"],
      note: "水戸黄門まつり実行委員会主催の本祭として、山車巡行、みこし渡御、カーニバル、提灯行列を同一プログラム内で確認。花火大会は別日程のため本ページの日付に含めない。"
    }
  }]
};
