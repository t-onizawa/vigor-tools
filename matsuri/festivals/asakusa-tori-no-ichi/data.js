const FESTIVAL = {
  id: "asakusa-tori-no-ichi",
  name: "浅草の酉の市",
  officialName: "鷲神社 例祭（酉の市）・長國寺",
  prefecture: "東京都",
  city: "台東区千束",
  areaTag: "tokyo",
  constantInfo: {
    schedulePattern: "毎年11月の酉の日（年により一の酉・二の酉、三の酉まで）",
    features: {
      hasDashi: "n/a",
      hasMikoshi: "n/a",
      hasDanceOnDashi: "n/a",
      hasParade: false,
      highlightTime: "both",
      hayashiNote: "午前0時の一番太鼓とともに御例祭が始まり、丸一日続く。境内には熊手を売る店が立ち並ぶ。"
    },
    access: { nearestStation: "東京メトロ日比谷線 入谷駅・つくばエクスプレス 浅草駅から徒歩圏" },
    mapReference: {
      label: "鷲神社",
      pointType: "shrine",
      query: "鷲神社 東京都台東区千束3丁目",
      lat: 35.7225235,
      lng: 139.7919508,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=鷲神社+東京都台東区千束3丁目",
      note: "鷲神社（台東区千束3丁目鎮座）と隣接する長國寺の周辺で行われる。座標は鷲神社の基準地点を示し、酉の市の範囲全体を表すものではない。"
    },
    highlightComment: "午前0時の一番太鼓とともに始まり、丸一日続く酉の市。鷲神社と長國寺の境内に熊手店が立ち並び、福運や財をかき込む縁起物「かっこめ」を求める人で賑わう。",
    atmosphereMedia: [],
    backgroundImage: null,
    confirmation: {
      verified: true,
      confirmedDate: "2026-10-23",
      sources: [
        "https://otorisama.or.jp/kotoshi.html",
        "https://www.city.taito.lg.jp/event/kanko/torinoithi.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "confirmed",
      dates: ["2026-11-07", "2026-11-19"],
      schedule: [
        {
          date: "2026-11-07",
          dayLabel: "一の酉（2026年・鷲神社公式の発表）",
          items: [
            { time: "0:00", label: "一の酉の開始（午前0時の一番太鼓。24時間開催）" },
            { time: "前日23:15〜", label: "宵宮開運福寿祭（11月6日(金)。参列は事前予約制）" },
            { time: "13:00〜", label: "鷲祭特別祭儀（参列は事前予約制）" }
          ]
        },
        {
          date: "2026-11-19",
          dayLabel: "二の酉（2026年・鷲神社公式の発表）",
          items: [
            { time: "0:00", label: "二の酉の開始（午前0時の一番太鼓。24時間開催）" },
            { time: "前日23:15〜", label: "宵宮開運福寿祭（11月18日(水)。参列は事前予約制）" },
            { time: "13:00〜", label: "鷲祭特別祭儀（参列は事前予約制）" }
          ]
        }
      ],
      access: {
        hasParking: false,
        parkingNote: "鷲神社公式は「酉の市当日は駐車場の準備はございません」として公共交通機関の利用を案内している。やむを得ず車で来る場合も路上駐車はせず、最寄りの駐車場を利用するよう案内されている。"
      },
      confirmation: {
        confirmedDate: "2026-10-23",
        sources: [
          "https://otorisama.or.jp/kotoshi.html",
          "https://otorisama.or.jp/parking.html",
          "https://www.city.taito.lg.jp/event/kanko/torinoithi.html"
        ],
        note: "鷲神社公式「今年の酉の市」で、令和8年の一の酉11月7日・二の酉11月19日（三の酉なし）、開催時間は各日0時〜24時、宵宮開運福寿祭（11/6・11/18 23:15〜）、鷲祭特別祭儀（13:00〜）を原文確認。台東区公式（2026年9月24日更新）も同日程・開催場所は鷲神社・長國寺。鷲神社公式の二の酉の鷲祭特別祭儀の行は曜日が「水」と誤記されているため（11月19日は木曜）、日付を優先し曜日は転記していない。最寄り駅の徒歩分数は鷲神社公式と台東区公式で異なるため分数は記載していない。"
      }
    }
  ]
};
