import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { HomeView } from '@/components/views/HomeView';
import { WorkoutView } from '@/components/views/WorkoutView';
import { ProgressView } from '@/components/views/ProgressView';
import { ProfileView } from '@/components/views/ProfileView';
import { useFitnessStore } from '@/hooks/useFitnessStore';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const {
    profile,
    setProfile,
    weightHistory,
    addWeightEntry,
    workouts,
    workoutLogs,
    logWorkout,
    calculateBMI,
    getStrengthProgress,
  } = useFitnessStore();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            profile={profile}
            weightHistory={weightHistory}
            calculateBMI={calculateBMI}
          />
        );
      case 'workout':
        return (
          <WorkoutView
            workouts={workouts}
            onLogWorkout={logWorkout}
          />
        );
      case 'progress':
        return (
          <ProgressView
            strengthProgress={getStrengthProgress()}
            workoutLogs={workoutLogs}
          />
        );
      case 'profile':
        return (
          <ProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            onAddWeight={addWeightEntry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-md mx-auto px-4 pt-6">
        {renderView()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster />
    </div>
  );
};

export default Index;
