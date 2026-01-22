import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1HeroIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main entrance animation - smooth spring
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 80,
      mass: 1,
    },
  });

  // Scale animation (0.9 -> 1.0)
  const scale = interpolate(entranceProgress, [0, 1], [0.9, 1]);

  // Fade animation
  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);

  // Subtle translateY (30px -> 0)
  const translateY = interpolate(entranceProgress, [0, 1], [30, 0]);

  // Text stagger - headline appears first, then subline
  const headlineOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sublineOpacity = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sublineTranslateY = interpolate(frame, [16, 28], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 60%, rgba(255, 139, 0, 0.03) 80%, rgba(183, 225, 1, 0.05) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Logo Container */}
      <div
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          opacity,
          marginBottom: 60,
        }}
      >
        <Img
          src={staticFile("logo-caracol.jpeg")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 40,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
          }}
        />
      </div>

      {/* Text Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
            fontSize: 72,
            fontWeight: 700,
            color: "#000000",
            margin: 0,
            letterSpacing: "-0.02em",
            opacity: headlineOpacity,
          }}
        >
          Caracol Media
        </h1>

        {/* Subline */}
        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: "#8F8F8F",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 800,
            opacity: sublineOpacity,
            transform: `translateY(${sublineTranslateY}px)`,
          }}
        >
          Desbravamos territórios inexplorados
          <br />
          para o seu crescimento
        </p>
      </div>

      {/* Subtle accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          width: interpolate(entranceProgress, [0, 1], [0, 60]),
          height: 4,
          backgroundColor: "#FF8B00",
          borderRadius: 2,
          opacity: interpolate(frame, [30, 45], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
