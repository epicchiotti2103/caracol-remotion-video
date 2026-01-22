import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Tag } from "./Tag";

interface ProductCardProps {
  title: string;
  originalPrice: string;
  discountPrice: string;
  tags: { text: string; color?: string; backgroundColor?: string }[];
  features: string[];
  accentColor?: string;
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  originalPrice,
  discountPrice,
  tags,
  features,
  accentColor = "#BFDC41",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const translateX = interpolate(slideIn, [0, 1], [100, 0]);

  // Price animation
  const priceFrame = frame - delay - 15;
  const strikeWidth = interpolate(priceFrame, [0, 10], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const newPriceOpacity = interpolate(priceFrame, [8, 18], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const newPriceScale = spring({
    frame: priceFrame - 8,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  return (
    <div
      style={{
        width: 900,
        backgroundColor: "#1a1a1a",
        borderRadius: 20,
        padding: 30,
        transform: `translateX(${translateX}px)`,
        opacity,
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      {/* Tags row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {tags.map((tag, i) => (
          <Tag
            key={i}
            text={tag.text}
            color={tag.color}
            backgroundColor={tag.backgroundColor}
            delay={delay + 10 + i * 5}
          />
        ))}
      </div>

      {/* Title */}
      <h3
        style={{
          color: "#FFFFFF",
          fontSize: 36,
          fontWeight: 700,
          fontFamily: "Inter, Arial, sans-serif",
          margin: "0 0 20px 0",
        }}
      >
        {title}
      </h3>

      {/* Price section */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              color: "#666666",
              fontSize: 28,
              fontFamily: "Inter, Arial, sans-serif",
              textDecoration: "none",
            }}
          >
            {originalPrice}
          </span>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: 3,
              width: `${strikeWidth}%`,
              backgroundColor: "#C84A2A",
              transform: "translateY(-50%)",
            }}
          />
        </div>
        <span
          style={{
            color: accentColor,
            fontSize: 42,
            fontWeight: 800,
            fontFamily: "Inter, Arial, sans-serif",
            opacity: newPriceOpacity,
            transform: `scale(${newPriceScale})`,
          }}
        >
          {discountPrice}
        </span>
      </div>

      {/* Features */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {features.map((feature, i) => {
          const featureOpacity = interpolate(
            frame - delay - 25 - i * 5,
            [0, 8],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );
          const featureX = interpolate(
            frame - delay - 25 - i * 5,
            [0, 8],
            [20, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: featureOpacity,
                transform: `translateX(${featureX}px)`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: accentColor,
                  borderRadius: "50%",
                }}
              />
              <span
                style={{
                  color: "#CCCCCC",
                  fontSize: 22,
                  fontFamily: "Inter, Arial, sans-serif",
                }}
              >
                {feature}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
