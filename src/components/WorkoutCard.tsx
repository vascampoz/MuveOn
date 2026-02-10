/**
 * Componente de exemplo: WorkoutCard
 * Cartão de treino reutilizável seguindo Design Tokens
 */

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '@/constants/theme';
import { Clock, MapPin, Flame } from 'lucide-react-native';

interface WorkoutCardProps {
  title: string;
  modality: string;
  duration: number;
  distance?: number;
  calories?: number;
  onPress?: () => void;
}

export function WorkoutCard({
  title,
  modality,
  duration,
  distance,
  calories,
  onPress,
}: WorkoutCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.modality}>{modality}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Clock size={16} color={theme.colors.primary} />
          <Text style={styles.statText}>{duration}min</Text>
        </View>

        {distance && (
          <View style={styles.stat}>
            <MapPin size={16} color={theme.colors.primary} />
            <Text style={styles.statText}>{distance.toFixed(2)}km</Text>
          </View>
        )}

        {calories && (
          <View style={styles.stat}>
            <Flame size={16} color={theme.colors.warning} />
            <Text style={styles.statText}>{calories}kcal</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  modality: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  stats: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
});
