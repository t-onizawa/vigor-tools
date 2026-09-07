const FESTIVAL_TRANSLATION_EN = {
  id: "ishioka-omatsuri",
  name: "Ishioka Matsuri",
  officialName: "Hitachi Sōja-gū Grand Festival",
  highlightComment: "The roofed \"horo-jishi\" floats, where musicians perform inside a covered structure, are rare nationwide. Traditional Okame and Hyottoko dances are also performed on a stage in front of the floats. The horo-jishi and dashi parades are concentrated mainly in the afternoon of Day 2, and the official GPS tracking system lets visitors check the real-time location of the floats as well as nearby parking and restrooms.",
  hayashiNote: null,
  location: {
    prefecture: "Ibaraki Prefecture",
    city: "Ishioka"
  },
  access: {
    nearestStation: "JR Joban Line, Ishioka Station (right by the west exit)",
    parkingNote: "The official traffic guide does not provide temporary parking information; visitors are encouraged to arrive by train, bus, or taxi."
  },
  mapReference: {
    label: "Hitachi Sōja-gū Shrine",
    note: "Hitachi Sōja-gū Shrine is the ritual center of the festival. The parade and viewing areas extend through the town around Ishioka Station, about a 20-minute walk from the shrine."
  },
  schedule: [
    {
      date: "2026-09-19",
      dayLabel: "Shinkōsai (Day 1)",
      items: [
        { time: "9:00", label: "Omitsuna-sai (rope purification ritual)" },
        { time: "13:00", label: "Shinkōsai – Hatsuyosai (departure ceremony)" },
        { time: "14:00", label: "Grand mikoshi and procession depart the shrine" },
        { time: "16:00", label: "Grand mikoshi and procession arrive at the temporary shrine" },
        { time: "16:30", label: "Town festivities begin" }
      ]
    },
    {
      date: "2026-09-20",
      dayLabel: "Hōshukusai (Day 2)",
      items: [
        { time: "10:00", label: "Sumo ring purification ceremony" },
        { time: "11:00", label: "Dedication sumo begins" },
        { time: "13:00", label: "Myōjin mikoshi departure ceremony and procession" },
        { time: "13:00", label: "Urayasu no Mai dance and Someya Twelve Kagura performances begin" },
        { time: "15:00", label: "Grand horo-jishi float parade" },
        { time: "16:45", label: "Grand dashi float parade" },
        { time: "20:30", label: "Year-in-charge town safety prayer and rice cake toss" }
      ]
    },
    {
      date: "2026-09-21",
      dayLabel: "Kankōsai (Day 3)",
      items: [
        { time: "13:10", label: "Departure ceremony from the temporary shrine" },
        { time: "14:00", label: "Grand mikoshi and procession depart the temporary shrine (signaled by fireworks)" },
        { time: "16:00", label: "Grand mikoshi and procession return to Hitachi Sōja-gū Shrine" },
        { time: "16:40", label: "Kankōsai and handover ceremony to the next year-in-charge town" }
      ]
    }
  ]
};
