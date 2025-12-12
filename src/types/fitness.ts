export interface UserProfile {
  name: string;
  height: number; // cm
  initialWeight: number; // kg
  currentWeight: number; // kg
  goalWeight: number; // kg
  startDate: string;
  level: number;
  xp: number;
  streak: number;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bmi: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'upper' | 'lower' | 'core' | 'cardio';
  sets: number;
  reps: string;
  weight?: number;
}

export interface Workout {
  id: string;
  name: string;
  letter: 'A' | 'B' | 'C' | 'D';
  exercises: Exercise[];
  color: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  workoutId: string | null;
  workoutLetter: 'A' | 'B' | 'C' | 'D' | 'REST';
  exercises: {
    exerciseId: string;
    weight: number;
    completed: boolean;
  }[];
}

export interface StrengthProgress {
  muscleGroup: 'upper' | 'lower' | 'core';
  percentageIncrease: number;
  period: string;
  initialAverage: number;
  currentAverage: number;
}
