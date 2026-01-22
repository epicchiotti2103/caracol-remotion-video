import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

interface LeafBackgroundProps {
  variant?: "dark" | "navy" | "green";
  intensity?: "subtle" | "normal" | "strong";
  animated?: boolean;
}

export const LeafBackground: React.FC<LeafBackgroundProps> = ({
  variant = "dark",
  intensity = "normal",
  animated = true,
}) => {
  const frame = useCurrentFrame();

  const bgColor = {
    dark: COLORS.darkBg,
    navy: COLORS.navyBg,
    green: COLORS.leafGreen,
  }[variant];

  const patternOpacity = {
    subtle: 0.05,
    normal: 0.1,
    strong: 0.15,
  }[intensity];

  // Subtle floating animation for leaves
  const floatOffset = animated
    ? Math.sin(frame * 0.02) * 5
    : 0;

  const rotation = animated
    ? interpolate(frame, [0, 300], [0, 10], { extrapolateRight: "extend" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: bgColor, overflow: "hidden" }}>
      {/* Main leaf pattern overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: patternOpacity,
          transform: `translateY(${floatOffset}px) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        {/* SVG leaf pattern */}
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <pattern
              id="leafPattern"
              patternUnits="userSpaceOnUse"
              width="200"
              height="200"
              patternTransform="rotate(15)"
            >
              {/* Stylized leaf/vein pattern */}
              <path
                d="M100 0 Q120 50 100 100 Q80 50 100 0"
                fill="none"
                stroke={COLORS.leafGreenLight}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <path
                d="M50 50 Q70 100 50 150 Q30 100 50 50"
                fill="none"
                stroke={COLORS.leafGreen}
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                d="M150 50 Q170 100 150 150 Q130 100 150 50"
                fill="none"
                stroke={COLORS.teal}
                strokeWidth="1"
                opacity="0.4"
              />
              {/* Connecting veins */}
              <line
                x1="100"
                y1="100"
                x2="50"
                y2="150"
                stroke={COLORS.leafGreenLight}
                strokeWidth="0.5"
                opacity="0.3"
              />
              <line
                x1="100"
                y1="100"
                x2="150"
                y2="150"
                stroke={COLORS.leafGreenLight}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(31, 77, 47, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(26, 74, 74, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(10, 10, 10, 0.4) 100%)
          `,
        }}
      />

      {/* Subtle corner accents */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(204, 255, 0, 0.03) 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 153, 0, 0.03) 0%, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
