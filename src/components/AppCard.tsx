import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

type AppCardProps = {
  icon: string;
  label: string;
  delay?: number;
  color?: string;
};

export const AppCard: React.FC<AppCardProps> = ({
  icon,
  label,
  delay = 0,
  color = "#3b82f6",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = progress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#64748b",
        }}
      >
        {label}
      </span>
    </div>
  );
};
