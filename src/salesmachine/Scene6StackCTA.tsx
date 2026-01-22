import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Orbiting tech icon
interface OrbitIconProps {
  name: string;
  icon: string;
  orbitRadius: number;
  startAngle: number;
  speed: number;
  delay: number;
  color: string;
}

const OrbitIcon: React.FC<OrbitIconProps> = ({ name, icon, orbitRadius, startAngle, speed, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springMedium,
  });

  const angle = startAngle + frame * speed;
  const rad = (angle * Math.PI) / 180;

  const x = Math.cos(rad) * orbitRadius;
  const y = Math.sin(rad) * orbitRadius * 0.4; // Elliptical orbit

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.3, 1]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.08) * 0.05 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: 540 + x - 50,
        top: 400 + y - 50,
        width: 100,
        height: 100,
        opacity: opacity * (0.7 + Math.cos(rad) * 0.3), // Fade based on position
        transform: `scale(${scale * pulse})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        zIndex: Math.cos(rad) > 0 ? 20 : 5, // Layer based on position
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          background: `linear-gradient(135deg, ${color}30, ${color}15)`,
          border: `2px solid ${color}50`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          boxShadow: `0 0 30px ${color}40`,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: typography.small - 2,
          fontFamily: typography.fontFamily,
          color: colors.textSecondary,
          textAlign: 'center',
          maxWidth: 100,
        }}
      >
        {name}
      </span>
    </div>
  );
};

// Central hub with connections
const CentralHub: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hubProgress = spring({
    frame: frame - 10,
    fps,
    config: animation.springBouncy,
  });

  const scale = interpolate(hubProgress, [0, 1], [0.5, 1]);
  const opacity = interpolate(hubProgress, [0, 1], [0, 1]);

  // Rotating glow
  const rotation = frame * 0.5;

  return (
    <div
      style={{
        position: 'absolute',
        left: 540 - 80,
        top: 400 - 80,
        width: 160,
        height: 160,
        opacity,
        transform: `scale(${scale})`,
        zIndex: 15,
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          inset: -40,
          borderRadius: '50%',
          background: `conic-gradient(from ${rotation}deg, ${colors.neonPurple}40, ${colors.neonCyan}40, ${colors.neonLime}40, ${colors.neonPurple}40)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Core circle */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: colors.bgSecondary,
          border: `3px solid ${colors.neonPurple}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 40px ${colors.neonPurple}60`,
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: typography.title,
              fontWeight: typography.weightBold,
              fontFamily: typography.fontFamily,
              color: colors.neonPurple,
            }}
          >
            SM
          </div>
          <div
            style={{
              fontSize: typography.small,
              fontFamily: typography.fontFamily,
              color: colors.textSecondary,
            }}
          >
            v4.0+
          </div>
        </div>
      </div>
    </div>
  );
};

// Connection lines from center to orbits
const ConnectionLines: React.FC = () => {
  const frame = useCurrentFrame();

  const lineProgress = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lines = 8;
  const radius = 200;

  return (
    <svg
      width={1080}
      height={800}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.3,
      }}
    >
      {Array.from({ length: lines }, (_, i) => {
        const angle = (i * 360 / lines) * (Math.PI / 180);
        const x2 = 540 + Math.cos(angle) * radius * lineProgress;
        const y2 = 400 + Math.sin(angle) * radius * 0.4 * lineProgress;

        return (
          <line
            key={i}
            x1={540}
            y1={400}
            x2={x2}
            y2={y2}
            stroke={colors.neonPurple}
            strokeWidth={1}
            strokeDasharray="5,5"
          />
        );
      })}
    </svg>
  );
};

// CTA Button with pulse
const CTAButton: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springBouncy,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.7, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.12) * 0.03 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * pulse})`,
        background: colors.gradientPurpleCyan,
        borderRadius: 100,
        padding: '28px 60px',
        boxShadow: `0 10px 40px ${colors.neonPurple}50, 0 0 60px ${colors.neonCyan}30`,
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          fontSize: typography.title,
          fontWeight: typography.weightBold,
          fontFamily: typography.fontFamily,
          color: colors.textPrimary,
          letterSpacing: typography.trackingTight,
        }}
      >
        Veja o SalesMachine em ação
      </span>
    </div>
  );
};

export const Scene6StackCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  // Tech stack icons
  const techStack: Omit<OrbitIconProps, 'orbitRadius' | 'speed'>[] = [
    { name: 'Google Cloud', icon: '☁️', startAngle: 0, delay: 40, color: colors.neonBlue },
    { name: 'Gemini 2.0', icon: '✨', startAngle: 45, delay: 50, color: colors.neonPurple },
    { name: 'Perplexity AI', icon: '🔮', startAngle: 90, delay: 60, color: colors.neonCyan },
    { name: 'CrustData', icon: '📊', startAngle: 135, delay: 70, color: colors.neonOrange },
    { name: 'Apollo', icon: '🚀', startAngle: 180, delay: 80, color: colors.neonLime },
    { name: 'BrasilAPI', icon: '🇧🇷', startAngle: 225, delay: 90, color: colors.neonPink },
    { name: 'Pub/Sub', icon: '📡', startAngle: 270, delay: 100, color: colors.neonCyan },
    { name: 'Cloud Run', icon: '⚡', startAngle: 315, delay: 110, color: colors.neonBlue },
  ];

  // Headline animations
  const headlineOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineY = interpolate(frame, [120, 150], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: spacing.screenPadding,
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 600,
          left: 140,
          top: 100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.neonPurple}15 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: interpolate(headerProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerProgress, [0, 1], [-30, 0])}px)`,
          textAlign: 'center',
          zIndex: 10,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: 100,
            padding: '10px 24px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: colors.neonPurple,
              fontSize: typography.small,
              fontWeight: typography.weightSemibold,
              fontFamily: typography.fontFamily,
              letterSpacing: typography.trackingWide,
              textTransform: 'uppercase',
            }}
          >
            🛠️ Tecnologia
          </span>
        </div>
        <h2
          style={{
            fontSize: typography.headline,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
            margin: 0,
            letterSpacing: typography.trackingTight,
          }}
        >
          Stack de Elite
        </h2>
      </div>

      {/* Orbit area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 500,
          zIndex: 10,
        }}
      >
        <ConnectionLines />
        <CentralHub />

        {techStack.map((tech, i) => (
          <OrbitIcon
            key={i}
            {...tech}
            orbitRadius={280}
            speed={0.3}
          />
        ))}
      </div>

      {/* Headlines */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          textAlign: 'center',
          zIndex: 10,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <h3
          style={{
            fontSize: typography.displayMedium,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
            margin: 0,
            marginBottom: 16,
            letterSpacing: typography.trackingTight,
          }}
        >
          Leads certos.
          <br />
          <span
            style={{
              background: colors.gradientPurpleCyan,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Mensagens perfeitas.
          </span>
        </h3>
        <p
          style={{
            fontSize: typography.body,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            margin: 0,
          }}
        >
          Automatize sua prospecção com precisão cirúrgica.
        </p>
      </div>

      {/* CTA Button */}
      <CTAButton delay={160} />

      {/* Sub-CTA */}
      <div
        style={{
          opacity: interpolate(frame, [180, 200], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          marginTop: 24,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: typography.caption,
            fontFamily: typography.fontFamily,
            color: colors.textMuted,
          }}
        >
          Agende uma demo →
        </span>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: `linear-gradient(transparent, ${colors.bgPrimary})`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
