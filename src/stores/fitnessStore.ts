import { create } from 'zustand';
import { User, Workout, UserProgress } from '@/types';

interface FitnessStore {
  // User
  user: User | null;
  setUser: (user: User) => void;
  
  // Workouts
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  updateWorkout: (id: string, workout: Partial<Workout>) => void;
  deleteWorkout: (id: string) => void;
  
  // Progress
  progress: UserProgress | null;
  setProgress: (progress: UserProgress) => void;
}

export const useFitnessStore = create<FitnessStore>((set) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),
  
  // Workouts
  workouts: [],
  addWorkout: (workout) =>
    set((state) => ({
      workouts: [...state.workouts, workout],
    })),
  updateWorkout: (id, updatedWorkout) =>
    set((state) => ({
      workouts: state.workouts.map((w) =>
        w.id === id ? { ...w, ...updatedWorkout } : w
      ),
    })),
  deleteWorkout: (id) =>
    set((state) => ({
      workouts: state.workouts.filter((w) => w.id !== id),
    })),
  
  // Progress
  progress: null,
  setProgress: (progress) => set({ progress }),
}));
