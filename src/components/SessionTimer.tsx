import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HIITProtocol } from '@/types/fitness';
import { cn } from '@/lib/utils';

interface SessionTimerProps {
  protocol: HIITProtocol;
  workTime?: number; // seconds
  restTime?: number; // seconds
  rounds?: number;
  onComplete?: (totalTime: number) => void;
  onRoundComplete?: (round: number) => void;
}

export function SessionTimer({
  protocol,
  workTime = 20,
  restTime = 10,
  rounds = 8,
  onComplete,
  onRoundComplete,
}: SessionTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [isWork, setIsWork] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [totalElapsed, setTotalElapsed] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentRound(1);
    setIsWork(true);
    setTimeLeft(workTime);
    setTotalElapsed(0);
  }, [workTime]);

  const skipPhase = useCallback(() => {
    if (isWork) {
      if (protocol !== 'amrap') {
        setIsWork(false);
        setTimeLeft(restTime);
      }
    } else {
      if (currentRound >= rounds) {
        setIsRunning(false);
        onComplete?.(totalElapsed);
      } else {
        setCurrentRound(prev => prev + 1);
        setIsWork(true);
        setTimeLeft(workTime);
        onRoundComplete?.(currentRound);
      }
    }
  }, [isWork, currentRound, rounds, workTime, restTime, protocol, totalElapsed, onComplete, onRoundComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setTotalElapsed(prev => prev + 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      skipPhase();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, skipPhase]);

  const progress = isWork 
    ? ((workTime - timeLeft) / workTime) * 100 
    : ((restTime - timeLeft) / restTime) * 100;

  const protocolLabels: Record<HIITProtocol, string> = {
    tabata: 'TABATA',
    emom: 'EMOM',
    amrap: 'AMRAP',
    fortime: 'FOR TIME',
    custom: 'CUSTOM',
  };

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Protocol Badge */}
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-bold">
          {protocolLabels[protocol]}
        </span>
        <span className="text-sm text-muted-foreground">
          Round {currentRound}/{rounds}
        </span>
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            fill="none"
            stroke={isWork ? "hsl(var(--primary))" : "hsl(var(--accent))"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            className="transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 10px ${isWork ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--accent) / 0.5)'})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn(
            "text-sm font-bold uppercase tracking-wider",
            isWork ? "text-primary" : "text-accent"
          )}>
            {isWork ? 'WORK' : 'REST'}
          </span>
          <span className="text-5xl font-bold font-display text-foreground">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={reset}
          className="w-12 h-12 rounded-xl"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>

        <Button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "w-16 h-16 rounded-2xl",
            isRunning ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
          )}
        >
          {isRunning ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-1" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={skipPhase}
          className="w-12 h-12 rounded-xl"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
      </div>

      {/* Total Time */}
      <div className="text-center text-sm text-muted-foreground">
        Tempo total: <span className="font-medium text-foreground">{formatTime(totalElapsed)}</span>
      </div>
    </div>
  );
}
