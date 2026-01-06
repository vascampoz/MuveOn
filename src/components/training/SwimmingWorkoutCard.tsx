import { ChevronRight, Waves, Clock, Ruler } from 'lucide-react';
import { SwimmingWorkout } from '@/types/sports';
import { cn } from '@/lib/utils';

interface SwimmingWorkoutCardProps {
  workout: SwimmingWorkout;
  onClick: () => void;
}

const goalLabels = {
  endurance: 'Resistência',
  technique: 'Técnica',
  speed: 'Velocidade',
};

const intensityColors = {
  light: 'bg-success/20 text-success',
  moderate: 'bg-warning/20 text-warning',
  high: 'bg-destructive/20 text-destructive',
};

export function SwimmingWorkoutCard({ workout, onClick }: SwimmingWorkoutCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
        <Waves className="w-6 h-6 text-info" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-semibold text-foreground">{workout.name}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Ruler className="w-3 h-3" />
            {workout.totalDistance}m
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{workout.estimatedMinutes}min
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={cn("text-xs px-2 py-0.5 rounded-full", intensityColors[workout.intensity])}>
          {goalLabels[workout.goal]}
        </span>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
