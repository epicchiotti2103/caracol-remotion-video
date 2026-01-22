import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const WORDS = ["PERFORMANCE", "INOVAÇÃO", "VERSATILIDADE"];
const WORD_DURATION = 30; // 1 second each at 30fps

export const Scene2Performance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background camera movement
  const bgScale = interpolate(frame, [0, 90], [1, 1.15], {
    extrapolateRight: "clamp",
  });
  const bgX = interpolate(frame, [0, 90], [0, -30], {
    extrapolateRight: "clamp",
  });
  const bgY = interpolate(frame, [0, 90], [0, -20], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Animated gradient background simulating athlete/action */}
      <div
        style={{
          position: "absolute",
          width: "120%",
          height: "120%",
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(191, 220, 65, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(191, 220, 65, 0.1) 0%, transparent 40%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)
          `,
          transform: `scale(${bgScale}) translate(${bgX}px, ${bgY}px)`,
        }}
      />

      {/* Abstract dynamic shapes */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: 400,
          height: 600,
          background: "linear-gradient(180deg, rgba(191, 220, 65, 0.2), transparent)",
          transform: `rotate(-15deg) translateY(${interpolate(frame, [0, 90], [50, -50])}px)`,
          filter: "blur(60px)",
        }}
      />

      {/* HUD-style decorative elements */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 60,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => {
          const barWidth = interpolate(
            frame - i * 8,
            [0, 15],
            [0, 60 + i * 40],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                height: 4,
                width: barWidth,
                backgroundColor: "#BFDC41",
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Words container */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {WORDS.map((word, index) => {
          const wordStart = index * WORD_DURATION;
          const wordFrame = frame - wordStart;

          // Only show when it's this word's time
          if (wordFrame < 0 || wordFrame > WORD_DURATION + 5) return null;

          const slideIn = spring({
            frame: wordFrame,
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          const slideOut = interpolate(wordFrame, [WORD_DURATION - 8, WORD_DURATION], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          const translateX = interpolate(slideIn, [0, 1], [-150, 0]);
          const exitX = interpolate(slideOut, [0, 1], [0, 100]);
          const blur = interpolate(wordFrame, [0, 8], [15, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const exitBlur = interpolate(slideOut, [0, 1], [0, 10]);
          const opacity = interpolate(slideIn, [0, 1], [0, 1]) * (1 - slideOut);

          return (
            <div
              key={word}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Animated lime bars behind word */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  opacity: opacity * 0.3,
                }}
              >
                {[-1, 1].map((dir) => {
                  const barProgress = spring({
                    frame: wordFrame - 5,
                    fps,
                    config: { damping: 20, stiffness: 100 },
                  });
                  return (
                    <div
                      key={dir}
                      style={{
                        width: interpolate(barProgress, [0, 1], [0, 600]),
                        height: 8,
                        backgroundColor: "#BFDC41",
                        transform: `translateY(${dir * 80}px) translateX(${dir * 50}px)`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Main word */}
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: 90,
                  fontWeight: 900,
                  fontFamily: "Inter, Arial, sans-serif",
                  letterSpacing: 8,
                  margin: 0,
                  transform: `translateX(${translateX + exitX}px)`,
                  filter: `blur(${blur + exitBlur}px)`,
                  opacity,
                  textShadow: "0 0 60px rgba(191, 220, 65, 0.5)",
                }}
              >
                {word}
              </h2>

              {/* Underline accent */}
              <div
                style={{
                  width: interpolate(
                    spring({ frame: wordFrame - 8, fps, config: { damping: 15 } }),
                    [0, 1],
                    [0, 200]
                  ),
                  height: 4,
                  backgroundColor: "#BFDC41",
                  marginTop: 20,
                  opacity,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom HUD elements */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
          opacity: interpolate(frame, [10, 25], [0, 0.5], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            backgroundColor: "#BFDC41",
            borderRadius: "50%",
            boxShadow: "0 0 10px #BFDC41",
          }}
        />
        <span
          style={{
            color: "#666666",
            fontSize: 18,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          All Out Run
        </span>
      </div>
    </AbsoluteFill>
  );
};
