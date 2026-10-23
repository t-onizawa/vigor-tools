const FESTIVAL = {
  id: "kitamoto-yoi-matsuri",
  name: "北本まつり「宵まつり」",
  officialName: "令和8年 北本まつり「宵まつり」",
  prefecture: "埼玉県",
  city: "北本市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "例年11月第1土曜日（開催日は年度ごとに発表）",
    features: {
      hasDashi: true, hasMikoshi: "n/a", hasDanceOnDashi: null, hasParade: true, highlightTime: "evening",
      hayashiNote: "伝統のお囃子が響くなか、範頼ねぷたや市内団体のねぷた、山車が西中央通りを練り歩く。"
    },
    access: { nearestStation: "JR高崎線 北本駅西口すぐ" },
    mapReference: {
      label: "北本駅西口", pointType: "viewing_point", query: "北本駅西口 埼玉県北本市", lat: 36.0315901, lng: 139.5329513,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=北本駅西口+埼玉県北本市",
      note: "公式が会場として案内する北本駅西口と西中央通りの起点を観覧の基準地点とした。"
    },
    highlightComment: "夕方から伝統のお囃子が響き、扇形の範頼ねぷたや大小のねぷた、山車が西中央通りを進む。",
    atmosphereMedia: [{"type":"youtube","url":"https://www.youtube.com/watch?v=euOCKKKtxek","contentId":"euOCKKKtxek","title":"埼玉の祭 #34 北本まつり「宵まつり」","publisher":"埼玉県公式チャンネル(サイタマどうが)","publisherType":"government","purpose":"festival_atmosphere","publishedYear":2022,"checkedDate":"2026-10-15"}],
    backgroundImage: { type: "youtube", contentId: "euOCKKKtxek", sourceUrl: "https://www.youtube.com/watch?v=euOCKKKtxek", publisher: "埼玉県公式チャンネル(サイタマどうが)", publisherType: "government", checkedDate: "2026-08-12", note: "夜の通りに点灯した大小のねぷたが並ぶ実写。右上に小さな番組ロゴはあるが、画面を支配せず主役を判別できる。" },
    confirmation: { verified: true, confirmedDate: "2026-08-11", sources: ["https://www.city.kitamoto.lg.jp/kanko/event/aki/18464.html", "https://www.city.kitamoto.lg.jp/kanko/gourmet_shopping/2/1423533254557.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-11-07"],
    schedule: [
      {
        date: "2026-11-07",
        dayLabel: "宵まつり（2026年・北本市公式の発表）",
        items: [
          { time: "13:00", label: "開会（会場A：西口ロータリー）" },
          { time: "13:00〜19:30", label: "キッチンカー・商工会青年部・姉妹都市会津坂下町等の出店（西口駅前多目的広場周辺）" },
          { time: "13:15〜", label: "ヨサコイソーラン（会場A）" },
          { time: "14:00〜", label: "三宅会（会場B：駅入口交差点）" },
          { time: "14:20〜", label: "彩の国おはら会（会場B）、武活道マーシャルアーツライフ（会場C：観光協会前）" },
          { time: "14:30〜", label: "流し踊り（会場A）" },
          { time: "14:40〜", label: "フラ・キエレ（会場B）、北本M'sダンスチーム（会場C）" },
          { time: "15:00〜", label: "姉妹都市「会津坂下町」奇祭大俵引き（会場B）" },
          { time: "16:00〜16:30", label: "北本市観光大使 美根ゆり香コンサート、Ken-Jパフォーマンス（会場A）" },
          { time: "17:00〜17:30", label: "北本太鼓かばざくら（会場A）" },
          { time: "17:40〜", label: "式典（会場A）" },
          { time: "18:00〜", label: "囃子の共演、ねぷたの運行" },
          { time: "18:20〜", label: "ねぷた・囃子山車の運行" },
          { time: "19:30", label: "閉会" }
        ]
      }
    ],
    access: {
      hasParking: true,
      parkingNote: "公式の会場案内に、北本市役所職員駐車場、解脱会宝物館駐車場、解脱会第2〜第4駐車場が駐車場として掲載されている（料金・台数・利用時間は記載なし）。駐輪場は北本市役所。交通規制に伴い、当日12時以降は川越観光バス・丸建つばさ交通バスの一部の便が解脱会宝物館駐車場（北本市緑2-72）を臨時発着所として運行し、鴻巣フラワーバス（馬室コース）は終日、北本駅西口バス停に発着しない（詳細は各社の案内を参照）。道路の通行規制の時間帯・範囲は公式ページに記載なし。"
    },
    confirmation: {
      confirmedDate: "2026-10-23",
      sources: ["https://www.city.kitamoto.lg.jp/kanko/event/aki/18464.html"],
      note: "北本市公式（観光サイト・2026年10月16日更新）で、令和8年11月7日13時〜19時30分、北本駅西口・西中央通りでの開催と、タイムスケジュール、駐車場、バス運行変更を確認。時程表は会場A〜Dの表で、18:00以降の「囃子の共演」「ねぷたの運行」の会場は表から判別できないため会場を記載していない。翌日(11/8)の産業まつりはこのページの対象に含めない。"
    }
  }]
};
