import { useState, useEffect } from 'react';
import { 
  SwimmingWorkout, 
  SwimmingSession, 
  RunningWorkout, 
  RunningSession,
  SportsSession 
} from '@/types/sports';

const defaultSwimmingWorkouts: SwimmingWorkout[] = [
  {
    id: 'swim-1',
    name: 'Resistência Aeróbica',
    goal: 'endurance',
    intensity: 'moderate',
    warmup: [
      { id: 's1-w1', description: '200m nado livre leve', distance: 200, stroke: 'freestyle' },
      { id: 's1-w2', description: '4×50m educativos (25m braço / 25m completo)', distance: 200, stroke: 'freestyle', restSeconds: 15 },
    ],
    main: [
      { id: 's1-m1', description: '4×200m nado livre - ritmo moderado', distance: 800, stroke: 'freestyle', restSeconds: 30, notes: 'Manter ritmo constante' },
    ],
    cooldown: [
      { id: 's1-c1', description: '100m nado costas leve', distance: 100, stroke: 'backstroke' },
      { id: 's1-c2', description: '100m nado livre solto', distance: 100, stroke: 'freestyle' },
    ],
    totalDistance: 1400,
    estimatedMinutes: 40,
    trainerNotes: 'Foco em manter o ritmo nas séries principais',
  },
  {
    id: 'swim-2',
    name: 'Técnica de Nados',
    goal: 'technique',
    intensity: 'light',
    warmup: [
      { id: 's2-w1', description: '300m nado livre leve', distance: 300, stroke: 'freestyle' },
    ],
    main: [
      { id: 's2-m1', description: '4×50m nado costas - foco na rotação', distance: 200, stroke: 'backstroke', restSeconds: 20 },
      { id: 's2-m2', description: '4×50m nado peito - foco na pernada', distance: 200, stroke: 'breaststroke', restSeconds: 20 },
      { id: 's2-m3', description: '4×25m borboleta - foco no ondulação', distance: 100, stroke: 'butterfly', restSeconds: 30 },
    ],
    cooldown: [
      { id: 's2-c1', description: '200m nado livre solto', distance: 200, stroke: 'freestyle' },
    ],
    totalDistance: 1000,
    estimatedMinutes: 35,
    trainerNotes: 'Priorize técnica sobre velocidade',
  },
  {
    id: 'swim-3',
    name: 'Velocidade e Explosão',
    goal: 'speed',
    intensity: 'high',
    warmup: [
      { id: 's3-w1', description: '400m variado (100 livre + 100 costas)', distance: 400, stroke: 'mixed' },
      { id: 's3-w2', description: '4×25m progressivo', distance: 100, stroke: 'freestyle', restSeconds: 15 },
    ],
    main: [
      { id: 's3-m1', description: '8×50m sprint - máximo esforço', distance: 400, stroke: 'freestyle', restSeconds: 45, notes: 'Recuperação total entre séries' },
      { id: 's3-m2', description: '4×100m forte', distance: 400, stroke: 'freestyle', restSeconds: 60 },
    ],
    cooldown: [
      { id: 's3-c1', description: '200m nado livre muito leve', distance: 200, stroke: 'freestyle' },
    ],
    totalDistance: 1500,
    estimatedMinutes: 45,
    trainerNotes: 'Treino de alta intensidade - descanse bem antes',
  },
];

const defaultRunningWorkouts: RunningWorkout[] = [
  {
    id: 'run-1',
    name: 'Intervalado 400m',
    type: 'interval',
    terrain: 'track',
    intensity: 'high',
    warmup: [
      { id: 'r1-w1', description: '10 min corrida leve', duration: 600, intensity: 'light' },
      { id: 'r1-w2', description: 'Mobilidade tornozelo e quadril', duration: 180, intensity: 'light', notes: 'Checklist de mobilidade' },
    ],
    main: [
      { id: 'r1-m1', description: '5×400m forte com 1min descanso', distance: 2000, intensity: 'high', restSeconds: 60, notes: 'Ritmo forte e consistente' },
    ],
    cooldown: [
      { id: 'r1-c1', description: '5 min corrida leve', duration: 300, intensity: 'light' },
      { id: 'r1-c2', description: 'Alongamento leve', duration: 180, intensity: 'light' },
    ],
    totalDistance: 4,
    estimatedMinutes: 35,
    trainerNotes: 'Manter ritmo em todas as séries',
  },
  {
    id: 'run-2',
    name: 'Contínuo Leve',
    type: 'continuous',
    terrain: 'road',
    intensity: 'light',
    warmup: [
      { id: 'r2-w1', description: '5 min caminhada rápida', duration: 300, intensity: 'light' },
    ],
    main: [
      { id: 'r2-m1', description: '30 min corrida em ritmo confortável', duration: 1800, intensity: 'light', notes: 'Conseguir conversar durante a corrida' },
    ],
    cooldown: [
      { id: 'r2-c1', description: '5 min caminhada', duration: 300, intensity: 'light' },
    ],
    totalDistance: 5,
    estimatedMinutes: 40,
    trainerNotes: 'Recuperação ativa - manter FC baixa',
  },
  {
    id: 'run-3',
    name: 'Progressivo 5K',
    type: 'progressive',
    terrain: 'road',
    intensity: 'moderate',
    warmup: [
      { id: 'r3-w1', description: '10 min trote leve', duration: 600, intensity: 'light' },
    ],
    main: [
      { id: 'r3-m1', description: '1km ritmo leve', distance: 1000, intensity: 'light', pace: '6:00/km' },
      { id: 'r3-m2', description: '1km ritmo moderado', distance: 1000, intensity: 'moderate', pace: '5:30/km' },
      { id: 'r3-m3', description: '1km ritmo forte', distance: 1000, intensity: 'moderate', pace: '5:00/km' },
      { id: 'r3-m4', description: '1km ritmo muito forte', distance: 1000, intensity: 'high', pace: '4:30/km' },
      { id: 'r3-m5', description: '1km sprint final', distance: 1000, intensity: 'high', pace: 'máximo' },
    ],
    cooldown: [
      { id: 'r3-c1', description: '5 min caminhada + alongamento', duration: 300, intensity: 'light' },
    ],
    totalDistance: 5,
    estimatedMinutes: 35,
    trainerNotes: 'Aumentar ritmo a cada quilômetro',
  },
  {
    id: 'run-4',
    name: 'Fartlek 30min',
    type: 'interval',
    terrain: 'road',
    intensity: 'moderate',
    warmup: [
      { id: 'r4-w1', description: '8 min corrida leve', duration: 480, intensity: 'light' },
    ],
    main: [
      { id: 'r4-m1', description: '2min forte + 2min leve (5 repetições)', duration: 1200, intensity: 'moderate', notes: 'Alternar intensidades' },
    ],
    cooldown: [
      { id: 'r4-c1', description: '5 min trote + alongamento', duration: 300, intensity: 'light' },
    ],
    totalDistance: 6,
    estimatedMinutes: 30,
    trainerNotes: 'Treino de variação de ritmo',
  },
];

