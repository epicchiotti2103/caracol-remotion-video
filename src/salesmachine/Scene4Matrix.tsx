import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Quadrant label component
interface QuadrantProps {
  label: string;
  x: number;
  y: number;
  color: string;
  delay: number;
}

const Quadrant: React.FC<QuadrantProps> = ({ label, x, y, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springMedium,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.7, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `scale(${scale})`,
        background: `${color}15`,
        border: `1px solid ${color}40`,
        borderRadius: 16,
        padding: '14px 20px',
        textAlign: 'center',
      }}
    >
      <span
        style={{
          fontSize: typography.caption,
          fontWeight: typography.weightSemibold,
          fontFamily: typography.fontFamily,
          color,
        }}
      >
        {label}
      </span>
    </div>
  );
};

// Lead dot that appears in quadrants
interface LeadDotProps {
  x: number;
  y: number;
  delay: number;
  color: string;
}

const LeadDot: React.FC<LeadDotProps> = ({ x, y, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springBouncy,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0, 1]);

  // Pulse effect
  const pulse = Math.sin(frame * 0.1) * 0.15 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - 10,
        top: y - 10,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: color,
        opacity,
        transform: `scale(${scale * pulse})`,
        boxShadow: `0 0 20px ${color}`,
      }}
    />
  );
};

// Copy bubble that shows example message
interface CopyBubbleProps {
  text: string;
  x: number;
  y: number;
  delay: number;
  color: string;
}

const CopyBubble: React.FC<CopyBubbleProps> = ({ text, x, y, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springFast,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `translateY(${translateY}px)`,
        background: colors.bgTertiary,
        border: `1px solid ${color}40`,
        borderRadius: 12,
        padding: '10px 16px',
        maxWidth: 250,
      }}
    >
      <span
        style={{
          fontSize: typography.small,
          fontFamily: typography.fontFamily,
          color: colors.textSecondary,
          fontStyle: 'italic',
        }}
      >
        "{text}"
      </span>
    </div>
  );
};

