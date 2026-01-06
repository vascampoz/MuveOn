import { cn } from '@/lib/utils';

export type SportActivityType = 'swimming' | 'running' | 'cycling' | 'walking' | 'other';

interface SportsSelectorProps {
  selected: SportActivityType;
  onSelect: (sport: SportActivityType) => void;
}

const sports = [
  { id: 'swimming' as const, icon: '🏊', name: 'Natação' },
  { id: 'running' as const, icon: '🏃', name: 'Corrida' },
  { id: 'cycling' as const, icon: '🚴', name: 'Ciclismo' },
  { id: 'walking' as const, icon: '🚶', name: 'Caminhada' },
  { id: 'other' as const, icon: '⚽', name: 'Outros' },
];

export function SportsSelector({ selected, onSelect }: SportsSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {sports.map((sport) => (
        <button
          key={sport.id}
          onClick={() => onSelect(sport.id)}
          className={cn(
            "flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all duration-200",
            selected === sport.id
              ? "bg-primary/20 border-2 border-primary"
              : "bg-muted/30 border-2 border-transparent hover:bg-muted/50"
          )}
        >
          <span className="text-2xl">{sport.icon}</span>
          <span className={cn(
            "text-xs font-medium",
            selected === sport.id ? "text-primary" : "text-muted-foreground"
          )}>
            {sport.name}
          </span>
        </button>
      ))}
    </div>
  );
}
