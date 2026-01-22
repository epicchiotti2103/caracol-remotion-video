import { Composition } from "remotion";
import { CaracolStories } from "./CaracolStories";
import { CorporateVideo } from "./CorporateVideo";
import { VIDEO_CONFIG } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* NEW: Corporate Video - Dark Mode, Professional */}
      <Composition
        id="CorporateVideo"
        component={CorporateVideo}
        durationInFrames={VIDEO_CONFIG.totalDuration}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{}}
      />

      {/* LEGACY: Original Caracol Stories (vertical format) */}
      <Composition
        id="CaracolStories"
        component={CaracolStories}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
