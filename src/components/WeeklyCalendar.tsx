import { Activity, ActivityType } from '@/types/fitness';
import { cn } from '@/lib/utils';

interface WeeklyCalendarProps {
  activities: Activity[];
  weeklyGoal: number;
}

const activityColors: Record<ActivityType, string> = {
  strength: 'bg-primary',
  cardio: 'bg-info',
  hiit: 'bg-accent',
  mobility: 'bg-success',
  recovery: 'bg-muted-foreground',
  rest: 'bg-muted',
};

export function WeeklyCalendar({ activities, weeklyGoal }: WeeklyCalendarProps) {
  const today = new Date();
  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  
  const getWeekDates = () => {
    const dates: Date[] = [];
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const completedDays = activities.filter(a => {
    const actDate = new Date(a.date);
    return weekDates.some(d => d.toDateString() === actDate.toDateString()) && a.type !== 'rest';
  }).length;

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Esta Semana</h3>
        <span className="text-sm text-muted-foreground">
          {completedDays}/{weeklyGoal} treinos
        </span>
      </div>

      <div className="flex justify-between gap-2">
        {weekDates.map((date, index) => {
          const isToday = date.toDateString() === today.toDateString();
          const activity = activities.find(
            a => new Date(a.date).toDateString() === date.toDateString()
          );
          const isPast = date < today && !isToday;
          const hasActivity = activity && activity.type !== 'rest';

          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <span className={cn(
                "text-xs",
                isToday ? "text-primary font-bold" : "text-muted-foreground"
              )}>
                {weekDays[index]}
              </span>
              
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                hasActivity 
                  ? cn(activityColors[activity!.type], "text-background") 
                  : isPast 
                    ? "bg-muted/30 text-muted-foreground"
                    : "bg-muted/50 text-muted-foreground"
              )}>
                {hasActivity ? (
                  <span className="text-sm">
                    {activity!.type === 'strength' ? '💪' : 
                     activity!.type === 'cardio' ? '🏃' :
                     activity!.type === 'hiit' ? '⚡' :
                     activity!.type === 'mobility' ? '🧘' : '💤'}
                  </span>
                ) : (
                  date.getDate()
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${Math.min(100, (completedDays / weeklyGoal) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
