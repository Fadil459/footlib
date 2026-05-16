// Traduction des valeurs contrôlées du sheet FR → EN
const FIELD_TRANSLATIONS = {
  // Type
  'Jeu': 'Game',
  'Situation': 'Wave',
  'Exercice': 'Drill',
  'Coordination': 'Coordination',
  'Préparation physique': 'Fitness',
  'Échauffement': 'Warm-up',

  // Phase de jeu
  'Conserver': 'Possession',
  'Progresser': 'Build Up',
  'Déséquilibrer': 'Unbalance',
  'Finir': 'Finishing',
  "S'opposer à la progression": 'Oppose Progression',
  "S'organiser pour protéger son but": 'Protect the Goal',

  // Principes de jeu
  'P1 : Créer, Utiliser des espaces': 'P1: Create & Use Space',
  'P2 : Jouer dans les intervalles et entre les lignes': 'P2: Play in Gaps & Between Lines',
  "P3 : Jouer à l'opposé après avoir fixé collectivement": 'P3: Switch Play After Collective Fixing',
  'P4 : Jouer combiné pour créer un surnombre': 'P4: Combine to Create Overload',
  'P5 : Se démarquer pour fixer, éliminer, passer ou finir': 'P5: Move to Fix, Beat, Pass or Finish',
  'P6 : Freiner la progression adverse, organiser et réorganiser les alignements': 'P6: Slow Opposition, Organize Defensive Lines',
  "P7 : S'organiser en déséquilibre": 'P7: Organize When Unbalanced',
  'P8 : Densifier et être actif sur le couloir de jeu direct': 'P8: Densify on the Direct Play Channel',
  'P9 : Défendre son but, récupérer ou dégager le ballon': 'P9: Defend Goal, Recover or Clear the Ball',

  // Méthode pédagogique (les deux variantes orthographiques couvertes)
  'Active laissez jouer / Observer /Questionner': 'Active: Let Play / Observe / Question',
  'Active laissez jouer / Observer / Questionner': 'Active: Let Play / Observe / Question',
  'Active - Faire répéter / Questionner / Orienter': 'Active: Repeat / Question / Direct',
  'Active Faire répéter /Questionner / Orienté Directive': 'Active: Repeat / Question / Direct',
  'Directive - Expliquer / Démontrer / Faire répéter': 'Directive: Explain / Demonstrate / Repeat',
  'Directive - Expliquer / Demontrer / Faire repeter': 'Directive: Explain / Demonstrate / Repeat',
}

export function translateField(value, lang) {
  if (lang === 'fr' || !value) return value
  return FIELD_TRANSLATIONS[value] ?? value
}
