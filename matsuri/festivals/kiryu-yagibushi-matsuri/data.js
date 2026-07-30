const FESTIVAL = {
  id: "kiryu-yagibushi-matsuri",
  name: "桐生八木節まつり",
  officialName: null,
  prefecture: "群馬県",
  city: "桐生市",
  areaTag: "gunma",
  constantInfo: {
    schedulePattern: "毎年8月第一金曜日から3日間",
    features: {
      hasDashi: false,
      hasMikoshi: true,
      hasDanceOnDashi: false,
      hasParade: false,
      highlightTime: "night",
      hayashiNote: "八木節踊りは本町通り等の固定やぐら（6箇所）で行われ、山車の上ではない。数年に一度、鉾の曳き違い（3区の江戸型山車と4区の須佐之男命を乗せた鉾が競演）が行われるが、2026年は実施されない。"
    },
    access: {
      nearestStation: "上毛電気鉄道 西桐生駅（美和神社から徒歩9分）／JR両毛線・わたらせ渓谷鐵道 桐生駅"
    },
    mapReference: {
      label: "美和神社",
      pointType: "shrine",
      query: "美和神社 群馬県桐生市宮本町2丁目1-1",
      lat: null,
      lng: null,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=美和神社+群馬県桐生市宮本町2丁目1-1",
      note: "美和神社は神輿の宵の出御・還御の基点です。"
    },
    highlightComment: "6箇所の固定やぐらで踊られる「八木節おどり」に加え、全国から踊り手が集う「全日本八木節競演大会」も行われる。",
    atmosphereMedia: [
      {
        type: "youtube",
        url: "https://www.youtube.com/watch?v=LgcZuf72uSo",
        contentId: "LgcZuf72uSo",
        title: "#02　熱中しよう桐生八木節まつり",
        publisher: "桐生市チャンネル【kiryucitychannel】",
        publisherType: "government",
        purpose: "festival_atmosphere",
        publishedYear: 2023,
        checkedDate: "2026-07-29"
      }
    ],
    backgroundImage: {
      type: "youtube",
      contentId: "0M_1-qEMKbM",
      sourceUrl: "https://www.youtube.com/watch?v=0M_1-qEMKbM",
      publisher: "祭のきせき（MatsuriNoKiseki）",
      publisherType: "individual",
      checkedDate: "2026-07-29",
      note: "神輿の町内巡行の様子が鮮明でサムネイルに文字オーバーレイがない。背景素材としてのみ採用（atmosphereMediaは空配列のまま）。"
    },
    confirmation: {
      verified: true,
      confirmedDate: "2026-07-28",
      sources: [
        "http://www.kiryu-maturi.net/",
        "http://www.kiryu-maturi.net/schedule.html"
      ]
    }
  },
  yearlyInfo: [
    {
      year: 2026,
      eventStatus: "scheduled_pending_official",
      dates: ["2026-08-07", "2026-08-08", "2026-08-09"],
      access: {
        hasParking: false,
        parkingNote: "美和神社自体には参拝者用駐車場なし。祭り公式サイトに専用駐車場の案内は確認できなかった。"
      },
      confirmation: {
        confirmedDate: "2026-07-28",
        sources: ["http://www.kiryu-maturi.net/"],
        note: "祭り運営団体公式サイトのトップページで「第63回桐生八木節まつり　2026年8月7日（金）〜9日（日）」と直接確認。鉾の曳き違いは2026年の公式スケジュールに含まれていない。"
      }
    }
  ]
};
