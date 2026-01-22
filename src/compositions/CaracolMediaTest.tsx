import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const CaracolMediaTest: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a2e",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedText text="Caracol Media test" />
    </AbsoluteFill>
  );
};
