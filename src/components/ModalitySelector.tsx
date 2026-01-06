import { MODALITIES } from '@/lib/modalities';
import { Modality } from '@/types/fitness';
import { cn } from '@/lib/utils';

interface ModalitySelectorProps {
  selected: Modality;
  onSelect: (modality: Modality) => void;
  compact?: boolean;
}

export function ModalitySelector({ selected, onSelect, compact = false }: ModalitySelectorProps) {
  if (compact) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {MODALITIES.map((modality) => (
          <button
            key={modality.id}
            onClick={() => onSelect(modality.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200",
              selected === modality.id
                ? "bg-primary text-primary-foreground scale-105"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span className="text-lg">{modality.icon}</span>
            <span className="text-sm font-medium">{modality.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {MODALITIES.map((modality) => (
        <button
          key={modality.id}
          onClick={() => onSelect(modality.id)}
          className={cn(
            "glass-card p-4 flex flex-col items-center gap-2 transition-all duration-300",
            selected === modality.id
              ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]"
              : "hover:scale-[1.02] opacity-70 hover:opacity-100"
          )}
        >
          <span className="text-3xl">{modality.icon}</span>
          <span className="font-semibold text-foreground">{modality.name}</span>
          <span className="text-xs text-muted-foreground text-center">
            {modality.description}
          </span>
        </button>
      ))}
    </div>
  );
}
