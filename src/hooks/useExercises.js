import { useState, useEffect } from 'react'
import { SHEET_CSV_URL, parseExercises } from '../utils/parseSheet'

export function useExercises() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchExercises() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(SHEET_CSV_URL)
        if (!res.ok) throw new Error(`Erreur réseau (${res.status})`)

        const text = await res.text()
        if (!cancelled) {
          setExercises(parseExercises(text))
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchExercises()
    return () => { cancelled = true }
  }, [])

  return { exercises, loading, error }
}
