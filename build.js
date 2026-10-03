// Builds the Indian Metals & Alloys website into ./site from the content below.
// Run (macOS, no install needed):  osascript -l JavaScript build.js "<path to this folder>"
// Set LIVE = true once the client approves, to allow search engines to index the site.
ObjC.import("Foundation");

const LIVE = false;
// imacopper.com stays with TradeIndia for now (client decision, 2026-10-03).
// Set this to the site's final address (e.g. "www.imacopper.com") once the domain moves here.
const DOMAIN = "";

// ---------------------------------------------------------------------------
// Content (from imacopper.com and the company's IndiaMART profile)
// ---------------------------------------------------------------------------
const CO = {
  name: "Indian Metals & Alloys",
  legal: "Indian Metals & Alloys Mfg. Co. (P) Ltd.",
  since: "1963",
  gstin: "19AACCI7584E2Z9",
  iec: "0212006347",
  cin: "U27300WB2011PTC167575",
  office: { title: "Kolkata Office", lines: ["3A, Hare Street", "Kolkata 700 001, West Bengal"], map: "3A Hare Street Kolkata 700001" },
  foundry: { title: "Foundry & Forging Unit", lines: ["Bagirhaat Pool Bus Stop, Chakbaghi P.O.", "Bishnupur, 24 Parganas (South) 743 503"], map: "Chakbaghi Bishnupur South 24 Parganas 743503" },
  rolling: { title: "Rolling & Drawing Unit", lines: ["Behala, Kolkata", "West Bengal"], map: "Behala Kolkata" },
  people: [
    { name: "Rohit Rathi", role: "Chief Operations Officer", phone: "+91 86977 13338", tel: "+918697713338", email: "rohit@imacopper.com" },
    { name: "Ram Ratan Rathi", role: "Director", phone: "+91 98307 72264", tel: "+919830772264" },
  ],
  whatsapp: "918697713338",
  email: "rohit@imacopper.com",
  markets: ["United States", "Australia", "Turkey", "Bangladesh", "Nepal"],
};

// Product photos from the client's TradeIndia catalogue (cpimg.tistatic.com/<path>), saved in site/images/.
const IMG = (path) => "images/" + path.split("/").pop();

