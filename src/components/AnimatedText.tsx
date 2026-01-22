import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

type AnimationType = "fadeIn" | "fadeScale" | "slideLeft" | "slideRight" | "rotateY" | "flip3D";

type AnimatedTextProps = {
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  delay?: number;
  animation?: AnimationType;
  style?: React.CSSProperties;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = 48,
  fontWeight = 600,
  color = "#1e293b",
  delay = 0,
  animation = "fadeIn",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  let animatedStyle: React.CSSProperties = {};

  switch (animation) {
    case "fadeIn":
      animatedStyle = {
        opacity: progress,
      };
      break;
    case "fadeScale":
      animatedStyle = {
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
      };
      break;
    case "slideLeft":
      animatedStyle = {
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [-100, 0])}px)`,
      };
      break;
    case "slideRight":
      animatedStyle = {
        opacity: progress,
        transform: `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`,
      };
      break;
    case "rotateY":
      animatedStyle = {
        opacity: progress,
        transform: `perspective(1000px) rotateY(${interpolate(progress, [0, 1], [-45, 0])}deg) translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`,
      };
      break;
    case "flip3D":
      animatedStyle = {
        opacity: progress,
        transform: `perspective(1000px) rotateX(${interpolate(progress, [0, 1], [90, 0])}deg)`,
      };
      break;
  }

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        textAlign: "center",
        ...animatedStyle,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

type StaggeredTextProps = {
  lines: string[];
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  baseDelay?: number;
  staggerDelay?: number;
  animation?: AnimationType;
  lineHeight?: number;
};

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  lines,
  fontSize = 36,
  fontWeight = 500,
  color = "#475569",
  baseDelay = 0,
  staggerDelay = 8,
  animation = "slideLeft",
  lineHeight = 1.4,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {lines.map((line, index) => (
        <AnimatedText
          key={index}
          text={line}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          delay={baseDelay + index * staggerDelay}
          animation={animation}
          style={{ lineHeight }}
        />
      ))}
    </div>
  );
};
