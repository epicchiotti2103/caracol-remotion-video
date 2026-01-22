import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import {
  COLORS,
  FONTS,
  FONT_WEIGHTS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  SPRING_CONFIGS,
} from "../../theme";

// Step Component for Method
interface MethodStepProps {
  number: string;
  title: string;
  delay: number;
}

const MethodStep: React.FC<MethodStepProps> = ({ number, title, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stepProgress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const scale = interpolate(stepProgress, [0, 1], [0.5, 1], {
    extrapolateLeft: "clamp",
  });
  const opacity = interpolate(stepProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse effect after entrance
  const pulsePhase = Math.max(0, frame - delay - 30);
  const pulse = 1 + Math.sin(pulsePhase * 0.1) * 0.03;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.md,
        transform: `scale(${scale * pulse})`,
        opacity,
      }}
    >
      {/* Number Circle */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: BORDER_RADIUS.circle,
          backgroundColor: COLORS.primaryOrange,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: SHADOWS.glowOrange,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.heading,
            fontSize: 36,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.white,
          }}
        >
          {number}
        </span>
      </div>

      {/* Title */}
      <span
        style={{
          fontFamily: FONTS.body,
          fontSize: FONT_SIZES.bodyLarge,
          fontWeight: FONT_WEIGHTS.semibold,
          color: COLORS.white,
          textAlign: "center",
        }}
      >
        {title}
      </span>
    </div>
  );
};

// Chevron Component
const Chevron: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle bounce animation
  const bounce = Math.sin((frame - delay) * 0.15) * 3;

  return (
    <div
      style={{
        color: COLORS.limeAccent,
        width: 40,
        height: 40,
        opacity,
        transform: `translateX(${bounce}px)`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
};

// Globe Icon
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

export const Scene3MethodReach: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transition - zoom out effect
  const sceneProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const sceneScale = interpolate(sceneProgress, [0, 1], [1.1, 1], {
    extrapolateLeft: "clamp",
  });
  const sceneOpacity = interpolate(sceneProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge animation
  const badgeProgress = spring({
    frame: frame - 10,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  // Phase transition from Method to LATAM (around frame 150)
  const phaseTransition = interpolate(
    frame,
    [140, 160],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }
  );

  // LATAM section animations
  const latamBadgeProgress = spring({
    frame: frame - 160,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const globeProgress = spring({
    frame: frame - 175,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const latamTextProgress = spring({
    frame: frame - 190,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Exit animation
  const exitOpacity = interpolate(
    frame,
    [280, 300],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.navyBg,
        transform: `scale(${sceneScale})`,
        opacity: sceneOpacity * exitOpacity,
        overflow: "hidden",
      }}
    >
      {/* Decorative golden lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
        }}
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={COLORS.gold} stopOpacity="0" />
            <stop offset="50%" stopColor={COLORS.gold} stopOpacity="1" />
            <stop offset="100%" stopColor={COLORS.bronze} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="200" x2="1920" y2="400" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="0" y1="700" x2="1920" y2="500" stroke="url(#goldGradient)" strokeWidth="1" />
        <line x1="100" y1="0" x2="300" y2="1080" stroke="url(#goldGradient)" strokeWidth="0.5" />
        <line x1="1700" y1="0" x2="1500" y2="1080" stroke="url(#goldGradient)" strokeWidth="0.5" />
      </svg>

      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(255, 153, 0, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(204, 255, 0, 0.03) 0%, transparent 40%)
          `,
        }}
      />

      {/* Content Container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: SPACING.section,
        }}
      >
        {/* MÉTODO CARACOL Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SPACING.xxl,
            opacity: 1 - phaseTransition,
            transform: `translateY(${-50 * phaseTransition}px)`,
            position: "absolute",
          }}
        >
          {/* Badge */}
          <div
            style={{
              backgroundColor: COLORS.limeAccent,
              paddingLeft: SPACING.lg,
              paddingRight: SPACING.lg,
              paddingTop: SPACING.sm,
              paddingBottom: SPACING.sm,
              borderRadius: BORDER_RADIUS.badge,
              transform: `scale(${interpolate(badgeProgress, [0, 1], [0.8, 1])})`,
              opacity: interpolate(badgeProgress, [0, 0.5], [0, 1]),
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.label,
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.darkBg,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Método Caracol
            </span>
          </div>

          {/* Steps Flow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: SPACING.xl,
            }}
          >
            <MethodStep number="1" title="Diagnóstico" delay={30} />
            <Chevron delay={50} />
            <MethodStep number="2" title="Estratégia" delay={60} />
            <Chevron delay={80} />
            <MethodStep number="3" title="Execução" delay={90} />
          </div>
        </div>

        {/* LATAM Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SPACING.xl,
            opacity: phaseTransition,
            transform: `translateY(${50 * (1 - phaseTransition)}px)`,
            position: "absolute",
          }}
        >
          {/* Badge */}
          <div
            style={{
              backgroundColor: COLORS.limeAccent,
              paddingLeft: SPACING.lg,
              paddingRight: SPACING.lg,
              paddingTop: SPACING.sm,
              paddingBottom: SPACING.sm,
              borderRadius: BORDER_RADIUS.badge,
              transform: `scale(${interpolate(latamBadgeProgress, [0, 1], [0.8, 1])})`,
              opacity: interpolate(latamBadgeProgress, [0, 0.5], [0, 1]),
            }}
          >
            <span
              style={{
                fontFamily: FONTS.body,
                fontSize: FONT_SIZES.label,
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.darkBg,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              América Latina
            </span>
          </div>

          {/* Globe Icon */}
          <div
            style={{
              width: 160,
              height: 160,
              color: COLORS.primaryOrange,
              transform: `scale(${interpolate(globeProgress, [0, 1], [0.5, 1])})`,
              opacity: interpolate(globeProgress, [0, 0.5], [0, 1]),
              filter: `drop-shadow(0 0 30px rgba(255, 153, 0, 0.5))`,
            }}
          >
            <GlobeIcon />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontSize: FONT_SIZES.sectionTitle,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
              margin: 0,
              textAlign: "center",
              opacity: interpolate(latamTextProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(latamTextProgress, [0, 1], [30, 0])}px)`,
            }}
          >
            EXPANSÃO{" "}
            <span style={{ color: COLORS.limeAccent }}>LATAM</span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.bodyLarge,
              fontWeight: FONT_WEIGHTS.regular,
              color: COLORS.greySubtle,
              margin: 0,
              textAlign: "center",
              maxWidth: 600,
              opacity: interpolate(latamTextProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(latamTextProgress, [0, 1], [20, 0])}px)`,
            }}
          >
            Conectando sua marca em toda a América Latina
          </p>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
