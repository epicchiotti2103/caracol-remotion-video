import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation, eventInfo } from './tokens';

// Ícone de check/confirmação
const CheckIcon: React.FC<{ color: string; size: number; progress: number }> = ({ color, size, progress }) => {
  const strokeDasharray = 30;
  const strokeDashoffset = interpolate(progress, [0, 1], [strokeDasharray, 0]);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" opacity={0.3} />
      <path
        d="M8 12L11 15L16 9"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
};

// Ícone do WhatsApp
const WhatsAppIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
  </svg>
);

// Ícone de link
const LinkIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Scene4RSVP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animações
  const titleProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  const cardProgress = spring({
    frame: frame - 15,
    fps,
    config: animation.springGentle,
  });

  const dateProgress = spring({
    frame: frame - 30,
    fps,
    config: animation.springDelicate,
  });

  const linkProgress = spring({
    frame: frame - 50,
    fps,
    config: animation.springMedium,
  });

  const contactProgress = spring({
    frame: frame - 70,
    fps,
    config: animation.springGentle,
  });

  // Animação do check
  const checkProgress = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse animado para o botão
  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: colors.gradientLavender,
      }}
    >
      {/* Padrão decorativo de fundo */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 20% 30%, ${colors.yellowLight}15 0%, transparent 30%),
                       radial-gradient(circle at 80% 70%, ${colors.lavenderSoft}25 0%, transparent 30%)`,
        }}
      />

      {/* Container principal */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: spacing.screenPadding,
        }}
      >
        {/* Ícone de check grande */}
        <div
          style={{
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(titleProgress, [0, 1], [0.5, 1])})`,
            marginBottom: spacing.itemGap,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.yellowLight} 0%, ${colors.yellowGold} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 15px 40px ${colors.yellowGold}40`,
            }}
          >
            <CheckIcon color={colors.brownDark} size={50} progress={checkProgress} />
          </div>
        </div>

        {/* Título */}
        <h2
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.headline,
            fontWeight: typography.weightMedium,
            color: colors.textPrimary,
            textAlign: 'center',
            margin: 0,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Confirme sua presença
        </h2>

        {/* Data limite */}
        <div
          style={{
            opacity: interpolate(dateProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(dateProgress, [0, 1], [15, 0])}px)`,
            marginTop: spacing.smallGap,
            marginBottom: spacing.sectionGap,
          }}
        >
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.body,
              fontWeight: typography.weightRegular,
              color: colors.textSecondary,
              textAlign: 'center',
              margin: 0,
            }}
          >
            até <span style={{ color: colors.textAccent, fontWeight: typography.weightSemibold }}>
              {eventInfo.rsvpDate}
            </span>
          </p>
        </div>

        {/* Card de link */}
        <div
          style={{
            background: colors.white,
            borderRadius: 24,
            padding: spacing.cardPadding,
            width: '100%',
            maxWidth: 900,
            boxShadow: `0 20px 50px ${colors.lavenderSoft}30`,
            opacity: interpolate(linkProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(linkProgress, [0, 1], [30, 0])}px) scale(${pulseScale})`,
            marginBottom: spacing.sectionGap,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing.smallGap,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: colors.lavenderMedium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LinkIcon color={colors.purpleDeep} size={28} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: typography.fontSans,
                  fontSize: typography.body,
                  fontWeight: typography.weightSemibold,
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                Link para confirmação
              </p>
              <p
                style={{
                  fontFamily: typography.fontSans,
                  fontSize: typography.caption,
                  fontWeight: typography.weightRegular,
                  color: colors.textSecondary,
                  margin: 0,
                  marginTop: 4,
                }}
              >
                na descrição do vídeo
              </p>
            </div>
          </div>
        </div>

        {/* Contato para dúvidas */}
        <div
          style={{
            opacity: interpolate(contactProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(contactProgress, [0, 1], [20, 0])}px)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.caption,
              fontWeight: typography.weightRegular,
              color: colors.textSecondary,
              margin: 0,
              marginBottom: spacing.smallGap,
            }}
          >
            Em caso de dúvidas, fale com
          </p>

          {/* Card de contato WhatsApp */}
          <div
            style={{
              background: `linear-gradient(135deg, #25D366 0%, #128C7E 100%)`,
              borderRadius: 20,
              padding: `${spacing.smallGap}px ${spacing.itemGap}px`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing.smallGap,
              boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
            }}
          >
            <WhatsAppIcon color={colors.white} size={32} />
            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  fontFamily: typography.fontSans,
                  fontSize: typography.body,
                  fontWeight: typography.weightSemibold,
                  color: colors.white,
                  margin: 0,
                }}
              >
                {eventInfo.contactName}
              </p>
              <p
                style={{
                  fontFamily: typography.fontSans,
                  fontSize: typography.caption,
                  fontWeight: typography.weightMedium,
                  color: 'rgba(255,255,255,0.9)',
                  margin: 0,
                }}
              >
                {eventInfo.contactPhone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
