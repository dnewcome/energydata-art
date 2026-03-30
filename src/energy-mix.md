---
title: Global Energy Mix
---

# Global Energy Mix

How the world generates electricity — by source, over time. Data: Our World in Data.

```js
const db = await DuckDBClient.of({
  energy: FileAttachment("data/owid_energy.csv"),
});
```

```js
// Countries for the selector (exclude aggregates)
const countries = await db.query(`
  SELECT DISTINCT country
  FROM energy
  WHERE iso_code IS NOT NULL AND iso_code != ''
    AND year >= 1990
  ORDER BY country
`);
const countryList = countries.toArray().map(r => r.country);
```

```js
const country = view(Inputs.select(countryList, {
  label: "Country",
  value: "United States",
}));
```

```js
const mixData = await db.query(`
  SELECT
    year,
    COALESCE(solar_electricity, 0) AS Solar,
    COALESCE(wind_electricity, 0) AS Wind,
    COALESCE(hydro_electricity, 0) AS Hydro,
    COALESCE(nuclear_electricity, 0) AS Nuclear,
    COALESCE(gas_electricity, 0) AS Gas,
    COALESCE(coal_electricity, 0) AS Coal,
    COALESCE(oil_electricity, 0) AS Oil,
    COALESCE(other_renewable_electricity, 0) AS "Other renew."
  FROM energy
  WHERE country = '${country}' AND year >= 1990
  ORDER BY year
`);

const rows = mixData.toArray();
```

```js
import * as Plot from "npm:@observablehq/plot";

// Reshape for stacked area
const sources = ["Coal", "Gas", "Oil", "Nuclear", "Hydro", "Wind", "Solar", "Other renew."];
const colors = ["#555", "#888", "#aaa", "#7b68ee", "#4fc3f7", "#81d4fa", "#fff176", "#a5d6a7"];

const flat = rows.flatMap(r =>
  sources.map(s => ({ year: r.year, source: s, twh: r[s] ?? 0 }))
);

display(Plot.plot({
  title: `Electricity generation — ${country}`,
  subtitle: "TWh per year",
  width: 900,
  height: 420,
  x: { label: null },
  y: { label: "TWh", grid: true },
  color: { domain: sources, range: colors, legend: true },
  marks: [
    Plot.areaY(flat, Plot.stackY({
      x: "year",
      y: "twh",
      fill: "source",
      order: sources,
      tip: true,
    })),
    Plot.ruleY([0]),
  ],
}));
```

## Share of renewables over time

```js
const renewShare = await db.query(`
  SELECT
    year,
    ROUND(
      100.0 * (
        COALESCE(solar_electricity,0) +
        COALESCE(wind_electricity,0) +
        COALESCE(hydro_electricity,0) +
        COALESCE(other_renewable_electricity,0)
      ) / NULLIF(electricity_generation, 0),
    1) AS renewables_pct,
    ROUND(
      100.0 * COALESCE(solar_electricity + wind_electricity, 0)
        / NULLIF(electricity_generation, 0),
    1) AS solar_wind_pct
  FROM energy
  WHERE country = '${country}' AND year >= 1990
    AND electricity_generation > 0
  ORDER BY year
`);
```

```js
display(Plot.plot({
  title: `Renewables share — ${country}`,
  width: 700,
  height: 300,
  x: { label: null },
  y: { label: "% of generation", grid: true, domain: [0, 100] },
  marks: [
    Plot.line(renewShare, { x: "year", y: "renewables_pct", stroke: "#4fc3f7", strokeWidth: 2, tip: true, label: "All renewables" }),
    Plot.line(renewShare, { x: "year", y: "solar_wind_pct", stroke: "#fff176", strokeWidth: 2, strokeDasharray: "4 2", tip: true, label: "Solar + wind only" }),
    Plot.ruleY([0]),
  ],
}));
```
