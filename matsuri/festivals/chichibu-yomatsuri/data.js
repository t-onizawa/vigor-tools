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
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=秩父神社+埼玉県秩父市番場町1-3",
      note: "秩父神社は例大祭の中心となる神社です。屋台の曳行・団子坂の曳き上げは秩父市街地一帯で行われます。"
    },
    highlightComment: "最大20tの屋台が「団子坂」と呼ばれる急坂を曳き上げられる。",
    atmosphereMedia: [],
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
      eventStatus: "scheduled_pending_official",
      dates: ["2026-12-02", "2026-12-03"],
      access: {
        hasParking: null,
        parkingNote: "秩父神社公式サイトのアクセス案内には駐車場の記載がない。祭り当日は交通規制が敷かれるため、2026年の駐車場詳細は別途確認が必要。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: [
          "https://navi.city.chichibu.lg.jp/p_festival/1030/",
          "https://www.chichibuji.gr.jp/event/yomatsuri/"
        ],
        note: "毎年12月2日・3日固定という恒常的な開催パターンによる確認。2026年個別の公式発表は調査時点(2026-07-28)では未確認だが、100年以上続く固定日程の例大祭であるため開催予定として扱う。"
      }
    }
  ]
};
