import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface ChipProps {
  children: React.ReactNode;
  delay?: number;
  backgroundColor?: string;
  borderColor?: string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  delay = 0,
  backgroundColor = "rgba(255, 255, 255, 0.08)",
  borderColor = "#BFDC41",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const translateY = interpolate(frame - delay, [0, 15], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 36px",
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: 12,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
};
