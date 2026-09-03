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
    highlightComment: "屋根付きの「幌獅子」に囃子連が乗り演奏する形式は全国的にも珍しく、山車前の舞台ではおかめ・ひょっとこ踊りが披露される。幌獅子や山車の巡行は主に2日目午後に集中し、公式の位置情報配信システムで山車・獅子の現在地を確認しながら観覧できる。",
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
        "https://social.ja-kyosai.or.jp/prefecture/festival/ibaraki/",
        "https://doconeel.com/ishioka/"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "confirmed",
      dates: ["2026-09-19", "2026-09-20", "2026-09-21"],
      yearTownInCharge: "森木町",
      access: {
        hasParking: null,
        parkingNote: "公式の交通案内では臨時駐車場の案内はなく、鉄道・バス・タクシーでの来場が案内されている。"
      },
      confirmation: {
        confirmedDate: "2026-09-03",
        sources: ["https://www.ishioka-kankou.com/events/ishioka-matsuri/", "https://www.ishioka-kankou.com/topics/tokubetsu-kanran/", "https://www.ishioka-kankou.com/topics/ishioka-matsuri-koutsuu-2026/", "https://ishiokamatsuri.com/news/reitaisai-2026/"],
        note: "石岡市観光協会公式で2026年9月19日〜21日の開催、13:00〜21:00の交通規制、鉄道・バス・タクシー案内を確認。専用の臨時駐車場案内は無い。特別観覧席の販売情報も確認済み（前売4,400円・限定48席、公式オンラインストア）。石岡のおまつり公式（実行委員会）の2026年タイムスケジュールも確認：初日9/19は9:00御綱祭・13:00神幸祭で開始、2日目9/20は11:00奉納相撲、15:00幌獅子大行列、16:45山車大行列、3日目9/21は13:10仮殿発輿祭・16:40還幸祭と年番引継ぎ式で終了。全体の開催時間は9:00〜21:00。"
      }
    }
  ]
};