// Tech detection list
const TechList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const techs = [
    { name: 'RD Station', icon: '📊' },
    { name: 'HubSpot', icon: '🟠' },
    { name: 'Salesforce', icon: '☁️' },
    { name: 'Pipedrive', icon: '📈' },
    { name: 'Intercom', icon: '💬' },
  ];

  const containerProgress = spring({
    frame: frame - 40,
    fps,
    config: animation.springMedium,
  });

  return (
    <div
      style={{
        opacity: interpolate(containerProgress, [0, 1], [0, 1]),
        transform: `translateX(${interpolate(containerProgress, [0, 1], [50, 0])}px)`,
        background: colors.bgCard,
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: 20,
        padding: 20,
      }}
    >
      <div
        style={{
          fontSize: typography.small,
          fontWeight: typography.weightSemibold,
          fontFamily: typography.fontFamily,
          color: colors.neonOrange,
          marginBottom: 16,
          textTransform: 'uppercase',
          letterSpacing: typography.trackingWide,
        }}
      >
        ⚡ Stacks Detectadas
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {techs.map((tech, i) => {
          const itemProgress = spring({
            frame: frame - 60 - i * 10,
            fps,
            config: animation.springFast,
          });

          const slideX = interpolate(itemProgress, [0, 1], [30, 0]);
          const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${slideX}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 14px',
                background: colors.bgSecondary,
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 18 }}>{tech.icon}</span>
              <span
                style={{
                  fontSize: typography.small,
                  fontFamily: typography.fontFamily,
                  color: colors.textPrimary,
                }}
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Scene4Matrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  // Matrix axes animation
  const axesProgress = spring({
    frame: frame - 15,
    fps,
    config: animation.springSmooth,
  });

  // Quadrant data
  const quadrants = [
    { label: 'Direto & Ágil', x: 80, y: 220, color: colors.neonCyan },
    { label: 'Pragmático', x: 380, y: 220, color: colors.neonLime },
    { label: 'Consultivo', x: 80, y: 420, color: colors.neonOrange },
    { label: 'Formal & ROI', x: 380, y: 420, color: colors.neonPink },
  ];

  // Lead dots
  const leadDots = [
    { x: 150, y: 280, delay: 80, color: colors.neonCyan },
    { x: 200, y: 300, delay: 95, color: colors.neonCyan },
    { x: 450, y: 260, delay: 110, color: colors.neonLime },
    { x: 180, y: 480, delay: 125, color: colors.neonOrange },
    { x: 420, y: 450, delay: 140, color: colors.neonPink },
    { x: 480, y: 490, delay: 155, color: colors.neonPink },
  ];

  // Copy bubbles
  const copyBubbles = [
    { text: 'Vamos aumentar seus trials sem inflar CAC.', x: 180, y: 310, delay: 100, color: colors.neonCyan },
    { text: 'ROI comprovado em 90 dias.', x: 380, y: 500, delay: 160, color: colors.neonPink },
  ];

  // Matrix dimensions
  const matrixWidth = 580;
  const matrixHeight = 400;
  const matrixX = 60;
  const matrixY = 180;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        padding: spacing.screenPadding,
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: interpolate(headerProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(headerProgress, [0, 1], [-30, 0])}px)`,
          marginBottom: 30,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 100,
            padding: '10px 24px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: colors.neonOrange,
              fontSize: typography.small,
              fontWeight: typography.weightSemibold,
              fontFamily: typography.fontFamily,
              letterSpacing: typography.trackingWide,
              textTransform: 'uppercase',
            }}
          >
            📊 Inteligência
          </span>
        </div>
        <h2
          style={{
            fontSize: typography.headline,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
            margin: 0,
            letterSpacing: typography.trackingTight,
          }}
        >
          Matriz de Tom
        </h2>
        <p
          style={{
            fontSize: typography.caption,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Comunicação adaptada por perfil
        </p>
      </div>

      {/* Matrix container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Axes */}
        <svg
          width={matrixWidth + 100}
          height={matrixHeight + 100}
          style={{
            position: 'absolute',
            left: matrixX - 50,
            top: matrixY - 50,
            opacity: interpolate(axesProgress, [0, 1], [0, 1]),
          }}
        >
          {/* X axis */}
          <line
            x1={50}
            y1={matrixHeight + 25}
            x2={50 + matrixWidth * interpolate(axesProgress, [0, 1], [0, 1])}
            y2={matrixHeight + 25}
            stroke={colors.textMuted}
            strokeWidth={2}
          />
          {/* Y axis */}
          <line
            x1={50}
            y1={matrixHeight + 25}
            x2={50}
            y2={matrixHeight + 25 - matrixHeight * interpolate(axesProgress, [0, 1], [0, 1])}
            stroke={colors.textMuted}
            strokeWidth={2}
          />

          {/* X label */}
          <text
            x={matrixWidth / 2 + 50}
            y={matrixHeight + 70}
            fill={colors.textSecondary}
            fontSize={typography.small}
            fontFamily={typography.fontFamily}
            textAnchor="middle"
            opacity={interpolate(axesProgress, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          >
            Maturidade da Empresa →
          </text>

          {/* Y label */}
          <text
            x={20}
            y={matrixHeight / 2 + 25}
            fill={colors.textSecondary}
            fontSize={typography.small}
            fontFamily={typography.fontFamily}
            textAnchor="middle"
            transform={`rotate(-90, 20, ${matrixHeight / 2 + 25})`}
            opacity={interpolate(axesProgress, [0.5, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
          >
            Senioridade →
          </text>

          {/* Grid lines */}
          <line
            x1={50 + matrixWidth / 2}
            y1={25}
            x2={50 + matrixWidth / 2}
            y2={matrixHeight + 25}
            stroke={colors.textMuted}
            strokeWidth={1}
            strokeDasharray="5,5"
            opacity={0.3}
          />
          <line
            x1={50}
            y1={matrixHeight / 2 + 25}
            x2={matrixWidth + 50}
            y2={matrixHeight / 2 + 25}
            stroke={colors.textMuted}
            strokeWidth={1}
            strokeDasharray="5,5"
            opacity={0.3}
          />
        </svg>

        {/* Quadrant labels */}
        {quadrants.map((q, i) => (
          <Quadrant
            key={i}
            label={q.label}
            x={q.x}
            y={q.y}
            color={q.color}
            delay={30 + i * 15}
          />
        ))}

        {/* Lead dots */}
        {leadDots.map((dot, i) => (
          <LeadDot key={i} {...dot} />
        ))}

        {/* Copy bubbles */}
        {copyBubbles.map((bubble, i) => (
          <CopyBubble key={i} {...bubble} />
        ))}
      </div>

      {/* Tech detection sidebar */}
      <div
        style={{
          position: 'absolute',
          right: spacing.screenPadding,
          top: 650,
          zIndex: 20,
        }}
      >
        <TechList />
      </div>

      {/* Bottom insight */}
      <div
        style={{
          position: 'absolute',
          bottom: spacing.screenPadding,
          left: spacing.screenPadding,
          right: spacing.screenPadding,
          opacity: interpolate(frame, [140, 160], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          background: `linear-gradient(135deg, ${colors.neonPurple}10, ${colors.neonOrange}08)`,
          border: `1px solid ${colors.neonPurple}30`,
          borderRadius: 20,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: typography.body,
            fontWeight: typography.weightMedium,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
          }}
        >
          💡 Cada lead recebe a copy perfeita para seu perfil
        </span>
      </div>
    </AbsoluteFill>
  );
};
