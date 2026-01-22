import { Composition } from "remotion";
import { CaracolStories } from "./compositions/CaracolStories";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaracolStories"
        component={CaracolStories}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
