export default function SessionPanel({
  sessionExercises,
  totalDuration,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClear,
  onSelectExercise,
}) {
  function handlePrint() {
    window.print()
  }

  if (sessionExercises.length === 0) {
    return (
      <div className="session-panel session-panel-empty">
        <h2 className="session-title">Plan de séance</h2>
        <p className="session-empty-msg">
          Ajoutez des exercices depuis les fiches pour construire votre séance.
        </p>
      </div>
    )
  }

  return (
    <div className="session-panel">
      <div className="session-header">
        <h2 className="session-title">Plan de séance</h2>
        <span className="session-count">{sessionExercises.length} exercice{sessionExercises.length > 1 ? 's' : ''}</span>
      </div>

      <div className="session-duration">
        Durée totale estimée : <strong>{totalDuration > 0 ? `${totalDuration} min` : 'Non calculable'}</strong>
      </div>

      <ol className="session-list">
        {sessionExercises.map((ex, idx) => (
          <li key={ex.id} className="session-item">
            <div className="session-item-order">
              <button
                className="session-move-btn"
                onClick={() => onMoveUp(ex.id)}
                disabled={idx === 0}
                aria-label="Monter"
              >▲</button>
              <span className="session-item-num">{idx + 1}</span>
              <button
                className="session-move-btn"
                onClick={() => onMoveDown(ex.id)}
                disabled={idx === sessionExercises.length - 1}
                aria-label="Descendre"
              >▼</button>
            </div>

            <div className="session-item-info" onClick={() => onSelectExercise(ex)}>
              <span className="session-item-id">{ex.id}</span>
              <span className="session-item-title">{ex.titre}</span>
              {ex.duree && <span className="session-item-duration">{ex.duree}</span>}
            </div>

            <button
              className="session-remove-btn"
              onClick={() => onRemove(ex.id)}
              aria-label="Retirer de la séance"
            >×</button>
          </li>
        ))}
      </ol>

      <div className="session-actions">
        <button className="session-print-btn" onClick={handlePrint}>
          Imprimer / Enregistrer PDF
        </button>
        <button className="session-clear-btn" onClick={onClear}>
          Vider la séance
        </button>
      </div>
    </div>
  )
}
