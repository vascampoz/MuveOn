import { useState } from 'react';
import { ArrowLeft, Coffee, Check, Trophy } from 'lucide-react';
import { WorkoutCard } from '@/components/WorkoutCard';
import { ExerciseItem } from '@/components/ExerciseItem';
import { Workout } from '@/types/fitness';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface WorkoutViewProps {
  workouts: Workout[];
  onLogWorkout: (letter: 'A' | 'B' | 'C' | 'D' | 'REST', exercises: { exerciseId: string; weight: number; completed: boolean }[]) => void;
}

export function WorkoutView({ workouts, onLogWorkout }: WorkoutViewProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [exerciseData, setExerciseData] = useState<Map<string, { weight: number; completed: boolean }>>(new Map());

  const handleWeightChange = (exerciseId: string, weight: number) => {
    setExerciseData(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(exerciseId) || { weight: 0, completed: false };
      newMap.set(exerciseId, { ...current, weight });
      return newMap;
    });
  };

  const handleComplete = (exerciseId: string, completed: boolean) => {
    setExerciseData(prev => {
      const newMap = new Map(prev);
      const current = newMap.get(exerciseId) || { weight: 0, completed: false };
      newMap.set(exerciseId, { ...current, completed });
      return newMap;
    });
  };

  const handleFinishWorkout = () => {
    if (!selectedWorkout) return;

    const exercises = Array.from(exerciseData.entries()).map(([exerciseId, data]) => ({
      exerciseId,
      weight: data.weight,
      completed: data.completed,
    }));

    onLogWorkout(selectedWorkout.letter, exercises);
    
    toast({
      title: "Treino Concluído! 🎉",
      description: `+50 XP ganhos pelo treino ${selectedWorkout.letter}`,
    });

    setSelectedWorkout(null);
    setExerciseData(new Map());
  };

  const handleRestDay = () => {
    onLogWorkout('REST', []);
    toast({
      title: "Dia de Descanso ☕",
      description: "Descanse bem para o próximo treino!",
    });
  };

  const completedCount = Array.from(exerciseData.values()).filter(e => e.completed).length;
  const totalExercises = selectedWorkout?.exercises.length || 0;

  if (selectedWorkout) {
    return (
      <div className="space-y-4 pb-24 animate-slide-up">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSelectedWorkout(null);
              setExerciseData(new Map());
            }}
            className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold font-display text-foreground">
              Treino {selectedWorkout.letter}
            </h1>
            <p className="text-sm text-muted-foreground">{selectedWorkout.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{completedCount}/{totalExercises}</p>
            <p className="text-xs text-muted-foreground">concluídos</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / totalExercises) * 100}%` }}
          />
        </div>

        {/* Exercises */}
        <div className="space-y-3">
          {selectedWorkout.exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onWeightChange={handleWeightChange}
              onComplete={handleComplete}
              initialWeight={exercise.weight}
              completed={exerciseData.get(exercise.id)?.completed || false}
            />
          ))}
        </div>

        {/* Finish Button */}
        <Button
          onClick={handleFinishWorkout}
          className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl"
          disabled={completedCount === 0}
        >
          <Trophy className="w-5 h-5 mr-2" />
          Finalizar Treino
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Treino de Hoje</h1>
        <p className="text-muted-foreground">Selecione sua ficha</p>
      </div>

      {/* Workout Cards */}
      <div className="space-y-3">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onClick={() => setSelectedWorkout(workout)}
            isToday={index === new Date().getDay() % 4}
          />
        ))}
      </div>

      {/* Rest Day */}
      <button
        onClick={handleRestDay}
        className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="workout-badge workout-badge-rest">
          <Coffee className="w-5 h-5" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-foreground">Dia de Descanso</h3>
          <p className="text-sm text-muted-foreground">Recupere suas energias</p>
        </div>
      </button>
    </div>
  );
}
