import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation, eventInfo } from './tokens';

// Ícone de presente
const GiftIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="4" rx="1" stroke={color} strokeWidth="2" />
    <rect x="5" y="12" width="14" height="9" rx="1" stroke={color} strokeWidth="2" />
    <path d="M12 8V21" stroke={color} strokeWidth="2" />
    <path d="M12 8C12 8 9 8 7 6C5 4 7 2 9 3C11 4 12 8 12 8Z" stroke={color} strokeWidth="2" fill={color} opacity={0.3} />
    <path d="M12 8C12 8 15 8 17 6C19 4 17 2 15 3C13 4 12 8 12 8Z" stroke={color} strokeWidth="2" fill={color} opacity={0.3} />
  </svg>
);

// Ícone PIX estilizado
const PixIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M17.66 9.53L14.47 6.34C13.14 5.01 10.86 5.01 9.53 6.34L6.34 9.53C5.01 10.86 5.01 13.14 6.34 14.47L9.53 17.66C10.86 18.99 13.14 18.99 14.47 17.66L17.66 14.47C18.99 13.14 18.99 10.86 17.66 9.53Z"
      stroke={color}
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>
);

// Ícone de coração pequeno
const HeartSmall: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
  </svg>
);

// Corações flutuantes animados
const FloatingHeart: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
}> = ({ x, y, delay, size }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);

  const floatY = Math.sin(adjustedFrame * 0.08) * 15;
  const opacity = interpolate(adjustedFrame, [0, 20, 130, 150], [0, 0.5, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = 0.8 + Math.sin(adjustedFrame * 0.1) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + floatY,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <HeartSmall color={colors.lavenderSoft} size={size} />
    </div>
  );
};

export const Scene5Pix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animações
  const iconProgress = spring({
    frame,
    fps,
    config: animation.springBouncy,
  });

  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: animation.springGentle,
  });

  const subtitleProgress = spring({
    frame: frame - 30,
    fps,
    config: animation.springDelicate,
  });

  const pixCardProgress = spring({
    frame: frame - 50,
    fps,
    config: animation.springMedium,
  });

  // Brilho animado no card
  const glowIntensity = 0.3 + Math.sin(frame * 0.08) * 0.15;

  // Corações decorativos
  const hearts = [
    { x: 100, y: 300, delay: 10, size: 24 },
    { x: 900, y: 400, delay: 25, size: 20 },
    { x: 150, y: 1200, delay: 40, size: 28 },
    { x: 850, y: 1100, delay: 55, size: 22 },
    { x: 200, y: 800, delay: 70, size: 18 },
    { x: 800, y: 700, delay: 85, size: 26 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.bgLight,
      }}
    >
      {/* Gradiente dourado sutil */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 40%, ${colors.yellowLight}25 0%, transparent 60%)`,
        }}
      />

      {/* Corações flutuantes */}
      {hearts.map((heart, index) => (
        <FloatingHeart key={index} {...heart} />
      ))}

      {/* Container principal */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: spacing.screenPadding,
        }}
      >
        {/* Ícone de presente */}
        <div
          style={{
            opacity: interpolate(iconProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(iconProgress, [0, 1], [0.5, 1])})`,
            marginBottom: spacing.itemGap,
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.yellowLight} 0%, ${colors.yellowGold} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 20px 50px ${colors.yellowGold}50`,
            }}
          >
            <GiftIcon color={colors.brownDark} size={55} />
          </div>
        </div>

        {/* Título */}
        <h2
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.headline,
            fontWeight: typography.weightMedium,
            color: colors.textPrimary,
            textAlign: 'center',
            margin: 0,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Seu presente é a nossa
        </h2>
        <h2
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.headline,
            fontWeight: typography.weightMedium,
            fontStyle: 'italic',
            color: colors.textAccent,
            textAlign: 'center',
            margin: 0,
            marginBottom: spacing.smallGap,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          nova fase juntos
        </h2>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: typography.fontSans,
            fontSize: typography.body,
            fontWeight: typography.weightRegular,
            color: colors.textSecondary,
            textAlign: 'center',
            margin: 0,
            marginBottom: spacing.sectionGap,
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          Se quiser nos presentear, preferimos PIX
        </p>

        {/* Card PIX */}
        <div
          style={{
            background: colors.white,
            borderRadius: 28,
            padding: spacing.cardPadding,
            width: '100%',
            maxWidth: 900,
            boxShadow: `0 25px 60px ${colors.yellowGold}${Math.round(glowIntensity * 100)}`,
            opacity: interpolate(pixCardProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(pixCardProgress, [0, 1], [40, 0])}px)`,
            border: `2px solid ${colors.yellowLight}`,
          }}
        >
          {/* Header do card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.smallGap,
              marginBottom: spacing.itemGap,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                background: '#32BCAD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PixIcon color={colors.white} size={30} />
            </div>
            <p
              style={{
                fontFamily: typography.fontSans,
                fontSize: typography.title,
                fontWeight: typography.weightBold,
                color: '#32BCAD',
                margin: 0,
              }}
            >
              PIX
            </p>
          </div>

          {/* Chave PIX */}
          <div
            style={{
              background: colors.bgLavenderSoft,
              borderRadius: 16,
              padding: `${spacing.smallGap}px ${spacing.itemGap}px`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: typography.fontSans,
                fontSize: typography.small,
                fontWeight: typography.weightMedium,
                color: colors.textSecondary,
                margin: 0,
                marginBottom: spacing.tinyGap,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Chave PIX (e-mail)
            </p>
            <p
              style={{
                fontFamily: typography.fontSans,
                fontSize: typography.body,
                fontWeight: typography.weightSemibold,
                color: colors.textPrimary,
                margin: 0,
                wordBreak: 'break-all',
              }}
            >
              {eventInfo.pixKey}
            </p>
          </div>

          {/* Indicação visual de copiar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.tinyGap,
              marginTop: spacing.smallGap,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke={colors.textSecondary} strokeWidth="2" />
              <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" stroke={colors.textSecondary} strokeWidth="2" />
            </svg>
            <p
              style={{
                fontFamily: typography.fontSans,
                fontSize: typography.small,
                fontWeight: typography.weightRegular,
                color: colors.textSecondary,
                margin: 0,
              }}
            >
              Copie a chave acima
            </p>
          </div>
        </div>

        {/* Coração decorativo */}
        <div
          style={{
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
            marginTop: spacing.sectionGap,
          }}
        >
          <HeartSmall color={colors.yellowGold} size={36} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
