import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bem-vindo ao MuveOn</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hoje</Text>
          <Text style={styles.cardText}>0 kcal queimadas</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Esta Semana</Text>
          <Text style={styles.cardText}>0 exercícios</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meta Pessoal</Text>
          <Text style={styles.cardText}>Defina suas metas</Text>
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
    borderLeftColor: theme.colors.primary,
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
});
