import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

// Channel card with messages
interface ChannelProps {
  name: string;
  icon: string;
  color: string;
  messages: string[];
  index: number;
}

const ChannelCard: React.FC<ChannelProps> = ({ name, icon, color, messages, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 20 + index * 30;
  const cardProgress = spring({
    frame: frame - delay,
    fps,
    config: animation.springBouncy,
  });

  const opacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const translateY = interpolate(cardProgress, [0, 1], [80, 0]);
  const scale = interpolate(cardProgress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: colors.bgCard,
        border: `1px solid ${color}30`,
        borderRadius: 24,
        overflow: 'hidden',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Channel header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          borderBottom: `1px solid ${color}20`,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `${color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: typography.body,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color,
          }}
        >
          {name}
        </span>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          flex: 1,
        }}
      >
        {messages.map((msg, i) => {
          const msgDelay = delay + 40 + i * 20;
          const msgProgress = spring({
            frame: frame - msgDelay,
            fps,
            config: animation.springFast,
          });

          const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);
          const msgScale = interpolate(msgProgress, [0, 1], [0.9, 1]);

          return (
            <div
              key={i}
              style={{
                opacity: msgOpacity,
                transform: `scale(${msgScale})`,
                background: colors.bgSecondary,
                borderRadius: 14,
                padding: 14,
                borderLeft: `3px solid ${color}`,
              }}
            >
              <p
                style={{
                  fontSize: typography.small,
                  fontFamily: typography.fontFamily,
                  color: colors.textSecondary,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {msg}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Timeline step component
interface TimelineStepProps {
  label: string;
  icon: string;
  index: number;
  total: number;
  isLast?: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ label, icon, index, total, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 120 + index * 20;
  const stepProgress = spring({
    frame: frame - delay,
    fps,
    config: animation.springMedium,
  });

  const opacity = interpolate(stepProgress, [0, 1], [0, 1]);
  const scale = interpolate(stepProgress, [0, 1], [0.6, 1]);

  // Arrow animation
  const arrowProgress = spring({
    frame: frame - delay - 10,
    fps,
    config: animation.springFast,
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Step circle */}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.neonCyan}30, ${colors.neonPurple}20)`,
            border: `2px solid ${colors.neonCyan}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            boxShadow: `0 0 20px ${colors.neonCyan}40`,
          }}
        >
          {icon}
        </div>
        <span
          style={{
            fontSize: typography.small - 2,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            textAlign: 'center',
            maxWidth: 90,
          }}
        >
          {label}
        </span>
      </div>

      {/* Arrow */}
      {!isLast && (
        <div
          style={{
            opacity: interpolate(arrowProgress, [0, 1], [0, 0.6]),
            width: interpolate(arrowProgress, [0, 1], [0, 30]),
            height: 2,
            background: colors.neonCyan,
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 30,
          }}
        />
      )}
    </div>
  );
};

// Progress bar
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({
    frame: frame - 160,
    fps,
    config: { ...animation.springSmooth, stiffness: 40 },
  });

  const width = interpolate(barProgress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        width: '100%',
        height: 8,
        background: colors.bgTertiary,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: `${width}%`,
          height: '100%',
          background: colors.gradientCyanLime,
          borderRadius: 4,
          boxShadow: `0 0 20px ${colors.neonCyan}60`,
        }}
      />

      {/* Shimmer effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `${(frame % 60) * 3 - 50}%`,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          opacity: width > 80 ? 1 : 0,
        }}
      />
    </div>
  );
};

export const Scene5Omnichannel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  // Channel data
  const channels: ChannelProps[] = [
    {
      name: 'E-mail',
      icon: '📧',
      color: colors.neonBlue,
      messages: [
        'Assunto direto focado em resultado',
        'Personalizado com stack detectada',
      ],
      index: 0,
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: colors.neonCyan,
      messages: [
        'Tom profissional e consultivo',
        'Menção a conexões em comum',
      ],
      index: 1,
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      color: colors.neonLime,
      messages: [
        'Mensagem curta e objetiva',
        'CTA claro para ação rápida',
      ],
      index: 2,
    },
  ];

  // Timeline steps
  const timelineSteps = [
    { label: 'Busca & Filtro', icon: '🔍' },
    { label: 'Análise Técnica', icon: '⚙️' },
    { label: 'Decisores', icon: '👤' },
    { label: 'Copies Prontas', icon: '✍️' },
  ];

  // Badge opacity for final message
  const finalBadgeOpacity = interpolate(frame, [190, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 60%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 100%)`,
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
            linear-gradient(rgba(6, 182, 212, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: 100,
            padding: '10px 24px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: colors.neonCyan,
              fontSize: typography.small,
              fontWeight: typography.weightSemibold,
              fontFamily: typography.fontFamily,
              letterSpacing: typography.trackingWide,
              textTransform: 'uppercase',
            }}
          >
            🌐 Alcance
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
          Omnichannel
        </h2>
        <p
          style={{
            fontSize: typography.caption,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            marginTop: 8,
          }}
        >
          Cada canal, uma abordagem perfeita
        </p>
      </div>

      {/* Channels grid */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          flex: 1,
          zIndex: 10,
          maxHeight: 480,
        }}
      >
        {channels.map((channel) => (
          <ChannelCard key={channel.name} {...channel} />
        ))}
      </div>

      {/* Timeline */}
      <div
        style={{
          marginTop: 40,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            marginBottom: 24,
          }}
        >
          {timelineSteps.map((step, i) => (
            <TimelineStep
              key={i}
              label={step.label}
              icon={step.icon}
              index={i}
              total={timelineSteps.length}
              isLast={i === timelineSteps.length - 1}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ padding: '0 20px' }}>
          <ProgressBar />
        </div>
      </div>

      {/* Final speed badge */}
      <div
        style={{
          opacity: finalBadgeOpacity,
          marginTop: 30,
          background: `linear-gradient(135deg, ${colors.neonLime}15, ${colors.neonCyan}10)`,
          border: `1px solid ${colors.neonLime}40`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 36 }}>🚀</span>
        <div>
          <span
            style={{
              fontSize: typography.body,
              fontWeight: typography.weightBold,
              fontFamily: typography.fontFamily,
              color: colors.neonLime,
            }}
          >
            De busca à copy pronta em minutos
          </span>
          <div
            style={{
              fontSize: typography.caption,
              fontFamily: typography.fontFamily,
              color: colors.textSecondary,
              marginTop: 4,
            }}
          >
            Tempo médio: 2–3 minutos por lote
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
