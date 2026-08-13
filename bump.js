#!/usr/bin/env node
/* bump.js — 把 HTML 裡的 ?v=N 快取戳記加一。
 *
 * 為什麼需要：這是純靜態網站，沒有建置流程也就沒有檔名 hash。
 * 改了 js/css 卻忘記改版本號的話，使用者的瀏覽器會繼續用舊快取，
 * 你會以為改了沒生效。這件事在開發過程中已經絆倒過好幾次。
 *
 * 用法：
 *   node bump.js          只改有異動的檔案所屬的 HTML
 *   node bump.js --all    全部 HTML 都加一
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;

/* 哪個 HTML 管哪些資源目錄 */
const PAGES = [
  { html: 'index.html',                    watch: ['css/hub.css'] },
  { html: '404.html',                      watch: ['css/hub.css'] },
  { html: 'English-Phonics/index.html',    watch: ['English-Phonics/js', 'English-Phonics/css', 'English-Phonics/audio/manifest.js'] }
];

const all = process.argv.includes('--all');

/* 用 git 找出有異動的檔案（未 commit 的 + 最近一次 commit 的） */
let changed = [];
if (!all) {
  try {
    const status = execFileSync('git', ['status', '--porcelain'], { cwd: ROOT, encoding: 'utf8' });
    changed = status.split('\n')
      .map(l => l.slice(3).trim().replace(/^"|"$/g, ''))
      .filter(Boolean)
      .map(p => p.replace(/\\/g, '/'));
  } catch (e) {
    console.error('讀不到 git 狀態，改用 --all 模式');
    changed = null;
  }
}

let touched = 0;

for (const page of PAGES) {
  const file = path.join(ROOT, page.html);
  if (!fs.existsSync(file)) continue;

  const needs = all || changed === null ||
    changed.some(c => page.watch.some(w => c === w || c.startsWith(w + '/')));
  if (!needs) continue;

  const src = fs.readFileSync(file, 'utf8');
  let max = 0;
  src.replace(/\?v=(\d+)/g, (_, n) => { max = Math.max(max, +n); return _; });
  const next = max + 1;
  const out = src.replace(/\?v=\d+/g, '?v=' + next);

  if (out !== src) {
    fs.writeFileSync(file, out);
    const count = (src.match(/\?v=\d+/g) || []).length;
    console.log(`${page.html}: v${max} → v${next}（${count} 處）`);
    touched++;
  }
}

if (!touched) {
  console.log(changed && !all
    ? '沒有偵測到 js/css 異動，版本號不動。'
    : '沒有需要更新的檔案。');
}
