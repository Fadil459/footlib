import { useEffect } from 'react'
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

          <Section
            label={t.mainObjective}
            value={(en && exercise.objectifPrincipalEn) ? exercise.objectifPrincipalEn : exercise.objectifPrincipal}
            highlight
          />
          <Section
            label={t.instructions}
            value={(en && exercise.consignesEn) ? exercise.consignesEn : exercise.consignes}
          />
          <Section
            label={t.goals}
            value={(en && exercise.butsEn) ? exercise.butsEn : exercise.buts}
          />

          <div className="modal-objectives">
            <Section
              label={t.technicalObjectives}
              value={(en && exercise.objectifsTechniquesEn) ? exercise.objectifsTechniquesEn : exercise.objectifsTechniques}
            />
            <Section
              label={t.tacticalObjectives}
              value={(en && exercise.objectifsTactiquesEn) ? exercise.objectifsTactiquesEn : exercise.objectifsTactiques}
            />
            <Section
              label={t.cognitiveObjectives}
              value={(en && exercise.objectifsCognitifsEn) ? exercise.objectifsCognitifsEn : exercise.objectifsCognitifs}
            />
          </div>

          <div className="modal-variations">
            <Section
              label={t.simplifications}
              value={(en && exercise.simplificationsEn) ? exercise.simplificationsEn : exercise.simplifications}
            />
            <Section
              label={t.complexifications}
              value={(en && exercise.complexificationsEn) ? exercise.complexificationsEn : exercise.complexifications}
            />
          </div>

          <Section
            label={t.successCriteria}
            value={(en && exercise.critereReussiteEn) ? exercise.critereReussiteEn : exercise.critereReussite}
          />

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
