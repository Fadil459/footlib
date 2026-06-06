import { useEffect, useState } from 'react'
import { CATEGORIES } from '../utils/filters'
import { getSchemaImageUrl } from '../data/driveSchemas'
import { translateField } from '../utils/fieldTranslations'

export default function ExerciseModal({
  exercise,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInSession,
  onAddToSession,
  onRemoveFromSession,
  t,
  lang,
}) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const categories = CATEGORIES.filter(cat => exercise[cat.toLowerCase()] === true)
  const schemaImageUrl = getSchemaImageUrl(exercise.id, exercise.schemaUrl)
  const hasVideo = Boolean(exercise.schemaVideo)

  const [copied, setCopied] = useState(false)

  function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}?ex=${exercise.id}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Use EN content if available and lang === 'en'
  const en = lang === 'en'
  const titre = (en && exercise.titreEn) ? exercise.titreEn : exercise.titre

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">×</button>

        <header className="modal-header">
          <div className="modal-header-top">
            <span className="modal-id">{exercise.id}</span>
            <span className="modal-type">{translateField(exercise.type, lang)}</span>
          </div>
          <h2 className="modal-title">{titre}</h2>
          <div className="modal-categories">
            {categories.map(cat => (
              <span key={cat} className="category-badge">{cat}</span>
            ))}
          </div>

          <div className="modal-actions">
            <button
              className={`modal-action-btn ${isFavorite ? 'modal-action-btn--active' : ''}`}
              onClick={() => onToggleFavorite(exercise.id)}
            >
              {isFavorite ? `★ ${t.removeFavorite}` : `☆ ${t.addFavorite}`}
            </button>

            <button className="modal-action-btn modal-action-btn--share" onClick={handleShare}>
              {copied ? t.linkCopied : `↗ ${t.share}`}
            </button>

            {isInSession ? (
              <button
                className="modal-action-btn modal-action-btn--session-active"
                onClick={() => onRemoveFromSession(exercise.id)}
              >
                {t.removeFromSession}
              </button>
            ) : (
              <button
                className="modal-action-btn modal-action-btn--session"
                onClick={() => onAddToSession(exercise)}
              >
                {t.addToSession}
              </button>
            )}
          </div>
        </header>

        <div className="modal-body">
          <div className="modal-quick-info">
            <QuickInfo label={t.duration} value={exercise.duree} />
            <QuickInfo label={t.sequence} value={exercise.sequence} />
            <QuickInfo label={t.players_label} value={exercise.effectif} />
            <QuickInfo label={t.field} value={
              exercise.longueur && exercise.largeur
                ? `${exercise.longueur} × ${exercise.largeur} m`
                : exercise.longueur || exercise.largeur || null
            } />
            <QuickInfo label={t.phase} value={translateField(exercise.phase, lang)} />
            <QuickInfo label={t.principle} value={translateField(exercise.principe, lang)} />
            <QuickInfo label={t.method} value={translateField(exercise.methodePedagogique, lang)} />
          </div>

          {(() => {
            const objectifPrincipal = (en && exercise.objectifPrincipalEn) ? exercise.objectifPrincipalEn : exercise.objectifPrincipal
            const consignes = (en && exercise.consignesEn) ? exercise.consignesEn : exercise.consignes
            const buts = (en && exercise.butsEn) ? exercise.butsEn : exercise.buts
            const oTech = (en && exercise.objectifsTechniquesEn) ? exercise.objectifsTechniquesEn : exercise.objectifsTechniques
            const oTact = (en && exercise.objectifsTactiquesEn) ? exercise.objectifsTactiquesEn : exercise.objectifsTactiques
            const oCog = (en && exercise.objectifsCognitifsEn) ? exercise.objectifsCognitifsEn : exercise.objectifsCognitifs
            const simpl = (en && exercise.simplificationsEn) ? exercise.simplificationsEn : exercise.simplifications
            const compl = (en && exercise.complexificationsEn) ? exercise.complexificationsEn : exercise.complexifications
            const critere = (en && exercise.critereReussiteEn) ? exercise.critereReussiteEn : exercise.critereReussite
            const hasObjectives = Boolean(oTech || oTact || oCog)
            const hasVariations = Boolean(simpl || compl)
            return (
              <>
                <Accordion label={t.mainObjective} defaultOpen highlight show={Boolean(objectifPrincipal)}>
                  <div className="modal-section-value">{objectifPrincipal}</div>
                </Accordion>
                <Accordion label={t.instructions} defaultOpen show={Boolean(consignes)}>
                  <div className="modal-section-value">{consignes}</div>
                </Accordion>
                <Accordion label={t.goals} show={Boolean(buts)}>
                  <div className="modal-section-value">{buts}</div>
                </Accordion>
                <Accordion label={t.objectivesGroup} show={hasObjectives}>
                  <div className="modal-objectives">
                    <Section label={t.technicalObjectives} value={oTech} />
                    <Section label={t.tacticalObjectives} value={oTact} />
                    <Section label={t.cognitiveObjectives} value={oCog} />
                  </div>
                </Accordion>
                <Accordion label={t.variationsGroup} show={hasVariations}>
                  <div className="modal-variations">
                    <Section label={t.simplifications} value={simpl} />
                    <Section label={t.complexifications} value={compl} />
                  </div>
                </Accordion>
                <Accordion label={t.successCriteria} show={Boolean(critere)}>
                  <div className="modal-section-value">{critere}</div>
                </Accordion>
              </>
            )
          })()}

          {schemaImageUrl && (
            <div className="modal-schema">
              <h3 className="modal-section-title">{t.schema}</h3>
              <img
                src={schemaImageUrl}
                alt={`Schéma de l'exercice ${exercise.id}`}
                className="modal-schema-image"
                loading="lazy"
              />
            </div>
          )}

          {hasVideo && (
            <div className="modal-video">
              <h3 className="modal-section-title">{t.video}</h3>
              <a
                href={exercise.schemaVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-video-link"
              >
                {t.watchVideo}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Accordion({ label, children, defaultOpen = false, highlight = false, show = true }) {
  if (!show) return null
  return (
    <details className={`modal-acc ${highlight ? 'modal-acc-highlight' : ''}`} open={defaultOpen}>
      <summary className="modal-acc-summary">
        <span className="modal-acc-label">{label}</span>
        <span className="modal-acc-chevron" aria-hidden="true">▾</span>
      </summary>
      <div className="modal-acc-content">{children}</div>
    </details>
  )
}

function Section({ label, value, highlight }) {
  if (!value) return null
  return (
    <div className={`modal-section ${highlight ? 'modal-section-highlight' : ''}`}>
      <dt className="modal-section-label">{label}</dt>
      <dd className="modal-section-value">{value}</dd>
    </div>
  )
}

function QuickInfo({ label, value }) {
  if (!value) return null
  return (
    <div className="quick-info-item">
      <span className="quick-info-label">{label}</span>
      <span className="quick-info-value">{value}</span>
    </div>
  )
}
