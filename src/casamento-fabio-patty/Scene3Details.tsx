import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { colors, typography, spacing, animation, eventInfo } from './tokens';

// Ícones SVG para os detalhes
const CalendarIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
    <line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="16" r="2" fill={color} />
  </svg>
);

const ClockIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MapPinIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      stroke={color}
      strokeWidth="2"
    />
    <circle cx="12" cy="9" r="3" fill={color} />
  </svg>
);

const ShirtIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M9 2V8L12 6L15 8V2" stroke={color} strokeWidth="2" />
  </svg>
);

const CarIcon: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5 11L6.5 6H17.5L19 11M5 11H19M5 11V17M19 11V17M5 17H7M5 17V19H7V17M19 17H17M19 17V19H17V17M7 17H17"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="14.5" r="1.5" fill={color} />
    <circle cx="16.5" cy="14.5" r="1.5" fill={color} />
  </svg>
);

// Componente de item de detalhe
const DetailItem: React.FC<{
  icon: React.FC<{ color: string; size: number }>;
  label: string;
  value: string;
  subtext?: string;
  delay: number;
  highlight?: boolean;
}> = ({ icon: Icon, label, value, subtext, delay, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: animation.springGentle,
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-30, 0]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.smallGap,
        opacity,
        transform: `translateX(${translateX}px)`,
        marginBottom: spacing.itemGap,
      }}
    >
      {/* Ícone */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          background: highlight
            ? `linear-gradient(135deg, ${colors.yellowLight} 0%, ${colors.yellowGold} 100%)`
            : colors.lavenderMedium,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon color={highlight ? colors.brownDark : colors.purpleDeep} size={32} />
      </div>

      {/* Texto */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: typography.fontSans,
            fontSize: typography.small,
            fontWeight: typography.weightMedium,
            color: colors.textGold,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: typography.fontSerif,
            fontSize: typography.body,
            fontWeight: typography.weightSemibold,
            color: colors.textPrimary,
            margin: 0,
          }}
        >
          {value}
        </p>
        {subtext && (
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.small,
              fontWeight: typography.weightRegular,
              color: colors.textSecondary,
              margin: 0,
              marginTop: 4,
            }}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
};

export const Scene3Details: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animação do título
  const titleProgress = spring({
    frame,
    fps,
    config: animation.springMedium,
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: colors.bgLight,
      }}
    >
      {/* Bordas decorativas */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${colors.lavenderSoft} 0%, ${colors.yellowGold} 50%, ${colors.lavenderSoft} 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${colors.lavenderSoft} 0%, ${colors.yellowGold} 50%, ${colors.lavenderSoft} 100%)`,
        }}
      />

      {/* Container principal */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: spacing.screenPadding,
          paddingTop: spacing.screenPadding + 20,
        }}
      >
        {/* Título */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: spacing.sectionGap,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <p
            style={{
              fontFamily: typography.fontSans,
              fontSize: typography.small,
              fontWeight: typography.weightMedium,
              color: colors.textGold,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
              marginBottom: spacing.tinyGap,
            }}
          >
            O Grande Dia
          </p>
          <h2
            style={{
              fontFamily: typography.fontSerif,
              fontSize: typography.displayMedium,
              fontWeight: typography.weightRegular,
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            {eventInfo.coupleNames}
          </h2>
        </div>

        {/* Card de detalhes */}
        <div
          style={{
            background: colors.white,
            borderRadius: 32,
            padding: spacing.cardPadding,
            boxShadow: `0 20px 60px ${colors.lavenderSoft}40`,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <DetailItem
            icon={CalendarIcon}
            label="Data"
            value={eventInfo.date}
            delay={15}
            highlight
          />

          <DetailItem
            icon={ClockIcon}
            label="Horário"
            value={`Cerimônia às ${eventInfo.time}`}
            subtext="Chegue um pouco antes"
            delay={30}
          />

          <DetailItem
            icon={MapPinIcon}
            label="Local"
            value={eventInfo.venue}
            subtext={eventInfo.city}
            delay={45}
            highlight
          />

          <DetailItem
            icon={ShirtIcon}
            label="Traje"
            value={eventInfo.dressCode}
            delay={60}
          />

          <DetailItem
            icon={CarIcon}
            label="Estacionamento"
            value={eventInfo.parking}
            delay={75}
          />
        </div>

        {/* Ornamento inferior */}
        <div
          style={{
            textAlign: 'center',
            marginTop: spacing.itemGap,
            opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path
              d="M0 15 Q25 5 50 15 Q75 25 100 15"
              stroke={colors.yellowGold}
              strokeWidth="2"
              fill="none"
              opacity={0.6}
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
