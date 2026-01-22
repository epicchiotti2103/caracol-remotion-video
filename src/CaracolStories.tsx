import { AbsoluteFill, Sequence } from "remotion";
import { Scene1HeroIntro } from "./scenes/Scene1HeroIntro";
import { Scene2HubSpotPartner } from "./scenes/Scene2HubSpotPartner";
import { Scene3TalentCom } from "./scenes/Scene3TalentCom";
import { Scene4CTAFinal } from "./scenes/Scene4CTAFinal";

// Timing configuration (30fps)
// Scene 1: 0-60 frames (2s)
// Scene 2: 60-165 frames (3.5s)
// Scene 3: 165-270 frames (3.5s)
// Scene 4: 270-330 frames (2s)
// Total: 330 frames (11s)

export const CaracolStories: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      <Sequence from={0} durationInFrames={60}>
        <Scene1HeroIntro />
      </Sequence>

      <Sequence from={60} durationInFrames={105}>
        <Scene2HubSpotPartner />
      </Sequence>

      <Sequence from={165} durationInFrames={105}>
        <Scene3TalentCom />
      </Sequence>

      <Sequence from={270} durationInFrames={60}>
        <Scene4CTAFinal />
      </Sequence>
    </AbsoluteFill>
  );
};
