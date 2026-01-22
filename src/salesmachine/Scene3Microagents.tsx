import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation } from './tokens';

interface AgentCardProps {
  name: string;
  description: string;
  icon: string;
  color: string;
  index: number;
  isActive: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, description, icon, color, index, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = 30 + index * 25;
  const localFrame = frame - delay;

  const cardProgress = spring({
    frame: localFrame,
    fps,
    config: animation.springBouncy,
  });

  const glowIntensity = isActive ? 1 : 0.3;
  const activeScale = isActive ? 1.02 : 1;

  const opacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const translateX = interpolate(cardProgress, [0, 1], [-100, 0]);
  const scale = interpolate(cardProgress, [0, 1], [0.8, activeScale]);

  // Pulse animation when active
  const pulse = isActive ? Math.sin(frame * 0.15) * 0.02 + 1 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px) scale(${scale * pulse})`,
        background: isActive
          ? `linear-gradient(135deg, ${color}15, ${color}08)`
          : colors.bgCard,
        border: `2px solid ${isActive ? color : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 24,
        padding: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        boxShadow: isActive ? `0 0 40px ${color}40` : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: `0 0 ${isActive ? 30 : 0}px ${color}`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Text content */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: typography.body,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color: color,
            margin: 0,
            marginBottom: 8,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontSize: typography.caption,
            fontWeight: typography.weightRegular,
            fontFamily: typography.fontFamily,
            color: colors.textSecondary,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
      </div>

      {/* Status indicator */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: isActive ? color : colors.textMuted,
          opacity: glowIntensity,
          boxShadow: isActive ? `0 0 20px ${color}` : 'none',
        }}
      />
    </div>
  );
};

// Fake Telegram UI
const TelegramMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const messages = [
    { type: 'user', text: '/prospectar saas crm brasil', delay: 60 },
    { type: 'bot', text: '🔍 Buscando empresas...', delay: 90 },
    { type: 'bot', text: '✅ 15 empresas encontradas', delay: 130 },
    { type: 'bot', text: '📝 Copies prontas em 2min', delay: 160 },
  ];

  const mockupProgress = spring({
    frame: frame - 20,
    fps,
    config: animation.springMedium,
  });

  const opacity = interpolate(mockupProgress, [0, 1], [0, 1]);
  const translateY = interpolate(mockupProgress, [0, 1], [50, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        width: '100%',
        maxWidth: 400,
        background: colors.bgSecondary,
        borderRadius: 24,
        border: `1px solid rgba(255,255,255,0.1)`,
        overflow: 'hidden',
        boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: colors.neonBlue,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}
        >
          🤖
        </div>
        <div>
          <div
            style={{
              fontSize: typography.caption,
              fontWeight: typography.weightSemibold,
              color: colors.textPrimary,
              fontFamily: typography.fontFamily,
            }}
          >
            SalesMachine Bot
          </div>
          <div
            style={{
              fontSize: typography.small,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: typography.fontFamily,
            }}
          >
            online
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 200,
        }}
      >
        {messages.map((msg, i) => {
          const msgProgress = spring({
            frame: frame - msg.delay,
            fps,
            config: animation.springFast,
          });

          const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);
          const msgScale = interpolate(msgProgress, [0, 1], [0.8, 1]);

          return (
            <div
              key={i}
              style={{
                opacity: msgOpacity,
                transform: `scale(${msgScale})`,
                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                background: msg.type === 'user' ? colors.neonBlue : colors.bgTertiary,
                padding: '12px 18px',
                borderRadius: 16,
                borderBottomRightRadius: msg.type === 'user' ? 4 : 16,
                borderBottomLeftRadius: msg.type === 'bot' ? 4 : 16,
                maxWidth: '85%',
              }}
            >
              <span
                style={{
                  fontSize: typography.small,
                  fontFamily: msg.type === 'user' ? typography.fontFamilyMono : typography.fontFamily,
                  color: colors.textPrimary,
                }}
              >
                {msg.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Animated pipeline connector
const PipelineConnector: React.FC<{ fromIndex: number; toIndex: number; isActive: boolean }> = ({
  fromIndex,
  toIndex,
  isActive,
}) => {
  const frame = useCurrentFrame();

  const flowProgress = isActive ? (frame % 60) / 60 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: 35,
        top: 140 + fromIndex * 140,
        width: 4,
        height: 60,
        background: isActive ? colors.neonPurple : colors.bgTertiary,
        opacity: 0.5,
      }}
    >
      {/* Flowing dot */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            left: -4,
            top: `${flowProgress * 100}%`,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: colors.neonCyan,
            boxShadow: `0 0 15px ${colors.neonCyan}`,
          }}
        />
      )}
    </div>
  );
};

