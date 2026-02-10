import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { theme } from '@/constants/theme';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  onPress,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  const getBackgroundColor = () => {
    if (isDisabled) return theme.colors.gray200;
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'outline':
        return theme.colors.white;
      case 'ghost':
        return 'transparent';
      default:
        return theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (isDisabled) return theme.colors.textTertiary;
    switch (variant) {
      case 'primary':
      case 'secondary':
        return theme.colors.white;
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.white;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return theme.spacing.sm;
      case 'lg':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          paddingVertical: getPadding(),
          paddingHorizontal: getPadding() * 1.5,
          width: fullWidth ? '100%' : 'auto',
          borderColor: variant === 'outline' ? theme.colors.border : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: pressed && !isDisabled ? 0.8 : 1,
        },
      ]}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      <Text
        style={[
          styles.text,
          {
            color: getTextColor(),
            fontSize: size === 'sm' ? theme.fontSize.sm : theme.fontSize.body,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: theme.fontWeight.semibold,
  },
});
