import { ChevronRight, Timer, MapPin } from 'lucide-react';
import { RunningWorkout } from '@/types/sports';
import { cn } from '@/lib/utils';

interface RunningWorkoutCardProps {
  workout: RunningWorkout;
  onClick: () => void;
}

const typeLabels = {
  continuous: 'Contínuo',
  interval: 'Intervalado',
  progressive: 'Progressivo',
  tempo: 'Tempo',
  recovery: 'Recuperação',
};

const terrainLabels = {
  road: 'Rua',
  treadmill: 'Esteira',
  trail: 'Trilha',
  track: 'Pista',
};

const intensityColors = {
  light: 'bg-success/20 text-success',
  moderate: 'bg-warning/20 text-warning',
  high: 'bg-destructive/20 text-destructive',
};

export function RunningWorkoutCard({ workout, onClick }: RunningWorkoutCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
        <span className="text-2xl">🏃</span>
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-foreground">{workout.name}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {terrainLabels[workout.terrain]}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Timer className="w-3 h-3" />
            ~{workout.totalDistance}km • {workout.estimatedMinutes}min
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={cn("text-xs px-2 py-0.5 rounded-full", intensityColors[workout.intensity])}>
          {typeLabels[workout.type]}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
