const FESTIVAL = {
  id: "hanno-matsuri",
  name: "飯能まつり",
  officialName: null,
  prefecture: "埼玉県",
  city: "飯能市",
  areaTag: "saitama",
  constantInfo: {
    schedulePattern: "例年11月第1土曜日・日曜日",
    features: {
      hasDashi: true, hasMikoshi: null, hasDanceOnDashi: null, hasParade: true, highlightTime: "both",
      hayashiNote: "初日は底抜け屋台、2日目は11か町の山車巡行・総覧・引き合わせが中心。"
    },
    access: { nearestStation: "西武池袋線 飯能駅・JR八高線 東飯能駅" },
    mapReference: {
      label: "飯能駅北口周辺", pointType: "viewing_point", query: "飯能駅 埼玉県飯能市", lat: 35.8508472, lng: 139.3203652,
      mapUrl: "https://www.google.com/maps/search/?api=1&query=飯能駅+埼玉県飯能市",
      note: "中心市街地で底抜け屋台と山車の巡行が行われます。"
    },
    highlightComment: "初日の底抜け屋台から、翌日の11か町の山車総覧・引き合わせへ展開する二段構成が特徴。",
    atmosphereMedia: [],
    backgroundImage: {
      type: "youtube",
      contentId: "j2SjrnpPIWc",
      sourceUrl: "https://www.youtube.com/watch?v=j2SjrnpPIWc",
      publisher: "Japan Walk Boy",
      publisherType: "individual",
      checkedDate: "2026-08-05",
      note: "複数の山車と夜の祭り風景を文字装飾なしで捉え、横長背景で主役が明確なため採用。"
    },
    confirmation: { verified: true, confirmedDate: "2026-07-30", sources: ["https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/452.html", "https://www.city.hanno.lg.jp/soshikikarasagasu/kyoikubu/hakubutsukan/bunkazaitanto/bunkazai/minzoku/index.html"] }
  },
  yearlyInfo: [{
    year: 2026, eventStatus: "confirmed", dates: ["2026-11-07", "2026-11-08"],
    schedule: [
      { date: "2026-11-07", dayLabel: "1日目（2026年・奥むさし飯能観光協会の公式発表）", items: [
        { time: "12:00〜20:00", label: "マルシェ（飯能中央通り。出店者は公式で未定）" },
        { time: "12:30〜13:00", label: "オープニングセレモニー（飯能大通りまつり本部前）" },
        { time: "13:00〜15:00", label: "パレード（仲町交差点付近→まつり本部前→広小路交差点→東町交差点。参加団体は公式で未定）" },
        { time: "13:00〜17:20", label: "よさこい固定演技（①13:00〜13:30 飯能銀座通り／②13:45〜14:20 飯能駅前通り／③16:30〜17:20 飯能駅前通り）" },
        { time: "13:00〜16:20", label: "野外音楽会（飯能信用金庫中央支店駐車場。公式は出演時間がずれる可能性があると注記）" },
        { time: "13:00〜19:00", label: "ステージ（飯能中央通り特設ステージ。出演団体は公式で未定）" },
        { time: "13:00〜17:00", label: "赤ちゃんの駅（飯能商工会議所1階。授乳・おむつ替え）" },
        { time: "15:30〜16:15", label: "よさこい流し演技（仲町交差点→東町交差点）" },
        { time: "17:00〜20:30頃", label: "底抜け屋台巡行（交通規制区域内）" },
        { time: "19:50〜20:00", label: "底抜け屋台引き合わせ（飯能銀座通り）" }
      ]},
      { date: "2026-11-08", dayLabel: "2日目（2026年・奥むさし飯能観光協会の公式発表）", items: [
        { time: "8:30〜18:00", label: "神輿練り歩き（飯能大通り他。飯能壱丁目神輿保存会）" },
        { time: "9:30〜14:00／15:00〜19:30", label: "居囃子（さがみ典礼駐車場・飯能銀座通り長寿庵駐車場の2会場）" },
        { time: "10:00〜19:00", label: "飯能元気まつり（埼玉りそな銀行飯能支店 東側駐車場。東北の物産販売・西川材のPR）" },
        { time: "10:00〜20:30", label: "観光物産市場（三井のリパーク駐車場・銀座通り）" },
        { time: "11:00〜17:00", label: "赤ちゃんの駅（飯能商工会議所1階。授乳・おむつ替え）" },
        { time: "12:40〜13:10／15:00〜15:40", label: "喜多川の獅子舞（広小路交差点）" },
        { time: "13:10〜16:20", label: "三宅太鼓（まつり本部前・広小路交差点・さがみ典礼駐車場前・飯能銀座通りの4か所）" },
        { time: "14:00〜20:00", label: "マルシェ（飯能中央通り）" },
        { time: "14:20〜14:40", label: "山車総覧（東町交差点。山車11台が揃う）" },
        { time: "14:40〜15:00", label: "山車引き合わせ・第1回（東町交差点）" },
        { time: "16:15〜17:00", label: "神輿練り歩き（飯能駅前通り。飯能信用金庫）" },
        { time: "19:30〜19:50", label: "山車引き合わせ・第2回（飯能駅前通り）" }
      ]}
    ],
    access: { hasParking: null, parkingNote: "公式の時程では、11/7の底抜け屋台巡行（17:00〜20:30頃）が「交通規制区域内」で行われると案内されている。交通規制の時間帯・範囲と臨時駐車場は公式に記載なし（2026年10月23日時点）。" },
    confirmation: {
      confirmedDate: "2026-10-23", sources: ["https://www.city.hanno.lg.jp/kanko_bunka_sports/kankojoho/oshirase/10535.html", "https://hanno-tourism.jp/hanno-matsuri/"],
      note: "飯能市公式（2026年8月27日更新）で2026年11月7日（土）正午から午後9時、8日（日）午前9時から午後9時の開催日時を確認。奥むさし飯能観光協会の飯能まつり公式サイト（2026年10月23日時点）で、両日の詳細タイムスケジュールと催し物を確認。公式が出店者・参加団体・ステージ出演団体を「未定」、野外音楽会の出演時間を「ずれる可能性あり」と注記しているため、その旨を併記し、出演者別の情報は掲載していない。居囃子の演者別の開始時刻は公式内で表記が食い違う（9:00と9:30）ため、会場単位のみ掲載。交通規制の時間帯・範囲、臨時駐車場は公式に記載なし。"
    }
  }]
};
