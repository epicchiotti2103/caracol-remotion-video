import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Frases da história
const storyPhrases = [
  {
    text: 'Nos conhecemos em uma festa,',
    subtext: 'por amigos em comum.',
    icon: 'sparkle',
  },
  {
    text: 'Foram 9 anos de cumplicidade,',
    subtext: 'risos e espera.',
    icon: 'heart',
  },
  {
    text: 'Em maio, um pedido mágico',
    subtext: 'selou o nosso sim.',
    icon: 'ring',
  },
];

// Ícones SVG minimalistas
const Icons: Record<string, React.FC<{ color: string; size: number }>> = {
  sparkle: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={color}
        opacity={0.8}
      />
    </svg>
  ),
  heart: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
        fill={color}
        opacity={0.8}
      />
    </svg>
  ),
  ring: ({ color, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="14" r="7" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 7L10 3H14L12 7Z" fill={color} opacity={0.8} />
      <circle cx="12" cy="5" r="2" fill={color} />
    </svg>
  ),
};

// Componente de frase com animação
const StoryPhrase: React.FC<{
  phrase: typeof storyPhrases[0];
  index: number;
  startFrame: number;
}> = ({ phrase, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;

  // Animação de entrada
  const progress = spring({
    frame: localFrame,
    fps,
    config: animation.springDelicate,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [50, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  // Animação do ícone (com delay)
  const iconProgress = spring({
    frame: localFrame - 15,
    fps,
    config: animation.springBouncy,
  });

  const iconOpacity = interpolate(iconProgress, [0, 1], [0, 1]);
  const iconScale = interpolate(iconProgress, [0, 1], [0.5, 1]);

  const IconComponent = Icons[phrase.icon];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        marginBottom: spacing.sectionGap,
      }}
    >
      {/* Ícone */}
      <div
        style={{
          opacity: iconOpacity,
          transform: `scale(${iconScale})`,
          marginBottom: spacing.smallGap,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.lavenderMedium} 0%, ${colors.lavenderSoft} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 30px ${colors.lavenderSoft}60`,
          }}
        >
          <IconComponent color={colors.purpleDeep} size={40} />
        </div>
      </div>

      {/* Texto principal */}
      <p
        style={{
          fontFamily: typography.fontSerif,
          fontSize: typography.subtitle,
          fontWeight: typography.weightMedium,
          color: colors.textPrimary,
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {phrase.text}
      </p>

      {/* Subtexto */}
      <p
        style={{
          fontFamily: typography.fontSerif,
          fontSize: typography.subtitle,
          fontWeight: typography.weightLight,
          fontStyle: 'italic',
          color: colors.textAccent,
          textAlign: 'center',
          margin: 0,
          marginTop: spacing.tinyGap,
        }}
      >
        {phrase.subtext}
      </p>
    </div>
  );
};

export const Scene2Story: React.FC = () => {
  const frame = useCurrentFrame();

  // Background gradient animado
  const gradientShift = interpolate(frame, [0, 210], [0, 20], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.gradientRomantic,
      }}
    >
      {/* Textura decorativa */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(ellipse at 50% ${50 + gradientShift}%, ${colors.lavenderMedium}30 0%, transparent 50%)`,
        }}
      />

      {/* Elementos decorativos laterais */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: '30%',
          width: 100,
          height: 400,
          background: `linear-gradient(90deg, ${colors.yellowLight}20 0%, transparent 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '40%',
          width: 100,
          height: 400,
          background: `linear-gradient(-90deg, ${colors.lavenderSoft}30 0%, transparent 100%)`,
        }}
      />

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
        {/* Título da seção */}
        <div
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            marginBottom: spacing.sectionGap,
          }}
        >
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.caption,
              fontWeight: typography.weightMedium,
              color: colors.textGold,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
            }}
          >
            Nossa História
          </p>
        </div>

        {/* Frases com animação sequencial */}
        {storyPhrases.map((phrase, index) => (
          <StoryPhrase
            key={index}
            phrase={phrase}
            index={index}
            startFrame={30 + index * 60} // Cada frase entra 2s depois
          />
        ))}

        {/* Ornamento inferior */}
        <div
          style={{
            opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' }),
            marginTop: spacing.itemGap,
          }}
        >
          <svg width="150" height="20" viewBox="0 0 150 20">
            <line x1="0" y1="10" x2="50" y2="10" stroke={colors.yellowGold} strokeWidth="1" opacity={0.5} />
            <circle cx="75" cy="10" r="5" fill={colors.yellowGold} opacity={0.6} />
            <line x1="100" y1="10" x2="150" y2="10" stroke={colors.yellowGold} strokeWidth="1" opacity={0.5} />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
