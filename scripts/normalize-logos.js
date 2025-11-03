const fs = require('node:fs');
const path = require('node:path');

const dir = path.join(__dirname, '..', 'public', 'logos');
if (!fs.existsSync(dir)) {
  console.error('logos directory not found:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir);
for (const f of files) {
  const src = path.join(dir, f);
  const ext = path.extname(f);
  const name = path.basename(f, ext);
  // normalize: lowercase, replace spaces and underscores with hyphens, keep existing hyphens
  const norm = name.toLowerCase().replaceAll(/\s+/g, '-').replaceAll(/[^a-z0-9-]/g, '');
  const destName = `${norm}${ext.toLowerCase()}`;
  const dest = path.join(dir, destName);
  if (src === dest) continue;
  if (fs.existsSync(dest)) {
    console.log('target exists, skipping:', destName);
    continue;
  }
  try {
    fs.renameSync(src, dest);
    console.log('renamed', f, '->', destName);
  } catch (err) {
    console.error('failed to rename', f, err.message);
  }
}
console.log('done');
