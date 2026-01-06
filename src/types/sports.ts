// ==================== SWIMMING ====================
export type SwimmingStroke = 'freestyle' | 'backstroke' | 'breaststroke' | 'butterfly' | 'mixed';
export type SwimmingGoal = 'endurance' | 'technique' | 'speed';
export type IntensityLevel = 'light' | 'moderate' | 'high';

export interface SwimmingSet {
  id: string;
  description: string;
  distance: number; // meters
  stroke: SwimmingStroke;
  restSeconds?: number;
  notes?: string;
}

export interface SwimmingWorkout {
  id: string;
  name: string;
  goal: SwimmingGoal;
  intensity: IntensityLevel;
  warmup: SwimmingSet[];
  main: SwimmingSet[];
  cooldown: SwimmingSet[];
  totalDistance: number;
  estimatedMinutes: number;
  trainerNotes?: string;
}

export interface SwimmingSession {
  id: string;
  date: string;
  workoutId: string;
  workoutName: string;
  totalDistance: number;
  totalTime: number; // minutes
  avgPace: number; // min/100m
  rpe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // Rate of Perceived Exertion
  feedback?: string;
  completed: boolean;
}

// ==================== RUNNING ====================
export type RunningType = 'continuous' | 'interval' | 'progressive' | 'tempo' | 'recovery';
export type TerrainType = 'road' | 'treadmill' | 'trail' | 'track';

export interface RunningInterval {
  id: string;
  description: string;
  distance?: number; // meters
  duration?: number; // seconds
  pace?: string; // target pace
  intensity: IntensityLevel;
  restSeconds?: number;
  notes?: string;
}

export interface RunningWorkout {
  id: string;
  name: string;
  type: RunningType;
  terrain: TerrainType;
  intensity: IntensityLevel;
  warmup: RunningInterval[];
  main: RunningInterval[];
  cooldown: RunningInterval[];
  totalDistance: number; // km
  estimatedMinutes: number;
  trainerNotes?: string;
}

export interface RunningSession {
  id: string;
  date: string;
  workoutId: string;
  workoutName: string;
  totalDistance: number; // km
  totalTime: number; // minutes
  avgPace: number; // min/km
  bestPace?: number; // min/km
  avgHeartRate?: number;
  terrain: TerrainType;
  rpe: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  feedback?: string;
  completed: boolean;
}

// ==================== SPORTS (GENERAL) ====================
export type SportType = 'soccer' | 'basketball' | 'tennis' | 'volleyball' | 'martial_arts' | 'other';

export interface SportsSession {
  id: string;
  date: string;
  sport: SportType;
  duration: number; // minutes
  intensity: IntensityLevel;
  notes?: string;
  completed: boolean;
}
