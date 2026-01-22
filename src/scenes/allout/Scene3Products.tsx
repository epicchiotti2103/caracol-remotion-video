import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ProductCard } from "../../components/allout/ProductCard";

const PRODUCTS = [
  {
    title: "Legging Feminina Pro",
    originalPrice: "R$ 189,90",
    discountPrice: "R$ 159,90",
    tags: [
      { text: "Best Seller", backgroundColor: "#D9828C", color: "#FFFFFF" },
      { text: "Lançamento", backgroundColor: "#BFDC41", color: "#000000" },
    ],
    features: ["Compressão inteligente", "Tecido respirável", "Bolso lateral"],
    accentColor: "#D9828C",
    delay: 0,
  },
  {
    title: "Shorts Masculino Elite",
    originalPrice: "R$ 149,90",
    discountPrice: "R$ 129,90",
    tags: [
      { text: "Alta Performance", backgroundColor: "#BFDC41", color: "#000000" },
    ],
    features: ["7 bolsos funcionais", "Secagem ultra-rápida", "Anti-odor"],
    accentColor: "#BFDC41",
    delay: 20,
  },
  {
    title: "Regata Training",
    originalPrice: "R$ 99,90",
    discountPrice: "R$ 84,90",
    tags: [
      { text: "Novo", backgroundColor: "#FFFFFF", color: "#000000" },
    ],
    features: ["Corte ergonômico", "Leveza extrema"],
    accentColor: "#BFDC41",
    delay: 40,
  },
];

export const Scene3Products: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene transition - fade in
  const sceneOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Background pulse effect
  const bgPulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.02, 0.08]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        opacity: sceneOpacity,
      }}
    >
      {/* Subtle gradient background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(191, 220, 65, ${bgPulse}) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(217, 130, 140, 0.05) 0%, transparent 40%)
          `,
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            opacity: interpolate(frame, [5, 20], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#BFDC41",
            }}
          />
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 600,
              fontFamily: "Inter, Arial, sans-serif",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Produtos
          </span>
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#BFDC41",
            }}
          />
        </div>
      </div>

      {/* Products container */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          padding: "0 60px",
          display: "flex",
          flexDirection: "column",
          gap: 30,
          alignItems: "center",
        }}
      >
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            originalPrice={product.originalPrice}
            discountPrice={product.discountPrice}
            tags={product.tags}
            features={product.features}
            accentColor={product.accentColor}
            delay={product.delay}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: interpolate(frame, [60, 80], [0, 0.4], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            backgroundColor: "#BFDC41",
            borderRadius: "50%",
          }}
        />
        <span
          style={{
            color: "#666666",
            fontSize: 16,
            fontFamily: "Inter, Arial, sans-serif",
            letterSpacing: 2,
          }}
        >
          SWIPE PARA VER MAIS
        </span>
      </div>
    </AbsoluteFill>
  );
};
