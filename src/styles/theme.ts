export const theme = {
  colors: {
    background: '#0A0E1A',
    surface: '#151B2B',
    primary: '#00D9A3',
    secondary: '#FF6B9D',
    text: {
      primary: '#E8EAED',
      secondary: '#9CA3AF',
    },
    border: 'rgba(255,255,255,0.08)',
    editor: {
      background: '#0D1117',
    },
  },
  spacing: {
    base: 8,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 6,
    lg: 8,
  },
  typography: {
    fontFamily: {
      sans: "'Inter', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
  },
} as const;

export type Theme = typeof theme;
