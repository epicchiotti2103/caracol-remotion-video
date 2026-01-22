import { AbsoluteFill, Sequence } from "remotion";
import { Scene1Impact } from "./scenes/allout/Scene1Impact";
import { Scene2Performance } from "./scenes/allout/Scene2Performance";
import { Scene3Products } from "./scenes/allout/Scene3Products";
import { Scene4Offer } from "./scenes/allout/Scene4Offer";
import { Scene5CTA } from "./scenes/allout/Scene5CTA";

/**
 * ALL OUT RUN - Premium Sports Brand Video
 *
 * Timing configuration (30fps, 14s total = 420 frames):
 *
 * Scene 1 - Impact:      0-60 frames   (0-2s)    Brand reveal with lime trace
 * Scene 2 - Performance: 60-150 frames (2-5s)    Performance pillars animation
 * Scene 3 - Products:    150-270 frames (5-9s)   Product cards showcase
 * Scene 4 - Offer:       270-360 frames (9-12s)  Offers and social proof
 * Scene 5 - CTA:         360-420 frames (12-14s) Final call-to-action
 *
 * Color Palette:
 * - Primary: Black (#000000), White/Off-white (#FFFFFF/#FAFAFA)
 * - Accent: Lime (#BFDC41)
 * - Highlight: Pink/Coral (#D9828C), Orange/Red (#C84A2A), WhatsApp Green (#25D366)
 */

export const AllOutStories: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Scene 1: Impact - Brand reveal with dramatic lime trace */}
      <Sequence from={0} durationInFrames={60}>
        <Scene1Impact />
      </Sequence>

      {/* Scene 2: Performance - Animated pillars (Performance, Inovação, Versatilidade) */}
      <Sequence from={60} durationInFrames={90}>
        <Scene2Performance />
      </Sequence>

      {/* Scene 3: Products - Product cards with stagger animation */}
      <Sequence from={150} durationInFrames={120}>
        <Scene3Products />
      </Sequence>

      {/* Scene 4: Offer - Social proof and payment options */}
      <Sequence from={270} durationInFrames={90}>
        <Scene4Offer />
      </Sequence>

      {/* Scene 5: CTA - Final call-to-action with social links */}
      <Sequence from={360} durationInFrames={60}>
        <Scene5CTA />
      </Sequence>
    </AbsoluteFill>
  );
};
