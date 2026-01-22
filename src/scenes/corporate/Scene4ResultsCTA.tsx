import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { LeafBackground } from "../../components/LeafBackground";
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

export const Scene4ResultsCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene entrance - dynamic cut effect
  const sceneProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const sceneOpacity = interpolate(sceneProgress, [0, 0.3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text animation
  const textDelay = 10;
  const textProgress = spring({
    frame: frame - textDelay,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const textY = interpolate(textProgress, [0, 1], [60, 0], {
    extrapolateLeft: "clamp",
  });
  const textOpacity = interpolate(textProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA Button animation
  const ctaDelay = 50;
  const ctaProgress = spring({
    frame: frame - ctaDelay,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const ctaScale = interpolate(ctaProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
  });
  const ctaOpacity = interpolate(ctaProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA pulse effect
  const pulseStart = ctaDelay + 40;
  const pulse = frame > pulseStart
    ? 1 + Math.sin((frame - pulseStart) * 0.12) * 0.03
    : 1;

  // CTA glow animation
  const glowIntensity = frame > pulseStart
    ? 0.6 + Math.sin((frame - pulseStart) * 0.1) * 0.3
    : 0;

  // Logo entrance (final branding)
  const logoDelay = 120;
  const logoProgress = spring({
    frame: frame - logoDelay,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1], {
    extrapolateLeft: "clamp",
  });
  const logoOpacity = interpolate(logoProgress, [0, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline animation
  const taglineDelay = 150;
  const taglineOpacity = interpolate(
    frame,
    [taglineDelay, taglineDelay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final fade out
  const finalFade = interpolate(
    frame,
    [220, 240],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity: finalFade }}>
      <LeafBackground variant="dark" intensity="strong" animated />

      {/* Content Container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: SPACING.section,
          opacity: sceneOpacity,
        }}
      >
        {/* Main Message */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SPACING.xxl,
            marginBottom: SPACING.xxl,
          }}
        >
          {/* Headline */}
          <h1
            style={{
              fontFamily: FONTS.heading,
              fontSize: FONT_SIZES.heroTitle,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
            }}
          >
            Performance real em
            <br />
            <span style={{ color: COLORS.primaryOrange }}>
              territórios digitais
            </span>
          </h1>

          {/* CTA Button */}
          <div
            style={{
              transform: `scale(${ctaScale * pulse})`,
              opacity: ctaOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.limeAccent,
                paddingLeft: SPACING.xxl,
                paddingRight: SPACING.xxl,
                paddingTop: SPACING.lg,
                paddingBottom: SPACING.lg,
                borderRadius: BORDER_RADIUS.buttonLarge,
                boxShadow: `
                  ${SHADOWS.button},
                  0 0 ${60 * glowIntensity}px rgba(204, 255, 0, ${0.5 * glowIntensity})
                `,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: FONT_SIZES.cta,
                  fontWeight: FONT_WEIGHTS.bold,
                  color: COLORS.darkBg,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Agendar Diagnóstico Gratuito
              </span>
            </div>
          </div>
        </div>

        {/* Final Logo & Branding */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SPACING.lg,
            marginTop: SPACING.xl,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          {/* Logo */}
          <Img
            src={staticFile("logo-caracol.jpeg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: BORDER_RADIUS.card,
              boxShadow: SHADOWS.logo,
            }}
          />

          {/* Brand Name */}
          <h2
            style={{
              fontFamily: FONTS.heading,
              fontSize: FONT_SIZES.cardTitle,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Caracol Media
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.regular,
              color: COLORS.greyLight,
              margin: 0,
              opacity: taglineOpacity,
            }}
          >
            Exploramos o que outros não conseguem
          </p>
        </div>

        {/* Bottom accent dots */}
        <div
          style={{
            position: "absolute",
            bottom: SPACING.xl,
            display: "flex",
            gap: SPACING.sm,
          }}
        >
          {[COLORS.limeAccent, COLORS.primaryOrange, COLORS.limeAccent].map(
            (color, index) => (
              <div
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: color,
                  opacity: interpolate(
                    frame,
                    [180 + index * 5, 200 + index * 5],
                    [0, 0.8],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                  boxShadow: `0 0 10px ${color}`,
                }}
              />
            )
          )}
        </div>
      </AbsoluteFill>

      {/* Corner decorative elements */}
      <div
        style={{
          position: "absolute",
          top: SPACING.xl,
          left: SPACING.xl,
          width: 40,
          height: 40,
          borderLeft: `3px solid ${COLORS.primaryOrange}`,
          borderTop: `3px solid ${COLORS.primaryOrange}`,
          opacity: interpolate(frame, [30, 50], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: SPACING.xl,
          right: SPACING.xl,
          width: 40,
          height: 40,
          borderRight: `3px solid ${COLORS.limeAccent}`,
          borderTop: `3px solid ${COLORS.limeAccent}`,
          opacity: interpolate(frame, [30, 50], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: SPACING.xl + 40,
          left: SPACING.xl,
          width: 40,
          height: 40,
          borderLeft: `3px solid ${COLORS.limeAccent}`,
          borderBottom: `3px solid ${COLORS.limeAccent}`,
          opacity: interpolate(frame, [30, 50], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: SPACING.xl + 40,
          right: SPACING.xl,
          width: 40,
          height: 40,
          borderRight: `3px solid ${COLORS.primaryOrange}`,
          borderBottom: `3px solid ${COLORS.primaryOrange}`,
          opacity: interpolate(frame, [30, 50], [0, 0.5], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
