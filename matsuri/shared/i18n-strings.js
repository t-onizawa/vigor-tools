const UI_STRINGS_EN = {
  eventStatusLabels: {
    confirmed: "Confirmed",
    scheduled_pending_official: "Scheduled (Official Details Pending)",
    off_year: "Off Year (No Main Festival)",
    unconfirmed: "Unconfirmed",
    cancelled: "Cancelled",
    postponed: "Postponed",
    ended: "Ended"
  },
  eventStatusDateText: {
    confirmed: { heading: (year) => `${year} Dates` },
    scheduled_pending_official: {
      heading: (year) => `${year} Scheduled Dates`,
      note: "Official details are pending confirmation."
    },
    off_year: {
      heading: (year) => `${year} Status`,
      note: "This is an off-year; the main festival is not held."
    },
    unconfirmed: {
      heading: (year) => `${year} Information`,
      note: "Dates have not been confirmed yet."
    },
    cancelled: {
      heading: (year) => `${year} Schedule`,
      note: "This event has been cancelled."
    },
    postponed: {
      heading: (year) => `${year} Schedule`,
      note: "This event has been postponed."
    },
    ended: {
      heading: (year) => `${year} Results`,
      note: "This event has ended."
    }
  },
  highlightTimeLabels: {
    morning: "Morning",
    daytime: "Daytime",
    day: "Daytime",
    evening: "Evening",
    night: "Night",
    both: "Day & Night"
  },
  availability: {
    yes: "Yes",
    no: "No",
    na: "N/A",
    unknown: "Unconfirmed"
  },
  featureLabels: {
    dashi: "Float (Dashi)",
    mikoshi: "Portable Shrine (Mikoshi)",
    odori: "Dance",
    hikimawashi: "Procession",
    highlights: "Highlights"
  },
  labels: {
    venue: "Venue",
    nearestStation: "Nearest Station",
    parking: "Parking",
    constantSourceTitle: "General Information",
    yearlySourceTitle: (year) => `${year} Information`,
    highlightCommentHeading: "Highlights of This Festival",
    nearestStationUnknown: "Nearest station / access point has not been confirmed.",
    dateUnknown: "Dates not yet announced",
    atmosphereHeadingWith: "See More of the Atmosphere",
    atmosphereHeadingWithout: "Festival Atmosphere",
    externalSearchDisclaimer: "Opens search results on an external site",
    confirmedDate: (date) => `Last verified: ${date}`,
    pastAtmosphere: (year) => `Footage from the ${year} festival`,
    mediaMeta: (publisher, date) => `Published by: ${publisher} / Last verified: ${date}`,
    playVideo: (title) => `Play video: ${title}`,
    youtubeLink: "Watch on YouTube →",
    scheduleHeadingSeparator: " — ",
    multipleDateCount: (count) => `${count} dates`,
    dateRangeSeparator: " – ",
    dateListSeparator: " / "
  },
  faq: {
    dateQuestion: (name, year) => `When is ${name} held in ${year}?`,
    parkingQuestion: (name) => `Is parking available at ${name}?`,
    stationQuestion: (name) => `What is the nearest station to ${name}?`,
    offYearAnswer: (year) => `${year} is an off-year, so the main festival is not held.`,
    dateUnannouncedAnswer: (year) => `The dates for ${year} have not been announced yet.`,
    endedAnswer: (dates) => `It was held on ${dates}.`,
    cancelledAnswer: (dates) => `It was scheduled for ${dates}, but it was cancelled.`,
    postponedAnswer: (dates) => `It was scheduled for ${dates}, but it has been postponed. Please check the official information for new dates.`,
    confirmedAnswer: (dates) => `It will be held on ${dates}.`,
    scheduledAnswer: (dates) => `It is scheduled for ${dates}. Official details are still pending.`,
    parkingYesAnswer: (year) => `Parking is available in ${year}.`,
    parkingNoAnswer: (year) => `No parking is available in ${year}.`,
    parkingUnknownAnswer: (year) => `Parking information for ${year} has not been confirmed.`,
    stationAnswer: (station) => `The nearest station / access point is ${station}.`
  },
  experienceTags: {
    "火の祭り": "Fire Festival",
    "水・海の祭り": "Water & Sea Festival",
    "馬・流鏑馬": "Horse & Yabusame",
    "踊り": "Dance",
    "独自の行事": "Unique Tradition"
  },
  jsonLd: {
    fallbackDescription: (prefecture, city, name, schedulePattern) =>
      `${name} is held in ${city}, ${prefecture}. ${schedulePattern}`,
    offYearDescription: (description, year) =>
      `${description} ${year} is an off-year, and the main festival is held every other year.`
  }
};
