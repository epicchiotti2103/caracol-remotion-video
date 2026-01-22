import { Composition } from "remotion";
import { CaracolStories } from "./CaracolStories";
import { SalesMachineIntro } from "./SalesMachineIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Caracol Media Stories - Original composition */}
      <Composition
        id="CaracolStories"
        component={CaracolStories}
        durationInFrames={330}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* SalesMachine v4.0+ Product Video */}
      <Composition
        id="SalesMachineIntro"
        component={SalesMachineIntro}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
