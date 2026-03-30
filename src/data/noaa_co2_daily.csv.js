// Data loader: parse NOAA Mauna Loa daily CO2 text file → clean CSV
// Strips comment lines and outputs: date,ppm
import { readFileSync } from "fs";

const raw = readFileSync("data/raw/noaa_co2_daily_mlo.txt", "utf8");
const rows = [];

for (const line of raw.split("\n")) {
  if (line.startsWith("#") || line.trim() === "") continue;
  const parts = line.trim().split(/\s+/);
  // columns: year month day decimal_date ppm
  if (parts.length < 5) continue;
  const [year, month, day, , ppm] = parts;
  if (isNaN(parseFloat(ppm)) || parseFloat(ppm) < 0) continue;
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  rows.push(`${dateStr},${ppm}`);
}

process.stdout.write("date,ppm\n" + rows.join("\n") + "\n");
