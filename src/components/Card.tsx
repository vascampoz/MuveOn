/**
 * Componente de exemplo: Card reutilizável
 * Demonstra o padrão de uso de Design Tokens
 */

import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  title?: string;
}

export function Card({ children, title, style, ...props }: CardProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
});
