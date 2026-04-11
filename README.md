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

## Notebooks

The `notebooks/` directory is a separate Python environment for data exploration using [marimo](https://marimo.io/) — a reactive notebook tool where cells re-run automatically when their inputs change (no hidden kernel state, no out-of-order execution surprises). Notebooks are plain `.py` files, so diffs are clean in git.

### Setup

```bash
cd notebooks

# Install dependencies (requires uv)
uv sync

# Launch notebook editor
.venv/bin/marimo edit energy_exploration.py
```

### Publishing (WASM)

Notebooks export to self-contained static HTML that runs Python in the browser via Pyodide — no server required. The exported bundle lives in `src/notebooks/energy/` and deploys alongside the Observable site.

```bash
cd notebooks
bash export-wasm.sh
```

The export script:
1. Renders the notebook as WASM HTML into `src/notebooks/energy/`
2. Copies the raw CSVs into `src/notebooks/energy/data/` so the browser can fetch them
3. Strips the marimo branding from the output

In WASM mode, the notebook detects `sys.platform == "emscripten"` and fetches CSVs over HTTP instead of reading from disk.

### Why marimo over Jupyter

Jupyter requires a running Python server to be interactive. Static publishing options (nbconvert, JupyterLite) exist but are more complex to configure. Marimo's WASM export is a first-class feature and the reactive execution model maps naturally to the kind of exploratory filtering this project does.

## Project structure

```
scripts/fetch.js          — data fetch script
src/                      — Observable Framework pages
  index.md                — data corpus status
  keeling-curve.md        — Mauna Loa CO₂ rise
  energy-mix.md           — global electricity by source
  power-plants.md         — 35k power plants mapped
  notebooks/energy/       — marimo WASM export (generated)
  data/                   — data loaders (pipe from data/raw/)
notebooks/                — marimo Python notebooks
  energy_exploration.py   — main exploration notebook
  export-wasm.sh          — build script for WASM export
data/raw/                 — fetched data files (gitignored)
DATA_SOURCES.md           — full annotated list of data sources
```