export function useSportsStore() {
  const [swimmingWorkouts, setSwimmingWorkouts] = useState<SwimmingWorkout[]>(() => {
    const saved = localStorage.getItem('swimmingWorkouts');
    return saved ? JSON.parse(saved) : defaultSwimmingWorkouts;
  });

  const [swimmingSessions, setSwimmingSessions] = useState<SwimmingSession[]>(() => {
    const saved = localStorage.getItem('swimmingSessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [runningWorkouts, setRunningWorkouts] = useState<RunningWorkout[]>(() => {
    const saved = localStorage.getItem('runningWorkouts');
    return saved ? JSON.parse(saved) : defaultRunningWorkouts;
  });

  const [runningSessions, setRunningSessions] = useState<RunningSession[]>(() => {
    const saved = localStorage.getItem('runningSessions');
    return saved ? JSON.parse(saved) : [];
  });

  const [sportsSessions, setSportsSessions] = useState<SportsSession[]>(() => {
    const saved = localStorage.getItem('sportsSessions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('swimmingWorkouts', JSON.stringify(swimmingWorkouts));
  }, [swimmingWorkouts]);

  useEffect(() => {
    localStorage.setItem('swimmingSessions', JSON.stringify(swimmingSessions));
  }, [swimmingSessions]);

  useEffect(() => {
    localStorage.setItem('runningWorkouts', JSON.stringify(runningWorkouts));
  }, [runningWorkouts]);

  useEffect(() => {
    localStorage.setItem('runningSessions', JSON.stringify(runningSessions));
  }, [runningSessions]);

  useEffect(() => {
    localStorage.setItem('sportsSessions', JSON.stringify(sportsSessions));
  }, [sportsSessions]);

  const logSwimmingSession = (session: Omit<SwimmingSession, 'id' | 'date'>) => {
    const newSession: SwimmingSession = {
      ...session,
      id: `swim-session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setSwimmingSessions(prev => [...prev, newSession]);
    return newSession;
  };

  const logRunningSession = (session: Omit<RunningSession, 'id' | 'date'>) => {
    const newSession: RunningSession = {
      ...session,
      id: `run-session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setRunningSessions(prev => [...prev, newSession]);
    return newSession;
  };

  const logSportsSession = (session: Omit<SportsSession, 'id' | 'date'>) => {
    const newSession: SportsSession = {
      ...session,
      id: `sports-session-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setSportsSessions(prev => [...prev, newSession]);
    return newSession;
  };

  const addSwimmingWorkout = (workout: Omit<SwimmingWorkout, 'id'>) => {
    const newWorkout: SwimmingWorkout = {
      ...workout,
      id: `swim-${Date.now()}`,
    };
    setSwimmingWorkouts(prev => [...prev, newWorkout]);
    return newWorkout;
  };

  const addRunningWorkout = (workout: Omit<RunningWorkout, 'id'>) => {
    const newWorkout: RunningWorkout = {
      ...workout,
      id: `run-${Date.now()}`,
    };
    setRunningWorkouts(prev => [...prev, newWorkout]);
    return newWorkout;
  };

  return {
    swimmingWorkouts,
    setSwimmingWorkouts,
    swimmingSessions,
    logSwimmingSession,
    runningWorkouts,
    setRunningWorkouts,
    runningSessions,
    logRunningSession,
    sportsSessions,
    logSportsSession,
    addSwimmingWorkout,
    addRunningWorkout,
  };
}
