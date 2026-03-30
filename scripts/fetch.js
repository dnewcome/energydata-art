#!/usr/bin/env node
/**
 * Data fetch script for energydata-art
 * Run: node scripts/fetch.js
 * Set EIA_API_KEY env var to enable EIA sources
 *
 * Writes raw files to data/raw/, timestamped in metadata.json
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const RAW_DIR = join(ROOT, 'data', 'raw');
const META_FILE = join(ROOT, 'data', 'cache-meta.json');

mkdirSync(RAW_DIR, { recursive: true });

const EIA_KEY = process.env.EIA_API_KEY || null;
const EMBER_KEY = process.env.EMBER_API_KEY || null;

// ── Sources ────────────────────────────────────────────────────────────────

const SOURCES = [
  // ── No auth required ────────────────────────────────────────────────────
  {
    id: 'owid_co2',
    label: 'OWID – CO2 & greenhouse gas emissions',
    url: 'https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.csv',
    filename: 'owid_co2.csv',
    note: 'Annual CO2, methane, N2O, cumulative emissions, per-capita, by country',
  },
  {
    id: 'owid_energy',
    label: 'OWID – Global energy mix',
    url: 'https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv',
    filename: 'owid_energy.csv',
    note: 'Annual energy production, consumption, mix by source, by country',
  },
  {
    id: 'noaa_co2_weekly',
    label: 'NOAA GML – Mauna Loa CO2 weekly (Keeling Curve)',
    url: 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_weekly_mlo.txt',
    filename: 'noaa_co2_weekly_mlo.txt',
    note: 'Weekly mean CO2 ppm at Mauna Loa. Lines starting with # are comments.',
  },
  {
    id: 'noaa_co2_daily',
    label: 'NOAA GML – Mauna Loa CO2 daily',
    url: 'https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_daily_mlo.txt',
    filename: 'noaa_co2_daily_mlo.txt',
    note: 'Daily mean CO2 ppm at Mauna Loa.',
  },
  {
    id: 'nasa_power_global',
    label: 'NASA POWER – Solar & wind resource (global sample point)',
    // Global average point near geographic centroid of land masses; change lat/lon as needed
    url: 'https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN,WS10M&community=RE&longitude=0&latitude=20&format=JSON&start=2000&end=2024',
    filename: 'nasa_power_global_sample.json',
    note: 'Monthly solar irradiance + 10m wind speed at lat=20,lon=0. Change lat/lon for specific locations.',
  },
  {
    id: 'global_power_plant_db',
    label: 'WRI – Global Power Plant Database',
    url: 'https://raw.githubusercontent.com/wri/global-power-plant-database/master/output_database/global_power_plant_database.csv',
    filename: 'global_power_plant_database.csv',
    note: '~35,000 power plants worldwide with capacity, fuel type, lat/lon. Great for maps.',
  },

  // ── EIA (requires free API key: https://www.eia.gov/opendata/) ───────────
  ...(EIA_KEY ? [
    {
      id: 'eia_us_grid_hourly_demand',
      label: 'EIA – U.S. hourly electricity demand (last 7 days)',
      url: `https://api.eia.gov/v2/electricity/rto/region-data/data/?api_key=${EIA_KEY}&frequency=hourly&data[0]=value&facets[type][]=D&start=${sevenDaysAgo()}&sort[0][column]=period&sort[0][direction]=desc&length=2016&offset=0`,
      filename: 'eia_hourly_demand_7d.json',
      note: 'Hourly U.S. grid demand by balancing authority (D = demand). Last 7 days.',
    },
    {
      id: 'eia_us_grid_hourly_generation',
      label: 'EIA – U.S. hourly electricity generation by fuel (last 7 days)',
      url: `https://api.eia.gov/v2/electricity/rto/fuel-type-data/data/?api_key=${EIA_KEY}&frequency=hourly&data[0]=value&start=${sevenDaysAgo()}&sort[0][column]=period&sort[0][direction]=desc&length=5000&offset=0`,
      filename: 'eia_hourly_generation_7d.json',
      note: 'Hourly U.S. generation by fuel type (coal, gas, nuclear, wind, solar, etc.).',
    },
    {
      id: 'eia_renewable_capacity',
      label: 'EIA – U.S. renewable capacity annual',
      url: `https://api.eia.gov/v2/electricity/capacity/data/?api_key=${EIA_KEY}&frequency=annual&data[0]=capacity&facets[fuelTypeCode][]=SUN&facets[fuelTypeCode][]=WND&facets[fuelTypeCode][]=HYC&facets[fuelTypeCode][]=GEO&sort[0][column]=period&sort[0][direction]=desc&length=500`,
      filename: 'eia_renewable_capacity.json',
      note: 'Annual installed capacity for solar, wind, hydro, geothermal in MW.',
    },
    {
      id: 'eia_co2_by_state',
      label: 'EIA – U.S. CO2 emissions by state and fuel',
      url: `https://api.eia.gov/v2/co2-emissions/co2-emissions-aggregates/data/?api_key=${EIA_KEY}&frequency=annual&data[0]=value&sort[0][column]=period&sort[0][direction]=desc&length=500`,
      filename: 'eia_co2_by_state.json',
      note: 'Annual CO2 emissions by state, sector, and fuel type.',
    },
  ] : []),

  // ── EMBER (requires free API key: https://ember-climate.org/data/api/) ──
  ...(EMBER_KEY ? [
    {
      id: 'ember_global_monthly',
      label: 'EMBER – Global monthly electricity generation',
      url: `https://api.ember-climate.org/v1/electricity-generation/monthly?api_key=${EMBER_KEY}&is_aggregate_series=true&series=Total+Generation&limit=120`,
      filename: 'ember_global_monthly.json',
      note: 'Global monthly electricity generation by source. Last 10 years.',
    },
  ] : []),
];

// ── Helpers ────────────────────────────────────────────────────────────────

function sevenDaysAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
}

function loadMeta() {
  if (existsSync(META_FILE)) {
    return JSON.parse(readFileSync(META_FILE, 'utf8'));
  }
  return {};
}

function saveMeta(meta) {
  writeFileSync(META_FILE, JSON.stringify(meta, null, 2));
}

// ── Main ───────────────────────────────────────────────────────────────────

async function fetchSource(source) {
  const dest = join(RAW_DIR, source.filename);
  try {
    const res = await fetch(source.url, {
      headers: { 'User-Agent': 'energydata-art/1.0 (art visualization project)' },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const body = await res.text();
    writeFileSync(dest, body);
    const kb = Math.round(body.length / 1024);
    console.log(`  ✓  ${source.label} → ${source.filename} (${kb} KB)`);
    return { ok: true, bytes: body.length };
  } catch (err) {
    console.error(`  ✗  ${source.label}: ${err.message}`);
    return { ok: false, error: err.message };
  }
}

async function main() {
  const startTime = Date.now();
  const meta = loadMeta();
  const timestamp = new Date().toISOString();

  console.log(`\nenergydata-art fetch — ${timestamp}`);
  console.log(`Sources: ${SOURCES.length} total`);
  if (!EIA_KEY) console.log('  (EIA sources skipped — set EIA_API_KEY to enable)');
  if (!EMBER_KEY) console.log('  (EMBER sources skipped — set EMBER_API_KEY to enable)');
  console.log('');

  for (const source of SOURCES) {
    const result = await fetchSource(source);
    meta[source.id] = {
      label: source.label,
      filename: source.filename,
      note: source.note,
      lastFetch: timestamp,
      ok: result.ok,
      ...(result.ok ? { bytes: result.bytes } : { error: result.error }),
    };
    // small delay to be polite to servers
    await new Promise(r => setTimeout(r, 300));
  }

  saveMeta(meta);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s. Metadata written to data/cache-meta.json\n`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
