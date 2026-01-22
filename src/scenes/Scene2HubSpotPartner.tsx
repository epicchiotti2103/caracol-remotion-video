import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const pills = [
  { text: "Onboarding e setup", color: "#FF8B00" },
  { text: "Playbooks de automação", color: "#B7E101" },
  { text: "Dashboards de vendas", color: "#FFE01B" },
];

const Pill: React.FC<{
  text: string;
  color: string;
  delay: number;
}> = ({ text, color, delay }) => {
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
  const translateY = interpolate(progress, [0, 1], [20, 0]);
  const scale = interpolate(progress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: "#FFFFFF",
        padding: "16px 28px",
        borderRadius: 50,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
          fontSize: 28,
          fontWeight: 500,
          color: "#000000",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene2HubSpotPartner: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card entrance animation
  const cardProgress = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 60,
    },
  });

  const cardScale = interpolate(cardProgress, [0, 1], [0.95, 1]);
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const cardTranslateY = interpolate(cardProgress, [0, 1], [40, 0]);

  // Title animations
  const titleOpacity = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 50%, #FFFFFF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Main Card */}
      <div
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: 40,
          padding: "60px 50px",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          maxWidth: 900,
          width: "100%",
          opacity: cardOpacity,
          transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
        }}
      >
        {/* HubSpot Badge */}
        <div
          style={{
            backgroundColor: "#FF8B00",
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
              color: "#FFFFFF",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Parceiro Oficial
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
            fontSize: 56,
            fontWeight: 700,
            color: "#000000",
            margin: 0,
            textAlign: "center",
            letterSpacing: "-0.02em",
            opacity: titleOpacity,
          }}
        >
          HubSpot no Brasil
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif',
            fontSize: 32,
            fontWeight: 400,
            color: "#8F8F8F",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: subtitleOpacity,
          }}
        >
          Implementação, automação
          <br />e crescimento de receita
        </p>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            backgroundColor: "#E0E0E0",
            borderRadius: 2,
            opacity: subtitleOpacity,
          }}
        />

        {/* Pills Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
          }}
        >
          {pills.map((pill, index) => (
            <Pill
              key={pill.text}
              text={pill.text}
              color={pill.color}
              delay={30 + index * 4}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
