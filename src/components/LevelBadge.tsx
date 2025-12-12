import { Star } from 'lucide-react';
import { ProgressRing } from './ProgressRing';

interface LevelBadgeProps {
  level: number;
  xp: number;
}

export function LevelBadge({ level, xp }: LevelBadgeProps) {
  const xpPerLevel = 500;
  const currentLevelXP = xp % xpPerLevel;
  const progress = (currentLevelXP / xpPerLevel) * 100;

  return (
    <div className="flex items-center gap-3">
      <ProgressRing progress={progress} size={56} strokeWidth={4}>
        <div className="flex flex-col items-center">
          <Star className="w-4 h-4 text-primary" fill="currentColor" />
          <span className="text-xs font-bold text-primary">{level}</span>
        </div>
      </ProgressRing>
      <div>
        <p className="text-sm font-medium text-foreground">Nível {level}</p>
        <p className="text-xs text-muted-foreground">{currentLevelXP}/{xpPerLevel} XP</p>
      </div>
    </div>
  );
}
