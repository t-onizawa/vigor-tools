const FESTIVAL = {
  id: "omama-gion-matsuri",
  name: "大間々祇園まつり",
  officialName: "令和8年度 大間々祇園まつり",
  prefecture: "群馬県",
  city: "みどり市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "毎年8月1日から3日まで",
    features: {
      hasDashi: true, hasMikoshi: true, hasDanceOnDashi: false, hasParade: true, highlightTime: "both",
      hayashiNote: "祇園囃子を奏でる7台の山車が本町通りを巡行する。神馬や神輿の渡御、町内・団体の神輿パレードも日を分けて行われる。"
    },
    access: { nearestStation: "わたらせ渓谷鐵道 大間々駅から徒歩約8分／東武・上毛電気鉄道 赤城駅から徒歩約15分" },
    mapReference: {
      label: "みどり市役所大間々庁舎周辺", pointType: "viewing_point", query: "みどり市役所大間々庁舎 群馬県みどり市大間々町大間々1511", lat: null, lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=みどり市役所大間々庁舎+群馬県みどり市大間々町大間々1511",
      note: "公式が会場とする大間々町1丁目から7丁目の本町通りに面する大間々庁舎周辺を観覧の基準地点とした。"
    },
    highlightComment: "神馬が町を進み、祇園囃子を奏でる7台の山車が本町通りを巡行。神輿渡御や最終日の礼参りまで続く。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=wTLJF0jR5M0",
      contentId: "wTLJF0jR5M0",
      title: "大間々祇園まつり紹介ムービー（long ver .）",
      publisher: "【みどり市公式観光情報】いろどりみどり市",
      publisherType: "government",
      purpose: "festival_atmosphere",
      publishedYear: 2026,
      checkedDate: "2026-08-12"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "wTLJF0jR5M0",
      sourceUrl: "https://www.youtube.com/watch?v=wTLJF0jR5M0",
      publisher: "【みどり市公式観光情報】いろどりみどり市",
      publisherType: "government",
      checkedDate: "2026-08-12",
      note: "神馬と行列が写る公式紹介動画の高解像度サムネイル。文字オーバーレイがなく祭りの情景を判別できる。"
    },
    confirmation: { verified: true, confirmedDate: "2026-08-12", sources: ["https://www.city.midori.gunma.jp/sangyou/1001646/1001795/1009707.html", "https://www.city.midori.gunma.jp/kosodate/1001647/1001800/1002428/1002505.html", "https://www.city.midori.gunma.jp/sangyou/1001646/1001795/1005777.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "ended", dates: ["2026-08-01", "2026-08-02", "2026-08-03"],
    access: { hasParking: true, parkingNote: "2026年公式会場案内図に臨時を含む指定駐車場が掲載されている。3日間とも本町通りで14時から22時まで交通規制あり。" },
    confirmation: { confirmedDate: "2026-08-12", sources: ["https://www.city.midori.gunma.jp/sangyou/1001646/1001795/1009707.html", "https://www.city.midori.gunma.jp/_res/projects/default_project/_page_/001/009/707/r8kaijouannaizu.jpg"], note: "令和8年度は2026年8月1日から3日まで、大間々町1丁目から7丁目の本町通りで開催。確認日現在は終了済み。" }
  }]
};
