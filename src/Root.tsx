import { Composition } from "remotion";
import { CaracolMediaTest } from "./compositions/CaracolMediaTest";

// Video configuration constants
const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInSeconds: 5,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaracolMediaTest"
        component={CaracolMediaTest}
        durationInFrames={VIDEO_CONFIG.fps * VIDEO_CONFIG.durationInSeconds}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
    </>
  );
};
