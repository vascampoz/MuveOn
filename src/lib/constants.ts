/**
 * Constantes da aplicação
 */

export const MODALITIES = [
  { id: 'running', label: 'Corrida', icon: 'Zap' },
  { id: 'swimming', label: 'Natação', icon: 'Droplet' },
  { id: 'cycling', label: 'Ciclismo', icon: 'Bike' },
  { id: 'strength', label: 'Força', icon: 'Dumbbell' },
  { id: 'sports', label: 'Esportes', icon: 'Trophy' },
] as const;

export const COLORS = {
  primary: '#4F46E5',
  secondary: '#EC4899',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};
