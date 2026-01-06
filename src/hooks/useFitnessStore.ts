import { useState, useEffect } from 'react';
import { UserProfile, WeightEntry, Workout, WorkoutLog, Exercise } from '@/types/fitness';

const defaultWorkouts: Workout[] = [
  {
    id: 'workout-a',
    name: 'Peito e Tríceps',
    letter: 'A',
    color: 'primary',
    exercises: [
      { id: 'a1', name: 'Supino Reto', muscleGroup: 'upper', sets: 4, reps: '10-12', weight: 0 },
      { id: 'a2', name: 'Supino Inclinado', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
      { id: 'a3', name: 'Crucifixo', muscleGroup: 'upper', sets: 3, reps: '12-15', weight: 0 },
      { id: 'a4', name: 'Tríceps Pulley', muscleGroup: 'upper', sets: 3, reps: '12-15', weight: 0 },
      { id: 'a5', name: 'Tríceps Francês', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
    ],
  },
  {
    id: 'workout-b',
    name: 'Costas e Bíceps',
    letter: 'B',
    color: 'accent',
    exercises: [
      { id: 'b1', name: 'Puxada Frontal', muscleGroup: 'upper', sets: 4, reps: '10-12', weight: 0 },
      { id: 'b2', name: 'Remada Curvada', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
      { id: 'b3', name: 'Remada Unilateral', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
      { id: 'b4', name: 'Rosca Direta', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
      { id: 'b5', name: 'Rosca Martelo', muscleGroup: 'upper', sets: 3, reps: '10-12', weight: 0 },
    ],
  },
  {
    id: 'workout-c',
    name: 'Pernas',
    letter: 'C',
    color: 'info',
    exercises: [
      { id: 'c1', name: 'Agachamento', muscleGroup: 'lower', sets: 4, reps: '10-12', weight: 0 },
      { id: 'c2', name: 'Leg Press', muscleGroup: 'lower', sets: 4, reps: '12-15', weight: 0 },
      { id: 'c3', name: 'Cadeira Extensora', muscleGroup: 'lower', sets: 3, reps: '12-15', weight: 0 },
      { id: 'c4', name: 'Cadeira Flexora', muscleGroup: 'lower', sets: 3, reps: '12-15', weight: 0 },
      { id: 'c5', name: 'Panturrilha', muscleGroup: 'lower', sets: 4, reps: '15-20', weight: 0 },
    ],
  },
  {
    id: 'workout-d',
    name: 'Ombros e Abdômen',
    letter: 'D',
    color: 'destructive',
    exercises: [
      { id: 'd1', name: 'Desenvolvimento', muscleGroup: 'upper', sets: 4, reps: '10-12', weight: 0 },
      { id: 'd2', name: 'Elevação Lateral', muscleGroup: 'upper', sets: 3, reps: '12-15', weight: 0 },
      { id: 'd3', name: 'Elevação Frontal', muscleGroup: 'upper', sets: 3, reps: '12-15', weight: 0 },
      { id: 'd4', name: 'Abdominal Crunch', muscleGroup: 'core', sets: 3, reps: '15-20', weight: 0 },
      { id: 'd5', name: 'Prancha', muscleGroup: 'core', sets: 3, reps: '30-60s', weight: 0 },
    ],
  },
];

const defaultProfile: UserProfile = {
  name: 'Atleta',
  height: 175,
  initialWeight: 80,
  currentWeight: 78,
  goalWeight: 75,
  startDate: '2024-01-15',
  level: 5,
  xp: 2450,
  streak: 12,
  preferredModality: 'strength',
  weeklyGoal: 5,
};

const generateWeightHistory = (): WeightEntry[] => {
  const entries: WeightEntry[] = [];
  const startWeight = 80;
  const height = 175;
  
  for (let i = 30; i >= 0; i -= 5) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const weight = startWeight - (30 - i) * 0.08 + (Math.random() - 0.5) * 0.5;
    const bmi = weight / Math.pow(height / 100, 2);
    
    entries.push({
      id: `weight-${i}`,
      date: date.toISOString().split('T')[0],
      weight: Math.round(weight * 10) / 10,
      bmi: Math.round(bmi * 10) / 10,
    });
  }
  
  return entries;
};

const generateWorkoutLogs = (): WorkoutLog[] => {
  const logs: WorkoutLog[] = [];
  const letters: ('A' | 'B' | 'C' | 'D' | 'REST')[] = ['A', 'B', 'C', 'D', 'REST'];
  
  for (let i = 14; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const letterIndex = i % 5;
    const letter = letters[letterIndex];
    
    logs.push({
      id: `log-${i}`,
      date: date.toISOString().split('T')[0],
      workoutId: letter === 'REST' ? null : `workout-${letter.toLowerCase()}`,
      workoutLetter: letter,
      exercises: [],
    });
  }
  
  return logs;
};

export function useFitnessStore() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitnessProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(() => {
    const saved = localStorage.getItem('weightHistory');
    return saved ? JSON.parse(saved) : generateWeightHistory();
  });

  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const saved = localStorage.getItem('workouts');
    return saved ? JSON.parse(saved) : defaultWorkouts;
  });

  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
    const saved = localStorage.getItem('workoutLogs');
    return saved ? JSON.parse(saved) : generateWorkoutLogs();
  });

  useEffect(() => {
    localStorage.setItem('fitnessProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
  }, [weightHistory]);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('workoutLogs', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  const calculateBMI = (weight: number, height: number) => {
    return weight / Math.pow(height / 100, 2);
  };

  const addWeightEntry = (weight: number) => {
    const bmi = calculateBMI(weight, profile.height);
    const newEntry: WeightEntry = {
      id: `weight-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weight,
      bmi: Math.round(bmi * 10) / 10,
    };
    setWeightHistory(prev => [...prev, newEntry]);
    setProfile(prev => ({ ...prev, currentWeight: weight }));
    addXP(25);
  };

  const logWorkout = (workoutLetter: 'A' | 'B' | 'C' | 'D' | 'REST', exercises: { exerciseId: string; weight: number; completed: boolean }[]) => {
    const workout = workouts.find(w => w.letter === workoutLetter);
    const newLog: WorkoutLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      workoutId: workout?.id || null,
      workoutLetter,
      exercises,
    };
    setWorkoutLogs(prev => [...prev, newLog]);
    
    if (workoutLetter !== 'REST') {
      addXP(50);
      updateStreak();
    }
  };

  const addXP = (amount: number) => {
    setProfile(prev => {
      const newXP = prev.xp + amount;
      const xpPerLevel = 500;
      const newLevel = Math.floor(newXP / xpPerLevel) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    const lastLog = workoutLogs[workoutLogs.length - 1];
    if (lastLog && (lastLog.date === yesterday || lastLog.date === today)) {
      setProfile(prev => ({ ...prev, streak: prev.streak + 1 }));
    } else if (!lastLog || lastLog.date !== today) {
      setProfile(prev => ({ ...prev, streak: 1 }));
    }
  };

  const getStrengthProgress = () => {
    const recentLogs = workoutLogs.slice(-30);
    const olderLogs = workoutLogs.slice(-60, -30);

    const calcAverage = (logs: WorkoutLog[], group: 'upper' | 'lower' | 'core') => {
      const weights = logs.flatMap(log => 
        log.exercises
          .filter(e => {
            const exercise = workouts
              .flatMap(w => w.exercises)
              .find(ex => ex.id === e.exerciseId);
            return exercise?.muscleGroup === group;
          })
          .map(e => e.weight)
      ).filter(w => w > 0);
      
      return weights.length > 0 ? weights.reduce((a, b) => a + b, 0) / weights.length : 0;
    };

    return [
      {
        muscleGroup: 'upper' as const,
        percentageIncrease: 12,
        period: '30 dias',
        initialAverage: 45,
        currentAverage: 50.4,
      },
      {
        muscleGroup: 'lower' as const,
        percentageIncrease: 18,
        period: '30 dias',
        initialAverage: 80,
        currentAverage: 94.4,
      },
      {
        muscleGroup: 'core' as const,
        percentageIncrease: 8,
        period: '30 dias',
        initialAverage: 0,
        currentAverage: 0,
      },
    ];
  };

  return {
    profile,
    setProfile,
    weightHistory,
    addWeightEntry,
    workouts,
    setWorkouts,
    workoutLogs,
    logWorkout,
    calculateBMI,
    getStrengthProgress,
  };
}
