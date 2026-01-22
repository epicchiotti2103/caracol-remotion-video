import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transition
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Logo 3D flip animation
  const logoRotateY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const logoRotation = interpolate(logoRotateY, [0, 1], [90, 0]);
  const logoOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA button spring
  const ctaScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.8 },
  });

  // Social icons stagger
  const socialDelay = 40;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAFAFA",
        opacity: sceneOpacity,
      }}
    >
      {/* Subtle pattern background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(191, 220, 65, 0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(191, 220, 65, 0.08) 0%, transparent 25%)
          `,
        }}
      />

      {/* Main content container */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Logo block */}
        <div
          style={{
            backgroundColor: "#000000",
            padding: "50px 80px",
            borderRadius: 16,
            transform: `perspective(1000px) rotateY(${logoRotation}deg)`,
            opacity: logoOpacity,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: 72,
              fontWeight: 900,
              fontFamily: "Inter, Arial, sans-serif",
              letterSpacing: 8,
              margin: 0,
            }}
          >
            ALLOUT
          </h1>
          <div
            style={{
              width: "100%",
              height: 4,
              backgroundColor: "#BFDC41",
              marginTop: 15,
            }}
          />
        </div>

        {/* CTA Button */}
        <button
          style={{
            marginTop: 50,
            padding: "24px 60px",
            backgroundColor: "#C84A2A",
            color: "#FFFFFF",
            fontSize: 26,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: 2,
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            transform: `scale(${ctaScale})`,
            boxShadow: "0 10px 40px rgba(200, 74, 42, 0.4)",
            textTransform: "uppercase",
          }}
        >
          Explore Off Season
        </button>

        {/* Tagline */}
        <p
          style={{
            marginTop: 30,
            color: "#666666",
            fontSize: 20,
            fontWeight: 500,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: 3,
            opacity: interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          PERFORMANCE • INOVAÇÃO • VERSATILIDADE
        </p>
      </div>

      {/* WhatsApp bubble - bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame - socialDelay, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          transform: `translateY(${interpolate(frame - socialDelay, [0, 15], [20, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          })}px)`,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: "#25D366",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <span
          style={{
            color: "#333333",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "Inter, Arial, sans-serif",
          }}
        >
          Fale Conosco
        </span>
      </div>

      {/* Social icons - bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          display: "flex",
          gap: 20,
        }}
      >
        {/* Instagram */}
        <SocialIcon
          delay={socialDelay + 5}
          frame={frame}
          fps={fps}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          }
        />
        {/* TikTok */}
        <SocialIcon
          delay={socialDelay + 10}
          frame={frame}
          fps={fps}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
            </svg>
          }
        />
        {/* YouTube */}
        <SocialIcon
          delay={socialDelay + 15}
          frame={frame}
          fps={fps}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#333333">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          }
        />
      </div>
    </AbsoluteFill>
  );
};

// Social Icon component
interface SocialIconProps {
  icon: React.ReactNode;
  delay: number;
  frame: number;
  fps: number;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, delay, frame, fps }) => {
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const translateY = interpolate(frame - delay, [0, 12], [15, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        backgroundColor: "#F0F0F0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {icon}
    </div>
  );
};
