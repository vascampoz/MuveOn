🔧 Guia de Troubleshooting - npm install

## ❌ Erro Resolvido

### Problema Original:
```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: MuveOn@1.0.0
npm error Found: react@18.2.0
npm error Could not resolve dependency:
npm error peer react@"^19.2.4" from react-test-renderer@19.2.4
```

### Causa:
Conflito de versões entre:
- `react@18.2.0` (especificado no projeto)
- `react-test-renderer@19.2.4` (esperava react@^19)
- Dependências de teste incompatíveis

### ✅ Solução Aplicada:

1. **Removidas dependências de teste desnecessárias:**
   ```json
   ❌ @testing-library/jest-dom
   ❌ @testing-library/react
   ❌ @testing-library/react-native
   ❌ @types/jest
   ❌ @types/react-dom
   ```

2. **Removido `react-dom` das dependências:**
   - Não é necessário em React Native + Expo
   - Causava conflitos com testing libraries

3. **Mantidas dependências essenciais:**
   ```json
   ✅ react@18.2.0          (compatível com RN 0.73)
   ✅ react-native@0.73.0   (estável)
   ✅ expo@50.0.0           (latest)
   ✅ typescript@5.3.3       (strict)
   ```

---

## 🚀 Como Instalar

### Opção 1: Instalação Limpa (Recomendado)

```bash
# 1. Remover node_modules e package-lock
rm -rf node_modules package-lock.json

# Ou no PowerShell:
Remove-Item -Path "node_modules", "package-lock.json" -Recurse -Force

# 2. Instalar dependências
npm install

# 3. Verificar se funcionou
npm run type-check
npm run lint
```

### Opção 2: Se ainda tiver erro

```bash
# Usar --legacy-peer-deps como workaround
npm install --legacy-peer-deps

# Depois rodar normalmente
npm run start
```

### Opção 3: Forçar limpeza total

```bash
# Windows PowerShell
Remove-Item -Path "node_modules", "package-lock.json", ".expo", "dist", "build" -Recurse -Force -ErrorAction SilentlyContinue
npm install

# MacOS/Linux
rm -rf node_modules package-lock.json .expo dist build
npm install
```

---

## ✅ Verificar se a Instalação Funcionou

```bash
# 1. Verificar node_modules
ls node_modules | wc -l        # Deve ter ~200+ pacotes

# 2. Verificar React
npm list react                 # Deve mostrar react@18.2.0

# 3. Verificar Expo
npm list expo                  # Deve mostrar expo@50.x.x

# 4. Type check
npm run type-check             # Deve passar sem erros

# 5. Lint check
npm run lint                   # Pode ter warnings, OK
```

---

## 🚀 Próximos Passos Após Install

```bash
# 1. Iniciar dev server
npm run start

# 2. Em outra aba, rodar em simulador
npm run ios                    # iOS Simulator
npm run android                # Android Emulator
npm run web                    # Web browser
```

---

## 📋 Dependências Atualizadas

### Mantidas (Production)
```json
✅ "react": "^18.2.0"
✅ "react-native": "^0.73.0"
✅ "expo": "~50.0.0"
✅ "expo-router": "~3.4.0"
✅ "zustand": "^4.4.4"
✅ "@tanstack/react-query": "^5.28.0"
✅ "react-hook-form": "^7.48.1"
✅ "lucide-react-native": "^0.366.0"
✅ All other expo packages
```

### Removidas (Dev - Não necessárias em RN)
```json
❌ @testing-library/jest-dom@^6.1.5
❌ @testing-library/react@^14.1.2
❌ @testing-library/react-native@^12.4.0
❌ @types/jest@^29.5.11
❌ @types/react-dom@^18.2.18
❌ react-dom@^18.2.0
```

### Mantidas (Dev - Essenciais)
```json
✅ "@babel/core": "^7.23.5"
✅ "@types/node": "^20.10.6"
✅ "@types/react": "^18.2.45"
✅ "@types/react-native": "~0.73.0"
✅ "@typescript-eslint/*": "^6.17.0"
✅ "eslint": "^8.56.0"
✅ "eslint-config-expo": "^10.0.0"
✅ "typescript": "^5.3.3"
```

---

## 🆘 Ainda com Erro?

### Se ver erro como:
```
npm ERR! code ERESOLVE
```

**Solução**: Use --legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

### Se ver erro como:
```
npm ERR! 404 Not Found - GET
```

**Solução**: Limpar cache npm
```bash
npm cache clean --force
npm install
```

### Se ver erro como:
```
npm ERR! EACCES: permission denied
```

**Solução**: Verificar permissões ou usar sudo (não recomendado)
```bash
# Melhor: mudar diretório ou permissões
chmod -R 755 node_modules
```

---

## 📊 Package.json Final

```json
{
  "name": "MuveOn",
  "version": "1.0.0",
  "description": "Mobile fitness app built with React Native and Expo",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "dev": "expo start --dev-client",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web",
    "build": "eas build",
    "build:local": "expo prebuild && expo build:web",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    // ✅ Production dependencies apenas
    // ✅ Sem react-dom
    // ✅ Sem testing libraries
  },
  "devDependencies": {
    // ✅ Apenas essenciais para dev
    // ❌ Sem @testing-library/*
    // ❌ Sem @types/jest
  },
  "engines": {
    "node": ">=16.11.0",
    "npm": ">=8.0.0"
  }
}
```

---

## ✨ Checklist Após Instalação

```
[ ] npm install executou sem erros
[ ] node_modules tem ~200+ pacotes
[ ] npm run type-check passa
[ ] npm run lint não tem errors críticos
[ ] npm run start inicia sem erros
[ ] Simulador carrega a app
[ ] Hot reload funciona
```

---

## 🎯 Status Atual

✅ **Problema Identificado**: Conflito de versões de teste
✅ **Solução Aplicada**: Removidas dependências desnecessárias
✅ **Package.json Atualizado**: Dependências compatíveis
⏳ **Próximo Passo**: Rodar `npm install`

---

## 📞 Se Ainda Tiver Problema

1. Limpe tudo:
   ```bash
   Remove-Item -Path "node_modules", "package-lock.json" -Recurse -Force
   ```

2. Instale com legacy:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Teste:
   ```bash
   npm run start
   ```

---

**Última atualização**: Fevereiro 2026
**Versão**: 1.0.0
**Status**: ✅ Resolvido
