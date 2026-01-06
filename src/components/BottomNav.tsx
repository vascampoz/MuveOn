import { Home, Dumbbell, TrendingUp, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'train', icon: Dumbbell, label: 'Treinar' },
    { id: 'progress', icon: TrendingUp, label: 'Progresso' },
    { id: 'team', icon: Users, label: 'Equipe' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn("nav-item flex-1", isActive && "active")}
            >
              <Icon className={cn("w-5 h-5 transition-all", isActive && "scale-110")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
