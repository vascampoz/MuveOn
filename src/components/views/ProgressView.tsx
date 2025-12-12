import { TrendingUp, Dumbbell, ArrowUp } from 'lucide-react';
import { ProgressRing } from '@/components/ProgressRing';
import { StrengthProgress, WorkoutLog } from '@/types/fitness';

interface ProgressViewProps {
  strengthProgress: StrengthProgress[];
  workoutLogs: WorkoutLog[];
}

export function ProgressView({ strengthProgress, workoutLogs }: ProgressViewProps) {
  const muscleGroupLabels: Record<string, string> = {
    upper: 'Membros Superiores',
    lower: 'Membros Inferiores',
    core: 'Core/Abdômen',
  };

  const muscleGroupColors: Record<string, string> = {
    upper: 'hsl(var(--primary))',
    lower: 'hsl(var(--accent))',
    core: 'hsl(var(--info))',
  };

  const recentLogs = workoutLogs.slice(-7);
  const workoutDays = recentLogs.filter(log => log.workoutLetter !== 'REST').length;

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Progressão de Força</h1>
        <p className="text-muted-foreground">Acompanhe sua evolução</p>
      </div>

      {/* Weekly Summary */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-display text-foreground">Esta Semana</h2>
          <span className="text-sm text-muted-foreground">Últimos 7 dias</span>
        </div>

        <div className="flex items-center justify-center mb-4">
          <ProgressRing progress={(workoutDays / 7) * 100} size={140} strokeWidth={10}>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-primary">{workoutDays}</p>
              <p className="text-sm text-muted-foreground">treinos</p>
            </div>
          </ProgressRing>
        </div>

        {/* Weekly Calendar */}
        <div className="flex justify-between gap-2">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => {
            const log = recentLogs[index];
            const hasWorkout = log && log.workoutLetter !== 'REST';
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">{day}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  hasWorkout 
                    ? 'bg-primary text-primary-foreground' 
                    : log?.workoutLetter === 'REST'
                    ? 'bg-muted/50 text-muted-foreground'
                    : 'bg-muted/20 text-muted-foreground/50'
                }`}>
                  {hasWorkout ? log.workoutLetter : log?.workoutLetter === 'REST' ? '💤' : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strength Progress Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-display text-foreground">
          Evolução por Grupo Muscular
        </h2>

        {strengthProgress.map((progress) => (
          <div key={progress.muscleGroup} className="glass-card p-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${muscleGroupColors[progress.muscleGroup]}20` }}
              >
                <Dumbbell 
                  className="w-6 h-6" 
                  style={{ color: muscleGroupColors[progress.muscleGroup] }}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {muscleGroupLabels[progress.muscleGroup]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Últimos {progress.period}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-success">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-xl font-bold">+{progress.percentageIncrease}%</span>
                </div>
                <p className="text-xs text-muted-foreground">de carga</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Média inicial: {progress.initialAverage}kg</span>
                <span>Atual: {progress.currentAverage}kg</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{ 
                    width: `${Math.min(100, (progress.currentAverage / (progress.initialAverage * 1.5)) * 100)}%`,
                    backgroundColor: muscleGroupColors[progress.muscleGroup]
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="glass-card p-4 border-l-4 border-primary">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground">Insight</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Seus membros inferiores tiveram o maior ganho de força este mês! 
              Continue focando no agachamento e leg press para manter o progresso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
