import { useState, useEffect } from 'react'

const STORAGE_KEY = 'exercise-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(exerciseId) {
    setFavorites(prev =>
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    )
  }

  function isFavorite(exerciseId) {
    return favorites.includes(exerciseId)
  }

  return { favorites, toggleFavorite, isFavorite }
}
