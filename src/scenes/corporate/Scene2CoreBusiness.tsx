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

// Service Card Component
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const cardScale = interpolate(cardProgress, [0, 1], [0.7, 1], {
    extrapolateLeft: "clamp",
  });
  const cardOpacity = interpolate(cardProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(cardProgress, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
  });

  // Hover-like glow effect
  const glowIntensity = interpolate(
    frame,
    [delay + 30, delay + 50, delay + 70],
    [0, 0.8, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: SPACING.lg,
        padding: SPACING.xl,
        borderRadius: BORDER_RADIUS.cardLarge,
        border: `2px solid ${COLORS.limeAccent}`,
        backgroundColor: "rgba(26, 26, 26, 0.8)",
        backdropFilter: "blur(10px)",
        transform: `scale(${cardScale}) translateY(${cardY}px)`,
        opacity: cardOpacity,
        boxShadow: `
          ${SHADOWS.card},
          0 0 ${30 * glowIntensity}px rgba(204, 255, 0, ${0.2 * glowIntensity})
        `,
        minWidth: 340,
        minHeight: 280,
      }}
    >
      {/* Icon Container */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: BORDER_RADIUS.circle,
          backgroundColor: "rgba(255, 153, 0, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${20 * glowIntensity}px rgba(255, 153, 0, ${0.3 * glowIntensity})`,
        }}
      >
        <div
          style={{
            color: COLORS.primaryOrange,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: FONTS.heading,
          fontSize: FONT_SIZES.cardTitle,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.white,
          margin: 0,
          textAlign: "center",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
    </div>
  );
};

// SVG Icons
const GraphIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-6 4 4 5-8" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <circle cx="17" cy="7" r="3" />
    <path d="M21 21v-2a3 3 0 00-2-2.8" />
  </svg>
);

const MonitorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
  </svg>
);

export const Scene2CoreBusiness: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance - slide from right effect
  const sceneEntranceProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const sceneX = interpolate(sceneEntranceProgress, [0, 1], [100, 0], {
    extrapolateLeft: "clamp",
  });
  const sceneOpacity = interpolate(sceneEntranceProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Badge animation
  const badgeProgress = spring({
    frame: frame - 15,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const badgeScale = interpolate(badgeProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitOpacity = interpolate(
    frame,
    [190, 210],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.darkBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: SPACING.section,
        transform: `translateX(${sceneX}px)`,
        opacity: sceneOpacity * exitOpacity,
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(204, 255, 0, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(255, 153, 0, 0.02) 0%, transparent 40%)
          `,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: SPACING.xxl,
          zIndex: 1,
        }}
      >
        {/* Section Badge */}
        <div
          style={{
            backgroundColor: COLORS.limeAccent,
            paddingLeft: SPACING.lg,
            paddingRight: SPACING.lg,
            paddingTop: SPACING.sm,
            paddingBottom: SPACING.sm,
            borderRadius: BORDER_RADIUS.badge,
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
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
            Nossos Core Business
          </span>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "flex",
            gap: SPACING.xl,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ServiceCard
            icon={<GraphIcon />}
            title="Growth Marketing"
            delay={40}
          />
          <ServiceCard
            icon={<PeopleIcon />}
            title="Job Advertising"
            delay={60}
          />
          <ServiceCard
            icon={<MonitorIcon />}
            title="Digital Out of Home"
            delay={80}
          />
        </div>
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: "absolute",
          top: SPACING.xl,
          right: SPACING.xl,
          width: 60,
          height: 60,
          border: `2px solid ${COLORS.primaryOrange}`,
          borderLeft: "none",
          borderBottom: "none",
          opacity: interpolate(frame, [100, 120], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: SPACING.xl,
          left: SPACING.xl,
          width: 60,
          height: 60,
          border: `2px solid ${COLORS.limeAccent}`,
          borderRight: "none",
          borderTop: "none",
          opacity: interpolate(frame, [100, 120], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
