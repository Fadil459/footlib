import { useState, useMemo } from 'react'
import { useExercises } from './hooks/useExercises'
import { useFavorites } from './hooks/useFavorites'
import { useSessionPlan } from './hooks/useSessionPlan'
import { applyFilters, getUniqueValues, INITIAL_FILTERS } from './utils/filters'
import { trackExerciseView, trackAddToSession, trackSessionPrint } from './utils/analytics'
import { useTranslation } from './utils/translations'
import FilterPanel from './components/FilterPanel'
import ExerciseList from './components/ExerciseList'
import ExerciseModal from './components/ExerciseModal'
import SessionPanel from './components/SessionPanel'

export default function App() {
  const { exercises, loading, error } = useExercises()
  const { isFavorite, toggleFavorite, favorites } = useFavorites()
  const {
    sessionExercises,
    totalDuration,
    addToSession,
    removeFromSession,
    moveUp,
    moveDown,
    clearSession,
    isInSession,
  } = useSessionPlan()

  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [activeTab, setActiveTab] = useState('exercises') // 'exercises' | 'favorites' | 'session' | 'new'
  const [lang, setLang] = useState('fr')

  const t = useTranslation(lang)

  const filterOptions = useMemo(() => ({
    phases: getUniqueValues(exercises, 'phase'),
    types: getUniqueValues(exercises, 'type'),
    principes: getUniqueValues(exercises, 'principe'),
  }), [exercises])

  const newExercises = useMemo(() => {
    return [...exercises]
      .sort((a, b) => {
        const numA = parseInt(a.id.replace('EX', ''), 10)
        const numB = parseInt(b.id.replace('EX', ''), 10)
        return numB - numA
      })
      .slice(0, 10)
  }, [exercises])

  const filteredExercises = useMemo(() => {
    let list = exercises
    if (activeTab === 'favorites') list = exercises.filter(ex => isFavorite(ex.id))
    if (activeTab === 'new') list = newExercises
    return applyFilters(list, filters)
  }, [exercises, filters, activeTab, favorites, newExercises])

  function openExercise(exercise) {
    setSelectedExercise(exercise)
    trackExerciseView(exercise)
  }

  function handleAddToSession(exercise) {
    addToSession(exercise)
    trackAddToSession(exercise)
  }

  function updateFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS)
  }

  const showSidebar = activeTab !== 'session'

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">{t.appTitle}</h1>
          <button
            className="lang-toggle"
            onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
            aria-label="Changer la langue"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>
        <nav className="app-tabs">
          <button
            className={`app-tab ${activeTab === 'exercises' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('exercises')}
          >
            {t.tabExercises} ({exercises.length})
          </button>
          <button
            className={`app-tab ${activeTab === 'new' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            {t.tabNew}
          </button>
          <button
            className={`app-tab ${activeTab === 'favorites' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            {t.tabFavorites} ({favorites.length})
          </button>
          <button
            className={`app-tab ${activeTab === 'session' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('session')}
          >
            {t.tabSession} ({sessionExercises.length})
          </button>
        </nav>
      </header>

      <div className="app-body">
        {showSidebar && (
          <aside className="app-sidebar">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onUpdate={updateFilter}
              onReset={resetFilters}
              resultCount={filteredExercises.length}
              totalCount={
                activeTab === 'favorites'
                  ? exercises.filter(ex => isFavorite(ex.id)).length
                  : activeTab === 'new'
                  ? newExercises.length
                  : exercises.length
              }
              t={t}
            />
          </aside>
        )}

        <main className="app-content">
          {activeTab === 'session' ? (
            <SessionPanel
              sessionExercises={sessionExercises}
              totalDuration={totalDuration}
              onRemove={removeFromSession}
              onMoveUp={moveUp}
              onMoveDown={moveDown}
              onClear={clearSession}
              onSelectExercise={openExercise}
              onPrint={() => trackSessionPrint(sessionExercises.length, totalDuration)}
              t={t}
              lang={lang}
            />
          ) : (
            <>
              {loading && <div className="status-loading"><p>{t.loading}</p></div>}
              {error && <div className="status-error"><p>Erreur : {error}</p></div>}
              {!loading && !error && filteredExercises.length === 0 && (
                <div className="status-empty">
                  <p>
                    {activeTab === 'favorites' ? t.noFavorites
                      : activeTab === 'new' ? t.noNew
                      : t.noResults}
                  </p>
                </div>
              )}
              {!loading && !error && filteredExercises.length > 0 && (
                <ExerciseList
                  exercises={filteredExercises}
                  onSelect={openExercise}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  isInSession={isInSession}
                  onAddToSession={handleAddToSession}
                  t={t}
                  lang={lang}
                />
              )}
            </>
          )}
        </main>
      </div>

      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          isFavorite={isFavorite(selectedExercise.id)}
          onToggleFavorite={toggleFavorite}
          isInSession={isInSession(selectedExercise.id)}
          onAddToSession={handleAddToSession}
          onRemoveFromSession={removeFromSession}
          t={t}
          lang={lang}
        />
      )}
    </div>
  )
}
