import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { Exercise } from '@/types/fitness';

interface ExerciseItemProps {
  exercise: Exercise;
  onWeightChange: (exerciseId: string, weight: number) => void;
  onComplete: (exerciseId: string, completed: boolean) => void;
  initialWeight?: number;
  completed?: boolean;
}

export function ExerciseItem({ 
  exercise, 
  onWeightChange, 
  onComplete,
  initialWeight = 0,
  completed = false 
}: ExerciseItemProps) {
  const [weight, setWeight] = useState(initialWeight);
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleWeightChange = (delta: number) => {
    const newWeight = Math.max(0, weight + delta);
    setWeight(newWeight);
    onWeightChange(exercise.id, newWeight);
  };

  const handleComplete = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    onComplete(exercise.id, newCompleted);
  };

  return (
    <div className={`glass-card p-4 transition-all duration-300 ${
      isCompleted ? 'opacity-60 scale-[0.98]' : ''
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={handleComplete}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isCompleted 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
          }`}
        >
          <Check className={`w-5 h-5 transition-transform ${isCompleted ? 'scale-100' : 'scale-75'}`} />
        </button>
        
        <div className="flex-1">
          <h4 className={`font-medium transition-all ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
            {exercise.name}
          </h4>
          <p className="text-sm text-muted-foreground">
            {exercise.sets} séries × {exercise.reps} reps
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleWeightChange(-2.5)}
            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            disabled={isCompleted}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <div className="w-16 text-center">
            <span className="text-lg font-bold text-primary">{weight}</span>
            <span className="text-xs text-muted-foreground ml-1">kg</span>
          </div>
          
          <button
            onClick={() => handleWeightChange(2.5)}
            className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            disabled={isCompleted}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
