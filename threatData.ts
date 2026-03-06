// 🚀 threatData.ts - Unsere RWR Daten-DNA

// Der Bauplan für jeden Threat. Sorgt für sauberen Code ohne Überraschungen.
export interface Threat {
  id: string;
  rwrSymbol: string;
  name: string;
  category: 'SAM' | 'AAA' | 'SHIP' | 'AIR' | 'SR';
  maxRangeNm: string; // Als String, wegen Werten wie "48/++"
  maxAltFt: string;   // Als String, wegen Werten wie "++" oder "20"
  countermeasure: 'Chaff' | 'Flares' | 'Evade';
  harmCode: string;
  image?: any;
  linkedSystems?: string[]
}

// Unsere F/A-18C Datenbank, direkt aus deinem Cheat-Sheet extrahiert.
export const fa18cThreats: Threat[] = [
  {
    id: "sa-10",
    rwrSymbol: "10",
    name: "SA-10 Grumble S-300PS",
    category: "SAM",
    maxRangeNm: "48",
    maxAltFt: "++",      // > 50.000ft
    countermeasure: "Chaff",
    harmCode: "110",
    image: require('./assets/threats/SA-10Launcher.png'),
    linkedSystems: ["BB", "CS", "TS"]
  },
  {
    id: "sa-15",
    rwrSymbol: "15",
    name: "SA-15 Gauntlet Tor",
    category: "SAM",
    maxRangeNm: "09",
    maxAltFt: "20",      // 20.000ft
    countermeasure: "Chaff",
    harmCode: "119",
    image: require('./assets/threats/SA-15.png'),
    linkedSystems: ["DE"]
  },
  {
    id: "patriot",
    rwrSymbol: "P",
    name: "Patriot",
    category: "SAM",
    maxRangeNm: "60",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "202",
    image: require('./assets/threats/Patriot.png')
  },
  {
    id: "sa-2",
    rwrSymbol: "2",
    name: "SA-2 Guideline S-75",
    category: "SAM",
    maxRangeNm: "27",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "126",
    image: require('./assets/threats/SA-2Launcher.png'),
    linkedSystems: ["S"]
  },
  {
    id: "sa-3",
    rwrSymbol: "3",
    name: "SA-3 Goa S-125",
    category: "SAM",
    maxRangeNm: "13",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "123",
    image: require('./assets/threats/SA-3Launcher.png'),
    linkedSystems:["S"]
  },
  {
    id: "sa-5",
    rwrSymbol: "5",
    name: "SA-5 Gammon S-200",
    category: "SAM",
    maxRangeNm: "160",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "129",
    image: require('./assets/threats/SA-5Launcher.png'),
    linkedSystems: ["S","TS"]
  },
  {
    id: "sa-6",
    rwrSymbol: "6",
    name: "SA-6 Gainful Kub",
    category: "SAM",
    maxRangeNm: "18",
    maxAltFt: "27",
    countermeasure: "Chaff",
    harmCode: "108",
    image: require('./assets/threats/SA-6Launcher.png')
  },
  {
    id: "hq-7b",
    rwrSymbol: "7",
    name: "HQ-7B",
    category: "SAM",
    maxRangeNm: "10",
    maxAltFt: "18",
    countermeasure: "Evade",
    harmCode: "127",
    image: require('./assets/threats/hq-7q.png')
  },
  {
    id: "sa-8",
    rwrSymbol: "8",
    name: "SA-8 Gecko Osa",
    category: "SAM",
    maxRangeNm: "07",
    maxAltFt: "17",
    countermeasure: "Chaff",
    harmCode: "117",
    image: require('./assets/threats/SA-8.png')
  },
  {
    id: "sa-11",
    rwrSymbol: "11",
    name: "SA-11 Gadfly Buk",
    category: "SAM",
    maxRangeNm: "29",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "115",
    image: require('./assets/threats/SA-11Launcher.png'),
    linkedSystems: ["SD"]
  },
  {
    id: "sa-13",
    rwrSymbol: "13",
    name: "SA-13 Gopher Strela-10M",
    category: "SAM",
    maxRangeNm: "03",
    maxAltFt: "12",
    countermeasure: "Flares",
    harmCode: "118",
    image: require('./assets/threats/SA-13.png'),
    linkedSystems:  ["DE"]
  },
  {
    id: "sa-19",
    rwrSymbol: "19",
    name: "SA-19 Grison Tunguska",
    category: "SAM",
    maxRangeNm: "05",
    maxAltFt: "12",
    countermeasure: "Evade",
    harmCode: "120",
    image: require('./assets/threats/SA-19.png'),
    linkedSystems: ["DE"]
  },
  {
    id: "sa-22",
    rwrSymbol: "22",
    name: "SA-22 Greyhound Pantsir-S1",
    category: "SAM",
    maxRangeNm: "11",
    maxAltFt: "33",
    countermeasure: "Chaff",
    harmCode: "134",
    image: require('./assets/threats/SA-22.png')
  },
  {
    id: "hawk",
    rwrSymbol: "HK",
    name: "Hawk",
    category: "SAM",
    maxRangeNm: "14",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "204",
    image: require('./assets/threats/HAWK.png')
  },
  {
    id: "iris-t",
    rwrSymbol: "IT",
    name: "IRIS-T SLM",
    category: "SAM",
    maxRangeNm: "22",
    maxAltFt: "++",
    countermeasure: "Flares",
    harmCode: "135",
    image: require('./assets/threats/IRIS-T.png')
  },
  {
    id: "nasams-b",
    rwrSymbol: "NS",
    name: "NASAMS AIM-120B",
    category: "SAM",
    maxRangeNm: "13",
    maxAltFt: "35",
    countermeasure: "Chaff",
    harmCode: "209"
  },
  {
    id: "roland",
    rwrSymbol: "RO",
    name: "Roland",
    category: "SAM",
    maxRangeNm: "05",
    maxAltFt: "20",
    countermeasure: "Chaff",
    harmCode: "201"
  },

  // ==========================================
  // 🚢 NAVAL (Schiffe & Trägergruppen)
  // ==========================================
  {
    id: "ship-tor-m2",
    rwrSymbol: "15",
    name: "Project 22160 Tor-M2",
    category: "SHIP",
    maxRangeNm: "10",
    maxAltFt: "39",
    countermeasure: "Chaff",
    harmCode: "415",
    image: require('./assets/threats/Tor-M2Ship.png')
  },
  {
    id: "ship-type-052C",
    rwrSymbol: "HN",
    name: "Type 052C Destroyer / Pyotr Velikiy",
    category: "SHIP",
    maxRangeNm: "90",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "410 | 313",
    image: require('./assets/threats/PyotrVelikiy.png')
  },
  {
    id: "ship-grisha",
    rwrSymbol: "HP",
    name: "Grisha Corvette",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "15",
    countermeasure: "Chaff",
    harmCode: "306",
    image: require('./assets/threats/Grisha.png')
  },
  {
    id: "ship-molniya",
    rwrSymbol: "PS",
    name: "Molniya Corvette",
    category: "SHIP",
    maxRangeNm: "03",
    maxAltFt: "9",
    countermeasure: "Evade",
    harmCode: "312",
    image: require('./assets/threats/Molniya.png')
  },
  {
    id: "ship-neustrashimy_rezky",
    rwrSymbol: "TP",
    name: "Neustrashimy Frigate / Rezky Frigate",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "20",
    countermeasure: "Chaff",
    harmCode: "319 | 309",
    image: require('./assets/threats/Neustrashimy.png')
  },
  {
    id: "ship-kuznetsov",
    rwrSymbol: "SW",
    name: "Kuznetsov CV",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "20",
    countermeasure: "Chaff",
    harmCode: "320",
    image: require('./assets/threats/kuznetsov.png')
  },
  {
    id: "ship-moskva",
    rwrSymbol: "T2",
    name: "Moskva Cruiser",
    category: "SHIP",
    maxRangeNm: "48",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "303",
    image: require('./assets/threats/Moskva.png')
  },
  {
    id: "ship-ropucha",
    rwrSymbol: "SC",
    name: "LS Ropucha",
    category: "SHIP",
    maxRangeNm: "06",
    maxAltFt: "9",
    countermeasure: "Evade",
    harmCode: "321",
    image: require('./assets/threats/LSRopucha.png')
  },

  // ==========================================
  // 💥 AAA (Flak & SPAAA)
  // ==========================================
  {
    "id": "aaa-composite-threat",
    "rwrSymbol": "A",
    "name": "Composite AAA Threat (Gepard/Shilka/Vulcan)",
    "category": "AAA",
    "maxRangeNm": "03",
    "maxAltFt": "10",
    "countermeasure": "Evade",
    "harmCode": "207/121/208",
    image: require('./assets/threats/Shilka.png')
  },

  // ==========================================
  // ✈️ AIR (Bandits & AWACS) - REDFOR ONLY
  // ==========================================
  {
    id: "air-mig19p",
    rwrSymbol: "19",
    name: "MiG-19P Farmer",
    category: "AIR",
    maxRangeNm: "03",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/MiG-19.png')
  },
  {
    id: "air-mig21bis",
    rwrSymbol: "21",
    name: "MiG-21Bis Fishbed",
    category: "AIR",
    maxRangeNm: "09",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/MiG-21.png')
  },
  {
    id: "air-mig23mld",
    rwrSymbol: "23",
    name: "MiG-23MLD Flogger",
    category: "AIR",
    maxRangeNm: "14",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/MiG-23MLD.png')
  },
  {
    id: "air-mig25pd",
    rwrSymbol: "25",
    name: "MiG-25PD Foxbat",
    category: "AIR",
    maxRangeNm: "25",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/MiG-25.png')
  },
  {
    "id": "air-mig29-su27-j11",
    "rwrSymbol": "29",
    "name": "MiG-29/Su-27/Su-33/J-11A",
    "category": "AIR",
    "maxRangeNm": "38",
    "maxAltFt": "N/A",
    "countermeasure": "Evade",
    "harmCode": "N/A",
    image: require('./assets/threats/MiG-29.png')
  },
  {
    id: "air-su30",
    rwrSymbol: "30",
    name: "Su-30 Flanker-C",
    category: "AIR",
    maxRangeNm: "37",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/Su-30.png')
  },
  {
    id: "air-mig31",
    rwrSymbol: "31",
    name: "MiG-31 Foxhound",
    category: "AIR",
    maxRangeNm: "37",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/MiG-31.png')
  },
  {
    id: "air-su34",
    rwrSymbol: "34",
    name: "Su-34 Fullback",
    category: "AIR",
    maxRangeNm: "35",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/Su-34.png')
  },
  {
    id: "air-jf17",
    rwrSymbol: "JF",
    name: "JF-17 Thunder",
    category: "AIR",
    maxRangeNm: "46",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/JF-17.png')
  },
  {
    id: "air-a50",
    rwrSymbol: "50",
    name: "A-50/KJ-2000 AWACS",
    category: "AIR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A",
    image: require('./assets/threats/A-50.png')
  },

  // ==========================================
  // Search and Track Radars
  // ==========================================
  {
    id: "sr-flat-face",
    rwrSymbol: "S",
    name: "Flat Face B SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "122",
    image: require('./assets/threats/P-15-FlatFace.png'),
    linkedSystems: ["2", "3", "5"]
  },
  {
    id: "sr-big-bird",
    rwrSymbol: "BB",
    name: "Big Bird long range SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "104",
    image: require('./assets/threats/BigBird.png'),
    linkedSystems: ["10"]
  },
  {
    id: "sr-clam-shell",
    rwrSymbol: "CS",
    name: "Clam Shell low altitude SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "103",
    image: require('./assets/threats/ClamShell.png'),
    linkedSystems: ["10"]
  },
  {
    id: "sr-dog-ear",
    rwrSymbol: "DE",
    name: "Dog Ear Sborka SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "131",
    image: require('./assets/threats/DogEar.png'),
    linkedSystems: ["13", "15", "19"]
  },
  {
    id: "sr-snow-drift",
    rwrSymbol: "SD",
    name: "Snow Drift SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "107",
    image: require('./assets/threats/SnowDrift.png'),
    linkedSystems: ["11"]
  },
  {
    id: "sr-tin-shield",
    rwrSymbol: "TS",
    name: "Tin Shield SR",
    category: "SR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "130",
    image: require('./assets/threats/TinShield.png'),
    linkedSystems:["5", "10"]
  }
];