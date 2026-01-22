// SalesMachine v4.0+ Design Tokens
// Dark mode futuristic SaaS style

export const colors = {
  // Background layers
  bgPrimary: '#0A0A0F',
  bgSecondary: '#12121A',
  bgTertiary: '#1A1A25',
  bgCard: 'rgba(255, 255, 255, 0.03)',
  bgCardHover: 'rgba(255, 255, 255, 0.06)',

  // Neon accents
  neonPurple: '#7C3AED',
  neonCyan: '#06B6D4',
  neonLime: '#22C55E',
  neonOrange: '#F59E0B',
  neonPink: '#EC4899',
  neonBlue: '#3B82F6',

  // Gradients (CSS strings)
  gradientPurpleCyan: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
  gradientPurplePink: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
  gradientCyanLime: 'linear-gradient(135deg, #06B6D4 0%, #22C55E 100%)',
  gradientOrangePink: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',

  // Glow effects
  glowPurple: '0 0 40px rgba(124, 58, 237, 0.5)',
  glowCyan: '0 0 40px rgba(6, 182, 212, 0.5)',
  glowLime: '0 0 40px rgba(34, 197, 94, 0.5)',
};

export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "Segoe UI", sans-serif',
  fontFamilyMono: '"SF Mono", "Fira Code", "Consolas", monospace',

  // Sizes for 1080x1920 vertical format
  displayXL: 96,
  displayLarge: 72,
  displayMedium: 56,
  headline: 48,
  title: 36,
  body: 28,
  caption: 22,
  small: 18,

  // Weights
  weightBold: 800,
  weightSemibold: 600,
  weightMedium: 500,
  weightRegular: 400,

  // Letter spacing
  trackingTight: '-0.03em',
  trackingNormal: '-0.01em',
  trackingWide: '0.05em',
};

export const spacing = {
  screenPadding: 60,
  sectionGap: 40,
  cardPadding: 32,
  itemGap: 24,
  smallGap: 16,
  tinyGap: 8,
};

export const animation = {
  springFast: {
    damping: 80,
    stiffness: 200,
    mass: 0.8,
  },
  springMedium: {
    damping: 100,
    stiffness: 100,
    mass: 1,
  },
  springBouncy: {
    damping: 60,
    stiffness: 150,
    mass: 1.2,
  },
  springSmooth: {
    damping: 120,
    stiffness: 80,
    mass: 1,
  },
};

export const effects = {
  cardBorder: '1px solid rgba(255, 255, 255, 0.08)',
  cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  glowShadow: (color: string, intensity = 0.4) =>
    `0 0 60px rgba(${hexToRgb(color)}, ${intensity})`,
  textGlow: (color: string) =>
    `0 0 20px ${color}, 0 0 40px ${color}`,
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
