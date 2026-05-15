import { useState, useEffect } from 'react'

const STORAGE_KEY = 'exercise-session-plan'

export function useSessionPlan() {
  const [sessionExercises, setSessionExercises] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionExercises))
  }, [sessionExercises])

  function addToSession(exercise) {
    setSessionExercises(prev => {
      if (prev.find(ex => ex.id === exercise.id)) return prev
      return [...prev, exercise]
    })
  }

  function removeFromSession(exerciseId) {
    setSessionExercises(prev => prev.filter(ex => ex.id !== exerciseId))
  }

  function moveUp(exerciseId) {
    setSessionExercises(prev => {
      const idx = prev.findIndex(ex => ex.id === exerciseId)
      if (idx <= 0) return prev
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
  }

  function moveDown(exerciseId) {
    setSessionExercises(prev => {
      const idx = prev.findIndex(ex => ex.id === exerciseId)
      if (idx >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
      return next
    })
  }

  function clearSession() {
    setSessionExercises([])
  }

  function isInSession(exerciseId) {
    return sessionExercises.some(ex => ex.id === exerciseId)
  }

  // Calcule la durée totale en parsant les strings "12 min", "2 x 10 min", etc.
  function parseDuration(dureeStr) {
    if (!dureeStr) return 0
    // Format "X x Y min" → X * Y
    const multiMatch = dureeStr.match(/(\d+)\s*[x×]\s*(\d+)\s*min/i)
    if (multiMatch) return parseInt(multiMatch[1]) * parseInt(multiMatch[2])
    // Format "X min"
    const simpleMatch = dureeStr.match(/(\d+)\s*min/i)
    if (simpleMatch) return parseInt(simpleMatch[1])
    return 0
  }

  const totalDuration = sessionExercises.reduce(
    (sum, ex) => sum + parseDuration(ex.duree),
    0
  )

  return {
    sessionExercises,
    addToSession,
    removeFromSession,
    moveUp,
    moveDown,
    clearSession,
    isInSession,
    totalDuration,
  }
}
