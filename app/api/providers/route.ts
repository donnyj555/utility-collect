// ─── ZIP CODE → UTILITY PROVIDERS DATABASE ───────────────────────────────────
const ZIP_DATABASE: any = {
  // ── Monroe County PA (Poconos) ──────────────────────────────────────────────
  "18301": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "No Natural Gas / Propane Only"],
    water: [
      "Aqua Pennsylvania",
      "Municipal Water Authority of East Stroudsburg",
      "Private Well",
    ],
    sewer: ["East Stroudsburg Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "Comcast / Xfinity",
      "Verizon DSL",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: ["Ferrellgas", "Suburban Propane", "AmeriGas", "Local Oil Dealer"],
  },
  "18302": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "No Natural Gas / Propane Only"],
    water: ["Aqua Pennsylvania", "Private Well"],
    sewer: ["Private Septic System", "Municipal Sewer"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon DSL", "Starlink"],
    oil: ["Ferrellgas", "Suburban Propane", "AmeriGas"],
  },
  "18360": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "No Natural Gas / Propane Only"],
    water: ["Aqua Pennsylvania", "Stroudsburg Municipal Water", "Private Well"],
    sewer: ["Stroudsburg Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: ["Comcast / Xfinity", "Verizon DSL", "T-Mobile Home Internet"],
    oil: ["Ferrellgas", "Suburban Propane", "AmeriGas"],
  },
  "18370": {
    electric: ["PPL Electric Utilities"],
    gas: ["No Natural Gas / Propane Only"],
    water: ["Private Well", "Aqua Pennsylvania"],
    sewer: ["Private Septic System"],
    trash: ["Waste Management", "Republic Services"],
    internet: ["Comcast / Xfinity", "Starlink"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },
  "18372": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "No Natural Gas / Propane Only"],
    water: ["Aqua Pennsylvania", "Private Well"],
    sewer: ["Private Septic System", "Municipal Sewer"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon DSL"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },

  // ── Philadelphia PA ──────────────────────────────────────────────────────────
  "19103": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Philadelphia Water Department"],
    sewer: ["Philadelphia Water Department"],
    trash: ["Philadelphia Streets Dept (City Collection)"],
    internet: ["Comcast / Xfinity", "Verizon Fios", "T-Mobile Home Internet"],
    oil: ["Not Applicable"],
  },
  "19104": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Philadelphia Water Department"],
    sewer: ["Philadelphia Water Department"],
    trash: ["Philadelphia Streets Dept (City Collection)"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Not Applicable"],
  },
  "19106": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Philadelphia Water Department"],
    sewer: ["Philadelphia Water Department"],
    trash: ["Philadelphia Streets Dept (City Collection)"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Not Applicable"],
  },
  "19118": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Philadelphia Water Department"],
    sewer: ["Philadelphia Water Department"],
    trash: ["Philadelphia Streets Dept (City Collection)"],
    internet: ["Comcast / Xfinity", "Verizon Fios", "T-Mobile Home Internet"],
    oil: ["Not Applicable"],
  },

  // ── Montgomery County PA ─────────────────────────────────────────────────────
  "19001": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Aqua Pennsylvania", "Municipal Water"],
    sewer: ["Municipal Sewer Authority"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Suburban Propane", "AmeriGas"],
  },
  "19046": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Aqua Pennsylvania"],
    sewer: ["Municipal Sewer Authority"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Suburban Propane"],
  },
  "19401": {
    electric: ["PECO Energy"],
    gas: ["PECO Energy (Gas)"],
    water: ["Pennsylvania American Water"],
    sewer: ["Municipal Sewer Authority"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Suburban Propane", "AmeriGas"],
  },

  // ── Pittsburgh / Allegheny County PA ────────────────────────────────────────
  "15201": {
    electric: ["Duquesne Light"],
    gas: ["Peoples Natural Gas"],
    water: ["Pittsburgh Water & Sewer Authority"],
    sewer: ["Pittsburgh Water & Sewer Authority"],
    trash: ["Republic Services", "City Collection"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Not Applicable"],
  },
  "15206": {
    electric: ["Duquesne Light"],
    gas: ["Peoples Natural Gas"],
    water: ["Pittsburgh Water & Sewer Authority"],
    sewer: ["Pittsburgh Water & Sewer Authority"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Not Applicable"],
  },

  // ── Lehigh Valley PA ─────────────────────────────────────────────────────────
  "18101": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities"],
    water: ["Allentown Water Bureau"],
    sewer: ["Allentown Sewer Authority"],
    trash: ["Republic Services", "City Collection"],
    internet: ["Comcast / Xfinity", "Service Electric Cable TV"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },
  "18015": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities"],
    water: ["City of Bethlehem Water"],
    sewer: ["City of Bethlehem Sewer"],
    trash: ["Republic Services", "Municipal Collection"],
    internet: ["Comcast / Xfinity", "Service Electric Cable TV"],
    oil: ["Ferrellgas", "AmeriGas"],
  },

  // ── Lancaster County PA ──────────────────────────────────────────────────────
  "17601": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "Columbia Gas of PA"],
    water: ["Pennsylvania American Water"],
    sewer: ["Lancaster Area Sewer Authority"],
    trash: ["Republic Services", "Waste Management"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },

  // ── Harrisburg PA ────────────────────────────────────────────────────────────
  "17101": {
    electric: ["PPL Electric Utilities"],
    gas: ["UGI Utilities", "Columbia Gas of PA"],
    water: ["City of Harrisburg Water"],
    sewer: ["City of Harrisburg Sewer"],
    trash: ["Republic Services", "City Collection"],
    internet: ["Comcast / Xfinity", "Verizon Fios"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },

  // ── Erie PA ──────────────────────────────────────────────────────────────────
  "16501": {
    electric: ["FirstEnergy / Met-Ed"],
    gas: ["National Fuel Gas"],
    water: ["Erie Water Works"],
    sewer: ["Erie Sewer Authority"],
    trash: ["Republic Services", "City Collection"],
    internet: ["Comcast / Xfinity", "Spectrum"],
    oil: ["Ferrellgas", "Suburban Propane"],
  },
};

// ── State-level fallbacks (used when ZIP not in database) ─────────────────────
const STATE_FALLBACKS: any = {
  PA: {
    electric: [
      "PPL Electric Utilities",
      "PECO Energy",
      "Duquesne Light",
      "Met-Ed (FirstEnergy)",
      "West Penn Power",
    ],
    gas: [
      "UGI Utilities",
      "Peoples Natural Gas",
      "Columbia Gas of PA",
      "National Fuel Gas",
      "PECO Energy (Gas)",
    ],
    water: [
      "Pennsylvania American Water",
      "Aqua Pennsylvania",
      "Municipal Water Authority",
      "Private Well / No Public Water",
    ],
    sewer: [
      "Municipal Sewer Authority",
      "Private Septic System",
      "Township Sewer",
    ],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "Comcast / Xfinity",
      "Verizon Fios",
      "Service Electric Cable TV",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: [
      "Suburban Propane",
      "Ferrellgas",
      "AmeriGas",
      "UGI Hearth & Home",
      "Local Oil Dealer",
    ],
  },
  NJ: {
    electric: [
      "PSE&G",
      "JCP&L (FirstEnergy)",
      "Atlantic City Electric",
      "Rockland Electric",
    ],
    gas: [
      "PSE&G",
      "New Jersey Natural Gas",
      "South Jersey Industries",
      "Elizabethtown Gas",
    ],
    water: [
      "New Jersey American Water",
      "Suez Water NJ",
      "Municipal Water",
      "Private Well",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "Comcast / Xfinity",
      "Verizon Fios",
      "Optimum",
      "T-Mobile Home Internet",
    ],
    oil: ["Suburban Propane", "Ferrellgas", "AmeriGas", "Local Oil Dealer"],
  },
  NY: {
    electric: [
      "Con Edison",
      "National Grid",
      "NYSEG",
      "Central Hudson",
      "Orange & Rockland",
    ],
    gas: ["Con Edison (Gas)", "National Grid (Gas)", "Central Hudson Gas"],
    water: [
      "NYC DEP Water",
      "New York American Water",
      "Municipal Water",
      "Private Well",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: ["DSNY (NYC Collection)", "Republic Services", "Waste Management"],
    internet: ["Spectrum", "Optimum", "Verizon Fios", "Comcast / Xfinity"],
    oil: ["Suburban Propane", "Ferrellgas", "AmeriGas", "Local Oil Dealer"],
  },
  FL: {
    electric: [
      "FPL (Florida Power & Light)",
      "Duke Energy Florida",
      "Tampa Electric (TECO)",
      "Progress Energy Florida",
    ],
    gas: [
      "TECO Peoples Gas",
      "Florida City Gas",
      "Duke Energy Gas",
      "No Natural Gas / Electric Heat",
    ],
    water: [
      "Florida American Water",
      "Municipal Water Authority",
      "City Water",
      "Private Well",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "Comcast / Xfinity",
      "AT&T Fiber",
      "Spectrum",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: ["Not Applicable"],
  },
  TX: {
    electric: [
      "Oncor Electric",
      "CenterPoint Energy",
      "AEP Texas",
      "ERCOT (choose your REP)",
    ],
    gas: ["Atmos Energy", "CenterPoint Energy Gas", "Texas Gas Service"],
    water: ["City Water / Municipal", "Private Well"],
    sewer: ["City Sewer / Municipal", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "AT&T Fiber",
      "Spectrum",
      "Comcast / Xfinity",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: ["Not Applicable"],
  },
  CA: {
    electric: ["PG&E", "Southern California Edison (SCE)", "SDG&E", "LADWP"],
    gas: ["PG&E Gas", "SoCalGas (Southern California Gas)", "SDG&E Gas"],
    water: [
      "EBMUD",
      "California American Water",
      "LADWP Water",
      "Municipal Water District",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: [
      "Republic Services",
      "Waste Management",
      "Recology",
      "Municipal Collection",
    ],
    internet: [
      "Comcast / Xfinity",
      "AT&T Fiber",
      "Spectrum",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: ["Not Applicable"],
  },
  MD: {
    electric: [
      "BGE (Baltimore Gas & Electric)",
      "Pepco",
      "Delmarva Power",
      "SMECO",
    ],
    gas: ["BGE Gas", "Washington Gas", "Columbia Gas of MD"],
    water: [
      "Baltimore City Water",
      "Maryland American Water",
      "Municipal Water",
      "Private Well",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: ["Comcast / Xfinity", "Verizon Fios", "T-Mobile Home Internet"],
    oil: ["Suburban Propane", "Ferrellgas", "AmeriGas", "Local Oil Dealer"],
  },
  VA: {
    electric: [
      "Dominion Energy Virginia",
      "Appalachian Power (AEP)",
      "Rappahannock Electric",
      "Northern Virginia Electric (NOVEC)",
    ],
    gas: ["Washington Gas", "Atmos Energy", "Columbia Gas of VA"],
    water: [
      "Virginia American Water",
      "City Water",
      "Municipal Water",
      "Private Well",
    ],
    sewer: ["Municipal Sewer Authority", "Private Septic System"],
    trash: ["Republic Services", "Waste Management", "Municipal Collection"],
    internet: [
      "Comcast / Xfinity",
      "Verizon Fios",
      "Cox",
      "T-Mobile Home Internet",
      "Starlink",
    ],
    oil: ["Suburban Propane", "Ferrellgas", "AmeriGas", "Local Oil Dealer"],
  },
};

// ── National fallback (last resort) ──────────────────────────────────────────
const NATIONAL_FALLBACK: any = {
  electric: ["Local Electric Utility Company", "Municipal Power"],
  gas: [
    "Local Natural Gas Utility",
    "No Natural Gas / Propane Only",
    "No Natural Gas / Electric Heat",
  ],
  water: [
    "Municipal Water Authority",
    "City Water",
    "Private Well / No Public Water",
  ],
  sewer: ["Municipal Sewer Authority", "Private Septic System"],
  trash: ["Republic Services", "Waste Management", "Municipal Collection"],
  internet: [
    "Comcast / Xfinity",
    "AT&T Fiber",
    "Spectrum",
    "T-Mobile Home Internet",
    "Starlink",
  ],
  oil: [
    "Suburban Propane",
    "Ferrellgas",
    "AmeriGas",
    "Local Oil Dealer",
    "Not Applicable",
  ],
};

// ── Always add these options regardless of location ───────────────────────────
const ALWAYS_INCLUDE: any = {
  gas: [
    "No Natural Gas / Oil Heat",
    "No Natural Gas / Electric Heat",
    "No Natural Gas / Propane Only",
  ],
  water: ["Private Well / No Public Water"],
  sewer: ["Private Septic System"],
  oil: ["Not Applicable"],
};

function extractZip(address: any) {
  const match = address.match(/\b(\d{5})(-\d{4})?\b/);
  return match ? match[1] : null;
}

function extractState(address: any) {
  const upper = address.toUpperCase();
  const match = upper.match(/\b([A-Z]{2})\b[\s,]*\d{5}/);
  if (match) return match[1];
  const names = {
    PENNSYLVANIA: "PA",
    "NEW JERSEY": "NJ",
    "NEW YORK": "NY",
    FLORIDA: "FL",
    TEXAS: "TX",
    CALIFORNIA: "CA",
    MARYLAND: "MD",
    VIRGINIA: "VA",
  };
  for (const [name, abbr] of Object.entries(names)) {
    if (upper.includes(name)) return abbr;
  }
  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const { address, utilityType } = req.query;
  if (!address || !utilityType)
    return res.status(400).json({ error: "Missing address or utilityType" });

  if (utilityType === "hoa")
    return res.status(200).json({ providers: [], source: "static" });

  const zip = extractZip(address);
  const state = extractState(address);

  let providers = [];
  let source = "national_fallback";

  if (zip && ZIP_DATABASE[zip]?.[utilityType]) {
    providers = ZIP_DATABASE[zip][utilityType];
    source = "zip_database";
  } else if (state && STATE_FALLBACKS[state]?.[utilityType]) {
    providers = STATE_FALLBACKS[state][utilityType];
    source = "state_fallback";
  } else {
    providers = NATIONAL_FALLBACK[utilityType] || [];
    source = "national_fallback";
  }

  const always = ALWAYS_INCLUDE[utilityType] || [];
  const merged = [...new Set([...providers, ...always])];

  return res.status(200).json({
    providers: merged,
    source,
    zip: zip || "not found",
    state: state || "not found",
  });
}
