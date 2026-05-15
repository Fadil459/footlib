export const translations = {
  fr: {
    // Header
    appTitle: "Bibliothèque d'exercices de football",
    tabExercises: "Exercices",
    tabFavorites: "Favoris",
    tabSession: "Séance",
    tabNew: "Nouveautés",

    // Filtres
    filterTitle: "Filtres",
    filterReset: "Réinitialiser",
    filterSearch: "Rechercher un exercice…",
    filterCategory: "Catégorie",
    filterType: "Type",
    filterPhase: "Phase de jeu",
    filterPrinciple: "Principe de jeu",
    exercises: "exercices",

    // Carte
    players: "joueurs",

    // Modal — labels
    mainObjective: "Objectif principal",
    instructions: "Consignes",
    goals: "But(s)",
    duration: "Durée",
    sequence: "Séquence",
    players_label: "Effectif",
    field: "Terrain",
    phase: "Phase",
    principle: "Principe",
    method: "Méthode",
    technicalObjectives: "Objectifs techniques",
    tacticalObjectives: "Objectifs tactiques",
    cognitiveObjectives: "Objectifs cognitifs",
    simplifications: "Simplifications",
    complexifications: "Complexifications",
    successCriteria: "Critère de réussite",
    schema: "Schéma",
    video: "Vidéo",
    watchVideo: "Voir la vidéo →",

    // Actions
    addFavorite: "Ajouter aux favoris",
    removeFavorite: "Favori",
    addToSession: "+ Ajouter à la séance",
    removeFromSession: "✓ Dans la séance — Retirer",
    inSession: "✓ Séance",
    addSession: "+ Séance",

    // Plan de séance
    sessionTitle: "Plan de séance",
    sessionEmpty: "Ajoutez des exercices depuis les fiches pour construire votre séance.",
    totalDuration: "Durée totale estimée",
    notCalculable: "Non calculable",
    printSession: "Imprimer / Enregistrer PDF",
    clearSession: "Vider la séance",

    // États
    loading: "Chargement des exercices…",
    noResults: "Aucun exercice ne correspond aux filtres sélectionnés.",
    noFavorites: "Aucun favori enregistré. Cliquez sur ★ pour ajouter un exercice.",
    noNew: "Aucun nouvel exercice pour le moment.",
  },

  en: {
    // Header
    appTitle: "Football Exercise Library",
    tabExercises: "Exercises",
    tabFavorites: "Favorites",
    tabSession: "Session",
    tabNew: "New",

    // Filters
    filterTitle: "Filters",
    filterReset: "Reset",
    filterSearch: "Search an exercise…",
    filterCategory: "Category",
    filterType: "Type",
    filterPhase: "Game phase",
    filterPrinciple: "Game principle",
    exercises: "exercises",

    // Card
    players: "players",

    // Modal — labels
    mainObjective: "Main objective",
    instructions: "Instructions",
    goals: "Goal(s)",
    duration: "Duration",
    sequence: "Sequence",
    players_label: "Players",
    field: "Field",
    phase: "Phase",
    principle: "Principle",
    method: "Method",
    technicalObjectives: "Technical objectives",
    tacticalObjectives: "Tactical objectives",
    cognitiveObjectives: "Cognitive objectives",
    simplifications: "Simplifications",
    complexifications: "Complexifications",
    successCriteria: "Success criteria",
    schema: "Diagram",
    video: "Video",
    watchVideo: "Watch video →",

    // Actions
    addFavorite: "Add to favorites",
    removeFavorite: "Favorited",
    addToSession: "+ Add to session",
    removeFromSession: "✓ In session — Remove",
    inSession: "✓ Session",
    addSession: "+ Session",

    // Session plan
    sessionTitle: "Session plan",
    sessionEmpty: "Add exercises from their cards to build your session.",
    totalDuration: "Estimated total duration",
    notCalculable: "Not calculable",
    printSession: "Print / Save as PDF",
    clearSession: "Clear session",

    // States
    loading: "Loading exercises…",
    noResults: "No exercises match the selected filters.",
    noFavorites: "No favorites saved. Click ★ to add an exercise.",
    noNew: "No new exercises at the moment.",
  },
}

export function useTranslation(lang) {
  return translations[lang] || translations.fr
}
