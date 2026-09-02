export const COLORS = {
  // Primary Forest/Medical Green
  primary: '#166534', // forest green
  primaryLight: '#22c55e',
  primaryDark: '#14532d',
  primarySurface: '#f0fdf4',

  // Secondary Light Green
  secondary: '#86efac',
  secondaryLight: '#dcfce7',
  secondaryMuted: '#bbf7d0',

  // Accent Blue
  accent: '#0284c7',
  accentLight: '#e0f2fe',
  accentDark: '#0369a1',

  // Neutrals & Backgrounds
  background: '#f8faf9',
  surface: '#ffffff',
  surfaceSubtle: '#f1f5f3',
  border: '#e2e8f0',
  borderSubtle: '#edf2f7',

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  textInverse: '#ffffff',

  // Status Badges
  status: {
    pendingBg: '#fef3c7',
    pendingText: '#92400e',
    approvedBg: '#dcfce7',
    approvedText: '#15803d',
    rejectedBg: '#fee2e2',
    rejectedText: '#b91c1c',
    cancelledBg: '#f1f5f9',
    cancelledText: '#475569',
    completedBg: '#e0f2fe',
    completedText: '#0369a1',
  }
} as const;

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

export const RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  pill: '9999px',
};
