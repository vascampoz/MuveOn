# 🏃 MuveOn App

Uma aplicação mobile de fitness construída com **React Native**, **Expo**, e **TypeScript**, seguindo princípios de Mobile-First, Pixel Perfect UI, e Design Tokens.

## 🎯 Objetivo

MuveOn permite aos usuários rastrear seus treinos, progressos, conectar com amigos e manter uma sequência de exercícios consistente.

## 🛠️ Stack Técnico

- **Framework**: React Native + Expo SDK 50
- **Linguagem**: TypeScript (strict mode)
- **Routing**: Expo Router (file-based)
- **Styling**: Design Tokens + StyleSheet nativo
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Formulários**: React Hook Form
- **Ícones**: Lucide React Native
- **Imagens**: expo-image (cache otimizado)

## 📱 Plataformas Suportadas

- ✅ iOS (via Expo)
- ✅ Android (via Expo)
- ✅ Web (via Expo Web)

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Rotas Expo Router
│   ├── _layout.tsx        # Root layout
│   └── (tabs)/            # Tab navigation
│       ├── index.tsx      # Home
│       ├── train.tsx      # Treinar
│       ├── progress.tsx   # Progresso
│       ├── team.tsx       # Equipe
│       └── profile.tsx    # Perfil
│
├── components/            # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── StatCard.tsx
│   ├── WorkoutCard.tsx
│   └── ModalitySelector.tsx
│
├── constants/
│   └── theme.ts           # Design Tokens
│
├── hooks/                 # Custom React Hooks
├── lib/                   # Utilitários
│   ├── utils.ts
│   └── constants.ts
│
├── stores/                # Zustand state
│   └── fitnessStore.ts
│
└── types/                 # TypeScript definitions
    └── index.ts
```

## ✨ Regras de Codificação

### ✅ Obrigatório

1. **Zero HTML**: Apenas React Native (`View`, `Text`, `Pressable`)
2. **Design Tokens**: Sempre usar `theme.*` de `src/constants/theme.ts`
3. **TypeScript Strict**: Tipos explícitos em tudo
4. **Componentes Reutilizáveis**: Extrair padrões repetidos
5. **Flexbox para Layout**: Auto Layout do Figma → Flexbox

### ❌ Proibido

- Valores hardcoded (`#F4511E`, `16`, etc)
- Tags HTML (`div`, `p`, `span`)
- `any` types
- Componentes duplicados não reutilizáveis

## 🚀 Quick Start

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone <REPO_URL>
cd MuveOn.App

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

## 📚 Documentação

- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Arquitetura completa
- **[frontend_instructions.md](frontend_instructions.md)** - Diretrizes detalhadas de codificação

## 🎨 Design Tokens

Todos os estilos estão centralizados em `src/constants/theme.ts`:

```typescript
import { theme } from '@/constants/theme';

// Cores
theme.colors.primary       // #4F46E5
theme.colors.secondary     // #EC4899
theme.colors.success       // #10B981
theme.colors.warning       // #F59E0B
theme.colors.error         // #EF4444

// Espaçamento
theme.spacing.xs   // 4px
theme.spacing.sm   // 8px
theme.spacing.md   // 16px
theme.spacing.lg   // 24px
theme.spacing.xl   // 32px

// Tipografia
theme.fontSize.sm      // 14
theme.fontSize.body    // 16
theme.fontSize.lg      // 18
theme.fontWeight.semibold // '600'

// Arredondamento
theme.radius.md    // 8px
theme.radius.lg    // 12px
theme.radius.full  // 999px
```

## 🧩 Componentes Base

### Button

```typescript
<Button
  label="Treinar"
  variant="primary"      // 'primary' | 'secondary' | 'outline' | 'ghost'
  size="md"             // 'sm' | 'md' | 'lg'
  onPress={() => {}}
  fullWidth
  loading={false}
/>
```

### Card

```typescript
<Card title="Estatísticas">
  <Text>Conteúdo aqui</Text>
</Card>
```

### StatCard

