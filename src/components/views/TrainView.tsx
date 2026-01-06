import { useState } from 'react';
import { ArrowLeft, Coffee, Check, Trophy, Plus } from 'lucide-react';
import { ModalitySelector } from '@/components/ModalitySelector';
import { SessionTimer } from '@/components/SessionTimer';
import { WorkoutCard } from '@/components/WorkoutCard';
import { ExerciseItem } from '@/components/ExerciseItem';
import { SwimmingWorkoutCard } from '@/components/training/SwimmingWorkoutCard';
import { RunningWorkoutCard } from '@/components/training/RunningWorkoutCard';
import { WorkoutDetailSheet } from '@/components/training/WorkoutDetailSheet';
import { SportsSelector, SportActivityType } from '@/components/training/SportsSelector';
import { Workout, Modality, HIITProtocol } from '@/types/fitness';
import { SwimmingWorkout, RunningWorkout } from '@/types/sports';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useSportsStore } from '@/hooks/useSportsStore';

interface TrainViewProps {
  workouts: Workout[];
  onLogWorkout: (letter: 'A' | 'B' | 'C' | 'D' | 'REST', exercises: { exerciseId: string; weight: number; completed: boolean }[]) => void;
}

type ViewMode = 'select' | 'modality' | 'session' | 'detail';

