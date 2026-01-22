import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import {
  Scene1Intro,
  Scene2Story,
  Scene3Details,
  Scene4RSVP,
  Scene5Pix,
  Scene6Outro,
  colors,
} from './casamento-fabio-patty';

/**
 * Vídeo-convite para o casamento de Fabio & Patty
 *
 * Especificações:
 * - Dimensões: 1080x1920 (vertical, stories/reels friendly)
 * - FPS: 30
 * - Duração total: 35 segundos (1050 frames)
 *
 * Estrutura de cenas:
 * - Cena 1 (Intro): 0-180 frames (0-6s) - Abertura poética com pétalas
 * - Cena 2 (Story): 180-390 frames (6-13s) - Nossa história em 3 frases
 * - Cena 3 (Details): 390-570 frames (13-19s) - Detalhes do evento
 * - Cena 4 (RSVP): 570-720 frames (19-24s) - Confirmação de presença
 * - Cena 5 (Pix): 720-870 frames (24-29s) - Presentes / PIX
 * - Cena 6 (Outro): 870-1050 frames (29-35s) - Encerramento
 */

// Configuração de timing das cenas (em frames, 30fps)
const SCENE_TIMING = {
  scene1: { from: 0, duration: 180 },      // 6 segundos
  scene2: { from: 180, duration: 210 },    // 7 segundos
  scene3: { from: 390, duration: 180 },    // 6 segundos
  scene4: { from: 570, duration: 150 },    // 5 segundos
  scene5: { from: 720, duration: 150 },    // 5 segundos
  scene6: { from: 870, duration: 180 },    // 6 segundos
};

// Duração total: 1050 frames = 35 segundos
export const TOTAL_DURATION = 1050;

export const CasamentoFabioPattyInvite: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgLight }}>
      {/* Cena 1 - Abertura Poética (Love Story) */}
      <Sequence
        from={SCENE_TIMING.scene1.from}
        durationInFrames={SCENE_TIMING.scene1.duration}
        name="Scene 1 - Intro"
      >
        <Scene1Intro />
      </Sequence>

      {/* Cena 2 - Nossa História */}
      <Sequence
        from={SCENE_TIMING.scene2.from}
        durationInFrames={SCENE_TIMING.scene2.duration}
        name="Scene 2 - Story"
      >
        <Scene2Story />
      </Sequence>

      {/* Cena 3 - Detalhes do Grande Dia */}
      <Sequence
        from={SCENE_TIMING.scene3.from}
        durationInFrames={SCENE_TIMING.scene3.duration}
        name="Scene 3 - Details"
      >
        <Scene3Details />
      </Sequence>

      {/* Cena 4 - Confirmação de Presença (RSVP) */}
      <Sequence
        from={SCENE_TIMING.scene4.from}
        durationInFrames={SCENE_TIMING.scene4.duration}
        name="Scene 4 - RSVP"
      >
        <Scene4RSVP />
      </Sequence>

      {/* Cena 5 - Presentes / PIX */}
      <Sequence
        from={SCENE_TIMING.scene5.from}
        durationInFrames={SCENE_TIMING.scene5.duration}
        name="Scene 5 - Pix"
      >
        <Scene5Pix />
      </Sequence>

      {/* Cena 6 - Encerramento & Convite */}
      <Sequence
        from={SCENE_TIMING.scene6.from}
        durationInFrames={SCENE_TIMING.scene6.duration}
        name="Scene 6 - Outro"
      >
        <Scene6Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

export default CasamentoFabioPattyInvite;