```typescript
<StatCard
  icon={TrendingUp}
  label="Calorias Queimadas"
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
  onSelect={(id) => console.log(id)}
/>
```

## 🔄 State Management (Zustand)

```typescript
import { useFitnessStore } from '@/stores/fitnessStore';

function MyComponent() {
  const { workouts, addWorkout, updateWorkout } = useFitnessStore();

  return (
    <View>
      <Text>Treinos: {workouts.length}</Text>
    </View>
  );
}
```

## 📝 Exemplo de Tela Completa

```typescript
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { StatCard } from '@/components/StatCard';
import { TrendingUp } from 'lucide-react-native';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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

## 📦 Scripts npm

```bash
npm run start           # Inicia dev mode (Expo)
npm run dev            # Dev client mode
npm run ios            # Build/run iOS
npm run android        # Build/run Android
npm run web            # Run web version
npm run build          # EAS Build
npm run build:local    # Build local
npm run lint           # ESLint
npm run type-check     # TypeScript type check
```

## 🔧 Configurações Importantes

### `app.json`
Config Expo com metadados, plugins, orientação de tela, etc.

### `tsconfig.json`
- `strict: true` para máxima segurança de tipos
- Path aliases `@/*` para imports relativos

### `.eslintrc.js`
Regras para React Native, TypeScript e Hooks.

### `package.json`
- Expo Router para file-based routing
- React Native 0.73
- TypeScript estrito

## 📐 Padrões & Best Practices

### Flexbox (Auto Layout do Figma)

```typescript
// Horizontal com gap
<View style={{ flexDirection: 'row', gap: theme.spacing.md }}>
  <View />
  <View />
</View>

// Hug contents (ajusta ao conteúdo)
<View style={{ alignSelf: 'flex-start' }} />

// Fill container
<View style={{ flex: 1 }} />

// Centralized
<View
  style={{
    alignItems: 'center',
    justifyContent: 'center',
  }}
/>
```

### Responsividade

```typescript
import { Platform } from 'react-native';

Platform.select({
  ios: { /* iOS specific */ },
  android: { /* Android specific */ },
  web: { /* Web specific */ },
  default: { /* fallback */ },
})
```

### Tipagem de Props

```typescript
import { ViewProps } from 'react-native';

interface MyComponentProps extends ViewProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function MyComponent({
  label,
  onPress,
  disabled,
  style,
  ...props
}: MyComponentProps) {
  return <View style={style} {...props} />;
}
```

## ⚠️ Erros Comuns

| ❌ Errado | ✅ Correto |
|----------|-----------|
| `<div>Text</div>` | `<View><Text>Text</Text></View>` |
| `color: '#F4511E'` | `color: theme.colors.primary` |
| `fontSize: 18` | `fontSize: theme.fontSize.lg` |
| `padding: 16` | `padding: theme.spacing.md` |
| `function Component(props: any)` | Tipos explícitos com interface |
| Estilos inline no JSX | StyleSheet.create() |

## 🚀 Deployment

### iOS (App Store)

```bash
npm run build         # Build com EAS
```

### Android (Google Play)

```bash
npm run build         # Build com EAS
```

## 📚 Recursos Externos

- [Expo Documentation](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Query](https://tanstack.com/query/latest)

## 🎯 Roadmap

- [ ] Autenticação (Firebase/Auth0)
- [ ] Sincronização de dados em cloud
- [ ] Notificações push
- [ ] Câmera e galeria
- [ ] Mapas e localização
- [ ] Otimização de performance
- [ ] Testes automatizados
- [ ] Deploy App Store & Play Store
- [ ] Modo offline
- [ ] Dark mode

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

**Importante**: Siga as regras em [frontend_instructions.md](frontend_instructions.md).

## 📄 Licença

MIT License - veja LICENSE para detalhes.

## 👤 Autor

**MuveOn Team**

---

**Status**: 🚀 Em Desenvolvimento  
**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026  
**Node**: >=16.11.0  
**npm**: >=8.0.0
