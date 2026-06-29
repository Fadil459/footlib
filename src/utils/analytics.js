// Envoie un événement à Google Analytics 4
// Ne plante pas si GA n'est pas chargé (ex: en local)
function trackEvent(eventName, params = {}) {
  // Opt-out interne (voir index.html) : ne rien envoyer depuis cet appareil.
  if (window.__footlibNoTrack) return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

// Appelé quand un coach ouvre la fiche d'un exercice
export function trackExerciseView(exercise) {
  trackEvent('exercise_view', {
    exercise_id: exercise.id,
    exercise_title: exercise.titre,
    exercise_type: exercise.type,
    exercise_phase: exercise.phase,
  })
}

// Appelé quand un coach ajoute un exercice à sa séance
export function trackAddToSession(exercise) {
  trackEvent('add_to_session', {
    exercise_id: exercise.id,
    exercise_title: exercise.titre,
  })
}

// Appelé quand un coach imprime/sauvegarde un plan de séance
export function trackSessionPrint(exerciseCount, totalDuration) {
  trackEvent('session_print', {
    exercise_count: exerciseCount,
    total_duration: totalDuration,
  })
}
