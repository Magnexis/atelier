import { mkdir } from "node:fs/promises";
import { build } from "esbuild";

await mkdir("netlify/functions-dist", { recursive: true });

await build({
  bundle: true,
  entryPoints: ["netlify/functions/mcp.ts"],
  format: "esm",
  outfile: "netlify/functions-dist/mcp.mjs",
  platform: "node",
  sourcemap: false,
  target: "node20",
});
