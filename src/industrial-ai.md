---
title: Industrial AI & Reshoring
---

# Industrial AI & Reshoring

AI is moving onto the factory floor. This page tracks the energy footprint of industrial automation, U.S. reshoring mega-projects, edge hardware deployed in facilities, and major capital funds targeting the AI + manufacturing intersection. Data: [kinnarigroup/energydata](https://github.com/kinnarigroup/energydata).

```js
import * as Plot from "npm:@observablehq/plot";

const loads    = await FileAttachment("data/industrial_ai_loads.csv").csv({typed: true});
const pipeline = await FileAttachment("data/reshoring_energy_pipeline.csv").csv({typed: true});
const hardware = await FileAttachment("data/industrial_ai_hardware.csv").csv({typed: true});
const capital  = await FileAttachment("data/industrial_ai_capital.csv").csv({typed: true});
```

```js
// Reshoring pipeline: filter out rows missing MW data
const pipelineCharted = pipeline.filter(d => d.total_committed_mw_estimate > 0);

const totalReshoringMW = pipelineCharted.reduce((s, d) => s + d.total_committed_mw_estimate, 0);
const totalAiLoadMW    = pipelineCharted.reduce((s, d) => s + d.ai_load_mw_estimate, 0);
const totalInvestBn    = pipelineCharted.reduce((s, d) => s + (d.total_investment_bn_usd || 0), 0);
const totalFacilities  = pipelineCharted.reduce((s, d) => s + (d.count_announced_us || 0), 0);
```

<div class="grid grid-cols-4" style="margin-bottom:1.5rem">
  <div class="card">
    <h2>Total facility load</h2>
    <span class="big">${(totalReshoringMW / 1000).toFixed(1)} GW</span>
    <p style="color:#aaa">committed across reshoring projects</p>
  </div>
  <div class="card">
    <h2>AI incremental load</h2>
    <span class="big">${(totalAiLoadMW / 1000).toFixed(1)} GW</span>
    <p style="color:#aaa">${((totalAiLoadMW / totalReshoringMW) * 100).toFixed(0)}% of total facility power</p>
  </div>
  <div class="card">
    <h2>Total investment</h2>
    <span class="big">$${totalInvestBn}B</span>
    <p style="color:#aaa">announced U.S. reshoring capex</p>
  </div>
  <div class="card">
    <h2>Facilities</h2>
    <span class="big">${totalFacilities}</span>
    <p style="color:#aaa">announced across tracked categories</p>
  </div>
</div>

---

## Reshoring energy pipeline by project type

U.S. manufacturing reshoring is creating a new wave of industrial power demand. Total committed MW vs. AI-incremental load per project category.

```js
// Reshape for stacked bar: non-AI baseline + AI increment
const pipelineStacked = pipelineCharted.flatMap(d => [
  { project_type: d.project_type, segment: "Non-AI load", mw: d.total_committed_mw_estimate - d.ai_load_mw_estimate },
  { project_type: d.project_type, segment: "AI incremental load", mw: d.ai_load_mw_estimate },
]);

display(Plot.plot({
  title: "Committed facility power by project type (MW)",
  subtitle: "AI incremental load shown in yellow",
  width: 800,
  height: 360,
  marginLeft: 200,
  x: { label: "MW", grid: true },
  y: { label: null },
  color: {
    domain: ["Non-AI load", "AI incremental load"],
    range: ["#4a4a6a", "#fff176"],
    legend: true,
  },
  marks: [
    Plot.barX(pipelineStacked, {
      x: "mw",
      y: "project_type",
      fill: "segment",
      sort: { y: "-x", reduce: "sum" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

```js
// Investment vs total MW scatter
display(Plot.plot({
  title: "Investment vs. committed power",
  subtitle: "Bubble size = AI load estimate (MW)",
  width: 700,
  height: 360,
  x: { label: "Total investment ($B)", grid: true },
  y: { label: "Total committed MW", grid: true },
  color: { scheme: "tableau10", legend: true },
  marks: [
    Plot.dot(pipelineCharted, {
      x: "total_investment_bn_usd",
      y: "total_committed_mw_estimate",
      fill: "project_type",
      r: d => Math.sqrt(d.ai_load_mw_estimate / 10),
      tip: true,
    }),
    Plot.text(pipelineCharted, {
      x: "total_investment_bn_usd",
      y: "total_committed_mw_estimate",
      text: "project_type",
      dy: -14,
      fontSize: 10,
      fill: "#ccc",
    }),
  ],
}));
```

---

## AI load by facility type

How much does AI add to industrial facility power draw? Baseline energy use vs. AI-incremental load across facility types.

```js
display(Plot.plot({
  title: "Facility baseline vs. AI incremental load (MW per facility)",
  subtitle: "AI load % annotated on right",
  width: 800,
  height: 380,
  marginLeft: 200,
  x: { label: "MW per facility", grid: true },
  y: { label: null },
  color: {
    domain: ["Baseline (non-AI)", "AI incremental"],
    range: ["#37474f", "#fff176"],
    legend: true,
  },
  marks: [
    Plot.barX(
      loads.flatMap(d => [
        { facility_type: d.facility_type, segment: "Baseline (non-AI)", mw: d.typical_facility_mw_baseline - d.ai_incremental_load_mw_estimate },
        { facility_type: d.facility_type, segment: "AI incremental", mw: d.ai_incremental_load_mw_estimate },
      ]),
      {
        x: "mw",
        y: "facility_type",
        fill: "segment",
        sort: { y: "-x", reduce: "sum" },
        tip: true,
      }
    ),
    Plot.text(loads, {
      x: d => d.typical_facility_mw_baseline + 1,
      y: "facility_type",
      text: d => `${d.ai_load_pct_of_baseline}%`,
      textAnchor: "start",
      fontSize: 10,
      fill: "#fff176",
    }),
    Plot.ruleX([0]),
  ],
}));
```

```js
// AI load % by facility type — standalone bar
display(Plot.plot({
  title: "AI load as % of baseline power (per facility)",
  subtitle: "Warehouse/logistics leads at 40%; steel mills at 7%",
  width: 800,
  height: 320,
  marginLeft: 200,
  x: { label: "% of baseline", grid: true, domain: [0, 50] },
  y: { label: null },
  color: { scheme: "YlOrRd" },
  marks: [
    Plot.barX(loads, {
      x: "ai_load_pct_of_baseline",
      y: "facility_type",
      fill: "ai_load_pct_of_baseline",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

---

## Edge AI hardware at the factory floor

Chips deployed in industrial settings — TDP range and AI performance.

```js
// Filter chips with TDP data; use max TDP as primary axis
const hwCharted = hardware.filter(d => d.tdp_w_max > 0);

display(Plot.plot({
  title: "Edge AI chip TDP range (W) — industrial deployments",
  subtitle: "Line = min→max configurable TDP",
  width: 800,
  height: 340,
  marginLeft: 180,
  x: { label: "Watts (TDP)", grid: true },
  y: { label: null },
  color: { scheme: "tableau10", legend: true },
  marks: [
    // min→max range line
    Plot.link(hwCharted.filter(d => d.tdp_w_min > 0), {
      x1: "tdp_w_min",
      x2: "tdp_w_max",
      y1: "chip_name",
      y2: "chip_name",
      stroke: "#555",
      strokeWidth: 2,
    }),
    // max TDP dot
    Plot.dot(hwCharted, {
      x: "tdp_w_max",
      y: "chip_name",
      fill: "vendor",
      r: 6,
      tip: true,
      sort: { y: "-x" },
    }),
    // min TDP dot where available
    Plot.dot(hwCharted.filter(d => d.tdp_w_min > 0), {
      x: "tdp_w_min",
      y: "chip_name",
      stroke: "vendor",
      fill: "white",
      r: 4,
    }),
  ],
}));
```

```js
// TOPS vs TDP scatter — efficiency frontier
const hwTops = hwCharted.filter(d => d.ai_performance_tops > 0 && d.tdp_w_max > 0);

display(Plot.plot({
  title: "AI performance vs. max TDP",
  subtitle: "Upper-left = most efficient",
  width: 700,
  height: 380,
  x: { label: "Max TDP (W)", grid: true },
  y: { label: "AI performance (TOPS)", grid: true },
  color: { scheme: "tableau10", legend: true },
  marks: [
    Plot.dot(hwTops, {
      x: "tdp_w_max",
      y: "ai_performance_tops",
      fill: "vendor",
      r: 7,
      tip: true,
    }),
    Plot.text(hwTops, {
      x: "tdp_w_max",
      y: "ai_performance_tops",
      text: "chip_name",
      dy: -14,
      fontSize: 10,
      fill: "#ccc",
    }),
  ],
}));
```

---

## Capital flows: AI × manufacturing funds

Major capital vehicles targeting AI-driven industrial transformation.

```js
// Only funds with known size
const capitalKnown = capital.filter(d => d.fund_size_bn_usd > 0);

display(Plot.plot({
  title: "Fund size ($B) — AI + industrial capital",
  width: 700,
  height: 240,
  marginLeft: 180,
  x: { label: "$B committed", grid: true },
  y: { label: null },
  color: { scheme: "tableau10" },
  marks: [
    Plot.barX(capitalKnown, {
      x: "fund_size_bn_usd",
      y: "fund_name",
      fill: "sponsor",
      sort: { y: "-x" },
      tip: true,
    }),
    Plot.ruleX([0]),
  ],
}));
```

```js
display(Inputs.table(capital, {
  columns: ["fund_name", "sponsor", "fund_size_bn_usd", "strategy", "status", "confidence"],
  header: {
    fund_name: "Fund",
    sponsor: "Sponsor",
    fund_size_bn_usd: "$B",
    strategy: "Strategy",
    status: "Status",
    confidence: "Conf.",
  },
}));
```

---

## Data tables

```js
const tableView = view(Inputs.select(
  ["Reshoring pipeline", "Facility loads", "Edge hardware", "Capital funds"],
  { label: "Show table" }
));
```

```js
const tableData = {
  "Reshoring pipeline": pipeline,
  "Facility loads": loads,
  "Edge hardware": hardware,
  "Capital funds": capital,
}[tableView];

display(Inputs.table(tableData));
```