export const Scene3Microagents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const agents = [
    {
      name: 'Agente Zero',
      description: 'Porteiro inteligente via Telegram',
      icon: '💬',
      color: colors.neonBlue,
    },
    {
      name: 'Discovery',
      description: 'Busca empresas ideais com IA',
      icon: '🔍',
      color: colors.neonCyan,
    },
    {
      name: 'Tech Analyst',
      description: 'Detecta stack e decisores',
      icon: '⚙️',
      color: colors.neonOrange,
    },
    {
      name: 'Copywriter',
      description: 'Gera mensagens personalizadas',
      icon: '✍️',
      color: colors.neonLime,
    },
  ];

  // Calculate which agent is currently "active" based on frame
  const activeIndex = Math.floor((frame - 30) / 50) % 4;

  // Header animation
  const headerProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [-30, 0]);

  // Info badge
  const badgeOpacity = interpolate(frame, [180, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 20%, ${colors.bgSecondary} 0%, ${colors.bgPrimary} 100%)`,
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
            linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 40,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: 'rgba(124, 58, 237, 0.15)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: 100,
            padding: '10px 24px',
            display: 'inline-block',
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: colors.neonPurple,
              fontSize: typography.small,
              fontWeight: typography.weightSemibold,
              fontFamily: typography.fontFamily,
              letterSpacing: typography.trackingWide,
              textTransform: 'uppercase',
            }}
          >
            🧠 Arquitetura
          </span>
        </div>
        <h2
          style={{
            fontSize: typography.displayMedium,
            fontWeight: typography.weightBold,
            fontFamily: typography.fontFamily,
            color: colors.textPrimary,
            margin: 0,
            letterSpacing: typography.trackingTight,
          }}
        >
          Microagentes de IA
        </h2>
      </div>

      {/* Main content: Pipeline + Telegram */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          flex: 1,
          zIndex: 10,
        }}
      >
        {/* Agent pipeline */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            position: 'relative',
          }}
        >
          {/* Connector lines */}
          {[0, 1, 2].map((i) => (
            <PipelineConnector
              key={i}
              fromIndex={i}
              toIndex={i + 1}
              isActive={activeIndex >= i}
            />
          ))}

          {/* Agent cards */}
          {agents.map((agent, i) => (
            <AgentCard
              key={i}
              {...agent}
              index={i}
              isActive={i === activeIndex || frame > 200}
            />
          ))}
        </div>
      </div>

      {/* Telegram mockup */}
      <div
        style={{
          position: 'absolute',
          right: spacing.screenPadding,
          bottom: 280,
          zIndex: 20,
        }}
      >
        <TelegramMockup />
      </div>

      {/* Info badge at bottom */}
      <div
        style={{
          opacity: badgeOpacity,
          position: 'absolute',
          bottom: spacing.screenPadding,
          left: spacing.screenPadding,
          right: spacing.screenPadding,
          background: `linear-gradient(135deg, ${colors.neonCyan}15, ${colors.neonLime}10)`,
          border: `1px solid ${colors.neonCyan}40`,
          borderRadius: 20,
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 32 }}>⚡</span>
        <span
          style={{
            fontSize: typography.body,
            fontWeight: typography.weightSemibold,
            fontFamily: typography.fontFamily,
            color: colors.neonCyan,
          }}
        >
          Do termo de busca à copy pronta em 2–3 minutos
        </span>
      </div>
    </AbsoluteFill>
  );
};
