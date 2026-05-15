import ExerciseCard from './ExerciseCard'

export default function ExerciseList({ exercises, onSelect, isFavorite, onToggleFavorite, isInSession, onAddToSession }) {
  if (exercises.length === 0) {
    return (
      <div className="no-results">
        <p>Aucun exercice ne correspond aux filtres sélectionnés.</p>
      </div>
    )
  }

  return (
    <div className="exercise-list">
      {exercises.map(exercise => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onClick={() => onSelect(exercise)}
          isFavorite={isFavorite(exercise.id)}
          onToggleFavorite={onToggleFavorite}
          isInSession={isInSession(exercise.id)}
          onAddToSession={onAddToSession}
        />
      ))}
    </div>
  )
}
