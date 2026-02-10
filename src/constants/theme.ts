/**
 * Design Tokens & Theme
 * Centraliza todas as cores, espaçamentos, fontes e constantes de UI
 * Seguindo a metodologia de Mobile-First e Responsive Design
 */

export const theme = {
  colors: {
    // Primárias
    primary: '#4F46E5', // Indigo
    primaryLight: '#6366F1',
    primaryDark: '#4338CA',
    
    // Secundárias
    secondary: '#EC4899', // Pink
    secondaryLight: '#F472B6',
    secondaryDark: '#BE185D',
    
    // Neutras
    white: '#FFFFFF',
    black: '#000000',
    
    // Grayscale
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    
    // Estados
    success: '#10B981',
    successLight: '#6EE7B7',
    warning: '#F59E0B',
    warningLight: '#FCD34D',
    error: '#EF4444',
    errorLight: '#FCA5A5',
    info: '#3B82F6',
    infoLight: '#93C5FD',
    
    // Backgrounds
    surface: '#F9FAFB',
    surfaceHover: '#F3F4F6',
    background: '#FFFFFF',
    
    // Text
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    textInverse: '#FFFFFF',
    
    // Borders
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    body: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  radius: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  
  shadows: {
    none: 'none',
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.15,
      shadowRadius: 25,
      elevation: 12,
    },
  },
};

export type Theme = typeof theme;
