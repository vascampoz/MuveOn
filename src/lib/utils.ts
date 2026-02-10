/**
 * Utilitários para o projeto
 */

export function formatDate(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function formatDistance(km: number): string {
  return `${km.toFixed(2)} km`;
}

export function formatCalories(calories: number): string {
  return `${Math.round(calories)} kcal`;
}

export function calculateLevel(experience: number): number {
  return Math.floor(experience / 1000) + 1;
}
