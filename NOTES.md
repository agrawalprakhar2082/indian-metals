# Indian Metals & Alloys Mfg. Co. (P) Ltd.

- **Order received:** 2026-10-03
- **Status:** draft built, demo mode (hidden from Google)
- **Sources:** imacopper.com (their TradeIndia-hosted site) and the IndiaMART profile `indiamart.com/indianmetals`

## Files

- `build.js` holds all content (products, people, addresses). Edit it, then run
  `osascript -l JavaScript build.js "$PWD"` to rebuild `site/`.
- `site/style.css` holds the design. The build doesn't overwrite it.
- Set `LIVE = true` in `build.js` before launch. This turns on Google indexing, `sitemap.xml` and structured data.

## To confirm with the client before launch

- [x] **Email address:** rohit@imacopper.com (added 2026-10-03)
- [ ] **ISO certificate:** IndiaMART says ISO 9001:2008, a version that has been withdrawn. Ask for the current 9001:2015 certificate. The site says "ISO 9001" until then.
- [ ] **Spectrometer make:** the source says "Bubker, Germany", probably Bruker. The site says "Imported spectrometer (Germany)".
- [ ] **Behala unit:** full address.
- [ ] **Photos:** factory, machines, lab, and high-resolution product shots. For now, 14 product photos from their TradeIndia catalogue are saved in `site/images/`.
- [ ] **Logo** file. A copper "IMA" monogram is in place for now.
- [x] **Domain:** keep imacopper.com on TradeIndia for now (decided 2026-10-03). The new site is hosted at its own address. To move the domain later, set `DOMAIN` in `build.js`.
- [ ] Prices are left off on purpose (B2B quote-based). Confirm they're OK with that.
- [ ] Should the GSTIN, IEC and CIN appear in the footer? They're public on IndiaMART.
- [ ] Any key clients, approvals (e.g. RDSO, PSU vendor registrations) or brochures to add.
