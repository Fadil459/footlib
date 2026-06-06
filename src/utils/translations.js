export const translations = {
  fr: {
    // Header
    appTitle: "FootLib",
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
    objectivesGroup: "Objectifs",
    technicalObjectives: "Objectifs techniques",
    tacticalObjectives: "Objectifs tactiques",
    cognitiveObjectives: "Objectifs cognitifs",
    variationsGroup: "Variations",
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

    // Partage
    share: "Partager",
    linkCopied: "Lien copié !",

    // États
    loading: "Chargement des exercices…",
    noResults: "Aucun exercice ne correspond aux filtres sélectionnés.",
    noFavorites: "Aucun favori enregistré. Cliquez sur ★ pour ajouter un exercice.",
    noNew: "Aucun nouvel exercice pour le moment.",

    // Pied de page / Légal
    close: "Fermer",
    rightsReserved: "Tous droits réservés.",
    termsLink: "Conditions d'utilisation",
    termsTitle: "Conditions d'utilisation",
    termsBody: [
      "L'ensemble du contenu de FootLib — exercices, descriptions, schémas, traductions et code de l'application — est la propriété de fadilsoccersaga et est protégé par le droit d'auteur.",
      "L'accès est fourni à des fins de consultation personnelle par les entraîneurs autorisés. Toute reproduction, distribution, modification ou utilisation commerciale, totale ou partielle, sans autorisation écrite préalable est interdite.",
      "Il est notamment interdit de copier ce contenu et de se l'attribuer ou d'en revendiquer la paternité.",
      "Pour toute demande d'autorisation, contactez fadilsoccersaga.",
    ],
  },

  en: {
    // Header
    appTitle: "FootLib",
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
    objectivesGroup: "Objectives",
    technicalObjectives: "Technical objectives",
    tacticalObjectives: "Tactical objectives",
    cognitiveObjectives: "Cognitive objectives",
    variationsGroup: "Variations",
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

    // Share
    share: "Share",
    linkCopied: "Link copied!",

    // States
    loading: "Loading exercises…",
    noResults: "No exercises match the selected filters.",
    noFavorites: "No favorites saved. Click ★ to add an exercise.",
    noNew: "No new exercises at the moment.",

    // Footer / Legal
    close: "Close",
    rightsReserved: "All rights reserved.",
    termsLink: "Terms of use",
    termsTitle: "Terms of use",
    termsBody: [
      "All FootLib content — exercises, descriptions, diagrams, translations and the application code — is the property of fadilsoccersaga and is protected by copyright.",
      "Access is provided for personal consultation by authorized coaches. Any reproduction, distribution, modification or commercial use, in whole or in part, without prior written permission is prohibited.",
      "In particular, copying this content and claiming authorship of it is prohibited.",
      "For any permission request, contact fadilsoccersaga.",
    ],
  },
}

export function useTranslation(lang) {
  return translations[lang] || translations.fr
}
