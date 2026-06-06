#!/usr/bin/env node
/**
 * Ajoute un filigrane discret "FootLib" en bas à droite de chaque schéma.
 *
 * Source (images propres)  : pdf-import/schemas-clean/EXNNN.png
 * Sortie (images publiées) : public/schemas/EXNNN.png
 *
 * Idempotent : régénère toujours depuis les originaux propres, donc on peut
 * le relancer sans empiler les filigranes.
 *
 *   node scripts/watermark-schemas.mjs
 *
 * Pour de nouvelles images : déposer l'original dans pdf-import/schemas-clean/
 * puis relancer ce script + scripts/gen-schema-manifest.mjs
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'pdf-import', 'schemas-clean');
const outDir = path.join(root, 'public', 'schemas');

const TEXT = 'FootLib';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function watermarkSvg(width, height) {
  const fontSize = Math.max(13, Math.round(width / 24));
  const margin = Math.round(fontSize * 0.8);
  const x = width - margin;
  const y = height - margin;
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${x}" y="${y}" text-anchor="end"
        font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="700"
        fill="#ffffff" fill-opacity="0.55"
        stroke="#14315a" stroke-opacity="0.35" stroke-width="${Math.max(0.5, fontSize * 0.04)}"
        paint-order="stroke" letter-spacing="0.5">${escapeXml(TEXT)}</text>
    </svg>`
  );
}

async function main() {
  if (!fs.existsSync(srcDir)) {
    console.error(`Dossier source introuvable : ${srcDir}`);
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => /^EX\d+\.png$/i.test(f));
  let ok = 0, ko = 0;
  for (const file of files) {
    try {
      const src = path.join(srcDir, file);
      const meta = await sharp(src).metadata();
      const svg = watermarkSvg(meta.width, meta.height);
      const buf = await sharp(src)
        .composite([{ input: svg, top: 0, left: 0 }])
        .png()
        .toBuffer();
      fs.writeFileSync(path.join(outDir, file), buf);
      ok++;
    } catch (e) {
      console.warn(`KO ${file}: ${e.message}`);
      ko++;
    }
  }
  console.log(`Filigrane "${TEXT}" appliqué : ${ok} images (${ko} échecs).`);
  console.log(`Sortie : ${outDir}`);
}

main();
