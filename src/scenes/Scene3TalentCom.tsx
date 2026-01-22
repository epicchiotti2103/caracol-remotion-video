import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Animated Bar Chart Component
const AnimatedChart: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bars = [
    { height: 60, color: "#FFE01B" },
    { height: 85, color: "#B7E101" },
    { height: 70, color: "#FF8B00" },
    { height: 100, color: "#B7E101" },
    { height: 90, color: "#FF8B00" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 16,
        height: 160,
        padding: "20px 0",
      }}
    >
      {bars.map((bar, index) => {
        const barProgress = spring({
          frame: frame - delay - index * 3,
          fps,
          config: {
            damping: 50,
            stiffness: 100,
          },
        });

        const barHeight = interpolate(barProgress, [0, 1], [0, bar.height]);

        return (
          <div
            key={index}
            style={{
              width: 40,
              height: barHeight,
              backgroundColor: bar.color,
              borderRadius: 8,
              opacity: interpolate(barProgress, [0, 0.2], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          />
        );
      })}
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: string;
  text: string;
  delay: number;
}> = ({ icon, text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 80,
      stiffness: 100,
    },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [25, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#FFFFFF",
        padding: "20px 28px",
        borderRadius: 20,
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
          fontSize: 24,
          fontWeight: 500,
          color: "#000000",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene3TalentCom: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main entrance
  const mainProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 60,
    },
  });

  const mainOpacity = interpolate(mainProgress, [0, 1], [0, 1]);
  const mainScale = interpolate(mainProgress, [0, 1], [0.96, 1]);

  // Text animations
  const titleOpacity = interpolate(frame, [8, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        gap: 50,
        opacity: mainOpacity,
        transform: `scale(${mainScale})`,
      }}
    >
      {/* Top Section - Talent.com Badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            backgroundColor: "#B7E101",
            padding: "10px 24px",
            borderRadius: 20,
            opacity: titleOpacity,
          }}
        >
          <span
            style={{
              fontFamily:
                '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
              fontSize: 20,
              fontWeight: 600,
              color: "#000000",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Representante Oficial
          </span>
        </div>

        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
            fontSize: 52,
            fontWeight: 700,
            color: "#000000",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
          }}
        >
          Talent.com no Brasil
        </h2>
      </div>

      {/* Main Card */}
      <div
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: 32,
          padding: "50px 45px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 36,
          maxWidth: 850,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.06)",
        }}
      >
        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            fontSize: 34,
            fontWeight: 500,
            color: "#000000",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: subtitleOpacity,
          }}
        >
          Divulgue a sua vaga para
          <br />o Brasil inteiro
        </p>

        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            fontSize: 28,
            fontWeight: 400,
            color: "#8F8F8F",
            margin: 0,
            textAlign: "center",
            opacity: subtitleOpacity,
          }}
        >
          De forma fácil e acessível
        </p>

        {/* Animated Chart */}
        <AnimatedChart delay={25} />

        {/* Feature Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
          }}
        >
          <FeatureCard icon="🎯" text="Alcance milhões de candidatos" delay={45} />
          <FeatureCard icon="⚡" text="Publicação em minutos" delay={50} />
          <FeatureCard icon="📊" text="Métricas em tempo real" delay={55} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
