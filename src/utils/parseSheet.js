// Google Sheet config
const SHEET_ID = '1JehPYpTP3eFdt72XTIYwZjckoAk5bvmJDiucLsgMnKY'
const SHEET_NAME = "Banque d'exercices"

export const SHEET_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`

// Mapping: exact column header (as in Google Sheet) → JS key
// Handles both accented and non-accented versions for robustness
const COLUMN_MAP = {
  'ID': 'id',
  'Titre': 'titre',
  'Type': 'type',
  'Phase de jeu': 'phase',
  'Principe de jeu': 'principe',
  'Methode pedagogique': 'methodePedagogique',
  'Méthode pédagogique': 'methodePedagogique',
  'U9': 'u9',
  'U10': 'u10',
  'U11': 'u11',
  'U12': 'u12',
  'U13': 'u13',
  'U14': 'u14',
  'U15': 'u15',
  'U16': 'u16',
  'U17': 'u17',
  'U17+': 'u17plus',
  'Duree totale': 'duree',
  'Durée totale': 'duree',
  'Sequence': 'sequence',
  'Séquence': 'sequence',
  'Effectif total': 'effectif',
  'Long (m)': 'longueur',
  'Large (m)': 'largeur',
  'Larg (m)': 'largeur',
  'Objectif principal': 'objectifPrincipal',
  'Consignes': 'consignes',
  'But(s)': 'buts',
  'Objectifs techniques': 'objectifsTechniques',
  'Objectifs tactiques': 'objectifsTactiques',
  'Objectifs cognitifs': 'objectifsCognitifs',
  'Simplifications': 'simplifications',
  'Complexifications': 'complexifications',
  'Critere de reussite': 'critereReussite',
  'Critère de réussite': 'critereReussite',
  'Schema (URL)': 'schemaUrl',
  'Schéma (URL)': 'schemaUrl',
  'Statut schema': 'statutSchema',
  'Statut schéma': 'statutSchema',
  'Schema video': 'schemaVideo',
  'Schéma vidéo': 'schemaVideo',
  // Colonnes EN
  'Titre EN': 'titreEn',
  'Objectif principal EN': 'objectifPrincipalEn',
  'Consignes EN': 'consignesEn',
  'But(s) EN': 'butsEn',
  'Objectifs techniques EN': 'objectifsTechniquesEn',
  'Objectifs tactiques EN': 'objectifsTactiquesEn',
  'Objectifs cognitifs EN': 'objectifsCognitifsEn',
  'Simplifications EN': 'simplificationsEn',
  'Complexifications EN': 'complexificationsEn',
  'Critere de reussite EN': 'critereReussiteEn',
  'Critère de réussite EN': 'critereReussiteEn',
}

const BOOLEAN_KEYS = new Set(['u9','u10','u11','u12','u13','u14','u15','u16','u17','u17plus'])

// Robust CSV parser: handles quoted fields, embedded commas, escaped quotes
function parseCSV(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        cell += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        row.push(cell)
        cell = ''
      } else if (ch === '\r' && next === '\n') {
        row.push(cell)
        cell = ''
        rows.push(row)
        row = []
        i++
      } else if (ch === '\n') {
        row.push(cell)
        cell = ''
        rows.push(row)
        row = []
      } else {
        cell += ch
      }
    }
  }

  // Flush last cell/row
  if (cell || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }

  return rows
}

// Si un header contient un long texte suivi du vrai nom de colonne
// (ex: "BANQUE D'EXERCICES ... Type"), extrait le vrai nom
function normalizeHeader(raw) {
  const h = raw.trim()
  // Cherche si le header se termine par un nom connu après un point ou espace
  const lastDot = h.lastIndexOf('. ')
  if (lastDot !== -1) {
    const candidate = h.slice(lastDot + 2).trim()
    if (COLUMN_MAP[candidate] !== undefined) return candidate
  }
  // Essaie aussi juste le dernier mot
  const parts = h.split(/\s+/)
  const lastWord = parts[parts.length - 1]
  if (lastWord && COLUMN_MAP[lastWord] !== undefined) return lastWord
  return h
}

export function parseExercises(csvText) {
  const rows = parseCSV(csvText)
  if (rows.length < 2) return []

  const headers = rows[0].map(h => normalizeHeader(h))
  const exercises = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const ex = {}

    headers.forEach((header, idx) => {
      const key = COLUMN_MAP[header]
      if (!key) return
      const raw = row[idx] !== undefined ? row[idx].trim() : ''
      ex[key] = BOOLEAN_KEYS.has(key) ? raw.toUpperCase() === 'TRUE' : raw
    })

    // Only keep rows with a valid EX### ID
    if (!ex.id || !/^EX\d+$/.test(ex.id)) continue

    exercises.push(ex)
  }

  return exercises
}
