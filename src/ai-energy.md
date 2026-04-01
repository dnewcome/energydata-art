---
title: AI Energy & Datacenters
---

# AI Energy & Datacenters

Committed capacity, power sources, hardware efficiency, and model-level energy estimates for major AI operators. Data: [kinnarigroup/energydata](https://github.com/kinnarigroup/energydata).

```js
import * as Plot from "npm:@observablehq/plot";

const operators   = await FileAttachment("data/ai_datacenter_operators.csv").csv({typed: true});
const powerSrc    = await FileAttachment("data/ai_datacenter_power_sources.csv").csv({typed: true});
const hardware    = await FileAttachment("data/ai_hardware_efficiency.csv").csv({typed: true});
const models      = await FileAttachment("data/ai_model_energy.csv").csv({typed: true});
const timeline    = await FileAttachment("data/ai_datacenter_capacity_timeline.csv").csv({typed: true});
```

```js
// Summary stats
const totalCapGW   = (operators.reduce((s, r) => s + (r.committed_capacity_mw || 0), 0) / 1000).toFixed(0);
const totalCapexBn = operators.reduce((s, r) => s + (r.capex_2026_bn_usd || 0), 0).toFixed(0);
const topOp        = operators.slice().sort((a, b) => b.committed_capacity_mw - a.committed_capacity_mw)[0];
const latestYear   = timeline.at(-1);
```

<div class="grid grid-cols-4" style="margin-bottom:1.5rem">
  <div class="card">
    <h2>Committed capacity</h2>
    <span class="big">${totalCapGW} GW</span>
    <p style="color:#aaa">across tracked operators</p>
  </div>
  <div class="card">
    <h2>2026 capex (est.)</h2>
    <span class="big">$${totalCapexBn}B</span>
    <p style="color:#aaa">announced spend</p>
  </div>
  <div class="card">
    <h2>Largest operator</h2>
    <span class="big">${topOp.operator_name}</span>
    <p style="color:#aaa">${(topOp.committed_capacity_mw/1000).toFixed(0)} GW committed</p>
  </div>
  <div class="card">
    <h2>US AI DC power (${latestYear.year})</h2>
    <span class="big">${latestYear.us_ai_dc_power_gw_actual_estimate} GW</span>
    <p style="color:#aaa">${latestYear.us_ai_dc_twh_annual} TWh/yr</p>
  </div>
</div>

---

## Committed capacity by operator

```js
const opsSorted = operators.slice().sort((a, b) => b.committed_capacity_mw - a.committed_capacity_mw);

display(Plot.plot({
  title: "Committed AI datacenter capacity (MW)",
  width: 800,
  height: 300,
  marginLeft: 120,
  x: { label: "MW", grid: true },
  y: { label: null },
  color: { scheme: "tableau10" },
  marks: [
    Plot.barX(opsSorted, {
      x: "committed_capacity_mw",
      y: "operator_name",
      fill: "operator_name",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

```js
// Clean energy % alongside capex
display(Plot.plot({
  title: "2026 capex vs. clean energy commitment",
  subtitle: "Bubble size = committed capacity (MW)",
  width: 700,
  height: 380,
  x: { label: "Capex 2026 ($B)", grid: true },
  y: { label: "Clean energy % (est.)", grid: true, domain: [0, 100] },
  color: { scheme: "tableau10", legend: true },
  marks: [
    Plot.dot(operators, {
      x: "capex_2026_bn_usd",
      y: "clean_energy_pct_estimate",
      fill: "operator_name",
      r: d => Math.sqrt(d.committed_capacity_mw / 500),
      tip: true,
    }),
    Plot.text(operators, {
      x: "capex_2026_bn_usd",
      y: "clean_energy_pct_estimate",
      text: "operator_name",
      dy: -14,
      fontSize: 11,
      fill: "#ccc",
    }),
  ],
}));
```

---

## Power source mix

Where operators are sourcing power — by source type and status.

```js
// Aggregate MW by source_type and operator
const srcByType = d3.rollups(
  powerSrc,
  v => d3.sum(v, d => +d.committed_mw || 0),
  d => d.source_type
).map(([source_type, mw]) => ({ source_type, mw }))
  .sort((a, b) => b.mw - a.mw);

display(Plot.plot({
  title: "Committed power by source type (all operators, MW)",
  width: 800,
  height: 320,
  marginLeft: 160,
  x: { label: "MW", grid: true },
  y: { label: null },
  color: {
    domain: ["solar_wind_portfolio", "solar_btm", "nuclear", "storage_btm_gwh", "geothermal", "hydro", "gas"],
    range:  ["#fff176", "#ffe082", "#7b68ee", "#4fc3f7", "#a5d6a7", "#4dd0e1", "#aaa"],
  },
  marks: [
    Plot.barX(srcByType, {
      x: "mw",
      y: "source_type",
      fill: "source_type",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

```js
// Per-operator breakdown
const opNames = [...new Set(powerSrc.map(d => d.operator_id))];

display(Plot.plot({
  title: "Power sources per operator (MW)",
  width: 800,
  height: 360,
  marginLeft: 80,
  x: { label: "MW", grid: true },
  y: { label: null },
  color: { scheme: "tableau10", legend: true },
  facet: { data: powerSrc, y: "operator_id", marginRight: 80 },
  marks: [
    Plot.barX(powerSrc, {
      x: d => +d.committed_mw || 0,
      y: "source_type",
      fill: "source_type",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

---

## US AI datacenter capacity growth

```js
display(Plot.plot({
  title: "US AI datacenter power demand — actual / estimated (GW)",
  width: 900,
  height: 360,
  x: { label: null, tickFormat: "d" },
  y: { label: "GW", grid: true },
  marks: [
    Plot.areaY(timeline, {
      x: "year",
      y: "pipeline_capacity_gw",
      fill: "#7b68ee22",
      stroke: null,
      tip: false,
    }),
    Plot.line(timeline, {
      x: "year",
      y: "pipeline_capacity_gw",
      stroke: "#7b68ee",
      strokeDasharray: "4 2",
      strokeWidth: 1.5,
      tip: false,
    }),
    Plot.line(timeline, {
      x: "year",
      y: "us_ai_dc_power_gw_actual_estimate",
      stroke: "#fff176",
      strokeWidth: 2.5,
      tip: true,
    }),
    Plot.line(timeline, {
      x: "year",
      y: "us_total_dc_twh_annual",
      stroke: "#4fc3f7",
      strokeWidth: 1.5,
      strokeDasharray: "6 2",
      tip: true,
    }),
    Plot.ruleY([0]),
    Plot.text([
      { year: timeline.at(-2).year, y: timeline.at(-2).us_ai_dc_power_gw_actual_estimate, label: "AI DC (GW)" },
      { year: timeline.at(-2).year, y: timeline.at(-2).pipeline_capacity_gw, label: "Pipeline (GW)" },
      { year: timeline.at(-2).year, y: timeline.at(-2).us_total_dc_twh_annual, label: "All DC (TWh/yr)" },
    ], { x: "year", y: "y", text: "label", dx: 6, fontSize: 11, fill: "#aaa" }),
  ],
}));
```

---

## Hardware efficiency by generation

Tokens per kWh improving across GPU generations — a proxy for compute efficiency gains.

```js
// Filter to chips with known efficiency data
const chips = hardware.filter(d => d.joules_per_output_token_estimate > 0 && d.release_year);

display(Plot.plot({
  title: "GPU efficiency — joules per output token",
  subtitle: "Lower is better",
  width: 800,
  height: 380,
  x: { label: "Release year", tickFormat: "d", domain: [2021, 2027] },
  y: { label: "Joules / output token", grid: true },
  color: { scheme: "tableau10", legend: true },
  marks: [
    Plot.line(chips.sort((a,b) => a.release_year - b.release_year), {
      x: "release_year",
      y: "joules_per_output_token_estimate",
      stroke: "#555",
      strokeWidth: 1,
      strokeDasharray: "3 2",
    }),
    Plot.dot(chips, {
      x: "release_year",
      y: "joules_per_output_token_estimate",
      fill: "vendor",
      r: 7,
      tip: true,
    }),
    Plot.text(chips, {
      x: "release_year",
      y: "joules_per_output_token_estimate",
      text: "chip_name",
      dy: -14,
      fontSize: 10,
      fill: "#ccc",
    }),
  ],
}));
```

```js
// Tokens per kWh — throughput efficiency
display(Plot.plot({
  title: "Throughput efficiency — tokens per kWh",
  subtitle: "Higher is better",
  width: 800,
  height: 340,
  x: { label: "Chip", tickRotate: -20 },
  y: { label: "Million tokens / kWh", grid: true },
  color: { scheme: "tableau10" },
  marks: [
    Plot.barY(chips.sort((a,b) => a.release_year - b.release_year), {
      x: "chip_name",
      y: "tokens_per_kwh_millions",
      fill: "vendor",
      sort: { x: "y" },
      tip: true,
    }),
    Plot.ruleY([0]),
  ],
}));
```

---

## Model energy estimates

Energy cost per million output tokens across frontier models.

```js
// Only models with known energy data
const modelsWithData = models.filter(d => d.kwh_per_million_output_tokens > 0);

display(Plot.plot({
  title: "Energy per million output tokens (kWh)",
  subtitle: "Lower is better. Confidence varies — see notes.",
  width: 800,
  height: 360,
  marginLeft: 140,
  x: { label: "kWh / million output tokens", grid: true },
  y: { label: null },
  color: { scheme: "tableau10", legend: true },
  marks: [
    Plot.barX(modelsWithData, {
      x: "kwh_per_million_output_tokens",
      y: "model_name",
      fill: "provider",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

---

## Usage calculator

Estimate the energy footprint of a given token workload.

```js
const calcModel = view(Inputs.select(
  modelsWithData.map(d => d.model_name),
  { label: "Model", value: modelsWithData[0]?.model_name }
));
```

```js
const tokensPerMonthM = view(Inputs.range([1, 10000], {
  label: "Tokens / month (millions)",
  step: 10,
  value: 100,
}));
```

```js
const gridCo2 = view(Inputs.range([0, 800], {
  label: "Grid CO₂ intensity (g CO₂/kWh)",
  step: 10,
  value: 400,
}));
```

```js
const selectedModel = modelsWithData.find(d => d.model_name === calcModel);
const kwhPerMillion  = selectedModel?.kwh_per_million_output_tokens ?? 0;
const totalKwh       = (tokensPerMonthM * kwhPerMillion).toFixed(1);
const totalMWh       = (totalKwh / 1000).toFixed(2);
const co2Kg          = (totalKwh * gridCo2 / 1000).toFixed(1);
const co2Tonnes      = (co2Kg / 1000).toFixed(2);
```

<div class="grid grid-cols-3" style="margin-top:1rem;margin-bottom:1.5rem">
  <div class="card">
    <h2>Energy used</h2>
    <span class="big">${totalKwh} kWh</span>
    <p style="color:#aaa">${totalMWh} MWh / month</p>
  </div>
  <div class="card">
    <h2>CO₂ emitted</h2>
    <span class="big">${co2Kg} kg</span>
    <p style="color:#aaa">${co2Tonnes} tonnes CO₂e / month</p>
  </div>
  <div class="card">
    <h2>Rate</h2>
    <span class="big">${kwhPerMillion} kWh</span>
    <p style="color:#aaa">per million output tokens (${selectedModel?.confidence ?? "?"} confidence)</p>
  </div>
</div>

```js
// Comparison: same workload across all models
const comparison = modelsWithData.map(d => ({
  model_name: d.model_name,
  provider: d.provider,
  kwh: +(tokensPerMonthM * d.kwh_per_million_output_tokens).toFixed(1),
  confidence: d.confidence,
})).sort((a, b) => a.kwh - b.kwh);

display(Plot.plot({
  title: `Energy cost for ${tokensPerMonthM}M tokens/month across models`,
  width: 800,
  height: 320,
  marginLeft: 150,
  x: { label: "kWh / month", grid: true },
  y: { label: null },
  color: { scheme: "tableau10" },
  marks: [
    Plot.barX(comparison, {
      x: "kwh",
      y: "model_name",
      fill: "provider",
      sort: { y: "x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

---

## Data tables

```js
const tableView = view(Inputs.select(
  ["Operators", "Power sources", "Hardware", "Models", "Capacity timeline"],
  { label: "Show table" }
));
```

```js
const tableData = {
  "Operators": operators,
  "Power sources": powerSrc,
  "Hardware": hardware,
  "Models": models,
  "Capacity timeline": timeline,
}[tableView];

display(Inputs.table(tableData));
```
