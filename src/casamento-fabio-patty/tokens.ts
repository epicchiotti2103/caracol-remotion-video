/**
 * Design tokens para o vídeo-convite do casamento Fabio & Patty
 * Paleta romântica: lavanda, dourado, amarelo, roxo
 */

export const colors = {
  // Amarelos da pétala
  yellowLight: '#F7DE7A',
  yellowMain: '#F2C94C',
  yellowGold: '#E0B23E',

  // Tons marrom
  brownDark: '#3A2A1A',
  brownMedium: '#5C4632',

  // Fundos suaves
  bgLight: '#FAF7F3',
  bgSoft: '#E6D2C8',
  bgLavender: '#FAF6FF',
  bgLavenderSoft: '#F1E7FA',

  // Roxos / lavandas
  white: '#FFFFFF',
  lavenderSoft: '#CBB6D8',
  lavenderMedium: '#E3D7F0',
  purpleDeep: '#5A3A73',

  // Gradientes (strings para uso em CSS)
  gradientLavender: 'linear-gradient(180deg, #FAF6FF 0%, #F1E7FA 50%, #E3D7F0 100%)',
  gradientGold: 'linear-gradient(135deg, #F7DE7A 0%, #E0B23E 100%)',
  gradientRomantic: 'linear-gradient(180deg, #FAF7F3 0%, #F1E7FA 100%)',
  gradientSunset: 'linear-gradient(180deg, #FAF6FF 0%, #E6D2C8 100%)',

  // Texto
  textPrimary: '#3A2A1A',
  textSecondary: '#5C4632',
  textAccent: '#5A3A73',
  textGold: '#E0B23E',
};

export const typography = {
  // Fonte serif para nomes e títulos românticos
  fontSerif: '"Playfair Display", "Georgia", "Times New Roman", serif',
  // Fonte sans-serif para detalhes e informações
  fontSans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  // Tamanhos para 1080x1920 vertical
  displayXL: 96,
  displayLarge: 72,
  displayMedium: 56,
  headline: 48,
  title: 40,
  subtitle: 32,
  body: 28,
  caption: 24,
  small: 20,

  // Pesos
  weightBold: 700,
  weightSemibold: 600,
  weightMedium: 500,
  weightRegular: 400,
  weightLight: 300,
};

export const spacing = {
  screenPadding: 60,
  sectionGap: 48,
  cardPadding: 40,
  itemGap: 32,
  smallGap: 20,
  tinyGap: 12,
};

export const animation = {
  springGentle: { damping: 120, stiffness: 80, mass: 1.2 },
  springMedium: { damping: 100, stiffness: 100, mass: 1 },
  springBouncy: { damping: 80, stiffness: 150, mass: 1 },
  springSmooth: { damping: 150, stiffness: 60, mass: 1 },
  springDelicate: { damping: 100, stiffness: 50, mass: 1.5 },
};

// Informações do evento
export const eventInfo = {
  coupleNames: 'Fabio & Patty',
  date: '28 de Março de 2026',
  time: '12h',
  venue: 'Espaço Andrioli',
  city: 'Botucatu – SP',
  dressCode: 'Esporte chique',
  parking: 'Estacionamento gratuito no local',
  rsvpDate: '03 de Fevereiro de 2026',
  contactName: 'Maria Angélica',
  contactPhone: '(14) 99621-5946',
  pixKey: 'casamentofabioepati@gmail.com',
  yearsTogther: 9,
};
