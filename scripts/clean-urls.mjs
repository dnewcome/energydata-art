// Post-build: convert dist/foo.html → dist/foo/index.html
// Makes clean URLs work on any static host without server config.
import { readdirSync, mkdirSync, renameSync } from "fs";
import { join } from "path";

const dist = new URL("../dist", import.meta.url).pathname;

for (const file of readdirSync(dist)) {
  if (!file.endsWith(".html") || file === "index.html" || file === "404.html") continue;
  const base = file.slice(0, -5); // strip .html
  const dir  = join(dist, base);
  mkdirSync(dir, { recursive: true });
  renameSync(join(dist, file), join(dir, "index.html"));
  console.log(`  ${file} → ${base}/index.html`);
}
