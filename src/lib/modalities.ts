import { ModalityConfig, Modality } from '@/types/fitness';
import { 
  Dumbbell, 
  Heart, 
  Zap, 
  Waypoints, 
  Moon, 
  Trophy,
  type LucideIcon
} from 'lucide-react';

export interface ModalityConfigWithIcon extends Omit<ModalityConfig, 'icon'> {
  icon: LucideIcon;
}

export const MODALITIES: ModalityConfigWithIcon[] = [
  {
    id: 'strength',
    name: 'Musculação',
    icon: Dumbbell,
    color: 'primary',
    description: 'Treinos com peso e resistência',
  },
  {
    id: 'cardio',
    name: 'Cardio',
    icon: Heart,
    color: 'info',
    description: 'Corrida, bike, natação',
  },
  {
    id: 'hiit',
    name: 'HIIT',
    icon: Zap,
    color: 'accent',
    description: 'Treinos intervalados de alta intensidade',
  },
  {
    id: 'mobility',
    name: 'Mobilidade',
    icon: Waypoints,
    color: 'success',
    description: 'Alongamento e flexibilidade',
  },
  {
    id: 'recovery',
    name: 'Recuperação',
    icon: Moon,
    color: 'muted',
    description: 'Descanso e regeneração',
  },
  {
    id: 'sports',
    name: 'Esportes',
    icon: Trophy,
    color: 'warning',
    description: 'Atividades esportivas variadas',
  },
];

export const getModalityConfig = (id: Modality): ModalityConfigWithIcon => {
  return MODALITIES.find(m => m.id === id) || MODALITIES[0];
};

export const getModalityColor = (id: Modality): string => {
  const config = getModalityConfig(id);
  return `hsl(var(--${config.color}))`;
};