const DIVISIONS = [
  {
    id: "short-circuit-rings", name: "Short Circuit Rings", home: true,
    img: IMG("08662485/b/4/Copper-Chromium-Zirconium-Alloys-CuCrZr-Short-Circuit-Ring.jpg"),
    blurb: "End rings for squirrel-cage rotors, in high-conductivity copper, copper alloys and aluminium.",
    text: "Short circuit rings join the rotor bars of squirrel-cage induction motors, so they need high conductivity and the strength to hold up at speed and temperature. We produce them in copper, chromium copper and chromium zirconium copper, and in electrolytic aluminium.",
    items: ["CuCrZr Short Circuit Rings", "CuCr Short Circuit Rings", "OFHCE Grade Copper Short Circuit Rings", "ETP Grade Copper Short Circuit Rings", "Electrolytic Aluminium Short Circuit Rings"],
  },
  {
    id: "profiles-sections", name: "Profiles & Sections", home: true,
    img: IMG("08662530/b/4/ETP-Grade-Copper-Profiles-Sections.jpg"),
    blurb: "Extruded and drawn copper profiles made to your drawing.",
    text: "Extruded and drawn profiles and sections to customer drawings, for rotor bars, windings, commutators, transformers and switchgear. Available in electrolytic, oxygen-free and alloyed coppers.",
    items: ["ETP Grade Copper Profiles", "OFHC Grade Copper Profiles", "Cadmium Copper Profiles", "Silicon Copper Profiles", "Silver Bearing Copper Profiles", "CuCr Profiles & Sections", "CuCrZr Profiles & Sections", "Phosphor Bronze Profiles"],
  },
  {
    id: "centrifugal-castings", name: "Centrifugal Castings", home: true,
    img: IMG("08663907/b/4/Brass-Centrifugal-Casting.jpg"),
    blurb: "Dense, sound sleeves, rings and bush blanks, spun-cast to size.",
    text: "Centrifugal casting gives dense, sound tubular parts with a fine grain. Sleeves, rings and bush blanks are cast in copper and copper alloys, in customised sizes and shapes.",
    items: ["ETP Copper Centrifugal Castings", "DHP Copper Centrifugal Castings", "Brass Centrifugal Castings", "CuCr Centrifugal Castings", "CuCrZr Centrifugal Castings", "Silicon Copper Centrifugal Castings", "Aluminium Bronze Centrifugal Castings", "Bronze Centrifugal Castings"],
  },
  {
    id: "non-ferrous-castings", name: "Non-Ferrous Castings", home: true,
    img: IMG("09010301/b/4/Non-Ferrous-Centrifugal-Castings.jpg"),
    blurb: "Bronze, gunmetal and brass bushes, gears, liners and housings.",
    text: "Sand and centrifugal castings in phosphor bronze, leaded bronze, aluminium bronze, gunmetal and brass: bushes, gears, liners and housings for heavy machinery, supplied as-cast or machined.",
    items: ["Phosphor Bronze Castings", "PB2 Castings", "Phosphor Bronze Bushes", "Leaded Bronze Castings", "C93200 Leaded Bronze", "Leaded Bronze Industrial Bushings", "Gunmetal Heavy Bush Castings", "Gunmetal & Bronze Gears", "Aluminium Bronze Gear Rings", "Aluminium Bronze Bushes", "Aluminium Bronze AB1", "Aluminium Bronze Components", "Silicon Bronze Castings", "Brass Bushes", "Brass Liners", "Bronze Liners", "Frame Bearing Bushings", "Upper Bush Housings", "Non-Ferrous Sand Castings", "Copper Alloy Castings"],
  },
  {
    id: "billets", name: "Billets", home: true,
    img: IMG("08663893/b/4/ETP-Copper-Billets.jpg"),
    blurb: "Copper and alloy billets for extrusion, forging and re-rolling.",
    text: "Cast billets in electrolytic and deoxidised copper, copper alloys, brass and cupro-nickel, supplied as feedstock for extrusion, forging and re-rolling.",
    items: ["ETP Copper Billets", "DHP Copper Billets", "Brass Billets", "CuCr Billets", "CuCrZr Billets", "Silicon Copper Billets", "Cupro-Nickel Alloy Billets", "Bronze Billets"],
  },
  {
    id: "forged-products", name: "Forged Products", home: true,
    img: IMG("09010331/b/4/Copper-Forged-Ring.jpg"),
    blurb: "Forged rings, plates and components in copper and aluminium.",
    text: "Forged rings, plates and components in oxygen-free and electrolytic copper, chromium zirconium copper and aluminium. Forging refines the grain structure for parts that carry high current under mechanical load.",
    items: ["Copper Forged Rings", "Copper End Rings", "Non-Ferrous Metal Rings", "Copper Forged Components", "CuCrZr Forgings", "Aluminium Forgings", "OFE Grade C10100 Copper", "C10200 Oxygen-Free Copper Plates", "ETP Copper Plates (99.9%)", "Bare Copper Strips"],
  },
  {
    id: "copper-alloys", name: "Alloy Bars, Rods & Plates", home: true,
    img: IMG("09010335/b/4/Chromium-Copper-Bars-Rods-Flats.jpg"),
    blurb: "High-strength and high-conductivity alloys in bar, rod, flat and plate.",
    text: "Bars, rods, flats and plates in chromium copper, chromium zirconium copper, cadmium copper, silicon copper, silver-bearing copper, phosphor bronze and aluminium bronze.",
    items: ["Chromium Copper Bars, Rods & Flats", "Chromium Zirconium Copper Rods", "C16200 Cadmium Copper Bars & Rods", "Copper Silicon Alloys", "Silver Bearing Copper", "Phosphor Bronze Bars", "Phosphor Bronze Rods", "Aluminium Bronze Rods", "OFHC Grade Copper Plates", "Electrolytic Copper Bus Bars", "Copper Rods", "Copper Flats"],
  },
  {
    id: "conductors", name: "Copper & Aluminium Conductors", home: true,
    img: IMG("08666422/b/4/CNC-Nomex-Copper-Conductors.jpg"),
    blurb: "Bare and insulated rectangular conductors for windings.",
    text: "Bare and insulated rectangular conductors and strips for motor, generator and transformer windings. We offer a full range of insulation systems: enamel, polyester film, fibre glass, mica, Nomex, paper and direct plating.",
    items: ["Bare Copper Conductors", "ETP Grade Copper Strips", "Copper Strips, 1–6 mm thick", "Oxygen-Free Copper C10100 Strips", "Paper Insulated Copper Strips", "Double Fibre Glass Covered (DFGC) Conductors", "Varnish Bonded Fibre Glass Covered Conductors", "Enamelled Copper Conductors", "Class C Enamel Copper Conductors", "Super Enamelled Conductors", "Enamelled DGC Conductors", "Polyester Film Covered Copper Conductors", "Polyester Film Covered Aluminium Conductors", "Mica Insulated Conductors", "Polyester & Mica Conductors", "Nomex Insulated Copper Conductors", "Nomex Insulated Aluminium Conductors", "Direct Plated Copper (DPC) Conductors", "DPC Aluminium Conductors", "Insulated Aluminium Conductors for Electromagnets", "Bare Aluminium Strips"],
  },
  {
    id: "ht-motors", name: "For Motors & Generators",
    img: IMG("09010365/b/4/Short-Circuit-Ring.jpg"),
    text: "Rotor and stator components supplied to manufacturers of HT motors and generators.",
    items: ["Short Circuit Rings", "Copper Rotor Bars", "Damper Bars", "Electrolytic Grade Copper Bars", "Copper Profiles", "Aluminium Short Circuiting Rings", "OFHC Copper Plates", "Copper Pipe Coils", "Brush Gear Assemblies", "Brush Holders", "Phosphor Bronze Rods"],
  },
  {
    id: "railways", name: "For Railways",
    img: IMG("09010384/b/4/Aluminium-Bronze-Shrink-Ring.jpg"),
    text: "Copper and bronze components for traction motors and rolling stock.",
    items: ["Copper Rotor Bars", "Resistance Rings", "Aluminium Bronze Shrink Rings", "Electrolytic Copper Bus Bar Sets", "Finger Contacts & Flexible Shunts"],
  },
  {
    id: "transformers-switchgear", name: "For Transformers & Switchgear",
    img: IMG("09010379/b/4/Copper-Busbars.jpg"),
    text: "Busbars, profiles, contacts and insulated conductors for transformer and switchgear builders.",
    items: ["Copper Busbars", "Fabricated Copper Bus Bars", "Copper Profiles & Sections", "Copper Forged Components", "Varnish Bonded Fibre Glass Covered Conductors", "Bare Aluminium Strips", "Copper & Brass Contact Clamps"],
  },
  {
    id: "ferro-alloys", name: "For Ferro Alloy Plants",
    img: IMG("09010391/b/4/Flexible-Shunt.jpg"),
    text: "High-current connections for submerged arc and induction furnaces.",
    items: ["Water Cooled Copper Cables", "Flexible Shunts", "Copper Contact Clamps", "Bus Bars & Assemblies", "Copper Flanges", "Super Enamelled Conductors"],
  },
  {
    id: "welding", name: "Welding Consumables",
    img: IMG("09010410/b/4/Seam-Welding-Wheels.jpg"),
    text: "Copper alloy wear parts for resistance and arc welding.",
    items: ["Seam Welding Wheels", "Welding Contact Tips & Holders"],
  },
  {
    id: "special", name: "Special Products",
    img: IMG("09010421/b/4/Casting-Copper-Mould-Plates.jpg"),
    text: "Made-to-order copper products for casting and finishing industries.",
    items: ["Casting Copper Mould Plates", "Copper Gemstone Polishing Laps"],
  },
];

