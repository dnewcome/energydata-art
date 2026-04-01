---
title: Scratch
---

# Scratch

Freeform workbook. Break things here.

```js
const db = await DuckDBClient.of({
  co2:    FileAttachment("data/noaa_co2_daily.csv"),
  energy: FileAttachment("data/owid_energy.csv"),
  owid_co2: FileAttachment("data/owid_co2.csv"),
  plants: FileAttachment("data/global_power_plants.csv"),
});
```

---

```js
// Try anything — example: recent CO2 readings
db.query(`SELECT * FROM co2 ORDER BY date DESC LIMIT 20`)
```

```js
// Example: top 10 countries by solar electricity in 2023
db.query(`
  SELECT country, ROUND(solar_electricity, 1) AS solar_twh
  FROM energy
  WHERE year = 2023 AND solar_electricity > 0
  ORDER BY solar_electricity DESC
  LIMIT 10
`)
```

```js
// Example: available columns in energy table
db.query(`DESCRIBE energy`)
```
