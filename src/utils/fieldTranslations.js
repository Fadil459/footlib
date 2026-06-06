// Traduction des valeurs contrôlées du sheet FR → EN
const FIELD_TRANSLATIONS = {
  // Type
  'Jeu': 'Game/SSG/MSG',
  'Situation': 'Wave',
  'Exercice': 'Drill',
  'Coordination': 'Coordination',
  'Préparation physique': 'Fitness',
  'Échauffement': 'Warm-up',
  'Echauffement / Mise en route': 'Warm-up',

  // Phase de jeu (valeurs complètes telles que dans le Sheet)
  'Conserver - Progresser': 'Possession - Build Up',
  'Déséquilibrer - Finir': 'Unbalance - Finishing',
  "S'opposer à la progression": 'Oppose Progression',
  "S'organiser pour protéger son but": 'Protect the Goal',

  // Principes de jeu P1–P19 (format « Pn - ... » du Sheet)
  'P1 - Créer et utiliser des espaces': 'P1: Create & Use Space',
  'P2 - Jouer dans les intervalles et entre les lignes': 'P2: Play in Gaps & Between Lines',
  "P3 - Jouer à l'opposé après avoir fixé collectivement": 'P3: Switch Play After Collective Fixing',
  'P4 - Jouer combiné pour créer un surnombre': 'P4: Combine to Create Overload',
  'P5 - Se démarquer pour fixer et éliminer passer ou finir': 'P5: Move to Fix, Beat, Pass or Finish',
  "P6 - Freiner la progression de l'adversaire, organiser et réorganiser les alignements": 'P6: Slow Opposition, Organize Defensive Lines',
  "P7 - S'organiser en déséquilibre": 'P7: Organize When Unbalanced',
  'P8 - Densifier et être actif dans le CJD (axe ballon-but)': 'P8: Densify the Direct Play Channel (Ball-Goal Axis)',
  'P9 - Défendre son but, récupérer ou dégager le ballon': 'P9: Defend Goal, Recover or Clear the Ball',
  'P10 - Récupérer le ballon en bloc': 'P10: Recover the Ball as a Block',
  "P11 - Garder le temps d'avance": 'P11: Keep the Tempo Advantage',
  "P12 - Retrouver l'équilibre / Reformer le bloc équipe": 'P12: Regain Balance / Reform the Team Block',
  'P13 - Changer de rythme de jeu (Temps forts – temps faibles)': 'P13: Change the Tempo (High & Low Phases)',
  'P14 - Sécuriser et maitriser la possession': 'P14: Secure & Control Possession',
  "P15 - Réaction à la perte – empêcher l'adversaire de s'organiser": 'P15: React to Loss - Prevent Opponent from Organizing',
  'P16 - Marquer': 'P16: Score',
  'P17 - Fixer dans une zone pour jouer dans une autre': 'P17: Fix in One Zone to Play in Another',
  "P19 - Jouer vers l'avant collectivement ou individuellement entre les lignes adverses": 'P19: Play Forward Between Opposition Lines',

  // Méthode pédagogique
  'Active - Laisser jouer / Observer / Questionner': 'Active: Let Play / Observe / Question',
  'Active - Faire répéter / Questionner / Orienter': 'Active: Repeat / Question / Direct',
  'Directive - Expliquer / Démontrer / Faire répéter': 'Directive: Explain / Demonstrate / Repeat',
}

// Normalisation : insensible aux accents, aux variantes de tirets/apostrophes,
// aux espaces et à la casse, pour matcher quelles que soient les saisies du Sheet.
function normalize(s) {
  return String(s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // supprime les accents
    .toLowerCase()
    .replace(/[‘’ʼ′']/g, "'")      // apostrophes unifiées
    .replace(/[–—]/g, '-')                   // tirets longs → tiret simple
    .replace(/\s+/g, ' ')
    .trim()
}

const NORMALIZED_MAP = Object.fromEntries(
  Object.entries(FIELD_TRANSLATIONS).map(([k, v]) => [normalize(k), v])
)

export function translateField(value, lang) {
  if (lang === 'fr' || !value) return value
  return NORMALIZED_MAP[normalize(value)] ?? value
}
