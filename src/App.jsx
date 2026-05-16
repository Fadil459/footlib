import { useState, useMemo } from 'react'
import { useExercises } from './hooks/useExercises'
import { useFavorites } from './hooks/useFavorites'
import { useSessionPlan } from './hooks/useSessionPlan'
import { applyFilters, getUniqueValues, INITIAL_FILTERS, countActiveFilters } from './utils/filters'
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
  const [activeTab, setActiveTab] = useState('exercises')
  const [lang, setLang] = useState('fr')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const t = useTranslation(lang)
  const activeFilterCount = countActiveFilters(filters)

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

  const totalCount = activeTab === 'favorites'
    ? exercises.filter(ex => isFavorite(ex.id)).length
    : activeTab === 'new'
    ? newExercises.length
    : exercises.length

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="app-header-inner">
          <h1 className="app-title"><span className="app-wordmark">Foot<span className="app-lib">Lib</span></span></h1>
          <button
            className="lang-toggle"
            onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
            aria-label="Changer la langue"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>

        {/* Onglets desktop uniquement */}
        <nav className="app-tabs desktop-only">
          <button className={`app-tab ${activeTab === 'exercises' ? 'app-tab--active' : ''}`} onClick={() => setActiveTab('exercises')}>
            {t.tabExercises} ({exercises.length})
          </button>
          <button className={`app-tab ${activeTab === 'new' ? 'app-tab--active' : ''}`} onClick={() => setActiveTab('new')}>
            {t.tabNew}
          </button>
          <button className={`app-tab ${activeTab === 'favorites' ? 'app-tab--active' : ''}`} onClick={() => setActiveTab('favorites')}>
            {t.tabFavorites} ({favorites.length})
          </button>
          <button className={`app-tab ${activeTab === 'session' ? 'app-tab--active' : ''}`} onClick={() => setActiveTab('session')}>
            {t.tabSession} ({sessionExercises.length})
          </button>
        </nav>

        {/* Barre mobile : titre de l'onglet actif + bouton filtres */}
        {showSidebar && (
          <div className="mobile-toolbar mobile-only">
            <span className="mobile-tab-label">
              {activeTab === 'exercises' ? `${t.tabExercises} (${exercises.length})`
                : activeTab === 'new' ? t.tabNew
                : `${t.tabFavorites} (${favorites.length})`}
            </span>
            <button
              className={`mobile-filter-btn ${activeFilterCount > 0 ? 'mobile-filter-btn--active' : ''}`}
              onClick={() => setShowMobileFilters(true)}
            >
              Filtres {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
            </button>
          </div>
        )}
      </header>

      <div className="app-body">
        {/* Sidebar desktop */}
        {showSidebar && (
          <aside className="app-sidebar desktop-only">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onUpdate={updateFilter}
              onReset={resetFilters}
              resultCount={filteredExercises.length}
              totalCount={totalCount}
              t={t}
              lang={lang}
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

      {/* Bottom nav mobile */}
      <nav className="bottom-nav mobile-only">
        <button className={`bottom-nav-item ${activeTab === 'exercises' ? 'bottom-nav-item--active' : ''}`} onClick={() => setActiveTab('exercises')}>
          <span className="bottom-nav-icon">⚽</span>
          <span className="bottom-nav-label">{t.tabExercises}</span>
        </button>
        <button className={`bottom-nav-item ${activeTab === 'new' ? 'bottom-nav-item--active' : ''}`} onClick={() => setActiveTab('new')}>
          <span className="bottom-nav-icon">✨</span>
          <span className="bottom-nav-label">{t.tabNew}</span>
        </button>
        <button className={`bottom-nav-item ${activeTab === 'favorites' ? 'bottom-nav-item--active' : ''}`} onClick={() => setActiveTab('favorites')}>
          <span className="bottom-nav-icon">★</span>
          <span className="bottom-nav-label">{t.tabFavorites}</span>
          {favorites.length > 0 && <span className="bottom-nav-badge">{favorites.length}</span>}
        </button>
        <button className={`bottom-nav-item ${activeTab === 'session' ? 'bottom-nav-item--active' : ''}`} onClick={() => setActiveTab('session')}>
          <span className="bottom-nav-icon">📋</span>
          <span className="bottom-nav-label">{t.tabSession}</span>
          {sessionExercises.length > 0 && <span className="bottom-nav-badge">{sessionExercises.length}</span>}
        </button>
      </nav>

      {/* Bottom sheet filtres mobile */}
      {showMobileFilters && (
        <div className="filter-sheet-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="filter-sheet" onClick={e => e.stopPropagation()}>
            <div className="filter-sheet-header">
              <span className="filter-sheet-title">Filtres</span>
              <button className="filter-sheet-close" onClick={() => setShowMobileFilters(false)}>✕</button>
            </div>
            <div className="filter-sheet-body">
              <FilterPanel
                filters={filters}
                filterOptions={filterOptions}
                onUpdate={updateFilter}
                onReset={resetFilters}
                resultCount={filteredExercises.length}
                totalCount={totalCount}
                t={t}
              />
            </div>
            <div className="filter-sheet-footer">
              <button className="filter-sheet-apply" onClick={() => setShowMobileFilters(false)}>
                Voir les {filteredExercises.length} exercices
              </button>
            </div>
          </div>
        </div>
      )}

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
