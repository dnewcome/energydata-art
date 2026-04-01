// Data loader: fetch NOAA Mauna Loa daily CO2 → clean CSV
const res = await fetch("https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_daily_mlo.txt");
if (!res.ok) throw new Error(`NOAA fetch failed: ${res.status}`);
const raw = await res.text();
const rows = [];

for (const line of raw.split("\n")) {
  if (line.startsWith("#") || line.trim() === "") continue;
  const parts = line.trim().split(/\s+/);
  if (parts.length < 5) continue;
  const [year, month, day, , ppm] = parts;
  if (isNaN(parseFloat(ppm)) || parseFloat(ppm) < 0) continue;
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  rows.push(`${dateStr},${ppm}`);
}

process.stdout.write("date,ppm\n" + rows.join("\n") + "\n");
