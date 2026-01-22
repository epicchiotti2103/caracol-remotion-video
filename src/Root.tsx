import { Composition } from "remotion";
import { CaracolStories } from "./CaracolStories";
import { AllOutStories } from "./AllOutStories";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaracolStories"
        component={CaracolStories}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AllOutStories"
        component={AllOutStories}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
