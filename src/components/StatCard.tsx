import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent';
}

export function StatCard({ icon: Icon, label, value, unit, trend, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'text-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
  };

  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-xl bg-muted/50 ${variantStyles[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            trend.positive 
              ? 'bg-success/20 text-success' 
              : 'bg-destructive/20 text-destructive'
          }`}>
            {trend.positive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className={`text-2xl font-bold font-display mt-1 ${variantStyles[variant]}`}>
          {value}
          {unit && <span className="text-base font-normal text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}