export function TrainView({ workouts, onLogWorkout }: TrainViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('select');
  const [selectedModality, setSelectedModality] = useState<Modality>('strength');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [exerciseData, setExerciseData] = useState<Map<string, { weight: number; completed: boolean }>>(new Map());
  const [hiitProtocol, setHiitProtocol] = useState<HIITProtocol>('tabata');
  
  // Sports specific state
  const [selectedSport, setSelectedSport] = useState<SportActivityType>('swimming');
  const [selectedSwimmingWorkout, setSelectedSwimmingWorkout] = useState<SwimmingWorkout | null>(null);
  const [selectedRunningWorkout, setSelectedRunningWorkout] = useState<RunningWorkout | null>(null);

  const { 
    swimmingWorkouts, 
    runningWorkouts, 
    logSwimmingSession, 
    logRunningSession 
  } = useSportsStore();

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

    resetView();
  };

  const handleRestDay = () => {
    onLogWorkout('REST', []);
    toast({
      title: "Dia de Descanso ☕",
      description: "Descanse bem para o próximo treino!",
    });
  };

  const resetView = () => {
    setViewMode('select');
    setSelectedWorkout(null);
    setSelectedSwimmingWorkout(null);
    setSelectedRunningWorkout(null);
    setExerciseData(new Map());
  };

  const handleSwimmingComplete = (data: { totalTime: number; rpe: number; feedback?: string }) => {
    if (!selectedSwimmingWorkout) return;
    
    logSwimmingSession({
      workoutId: selectedSwimmingWorkout.id,
      workoutName: selectedSwimmingWorkout.name,
      totalDistance: selectedSwimmingWorkout.totalDistance,
      totalTime: data.totalTime,
      avgPace: Math.round((data.totalTime / (selectedSwimmingWorkout.totalDistance / 100)) * 10) / 10,
      rpe: data.rpe as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
      feedback: data.feedback,
      completed: true,
    });

    toast({
      title: "Natação Concluída! 🏊",
      description: `+60 XP • ${selectedSwimmingWorkout.totalDistance}m em ${data.totalTime}min`,
    });

    resetView();
  };

  const handleRunningComplete = (data: { totalTime: number; rpe: number; feedback?: string }) => {
    if (!selectedRunningWorkout) return;
    
    logRunningSession({
      workoutId: selectedRunningWorkout.id,
      workoutName: selectedRunningWorkout.name,
      totalDistance: selectedRunningWorkout.totalDistance,
      totalTime: data.totalTime,
      avgPace: Math.round((data.totalTime / selectedRunningWorkout.totalDistance) * 10) / 10,
      terrain: selectedRunningWorkout.terrain,
      rpe: data.rpe as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
      feedback: data.feedback,
      completed: true,
    });

    toast({
      title: "Corrida Concluída! 🏃",
      description: `+60 XP • ${selectedRunningWorkout.totalDistance}km em ${data.totalTime}min`,
    });

    resetView();
  };

  const completedCount = Array.from(exerciseData.values()).filter(e => e.completed).length;
  const totalExercises = selectedWorkout?.exercises.length || 0;

  // HIIT Protocol options
  const hiitProtocols: { id: HIITProtocol; name: string; work: number; rest: number; rounds: number }[] = [
    { id: 'tabata', name: 'Tabata', work: 20, rest: 10, rounds: 8 },
    { id: 'emom', name: 'EMOM', work: 60, rest: 0, rounds: 10 },
    { id: 'amrap', name: 'AMRAP', work: 600, rest: 0, rounds: 1 },
    { id: 'fortime', name: 'For Time', work: 1800, rest: 0, rounds: 1 },
  ];

  // Render Swimming/Running Detail
  if (viewMode === 'detail') {
    if (selectedSwimmingWorkout) {
      return (
        <WorkoutDetailSheet
          type="swimming"
          workout={selectedSwimmingWorkout}
          onBack={() => {
            setSelectedSwimmingWorkout(null);
            setViewMode('modality');
          }}
          onComplete={handleSwimmingComplete}
        />
      );
    }
    if (selectedRunningWorkout) {
      return (
        <WorkoutDetailSheet
          type="running"
          workout={selectedRunningWorkout}
          onBack={() => {
            setSelectedRunningWorkout(null);
            setViewMode('modality');
          }}
          onComplete={handleRunningComplete}
        />
      );
    }
  }

  // Render HIIT Session
  if (viewMode === 'session' && selectedModality === 'hiit') {
    const protocol = hiitProtocols.find(p => p.id === hiitProtocol) || hiitProtocols[0];
    
    return (
      <div className="space-y-4 pb-24 animate-slide-up">
        <div className="flex items-center gap-4">
          <button
            onClick={resetView}
            className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold font-display text-foreground">
              Treino HIIT
            </h1>
            <p className="text-sm text-muted-foreground">{protocol.name}</p>
          </div>
        </div>

        <SessionTimer
          protocol={hiitProtocol}
          workTime={protocol.work}
          restTime={protocol.rest}
          rounds={protocol.rounds}
          onComplete={(totalTime) => {
            toast({
              title: "HIIT Concluído! 🔥",
              description: `+75 XP • ${Math.floor(totalTime / 60)} minutos de treino intenso`,
            });
            resetView();
          }}
        />
      </div>
    );
  }

  // Render Strength Session
  if (viewMode === 'session' && selectedModality === 'strength' && selectedWorkout) {
    return (
      <div className="space-y-4 pb-24 animate-slide-up">
        <div className="flex items-center gap-4">
          <button
            onClick={resetView}
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

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${(completedCount / totalExercises) * 100}%` }}
          />
        </div>

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

  // Render Modality Content
  if (viewMode === 'modality') {
    return (
      <div className="space-y-6 pb-24 animate-slide-up">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('select')}
            className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold font-display text-foreground">
            {selectedModality === 'strength' && '🏋️ Musculação'}
            {selectedModality === 'cardio' && '🏃 Cardio'}
            {selectedModality === 'hiit' && '⚡ HIIT'}
            {selectedModality === 'mobility' && '🧘 Mobilidade'}
            {selectedModality === 'recovery' && '💆 Recuperação'}
            {selectedModality === 'sports' && '🏊 Esportes'}
          </h1>
        </div>

        {selectedModality === 'strength' && (
          <div className="space-y-3">
            {workouts.map((workout, index) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onClick={() => {
                  setSelectedWorkout(workout);
                  setViewMode('session');
                }}
                isToday={index === new Date().getDay() % 4}
              />
            ))}
          </div>
        )}

        {selectedModality === 'hiit' && (
          <div className="space-y-3">
            {hiitProtocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => {
                  setHiitProtocol(protocol.id);
                  setViewMode('session');
                }}
                className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-foreground">{protocol.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {protocol.work}s work • {protocol.rest}s rest • {protocol.rounds} rounds
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedModality === 'cardio' && (
          <div className="space-y-4">
            <SportsSelector selected={selectedSport} onSelect={setSelectedSport} />
            
            {selectedSport === 'running' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Treinos de Corrida</h3>
                {runningWorkouts.map((workout) => (
                  <RunningWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onClick={() => {
                      setSelectedRunningWorkout(workout);
                      setViewMode('detail');
                    }}
                  />
                ))}
              </div>
            )}

            {selectedSport === 'swimming' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Treinos de Natação</h3>
                {swimmingWorkouts.map((workout) => (
                  <SwimmingWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onClick={() => {
                      setSelectedSwimmingWorkout(workout);
                      setViewMode('detail');
                    }}
                  />
                ))}
              </div>
            )}

            {(selectedSport === 'cycling' || selectedSport === 'walking' || selectedSport === 'other') && (
              <div className="glass-card p-6 text-center">
                <span className="text-5xl mb-4 block">
                  {selectedSport === 'cycling' ? '🚴' : selectedSport === 'walking' ? '🚶' : '⚽'}
                </span>
                <h3 className="font-semibold text-foreground mb-2">Em breve</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Treinos de {selectedSport === 'cycling' ? 'ciclismo' : selectedSport === 'walking' ? 'caminhada' : 'outros esportes'} estarão disponíveis em breve!
                </p>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Sessão Manual
                </Button>
              </div>
            )}
          </div>
        )}

        {selectedModality === 'sports' && (
          <div className="space-y-4">
            <SportsSelector selected={selectedSport} onSelect={setSelectedSport} />
            
            {selectedSport === 'swimming' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Treinos de Natação</h3>
                {swimmingWorkouts.map((workout) => (
                  <SwimmingWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onClick={() => {
                      setSelectedSwimmingWorkout(workout);
                      setViewMode('detail');
                    }}
                  />
                ))}
              </div>
            )}

            {selectedSport === 'running' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Treinos de Corrida</h3>
                {runningWorkouts.map((workout) => (
                  <RunningWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onClick={() => {
                      setSelectedRunningWorkout(workout);
                      setViewMode('detail');
                    }}
                  />
                ))}
              </div>
            )}

            {(selectedSport === 'cycling' || selectedSport === 'walking') && (
              <div className="glass-card p-6 text-center">
                <span className="text-5xl mb-4 block">
                  {selectedSport === 'cycling' ? '🚴' : '🚶'}
                </span>
                <h3 className="font-semibold text-foreground mb-2">Em breve</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Treinos estruturados estarão disponíveis em breve!
                </p>
              </div>
            )}

            {selectedSport === 'other' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">Outros Esportes</h3>
                {['⚽ Futebol', '🏀 Basquete', '🎾 Tênis', '🏐 Vôlei', '🥋 Artes Marciais'].map((sport) => (
                  <button
                    key={sport}
                    className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => {
                      toast({
                        title: "Sessão registrada! ⚽",
                        description: "+40 XP • Atividade esportiva",
                      });
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                      <span className="text-2xl">{sport.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{sport.split(' ')[1]}</h3>
                      <p className="text-sm text-muted-foreground">Registrar sessão</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {(selectedModality === 'mobility' || selectedModality === 'recovery') && (
          <div className="glass-card p-6 text-center">
            <span className="text-5xl mb-4 block">
              {selectedModality === 'mobility' ? '🧘' : '💆'}
            </span>
            <h3 className="font-semibold text-foreground mb-2">
              {selectedModality === 'mobility' ? 'Rotinas de Mobilidade' : 'Check-in de Recuperação'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Em breve: rotinas guiadas e tracking de bem-estar!
            </p>
          </div>
        )}
      </div>
    );
  }

  // Render Modality Selection
  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Treinar</h1>
        <p className="text-muted-foreground">Escolha sua modalidade</p>
      </div>

      <ModalitySelector 
        selected={selectedModality} 
        onSelect={(mod) => {
          setSelectedModality(mod);
          setViewMode('modality');
        }} 
      />

      <div className="mt-6">
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
    </div>
  );
}
