import { ChevronRight } from 'lucide-react';
import { Workout } from '@/types/fitness';

interface WorkoutCardProps {
  workout: Workout;
  onClick: () => void;
  isToday?: boolean;
}

export function WorkoutCard({ workout, onClick, isToday }: WorkoutCardProps) {
  const badgeColors: Record<string, string> = {
    A: 'workout-badge-a',
    B: 'workout-badge-b',
    C: 'workout-badge-c',
    D: 'workout-badge-d',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${
        isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
    >
      <div className={`workout-badge ${badgeColors[workout.letter]}`}>
        {workout.letter}
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-foreground">{workout.name}</h3>
        <p className="text-sm text-muted-foreground">
          {workout.exercises.length} exercícios
        </p>
      </div>
      {isToday && (
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
          Hoje
        </span>
      )}
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
