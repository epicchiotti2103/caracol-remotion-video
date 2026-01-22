import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface AnimatedTextProps {
  text: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for scale (starts at 0.5, ends at 1)
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Fade in animation (0 to 1 over first 20 frames)
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Calculate scale from 0.5 to 1 using spring value
  const finalScale = interpolate(scale, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scale(${finalScale})`,
        fontSize: 80,
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontWeight: 700,
        color: "#ffffff",
        textAlign: "center",
        textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        letterSpacing: "0.02em",
      }}
    >
      {text}
    </div>
  );
};
