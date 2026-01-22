import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont();

// Colors
const BG_LIGHT = "#f8fafc";
const TEXT_PRIMARY = "#1e293b";
const TEXT_SECONDARY = "#475569";
const TEXT_MUTED = "#64748b";
const HUBSPOT_ORANGE = "#ff7a59";
const TALENT_BLUE = "#0066ff";

// Animation types
type AnimationType = "fadeIn" | "fadeScale" | "slideLeft" | "rotateY" | "flip3D";

// Animated Text Component
const AnimatedText: React.FC<{
  text: string;
  fontSize: number;
  fontWeight: number;
  color: string;
  delay?: number;
  animation?: AnimationType;
}> = ({ text, fontSize, fontWeight, color, delay = 0, animation = "fadeIn" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });

  let style: React.CSSProperties = {
    fontSize,
    fontWeight,
    color,
    textAlign: "center",
  };

  switch (animation) {
    case "fadeIn":
      style.opacity = progress;
      break;
    case "fadeScale":
      style.opacity = progress;
      style.transform = `scale(${interpolate(progress, [0, 1], [0.8, 1])})`;
      break;
    case "slideLeft":
      style.opacity = progress;
      style.transform = `translateX(${interpolate(progress, [0, 1], [100, 0])}px)`;
      break;
    case "rotateY":
      style.opacity = progress;
      style.transform = `perspective(1000px) rotateY(${interpolate(progress, [0, 1], [-45, 0])}deg)`;
      break;
    case "flip3D":
      style.opacity = progress;
      style.transform = `perspective(1000px) rotateX(${interpolate(progress, [0, 1], [90, 0])}deg)`;
      break;
  }

  return <div style={style}>{text}</div>;
};

// Staggered Text Component
const StaggeredText: React.FC<{
  lines: string[];
  fontSize: number;
  fontWeight: number;
  color: string;
  baseDelay?: number;
  staggerDelay?: number;
  animation?: AnimationType;
}> = ({ lines, fontSize, fontWeight, color, baseDelay = 0, staggerDelay = 10, animation = "fadeIn" }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {lines.map((line, index) => (
        <AnimatedText
          key={index}
          text={`• ${line}`}
          fontSize={fontSize}
          fontWeight={fontWeight}
          color={color}
          delay={baseDelay + index * staggerDelay}
          animation={animation}
        />
      ))}
    </div>
  );
};

// App Card Component
const AppCard: React.FC<{
  icon: string;
  label: string;
  delay?: number;
  color?: string;
}> = ({ icon, label, delay = 0, color = "#3b82f6" }) => {
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
      <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_MUTED }}>{label}</span>
    </div>
  );
};

