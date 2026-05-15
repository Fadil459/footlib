import ExerciseCard from './ExerciseCard'

export default function ExerciseList({ exercises, onSelect, isFavorite, onToggleFavorite, isInSession, onAddToSession, t, lang }) {
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
          t={t}
          lang={lang}
        />
      ))}
    </div>
  )
}
