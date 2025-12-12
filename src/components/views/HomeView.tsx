import { Scale, Ruler, Activity, Target, Flame, Zap } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { WeightChart } from '@/components/WeightChart';
import { StreakBadge } from '@/components/StreakBadge';
import { LevelBadge } from '@/components/LevelBadge';
import { ProgressRing } from '@/components/ProgressRing';
import { UserProfile, WeightEntry } from '@/types/fitness';

interface HomeViewProps {
  profile: UserProfile;
  weightHistory: WeightEntry[];
  calculateBMI: (weight: number, height: number) => number;
}

export function HomeView({ profile, weightHistory, calculateBMI }: HomeViewProps) {
  const bmi = calculateBMI(profile.currentWeight, profile.height);
  const weightLoss = profile.initialWeight - profile.currentWeight;
  const goalProgress = ((profile.initialWeight - profile.currentWeight) / (profile.initialWeight - profile.goalWeight)) * 100;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo', color: 'text-info' };
    if (bmi < 25) return { label: 'Normal', color: 'text-success' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-warning' };
    return { label: 'Obeso', color: 'text-destructive' };
  };

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground">Olá,</p>
          <h1 className="text-2xl font-bold font-display text-foreground">{profile.name} 💪</h1>
        </div>
        <LevelBadge level={profile.level} xp={profile.xp} />
      </div>

      {/* Streak */}
      <div className="flex justify-center">
        <StreakBadge streak={profile.streak} />
      </div>

      {/* Main Progress Card */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-display text-foreground">Meta de Peso</h2>
          <span className="text-sm text-muted-foreground">
            {profile.goalWeight} kg
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          <ProgressRing progress={Math.min(100, Math.max(0, goalProgress))} size={160} strokeWidth={12}>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-primary glow-text">
                {profile.currentWeight}
              </p>
              <p className="text-sm text-muted-foreground">kg atual</p>
            </div>
          </ProgressRing>
        </div>

        <div className="mt-4 flex justify-center gap-6 text-center">
          <div>
            <p className="text-xl font-bold text-success">-{weightLoss.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">kg perdidos</p>
          </div>
          <div className="w-px bg-border" />
          <div>
            <p className="text-xl font-bold text-foreground">{(profile.goalWeight - profile.currentWeight).toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">kg restantes</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Scale}
          label="IMC Atual"
          value={bmi.toFixed(1)}
          variant="primary"
        />
        <StatCard
          icon={Activity}
          label="Classificação"
          value={bmiCategory.label}
          variant={bmiCategory.label === 'Normal' ? 'primary' : 'default'}
        />
        <StatCard
          icon={Ruler}
          label="Altura"
          value={profile.height}
          unit="cm"
        />
        <StatCard
          icon={Target}
          label="Peso Inicial"
          value={profile.initialWeight}
          unit="kg"
        />
      </div>

      {/* Weight Chart */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-display text-foreground">Evolução do Peso</h2>
          <span className="text-xs text-muted-foreground">Últimos 30 dias</span>
        </div>
        <WeightChart data={weightHistory} />
      </div>
    </div>
  );
}
