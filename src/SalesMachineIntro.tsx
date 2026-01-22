import React from 'react';
import { Sequence, AbsoluteFill } from 'remotion';
import { Scene1Hook } from './salesmachine/Scene1Hook';
import { Scene2Intro } from './salesmachine/Scene2Intro';
import { Scene3Microagents } from './salesmachine/Scene3Microagents';
import { Scene4Matrix } from './salesmachine/Scene4Matrix';
import { Scene5Omnichannel } from './salesmachine/Scene5Omnichannel';
import { Scene6StackCTA } from './salesmachine/Scene6StackCTA';
import { colors } from './salesmachine/tokens';

/**
 * SalesMachine v4.0+ Product Video
 *
 * Total duration: 1200 frames @ 30fps = 40 seconds
 *
 * Scene breakdown:
 * - Scene 1 (Hook/Problem):     0-180 frames   (0-6s)
 * - Scene 2 (Intro/Logo):       180-300 frames (6-10s)
 * - Scene 3 (Microagents):      300-540 frames (10-18s)
 * - Scene 4 (Matrix/Intel):     540-720 frames (18-24s)
 * - Scene 5 (Omnichannel):      720-960 frames (24-32s)
 * - Scene 6 (Stack/CTA):        960-1200 frames (32-40s)
 */

export const SalesMachineIntro: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: colors.bgPrimary,
      }}
    >
      {/* Scene 1: Hook - The Problem (0-6s) */}
      <Sequence from={0} durationInFrames={180} name="Scene 1 - Hook">
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Introduction - SalesMachine v4.0+ (6-10s) */}
      <Sequence from={180} durationInFrames={120} name="Scene 2 - Intro">
        <Scene2Intro />
      </Sequence>

      {/* Scene 3: Microagents in Action (10-18s) */}
      <Sequence from={300} durationInFrames={240} name="Scene 3 - Microagents">
        <Scene3Microagents />
      </Sequence>

      {/* Scene 4: Intelligence & Tone Matrix (18-24s) */}
      <Sequence from={540} durationInFrames={180} name="Scene 4 - Matrix">
        <Scene4Matrix />
      </Sequence>

      {/* Scene 5: Omnichannel & Real-time Flow (24-32s) */}
      <Sequence from={720} durationInFrames={240} name="Scene 5 - Omnichannel">
        <Scene5Omnichannel />
      </Sequence>

      {/* Scene 6: Tech Stack & CTA (32-40s) */}
      <Sequence from={960} durationInFrames={240} name="Scene 6 - Stack & CTA">
        <Scene6StackCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

export default SalesMachineIntro;
