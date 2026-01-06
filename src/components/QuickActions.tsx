import { Play, Plus, Timer, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onStartWorkout: () => void;
  onStartCardio: () => void;
  onStartTimer: () => void;
  onLogRecovery: () => void;
}

export function QuickActions({ 
  onStartWorkout, 
  onStartCardio, 
  onStartTimer,
  onLogRecovery 
}: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      id: 'workout',
      label: 'Treino',
      icon: <Play className="w-5 h-5" />,
      color: 'bg-primary text-primary-foreground',
      onClick: onStartWorkout,
    },
    {
      id: 'cardio',
      label: 'Cardio',
      icon: <Plus className="w-5 h-5" />,
      color: 'bg-info text-info-foreground',
      onClick: onStartCardio,
    },
    {
      id: 'timer',
      label: 'HIIT',
      icon: <Timer className="w-5 h-5" />,
      color: 'bg-accent text-accent-foreground',
      onClick: onStartTimer,
    },
    {
      id: 'recovery',
      label: 'Check-in',
      icon: <Calendar className="w-5 h-5" />,
      color: 'bg-muted text-muted-foreground',
      onClick: onLogRecovery,
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={action.onClick}
          className={cn(
            "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
            "hover:scale-105 active:scale-95 min-w-[80px]",
            action.color
          )}
        >
          {action.icon}
          <span className="text-xs font-medium">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
