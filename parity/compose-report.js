// Composes baseline (left) / upgraded (right) screenshots with a pixel-diff %, and writes report/README.md.
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const root = path.join(__dirname, 'report');
const shots = (p) => {
  const d = path.join(root, 'screens', p);
  return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.png')).sort() : [];
};
const read = (p, f) => PNG.sync.read(fs.readFileSync(path.join(root, 'screens', p, f)));

function pad(img, w, h) {
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
  return out;
}

const outDir = path.join(root, 'side-by-side');
fs.mkdirSync(outDir, { recursive: true });
const rows = [];
for (const f of shots('baseline')) {
  if (!fs.existsSync(path.join(root, 'screens', 'upgraded', f))) {
    rows.push({ name: f, diff: 'missing upgraded' });
    continue;
  }
  const a = read('baseline', f);
  const b = read('upgraded', f);
  const w = Math.max(a.width, b.width);
  const h = Math.max(a.height, b.height);
  const pa = pad(a, w, h);
  const pb = pad(b, w, h);
  const diff = new PNG({ width: w, height: h });
  const changed = pixelmatch(pa.data, pb.data, diff.data, w, h, { threshold: 0.1 });
  const gap = 16;
  const sbs = new PNG({ width: w * 2 + gap, height: h });
  sbs.data.fill(255);
  PNG.bitblt(pa, sbs, 0, 0, w, h, 0, 0);
  PNG.bitblt(pb, sbs, 0, 0, w, h, w + gap, 0);
  fs.writeFileSync(path.join(outDir, f), PNG.sync.write(sbs));
  rows.push({ name: f, diff: `${((changed / (w * h)) * 100).toFixed(2)}%`, size: `${a.width}x${a.height} / ${b.width}x${b.height}` });
}

const results = {};
const resultsFile = path.join(root, 'results.json');
if (fs.existsSync(resultsFile)) {
  const walk = (suite, prefix) => {
    for (const s of suite.suites || []) walk(s, [...prefix, s.title]);
    for (const spec of suite.specs || []) {
      for (const t of spec.tests) {
        const title = [...prefix, spec.title].filter(Boolean).join(' › ');
        const last = t.results[t.results.length - 1];
        results[title] = results[title] || {};
        results[title][t.projectName] = last ? last.status : 'not run';
      }
    }
  };
  walk(JSON.parse(fs.readFileSync(resultsFile, 'utf8')), []);
}
const count = (p) => Object.values(results).reduce((n, r) => {
  if (r[p] === 'passed') n.pass++; else if (r[p]) n.fail++;
  return n;
}, { pass: 0, fail: 0 });

const lines = [
  '# Angular parity report',
  '',
  'Same Playwright specs run against `baseline` (Angular 13, http://localhost:4000) and `upgraded` (http://localhost:4200).',
  'Both apps share one local Django backend, so specs create fresh timestamped data and Playwright `retries: 1` is set.',
  'Volatile regions (map canvas, live clock time, event timeline/counts that grow between runs) are masked in screenshots.',
  '',
  '## Flow results',
  '',
  '| Page / flow | baseline | upgraded |',
  '| --- | --- | --- |',
  ...Object.entries(results).map(([k, v]) => `| ${k.replace(/\.spec\.js › /, ' › ')} | ${v.baseline || '-'} | ${v.upgraded || '-'} |`),
  '',
  `Totals: baseline ${count('baseline').pass} passed / ${count('baseline').fail} failed; upgraded ${count('upgraded').pass} passed / ${count('upgraded').fail} failed.`,
  '',
  '## Screenshots (baseline left, upgraded right)',
  '',
  '| Page | Pixel diff | Size (baseline / upgraded) |',
  '| --- | --- | --- |',
  ...rows.map((r) => `| [${r.name}](side-by-side/${r.name}) | ${r.diff} | ${r.size || '-'} |`),
  '',
  ...rows.filter((r) => r.size).map((r) => `### ${r.name}\n\n![${r.name}](side-by-side/${r.name})\n`),
];
fs.writeFileSync(path.join(root, 'README.md'), lines.join('\n'));
console.log(lines.slice(0, 40).join('\n'));
