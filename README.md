# energydata-art

An art visualization project exploring open data around clean energy, climate change, and the future of the planet. Built with [Observable Framework](https://observablehq.com/framework/), d3, and DuckDB.

## Data sources

Covers: atmospheric CO₂ (NOAA Mauna Loa), global energy mix (Our World in Data), power plant locations (WRI), EIA grid data, NASA POWER solar/wind resources, and more. See [DATA_SOURCES.md](DATA_SOURCES.md) for the full list.

## Setup

```bash
npm install

# Fetch raw data (writes to data/raw/)
npm run fetch

# Start local dev server at http://localhost:3000
npm run dev

# Build static site to dist/
npm run build
```

## Environment variables

| Variable | Source | Required for |
|---|---|---|
| `EIA_API_KEY` | [eia.gov/opendata](https://www.eia.gov/opendata/) | EIA hourly grid data |
| `EMBER_API_KEY` | [ember-climate.org](https://ember-climate.org/data/api/) | EMBER global electricity |

Set these before running `npm run fetch` to enable additional sources.

## Project structure

```
scripts/fetch.js          — data fetch script
src/                      — Observable Framework notebooks
  index.md                — data corpus status
  keeling-curve.md        — Mauna Loa CO₂ rise
  energy-mix.md           — global electricity by source
  power-plants.md         — 35k power plants mapped
  data/                   — data loaders (pipe from data/raw/)
data/raw/                 — fetched data files (gitignored)
DATA_SOURCES.md           — full annotated list of data sources
```
