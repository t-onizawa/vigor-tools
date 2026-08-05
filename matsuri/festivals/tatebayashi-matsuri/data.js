const FESTIVAL = {
  id: "tatebayashi-matsuri",
  name: "館林まつり",
  officialName: "第55回館林まつり",
  prefecture: "群馬県",
  city: "館林市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "例年7月中旬の土曜・日曜",
    features: {
      hasDashi: "n/a", hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "本町通りで民踊流し、八木節、パレード、神輿渡御を行う市民祭り。"
    },
    access: { nearestStation: "東武伊勢崎線・佐野線・小泉線 館林駅" },
    mapReference: {
      label: "館林市本町通り", pointType: "viewing_point", query: "館林市 本町通り", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=館林市+本町通り",
      note: "本まつりと神輿一斉渡御の会場となる本町通りを基準地点とした。手筒花火大会は別日程・別会場であり本ページに含めない。"
    },
    highlightComment: "本町通りに5基の神輿が集まり、夜のまつり本部前から一斉渡御する。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "wZ4GbVM6-Bo",
      sourceUrl: "https://www.youtube.com/watch?v=wZ4GbVM6-Bo",
      publisher: "かなめまどか",
      publisherType: "individual",
      checkedDate: "2026-08-05",
      note: "神輿と担ぎ手を文字・ロゴなしの実写で捉え、横長背景で祭りの主役が明確なため採用。"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-31", sources: ["https://www.city.tatebayashi.gunma.jp/s059/kanko/020/20210506113415.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-07-18", "2026-07-19"],
    access: { hasParking: true, parkingNote: "公式チラシに三の丸南面駐車場などを掲載。会場周辺は交通規制あり。" },
    confirmation: { confirmedDate: "2026-07-31", sources: ["https://www.city.tatebayashi.gunma.jp/s059/kanko/020/20210506113415.html", "https://www.city.tatebayashi.gunma.jp/s059/kanko/020/55thchirashi.pdf"], note: "前夜祭7月18日、本まつり7月19日。手筒花火大会は7月25日の別イベントとして分離。" }
  }]
};
