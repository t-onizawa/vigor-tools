const FESTIVAL = {
  id: "ishioka-omatsuri",
  name: "石岡のおまつり",
  officialName: "常陸國總社宮例大祭",
  prefecture: "茨城県",
  city: "石岡市",
  areaTag: "ibaraki",
  constantInfo: {
    schedulePattern: "9月、敬老の日を最終日とする土・日・月の3日間",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: true,
      hasParade: true,
      highlightTime: "night",
      hayashiNote: "幌獅子の中に囃子連が乗り込み、大太鼓・小太鼓・笛・鉦を演奏する。屋根付きの小屋に囃子連が入る形式は全国的にも珍しいとされる。"
    },
    access: {
      nearestStation: "JR常磐線 石岡駅（西口からすぐ）"
    },
    mapReference: {
      label: "常陸國總社宮",
      pointType: "shrine",
      query: "常陸國總社宮 茨城県石岡市総社2丁目8-1",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=常陸國總社宮+石岡市総社2丁目8-1",
      note: "総社宮は祭礼の中心となる神社です。祭りの巡行・観覧は石岡駅周辺の市街地に広がり、総社宮からは徒歩約20分離れています。"
    },
    highlightComment: null,
    atmosphereMedia: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=o9Otb5uYHCU",
        contentId: "o9Otb5uYHCU",
        title: "5分で振り返る！令和6(2024)年 常陸國總社宮例大祭（石岡のおまつり）",
        publisher: "茨城県石岡市",
        publisherType: "government",
        purpose: "festival_atmosphere",
        publishedYear: 2024,
        checkedDate: "2026-07-27"
      }
    ],
    backgroundImage: {
      type: "youtube",
      contentId: "8q5JKyKTBFQ",
      sourceUrl: "https://www.youtube.com/watch?v=8q5JKyKTBFQ",
      publisher: "祭のきせき（MatsuriNoKiseki）",
      publisherType: "individual",
      checkedDate: "2026-07-29",
      note: "山車（幌獅子）・神輿が鮮明でサムネイルに文字オーバーレイがない。動画自体は36秒と短くatmosphereMediaの採用基準（内容量・尺）は満たさないため、atmosphereMediaには追加せず背景素材としてのみ採用した。"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-27",
      sources: [
        "https://ishiokamatsuri.com/about/",
        "https://social.ja-kyosai.or.jp/prefecture/festival/ibaraki/"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "scheduled_pending_official",
      dates: ["2026-09-19", "2026-09-20", "2026-09-21"],
      yearTownInCharge: "森木町",
      access: {
        hasParking: null,
        parkingNote: "2026年の臨時駐車場情報は未確認"
      },
      confirmation: {
        confirmedDate: "2026-07-27",
        sources: ["https://ishiokamatsuri.com/news/reitaisai-2026/"],
        note: "石岡市公式サイト・常陸國總社宮公式サイトでは2026年情報が未掲載（2025年情報のみ確認済み）。祭り公認サイトの告知のみを根拠としており、一次情報での裏取りが1件のみのため「開催予定・公式詳細待ち」とした。"
      }
    }
  ]
};
