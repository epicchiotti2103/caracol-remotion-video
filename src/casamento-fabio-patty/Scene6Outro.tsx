import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation, eventInfo } from './tokens';

// Componente de pétala subindo (invertido)
const RisingPetal: React.FC<{
  startX: number;
  startY: number;
  delay: number;
  size: number;
  rotation: number;
  color: string;
}> = ({ startX, startY, delay, size, rotation, color }) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);

  // Subida suave da pétala
  const riseProgress = interpolate(adjustedFrame, [0, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = startY - riseProgress * 700;
  const x = startX + Math.sin(adjustedFrame * 0.04 + rotation) * 40;
  const rot = rotation + adjustedFrame * 0.6;

  const opacity = interpolate(adjustedFrame, [0, 25, 140, 180], [0, 0.65, 0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size * 1.4,
        opacity,
        transform: `rotate(${rot}deg)`,
      }}
    >
      <svg viewBox="0 0 20 28" width={size} height={size * 1.4}>
        <ellipse
          cx="10"
          cy="14"
          rx="8"
          ry="12"
          fill={color}
          opacity={0.85}
        />
        <ellipse
          cx="10"
          cy="14"
          rx="4"
          ry="7"
          fill={color}
          opacity={0.4}
        />
      </svg>
    </div>
  );
};

// Monograma F&P estilizado
const Monogram: React.FC<{ progress: number }> = ({ progress }) => {
  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const rotation = interpolate(progress, [0, 1], [-10, 0]);

  return (
    <div
      style={{
        width: 200,
        height: 200,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 200 200" width="200" height="200">
        {/* Círculo externo decorativo */}
        <circle
          cx="100"
          cy="100"
          r="95"
          stroke={colors.yellowGold}
          strokeWidth="2"
          fill="none"
          opacity={0.5}
        />
        <circle
          cx="100"
          cy="100"
          r="85"
          stroke={colors.lavenderSoft}
          strokeWidth="1"
          fill="none"
          opacity={0.7}
        />

        {/* Fundo do monograma */}
        <circle
          cx="100"
          cy="100"
          r="75"
          fill={`url(#monogramGradient)`}
        />

        {/* Gradiente */}
        <defs>
          <linearGradient id="monogramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.yellowLight} />
            <stop offset="100%" stopColor={colors.yellowGold} />
          </linearGradient>
        </defs>

        {/* Letras F & P */}
        <text
          x="100"
          y="115"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="60"
          fontWeight="400"
          fill={colors.brownDark}
          fontStyle="italic"
        >
          F&P
        </text>

        {/* Coração pequeno embaixo */}
        <path
          d="M100 150 L95 145 Q90 140 95 135 Q100 130 100 135 Q100 130 105 135 Q110 140 105 145 Z"
          fill={colors.brownDark}
          opacity={0.6}
        />
      </svg>
    </div>
  );
};

// Gera pétalas subindo
const generateRisingPetals = (count: number) => {
  const petals = [];
  const petalColors = [colors.lavenderSoft, colors.lavenderMedium, colors.yellowLight, colors.yellowMain];

  for (let i = 0; i < count; i++) {
    petals.push({
      id: i,
      startX: Math.random() * 1080,
      startY: 1920 + Math.random() * 300,
      delay: Math.random() * 80,
      size: 18 + Math.random() * 22,
      rotation: Math.random() * 360,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    });
  }
  return petals;
};

const risingPetals = generateRisingPetals(25);

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animações
  const monogramProgress = spring({
    frame: frame - 10,
    fps,
    config: animation.springDelicate,
  });

  const titleProgress = spring({
    frame: frame - 40,
    fps,
    config: animation.springGentle,
  });

  const subtitleProgress = spring({
    frame: frame - 70,
    fps,
    config: animation.springSmooth,
  });

  const infoProgress = spring({
    frame: frame - 100,
    fps,
    config: animation.springDelicate,
  });

  // Gradiente animado de fundo
  const gradientShift = interpolate(frame, [0, 180], [0, 30], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.gradientLavender,
      }}
    >
      {/* Overlay de gradiente animado */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% ${40 + gradientShift}%, ${colors.yellowLight}20 0%, transparent 50%),
                       radial-gradient(ellipse at 30% 70%, ${colors.lavenderSoft}30 0%, transparent 40%),
                       radial-gradient(ellipse at 70% 30%, ${colors.lavenderMedium}20 0%, transparent 40%)`,
        }}
      />

      {/* Pétalas subindo */}
      {risingPetals.map((petal) => (
        <RisingPetal key={petal.id} {...petal} />
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
        {/* Monograma */}
        <div style={{ marginBottom: spacing.sectionGap }}>
          <Monogram progress={monogramProgress} />
        </div>

        {/* Pergunta principal */}
        <h2
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.displayMedium,
            fontWeight: typography.weightRegular,
            color: colors.textPrimary,
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.2,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          Vamos celebrar esse dia
        </h2>
        <h2
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.displayMedium,
            fontWeight: typography.weightRegular,
            fontStyle: 'italic',
            color: colors.textAccent,
            textAlign: 'center',
            margin: 0,
            marginBottom: spacing.sectionGap,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          }}
        >
          com você?
        </h2>

        {/* Linha decorativa */}
        <div
          style={{
            width: 150,
            height: 2,
            background: colors.gradientGold,
            marginBottom: spacing.sectionGap,
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
            borderRadius: 1,
          }}
        />

        {/* Nome do casal e data */}
        <p
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.title,
            fontWeight: typography.weightMedium,
            color: colors.textPrimary,
            textAlign: 'center',
            margin: 0,
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          {eventInfo.coupleNames}
        </p>
        <p
          style={{
            fontFamily: typography.fontSans,
            fontSize: typography.body,
            fontWeight: typography.weightMedium,
            color: colors.textGold,
            textAlign: 'center',
            margin: 0,
            marginTop: spacing.tinyGap,
            opacity: interpolate(subtitleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          {eventInfo.date}
        </p>

        {/* Local */}
        <div
          style={{
            marginTop: spacing.itemGap,
            opacity: interpolate(infoProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(infoProgress, [0, 1], [15, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.caption,
              fontWeight: typography.weightRegular,
              color: colors.textSecondary,
              margin: 0,
            }}
          >
            Esperamos você no
          </p>
          <p
            style={{
              fontFamily: typography.fontSerif,
              fontSize: typography.body,
              fontWeight: typography.weightMedium,
              color: colors.textPrimary,
              margin: 0,
              marginTop: spacing.tinyGap,
            }}
          >
            {eventInfo.venue} – {eventInfo.city}
          </p>
        </div>

        {/* Ornamento final */}
        <div
          style={{
            marginTop: spacing.sectionGap,
            opacity: interpolate(frame, [140, 170], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80">
            {/* Coração estilizado */}
            <path
              d="M40 70 L15 45 Q0 30 15 15 Q30 0 40 15 Q50 0 65 15 Q80 30 65 45 Z"
              fill="none"
              stroke={colors.yellowGold}
              strokeWidth="2"
              opacity={0.8}
            />
            <path
              d="M40 60 L22 42 Q12 32 22 22 Q32 12 40 22 Q48 12 58 22 Q68 32 58 42 Z"
              fill={colors.yellowLight}
              opacity={0.6}
            />
          </svg>
        </div>
      </div>

      {/* Fade out final */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: colors.white,
          opacity: interpolate(frame, [150, 180], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
