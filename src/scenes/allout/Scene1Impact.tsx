import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene1Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // Lime trace animation - moves across screen
  const traceProgress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const traceX = interpolate(traceProgress, [0, 1], [-200, width + 200]);
  const traceBlur = interpolate(frame, [0, 15, 20], [0, 30, 0], {
    extrapolateRight: "clamp",
  });

  // Text reveal based on trace position
  const textRevealProgress = interpolate(frame, [8, 25], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Scale overshoot effect
  const scaleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 8, stiffness: 150, mass: 0.8 },
  });

  const textScale = interpolate(scaleSpring, [0, 1], [1.1, 1]);
  const textOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [25, 35], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const subtitleY = interpolate(frame, [25, 40], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Lime trace line with motion blur effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: "100%",
          height: 6,
          transform: "translateY(-50%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: traceX,
            width: 300,
            height: "100%",
            background: `linear-gradient(90deg, transparent, #BFDC41, #BFDC41, transparent)`,
            filter: `blur(${traceBlur}px)`,
            boxShadow: "0 0 40px #BFDC41, 0 0 80px #BFDC41",
          }}
        />
      </div>

      {/* Main text container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        {/* ALL OUT RUN text with clip mask effect */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: 120,
              fontWeight: 900,
              fontFamily: "Inter, Arial, sans-serif",
              letterSpacing: -2,
              margin: 0,
              textTransform: "uppercase",
              clipPath: `inset(0 ${100 - textRevealProgress * 100}% 0 0)`,
            }}
          >
            ALL OUT RUN
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: "#BFDC41",
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: 4,
            margin: "30px 0 0 0",
            textTransform: "uppercase",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Desenvolvido por atletas para atletas
        </p>
      </div>

      {/* Decorative corner lines */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 60,
          width: 80,
          height: 80,
          borderLeft: "3px solid #BFDC41",
          borderTop: "3px solid #BFDC41",
          opacity: interpolate(frame, [30, 45], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 80,
          right: 60,
          width: 80,
          height: 80,
          borderRight: "3px solid #BFDC41",
          borderBottom: "3px solid #BFDC41",
          opacity: interpolate(frame, [30, 45], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
