# MuveOn - React Native + Expo

Aplicação mobile de fitness construída com **React Native**, **Expo** e **TypeScript**.

## 📋 Estrutura do Projeto

```
src/
├── app/                    # Rotas Expo Router (file-based routing)
│   ├── _layout.tsx        # Root layout com SafeAreaProvider e GestureHandler
│   └── (tabs)/            # Group de abas
│       ├── _layout.tsx    # Tabs layout navigation
│       ├── index.tsx      # Home screen
│       ├── train.tsx      # Training screen
│       ├── progress.tsx   # Progress screen
│       ├── team.tsx       # Team screen
│       └── profile.tsx    # Profile screen
│
├── components/            # Componentes reutilizáveis
│   ├── Button.tsx         # Botão com variantes
│   ├── Card.tsx           # Card reutilizável
│   ├── Container.tsx      # Container com layout
│   ├── StatCard.tsx       # Card de estatísticas
│   ├── WorkoutCard.tsx    # Card de treino
│   ├── ModalitySelector.tsx # Seletor de modalidades
│   └── training/          # Componentes de treino
│
├── constants/             
│   └── theme.ts           # Design Tokens (cores, espaçamentos, fontes)
│
├── hooks/                 # Custom React hooks
├── lib/                   # Utilitários e constantes
│   ├── utils.ts           # Funções helper
│   └── constants.ts       # Constantes da app
│
├── stores/                # Zustand stores
│   └── fitnessStore.ts    # Estado global fitness
│
└── types/                 # TypeScript type definitions
    └── index.ts           # Tipos compartilhados
```

## 🎨 Design Tokens

Todos os estilos usam o arquivo centralizado `src/constants/theme.ts`:

```typescript
import { theme } from '@/constants/theme';

// ✅ CERTO - Usar tokens
<View style={{ backgroundColor: theme.colors.primary }} />
<Text style={{ fontSize: theme.fontSize.lg }} />

// ❌ ERRADO - Magic numbers
<View style={{ backgroundColor: '#4F46E5' }} />
<Text style={{ fontSize: 18 }} />
```

## 📱 Componentes

### Button
```typescript
<Button
  label="Treinar"
  variant="primary"    // 'primary' | 'secondary' | 'outline' | 'ghost'
  size="md"           // 'sm' | 'md' | 'lg'
  onPress={() => {}}
  fullWidth
/>
```

### StatCard
```typescript
<StatCard
  icon={TrendingUp}
  label="Calorias"
  value={245}
  unit="kcal"
  color={theme.colors.success}
/>
```

### WorkoutCard
```typescript
<WorkoutCard
  title="Corrida Matinal"
  modality="Corrida"
  duration={45}
  distance={5.2}
  calories={450}
  onPress={() => {}}
/>
```

### ModalitySelector
```typescript
<ModalitySelector
  selectedId="running"
  onSelect={(id) => {}}
/>
```

## 🚀 Scripts

```bash
# Desenvolvimento
npm run start              # Inicia o Expo dev server

# iOS/Android
npm run ios               # Roda no simulador iOS
npm run android           # Roda no emulador Android

# Web
npm run web               # Roda versão web

# Build
npm run build             # Build com EAS
npm run build:local       # Build local

# Linting
npm run lint              # ESLint
npm run type-check        # TypeScript check
```

## 📦 Dependências Principais

- **Expo Router**: File-based routing
- **React Native**: Framework mobile
- **TypeScript**: Type safety
- **Zustand**: State management
- **React Query**: Data fetching
- **Lucide React Native**: Ícones
- **React Hook Form**: Forms
- **SafeAreaContext**: Safe areas
- **GestureHandler**: Gestures

## ✅ Regras de Codificação

### Zero HTML
Nunca use tags HTML. Apenas componentes React Native:

```typescript
// ✅ CERTO
<View>
  <Text>Hello</Text>
</View>

// ❌ ERRADO
<div>
  <p>Hello</p>
</div>
```

### Design Tokens
Sempre use `theme.*` em vez de valores hardcoded:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,        // ✅
    marginBottom: 16,                 // ❌
    backgroundColor: theme.colors.primary,  // ✅
    color: '#4F46E5',                // ❌
  },
});
```

### Componentes Reutilizáveis
Extraia componentes que se repetem:

```typescript
// Não repita estilos - crie componentes
<Button label="Sim" />
<Button label="Não" />
```

### TypeScript Strict
Sempre use tipos explícitos:

```typescript
// ✅ CERTO
interface UserProps {
  id: string;
  name: string;
}

export function User({ id, name }: UserProps) {}

// ❌ ERRADO
export function User({ id, name }: any) {}
```

## 🎯 Estrutura de Tipos

Tipos compartilhados em `src/types/index.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  level: number;
  experience: number;
}

export interface Workout {
  id: string;
  name: string;
  modality: 'running' | 'swimming' | 'cycling' | 'strength' | 'sports';
  duration: number;
  distance?: number;
  calories?: number;
}
```

## 🔄 Estado Global (Zustand)

```typescript
import { useFitnessStore } from '@/stores/fitnessStore';

function MyComponent() {
  const { workouts, addWorkout } = useFitnessStore();
  
  return <View>{/* ... */}</View>;
}
```

## 📝 Exemplo de Tela

```typescript
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { StatCard } from '@/components/StatCard';
import { TrendingUp } from 'lucide-react-native';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <StatCard
          icon={TrendingUp}
          label="Progresso"
          value="85%"
          color={theme.colors.success}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
});
```

## 🔧 Configuração do Projeto

### `app.json` - Config Expo
Define metadados da app, plugins, e configurações de iOS/Android.

### `tsconfig.json` - TypeScript
- `strict: true` para máxima segurança de tipos
- Paths aliases `@/*` para importações relativas

### `.eslintrc.js` - Linting
Regras para React Native, TypeScript e Hooks.

## 🎭 Theming

A paleta de cores está em `src/constants/theme.ts`:

- **Primárias**: Indigo (principal), Pink (secundária)
- **Estados**: Success (verde), Warning (amarelo), Error (vermelho)
- **Grayscale**: Gray50-Gray900 para backgrounds e texto
- **Shadows**: sm, md, lg, xl para profundidade

## 📚 Próximos Passos

1. Integrar APIs com React Query
2. Implementar autenticação
3. Adicionar notificações com expo-notifications
4. Configurar build com EAS
5. Submeter para App Store e Google Play

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026
