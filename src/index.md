---
title: energydata-art
---

# energydata-art

Exploration workspace for clean energy, climate, and planetary data.
Refresh raw data anytime: `node scripts/fetch.js` (or `npm run fetch`).

```js
const meta = await FileAttachment("data/cache_meta.json").json();
```

## Data corpus status

```js
import {html} from "npm:htl";

const rows = Object.entries(meta).map(([id, m]) => {
  const kb = m.bytes ? `${Math.round(m.bytes / 1024).toLocaleString()} KB` : "—";
  const when = m.lastFetch ? new Date(m.lastFetch).toLocaleString() : "never";
  const status = m.ok ? "✓" : "✗";
  return html`<tr>
    <td style="color:${m.ok ? '#4caf50' : '#f44336'}">${status}</td>
    <td><strong>${id}</strong></td>
    <td style="color:#aaa;font-size:0.85em">${m.note ?? ""}</td>
    <td style="text-align:right;color:#aaa">${kb}</td>
    <td style="color:#aaa;font-size:0.85em">${when}</td>
  </tr>`;
});

display(html`<table style="width:100%;border-collapse:collapse">
  <thead><tr>
    <th></th><th style="text-align:left">Source</th>
    <th style="text-align:left">Contents</th>
    <th style="text-align:right">Size</th>
    <th style="text-align:left">Last fetched</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>`);
```

## Notebooks

- [Keeling Curve](/keeling-curve) — Mauna Loa CO₂ rise since 1974
- [Global Energy Mix](/energy-mix) — How the world generates electricity, by country and source
- [Power Plants](/power-plants) — 35,000 power plants mapped by fuel type
- [Energy Explorer](/notebooks/energy/) — interactive Python notebook (marimo, runs in browser)
