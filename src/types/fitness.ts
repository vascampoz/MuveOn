// ==================== MODALITIES ====================
export type Modality = 'strength' | 'cardio' | 'hiit' | 'mobility' | 'recovery' | 'sports';

export interface ModalityConfig {
  id: Modality;
  name: string;
  icon: string;
  color: string;
  description: string;
}

// ==================== USER PROFILE ====================
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
  preferredModality: Modality;
  weeklyGoal: number; // sessions per week
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bmi: number;
}

// ==================== STRENGTH (MUSCULAÇÃO) ====================
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

// ==================== CARDIO ====================
export interface CardioSession {
  id: string;
  date: string;
  type: 'running' | 'cycling' | 'walking' | 'swimming' | 'other';
  duration: number; // minutes
  distance?: number; // km
  calories?: number;
  avgHeartRate?: number;
  avgPace?: number; // min/km
  notes?: string;
}

// ==================== HIIT / FUNCIONAL ====================
export type HIITProtocol = 'tabata' | 'emom' | 'amrap' | 'fortime' | 'custom';

export interface HIITSession {
  id: string;
  date: string;
  protocol: HIITProtocol;
  name: string;
  rounds: number;
  workTime: number; // seconds
  restTime: number; // seconds
  exercises: string[];
  totalTime: number; // minutes
  calories?: number;
  completed: boolean;
}

// ==================== MOBILITY ====================
export interface MobilitySession {
  id: string;
  date: string;
  duration: number; // minutes
  focusAreas: ('shoulders' | 'hips' | 'spine' | 'ankles' | 'wrists' | 'full')[];
  routine?: string;
  notes?: string;
}

// ==================== RECOVERY ====================
export interface RecoveryLog {
  id: string;
  date: string;
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  sleepHours: number;
  musclesoreness: 1 | 2 | 3 | 4 | 5; // 1 = none, 5 = severe
  energyLevel: 1 | 2 | 3 | 4 | 5;
  stressLevel: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

// ==================== UNIFIED ACTIVITY ====================
export type ActivityType = 'strength' | 'cardio' | 'hiit' | 'mobility' | 'recovery' | 'rest';

export interface Activity {
  id: string;
  date: string;
  type: ActivityType;
  title: string;
  duration: number; // minutes
  xpEarned: number;
  details: WorkoutLog | CardioSession | HIITSession | MobilitySession | RecoveryLog | null;
}

// ==================== TEAM / COLLABORATION ====================
export type TeamRole = 'athlete' | 'trainer' | 'nutritionist';

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  avatar?: string;
  lastActive?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    type: 'plan' | 'image' | 'file';
    url: string;
    name: string;
  }[];
}

// ==================== CHALLENGES / GAMIFICATION ====================
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'streak' | 'volume' | 'frequency' | 'milestone';
  target: number;
  current: number;
  xpReward: number;
  startDate: string;
  endDate: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  xpReward: number;
}

// ==================== METRICS ====================
export interface WeeklyStats {
  totalSessions: number;
  totalMinutes: number;
  totalCalories: number;
  byModality: Record<Modality, number>;
  streakDays: number;
}
