export const CATEGORIES = ['U9','U10','U11','U12','U13','U14','U15','U16','U17','U17+']

export const INITIAL_FILTERS = {
  categories: [],  // [] = toutes les catégories (multi-select)
  phase: '',       // '' = toutes les phases (single select)
  type: '',        // '' = tous les types (single select)
  principe: '',    // '' = tous les principes (single select)
  search: '',
}

export function getUniqueValues(exercises, key) {
  const seen = new Set()
  const result = []
  for (const ex of exercises) {
    const val = ex[key]
    if (val && !seen.has(val)) {
      seen.add(val)
      result.push(val)
    }
  }
  return result.sort()
}

export function applyFilters(exercises, filters) {
  return exercises.filter(ex => {
    // Catégories — multi-select, OR logique
    if (filters.categories.length > 0) {
      const match = filters.categories.some(cat => ex[cat.toLowerCase().replace('+', 'plus')] === true)
      if (!match) return false
    }

    // Phase, Type, Principe — single select
    if (filters.phase && ex.phase !== filters.phase) return false
    if (filters.type && ex.type !== filters.type) return false
    if (filters.principe && ex.principe !== filters.principe) return false

    // Recherche texte
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase()
      const searchable = [ex.id, ex.titre, ex.objectifPrincipal, ex.consignes, ex.buts]
        .filter(Boolean).join(' ').toLowerCase()
      if (!searchable.includes(query)) return false
    }

    return true
  })
}

export function countActiveFilters(filters) {
  return (
    filters.categories.length +
    (filters.phase ? 1 : 0) +
    (filters.type ? 1 : 0) +
    (filters.principe ? 1 : 0) +
    (filters.search.trim() ? 1 : 0)
  )
}