// Scene 1: Introduction with Logo (0-3s)
const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_LIGHT,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoProgress,
          transform: `scale(${interpolate(logoProgress, [0, 1], [0.5, 1])})`,
          marginBottom: 60,
        }}
      >
        <Img
          src={staticFile("logo-caracol.jpg")}
          style={{
            width: 280,
            height: 280,
            borderRadius: 40,
            objectFit: "cover",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* Title */}
      <AnimatedText
        text="Caracol Media"
        fontSize={72}
        fontWeight={800}
        color={TEXT_PRIMARY}
        delay={15}
        animation="fadeScale"
      />

      {/* Subtitle */}
      <div style={{ marginTop: 24 }}>
        <AnimatedText
          text="Automação de vendas &"
          fontSize={36}
          fontWeight={500}
          color={TEXT_SECONDARY}
          delay={25}
          animation="fadeIn"
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <AnimatedText
          text="performance marketing"
          fontSize={36}
          fontWeight={500}
          color={TEXT_SECONDARY}
          delay={30}
          animation="fadeIn"
        />
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: HubSpot Partner (3-7s)
const Scene2HubSpot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 15, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_LIGHT,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* HubSpot Badge */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: HUBSPOT_ORANGE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
          transform: `scale(${interpolate(badgeScale, [0, 1], [0, 1])})`,
          boxShadow: "0 16px 48px rgba(255,122,89,0.4)",
        }}
      >
        <span style={{ fontSize: 60, color: "white", fontWeight: 700 }}>H</span>
      </div>

      {/* Title */}
      <AnimatedText
        text="Parceiro oficial HubSpot"
        fontSize={52}
        fontWeight={700}
        color={TEXT_PRIMARY}
        delay={10}
        animation="rotateY"
      />
      <div style={{ marginTop: 8 }}>
        <AnimatedText
          text="no Brasil"
          fontSize={52}
          fontWeight={700}
          color={HUBSPOT_ORANGE}
          delay={15}
          animation="rotateY"
        />
      </div>

      {/* Bullets */}
      <div style={{ marginTop: 50, width: "100%" }}>
        <StaggeredText
          lines={[
            "Implementação completa",
            "Automação de marketing",
            "Crescimento de receita",
          ]}
          fontSize={32}
          fontWeight={500}
          color={TEXT_SECONDARY}
          baseDelay={25}
          staggerDelay={12}
          animation="rotateY"
        />
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Talent.com + Apps (7-11s)
const Scene3Talent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeScale = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 15, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_LIGHT,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
      }}
    >
      {/* Talent Badge */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: TALENT_BLUE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
          transform: `scale(${interpolate(badgeScale, [0, 1], [0, 1])})`,
          boxShadow: "0 16px 48px rgba(0,102,255,0.4)",
        }}
      >
        <span style={{ fontSize: 60, color: "white", fontWeight: 700 }}>T</span>
      </div>

      {/* Title */}
      <AnimatedText
        text="Representante Talent.com"
        fontSize={48}
        fontWeight={700}
        color={TEXT_PRIMARY}
        delay={10}
        animation="slideLeft"
      />
      <div style={{ marginTop: 8 }}>
        <AnimatedText
          text="no Brasil"
          fontSize={48}
          fontWeight={700}
          color={TALENT_BLUE}
          delay={15}
          animation="slideLeft"
        />
      </div>

      {/* Subtitle */}
      <div style={{ marginTop: 30 }}>
        <AnimatedText
          text="Performance para vagas, apps e crescimento"
          fontSize={28}
          fontWeight={500}
          color={TEXT_SECONDARY}
          delay={25}
          animation="fadeIn"
        />
      </div>

      {/* App Cards */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginTop: 50,
          justifyContent: "center",
        }}
      >
        <AppCard icon="📱" label="Apps" delay={40} color="#10b981" />
        <AppCard icon="💼" label="Vagas" delay={50} color="#8b5cf6" />
        <AppCard icon="📈" label="Growth" delay={60} color="#f59e0b" />
        <AppCard icon="🎯" label="Ads" delay={70} color="#ef4444" />
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: CTA Final (11-12s)
const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_LIGHT,
        fontFamily,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 60,
        opacity: fadeOut,
      }}
    >
      {/* Logo smaller */}
      <div
        style={{
          transform: `scale(${interpolate(logoScale, [0, 1], [0.5, 1])})`,
          marginBottom: 50,
        }}
      >
        <Img
          src={staticFile("logo-caracol.jpg")}
          style={{
            width: 160,
            height: 160,
            borderRadius: 30,
            objectFit: "cover",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          }}
        />
      </div>

      {/* CTA Text */}
      <AnimatedText
        text="Quer crescer com dados?"
        fontSize={56}
        fontWeight={700}
        color={TEXT_PRIMARY}
        delay={5}
        animation="flip3D"
      />

      <div style={{ marginTop: 20 }}>
        <AnimatedText
          text="Fale com a Caracol Media"
          fontSize={44}
          fontWeight={600}
          color={HUBSPOT_ORANGE}
          delay={12}
          animation="flip3D"
        />
      </div>

      {/* Website */}
      <div style={{ marginTop: 60 }}>
        <AnimatedText
          text="caracolmedia.com.br"
          fontSize={28}
          fontWeight={500}
          color={TEXT_MUTED}
          delay={20}
          animation="fadeIn"
        />
      </div>
    </AbsoluteFill>
  );
};

// Main Composition - 12 seconds, 30fps, 1080x1920
export const CaracolStories: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG_LIGHT }}>
      {/* Scene 1: 0-3s (frames 0-90) */}
      <Sequence from={0} durationInFrames={3 * fps}>
        <Scene1Intro />
      </Sequence>

      {/* Scene 2: 3-7s (frames 90-210) */}
      <Sequence from={3 * fps} durationInFrames={4 * fps}>
        <Scene2HubSpot />
      </Sequence>

      {/* Scene 3: 7-11s (frames 210-330) */}
      <Sequence from={7 * fps} durationInFrames={4 * fps}>
        <Scene3Talent />
      </Sequence>

      {/* Scene 4: 11-12s (frames 330-360) */}
      <Sequence from={11 * fps} durationInFrames={1 * fps}>
        <Scene4CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
