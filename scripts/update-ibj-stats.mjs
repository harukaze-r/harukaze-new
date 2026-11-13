// IBJ の登録会員数を取得して data/ibj-stats.json に保存する。
// GitHub Actions（.github/workflows/ibj-stats.yml）から毎月実行される。
// 取得や形式チェックに失敗したときはファイルを書き換えず、前回の数字をそのまま残す。
import { readFile, writeFile } from 'node:fs/promises';

const SOURCE = 'https://www.ibjapan.com/assign_ibjs_api/'; // https://www.ibjapan.com/ibj/data/ が読み込んでいるデータ
const OUT = new URL('../data/ibj-stats.json', import.meta.url);

const res = await fetch(SOURCE, { headers: { 'User-Agent': 'harukaze-marriage.com monthly stats update' } });
if (!res.ok) {
  console.error(`IBJ のデータを取得できませんでした（HTTP ${res.status}）。前回の数字のままにします。`);
  process.exit(0);
}
const src = await res.json();

const member = String(src.member ?? '').trim();
const year = Number(src.update_year);
const month = Number(src.update_month);
if (!/^\d{1,3}(,\d{3})+$/.test(member) || !(year >= 2020) || !(month >= 1 && month <= 12)) {
  console.error('IBJ のデータの形式が想定と違います。前回の数字のままにします。', { member, year, month });
  process.exit(0);
}

const next = {
  member,                                   // 例: "111,572"
  asOf: `${year}年${month}月末時点`,          // 例: "2026年10月末時点"
  source: 'https://www.ibjapan.com/ibj/data/',
};

let prev = null;
try { prev = JSON.parse(await readFile(OUT, 'utf8')); } catch {}
if (prev && prev.member === next.member && prev.asOf === next.asOf) {
  console.log(`変更なし: ${next.member}名（${next.asOf}）`);
  process.exit(0);
}
await writeFile(OUT, JSON.stringify(next, null, 2) + '\n');
console.log(`更新しました: ${next.member}名（${next.asOf}）`);
