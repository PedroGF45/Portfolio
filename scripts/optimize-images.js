/*
  Image optimization helper for the Portfolio project.
  - Looks for a source image in public/images named like "foto perfil.*"
  - Generates WebP variants: 128, 256, 512
  - Generates a tiny base64 placeholder and writes a JSON manifest at public/images/profile-opt.json

  Usage:
    npm install --save-dev sharp
    npm run images:optimize

  Note: This script is intentionally simple and local-only.
*/

const fs = require('node:fs')
const path = require('node:path')

async function main() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images')
  if (!fs.existsSync(imagesDir)) {
    console.error('Could not find public/images folder at', imagesDir)
    process.exit(2)
  }

  const files = fs.readdirSync(imagesDir)
  const srcFile = files.find(f => /^foto\s*perfil\./i.test(f))
  if (!srcFile) {
    console.error('No source image named like "foto perfil.*" found in public/images. Please place your profile image there and try again.')
    process.exit(2)
  }

  const srcPath = path.join(imagesDir, srcFile)
  console.log('Found source image:', srcFile)

  let sharp
  try {
    sharp = require('sharp')
  } catch (err) {
    console.error('The `sharp` package is required to run this script. Install it with:')
    console.error('  npm install --save-dev sharp')
    // rethrow so caller can see the stack if needed, then exit
    console.error(err)
    process.exit(3)
  }

  const sizes = [128, 256, 512]
  const outBase = path.join(imagesDir, 'profile')
  const manifest = { src: '/images/profile-512.webp', srcset: [], placeholder: null }

  for (const size of sizes) {
    const out = `${outBase}-${size}.webp`
    console.log('Generating', path.basename(out))
    await sharp(srcPath)
      .resize(size, size, { fit: 'cover' })
      .webp({ quality: 86 })
      .toFile(out)
    manifest.srcset.push({ src: `/images/profile-${size}.webp`, width: size })
  }

  // tiny placeholder (10px) -> base64
  const tinyBuffer = await sharp(srcPath).resize(10, 10, { fit: 'cover' }).webp({ quality: 60 }).toBuffer()
  manifest.placeholder = `data:image/webp;base64,${tinyBuffer.toString('base64')}`

  const manifestPath = path.join(imagesDir, 'profile-opt.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
  console.log('Wrote manifest to', manifestPath)
  console.log('Optimization complete. Add /images/profile-*.webp files to your repo or gitignore as desired.')
}

;(async () => {
  try {
    await main()
  } catch (err) {
    console.error('Image optimization failed:')
    console.error(err)
    process.exit(1)
  }
})()
