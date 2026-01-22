import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation, eventInfo } from './tokens';

// Componente de pétala animada
const Petal: React.FC<{
  startX: number;
  startY: number;
  delay: number;
  size: number;
  rotation: number;
  color: string;
}> = ({ startX, startY, delay, size, rotation, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  // Queda suave da pétala
  const fallProgress = interpolate(adjustedFrame, [0, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const y = startY + fallProgress * 600;
  const x = startX + Math.sin(adjustedFrame * 0.05 + rotation) * 30;
  const rot = rotation + adjustedFrame * 0.8;

  const opacity = interpolate(adjustedFrame, [0, 20, 160, 180], [0, 0.7, 0.7, 0], {
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
          opacity={0.8}
        />
        <ellipse
          cx="10"
          cy="14"
          rx="5"
          ry="8"
          fill={color}
          opacity={0.4}
        />
      </svg>
    </div>
  );
};

// Gera pétalas aleatórias
const generatePetals = (count: number) => {
  const petals = [];
  const petalColors = [colors.lavenderSoft, colors.lavenderMedium, colors.yellowLight, colors.yellowMain];

  for (let i = 0; i < count; i++) {
    petals.push({
      id: i,
      startX: Math.random() * 1080,
      startY: -100 - Math.random() * 300,
      delay: Math.random() * 60,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    });
  }
  return petals;
};

const petals = generatePetals(20);

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animações de entrada
  const titleProgress = spring({
    frame: frame - 20,
    fps,
    config: animation.springDelicate,
  });

  const subtitleProgress = spring({
    frame: frame - 50,
    fps,
    config: animation.springGentle,
  });

  const taglineProgress = spring({
    frame: frame - 80,
    fps,
    config: animation.springSmooth,
  });

  // Opacidades e transforms
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);

  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineProgress, [0, 1], [20, 0]);

  // Brilho suave animado
  const glowOpacity = interpolate(frame, [0, 60, 120, 180], [0, 0.3, 0.5, 0.3], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.gradientLavender,
      }}
    >
      {/* Textura de fundo suave */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% 30%, ${colors.yellowLight}20 0%, transparent 60%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Pétalas caindo */}
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}

      {/* Container central */}
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
        {/* Ornamento superior */}
        <div
          style={{
            opacity: titleOpacity,
            marginBottom: spacing.itemGap,
          }}
        >
          <svg width="200" height="40" viewBox="0 0 200 40">
            <path
              d="M0 20 Q50 0 100 20 Q150 40 200 20"
              stroke={colors.yellowGold}
              strokeWidth="2"
              fill="none"
              opacity={0.6}
            />
            <circle cx="100" cy="20" r="6" fill={colors.yellowGold} opacity={0.8} />
            <circle cx="60" cy="15" r="3" fill={colors.lavenderSoft} />
            <circle cx="140" cy="25" r="3" fill={colors.lavenderSoft} />
          </svg>
        </div>

        {/* Nome do casal */}
        <h1
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.displayLarge,
            fontWeight: typography.weightRegular,
            color: colors.textPrimary,
            textAlign: 'center',
            margin: 0,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            letterSpacing: '0.05em',
          }}
        >
          {eventInfo.coupleNames}
        </h1>

        {/* Anos juntos */}
        <p
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.title,
            fontWeight: typography.weightLight,
            fontStyle: 'italic',
            color: colors.textAccent,
            textAlign: 'center',
            margin: 0,
            marginTop: spacing.smallGap,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {eventInfo.yearsTogther} anos de uma história de amor
        </p>

        {/* Linha decorativa */}
        <div
          style={{
            width: 120,
            height: 2,
            background: colors.gradientGold,
            margin: `${spacing.itemGap}px 0`,
            opacity: subtitleOpacity,
            borderRadius: 1,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: typography.fontSans,
            fontSize: typography.body,
            fontWeight: typography.weightRegular,
            color: colors.textSecondary,
            textAlign: 'center',
            margin: 0,
            maxWidth: 800,
            lineHeight: 1.5,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          De um encontro inesperado a um futuro construído juntos.
        </p>

        {/* Ornamento inferior */}
        <div
          style={{
            opacity: taglineOpacity,
            marginTop: spacing.sectionGap,
          }}
        >
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke={colors.lavenderSoft}
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M30 15 Q38 25 30 35 Q22 25 30 15"
              fill={colors.yellowGold}
              opacity={0.6}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
