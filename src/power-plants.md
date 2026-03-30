---
title: Power Plants
---

# Global Power Plants

~35,000 power plants worldwide. Source: WRI Global Power Plant Database.

```js
const db = await DuckDBClient.of({
  plants: FileAttachment("data/global_power_plants.csv"),
});
```

```js
// Summary by fuel type
const byFuel = await db.query(`
  SELECT
    primary_fuel AS fuel,
    COUNT(*) AS count,
    ROUND(SUM(capacity_mw) / 1000, 0) AS capacity_gw
  FROM plants
  WHERE primary_fuel IS NOT NULL
  GROUP BY primary_fuel
  ORDER BY capacity_gw DESC
`);
```

```js
import * as Plot from "npm:@observablehq/plot";

display(Plot.plot({
  title: "Global installed capacity by fuel type",
  subtitle: "GW",
  marginLeft: 100,
  width: 700,
  height: 400,
  x: { label: "GW", grid: true },
  y: { label: null },
  marks: [
    Plot.barX(byFuel, {
      y: "fuel",
      x: "capacity_gw",
      fill: "fuel",
      sort: { y: "-x" },
      tip: true,
    }),
  ],
}));
```

## Plant count by country (top 20)

```js
const byCountry = await db.query(`
  SELECT country_long AS country, COUNT(*) AS plants, ROUND(SUM(capacity_mw)/1000,1) AS gw
  FROM plants
  GROUP BY country_long
  ORDER BY plants DESC
  LIMIT 20
`);

display(Plot.plot({
  title: "Top 20 countries by plant count",
  marginLeft: 130,
  width: 700,
  height: 400,
  x: { label: "Number of plants", grid: true },
  y: { label: null },
  marks: [
    Plot.barX(byCountry, { y: "country", x: "plants", fill: "#4fc3f7", sort: { y: "-x" }, tip: true }),
  ],
}));
```

## Filter and explore

```js
const fuelTypes = await db.query(`SELECT DISTINCT primary_fuel FROM plants WHERE primary_fuel IS NOT NULL ORDER BY primary_fuel`);
const fuelList = ["(all)", ...fuelTypes.toArray().map(r => r.primary_fuel)];

const fuel = view(Inputs.select(fuelList, { label: "Filter by fuel" }));
const minCap = view(Inputs.range([0, 5000], { label: "Min capacity (MW)", step: 100, value: 0 }));
```

```js
const filtered = await db.query(`
  SELECT name, country_long AS country, primary_fuel AS fuel,
         ROUND(capacity_mw, 0) AS capacity_mw,
         latitude, longitude, commissioning_year
  FROM plants
  WHERE capacity_mw >= ${minCap}
    ${fuel !== "(all)" ? `AND primary_fuel = '${fuel}'` : ""}
  ORDER BY capacity_mw DESC
  LIMIT 500
`);

display(Inputs.table(filtered));
```

## Scatter: capacity vs commissioning year

```js
const scatter = await db.query(`
  SELECT primary_fuel AS fuel, capacity_mw,
         commissioning_year AS year, country_long AS country
  FROM plants
  WHERE commissioning_year BETWEEN 1950 AND 2024
    AND capacity_mw > 0
    AND capacity_mw < 30000
`);

display(Plot.plot({
  title: "Plant capacity over time",
  subtitle: "Dot = one plant. Filtered to <30 GW for readability.",
  width: 900,
  height: 440,
  x: { label: "Commissioning year" },
  y: { label: "Capacity (MW)", type: "log" },
  color: { legend: true, label: "Fuel" },
  opacity: 0.4,
  marks: [
    Plot.dot(scatter, { x: "year", y: "capacity_mw", fill: "fuel", r: 2, tip: true }),
  ],
}));
```
