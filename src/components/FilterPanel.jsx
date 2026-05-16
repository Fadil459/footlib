import { useState } from 'react'
import { CATEGORIES, countActiveFilters } from '../utils/filters'
import { translateField } from '../utils/fieldTranslations'

export default function FilterPanel({
  filters,
  filterOptions,
  onUpdate,
  onReset,
  resultCount,
  totalCount,
  t,
  lang,
}) {
  const activeCount = countActiveFilters(filters)

  function toggleCategory(cat) {
    const current = filters.categories
    const next = current.includes(cat)
      ? current.filter(v => v !== cat)
      : [...current, cat]
    onUpdate('categories', next)
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <span className="filter-result-count">
          {resultCount} / {totalCount}
        </span>
        {activeCount > 0 && (
          <button className="filter-reset-btn" onClick={onReset}>
            {t.filterReset} ({activeCount})
          </button>
        )}
      </div>

      <div className="filter-search">
        <input
          type="search"
          className="filter-search-input"
          placeholder={t.filterSearch}
          value={filters.search}
          onChange={e => onUpdate('search', e.target.value)}
        />
      </div>

      {/* Catégories — dropdown multi-select custom */}
      <div className="filter-group">
        <h3 className="filter-group-title">{t.filterCategory}</h3>
        <MultiSelectDropdown
          options={CATEGORIES}
          selected={filters.categories}
          onToggle={toggleCategory}
          placeholder={t.filterCategory}
        />
      </div>

      {/* Type — select natif */}
      <div className="filter-group">
        <h3 className="filter-group-title">{t.filterType}</h3>
        <select
          className="filter-select"
          value={filters.type}
          onChange={e => onUpdate('type', e.target.value)}
        >
          <option value="">— {t.filterType} —</option>
          {filterOptions.types.map(opt => (
            <option key={opt} value={opt}>{translateField(opt, lang)}</option>
          ))}
        </select>
      </div>

      {/* Phase de jeu — select natif */}
      <div className="filter-group">
        <h3 className="filter-group-title">{t.filterPhase}</h3>
        <select
          className="filter-select"
          value={filters.phase}
          onChange={e => onUpdate('phase', e.target.value)}
        >
          <option value="">— {t.filterPhase} —</option>
          {filterOptions.phases.map(opt => (
            <option key={opt} value={opt}>{translateField(opt, lang)}</option>
          ))}
        </select>
      </div>

      {/* Principe de jeu — select natif */}
      <div className="filter-group">
        <h3 className="filter-group-title">{t.filterPrinciple}</h3>
        <select
          className="filter-select"
          value={filters.principe}
          onChange={e => onUpdate('principe', e.target.value)}
        >
          <option value="">— {t.filterPrinciple} —</option>
          {filterOptions.principes.map(opt => (
            <option key={opt} value={opt}>{translateField(opt, lang)}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

function MultiSelectDropdown({ options, selected, onToggle, placeholder }) {
  const [open, setOpen] = useState(false)
  const label = selected.length === 0
    ? `— ${placeholder} —`
    : selected.join(', ')

  return (
    <div className="multiselect">
      <button
        className={`multiselect-toggle ${open ? 'multiselect-toggle--open' : ''} ${selected.length > 0 ? 'multiselect-toggle--active' : ''}`}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        <span className="multiselect-label">{label}</span>
        <span className="multiselect-arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="multiselect-dropdown">
          {options.map(opt => (
            <label key={opt} className="multiselect-option">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
