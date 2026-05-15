import { useEffect } from 'react'
import { CATEGORIES } from '../utils/filters'
import { getSchemaImageUrl } from '../data/driveSchemas'

export default function ExerciseModal({
  exercise,
  onClose,
  isFavorite,
  onToggleFavorite,
  isInSession,
  onAddToSession,
  onRemoveFromSession,
}) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const categories = CATEGORIES.filter(cat => exercise[cat.toLowerCase()] === true)
  const schemaImageUrl = getSchemaImageUrl(exercise.id, exercise.schemaUrl)
  const hasVideo = Boolean(exercise.schemaVideo)

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Fermer">×</button>

        {/* En-tête */}
        <header className="modal-header">
          <div className="modal-header-top">
            <span className="modal-id">{exercise.id}</span>
            <span className="modal-type">{exercise.type}</span>
          </div>
          <h2 className="modal-title">{exercise.titre}</h2>
          <div className="modal-categories">
            {categories.map(cat => (
              <span key={cat} className="category-badge">{cat}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              className={`modal-action-btn ${isFavorite ? 'modal-action-btn--active' : ''}`}
              onClick={() => onToggleFavorite(exercise.id)}
            >
              {isFavorite ? '★ Favori' : '☆ Ajouter aux favoris'}
            </button>

            {isInSession ? (
              <button
                className="modal-action-btn modal-action-btn--session-active"
                onClick={() => onRemoveFromSession(exercise.id)}
              >
                ✓ Dans la séance — Retirer
              </button>
            ) : (
              <button
                className="modal-action-btn modal-action-btn--session"
                onClick={() => onAddToSession(exercise)}
              >
                + Ajouter à la séance
              </button>
            )}
          </div>
        </header>

        {/* Corps */}
        <div className="modal-body">
          {/* Infos rapides */}
          <div className="modal-quick-info">
            <QuickInfo label="Durée" value={exercise.duree} />
            <QuickInfo label="Séquence" value={exercise.sequence} />
            <QuickInfo label="Effectif" value={exercise.effectif} />
            <QuickInfo label="Terrain" value={
              exercise.longueur && exercise.largeur
                ? `${exercise.longueur} × ${exercise.largeur} m`
                : exercise.longueur || exercise.largeur || null
            } />
            <QuickInfo label="Phase" value={exercise.phase} />
            <QuickInfo label="Principe" value={exercise.principe} />
            <QuickInfo label="Méthode" value={exercise.methodePedagogique} />
          </div>

          <Section label="Objectif principal" value={exercise.objectifPrincipal} highlight />
          <Section label="Consignes" value={exercise.consignes} />
          <Section label="But(s)" value={exercise.buts} />

          <div className="modal-objectives">
            <Section label="Objectifs techniques" value={exercise.objectifsTechniques} />
            <Section label="Objectifs tactiques" value={exercise.objectifsTactiques} />
            <Section label="Objectifs cognitifs" value={exercise.objectifsCognitifs} />
          </div>

          <div className="modal-variations">
            <Section label="Simplifications" value={exercise.simplifications} />
            <Section label="Complexifications" value={exercise.complexifications} />
          </div>

          <Section label="Critère de réussite" value={exercise.critereReussite} />

          {schemaImageUrl && (
            <div className="modal-schema">
              <h3 className="modal-section-title">Schéma</h3>
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
              <h3 className="modal-section-title">Vidéo</h3>
              <a
                href={exercise.schemaVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-video-link"
              >
                Voir la vidéo →
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