const PROCESSES = [
  ["Casting", "Sand & centrifugal", "Copper, bronze, brass and gunmetal cast in our Bishnupur foundry, from billets to finished bushes and rings."],
  ["Forging", "Rings & components", "Forged rings, plates and components with a refined grain structure for high-current, high-load parts."],
  ["Rolling", "Plates, strips & flats", "Rolling at our Behala unit to plate, strip and flat dimensions."],
  ["Extrusion", "Profiles & sections", "Profiles, sections and bars extruded to customer drawings."],
  ["Drawing", "Bars, rods & conductors", "Rods, bars and rectangular conductors drawn to size."],
  ["Machining", "Finished parts", "Castings and forgings machined to drawing and delivered ready to fit."],
];

const MATERIALS = [
  ["ETP Cu", "Electrolytic tough pitch copper", "Busbars, conductors, rings"],
  ["OFHC · OFE", "Oxygen-free copper, C10200 / C10100", "High-purity plates, strips, rings"],
  ["DHP Cu", "Phosphorus-deoxidised copper", "Billets and centrifugal castings"],
  ["CuCr", "Chromium copper", "Rotor rings, welding parts, bars"],
  ["CuCrZr", "Chromium zirconium copper", "Rings, castings, rods, forgings"],
  ["Cd-Cu", "Cadmium copper, C16200", "Bars, rods and sections"],
  ["Si-Cu", "Silicon copper", "Billets, castings, profiles"],
  ["Ag-Cu", "Silver-bearing copper", "Profiles for windings"],
  ["PB", "Phosphor bronze, incl. PB2", "Bushes, bars, castings"],
  ["AB", "Aluminium bronze, incl. AB1", "Gear rings, shrink rings, bushes"],
  ["LB", "Leaded bronze, C93200", "Bearings and bushings"],
  ["GM", "Gunmetal", "Heavy bushes and gears"],
  ["CuZn", "Brass", "Billets, bushes, liners"],
  ["CuNi", "Cupro-nickel", "Alloy billets"],
  ["Al", "Electrolytic aluminium", "Rings, conductors, strips"],
];

const INDUSTRIES = [
  ["Motors & Generators", "Rotor and winding components for HT motor and generator manufacturers.", ["Short circuit rings", "Rotor bars", "Damper bars", "Profiles"], "ht-motors"],
  ["Railways", "Traction motor and rolling stock components.", ["Rotor bars", "Resistance rings", "Shrink rings", "Shunts"], "railways"],
  ["Transformers & Switchgear", "Current-carrying parts and winding conductors.", ["Busbars", "Insulated conductors", "Contact clamps"], "transformers-switchgear"],
  ["Ferro Alloys & Furnaces", "High-current furnace connections.", ["Water-cooled cables", "Flexible shunts", "Contact clamps"], "ferro-alloys"],
  ["Welding", "Copper alloy wear parts for resistance welding.", ["Seam welding wheels", "Contact tips"], "welding"],
  ["Heavy Engineering", "Bearing and wear parts for heavy machinery.", ["Bronze bushes", "Gears", "Liners", "Housings"], "non-ferrous-castings"],
];

