#!/usr/bin/env node
/**
 * Génère src/data/schemaManifest.js à partir des fichiers présents dans public/schemas/
 *
 * À relancer après avoir ajouté de nouvelles images :
 *   node scripts/gen-schema-manifest.mjs
 *
 * Chaque image doit être nommée EXNNN.png (ex: EX349.png).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const schemasDir = path.join(root, 'public', 'schemas');
const outPath = path.join(root, 'src', 'data', 'schemaManifest.js');

const files = fs.readdirSync(schemasDir)
  .filter(f => /^EX\d+\.png$/i.test(f))
  .map(f => f.replace(/\.png$/i, '').toUpperCase())
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const content = `// Liste des IDs d'exercices ayant une image hébergée localement dans public/schemas/
// Généré automatiquement par scripts/gen-schema-manifest.mjs — NE PAS éditer à la main.
export const LOCAL_SCHEMA_IDS = new Set(${JSON.stringify(files, null, 0)})
`;

fs.writeFileSync(outPath, content, 'utf-8');
console.log(`Manifeste écrit : ${outPath}`);
console.log(`${files.length} images locales référencées (${files[0]} → ${files[files.length - 1]}).`);
