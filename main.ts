// "The World" — 23 November 2026, six stories in one image.
//
// The entry is the PNG beside this file. This program's only job is to hand
// it to the grader: copy entry.png into the output directory as entry.png.
// It renders nothing at run time (the grader has no browser and no network),
// it touches no directory it did not create, and it writes exactly the
// bytes that are already in the repository, so two runs are identical.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The grader supplies /output; creating it when missing is harmless, and we
// never change its permissions — only the file we just wrote gets chmodded.
mkdirSync(outDir, { recursive: true });

const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// World-readable, like every other output file the grader reads. Guarded:
// a read-only target filesystem must not turn a good copy into a failure.
try {
  chmodSync(target, 0o644);
} catch {
  // The copy itself is what the gate reads; permissions are best effort.
}

process.stderr.write(`news-image-20261123: wrote ${target}\n`);
