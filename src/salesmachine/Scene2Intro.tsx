import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Abstract machine/neuron logo
const SalesMachineLogo: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const rotation = interpolate(progress, [0, 1], [-180, 0]);
  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const glow = interpolate(progress, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Orbiting particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    angle: (i * 60) + frame * 2,
    radius: 80 + Math.sin(frame * 0.1 + i) * 10,
    size: 8 + Math.sin(frame * 0.15 + i) * 3,
    color: [colors.neonCyan, colors.neonPurple, colors.neonLime, colors.neonOrange, colors.neonPink, colors.neonBlue][i],
  }));

  return (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonPurple}40 0%, transparent 70%)`,
          opacity: glow,
          filter: 'blur(20px)',
        }}
      />

      {/* Core hexagon/gear shape */}
      <svg width="160" height="160" viewBox="0 0 160 160">
        {/* Outer ring */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={colors.neonPurple}
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity={0.5}
          style={{
            transform: `rotate(${frame}deg)`,
            transformOrigin: 'center',
          }}
        />

        {/* Inner hexagon */}
        <polygon
          points="80,20 130,50 130,110 80,140 30,110 30,50"
          fill="none"
          stroke={colors.neonCyan}
          strokeWidth="3"
          opacity={glow}
          style={{
            filter: `drop-shadow(0 0 10px ${colors.neonCyan})`,
          }}
        />

        {/* Center circle */}
        <circle
          cx="80"
          cy="80"
          r="25"
          fill={colors.bgSecondary}
          stroke={colors.neonPurple}
          strokeWidth="4"
          style={{
            filter: `drop-shadow(0 0 15px ${colors.neonPurple})`,
          }}
        />

        {/* Neural connections */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 80 + Math.cos(rad) * 25;
          const y1 = 80 + Math.sin(rad) * 25;
          const x2 = 80 + Math.cos(rad) * 55;
          const y2 = 80 + Math.sin(rad) * 55;

          const lineProgress = interpolate(progress, [0.3, 0.6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={interpolate(lineProgress, [0, 1], [x1, x2])}
              y2={interpolate(lineProgress, [0, 1], [y1, y2])}
              stroke={colors.neonLime}
              strokeWidth="2"
              opacity={0.8}
            />
          );
        })}

        {/* Center dot */}
        <circle
          cx="80"
          cy="80"
          r="8"
          fill={colors.neonPurple}
          style={{
            filter: `drop-shadow(0 0 10px ${colors.neonPurple})`,
          }}
        />
      </svg>

      {/* Orbiting particles */}
      {particles.map((particle, i) => {
        const rad = (particle.angle * Math.PI) / 180;
        const x = Math.cos(rad) * particle.radius;
        const y = Math.sin(rad) * particle.radius;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              left: 100 + x - particle.size / 2,
              top: 100 + y - particle.size / 2,
              opacity: glow * 0.8,
              boxShadow: `0 0 10px ${particle.color}`,
            }}
          />
        );
      })}
    </div>
  );
};

// Glitch transition effect
const GlitchTransition: React.FC = () => {
  const frame = useCurrentFrame();

  const glitchBars = Array.from({ length: 8 }, (_, i) => ({
    y: Math.random() * 1920,
    height: 20 + Math.random() * 60,
    delay: i * 2,
    color: [colors.neonCyan, colors.neonPurple, colors.neonPink][i % 3],
  }));

  const transitionProgress = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (transitionProgress >= 1) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 1 - transitionProgress,
        zIndex: 100,
      }}
    >
      {glitchBars.map((bar, i) => {
        const barProgress = interpolate(frame - bar.delay, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: interpolate(barProgress, [0, 1], [-1080, 1080]),
              top: bar.y,
              width: 1080,
              height: bar.height,
              background: bar.color,
              opacity: 0.6,
            }}
          />
        );
      })}
    </div>
  );
};

// Animated underline
const AnimatedUnderline: React.FC<{ delay: number; width: number; color?: string }> = ({
  delay,
  width,
  color = colors.neonCyan,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - delay;
  const progress = spring({
    frame: localFrame,
    fps,
    config: animation.springMedium,
  });

  const lineWidth = interpolate(progress, [0, 1], [0, width]);

  return (
    <div
      style={{
        height: 6,
        width: lineWidth,
        background: `linear-gradient(90deg, ${color}, ${color}00)`,
        borderRadius: 3,
        marginTop: 8,
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
};

export const Scene2Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame: frame - 15,
    fps,
    config: animation.springBouncy,
  });

  // Text animations
  const titleOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleScale = spring({
    frame: frame - 30,
    fps,
    config: animation.springMedium,
  });

  const subtitleOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleY = interpolate(frame, [50, 70], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating particles background
  const bgParticles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.sin(i * 1.3) * 400 + 540,
    y: Math.cos(i * 0.7) * 600 + 960,
    size: 2 + (i % 4) * 2,
    speed: 0.02 + (i % 5) * 0.01,
  }));

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.screenPadding,
        overflow: 'hidden',
      }}
    >
      {/* Glitch transition from previous scene */}
      <GlitchTransition />

      {/* Background particles */}
      {bgParticles.map((particle, i) => {
        const floatY = Math.sin(frame * particle.speed + i) * 20;
        const opacity = interpolate(frame, [10, 30], [0, 0.3], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y + floatY,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: colors.neonPurple,
              opacity,
            }}
          />
        );
      })}

      {/* Radial glow behind logo */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonPurple}20 0%, transparent 70%)`,
          opacity: interpolate(logoProgress, [0, 1], [0, 1]),
          filter: 'blur(40px)',
        }}
      />

      {/* Logo */}
      <SalesMachineLogo progress={logoProgress} />

      {/* Title */}
      <div
        style={{
          marginTop: 60,
          opacity: titleOpacity,
          transform: `scale(${interpolate(titleScale, [0, 1], [0.8, 1])})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            fontSize: typography.displayLarge,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            letterSpacing: typography.trackingTight,
            color: colors.textPrimary,
            margin: 0,
            textShadow: `0 0 40px ${colors.neonPurple}60`,
          }}
        >
          SalesMachine
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontSize: typography.headline,
              fontWeight: typography.weightSemibold,
              fontFamily: typography.fontFamily,
              background: colors.gradientPurpleCyan,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            v4.0+
          </span>
          <div
            style={{
              padding: '8px 16px',
              background: colors.neonLime,
              borderRadius: 20,
              fontSize: typography.small,
              fontWeight: typography.weightBold,
              color: colors.bgPrimary,
            }}
          >
            AI-POWERED
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          marginTop: 50,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontSize: typography.title,
            fontWeight: typography.weightMedium,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Prospecção B2B como
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: typography.displayMedium,
              fontWeight: typography.weightBold,
              fontFamily: typography.fontFamily,
              color: colors.neonCyan,
              textShadow: `0 0 30px ${colors.neonCyan}`,
            }}
          >
            ciência exata.
          </span>
          <AnimatedUnderline delay={70} width={400} color={colors.neonCyan} />
        </div>
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
