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

export const Scene1IntroHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.bouncy,
    delay: 5,
  });

  const logoScale = interpolate(logoProgress, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Headline animation - kinetic typography effect
  const headlineDelay = 20;
  const headlineProgress = spring({
    frame: frame - headlineDelay,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const headlineY = interpolate(
    headlineProgress,
    [0, 1],
    [80, 0],
    { extrapolateLeft: "clamp" }
  );
  const headlineOpacity = interpolate(
    frame,
    [headlineDelay, headlineDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Word-by-word animation for "crescimento"
  const highlightDelay = 50;
  const highlightProgress = interpolate(
    frame,
    [highlightDelay, highlightDelay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const highlightScale = interpolate(
    highlightProgress,
    [0, 0.5, 1],
    [0.9, 1.08, 1]
  );

  const highlightGlow = interpolate(
    frame,
    [highlightDelay + 15, highlightDelay + 30, highlightDelay + 45],
    [0, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subheadline animation
  const subheadlineDelay = 70;
  const subheadlineProgress = spring({
    frame: frame - subheadlineDelay,
    fps,
    config: SPRING_CONFIGS.gentle,
  });

  const subheadlineY = interpolate(
    subheadlineProgress,
    [0, 1],
    [40, 0],
    { extrapolateLeft: "clamp" }
  );
  const subheadlineOpacity = interpolate(
    frame,
    [subheadlineDelay, subheadlineDelay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Accent line animation
  const accentLineProgress = interpolate(
    frame,
    [90, 120],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // Exit animation (fade out towards end)
  const exitOpacity = interpolate(
    frame,
    [130, 150],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <LeafBackground variant="dark" intensity="normal" animated />

      {/* Main content container with exit animation */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: SPACING.section,
          opacity: exitOpacity,
        }}
      >
        {/* Fixed Logo - Top Left */}
        <div
          style={{
            position: "absolute",
            top: SPACING.xl,
            left: SPACING.xl,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          <Img
            src={staticFile("logo-caracol.jpeg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: BORDER_RADIUS.card,
              boxShadow: SHADOWS.logo,
            }}
          />
        </div>

        {/* Main Text Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: SPACING.lg,
            maxWidth: 1400,
          }}
        >
          {/* Headline with kinetic effect */}
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px)`,
            }}
          >
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
              }}
            >
              Desbravamos territórios
              <br />
              inexplorados para o seu
              <br />
              <span
                style={{
                  color: COLORS.limeAccent,
                  display: "inline-block",
                  transform: `scale(${highlightScale})`,
                  textShadow: `0 0 ${40 * highlightGlow}px ${COLORS.limeAccent}`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                crescimento
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.subtitle,
              fontWeight: FONT_WEIGHTS.regular,
              color: COLORS.white,
              margin: 0,
              textAlign: "center",
              opacity: subheadlineOpacity,
              transform: `translateY(${subheadlineY}px)`,
              maxWidth: 900,
              lineHeight: 1.5,
            }}
          >
            Especialistas em performance e canais não convencionais
          </p>

          {/* Animated accent line */}
          <div
            style={{
              width: interpolate(accentLineProgress, [0, 1], [0, 120]),
              height: 4,
              backgroundColor: COLORS.primaryOrange,
              borderRadius: 2,
              marginTop: SPACING.md,
              boxShadow: `0 0 20px ${COLORS.primaryOrange}`,
            }}
          />
        </div>

        {/* Bottom decorative elements */}
        <div
          style={{
            position: "absolute",
            bottom: SPACING.xl,
            display: "flex",
            gap: SPACING.sm,
            opacity: subheadlineOpacity * 0.6,
          }}
        >
          {[COLORS.primaryOrange, COLORS.limeAccent, COLORS.primaryOrange].map(
            (color, index) => (
              <div
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: color,
                  opacity: interpolate(
                    frame,
                    [100 + index * 5, 115 + index * 5],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              />
            )
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
