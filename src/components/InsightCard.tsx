import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

type InsightType = 'positive' | 'negative' | 'tip' | 'warning' | 'achievement';

interface InsightCardProps {
  type: InsightType;
  title: string;
  description: string;
  metric?: {
    value: string;
    label: string;
    trend?: 'up' | 'down';
  };
}

const insightConfig: Record<InsightType, { icon: React.ReactNode; borderColor: string; iconBg: string }> = {
  positive: {
    icon: <TrendingUp className="w-5 h-5" />,
    borderColor: 'border-l-success',
    iconBg: 'bg-success/20 text-success',
  },
  negative: {
    icon: <TrendingDown className="w-5 h-5" />,
    borderColor: 'border-l-destructive',
    iconBg: 'bg-destructive/20 text-destructive',
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    borderColor: 'border-l-primary',
    iconBg: 'bg-primary/20 text-primary',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    borderColor: 'border-l-warning',
    iconBg: 'bg-warning/20 text-warning',
  },
  achievement: {
    icon: <Award className="w-5 h-5" />,
    borderColor: 'border-l-accent',
    iconBg: 'bg-accent/20 text-accent',
  },
};

export function InsightCard({ type, title, description, metric }: InsightCardProps) {
  const config = insightConfig[type];

  return (
    <div className={cn(
      "glass-card p-4 border-l-4 transition-all duration-300 hover:scale-[1.01]",
      config.borderColor
    )}>
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          config.iconBg
        )}>
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>

        {metric && (
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1">
              {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-success" />}
              {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-destructive" />}
              <span className="text-lg font-bold text-foreground">{metric.value}</span>
            </div>
            <p className="text-xs text-muted-foreground">{metric.label}</p>
          </div>
        )}
      </div>
    </div>
  );
}
