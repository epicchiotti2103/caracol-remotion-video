# CLAUDE.md - AI Assistant Guide

This document provides essential context for AI assistants working with this repository.

## Project Overview

**caracol-remotion-video** is an AI Agent Skill repository containing domain-specific best practices, guidelines, and code examples for video creation using Remotion (a React-based video framework).

**Purpose:** Provides Claude AI with structured domain knowledge about Remotion development patterns and conventions.

**Type:** Documentation/Knowledge Base (not a runnable application)

## Directory Structure

```
caracol-remotion-video/
├── .agents/
│   └── skills/
│       └── remotion-best-practices/     # Main skill directory
│           ├── SKILL.md                  # Skill metadata and index
│           └── rules/                    # 28 best practice guides
│               ├── assets/               # Example TSX code snippets
│               │   ├── charts-bar-chart.tsx
│               │   ├── text-animations-typewriter.tsx
│               │   └── text-animations-word-highlight.tsx
│               └── *.md                  # Rule files (animations, timing, etc.)
├── .codex/
│   └── skills/                           # Symlink to .agents/skills
└── CLAUDE.md                             # This file
```

## Key Technologies

- **Remotion** - Core framework for creating videos in React
- **TypeScript/TSX** - All code examples use TypeScript
- **React** - Component-based video composition
- **CSS-in-JS** - Inline styles (CSS transitions are forbidden)

### Remotion Packages Referenced

- `@remotion/media` - Video and audio components
- `@remotion/captions` - Caption/subtitle handling
- `@remotion/google-fonts` - Google Fonts integration
- `@remotion/fonts` - Local font loading
- `@mediabunny` - Media utility library

## Core Conventions

### Animation Rules (CRITICAL)

1. **Always use `useCurrentFrame()` hook** - All animations must be frame-based
2. **Calculate durations in seconds** - Write as `2 * fps`, multiply by fps
3. **NEVER use CSS transitions** - They won't render correctly
4. **NEVER use Tailwind animation classes** - Frame-based animations only

```tsx
// Correct pattern
const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: 'clamp',
});
```

### Interpolation & Spring Physics

```tsx
// Linear interpolation
interpolate(frame, [start, end], [fromValue, toValue])

// Spring animations (preferred for natural motion)
spring({ frame, fps, config: { damping: 200 } })
```

**Spring Presets:**
- `{damping: 200}` - Smooth, no bounce
- `{damping: 20, stiffness: 200}` - Snappy, minimal bounce
- `{damping: 8}` - Bouncy
- `{damping: 15, stiffness: 80, mass: 2}` - Heavy, slow

### Asset Management

- **Always use `staticFile()`** for public folder assets
- Remote URLs work directly without staticFile

```tsx
import { Img, staticFile } from 'remotion';
<Img src={staticFile('logo.png')} />
```

### Type Declarations

- Use `type` (not `interface`) for component props with `defaultProps`

```tsx
type MyProps = {
  title: string;
  duration?: number;
};
```

### Component Structure

- Use `AbsoluteFill` for full-frame layouts
- Inline styles with flexbox for positioning
- Constants (colors, sizes) at component top level in UPPER_CASE

## Rule Categories (28 Total)

| Category | Rules |
|----------|-------|
| **Media & Assets** | assets, images, videos, audio, gifs, fonts |
| **Animation & Timing** | animations, timing, transitions, text-animations |
| **Composition** | compositions, calculate-metadata, sequencing, trimming |
| **Media Processing** | captions, display-captions, import-srt-captions, transcribe-captions, extract-frames |
| **Metadata** | get-video-duration, get-video-dimensions, get-audio-duration |
| **Advanced** | 3d, charts, lottie, can-decode, measuring-dom-nodes, measuring-text, tailwind |

## Working with This Repository

### Adding New Rules

1. Create a new `.md` file in `.agents/skills/remotion-best-practices/rules/`
2. Include YAML frontmatter:
   ```yaml
   ---
   name: rule-name
   description: Brief description
   metadata:
     tags: tag1, tag2, tag3
   ---
   ```
3. Include clear explanations, prerequisites, and code examples
4. Update `SKILL.md` index if needed

### Adding Code Examples

1. Place TSX files in `.agents/skills/remotion-best-practices/rules/assets/`
2. Follow existing naming conventions: `category-feature.tsx`
3. Include complete, runnable code with TypeScript types
4. Use consistent styling patterns (inline styles, constants)

### Code Quality Standards

- TypeScript with explicit types
- Functional React components
- Clear variable naming
- Frame-based timing calculations
- Color constants defined at component top
- Standard video dimensions: 1280x720 (HD landscape)

## Common Video Dimensions

| Format | Dimensions |
|--------|------------|
| HD Landscape | 1280x720 |
| Full HD | 1920x1080 |
| Square | 1080x1080 |
| Portrait (TikTok/Stories) | 1080x1920 |

## Package Installation Commands

```bash
# NPX (default)
npx remotion add @remotion/media

# Bun
bunx remotion add @remotion/media

# Yarn
yarn remotion add @remotion/media

# PNPM
pnpm exec remotion add @remotion/media
```

## Git Workflow

- **Main branch:** Development happens on feature branches
- **Commit messages:** Descriptive, explaining what was added/changed
- **File organization:** Keep rules atomic and focused on single concepts

## Important Notes for AI Assistants

1. **This is NOT a runnable project** - It's a documentation/skill repository
2. **Frame-based animation is fundamental** - Never suggest CSS transitions
3. **TypeScript is mandatory** - All examples must include proper types
4. **Examples should be complete** - Include all imports and type declarations
5. **staticFile() is required** for local assets - Never use raw file paths
6. **Spring physics preferred** - Use spring() over linear interpolation for natural motion
7. **Easing matters** - Document easing choices in complex animations

## Quick Reference: Essential Imports

```tsx
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  AbsoluteFill,
  Img,
  Video,
  Audio,
  staticFile,
  Easing,
} from 'remotion';
```

## Quick Reference: Essential Hooks

```tsx
const frame = useCurrentFrame();           // Current frame number
const { fps, width, height, durationInFrames } = useVideoConfig();
```
