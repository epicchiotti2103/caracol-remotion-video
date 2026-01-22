import { Composition, Folder } from "remotion";
import { CaracolStories } from "./compositions/CaracolStories";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Caracol-Media">
        {/* CaracolStories: Vertical video for Instagram Stories/Reels */}
        <Composition
          id="CaracolStories"
          component={CaracolStories}
          durationInFrames={390} // 13 seconds at 30fps
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
