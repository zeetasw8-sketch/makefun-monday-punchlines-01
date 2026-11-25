import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const destDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const raw = readFileSync(join(scriptDir, "line.txt"), "utf8");
const joke = raw.trim();
const terminators = joke.match(/[.!?]/g) ?? [];
if (joke.length < 1 || joke.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${joke.length}`);
}
if (terminators.length !== 1) {
  throw new Error("entry must be exactly one sentence");
}
mkdirSync(destDir, { recursive: true });
writeFileSync(join(destDir, "entry.txt"), joke);
console.log(joke);
