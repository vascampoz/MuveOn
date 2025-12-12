import { useState } from 'react';
import { User, Scale, Ruler, Target, Calendar, Edit3, Save } from 'lucide-react';
import { UserProfile } from '@/types/fitness';
import { LevelBadge } from '@/components/LevelBadge';
import { StreakBadge } from '@/components/StreakBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onAddWeight: (weight: number) => void;
}

export function ProfileView({ profile, onUpdateProfile, onAddWeight }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [newWeight, setNewWeight] = useState('');

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Perfil Atualizado!",
      description: "Suas informações foram salvas.",
    });
  };

  const handleAddWeight = () => {
    const weight = parseFloat(newWeight);
    if (!isNaN(weight) && weight > 0) {
      onAddWeight(weight);
      setNewWeight('');
      toast({
        title: "Peso Registrado! 📊",
        description: `+25 XP ganhos por registrar seu peso`,
      });
    }
  };

  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(profile.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display text-foreground">Meu Perfil</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
        </button>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="text-xl font-bold bg-muted/50 border-none"
              />
            ) : (
              <h2 className="text-xl font-bold font-display text-foreground">{profile.name}</h2>
            )}
            <p className="text-sm text-muted-foreground">
              {daysSinceStart} dias de jornada
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <LevelBadge level={profile.level} xp={profile.xp} />
          <StreakBadge streak={profile.streak} />
        </div>
      </div>

      {/* Add Weight */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-foreground mb-3">Registrar Peso de Hoje</h3>
        <div className="flex gap-3">
          <Input
            type="number"
            placeholder="Ex: 78.5"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-muted/50 border-none"
            step="0.1"
          />
          <Button
            onClick={handleAddWeight}
            disabled={!newWeight}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Scale className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Minhas Medidas</h3>
        
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Altura</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile.height}
                  onChange={(e) => setEditedProfile({ ...editedProfile, height: parseFloat(e.target.value) })}
                  className="h-8 bg-muted/50 border-none font-bold"
                />
              ) : (
                <p className="font-bold text-foreground">{profile.height} cm</p>
              )}
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Peso Inicial</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile.initialWeight}
                  onChange={(e) => setEditedProfile({ ...editedProfile, initialWeight: parseFloat(e.target.value) })}
                  className="h-8 bg-muted/50 border-none font-bold"
                  step="0.1"
                />
              ) : (
                <p className="font-bold text-foreground">{profile.initialWeight} kg</p>
              )}
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Meta de Peso</p>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedProfile.goalWeight}
                  onChange={(e) => setEditedProfile({ ...editedProfile, goalWeight: parseFloat(e.target.value) })}
                  className="h-8 bg-muted/50 border-none font-bold"
                  step="0.1"
                />
              ) : (
                <p className="font-bold text-foreground">{profile.goalWeight} kg</p>
              )}
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-info" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Data de Início</p>
              <p className="font-bold text-foreground">
                {new Date(profile.startDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
