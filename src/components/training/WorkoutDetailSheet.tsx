import { useState } from 'react';
import { ArrowLeft, Play, Check, Clock, Ruler, MessageSquare, Star } from 'lucide-react';
import { SwimmingWorkout, RunningWorkout } from '@/types/sports';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface WorkoutDetailSheetProps {
  type: 'swimming' | 'running';
  workout: SwimmingWorkout | RunningWorkout;
  onBack: () => void;
  onComplete: (data: {
    totalTime: number;
    rpe: number;
    feedback?: string;
  }) => void;
}

export function WorkoutDetailSheet({ type, workout, onBack, onComplete }: WorkoutDetailSheetProps) {
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [rpe, setRpe] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [completedSets, setCompletedSets] = useState<Set<string>>(new Set());

  const isSwimming = type === 'swimming';
  const swimmingWorkout = workout as SwimmingWorkout;
  const runningWorkout = workout as RunningWorkout;

  const allSets = isSwimming
    ? [...swimmingWorkout.warmup, ...swimmingWorkout.main, ...swimmingWorkout.cooldown]
    : [...runningWorkout.warmup, ...runningWorkout.main, ...runningWorkout.cooldown];

  const handleStart = () => {
    setIsActive(true);
    setStartTime(Date.now());
  };

  const toggleSet = (setId: string) => {
    setCompletedSets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(setId)) {
        newSet.delete(setId);
      } else {
        newSet.add(setId);
      }
      return newSet;
    });
  };

  const handleFinish = () => {
    const totalTime = startTime ? Math.round((Date.now() - startTime) / 60000) : workout.estimatedMinutes;
    onComplete({
      totalTime,
      rpe,
      feedback: feedback || undefined,
    });
  };

  const progress = (completedSets.size / allSets.length) * 100;

  const renderSets = (sets: any[], phase: string) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{phase}</h4>
      {sets.map((set) => (
        <button
          key={set.id}
          onClick={() => isActive && toggleSet(set.id)}
          disabled={!isActive}
          className={cn(
            "w-full p-3 rounded-xl text-left transition-all duration-200",
            completedSets.has(set.id)
              ? "bg-primary/20 border border-primary/50"
              : "bg-muted/30 border border-transparent",
            isActive && "hover:bg-muted/50"
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all",
              completedSets.has(set.id)
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {completedSets.has(set.id) ? <Check className="w-4 h-4" /> : null}
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm font-medium",
                completedSets.has(set.id) && "line-through text-muted-foreground"
              )}>
                {set.description}
              </p>
              {set.notes && (
                <p className="text-xs text-muted-foreground mt-0.5">{set.notes}</p>
              )}
            </div>
            {isSwimming && set.distance && (
              <span className="text-xs text-muted-foreground">{set.distance}m</span>
            )}
            {!isSwimming && set.distance && (
              <span className="text-xs text-muted-foreground">{set.distance}m</span>
            )}
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 pb-24 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold font-display text-foreground">
            {workout.name}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              {isSwimming ? `${swimmingWorkout.totalDistance}m` : `${runningWorkout.totalDistance}km`}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              ~{workout.estimatedMinutes}min
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progresso</span>
            <span>{completedSets.size}/{allSets.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Trainer Notes */}
      {workout.trainerNotes && (
        <div className="glass-card p-3 border-l-4 border-info">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-info">Nota do treinador:</span> {workout.trainerNotes}
          </p>
        </div>
      )}

      {/* Workout Sets */}
      <div className="space-y-4">
        {isSwimming ? (
          <>
            {renderSets(swimmingWorkout.warmup, '🔥 Aquecimento')}
            {renderSets(swimmingWorkout.main, '💪 Parte Principal')}
            {renderSets(swimmingWorkout.cooldown, '🧊 Finalização')}
          </>
        ) : (
          <>
            {renderSets(runningWorkout.warmup, '🔥 Aquecimento')}
            {renderSets(runningWorkout.main, '💪 Parte Principal')}
            {renderSets(runningWorkout.cooldown, '🧊 Finalização')}
          </>
        )}
      </div>

      {/* Start / Finish */}
      {!isActive ? (
        <Button
          onClick={handleStart}
          className="w-full h-14 text-lg font-semibold rounded-2xl"
        >
          <Play className="w-5 h-5 mr-2" />
          Iniciar Treino
        </Button>
      ) : (
        <div className="space-y-4">
          {/* RPE Slider */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4 text-warning" />
                Esforço Percebido (RPE)
              </label>
              <span className="text-lg font-bold text-primary">{rpe}/10</span>
            </div>
            <Slider
              value={[rpe]}
              onValueChange={(v) => setRpe(v[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Leve</span>
              <span>Moderado</span>
              <span>Máximo</span>
            </div>
          </div>

          {/* Feedback */}
          <div className="glass-card p-4 space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Observações (opcional)
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Como foi o treino? Alguma dificuldade?"
              className="bg-muted/50 border-none resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={handleFinish}
            className="w-full h-14 text-lg font-semibold rounded-2xl"
            disabled={completedSets.size === 0}
          >
            <Check className="w-5 h-5 mr-2" />
            Finalizar Treino
          </Button>
        </div>
      )}
    </div>
  );
}
