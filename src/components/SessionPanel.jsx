export default function SessionPanel({
  sessionExercises,
  totalDuration,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClear,
  onSelectExercise,
  onPrint,
  t,
  lang,
}) {
  function handlePrint() {
    onPrint?.()
    window.print()
  }

  if (sessionExercises.length === 0) {
    return (
      <div className="session-panel session-panel-empty">
        <h2 className="session-title">{t.sessionTitle}</h2>
        <p className="session-empty-msg">{t.sessionEmpty}</p>
      </div>
    )
  }

  return (
    <div className="session-panel">
      <div className="session-header">
        <h2 className="session-title">{t.sessionTitle}</h2>
        <span className="session-count">
          {sessionExercises.length} {t.exercises}
        </span>
      </div>

      <div className="session-duration">
        {t.totalDuration} : <strong>{totalDuration > 0 ? `${totalDuration} min` : t.notCalculable}</strong>
      </div>

      <ol className="session-list">
        {sessionExercises.map((ex, idx) => {
          const titre = (lang === 'en' && ex.titreEn) ? ex.titreEn : ex.titre
          return (
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
                <span className="session-item-title">{titre}</span>
                {ex.duree && <span className="session-item-duration">{ex.duree}</span>}
              </div>

              <button
                className="session-remove-btn"
                onClick={() => onRemove(ex.id)}
                aria-label="Retirer de la séance"
              >×</button>
            </li>
          )
        })}
      </ol>

      <div className="session-actions">
        <button className="session-print-btn" onClick={handlePrint}>
          {t.printSession}
        </button>
        <button className="session-clear-btn" onClick={onClear}>
          {t.clearSession}
        </button>
      </div>
    </div>
  )
}
