/**
 * Tipos base para a aplicação
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  duration: number; // em minutos
  date: Date;
  modality: 'running' | 'swimming' | 'cycling' | 'strength' | 'sports';
  distance?: number; // em km
  calories?: number;
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface UserProgress {
  userId: string;
  totalWorkouts: number;
  totalDistance: number;
  totalCalories: number;
  streak: number;
  level: number;
  experience: number;
}