const EQUIPMENT = [
  ["Composition", "Spectro chemical analyser", "Imported spectrometer (Germany) for fast, accurate alloy composition checks."],
  ["Composition", "Chemical analysis laboratory", "Wet chemical analysis to confirm grade and purity."],
  ["Mechanical", "Universal testing machine", "Computerised tensile testing: tensile strength, yield and elongation."],
  ["Mechanical", "Hardness testers", "Brinell and Rockwell hardness testing."],
  ["Soundness", "Ultrasonic flaw detectors", "Several ultrasonic units for checking the internal soundness of castings and forgings."],
  ["Electrical", "Conductivity test equipment", "Electrical conductivity testing of copper and conductor products."],
  ["Pressure", "Hydraulic pressure testing", "Pressure testing of castings and fabricated parts."],
  ["Dimensions", "Measuring instruments", "Standard measuring instruments for dimensional inspection."],
];

// ---------------------------------------------------------------------------
// Rendering helpers
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const enquire = (product) => `contact.html?product=${encodeURIComponent(product)}#enquiry`;
const mapUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);

const WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.2.6 4.4 1.7 6.3L3 29l7.3-1.9c1.8 1 3.8 1.5 5.8 1.5 7 0 12.7-5.7 12.7-12.6C28.8 8.6 23 3 16 3zm0 23.1c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.3 1.1 1.2-4.2-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6C5.3 9.9 10.1 5.2 16 5.2s10.7 4.7 10.7 10.5S21.9 26.1 16 26.1zm5.9-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2s0-.5.1-.6l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>';

const NAV = [["company", "Company", "company.html"], ["products", "Products", "products.html"], ["quality", "Quality", "quality.html"], ["contact", "Contact", "contact.html"]];

