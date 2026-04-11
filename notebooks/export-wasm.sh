#!/usr/bin/env bash
# Export marimo notebook as a WASM static bundle into the Observable Framework src tree.
set -euo pipefail

OUT="../src/notebooks/energy"

echo "Exporting WASM bundle to $OUT..."
.venv/bin/marimo export html-wasm energy_exploration.py \
  --mode run \
  --show-code \
  -o "$OUT"

echo "Removing marimo branding..."
# The "made with marimo" badge is a <a rel="noreferrer"> link rendered by React.
# Inject CSS to hide it without modifying minified JS.
python3 - "$OUT/index.html" <<'PYEOF'
import sys, re
path = sys.argv[1]
html = open(path).read()
style = '<style>a[rel="noreferrer"]{display:none!important}</style>'
html = html.replace('</head>', style + '</head>', 1)
open(path, 'w').write(html)
PYEOF

echo "Copying data files..."
mkdir -p "$OUT/data"
cp ../data/raw/owid_energy.csv "$OUT/data/"
cp ../data/raw/owid_co2.csv "$OUT/data/"
cp ../data/raw/global_power_plant_database.csv "$OUT/data/"

echo "Done. Serve with: python -m http.server --directory $OUT"
