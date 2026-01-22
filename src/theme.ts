// ============================================
// CARACOL MEDIA - BRAND CONSTANTS & THEME
// Seguindo o Guia Completo de Branding
// ============================================

// 📋 PALETA DE CORES
export const COLORS = {
  // Cores Principais
  primaryOrange: "#FF9900",
  secondaryOrange: "#FFA500",

  // Verde Escuro - Secundária
  leafGreen: "#1F4D2F",
  leafGreenLight: "#2A6B3E",

  // Amarelo/Lime - Destaque
  limeAccent: "#CCFF00",
  limeAccentDark: "#B8E600",

  // Dark Mode - Backgrounds
  darkBg: "#0A0A0A",
  darkGrey: "#1A1A1A",
  darkGreyLight: "#2A2A2A",

  // Branco e Cinza
  white: "#FFFFFF",
  greyText: "#666666",
  greyLight: "#808080",
  greySubtle: "#999999",

  // Cores Complementares
  navyBg: "#0D2B4A",
  navyLight: "#153D66",

  // Decorativos
  gold: "#C9A857",
  bronze: "#B08D57",
  teal: "#1A4A4A",
} as const;

// 🔤 TIPOGRAFIA
export const FONTS = {
  heading: '-apple-system, BlinkMacSystemFont, "Inter", "Poppins", "Montserrat", "Segoe UI", sans-serif',
  body: '-apple-system, BlinkMacSystemFont, "Inter", "SF Pro Text", "Segoe UI", sans-serif',
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const;

export const FONT_SIZES = {
  // Headings
  heroTitle: 72,
  sectionTitle: 56,
  cardTitle: 36,
  subtitle: 32,

  // Body
  bodyLarge: 28,
  body: 24,
  bodySmall: 20,

  // Labels
  label: 18,
  labelSmall: 16,

  // CTA
  cta: 28,
} as const;

// 📐 ESPAÇAMENTO E BORDER RADIUS
export const SPACING = {
  xs: 8,
  sm: 12,
  md: 20,
  lg: 32,
  xl: 48,
  xxl: 64,
  section: 80,
} as const;

export const BORDER_RADIUS = {
  button: 25,
  buttonLarge: 30,
  card: 16,
  cardLarge: 20,
  badge: 12,
  circle: 100,
  logo: 40,
} as const;

// 🎨 ESTILOS COMUNS
export const SHADOWS = {
  card: "0 8px 32px rgba(0, 0, 0, 0.4)",
  cardHover: "0 12px 48px rgba(0, 0, 0, 0.5)",
  button: "0 8px 24px rgba(204, 255, 0, 0.3)",
  buttonOrange: "0 8px 24px rgba(255, 153, 0, 0.4)",
  logo: "0 20px 60px rgba(0, 0, 0, 0.3)",
  glow: "0 0 40px rgba(204, 255, 0, 0.4)",
  glowOrange: "0 0 40px rgba(255, 153, 0, 0.4)",
} as const;

// 🎯 TIMING CONFIGURATION (30fps)
export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  // Scene timings in frames (30fps)
  scenes: {
    scene1: { start: 0, duration: 150 },      // 0-5s: Intro & Hook
    scene2: { start: 150, duration: 210 },    // 5-12s: Core Business
    scene3: { start: 360, duration: 300 },    // 12-22s: Method & Reach
    scene4: { start: 660, duration: 240 },    // 22-30s: Results & CTA
  },
  totalDuration: 900, // 30 seconds at 30fps
} as const;

// 🎭 ANIMATION CONFIGS
export const SPRING_CONFIGS = {
  smooth: {
    damping: 100,
    stiffness: 80,
    mass: 1,
  },
  bouncy: {
    damping: 60,
    stiffness: 100,
    mass: 0.8,
  },
  snappy: {
    damping: 120,
    stiffness: 200,
    mass: 0.6,
  },
  gentle: {
    damping: 80,
    stiffness: 60,
    mass: 1.2,
  },
} as const;

// 🖼️ SVG ICONS (inline para performance)
export const ICONS = {
  graph: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 3v18h18"/>
    <path d="M7 16l4-6 4 4 5-8"/>
  </svg>`,

  people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="9" cy="7" r="4"/>
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
    <circle cx="17" cy="7" r="3"/>
    <path d="M21 21v-2a3 3 0 00-2-2.8"/>
  </svg>`,

  monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>`,

  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>`,

  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
    <path d="M9 18l6-6-6-6"/>
  </svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
    <path d="M20 6L9 17l-5-5"/>
  </svg>`,
};