function layout(key, title, description, body) {
  const fullTitle = key === "index" ? `${CO.legal} | Copper & Copper Alloy Products since 1963` : `${title} | ${CO.name}`;
  const robots = LIVE ? "index,follow" : "noindex,nofollow";
  const canonical = LIVE && DOMAIN ? `<link rel="canonical" href="https://${DOMAIN}/${key === "index" ? "" : key + ".html"}">` : "";
  const ld = LIVE && key === "index"
    ? `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org", "@type": "Organization", name: CO.legal, url: DOMAIN ? "https://" + DOMAIN + "/" : undefined,
        foundingDate: CO.since, telephone: CO.people[0].tel, email: CO.email,
        address: { "@type": "PostalAddress", streetAddress: "3A, Hare Street", addressLocality: "Kolkata", postalCode: "700001", addressRegion: "West Bengal", addressCountry: "IN" },
      })}</script>`
    : "";
  const nav = NAV.map(([k, label, href]) => `<a href="${href}"${k === key ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta name="theme-color" content="#14181d">
${canonical}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,600&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="style.css">
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#b4693a"/><text x="32" y="44" font-family="Georgia,serif" font-size="34" font-weight="700" text-anchor="middle" fill="#1b0f07">Cu</text></svg>')}">
${ld}
</head>
<body>
<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="index.html" aria-label="${esc(CO.legal)} home">
      <span class="brand-mark">IMA</span>
      <span class="brand-name">${esc(CO.name)}<small>Mfg. Co. (P) Ltd. · Est. ${CO.since}</small></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="nav" id="site-nav">${nav}<a class="btn btn-copper" href="contact.html#enquiry">Request a quote</a></nav>
  </div>
</header>
<main>
${body}
</main>
${footer()}
<a class="wa" href="https://wa.me/${CO.whatsapp}?text=${encodeURIComponent("Hello, I have an enquiry for Indian Metals & Alloys.")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA_ICON}</a>
<script src="site.js"></script>
</body>
</html>
`;
}

function footer() {
  const mainDivs = DIVISIONS.filter((d) => d.home).slice(0, 6);
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <a class="brand" href="index.html"><span class="brand-mark">IMA</span><span class="brand-name" style="color:#fff">${esc(CO.name)}<small>Mfg. Co. (P) Ltd.</small></span></a>
      <p>Copper and copper-alloy products by casting, forging, rolling, extrusion, drawing and machining. Kolkata, since ${CO.since}.</p>
    </div>
    <div><h4>Products</h4><ul>${mainDivs.map((d) => `<li><a href="products.html#${d.id}">${esc(d.name)}</a></li>`).join("")}<li><a href="products.html">All products →</a></li></ul></div>
    <div><h4>Company</h4><ul><li><a href="company.html">About us</a></li><li><a href="company.html#units">Manufacturing units</a></li><li><a href="quality.html">Quality &amp; testing</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    <div><h4>Talk to us</h4><ul>${CO.people.map((p) => `<li>${esc(p.name)}<br><a href="tel:${p.tel}">${esc(p.phone)}</a></li>`).join("")}<li><a href="mailto:${CO.email}">${CO.email}</a></li><li>${CO.office.lines.map(esc).join("<br>")}</li></ul></div>
  </div>
  <div class="wrap legal">
    <span>© ${new Date().getFullYear()} ${esc(CO.legal)}</span>
    <span>GSTIN ${CO.gstin} · IEC ${CO.iec} · CIN ${CO.cin}</span>
  </div>
</footer>`;
}

function ctaBand() {
  return `<section class="cta">
  <div class="wrap">
    <div>
      <h2>Send us your drawing or specification.</h2>
      <p>We'll come back with material, process and pricing.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:center">
      <div class="phones">${CO.people.map((p) => `<a href="tel:${p.tel}">${esc(p.phone)}</a>`).join("")}<a href="mailto:${CO.email}">${CO.email}</a></div>
      <a class="btn btn-ink arrow" href="contact.html#enquiry">Request a quote</a>
    </div>
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------
function home() {
  const years = new Date().getFullYear() - 1963;
  const cards = DIVISIONS.filter((d) => d.home).map((d) => `
    <a class="division" href="products.html#${d.id}">
      <div class="ph"><img src="${d.img}" alt="${esc(d.name)}" loading="lazy"></div>
      <div class="tx"><h3>${esc(d.name)}</h3><p>${esc(d.blurb)}</p><span class="more">View range</span></div>
    </a>`).join("");
  return layout("index", "Home", `${CO.legal}, Kolkata: manufacturer and exporter of copper and copper-alloy castings, forgings, profiles, billets, short circuit rings and conductors since 1963.`, `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">Established ${CO.since} · Kolkata, India</p>
      <h1 style="margin-top:1.1rem">Copper &amp; copper alloys, <em>made to standard</em> for over six decades.</h1>
      <p class="lead">We cast, forge, roll, extrude, draw and machine copper and copper-alloy products to ASTM, DIN and IS standards for motor, railway, transformer and ferro-alloy manufacturers in India and abroad.</p>
      <div class="hero-actions">
        <a class="btn btn-copper arrow" href="contact.html#enquiry">Request a quote</a>
        <a class="btn btn-line" href="products.html">Explore products</a>
      </div>
      <div class="hero-meta"><span>ASTM · DIN · IS</span><span>ISO 9001</span><span>Exporting to 5 countries</span></div>
    </div>
    <div>
      <div class="element" role="img" aria-label="Copper, element 29">
        <div class="num"><span>29</span><span>8.96 g/cm³</span></div>
        <div class="sym">Cu</div>
        <div><div class="name">Copper</div><div class="mass">63.546</div></div>
      </div>
      <p class="element-caption">Our material since ${CO.since}</p>
    </div>
  </div>
</section>

<section class="figures">
  <div class="wrap figures-row">
    <div class="figure"><b>${years}+</b><span>Years in copper</span></div>
    <div class="figure"><b>6</b><span>In-house processes</span></div>
    <div class="figure"><b>2</b><span>Manufacturing units</span></div>
    <div class="figure"><b>100+</b><span>Products in the range</span></div>
    <div class="figure"><b>5</b><span>Export markets</span></div>
  </div>
</section>

<section class="section on-light">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">What we make</p><h2>Product range</h2></div>
      <p class="lead">From billets and castings to precision-drawn conductors, in electrolytic, oxygen-free and alloyed coppers, bronzes, brass and aluminium.</p>
    </div>
    <div class="divisions">${cards}</div>
    <p style="margin-top:2rem"><a class="btn btn-line arrow" href="products.html">See all ${DIVISIONS.reduce((n, d) => n + d.items.length, 0)}+ products</a></p>
  </div>
</section>

<section class="section dark">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">How we make it</p><h2>Six processes under one roof</h2></div>
      <p class="lead">Casting and forging at Bishnupur, rolling and drawing at Behala. A part can go from melt to finished component without leaving our works.</p>
    </div>
    <div class="processes">${PROCESSES.map(([n, tag, t]) => `<div class="process"><span class="tag">${tag}</span><h3>${n}</h3><p>${t}</p></div>`).join("")}</div>
  </div>
</section>

<section class="section mist">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Materials</p><h2>Grades we work in</h2></div>
      <p class="lead">Every product is made to the grade and standard on your drawing. Tell us your specification and we'll match it.</p>
    </div>
    <div class="materials">${MATERIALS.map(([c, f, u]) => `<div class="alloy"><span class="code">${c}</span><span class="full">${f}</span><span class="use">${u}</span></div>`).join("")}</div>
    <div class="standards"><span style="color:var(--muted)">Manufactured to</span><b>ASTM</b><b>DIN</b><b>IS</b><span style="color:var(--muted)">and customer specifications</span></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Industries</p><h2>Who we supply</h2></div>
      <p class="lead">Parts that carry current, take heat and resist wear, for the manufacturers who build India's motors, trains and power equipment.</p>
    </div>
    <div class="industries">${INDUSTRIES.map(([n, t, tags, id]) => `<a class="industry" href="products.html#${id}" style="text-decoration:none"><h3>${n}</h3><p>${t}</p><ul>${tags.map((x) => `<li>${x}</li>`).join("")}</ul></a>`).join("")}</div>
  </div>
</section>

<section class="section dark">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Quality</p>
      <h2 style="margin-top:.75rem">Tested before it leaves the works</h2>
      <p class="lead" style="margin-top:1.25rem">An in-house laboratory checks composition, mechanical properties, conductivity and soundness, so what we ship matches what you specified.</p>
      <p style="margin-top:2rem"><a class="btn btn-line arrow" href="quality.html">Quality &amp; testing</a></p>
    </div>
    <ul class="checklist">
      <li>Spectro chemical analysis of alloy composition</li>
      <li>Computerised universal testing machine</li>
      <li>Ultrasonic flaw detection</li>
      <li>Electrical conductivity testing</li>
      <li>Brinell &amp; Rockwell hardness testing</li>
      <li>Hydraulic pressure testing</li>
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Exports</p>
      <h2 style="margin-top:.75rem">Exporting to five countries</h2>
      <p class="lead" style="margin-top:1.25rem">Export orders make up a growing share of our business. We work on D/P and L/C terms.</p>
    </div>
    <div class="section dark" style="padding:2rem">
      <p class="eyebrow">Current export markets</p>
      <div class="markets">${CO.markets.map((m) => `<span class="market"><b>→</b>${m}</span>`).join("")}</div>
    </div>
  </div>
</section>

${ctaBand()}`);
}

function products() {
  const nav = DIVISIONS.map((d) => `<a href="#${d.id}" data-target="${d.id}">${esc(d.name)}</a>`).join("");
  const blocks = DIVISIONS.map((d) => `
  <section class="division-block" id="${d.id}" data-division>
    <div class="intro">
      <div>
        <p class="eyebrow">${d.items.length} product${d.items.length > 1 ? "s" : ""}</p>
        <h2>${esc(d.name)}</h2>
        <p>${esc(d.text)}</p>
      </div>
      <img src="${d.img}" alt="${esc(d.name)}" loading="lazy">
    </div>
    <div class="products">${d.items.map((it) => `<div class="product" data-product="${esc(it.toLowerCase())}"><span>${esc(it)}</span><a href="${enquire(it)}" aria-label="Enquire about ${esc(it)}">Enquire</a></div>`).join("")}</div>
  </section>`).join("");
  return layout("products", "Products", `Copper and copper-alloy products from ${CO.name}: short circuit rings, profiles, billets, castings, forgings, alloy bars and insulated conductors.`, `
<section class="page-head">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Products</p>
    <h1>Products</h1>
    <p class="lead">${DIVISIONS.reduce((n, d) => n + d.items.length, 0)}+ products in ${DIVISIONS.length} groups. All made to ASTM, DIN, IS or your own specification. Sizes, grades and finishes to order.</p>
  </div>
</section>
<section class="section on-light">
  <div class="wrap catalogue">
    <aside class="cat-nav" aria-label="Product groups">
      <div class="search"><label class="eyebrow" for="product-search" style="display:block;margin-bottom:.5rem">Find a product</label><input id="product-search" type="search" placeholder="e.g. CuCrZr, busbar, bush"></div>
      ${nav}
    </aside>
    <div>
      ${blocks}
      <p class="no-results" id="no-results" hidden>No product matches that search. <a href="contact.html#enquiry">Ask us</a>: we make many parts to drawing that aren't listed here.</p>
      <p class="spec-note">Don't see your part? Most of our work is made to customer drawings. Send yours.</p>
    </div>
  </div>
</section>
${ctaBand()}`);
}

function company() {
  const unit = (u, kind, text) => `<div class="unit"><span class="kind">${kind}</span><h3>${esc(u.title)}</h3><p>${u.lines.map(esc).join("<br>")}</p><p>${text}</p></div>`;
  return layout("company", "Company", `${CO.legal}: copper and copper-alloy manufacturer in Kolkata since 1963, with foundry, forging, rolling and drawing units.`, `
<section class="page-head">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Company</p>
    <h1>Working in copper since ${CO.since}</h1>
    <p class="lead">A Kolkata manufacturer of copper and copper-alloy products, with its own foundry, forge, rolling mill and drawing plant.</p>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="prose">
      <p>Indian Metals &amp; Alloys has processed copper and copper alloys since ${CO.since}. Over six decades the company has grown into one of the established names in its field in India, covering casting, forging, rolling, extrusion, drawing and machining.</p>
      <p>We make copper and copper-based alloys in a wide range of shapes, sizes and dimensions to ASTM, DIN and IS standards, as well as to customers' own drawings. Our products go into HT motors and generators, railway equipment, transformers and switchgear, ferro-alloy furnaces and welding equipment.</p>
      <p>We run the business on three things: <strong>quality</strong>, <strong>technical</strong> capability and <strong>commercial</strong> reliability. Each one matters to the engineers and buyers who depend on us.</p>
    </div>
    <table class="factsheet">
      <tbody>
        <tr><th>Company</th><td>${esc(CO.legal)}</td></tr>
        <tr><th>Established</th><td>${CO.since}</td></tr>
        <tr><th>Nature of business</th><td>Manufacturer &amp; exporter</td></tr>
        <tr><th>People</th><td>101–500</td></tr>
        <tr><th>Quality system</th><td>ISO 9001</td></tr>
        <tr><th>Export markets</th><td>${CO.markets.join(", ")}</td></tr>
        <tr><th>Payment terms</th><td>D/P, L/C</td></tr>
        <tr><th>GSTIN</th><td class="mono">${CO.gstin}</td></tr>
        <tr><th>IEC</th><td class="mono">${CO.iec}</td></tr>
        <tr><th>CIN</th><td class="mono">${CO.cin}</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="section dark" id="units">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Infrastructure</p><h2>Our units</h2></div>
      <p class="lead">Two manufacturing units, with the commercial office in central Kolkata.</p>
    </div>
    <div class="units">
      ${unit(CO.foundry, "Casting · Forging · Machining", "Sand and centrifugal casting, forging and machining of copper, bronze, brass and aluminium.")}
      ${unit(CO.rolling, "Rolling · Extrusion · Drawing", "Rolling, extrusion and drawing of plates, strips, profiles, bars and conductors.")}
      ${unit(CO.office, "Sales · Commercial", "Enquiries, quotations, orders and export documentation.")}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head single"><p class="eyebrow">Leadership</p><h2>The people you'll deal with</h2></div>
    <div class="people">${CO.people.map((p) => `<div class="person"><span class="role">${esc(p.role)}</span><h3>${esc(p.name)}</h3><a href="tel:${p.tel}">${esc(p.phone)}</a>${p.email ? `<a href="mailto:${p.email}">${esc(p.email)}</a>` : ""}</div>`).join("")}</div>
  </div>
</section>
${ctaBand()}`);
}

function quality() {
  return layout("quality", "Quality & Testing", `Quality and testing at ${CO.name}: spectro analysis, universal testing, ultrasonic flaw detection, conductivity and hardness testing.`, `
<section class="page-head">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Quality</p>
    <h1>Quality &amp; testing</h1>
    <p class="lead">Chemical, mechanical, physical, electrical and ultrasonic testing in-house, so every order is checked against your specification before dispatch.</p>
  </div>
</section>

<section class="section dark">
  <div class="wrap pillars">
    <div class="pillar"><p class="eyebrow">01 · Quality</p><h3>Right material, every time</h3><p>Composition, properties and soundness verified in our own laboratory.</p></div>
    <div class="pillar"><p class="eyebrow">02 · Technical</p><h3>Engineered to drawing</h3><p>Grades and processes chosen to suit how your part is used: current, heat, load and wear.</p></div>
    <div class="pillar"><p class="eyebrow">03 · Commercial</p><h3>Dependable supply</h3><p>Clear quotations, agreed delivery schedules and export-ready documentation.</p></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><p class="eyebrow">Laboratory</p><h2>Testing facilities</h2></div>
      <p class="lead">Manufactured to ASTM, DIN and IS standards under an ISO 9001 quality management system.</p>
    </div>
    <div class="equipment">${EQUIPMENT.map(([w, n, t]) => `<div class="equip"><span class="what">${w}</span><h3>${n}</h3><p>${t}</p></div>`).join("")}</div>
  </div>
</section>
${ctaBand()}`);
}

function contact() {
  const addr = (u, kind) => `<div class="addr"><span class="kind">${kind}</span><h3>${esc(u.title)}</h3><p>${u.lines.map(esc).join("<br>")}</p><a class="map" href="${mapUrl(u.map)}" target="_blank" rel="noopener">Open in Google Maps →</a></div>`;
  const options = DIVISIONS.map((d) => `<optgroup label="${esc(d.name)}">${d.items.map((i) => `<option>${esc(i)}</option>`).join("")}</optgroup>`).join("");
  return layout("contact", "Contact", `Contact ${CO.legal}, 3A Hare Street, Kolkata. Call ${CO.people[0].phone} or send an enquiry.`, `
<section class="page-head">
  <div class="wrap">
    <p class="crumbs"><a href="index.html">Home</a> / Contact</p>
    <h1>Contact us</h1>
    <p class="lead">Send your drawing, grade and quantity, and our sales team will get back to you.</p>
  </div>
</section>

<section class="section">
  <div class="wrap contact-grid">
    <div>
      <div class="people" style="grid-template-columns:minmax(0,1fr);margin-bottom:2.5rem">${CO.people.map((p) => `<div class="person"><span class="role">${esc(p.role)}</span><h3>${esc(p.name)}</h3><a href="tel:${p.tel}">${esc(p.phone)}</a>${p.email ? `<a href="mailto:${p.email}">${esc(p.email)}</a>` : ""}</div>`).join("")}</div>
      ${addr(CO.office, "Office")}
      ${addr(CO.foundry, "Works")}
      ${addr(CO.rolling, "Works")}
    </div>
    <form class="form" id="enquiry" data-whatsapp="${CO.whatsapp}" data-email="${CO.email}" novalidate>
      <p class="eyebrow">Enquiry</p>
      <h2>Request a quote</h2>
      <div class="row">
        <label for="f-name">Your name<input id="f-name" name="name" required autocomplete="name"></label>
        <label for="f-company">Company<input id="f-company" name="company" autocomplete="organization"></label>
      </div>
      <div class="row">
        <label for="f-phone">Phone / WhatsApp<input id="f-phone" name="phone" required inputmode="tel" autocomplete="tel"></label>
        <label for="f-email">Email<input id="f-email" name="email" type="email" autocomplete="email"></label>
      </div>
      <div class="row">
        <label for="f-product">Product<select id="f-product" name="product"><option value="">Select a product</option>${options}<option>Other / made to drawing</option></select></label>
        <label for="f-qty">Quantity<input id="f-qty" name="quantity" placeholder="e.g. 500 kg, 200 pcs"></label>
      </div>
      <label for="f-msg">Grade, size &amp; specification<textarea id="f-msg" name="message" placeholder="Material grade, dimensions, standard (ASTM / DIN / IS), delivery location"></textarea></label>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem"><button class="btn btn-copper arrow" type="submit">Send on WhatsApp</button><button class="btn btn-line" type="button" data-send="email">Send by email</button></div>
      <p class="note">Your enquiry opens in WhatsApp or your email app, ready to send to ${CO.email}.</p>
      <p class="form-status" id="form-status" role="status"></p>
    </form>
  </div>
</section>`);
}

const SITE_JS = `(function () {
  var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
  if (toggle && nav) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Product search and active group highlighting (products page)
  var search = document.getElementById('product-search');
  if (search) {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('[data-division]'));
    var empty = document.getElementById('no-results');
    search.addEventListener('input', function () {
      var q = search.value.trim().toLowerCase(), any = false;
      blocks.forEach(function (b) {
        var shown = 0;
        b.querySelectorAll('[data-product]').forEach(function (p) {
          var hit = !q || p.getAttribute('data-product').indexOf(q) > -1;
          p.hidden = !hit; if (hit) shown++;
        });
        b.hidden = shown === 0; if (shown) any = true;
      });
      empty.hidden = any;
    });
    var links = document.querySelectorAll('.cat-nav a[data-target]');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-target') === e.target.id); });
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      blocks.forEach(function (b) { io.observe(b); });
    }
  }

  // Enquiry form: prefill product from link, send via WhatsApp
  var form = document.getElementById('enquiry');
  if (form) {
    try {
      var p = new URLSearchParams(location.search).get('product');
      if (p) {
        form.product.value = p;
        if (form.product.value !== p) { form.product.value = 'Other / made to drawing'; form.message.value = 'Product: ' + p + '\\n'; }
      }
    } catch (e) {}
    var status = document.getElementById('form-status');
    function message() {
      if (!form.name.value.trim() || !form.phone.value.trim()) { status.textContent = 'Please add your name and phone number.'; return null; }
      var f = new FormData(form);
      return 'Enquiry for Indian Metals & Alloys\\n\\nName: ' + f.get('name') + '\\nCompany: ' + f.get('company') + '\\nPhone: ' + f.get('phone') + '\\nEmail: ' + f.get('email') + '\\nProduct: ' + f.get('product') + '\\nQuantity: ' + f.get('quantity') + '\\n\\n' + f.get('message');
    }
    form.querySelector('[data-send="email"]').addEventListener('click', function () {
      var text = message(); if (!text) return;
      location.href = 'mailto:' + form.getAttribute('data-email') + '?subject=' + encodeURIComponent('Enquiry: ' + (form.product.value || 'Copper products')) + '&body=' + encodeURIComponent(text);
      status.textContent = 'Your email app has opened with the enquiry. Press send to reach our sales team.';
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = message(); if (!text) return;
      window.open('https://wa.me/' + form.getAttribute('data-whatsapp') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      status.textContent = 'WhatsApp has opened with your enquiry. Press send to reach our sales team.';
    });
  }
})();
`;

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------
function write(path, text) {
  const ok = $(text).writeToFileAtomicallyEncodingError(path, true, $.NSUTF8StringEncoding, null);
  if (!ok) throw new Error("Could not write " + path);
}

function run(argv) {
  const root = (argv && argv[0]) || ".";
  const out = root + "/site";
  write(out + "/index.html", home());
  write(out + "/products.html", products());
  write(out + "/company.html", company());
  write(out + "/quality.html", quality());
  write(out + "/contact.html", contact());
  write(out + "/site.js", SITE_JS);
  write(out + "/robots.txt", LIVE ? `User-agent: *\nAllow: /\n${DOMAIN ? `Sitemap: https://${DOMAIN}/sitemap.xml\n` : ""}` : "User-agent: *\nDisallow: /\n");
  if (LIVE && DOMAIN) {
    write(out + "/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["", "company.html", "products.html", "quality.html", "contact.html"].map((p) => `  <url><loc>https://${DOMAIN}/${p}</loc></url>`).join("\n")}\n</urlset>\n`);
  }
  return "Built " + (LIVE ? "LIVE" : "DEMO") + " site with " + DIVISIONS.reduce((n, d) => n + d.items.length, 0) + " products into " + out;
}
