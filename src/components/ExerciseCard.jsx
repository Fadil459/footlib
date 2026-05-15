import { CATEGORIES } from '../utils/filters'
import { getSchemaImageUrl } from '../data/driveSchemas'

export default function ExerciseCard({ exercise, onClick, isFavorite, onToggleFavorite, isInSession, onAddToSession, t, lang }) {
  const categories = CATEGORIES.filter(cat => exercise[cat.toLowerCase()] === true)
  const hasSchema = Boolean(getSchemaImageUrl(exercise.id, exercise.schemaUrl))
  const hasVideo = Boolean(exercise.schemaVideo)

  const titre = (lang === 'en' && exercise.titreEn) ? exercise.titreEn : exercise.titre
  const objectif = (lang === 'en' && exercise.objectifPrincipalEn) ? exercise.objectifPrincipalEn : exercise.objectifPrincipal

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
            aria-label={isFavorite ? t.removeFavorite : t.addFavorite}
            title={isFavorite ? t.removeFavorite : t.addFavorite}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <span className="card-type">{exercise.type}</span>
        </div>
      </div>

      <h2 className="card-title">{titre}</h2>

      {objectif && (
        <p className="card-objective">{objectif}</p>
      )}

      <div className="card-meta">
        {exercise.duree && <span className="card-meta-item">{exercise.duree}</span>}
        {exercise.effectif && <span className="card-meta-item">{exercise.effectif} {t.players}</span>}
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
            {hasSchema && <span className="media-badge media-badge-schema">{t.schema}</span>}
            {hasVideo && <span className="media-badge media-badge-video">{t.video}</span>}
          </div>
          <button
            className={`card-session-btn ${isInSession ? 'card-session-btn--active' : ''}`}
            onClick={handleAddToSession}
            aria-label={isInSession ? t.inSession : t.addSession}
            title={isInSession ? t.inSession : t.addSession}
          >
            {isInSession ? t.inSession : t.addSession}
          </button>
        </div>
      </div>
    </article>
  )
}
