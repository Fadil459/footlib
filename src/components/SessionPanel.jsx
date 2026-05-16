import { CATEGORIES } from '../utils/filters'
import { getSchemaImageUrl } from '../data/driveSchemas'
import { translateField } from '../utils/fieldTranslations'

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
              {/* Vue écran compacte */}
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

              {/* Vue impression complète */}
              <div className="print-exercise">
                <PrintExercise ex={ex} idx={idx} t={t} lang={lang} />
              </div>
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

function PrintExercise({ ex, idx, t, lang }) {
  const en = lang === 'en'
  const categories = CATEGORIES.filter(cat => ex[cat.toLowerCase()] === true)
  const schemaImageUrl = getSchemaImageUrl(ex.id, ex.schemaUrl)
  const titre = (en && ex.titreEn) ? ex.titreEn : ex.titre

  return (
    <div className="print-ex">
      <div className="print-ex-header">
        <span className="print-ex-num">{idx + 1}</span>
        <div className="print-ex-header-info">
          <div className="print-ex-meta-row">
            <span className="print-ex-id">{ex.id}</span>
            {ex.type && <span className="print-ex-type">{translateField(ex.type, lang)}</span>}
            {categories.map(cat => (
              <span key={cat} className="print-ex-cat">{cat}</span>
            ))}
          </div>
          <h3 className="print-ex-title">{titre}</h3>
        </div>
      </div>

      <div className="print-ex-quickinfo">
        {ex.duree && <PrintInfo label={t.duration} value={ex.duree} />}
        {ex.effectif && <PrintInfo label={t.players_label} value={ex.effectif} />}
        {ex.longueur && ex.largeur && <PrintInfo label={t.field} value={`${ex.longueur}×${ex.largeur} m`} />}
        {ex.sequence && <PrintInfo label={t.sequence} value={ex.sequence} />}
        {ex.phase && <PrintInfo label={t.phase} value={translateField(ex.phase, lang)} />}
        {ex.principe && <PrintInfo label={t.principle} value={translateField(ex.principe, lang)} />}
        {ex.methodePedagogique && <PrintInfo label={t.method} value={translateField(ex.methodePedagogique, lang)} />}
      </div>

      <PrintSection label={t.mainObjective} value={(en && ex.objectifPrincipalEn) ? ex.objectifPrincipalEn : ex.objectifPrincipal} highlight />
      <PrintSection label={t.instructions} value={(en && ex.consignesEn) ? ex.consignesEn : ex.consignes} />
      <PrintSection label={t.goals} value={(en && ex.butsEn) ? ex.butsEn : ex.buts} />

      <div className="print-ex-grid">
        <PrintSection label={t.technicalObjectives} value={(en && ex.objectifsTechniquesEn) ? ex.objectifsTechniquesEn : ex.objectifsTechniques} />
        <PrintSection label={t.tacticalObjectives} value={(en && ex.objectifsTactiquesEn) ? ex.objectifsTactiquesEn : ex.objectifsTactiques} />
        <PrintSection label={t.cognitiveObjectives} value={(en && ex.objectifsCognitifsEn) ? ex.objectifsCognitifsEn : ex.objectifsCognitifs} />
      </div>

      <div className="print-ex-grid">
        <PrintSection label={t.simplifications} value={(en && ex.simplificationsEn) ? ex.simplificationsEn : ex.simplifications} />
        <PrintSection label={t.complexifications} value={(en && ex.complexificationsEn) ? ex.complexificationsEn : ex.complexifications} />
      </div>

      <PrintSection label={t.successCriteria} value={(en && ex.critereReussiteEn) ? ex.critereReussiteEn : ex.critereReussite} />

      {schemaImageUrl && (
        <div className="print-ex-schema">
          <span className="print-ex-label">{t.schema}</span>
          <img src={schemaImageUrl} alt={`Schéma ${ex.id}`} className="print-ex-schema-img" />
        </div>
      )}
    </div>
  )
}

function PrintInfo({ label, value }) {
  return (
    <span className="print-ex-info-item">
      <span className="print-ex-info-label">{label}</span>
      <span className="print-ex-info-value">{value}</span>
    </span>
  )
}

function PrintSection({ label, value, highlight }) {
  if (!value) return null
  return (
    <div className={`print-ex-section${highlight ? ' print-ex-section--highlight' : ''}`}>
      <span className="print-ex-label">{label}</span>
      <span className="print-ex-value">{value}</span>
    </div>
  )
}
