import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Seu Progresso</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Peso</Text>
          <Text style={styles.cardText}>75kg → 73kg</Text>
          <Text style={styles.progress}>-2kg em 30 dias</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Distância Total</Text>
          <Text style={styles.cardText}>50km</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sequência de Treinos</Text>
          <Text style={styles.cardText}>12 dias</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  cardTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  progress: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.success,
    marginTop: theme.spacing.sm,
  },
});
