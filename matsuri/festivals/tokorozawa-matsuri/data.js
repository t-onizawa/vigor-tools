const FESTIVAL = {
  id: "tokorozawa-matsuri",
  name: "ところざわまつり",
  officialName: "令和8年 ところざわまつり",
  prefecture: "埼玉県",
  city: "所沢市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "例年10月（開催日は年度ごとに発表）",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "所沢の伝統ある山車を曳き廻し、重松流祭囃子を披露する。民踊流しは路上で行われ、山車上の踊りではない。"
    },
    access: { nearestStation: "西武池袋線・西武新宿線 所沢駅（西口）" },
    mapReference: {
      label: "所沢駅西口ロータリー", pointType: "viewing_point", query: "所沢駅西口ロータリー 埼玉県所沢市", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=所沢駅西口ロータリー+埼玉県所沢市",
      note: "公式が山車・神輿の運行と交通規制の範囲に示す所沢駅西口ロータリーを観覧の基準地点とした。"
    },
    highlightComment: "10基の山車と神輿が所沢駅西口から中央地区の通りを進み、重松流祭囃子が街なかに響く。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: { verified: true, confirmedDate: "2026-08-07", sources: ["https://tokorozawa-cci.or.jp/matsuri/about/index.html", "https://tokorozawa-cci.or.jp/matsuri/about/outline.html", "https://tokorozawa-cci.or.jp/matsuri/schedule/index.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-10-11"],
    access: { hasParking: false, parkingNote: "会場に駐車場はないため、公式は車での来場を控えるよう案内している。" },
    confirmation: { confirmedDate: "2026-08-24", sources: ["https://tokorozawa-cci.or.jp/matsuri/about/outline.html", "https://www.city.tokorozawa.saitama.jp/iitokoro/event/main/omaturi/tokorozawamatsuritowaR7.html", "https://tokorozawa-cci.or.jp/matsuri/announce/"], note: "令和8年10月11日に所沢市中央地区で開催。公式実施概要で山車10基、神輿、民踊流しなどの催物と10時から21時までの交通規制を確認した。" }
  }]
};
