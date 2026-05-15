import { CATEGORIES } from '../utils/filters'
import { getSchemaImageUrl } from '../data/driveSchemas'

export default function ExerciseCard({ exercise, onClick, isFavorite, onToggleFavorite, isInSession, onAddToSession }) {
  const categories = CATEGORIES.filter(cat => exercise[cat.toLowerCase()] === true)
  const hasSchema = Boolean(getSchemaImageUrl(exercise.id, exercise.schemaUrl))
  const hasVideo = Boolean(exercise.schemaVideo)

  function handleFavorite(e) {
    e.stopPropagation()
    onToggleFavorite(exercise.id)
  }

  function handleAddToSession(e) {
    e.stopPropagation()
    onAddToSession(exercise)
  }

  return (
    <article className="exercise-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="card-top">
        <span className="card-id">{exercise.id}</span>
        <div className="card-top-actions">
          <button
            className={`card-favorite-btn ${isFavorite ? 'card-favorite-btn--active' : ''}`}
            onClick={handleFavorite}
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <span className="card-type">{exercise.type}</span>
        </div>
      </div>

      <h2 className="card-title">{exercise.titre}</h2>

      {exercise.objectifPrincipal && (
        <p className="card-objective">{exercise.objectifPrincipal}</p>
      )}

      <div className="card-meta">
        {exercise.duree && <span className="card-meta-item">{exercise.duree}</span>}
        {exercise.effectif && <span className="card-meta-item">{exercise.effectif} joueurs</span>}
        {exercise.longueur && exercise.largeur && (
          <span className="card-meta-item">{exercise.longueur}×{exercise.largeur} m</span>
        )}
      </div>

      <div className="card-footer">
        <div className="card-categories">
          {categories.map(cat => (
            <span key={cat} className="category-badge">{cat}</span>
          ))}
        </div>
        <div className="card-footer-right">
          <div className="card-media-badges">
            {hasSchema && <span className="media-badge media-badge-schema">Schéma</span>}
            {hasVideo && <span className="media-badge media-badge-video">Vidéo</span>}
          </div>
          <button
            className={`card-session-btn ${isInSession ? 'card-session-btn--active' : ''}`}
            onClick={handleAddToSession}
            aria-label={isInSession ? 'Déjà dans la séance' : 'Ajouter à la séance'}
            title={isInSession ? 'Déjà dans la séance' : 'Ajouter à la séance'}
          >
            {isInSession ? '✓ Séance' : '+ Séance'}
          </button>
        </div>
      </div>
    </article>
  )
}
