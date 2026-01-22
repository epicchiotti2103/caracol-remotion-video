import { AbsoluteFill, Sequence } from "remotion";
import { Scene1IntroHook } from "./scenes/corporate/Scene1IntroHook";
import { Scene2CoreBusiness } from "./scenes/corporate/Scene2CoreBusiness";
import { Scene3MethodReach } from "./scenes/corporate/Scene3MethodReach";
import { Scene4ResultsCTA } from "./scenes/corporate/Scene4ResultsCTA";
import { COLORS, VIDEO_CONFIG } from "./theme";

/**
 * CARACOL MEDIA - Corporate Video
 *
 * Vídeo institucional dinâmico e moderno, "dark mode first"
 * Duração: ~30 segundos (900 frames @ 30fps)
 * Resolução: 1920x1080 (Full HD Landscape)
 *
 * ESTRUTURA DE CENAS:
 * Scene 1: Intro & Hook (0-5s / frames 0-150)
 *   - Logo aparece no canto superior esquerdo
 *   - Headline com "crescimento" destacado em Lime
 *   - Fundo dark com padrão de folhas sutil
 *
 * Scene 2: Core Business (5-12s / frames 150-360)
 *   - Badge "NOSSOS CORE BUSINESS"
 *   - 3 cards: Growth Marketing, Job Advertising, DOOH
 *   - Transição slide da direita
 *
 * Scene 3: Method & Reach (12-22s / frames 360-660)
 *   - Método Caracol: 3 passos conectados por chevrons
 *   - Transição para seção LATAM com globo
 *   - Fundo Azul Marinho com linhas douradas
 *
 * Scene 4: Results & CTA (22-30s / frames 660-900)
 *   - "Performance real em territórios digitais"
 *   - CTA pulsante: "AGENDAR DIAGNÓSTICO GRATUITO"
 *   - Logo final com tagline
 */

export const CorporateVideo: React.FC = () => {
  const { scenes } = VIDEO_CONFIG;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Scene 1: Intro & Hook (0-5s) */}
      <Sequence
        from={scenes.scene1.start}
        durationInFrames={scenes.scene1.duration}
      >
        <Scene1IntroHook />
      </Sequence>

      {/* Scene 2: Core Business (5-12s) */}
      <Sequence
        from={scenes.scene2.start}
        durationInFrames={scenes.scene2.duration}
      >
        <Scene2CoreBusiness />
      </Sequence>

      {/* Scene 3: Method & Reach (12-22s) */}
      <Sequence
        from={scenes.scene3.start}
        durationInFrames={scenes.scene3.duration}
      >
        <Scene3MethodReach />
      </Sequence>

      {/* Scene 4: Results & CTA Outro (22-30s) */}
      <Sequence
        from={scenes.scene4.start}
        durationInFrames={scenes.scene4.duration}
      >
        <Scene4ResultsCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
