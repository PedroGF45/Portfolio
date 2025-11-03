#!/usr/bin/env node
/*
 Simple utility to detect common image file headers and correct file
 extensions in public/logos. It renames files whose binary signature
 indicates a PNG/WebP/JPEG but whose extension is wrong (e.g. `.svg`).

 Safe: operates only in the public/logos directory and only renames when
 a mismatch is detected. Prints a summary and exits with 0.
*/
const fs = require('fs');
const path = require('path');

const logosDir = path.join(__dirname, '..', 'public', 'logos');

function detectType(buffer) {
  if (!buffer || buffer.length < 4) return 'unknown';
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'png';
  // JPEG
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) return 'jpg';
  // WebP: 'RIFF'....'WEBP'
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'webp';
  // SVG starts with '<' and 'svg' in first bytes (text). We'll treat as svg only if it looks textual.
  const head = buffer.toString('utf8', 0, Math.min(buffer.length, 128));
  if (head.includes('<svg') || head.trim().startsWith('<')) return 'svg';
  return 'unknown';
}

async function fix() {
  try {
    const names = await fs.promises.readdir(logosDir);
    const changes = [];

    for (const name of names) {
      const full = path.join(logosDir, name);
      const stat = await fs.promises.stat(full);
      if (!stat.isFile()) continue;

      const ext = path.extname(name).toLowerCase();
      const base = path.basename(name, ext);

      const fd = await fs.promises.open(full, 'r');
      const { buffer } = await fd.read(Buffer.alloc(512), 0, 512, 0);
      await fd.close();

      const detected = detectType(buffer);
      let desiredExt = ext; // keep default

      if (detected === 'png') desiredExt = '.png';
      else if (detected === 'jpg') desiredExt = '.jpg';
      else if (detected === 'webp') desiredExt = '.webp';
      else if (detected === 'svg') desiredExt = '.svg';
      else desiredExt = ext; // unknown -> leave as-is

      if (desiredExt !== ext) {
        // avoid clobbering existing file
        const newName = base + desiredExt;
        const newFull = path.join(logosDir, newName);
        if (await exists(newFull)) {
          // If target exists, skip but report
          changes.push({ from: name, to: newName, note: 'target exists - skipped' });
          continue;
        }

        await fs.promises.rename(full, newFull);
        changes.push({ from: name, to: newName });
      }
    }

    if (changes.length === 0) {
      console.log('No filename mismatches detected in public/logos.');
    } else {
      console.log('Renamed files:');
      for (const c of changes) console.log(` - ${c.from} -> ${c.to}${c.note ? ' (' + c.note + ')' : ''}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error while fixing logo extensions:', err);
    process.exit(2);
  }
}

async function exists(p) {
  try { await fs.promises.access(p); return true; } catch (_) { return false; }
}

fix();
