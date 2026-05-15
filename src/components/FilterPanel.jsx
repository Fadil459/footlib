import { CATEGORIES, countActiveFilters } from '../utils/filters'

export default function FilterPanel({
  filters,
  filterOptions,
  onUpdate,
  onReset,
  resultCount,
  totalCount,
  t,
}) {
  const activeCount = countActiveFilters(filters)

  function toggleArrayFilter(key, value) {
    const current = filters[key]
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onUpdate(key, next)
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <span className="filter-result-count">
          {resultCount} / {totalCount} {t.exercises}
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

      <FilterGroup
        title={t.filterCategory}
        options={CATEGORIES}
        selected={filters.categories}
        onToggle={v => toggleArrayFilter('categories', v)}
      />

      <FilterGroup
        title={t.filterType}
        options={filterOptions.types}
        selected={filters.types}
        onToggle={v => toggleArrayFilter('types', v)}
      />

      <FilterGroup
        title={t.filterPhase}
        options={filterOptions.phases}
        selected={filters.phases}
        onToggle={v => toggleArrayFilter('phases', v)}
      />

      <FilterGroup
        title={t.filterPrinciple}
        options={filterOptions.principes}
        selected={filters.principes}
        onToggle={v => toggleArrayFilter('principes', v)}
      />
    </div>
  )
}

function FilterGroup({ title, options, selected, onToggle }) {
  if (options.length === 0) return null

  return (
    <div className="filter-group">
      <h3 className="filter-group-title">{title}</h3>
      <ul className="filter-options-list">
        {options.map(option => (
          <li key={option} className="filter-option-item">
            <label className="filter-option-label">
              <input
                type="checkbox"
                className="filter-option-checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
              <span className="filter-option-text">{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
