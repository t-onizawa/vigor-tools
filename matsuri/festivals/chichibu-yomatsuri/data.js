const FESTIVAL = {
  id: "chichibu-yomatsuri",
  name: "秩父夜祭",
  officialName: "秩父神社例大祭",
  prefecture: "埼玉県",
  city: "秩父市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "毎年12月2日（宵宮）・3日（大祭）固定",
    features: {
      hasDashi: true,
      hasMikoshi: true,
      hasDanceOnDashi: true,
      hasParade: true,
      highlightTime: "night",
      hayashiNote: "秩父屋台囃子。大太鼓1・小太鼓3〜4・鉦1・笛1で構成され、屋台後方の下座（楽屋）に太鼓奏者が乗り込み、座ったまま打つ「座位打ち」という珍しいスタイルで演奏する。曳行中は大太鼓、方向転換（ギリ廻し）時には小太鼓のみによる「玉入れ」という特殊な演奏を行う。"
    },
    access: {
      nearestStation: "秩父鉄道 秩父駅（徒歩約3分）／西武秩父線 西武秩父駅（徒歩約15分）"
    },
    mapReference: {
      label: "秩父神社",
      pointType: "shrine",
      query: "秩父神社 埼玉県秩父市番場町1-3",
      lat: 35.9976189,
      lng: 139.0841388,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=秩父神社+埼玉県秩父市番場町1-3",
      note: "秩父神社は例大祭の中心となる神社です。屋台の曳行・団子坂の曳き上げは秩父市街地一帯で行われます。"
    },
    highlightComment: "最大20tの屋台が「団子坂」と呼ばれる急坂を曳き上げられる。",
    atmosphereMedia: [{
      type: "youtube",
      url: "https://www.youtube.com/watch?v=Hk3eNzg1Sls",
      contentId: "Hk3eNzg1Sls",
      title: "秩父夜祭【埼玉県公式観光動画】",
      publisher: "ChokotabiSaitama",
      publisherType: "tourism",
      purpose: "festival_atmosphere",
      publishedYear: 2011,
      checkedDate: "2026-08-01"
    }],
    backgroundImage: {
      type: "youtube",
      contentId: "Hk3eNzg1Sls",
      sourceUrl: "https://www.youtube.com/watch?v=Hk3eNzg1Sls",
      publisher: "ChokotabiSaitama",
      publisherType: "tourism",
      checkedDate: "2026-08-01"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "https://navi.city.chichibu.lg.jp/p_festival/1030/",
        "https://www.chichibuji.gr.jp/event/yomatsuri/",
        "https://www.chichibu-matsuri.jp/yomatsuri/"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "confirmed",
      dates: ["2026-12-02", "2026-12-03"],
      access: {
        hasParking: null,
        parkingNote: "2026年の臨時駐車場・交通案内図は秩父市公式で準備中（2026年10月19日時点）。祭り当日は交通規制が敷かれるため、公式の発表を確認してください。"
      },
      confirmation: {
        confirmedDate: "2026-10-19",
        sources: [
          "https://navi.city.chichibu.lg.jp/info/2026/10/31171/",
          "https://www.chichibuji.gr.jp/event/yomatsuri/"
        ],
        note: "秩父市公式の2026年10月13日更新で、宵宮12月2日（水）・本祭12月3日（木）を確認。臨時駐車場・交通案内図は準備中。"
      }
    }
  ]
};
