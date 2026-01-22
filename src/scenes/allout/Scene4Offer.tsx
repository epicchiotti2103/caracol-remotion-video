import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Chip } from "../../components/allout/Chip";

export const Scene4Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transition
  const sceneOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animated review count
  const reviewCount = Math.round(
    interpolate(frame, [30, 60], [0, 192], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  // Stars animation
  const starsOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0d0d",
        opacity: sceneOpacity,
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 50% 50%, rgba(191, 220, 65, 0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 60px",
          gap: 50,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [5, 20], [20, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: 52,
              fontWeight: 800,
              fontFamily: "Inter, Arial, sans-serif",
              letterSpacing: 2,
              margin: 0,
              textAlign: "center",
            }}
          >
            OFERTAS ESPECIAIS
          </h2>
          <div
            style={{
              width: interpolate(
                spring({ frame: frame - 15, fps, config: { damping: 15 } }),
                [0, 1],
                [0, 200]
              ),
              height: 4,
              backgroundColor: "#BFDC41",
              margin: "20px auto 0",
            }}
          />
        </div>

        {/* Offer chips */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 25,
            width: "100%",
            maxWidth: 800,
          }}
        >
          {/* 10x sem juros */}
          <Chip delay={15}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  color: "#BFDC41",
                  fontSize: 64,
                  fontWeight: 900,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                10x
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 600,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                SEM JUROS
              </span>
            </div>
          </Chip>

          {/* 5% OFF PIX */}
          <Chip delay={25} borderColor="#BFDC41">
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  color: "#BFDC41",
                  fontSize: 64,
                  fontWeight: 900,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                5% OFF
              </span>
              <span
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 600,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                NO PIX
              </span>
            </div>
          </Chip>

          {/* Reviews */}
          <Chip delay={35} borderColor="#FFD700">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: 56,
                    fontWeight: 900,
                    fontFamily: "Inter, Arial, sans-serif",
                  }}
                >
                  {reviewCount}
                </span>
                <span
                  style={{
                    color: "#CCCCCC",
                    fontSize: 28,
                    fontWeight: 500,
                    fontFamily: "Inter, Arial, sans-serif",
                  }}
                >
                  avaliações
                </span>
              </div>
              {/* Stars */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  opacity: starsOpacity,
                }}
              >
                {[0, 1, 2, 3, 4].map((i) => {
                  const starScale = spring({
                    frame: frame - 50 - i * 3,
                    fps,
                    config: { damping: 8, stiffness: 200 },
                  });
                  return (
                    <span
                      key={i}
                      style={{
                        fontSize: 36,
                        transform: `scale(${starScale})`,
                      }}
                    >
                      ⭐
                    </span>
                  );
                })}
              </div>
            </div>
          </Chip>
        </div>
      </div>

      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 60,
          width: 60,
          height: 60,
          borderRight: "3px solid #BFDC41",
          borderTop: "3px solid #BFDC41",
          opacity: interpolate(frame, [40, 55], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          width: 60,
          height: 60,
          borderLeft: "3px solid #BFDC41",
          borderBottom: "3px solid #BFDC41",
          opacity: interpolate(frame, [40, 55], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      />
    </AbsoluteFill>
  );
};
