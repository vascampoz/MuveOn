import { Activity, ActivityType } from '@/types/fitness';
import { Dumbbell, Heart, Zap, Moon, Trophy, Activity as ActivityIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityFeedProps {
  activities: Activity[];
  limit?: number;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
  strength: <Dumbbell className="w-4 h-4" />,
  cardio: <Heart className="w-4 h-4" />,
  hiit: <Zap className="w-4 h-4" />,
  mobility: <ActivityIcon className="w-4 h-4" />,
  recovery: <Moon className="w-4 h-4" />,
  rest: <Moon className="w-4 h-4" />,
};

const activityColors: Record<ActivityType, string> = {
  strength: 'bg-primary/20 text-primary',
  cardio: 'bg-info/20 text-info',
  hiit: 'bg-accent/20 text-accent',
  mobility: 'bg-success/20 text-success',
  recovery: 'bg-muted text-muted-foreground',
  rest: 'bg-muted text-muted-foreground',
};

export function ActivityFeed({ activities, limit = 5 }: ActivityFeedProps) {
  const displayActivities = activities.slice(0, limit);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  if (displayActivities.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">Nenhuma atividade ainda</p>
        <p className="text-sm text-muted-foreground/70">Comece um treino para ver seu histórico</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayActivities.map((activity, index) => (
        <div
          key={activity.id}
          className={cn(
            "glass-card p-4 flex items-center gap-4 transition-all duration-300",
            "animate-slide-up"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            activityColors[activity.type]
          )}>
            {activityIcons[activity.type]}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{activity.title}</h4>
            <p className="text-sm text-muted-foreground">
              {activity.duration} min • {formatDate(activity.date)}
            </p>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-primary">+{activity.xpEarned}</span>
            <p className="text-xs text-muted-foreground">XP</p>
          </div>
        </div>
      ))}
    </div>
  );
}
