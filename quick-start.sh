#!/bin/bash
# Quick Start Commands for MuveOn App

# 📦 Instalação
npm install

# 🚀 Desenvolvimento
npm run start              # Inicia Expo dev server

# 📱 Plataformas
npm run ios               # iOS Simulator
npm run android           # Android Emulator
npm run web               # Web version

# 🏗️ Build
npm run build             # EAS Build (iOS + Android)
npm run build:local       # Build local

# 🔍 Qualidade
npm run lint              # ESLint check
npm run type-check        # TypeScript check

# 📚 Documentação
# - README.md
# - MIGRATION_GUIDE.md
# - MIGRATION_SUMMARY.md
# - SCREEN_TEMPLATE.tsx
# - frontend_instructions.md

# 🎨 Principais arquivos
# src/constants/theme.ts     - Design Tokens
# src/components/Button.tsx  - Exemplo de componente
# src/stores/fitnessStore.ts - Zustand store
# src/app/_layout.tsx        - Root layout
# src/app/(tabs)/_layout.tsx - Tabs navigation

# 📋 Checklist antes de começar
# [ ] npm install
# [ ] npm run start
# [ ] Testar no iOS/Android/Web
# [ ] Ler MIGRATION_GUIDE.md
# [ ] Ler frontend_instructions.md
# [ ] Começar a implementar screens

# 🆘 Problemas comuns
# "expo: command not found" → npm install -g eas-cli
# "Module not found" → npm install
# "Port 8081 already in use" → Kill process ou use outra porta

# 💡 Dicas
# - Use SCREEN_TEMPLATE.tsx como referência
# - Sempre use theme.* para cores/espaçamento
# - Componentes em src/components/ são reutilizáveis
# - State global em src/stores/fitnessStore.ts
# - Tipos em src/types/index.ts

echo "✅ MuveOn é um projeto React Native + Expo"
echo "📱 Pronto para iOS, Android e Web"
echo "🎨 Design Tokens implementados"
echo "🚀 Comece com: npm install && npm run start"
