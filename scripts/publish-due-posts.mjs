// 예약 발행 스크립트
// apps/docs/blog-queue/ 안의 글 중 발행일(date)이 오늘(KST) 이하인 것을
// apps/docs/src/content/blog/ 로 옮긴다. 옮긴 게 있으면 커밋·푸시는 워크플로우가 한다.
//
// 출력(GITHUB_OUTPUT): published_count, published_files, published_titles, remaining
// 환경변수 DRY_RUN=1 이면 파일을 옮기지 않고 로그만 찍는다(로컬 점검용).

import fs from 'fs';
import path from 'path';

const QUEUE_DIR = 'apps/docs/blog-queue';
const BLOG_DIR = 'apps/docs/src/content/blog';
const LOW_STOCK_THRESHOLD = 3;
const DRY_RUN = !!process.env.DRY_RUN;

// 오늘 날짜(KST). date 프론트매터는 'YYYY-MM-DD' 문자열이라 문자열 비교로 충분하다.
const kstNow = new Date(Date.now() + 9 * 60 * 60 * 1000);
const today = kstNow.toISOString().slice(0, 10);

function readField(text, field) {
  const m = text.match(
    new RegExp(`^${field}:\\s*['"]?([^'"\\n]+)['"]?\\s*$`, 'm')
  );
  return m ? m[1].trim() : '';
}

if (!fs.existsSync(QUEUE_DIR)) {
  console.log(`큐 폴더 없음(${QUEUE_DIR}). 발행할 글 없음.`);
  writeOutput({ published: [], remaining: 0 });
  process.exit(0);
}

const queued = fs.readdirSync(QUEUE_DIR).filter((f) => f.endsWith('.mdx'));
const due = [];

for (const file of queued) {
  const text = fs.readFileSync(path.join(QUEUE_DIR, file), 'utf-8');
  const date = readField(text, 'date');
  if (!date) {
    console.warn(`⚠️  ${file}: date 프론트매터 없음 — 건너뜀`);
    continue;
  }
  if (date <= today) {
    due.push({ file, date, title: readField(text, 'title') });
  }
}

// 발행일 순서대로(밀린 게 여러 개면 오래된 것부터)
due.sort((a, b) => a.date.localeCompare(b.date));

for (const post of due) {
  const from = path.join(QUEUE_DIR, post.file);
  const to = path.join(BLOG_DIR, post.file);
  if (DRY_RUN) {
    console.log(`[DRY_RUN] 발행 예정: ${post.file} (${post.date})`);
  } else {
    fs.renameSync(from, to);
    console.log(`✅ 발행: ${post.file} (${post.date})`);
  }
}

const remaining =
  fs.readdirSync(QUEUE_DIR).filter((f) => f.endsWith('.mdx')).length -
  (DRY_RUN ? due.length : 0);

console.log(
  `오늘(${today}) 발행 ${due.length}편, 남은 예약글 ${remaining}편` +
    (remaining < LOW_STOCK_THRESHOLD ? ' — ⚠️ 재고 부족' : '')
);

writeOutput({ published: due, remaining });

function writeOutput({ published, remaining }) {
  const out = [
    `published_count=${published.length}`,
    `published_files=${published.map((p) => p.file).join(',')}`,
    `published_titles=${published.map((p) => p.title).join(' / ')}`,
    `remaining=${remaining}`,
    `low_stock=${remaining < LOW_STOCK_THRESHOLD ? 'true' : 'false'}`,
  ].join('\n');
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, out + '\n');
  }
}
