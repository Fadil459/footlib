import { useState, useMemo } from 'react'
import { useExercises } from './hooks/useExercises'
import { useFavorites } from './hooks/useFavorites'
import { useSessionPlan } from './hooks/useSessionPlan'
import { applyFilters, getUniqueValues, INITIAL_FILTERS } from './utils/filters'
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
  const [activeTab, setActiveTab] = useState('exercises') // 'exercises' | 'session' | 'favorites'

  const filterOptions = useMemo(() => ({
    phases: getUniqueValues(exercises, 'phase'),
    types: getUniqueValues(exercises, 'type'),
    principes: getUniqueValues(exercises, 'principe'),
  }), [exercises])

  const filteredExercises = useMemo(() => {
    let list = exercises
    if (activeTab === 'favorites') {
      list = exercises.filter(ex => isFavorite(ex.id))
    }
    return applyFilters(list, filters)
  }, [exercises, filters, activeTab, favorites])

  function updateFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function resetFilters() {
    setFilters(INITIAL_FILTERS)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title">Bibliothèque d'exercices de football</h1>
        </div>
        <nav className="app-tabs">
          <button
            className={`app-tab ${activeTab === 'exercises' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('exercises')}
          >
            Exercices ({exercises.length})
          </button>
          <button
            className={`app-tab ${activeTab === 'favorites' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favoris ({favorites.length})
          </button>
          <button
            className={`app-tab ${activeTab === 'session' ? 'app-tab--active' : ''}`}
            onClick={() => setActiveTab('session')}
          >
            Séance ({sessionExercises.length})
          </button>
        </nav>
      </header>

      <div className="app-body">
        {activeTab !== 'session' && (
          <aside className="app-sidebar">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onUpdate={updateFilter}
              onReset={resetFilters}
              resultCount={filteredExercises.length}
              totalCount={activeTab === 'favorites' ? exercises.filter(ex => isFavorite(ex.id)).length : exercises.length}
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
              onSelectExercise={setSelectedExercise}
            />
          ) : (
            <>
              {loading && <div className="status-loading"><p>Chargement des exercices…</p></div>}
              {error && <div className="status-error"><p>Erreur : {error}</p></div>}
              {!loading && !error && (
                <ExerciseList
                  exercises={filteredExercises}
                  onSelect={setSelectedExercise}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  isInSession={isInSession}
                  onAddToSession={addToSession}
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
          onAddToSession={addToSession}
          onRemoveFromSession={removeFromSession}
        />
      )}
    </div>
  )
}
