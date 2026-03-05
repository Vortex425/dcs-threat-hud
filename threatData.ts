// 🚀 threatData.ts - Unsere RWR Daten-DNA

// Der Bauplan für jeden Threat. Sorgt für sauberen Code ohne Überraschungen.
export interface Threat {
  id: string;
  rwrSymbol: string;
  name: string;
  category: 'SAM' | 'AAA' | 'SHIP' | 'AIR';
  maxRangeNm: string; // Als String, wegen Werten wie "48/++"
  maxAltFt: string;   // Als String, wegen Werten wie "++" oder "20"
  countermeasure: 'Chaff' | 'Flares' | 'Evade';
  harmCode: string;
}

// Unsere F/A-18C Datenbank, direkt aus deinem Cheat-Sheet extrahiert.
export const fa18cThreats: Threat[] = [
  {
    id: "sa-10",
    rwrSymbol: "10",
    name: "SA-10 Grumble S-300PS",
    category: "SAM",
    maxRangeNm: "48/++",
    maxAltFt: "++",      // > 50.000ft
    countermeasure: "Chaff",
    harmCode: "110"
  },
  {
    id: "sa-15",
    rwrSymbol: "15",
    name: "SA-15 Gauntlet Tor",
    category: "SAM",
    maxRangeNm: "09/20",
    maxAltFt: "20",      // 20.000ft
    countermeasure: "Chaff",
    harmCode: "119"
  },
  {
    id: "patriot",
    rwrSymbol: "P",
    name: "Patriot",
    category: "SAM",
    maxRangeNm: "60/++",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "202"
  },
  {
    id: "sa-2",
    rwrSymbol: "2",
    name: "SA-2 Guideline S-75",
    category: "SAM",
    maxRangeNm: "27/++",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "126"
  },
  {
    id: "sa-3",
    rwrSymbol: "3",
    name: "SA-3 Goa S-125",
    category: "SAM",
    maxRangeNm: "13/++",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "123"
  },
  {
    id: "sa-5",
    rwrSymbol: "5",
    name: "SA-5 Gammon S-200",
    category: "SAM",
    maxRangeNm: "160/+",
    maxAltFt: "+",
    countermeasure: "Chaff",
    harmCode: "129"
  },
  {
    id: "sa-6",
    rwrSymbol: "6",
    name: "SA-6 Gainful Kub",
    category: "SAM",
    maxRangeNm: "18/27",
    maxAltFt: "27",
    countermeasure: "Chaff",
    harmCode: "108"
  },
  {
    id: "hq-7b",
    rwrSymbol: "7",
    name: "HQ-7B",
    category: "SAM",
    maxRangeNm: "10/18",
    maxAltFt: "18",
    countermeasure: "Evade",
    harmCode: "127"
  },
  {
    id: "sa-8",
    rwrSymbol: "8",
    name: "SA-8 Gecko Osa",
    category: "SAM",
    maxRangeNm: "07/17",
    maxAltFt: "17",
    countermeasure: "Chaff",
    harmCode: "117"
  },
  {
    id: "sa-11",
    rwrSymbol: "11",
    name: "SA-11 Gadfly Buk",
    category: "SAM",
    maxRangeNm: "29/++",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "115"
  },
  {
    id: "sa-13",
    rwrSymbol: "13",
    name: "SA-13 Gopher Strela-10M",
    category: "SAM",
    maxRangeNm: "03/12",
    maxAltFt: "12",
    countermeasure: "Flares",
    harmCode: "118"
  },
  {
    id: "sa-19",
    rwrSymbol: "19",
    name: "SA-19 Grison Tunguska",
    category: "SAM",
    maxRangeNm: "05/12",
    maxAltFt: "12",
    countermeasure: "Evade",
    harmCode: "120"
  },
  {
    id: "sa-22",
    rwrSymbol: "22",
    name: "SA-22 Greyhound Pantsir-S1",
    category: "SAM",
    maxRangeNm: "11/33",
    maxAltFt: "33",
    countermeasure: "Chaff",
    harmCode: "134"
  },
  {
    id: "hawk",
    rwrSymbol: "HK",
    name: "Hawk",
    category: "SAM",
    maxRangeNm: "14/++",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "204"
  },
  {
    id: "iris-t",
    rwrSymbol: "IT",
    name: "IRIS-T SLM",
    category: "SAM",
    maxRangeNm: "22/++",
    maxAltFt: "++",
    countermeasure: "Flares",
    harmCode: "135"
  },
  {
    id: "nasams-b",
    rwrSymbol: "NS",
    name: "NASAMS AIM-120B",
    category: "SAM",
    maxRangeNm: "13/35",
    maxAltFt: "35",
    countermeasure: "Chaff",
    harmCode: "209"
  },
  {
    id: "roland",
    rwrSymbol: "RO",
    name: "Roland",
    category: "SAM",
    maxRangeNm: "05/20",
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
    harmCode: "415"
  },
  {
    id: "ship-type-052C",
    rwrSymbol: "HN",
    name: "Type 052C Destroyer / Pyotr Velikiy",
    category: "SHIP",
    maxRangeNm: "90",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "410 | 313"
  },
  {
    id: "ship-grisha",
    rwrSymbol: "HP",
    name: "Grisha Corvette",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "15",
    countermeasure: "Chaff",
    harmCode: "306"
  },
  {
    id: "ship-molniya",
    rwrSymbol: "PS",
    name: "Molniya Corvette",
    category: "SHIP",
    maxRangeNm: "03",
    maxAltFt: "9",
    countermeasure: "Evade",
    harmCode: "312"
  },
  {
    id: "ship-neustrashimy_rezky",
    rwrSymbol: "TP",
    name: "Neustrashimy Frigate / Rezky Frigate",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "20",
    countermeasure: "Chaff",
    harmCode: "319 | 309"
  },
  {
    id: "ship-kuznetsov",
    rwrSymbol: "SW",
    name: "Kuznetsov CV",
    category: "SHIP",
    maxRangeNm: "08",
    maxAltFt: "20",
    countermeasure: "Chaff",
    harmCode: "320"
  },
  {
    id: "ship-moskva",
    rwrSymbol: "T2",
    name: "Moskva Cruiser",
    category: "SHIP",
    maxRangeNm: "48",
    maxAltFt: "++",
    countermeasure: "Chaff",
    harmCode: "303"
  },
  {
    id: "ship-ropucha",
    rwrSymbol: "SC",
    name: "LS Ropucha",
    category: "SHIP",
    maxRangeNm: "06",
    maxAltFt: "9",
    countermeasure: "Evade",
    harmCode: "321"
  },

  // ==========================================
  // 💥 AAA (Flak & SPAAA)
  // ==========================================
  {
    id: "aaa-gepard",
    rwrSymbol: "A",
    name: "Gepard SPAAA",
    category: "AAA",
    maxRangeNm: "03",
    maxAltFt: "10",
    countermeasure: "Evade",
    harmCode: "207"
  },
  {
    id: "aaa-shilka",
    rwrSymbol: "A",
    name: "ZSU-23-4 Shilka",
    category: "AAA",
    maxRangeNm: "02",
    maxAltFt: "07",
    countermeasure: "Evade",
    harmCode: "121"
  },
  {
    id: "aaa-vulcan",
    rwrSymbol: "A",
    name: "Vulcan SPAAA",
    category: "AAA",
    maxRangeNm: "02",
    maxAltFt: "06",
    countermeasure: "Evade",
    harmCode: "208"
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
    harmCode: "N/A"
  },
  {
    id: "air-mig21bis",
    rwrSymbol: "21",
    name: "MiG-21Bis Fishbed",
    category: "AIR",
    maxRangeNm: "09",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-mig23mld",
    rwrSymbol: "23",
    name: "MiG-23MLD Flogger",
    category: "AIR",
    maxRangeNm: "14",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-mig25pd",
    rwrSymbol: "25",
    name: "MiG-25PD Foxbat",
    category: "AIR",
    maxRangeNm: "25",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-mig29ag",
    rwrSymbol: "29",
    name: "MiG-29A/G Fulcrum",
    category: "AIR",
    maxRangeNm: "38",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-mig29s",
    rwrSymbol: "29",
    name: "MiG-29S Fulcrum",
    category: "AIR",
    maxRangeNm: "33",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-su27",
    rwrSymbol: "29",
    name: "Su-27/33 Flanker",
    category: "AIR",
    maxRangeNm: "32",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-j11a",
    rwrSymbol: "29",
    name: "J-11A Flanker B+",
    category: "AIR",
    maxRangeNm: "32",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-su30",
    rwrSymbol: "30",
    name: "Su-30 Flanker-C",
    category: "AIR",
    maxRangeNm: "37",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-mig31",
    rwrSymbol: "31",
    name: "MiG-31 Foxhound",
    category: "AIR",
    maxRangeNm: "37",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-su34",
    rwrSymbol: "34",
    name: "Su-34 Fullback",
    category: "AIR",
    maxRangeNm: "35",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-jf17",
    rwrSymbol: "JF",
    name: "JF-17 Thunder",
    category: "AIR",
    maxRangeNm: "46",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  },
  {
    id: "air-a50",
    rwrSymbol: "50",
    name: "A-50/KJ-2000 AWACS",
    category: "AIR",
    maxRangeNm: "N/A",
    maxAltFt: "N/A",
    countermeasure: "Evade",
    harmCode: "N/A"
  }
];