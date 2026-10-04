/* =============================================================
   Atlas — single source of truth for all 14 countries.
   Used by the index page (numbers panel, contact-sheet, timeline)
   and by country pages (song/meal/moment card).

   To replace placeholder photos later:
     - add an image under assets/photos/
     - set the country’s cover field to that relative path
   ============================================================= */

window.ATLAS = {
  // Update this when actively traveling.
  // status: { traveling: true, place: "Lisbon, Portugal", since: "2026-05-22" }
  status: { traveling: false, next: null },

  countries: [
    {
      slug: "alps-road-trip",
      cover: "assets/covers/alps.svg",
      country: "Alps loop",
      region: "Europe",
      flag: "🇩🇪🇦🇹🇮🇹",
      date: "2025-08",
      dateLabel: "Aug 2025",
      duration: "9 days",
      type: "road-trip",
      kind: "report",
      title: "The Alps in a loop",
      teaser: "Bavaria → Tyrol → Dolomites → Hallstatt → Königssee",
      song: { title: "Holocene", artist: "Bon Iver", url: "https://open.spotify.com/track/05nnLnILSiUm5HKaXJrlpW" },
      meal: "Kaiserschmarrn at the Olperer Hütte — eaten outside, 2,389 m up.",
      moment: "Crossing the Brenner at sunrise, no traffic, the whole pass to ourselves.",
      route: [
        { city: "Karlsruhe", lat: 49.01, lng: 8.40 },
        { city: "Neuschwanstein", lat: 47.56, lng: 10.75 },
        { city: "Innsbruck", lat: 47.27, lng: 11.39 },
        { city: "Mayrhofen", lat: 47.16, lng: 11.86 },
        { city: "Dolomites", lat: 46.40, lng: 12.20 },
        { city: "Hallstatt", lat: 47.56, lng: 13.65 },
        { city: "Königssee", lat: 47.55, lng: 12.98 }
      ]
    },
    {
      slug: "croatia-november",
      cover: "assets/covers/croatia.svg",
      country: "Croatia",
      region: "Europe",
      flag: "🇭🇷",
      date: "2024-11",
      dateLabel: "Nov 2024",
      duration: "6 days",
      type: "road-trip",
      kind: "report",
      title: "Croatia in November",
      teaser: "Zagreb → Plitvice → Split → Dubrovnik, off-season.",
      song: { title: "Sve još miriše na nju", artist: "Parni Valjak", url: "https://open.spotify.com/search/parni%20valjak" },
      meal: "Black risotto in Split at a tiny konoba with five tables and no English menu.",
      moment: "Walking Plitvice's boardwalks in a thin fog, every other tourist somewhere else.",
      route: [
        { city: "Zagreb", lat: 45.81, lng: 15.98 },
        { city: "Plitvice", lat: 44.88, lng: 15.62 },
        { city: "Split", lat: 43.51, lng: 16.44 },
        { city: "Dubrovnik", lat: 42.65, lng: 18.09 }
      ]
    },
    {
      slug: "prague-winter",
      cover: "assets/covers/czechia.svg",
      country: "Czech Republic",
      region: "Europe",
      flag: "🇨🇿",
      date: "2025-12",
      dateLabel: "Dec 2025",
      duration: "3 days",
      type: "city-break",
      kind: "report",
      title: "Prague in winter",
      teaser: "Old Town in the snow, Christmas markets, Charles Bridge at 6am.",
      song: { title: "Vltava", artist: "Bedřich Smetana", url: "https://open.spotify.com/search/vltava%20smetana" },
      meal: "Svíčková with bread dumplings at U Modré Kachničky — the gravy was the point.",
      moment: "Charles Bridge at 6am, alone with the statues and a thin layer of snow.",
      route: [
        { city: "Prague", lat: 50.08, lng: 14.44 }
      ]
    },
    {
      slug: "norway-fjords",
      cover: "assets/covers/norway.svg",
      country: "Norway",
      region: "Europe",
      flag: "🇳🇴",
      date: "2024-07",
      dateLabel: "Jul 2024",
      duration: "8 days",
      type: "road-trip",
      kind: "sketch",
      title: "Norway",
      teaser: "Fjords west of Bergen.",
      song: { title: "Run Boy Run", artist: "Woodkid", url: "https://open.spotify.com/search/run%20boy%20run" },
      meal: "Brown cheese on waffles at a roadside stop near Geiranger.",
      moment: "The exact second Trolltunga came into view after four hours of climbing.",
      route: [
        { city: "Bergen", lat: 60.39, lng: 5.32 },
        { city: "Geiranger", lat: 62.10, lng: 7.20 },
        { city: "Trolltunga", lat: 60.12, lng: 6.74 }
      ]
    },
    {
      slug: "netherlands-amsterdam",
      cover: "assets/covers/netherlands.svg",
      country: "Netherlands",
      region: "Europe",
      flag: "🇳🇱",
      date: "2024-04",
      dateLabel: "Apr 2024",
      duration: "4 days",
      type: "city-break",
      kind: "sketch",
      title: "Netherlands",
      teaser: "Amsterdam canals, Keukenhof tulips, Utrecht.",
      song: { title: "Wake Me Up", artist: "Avicii", url: "https://open.spotify.com/search/wake%20me%20up%20avicii" },
      meal: "Stroopwafel still warm from the iron at the Albert Cuyp market.",
      moment: "The first row of tulips at Keukenhof — like someone had spilled a paintbox.",
      route: [
        { city: "Amsterdam", lat: 52.37, lng: 4.90 },
        { city: "Utrecht", lat: 52.09, lng: 5.12 }
      ]
    },
    {
      slug: "belgium-brussels",
      cover: "assets/covers/belgium.svg",
      country: "Belgium",
      region: "Europe",
      flag: "🇧🇪",
      date: "2024-04",
      dateLabel: "Apr 2024",
      duration: "2 days",
      type: "city-break",
      kind: "sketch",
      title: "Belgium",
      teaser: "Brussels and Bruges on a long weekend.",
      song: { title: "Pour que tu m'aimes encore", artist: "Céline Dion", url: "https://open.spotify.com/search/celine%20dion" },
      meal: "Moules-frites with a Westmalle Trappist, sat on a Brussels terrace.",
      moment: "Bruges at dusk, half the canals empty, all of them golden.",
      route: [
        { city: "Brussels", lat: 50.85, lng: 4.35 },
        { city: "Bruges", lat: 51.21, lng: 3.22 }
      ]
    },
    {
      slug: "france-paris",
      cover: "assets/covers/france.svg",
      country: "France",
      region: "Europe",
      flag: "🇫🇷",
      date: "2023-09",
      dateLabel: "Sep 2023",
      duration: "6 days",
      type: "city-break",
      kind: "sketch",
      title: "France",
      teaser: "Paris in three days, Provence in three.",
      song: { title: "La Vie en Rose", artist: "Édith Piaf", url: "https://open.spotify.com/search/la%20vie%20en%20rose" },
      meal: "A still-warm pain au chocolat from a no-name boulangerie in the 11th.",
      moment: "Sénanque Abbey, lavender at the height of bloom, no tourists yet.",
      route: [
        { city: "Paris", lat: 48.85, lng: 2.35 },
        { city: "Avignon", lat: 43.95, lng: 4.81 },
        { city: "Sénanque", lat: 43.93, lng: 5.13 }
      ]
    },
    {
      slug: "switzerland-alps",
      cover: "assets/covers/switzerland.svg",
      country: "Switzerland",
      region: "Europe",
      flag: "🇨🇭",
      date: "2024-06",
      dateLabel: "Jun 2024",
      duration: "5 days",
      type: "road-trip",
      kind: "sketch",
      title: "Switzerland",
      teaser: "Interlaken, Lauterbrunnen, Grindelwald.",
      song: { title: "Wonderwall", artist: "Oasis", url: "https://open.spotify.com/search/wonderwall" },
      meal: "Rösti with a fried egg at a mountain hut above Grindelwald.",
      moment: "First-light view of the Jungfrau from a balcony in Mürren.",
      route: [
        { city: "Interlaken", lat: 46.68, lng: 7.86 },
        { city: "Lauterbrunnen", lat: 46.59, lng: 7.91 },
        { city: "Grindelwald", lat: 46.62, lng: 8.04 }
      ]
    },
    {
      slug: "uae-dubai",
      cover: "assets/covers/uae.svg",
      country: "UAE",
      region: "Middle East",
      flag: "🇦🇪",
      date: "2023-12",
      dateLabel: "Dec 2023",
      duration: "5 days",
      type: "stopover",
      kind: "sketch",
      title: "UAE",
      teaser: "Dubai stopover, two days in the desert.",
      song: { title: "Habibi", artist: "DJ Snake", url: "https://open.spotify.com/search/habibi" },
      meal: "Karak chai at a roadside stand on the way back from the dunes.",
      moment: "Silence in the deep desert at midnight. No phone signal, no wind.",
      route: [
        { city: "Dubai", lat: 25.20, lng: 55.27 }
      ]
    },
    {
      slug: "india-hometown",
      cover: "assets/covers/india.svg",
      country: "India",
      region: "Asia",
      flag: "🇮🇳",
      date: "2024-12",
      dateLabel: "Dec 2024",
      duration: "3 weeks",
      type: "home",
      kind: "sketch",
      title: "India",
      teaser: "Hometown, family, the things you only notice when you've been away.",
      song: { title: "Tum Hi Ho", artist: "Arijit Singh", url: "https://open.spotify.com/search/tum%20hi%20ho" },
      meal: "My mother's dal at 11pm after a 14-hour flight. Nothing else came close.",
      moment: "The first hot morning chai on the verandah at home, feet up, no plans.",
      route: [
        { city: "Hometown", lat: 26.85, lng: 80.95 }
      ]
    },
    {
      slug: "maldives-atolls",
      cover: "assets/covers/maldives.svg",
      country: "Maldives",
      region: "Asia",
      flag: "🇲🇻",
      date: "2024-02",
      dateLabel: "Feb 2024",
      duration: "6 days",
      type: "island",
      kind: "sketch",
      title: "Maldives",
      teaser: "One atoll, no plans, every sunset different.",
      song: { title: "Island in the Sun", artist: "Weezer", url: "https://open.spotify.com/search/island%20in%20the%20sun" },
      meal: "Grilled reef fish with coconut sambol, eaten with our hands on the sand.",
      moment: "Bioluminescent plankton, midnight, the water lit up wherever you stepped.",
      route: [
        { city: "Malé", lat: 4.17, lng: 73.51 }
      ]
    },
    {
      slug: "thailand-bangkok",
      cover: "assets/covers/thailand.svg",
      country: "Thailand",
      region: "Asia",
      flag: "🇹🇭",
      date: "2023-11",
      dateLabel: "Nov 2023",
      duration: "10 days",
      type: "city-break",
      kind: "sketch",
      title: "Thailand",
      teaser: "Bangkok, then north to Chiang Mai.",
      song: { title: "Mai Pen Rai", artist: "Tilly Birds", url: "https://open.spotify.com/search/mai%20pen%20rai" },
      meal: "Boat noodles at a stall near Victory Monument, four dollars, three bowls.",
      moment: "5am at Doi Suthep, the city below still asleep, the bells starting up.",
      route: [
        { city: "Bangkok", lat: 13.75, lng: 100.50 },
        { city: "Chiang Mai", lat: 18.79, lng: 98.99 }
      ]
    },
    {
      slug: "singapore-stopover",
      cover: "assets/covers/singapore.svg",
      country: "Singapore",
      region: "Asia",
      flag: "🇸🇬",
      date: "2023-11",
      dateLabel: "Nov 2023",
      duration: "2 days",
      type: "stopover",
      kind: "sketch",
      title: "Singapore",
      teaser: "48 hours between flights.",
      song: { title: "Home", artist: "Kit Chan", url: "https://open.spotify.com/search/home%20kit%20chan" },
      meal: "Hainanese chicken rice at Maxwell, the queue moved faster than expected.",
      moment: "Gardens by the Bay light show — touristy, undeniable, still got me.",
      route: [
        { city: "Singapore", lat: 1.35, lng: 103.82 }
      ]
    },
    {
      slug: "germany-home",
      cover: "assets/covers/germany.svg",
      country: "Germany",
      region: "Europe",
      flag: "🇩🇪",
      date: "2022-09",
      dateLabel: "Since Sep 2022",
      duration: "Home base",
      type: "home",
      kind: "home",
      title: "Germany",
      teaser: "Home base since 2022. Neckarsulm, Stuttgart, the Schwarzwald.",
      song: { title: "99 Luftballons", artist: "Nena", url: "https://open.spotify.com/search/99%20luftballons" },
      meal: "Maultaschen at a small place in Stuttgart, the day I first thought 'this is home now.'",
      moment: "First snow over the Neckar valley, working from the kitchen window.",
      route: [
        { city: "Neckarsulm", lat: 49.19, lng: 9.22 }
      ]
    }
  ]
};
