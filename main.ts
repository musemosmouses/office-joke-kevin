// The Funniest Office Joke (Judged Head-to-Head) — one-line entry.
//
// The joke: "per my last email" escapes the office. The setup is the
// most recognised passive-aggressive office phrase; the turn lands it
// on mum, who reads it as a threat. Punchline last, one line, tight.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I put 'per my last email' in my email signature, so now even my mum thinks I'm threatening her.";

// The gate wants 1-200 chars of UTF-8 text, a single line, not only
// whitespace — fail loudly here instead of shipping a bad entry.
function checkEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || text.trim().length === 0) {
    throw new Error(`entry must be 1-200 chars, got ${chars}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

// The grader runs this program on a read-only filesystem and hands it
// a writable output directory through MAKEFUN_OUTPUT_DIR, so every
// write goes through that directory and nowhere else: writing to the
// current directory fails there with EROFS and the entry is rejected.
function entryPath(): string {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "";
  if (outDir.length === 0) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  mkdirSync(outDir, { recursive: true });
  return join(outDir, "entry.txt");
}

function main(): void {
  checkEntry(ENTRY);
  writeFileSync(entryPath(), ENTRY, "utf8");
}

main();
