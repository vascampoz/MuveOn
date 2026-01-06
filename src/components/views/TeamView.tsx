import { useState } from 'react';
import { MessageCircle, Send, UserPlus, FileText, CheckCircle } from 'lucide-react';
import { TeamMember, Message } from '@/types/fitness';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const mockTeam: TeamMember[] = [
  {
    id: 'trainer-1',
    name: 'Carlos (Personal)',
    role: 'trainer',
    avatar: undefined,
    lastActive: '2 min atrás',
  },
  {
    id: 'nutri-1',
    name: 'Dra. Ana (Nutri)',
    role: 'nutritionist',
    avatar: undefined,
    lastActive: '1h atrás',
  },
];

const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'trainer-1',
    receiverId: 'athlete',
    content: 'Ótimo treino ontem! Continue assim 💪',
    timestamp: '2024-01-20T10:30:00',
    read: true,
  },
  {
    id: 'msg-2',
    senderId: 'athlete',
    receiverId: 'trainer-1',
    content: 'Valeu, Carlos! Aumentei a carga no supino!',
    timestamp: '2024-01-20T10:35:00',
    read: true,
  },
  {
    id: 'msg-3',
    senderId: 'trainer-1',
    receiverId: 'athlete',
    content: 'Perfeito! Semana que vem vamos evoluir o treino de pernas.',
    timestamp: '2024-01-20T10:40:00',
    read: false,
  },
];

export function TeamView() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [messages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const roleLabels = {
    trainer: 'Personal Trainer',
    nutritionist: 'Nutricionista',
    athlete: 'Atleta',
  };

  const roleColors = {
    trainer: 'bg-primary/20 text-primary',
    nutritionist: 'bg-success/20 text-success',
    athlete: 'bg-accent/20 text-accent',
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  if (selectedMember) {
    const memberMessages = messages.filter(
      m => m.senderId === selectedMember.id || m.receiverId === selectedMember.id
    );

    return (
      <div className="flex flex-col h-[calc(100vh-140px)] pb-4 animate-slide-up">
        {/* Chat Header */}
        <div className="glass-card p-4 flex items-center gap-3 mb-4">
          <button
            onClick={() => setSelectedMember(null)}
            className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            ←
          </button>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xl font-bold text-primary-foreground">
            {selectedMember.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{selectedMember.name}</h3>
            <p className="text-xs text-muted-foreground">{selectedMember.lastActive}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 px-1">
          {memberMessages.map((msg) => {
            const isMe = msg.senderId === 'athlete';
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  isMe ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[80%] p-3 rounded-2xl",
                  isMe 
                    ? "bg-primary text-primary-foreground rounded-br-md" 
                    : "bg-muted text-foreground rounded-bl-md"
                )}>
                  <p className="text-sm">{msg.content}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1",
                    isMe ? "justify-end" : "justify-start"
                  )}>
                    <span className={cn(
                      "text-xs",
                      isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {formatTime(msg.timestamp)}
                    </span>
                    {isMe && msg.read && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground/70" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button size="icon" className="h-12 w-12 rounded-xl">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Minha Equipe</h1>
        <p className="text-muted-foreground">Conecte-se com seus profissionais</p>
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {mockTeam.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="w-full glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xl font-bold text-primary-foreground">
              {member.name.charAt(0)}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  roleColors[member.role]
                )}>
                  {roleLabels[member.role]}
                </span>
                <span className="text-xs text-muted-foreground">{member.lastActive}</span>
              </div>
            </div>
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Add Professional */}
      <button className="w-full glass-card p-4 flex items-center gap-4 border-2 border-dashed border-muted transition-all duration-300 hover:border-primary/50">
        <div className="w-14 h-14 rounded-full bg-muted/50 flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-foreground">Adicionar Profissional</h3>
          <p className="text-sm text-muted-foreground">Personal, nutricionista...</p>
        </div>
      </button>

      {/* Recent Plans */}
      <div>
        <h2 className="text-lg font-semibold font-display text-foreground mb-3">Planos Recebidos</h2>
        <div className="space-y-3">
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Treino Semana 4</h3>
              <p className="text-sm text-muted-foreground">Por Carlos • 2 dias atrás</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">Dieta Cutting</h3>
              <p className="text-sm text-muted-foreground">Por Dra. Ana • 1 semana atrás</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
