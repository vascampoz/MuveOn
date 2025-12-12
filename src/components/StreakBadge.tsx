import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 animate-pulse-glow">
      <Flame className="w-5 h-5 text-accent animate-float" />
      <span className="font-bold text-accent">{streak}</span>
      <span className="text-sm text-accent/80">dias seguidos</span>
    </div>
  );
}
