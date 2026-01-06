import { ModalityConfig, Modality } from '@/types/fitness';

export const MODALITIES: ModalityConfig[] = [
  {
    id: 'strength',
    name: 'Musculação',
    icon: '🏋️',
    color: 'primary',
    description: 'Treinos com peso e resistência',
  },
  {
    id: 'cardio',
    name: 'Cardio',
    icon: '🏃',
    color: 'info',
    description: 'Corrida, bike, natação',
  },
  {
    id: 'hiit',
    name: 'HIIT',
    icon: '⚡',
    color: 'accent',
    description: 'Treinos intervalados de alta intensidade',
  },
  {
    id: 'mobility',
    name: 'Mobilidade',
    icon: '🧘',
    color: 'success',
    description: 'Alongamento e flexibilidade',
  },
  {
    id: 'recovery',
    name: 'Recuperação',
    icon: '💆',
    color: 'muted',
    description: 'Descanso e regeneração',
  },
  {
    id: 'sports',
    name: 'Esportes',
    icon: '⚽',
    color: 'warning',
    description: 'Atividades esportivas variadas',
  },
];

export const getModalityConfig = (id: Modality): ModalityConfig => {
  return MODALITIES.find(m => m.id === id) || MODALITIES[0];
};

export const getModalityColor = (id: Modality): string => {
  const config = getModalityConfig(id);
  return `hsl(var(--${config.color}))`;
};
