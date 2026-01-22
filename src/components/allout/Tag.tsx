import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TagProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  delay?: number;
}

export const Tag: React.FC<TagProps> = ({
  text,
  color = "#000000",
  backgroundColor = "#BFDC41",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-block",
        padding: "8px 16px",
        backgroundColor,
        color,
        fontSize: 22,
        fontWeight: 700,
        fontFamily: "Inter, Arial, sans-serif",
        textTransform: "uppercase",
        letterSpacing: 1,
        borderRadius: 4,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {text}
    </div>
  );
};
