import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface ContainerProps {
  children: React.ReactNode;
  padding?: boolean;
}

export function Container({ children, padding = true }: ContainerProps) {
  return (
    <View style={[styles.container, padding && styles.padding]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  padding: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
});
