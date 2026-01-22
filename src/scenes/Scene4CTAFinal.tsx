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

export const Scene4CTAFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D Flip entrance animation
  const flipProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 80,
      mass: 1.2,
    },
  });

  // Subtle 3D rotation (rotateX for depth)
  const rotateX = interpolate(flipProgress, [0, 1], [8, 0]);
  const rotateY = interpolate(flipProgress, [0, 1], [-5, 0]);
  const scale = interpolate(flipProgress, [0, 1], [0.95, 1]);
  const opacity = interpolate(flipProgress, [0, 1], [0, 1]);

  // Staggered text animations
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineProgress = interpolate(frame, [8, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const sublineProgress = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const ctaProgress = interpolate(frame, [24, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // CTA pulse effect (subtle)
  const ctaPulse = interpolate(
    frame,
    [40, 50, 60],
    [1, 1.02, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(145deg, #FFFFFF 0%, #FFFFFF 70%, rgba(255, 139, 0, 0.04) 85%, rgba(183, 225, 1, 0.06) 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        perspective: 1000,
      }}
    >
      {/* Main Content Container with 3D transform */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          opacity,
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            marginBottom: 20,
          }}
        >
          <Img
            src={staticFile("logo-caracol.jpeg")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 24,
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
            fontSize: 64,
            fontWeight: 700,
            color: "#000000",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: headlineProgress,
            transform: `translateY(${interpolate(headlineProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Quer crescer
          <br />
          com dados?
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: "#8F8F8F",
            margin: 0,
            textAlign: "center",
            opacity: sublineProgress,
            transform: `translateY(${interpolate(sublineProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          Fale com a Caracol Media
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 30,
            opacity: ctaProgress,
            transform: `translateY(${interpolate(ctaProgress, [0, 1], [20, 0])}px) scale(${ctaPulse})`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #FF8B00 0%, #FFE01B 100%)",
              padding: "20px 48px",
              borderRadius: 50,
              boxShadow: "0 8px 30px rgba(255, 139, 0, 0.3)",
            }}
          >
            <span
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
                fontSize: 32,
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
              }}
            >
              caracolmedia.com.br
            </span>
          </div>
        </div>
      </div>

      {/* Bottom accent dots */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 12,
          opacity: ctaProgress,
        }}
      >
        {["#FF8B00", "#FFE01B", "#B7E101"].map((color, index) => (
          <div
            key={color}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: interpolate(
                frame,
                [30 + index * 3, 40 + index * 3],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              ),
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
