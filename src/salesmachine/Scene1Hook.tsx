import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Glitch text effect component
const GlitchText: React.FC<{
  text: string;
  delay: number;
  color?: string;
  fontSize?: number;
  glitchIntensity?: number;
}> = ({ text, delay, color = colors.neonPurple, fontSize = typography.headline, glitchIntensity = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay;

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glitch offset animation
  const glitchPhase = Math.sin(localFrame * 0.5) * Math.cos(localFrame * 0.3);
  const glitchX = localFrame < 15 ? glitchPhase * glitchIntensity * (1 - localFrame / 15) : 0;
  const glitchY = localFrame < 15 ? Math.cos(localFrame * 0.7) * (glitchIntensity / 2) * (1 - localFrame / 15) : 0;

  // Shake effect for emphasis words
  const shakeX = localFrame < 12 ? Math.sin(localFrame * 2) * 3 : 0;

  const scale = spring({
    frame: localFrame,
    fps,
    config: animation.springBouncy,
  });

  return (
    <div
      style={{
        opacity,
        transform: `translate(${glitchX + shakeX}px, ${glitchY}px) scale(${interpolate(scale, [0, 1], [0.8, 1])})`,
        color,
        fontSize,
        fontWeight: typography.weightBold,
        fontFamily: typography.fontFamily,
        letterSpacing: typography.trackingTight,
        textShadow: `0 0 30px ${color}`,
        position: 'relative',
      }}
    >
      {/* Glitch layers */}
      {localFrame < 15 && (
        <>
          <span
            style={{
              position: 'absolute',
              left: glitchX * 1.5,
              top: 0,
              color: colors.neonCyan,
              opacity: 0.7,
              clipPath: 'inset(10% 0 60% 0)',
            }}
          >
            {text}
          </span>
          <span
            style={{
              position: 'absolute',
              left: -glitchX * 1.5,
              top: 0,
              color: colors.neonPink,
              opacity: 0.7,
              clipPath: 'inset(50% 0 20% 0)',
            }}
          >
            {text}
          </span>
        </>
      )}
      {text}
    </div>
  );
};

// Animated funnel chart
const FunnelChart: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delay;

  const funnelData = [
    { width: 100, label: '1000 leads', color: colors.neonCyan },
    { width: 70, label: '300 respostas', color: colors.neonPurple },
    { width: 35, label: '50 reuniões', color: colors.neonOrange },
    { width: 15, label: '5 fechamentos', color: colors.neonPink },
  ];

  const containerOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity: containerOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        marginTop: 40,
      }}
    >
      {funnelData.map((item, index) => {
        const itemDelay = index * 8;
        const itemProgress = spring({
          frame: localFrame - itemDelay,
          fps,
          config: animation.springMedium,
        });

        const width = interpolate(itemProgress, [0, 1], [0, item.width]);

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: interpolate(itemProgress, [0, 0.3, 1], [0, 1, 1]),
            }}
          >
            <div
              style={{
                width: `${width * 4}px`,
                height: 28,
                background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                borderRadius: 4,
                boxShadow: `0 0 20px ${item.color}44`,
              }}
            />
            <span
              style={{
                color: colors.textSecondary,
                fontSize: typography.caption,
                fontFamily: typography.fontFamily,
                minWidth: 120,
              }}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Falling graph icon animation
const FallingGraphs: React.FC = () => {
  const frame = useCurrentFrame();

  const graphs = [
    { x: 150, delay: 0, rotation: -15 },
    { x: 800, delay: 10, rotation: 20 },
    { x: 500, delay: 20, rotation: -10 },
  ];

  return (
    <>
      {graphs.map((graph, index) => {
        const localFrame = frame - graph.delay;
        const y = interpolate(localFrame, [0, 60], [-100, 400], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.in(Easing.quad),
        });

        const opacity = interpolate(localFrame, [0, 10, 50, 60], [0, 0.3, 0.3, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const rotation = graph.rotation + localFrame * 0.5;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: graph.x,
              top: y,
              opacity,
              transform: `rotate(${rotation}deg)`,
              fontSize: 80,
              color: colors.neonPink,
            }}
          >
            📉
          </div>
        );
      })}
    </>
  );
};

// Clock and spreadsheet icons floating
const FloatingIcons: React.FC = () => {
  const frame = useCurrentFrame();

  const icons = [
    { emoji: '⏰', x: 100, y: 300, delay: 5 },
    { emoji: '📊', x: 900, y: 250, delay: 15 },
    { emoji: '📋', x: 200, y: 1400, delay: 25 },
    { emoji: '😫', x: 850, y: 1350, delay: 35 },
  ];

  return (
    <>
      {icons.map((icon, index) => {
        const localFrame = frame - icon.delay;
        const opacity = interpolate(localFrame, [0, 15, 120, 150], [0, 0.4, 0.4, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const float = Math.sin(localFrame * 0.1) * 10;

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: icon.x,
              top: icon.y + float,
              opacity,
              fontSize: 60,
              filter: 'grayscale(50%)',
            }}
          >
            {icon.emoji}
          </div>
        );
      })}
    </>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Background pulse
  const pulse = Math.sin(frame * 0.05) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 70%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.screenPadding,
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <FallingGraphs />
      <FloatingIcons />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `scale(${pulse})`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 100,
            padding: '12px 28px',
            color: colors.error,
            fontSize: typography.caption,
            fontWeight: typography.weightSemibold,
            fontFamily: typography.fontFamily,
            letterSpacing: typography.trackingWide,
            textTransform: 'uppercase',
          }}
        >
          ⚠️ O Problema
        </div>

        {/* Main headlines */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            textAlign: 'center',
          }}
        >
          <GlitchText
            text="Prospecção B2B ainda é"
            delay={10}
            color={colors.textPrimary}
            fontSize={typography.displayMedium}
            glitchIntensity={4}
          />
          <GlitchText
            text="LENTA."
            delay={25}
            color={colors.neonPink}
            fontSize={typography.displayXL}
            glitchIntensity={12}
          />
        </div>

        {/* Secondary points */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            marginTop: 40,
          }}
        >
          <GlitchText
            text="Metade do tempo em tarefas repetitivas."
            delay={50}
            color={colors.textSecondary}
            fontSize={typography.title}
            glitchIntensity={3}
          />
          <GlitchText
            text="Leads frios. Conversão baixa."
            delay={70}
            color={colors.neonOrange}
            fontSize={typography.title}
            glitchIntensity={6}
          />
        </div>

        {/* Funnel visualization */}
        <FunnelChart delay={90} />
      </div>

      {/* Vignette effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
