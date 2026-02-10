/**
 * GUIA: Como criar uma nova tela/página no projeto
 * 
 * Este arquivo demonstra o padrão a seguir para manter
 * consistência no projeto.
 */

import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import { useFitnessStore } from '@/stores/fitnessStore';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

/**
 * Exemplo de tela completa seguindo as regras do projeto
 */
export default function ExampleScreen() {
  // 1. Use Zustand stores para estado global
  const { workouts, addWorkout } = useFitnessStore();

  // 2. State local com useState se necessário
  // const [loading, setLoading] = useState(false);

  // 3. Handlers
  const handleAddWorkout = () => {
    // Adicionar lógica aqui
  };

  // 4. Return com estrutura consistente
  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView para conteúdo longo */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com título */}
        <Text style={styles.title}>Minha Tela</Text>
        <Text style={styles.subtitle}>Descrição da tela</Text>

        {/* Conteúdo com Cards */}
        <Card title="Seção 1">
          <Text style={styles.cardText}>Conteúdo do card</Text>
        </Card>

        {/* Componentes customizados */}
        <View style={styles.spacer} />

        {/* Botões */}
        <Button
          label="Ação Primária"
          variant="primary"
          fullWidth
          onPress={handleAddWorkout}
        />

        <View style={styles.spacer} />

        <Button
          label="Ação Secundária"
          variant="outline"
          fullWidth
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// 5. StyleSheet sempre com tema
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  cardText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
  spacer: {
    height: theme.spacing.md,
  },
});

/**
 * CHECKLIST ao criar uma nova tela:
 * 
 * ✅ Imports do theme
 * ✅ SafeAreaView para safe areas
 * ✅ ScrollView para conteúdo longo
 * ✅ StyleSheet com tema
 * ✅ Props tipadas (interface)
 * ✅ Sem hardcoding de cores/tamanhos
 * ✅ Sem tags HTML
 * ✅ Usando componentes reutilizáveis
 * ✅ Use Zustand para estado global
 * ✅ Comentários explicativos
 * 
 * ❌ Não use: div, p, span, <></>, etc
 * ❌ Não use: #colors, fontSize: 18, padding: 16
 * ❌ Não use: inline styles (exceto estado dinâmico)
 * ❌ Não use: any types
 */
