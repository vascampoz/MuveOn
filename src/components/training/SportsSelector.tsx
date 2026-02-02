import { cn } from '@/lib/utils';
import { Waves, PersonStanding, Bike, Footprints, Trophy, type LucideIcon } from 'lucide-react';

export type SportActivityType = 'swimming' | 'running' | 'cycling' | 'walking' | 'other';

interface SportsSelectorProps {
  selected: SportActivityType;
  onSelect: (sport: SportActivityType) => void;
}

interface SportOption {
  id: SportActivityType;
  icon: LucideIcon;
  name: string;
}

const sports: SportOption[] = [
  { id: 'swimming', icon: Waves, name: 'Natação' },
  { id: 'running', icon: PersonStanding, name: 'Corrida' },
  { id: 'cycling', icon: Bike, name: 'Ciclismo' },
  { id: 'walking', icon: Footprints, name: 'Caminhada' },
  { id: 'other', icon: Trophy, name: 'Outros' },
];

export function SportsSelector({ selected, onSelect }: SportsSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
      {sports.map((sport) => {
        const Icon = sport.icon;
        return (
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
            <Icon className={cn(
              "w-6 h-6",
              selected === sport.id ? "text-primary" : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-xs font-medium",
              selected === sport.id ? "text-primary" : "text-muted-foreground"
            )}>
              {sport.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
