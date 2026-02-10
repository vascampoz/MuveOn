/**
 * Componente de exemplo: ModalitySelector
 * Seletor de modalidades de treino
 * Demonstra uso de Flexbox (Auto Layout) e Design Tokens
 */

import { View, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '@/constants/theme';
import { MODALITIES } from '@/lib/constants';
import * as Icons from 'lucide-react-native';

interface ModalitySelectorProps {
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ModalitySelector({
  selectedId,
  onSelect,
}: ModalitySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {MODALITIES.map((modality) => {
        const isSelected = selectedId === modality.id;
        // @ts-ignore - Icons dinâmicos
        const Icon = Icons[modality.icon];

        return (
          <Pressable
            key={modality.id}
            style={({ pressed }) => [
              styles.chip,
              isSelected && styles.chipSelected,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => onSelect(modality.id)}
          >
            <Icon
              size={20}
              color={isSelected ? theme.colors.white : theme.colors.primary}
            />
            <Text
              style={[
                styles.chipText,
                isSelected && styles.chipTextSelected,
              ]}
            >
              {modality.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  contentContainer: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary,
  },
  chipTextSelected: {
    color: theme.colors.white,
  },
});
