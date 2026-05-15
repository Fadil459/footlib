// Mapping EX ID → Google Drive file ID pour les schémas
// Mis à jour le 2026-05-15 — 53 schémas disponibles sur 56
// Manquants: EX001, EX011, EX017

export const DRIVE_SCHEMA_IDS = {
  EX002: '1QqMdg5KWekCuwJyoxljCzXKdVaPcCXyZ',
  EX003: '1Ad30xkECTe5SL_XdazCwQWItT7MLlQ9B',
  EX004: '1-Y5Aqft1c3ERHuvu45wuXCUX-FR2wtpg',
  EX005: '1SaCI4xHNz8oOBdZFj6MO24Ffw3eHcEnV',
  EX006: '1wu4gH8tMVjbIRL-Lfx9vzHlmLjuHicZ7',
  EX007: '11aVReVcQA9M7DFxfnJByHdcHiYVRoPpl',
  EX008: '17zLMNovSTsp3Mb_Aw895jPtlxvAuF0KB',
  EX009: '1T2sh5uGMjey6BV36lMo5cWd1wT86UpgC',
  EX010: '1fpfjOOMlxYDObBgl_2U5L4YTCbN1FmYL',
  EX012: '1iqyawnF_VR3f7mKAq9QLLnK95aGbkVZO',
  EX013: '13NpovQlvMdTQnwclZNAV31TXijtfSz_p',
  EX014: '1C-rvKemQZktF3KY2fOJBcVjuTQHUIU47',
  EX015: '1rfr8jQEPQwIn74tx_p-yGHITZWgVfTfu',
  EX016: '13bwNJo2Nkr83ZtBze9ja6ZnKet7YpyBp',
  EX018: '1cUsMfmq1SmLb34-aBZ0jeomN9sGlHMxu',
  EX019: '1Yy0ivIwLKUK3GJY00Bg-uFqFpxkHZVIf',
  EX020: '1VnvfC0QjRYlRa2T3Pa5nLXaRL9kEJkry',
  EX021: '1y3l4ED3B5j_gVkI-oU9kIJ692YMDz5zC',
  EX022: '1B1jhg_KVRAVEDPsRWJNYmVzN06FJ8XnR',
  EX023: '1SbgOlMefu8EMmBpbCZWrWs5fqhndhl8i',
  EX024: '1Ii7YsJvm7n6-3RG0BZM8uNSORLzrb2oP',
  EX025: '1PjtTy1fU4KMvAx8-YJAImaItI2kMsuOi',
  EX026: '1f6oGIzldCs9w88BAzFnTZdpsd69Eqdt3',
  EX027: '12wmIsaHG6tITCFujcGDEPHxooHHVPQDi',
  EX028: '1gqciyGnyRn_9gXzixvQofWnNWESBElGb',
  EX029: '1BdzRWyJZLnhDU4Pl0tqN6wc2HS--Iiu2',
  EX030: '1rjA7EmdCtKxc9jqAWJgNsZNoixr5EvF4',
  EX031: '1PPiOtpI8u1Xpm54DJTuu9incqq1jzw4b',
  EX032: '1IVeRoLNxSzVoU46cPG87K4orNCAbzTCr',
  EX033: '1tu0iyFCTD7rGir_zm6gYwE85A5reV0lf',
  EX034: '1f-ME-bBzF0n9bbFdvVNrlqzB22dx5_fw',
  EX035: '1JkxQabt7N66BpKezaWykdsH99PbV3vjp',
  EX036: '1Ht8eLq11GX--JVVk4jnKeml9RSIWEHJS',
  EX037: '1GL7EipowUfQxTJ7IlSUXL3q2DmDb7_0s',
  EX038: '1QVfgBHcydLGXP-Tgg4WUzxuIxyrbaHD5',
  EX039: '1CmN1N2zn-Ev_Up2E-6YJHTQ2TFv98BFd',
  EX040: '19TbiyQW5bYqwMrIpQJCcVu_Kq1-W1t77',
  EX041: '1N6SwefPbMjcntnm-kqzXTwzoroj253mb',
  EX042: '1RFE3HI0ZFM-liJBiwxT1qjLsDjg1qzLD',
  EX043: '1VSbDqr-5-k8BWBri4wuzVXPMqqmyebZg',
  EX044: '1yaMapJXEOYWizxNznZ3rxEps9x-d-A-R',
  EX045: '1dQwN1hSBMabojKybBsM4xrmhsTvGjp1P',
  EX046: '1Biengv6pwOVBuhLccMKx9onNc7qb7mkF',
  EX047: '1PZFsyKIUbCqocrBwW9GiZ0cvFBuZMINd',
  EX048: '1EuyC4briY8_qZTZX-wzlFUktdDytf5Nj',
  EX049: '1RIWaW8EN3d76Bb1QBj8klpZTeAGT2qei',
  EX050: '1D9MAynFLaXmAQpUmRx3q8xjsqZ2h6E8T',
  EX051: '1cvjSw37QERdImi2dCo5r4S4wZM08JSPW',
  EX052: '1JfnNGTXQpC27OWg7MtZ87DXnx1sQvxhR',
  EX053: '1mXRffByv28zBZBjNdnAgtzVAsZ0ThDZ_',
  EX054: '1JBqlthlNzIN21vGcAYLEtHQQHJHctcom',
  EX055: '1FXmQKLryRkMXgqvWCsv3Y-JyG1OhXxWQ',
  EX056: '1-3LA8UzNxS5HXIm2HEaIoE-0c9yHMjFb',
}

// Extrait un Drive file ID depuis différents formats possibles :
// - Lien complet : https://drive.google.com/file/d/XXXX/view?usp=sharing
// - Lien uc     : https://drive.google.com/uc?id=XXXX
// - ID brut     : XXXX (chaîne sans slash)
export function extractDriveFileId(value) {
  if (!value) return null

  // Lien /file/d/{id}/
  const match1 = value.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (match1) return match1[1]

  // Lien ?id={id} ou &id={id}
  const match2 = value.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (match2) return match2[1]

  // ID brut (pas de slash, pas de point)
  if (/^[a-zA-Z0-9_-]{20,}$/.test(value.trim())) return value.trim()

  return null
}

// Retourne l'URL d'affichage de l'image pour un exercice donné.
// Priorité : 1) mapping hard-codé, 2) colonne schemaUrl du sheet
export function getSchemaImageUrl(exerciseId, schemaUrlFromSheet) {
  // 1. Mapping hard-codé (exercices existants)
  const hardCodedId = DRIVE_SCHEMA_IDS[exerciseId]
  if (hardCodedId) {
    return `https://drive.google.com/thumbnail?id=${hardCodedId}&sz=w1200`
  }

  // 2. Colonne schemaUrl du sheet (nouveaux exercices)
  const extractedId = extractDriveFileId(schemaUrlFromSheet)
  if (extractedId) {
    return `https://drive.google.com/thumbnail?id=${extractedId}&sz=w1200`
  }

  return null
}
