export const CATEGORIES = ['U9','U10','U11','U12','U13','U14','U15','U16','U17']

export const INITIAL_FILTERS = {
  categories: [],  // [] = toutes les catégories
  phases: [],      // [] = toutes les phases
  types: [],       // [] = tous les types
  principes: [],   // [] = tous les principes
  search: '',
}

// Extraire les valeurs uniques d'un champ depuis les exercices
// (permet aux filtres de s'adapter automatiquement si de nouvelles valeurs sont ajoutées au sheet)
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
    // Filtre catégorie (cases à cocher multiples — OR logique)
    if (filters.categories.length > 0) {
      const match = filters.categories.some(cat => ex[cat.toLowerCase()] === true)
      if (!match) return false
    }

    // Filtre phase (OR logique)
    if (filters.phases.length > 0 && !filters.phases.includes(ex.phase)) return false

    // Filtre type (OR logique)
    if (filters.types.length > 0 && !filters.types.includes(ex.type)) return false

    // Filtre principe (OR logique)
    if (filters.principes.length > 0 && !filters.principes.includes(ex.principe)) return false

    // Recherche texte libre
    if (filters.search.trim()) {
      const query = filters.search.toLowerCase()
      const searchable = [
        ex.id,
        ex.titre,
        ex.objectifPrincipal,
        ex.consignes,
        ex.buts,
      ].filter(Boolean).join(' ').toLowerCase()
      if (!searchable.includes(query)) return false
    }

    return true
  })
}

export function countActiveFilters(filters) {
  return (
    filters.categories.length +
    filters.phases.length +
    filters.types.length +
    filters.principes.length +
    (filters.search.trim() ? 1 : 0)
  )
}
