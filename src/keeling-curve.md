---
title: Keeling Curve
---

# Keeling Curve

CO₂ concentration at Mauna Loa Observatory, Hawaii — the longest continuous
atmospheric CO₂ record. The sawtooth is seasonal (Northern Hemisphere plants
absorb CO₂ in summer, release in winter). The trend is us.

```js
const co2 = await FileAttachment("data/noaa_co2_daily.csv").csv({typed: true});
```

```js
// summary stats
const latest = co2.at(-1);
const first = co2[0];
const ppmIncrease = (latest.ppm - first.ppm).toFixed(2);
```

<div class="grid grid-cols-3" style="margin-bottom:1.5rem">
  <div class="card">
    <h2>Latest reading</h2>
    <span class="big">${latest.ppm} ppm</span>
    <p style="color:#aaa">${latest.date}</p>
  </div>
  <div class="card">
    <h2>First reading</h2>
    <span class="big">${first.ppm} ppm</span>
    <p style="color:#aaa">${first.date}</p>
  </div>
  <div class="card">
    <h2>Total rise</h2>
    <span class="big">+${ppmIncrease} ppm</span>
    <p style="color:#aaa">${first.date.slice(0,4)} → ${latest.date.slice(0,4)}</p>
  </div>
</div>

```js
import * as Plot from "npm:@observablehq/plot";

display(Plot.plot({
  title: "Atmospheric CO₂ at Mauna Loa (NOAA GML)",
  subtitle: "Daily mean — ppm",
  width: 900,
  height: 380,
  x: { type: "utc", label: null },
  y: { label: "CO₂ (ppm)", grid: true },
  color: { scheme: "turbo", legend: true, label: "CO₂ ppm" },
  marks: [
    Plot.line(co2, {
      x: d => new Date(d.date),
      y: "ppm",
      stroke: "ppm",
      strokeWidth: 1,
      tip: true,
    }),
  ],
}));
```

## Decade-by-decade average

```js
// DuckDB: group by decade for bar chart
const db = await DuckDBClient.of({ co2: FileAttachment("data/noaa_co2_daily.csv") });

const byDecade = await db.query(`
  SELECT
    (CAST(strftime(date::DATE, '%Y') AS INT) / 10) * 10 AS decade,
    ROUND(AVG(ppm), 2) AS avg_ppm,
    ROUND(MAX(ppm) - MIN(ppm), 2) AS range_ppm,
    COUNT(*) AS days
  FROM co2
  GROUP BY decade
  ORDER BY decade
`);
```

```js
display(Plot.plot({
  title: "Mean CO₂ by Decade",
  width: 700,
  height: 320,
  x: { label: "Decade", tickFormat: d => `${d}s` },
  y: { label: "Avg CO₂ (ppm)", grid: true, domain: [310, Math.max(...byDecade.toArray().map(r => r.avg_ppm)) + 5] },
  marks: [
    Plot.barY(byDecade, { x: "decade", y: "avg_ppm", fill: "avg_ppm", tip: true }),
    Plot.ruleY([280], { stroke: "#555", strokeDasharray: "4 2" }),
    Plot.text([{decade: 1960, avg_ppm: 283}], { x: "decade", y: "avg_ppm", text: d => "pre-industrial ~280 ppm", dy: -8, fontSize: 11, fill: "#777" }),
  ],
  color: { scheme: "YlOrRd" },
}));
```

## Raw data (first 20 rows)

```js
display(Inputs.table(co2.slice(0, 20)));
```
