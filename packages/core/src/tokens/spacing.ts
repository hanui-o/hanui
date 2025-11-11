/**
 * KRDS (Korean Government Design System) Spacing Tokens
 *
 * Official spacing system from KRDS Figma tokens
 * Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json
 *
 * Base: 0.1rem increments (10px base with 62.5% root font-size)
 * Key principle: 8px grid system for visual consistency
 */

/**
 * Base Spacing Scale
 *
 * KRDS uses 0.1rem increments for granular control
 * Common usage follows 8px grid (0.8rem, 1.6rem, 2.4rem, 3.2rem, etc.)
 */
export const spacing = {
  0: '0rem', // 0px
  1: '0.2rem', // 2px
  2: '0.4rem', // 4px
  3: '0.6rem', // 6px
  4: '0.8rem', // 8px - 8px grid base
  5: '1rem', // 10px
  6: '1.2rem', // 12px
  7: '1.4rem', // 14px
  8: '1.6rem', // 16px - 8px grid
  9: '1.8rem', // 18px
  10: '2rem', // 20px
  11: '2.2rem', // 22px
  12: '2.4rem', // 24px - 8px grid
  14: '2.8rem', // 28px
  16: '3.2rem', // 32px - 8px grid
  18: '3.6rem', // 36px
  20: '4rem', // 40px - 8px grid
  24: '4.8rem', // 48px - 8px grid
  28: '5.6rem', // 56px
  32: '6.4rem', // 64px - 8px grid
  36: '7.2rem', // 72px
  40: '8rem', // 80px - 8px grid
  48: '9.6rem', // 96px - 8px grid
  max: '100rem', // 1000px - maximum spacing
} as const;

/**
 * Semantic Spacing Aliases
 *
 * Provides semantic names for common spacing patterns
 * Follows 8px grid for consistency
 */
export const space = {
  // Extra small spacing
  xs: spacing[4], // 8px
  // Small spacing
  sm: spacing[8], // 16px
  // Medium spacing
  md: spacing[16], // 32px
  // Large spacing
  lg: spacing[24], // 48px
  // Extra large spacing
  xl: spacing[32], // 64px
  // 2x Extra large spacing
  '2xl': spacing[40], // 80px
  // 3x Extra large spacing
  '3xl': spacing[48], // 96px
} as const;

/**
 * Gap Scale
 *
 * Used for spacing between layout components (Flexbox/Grid gaps)
 * From KRDS Figma tokens
 */
export const gap = {
  1: '0.2rem', // 2px
  2: '0.4rem', // 4px
  3: '0.6rem', // 6px
  4: '0.8rem', // 8px
  5: '1rem', // 10px
  6: '1.6rem', // 16px
  7: '2rem', // 20px
  8: '2.4rem', // 24px
  9: '3.2rem', // 32px
  10: '4rem', // 40px
  11: '4.8rem', // 48px
  12: '8rem', // 80px
} as const;

/**
 * Padding Scale
 *
 * For internal component padding
 * From KRDS Figma tokens
 */
export const padding = {
  1: '0.2rem', // 2px
  2: '0.4rem', // 4px
  3: '0.6rem', // 6px
  4: '0.8rem', // 8px
  5: '1rem', // 10px
  6: '1.2rem', // 12px
  7: '1.4rem', // 14px
  8: '1.6rem', // 16px
  9: '2rem', // 20px
  10: '2.4rem', // 24px
} as const;

/**
 * Layout Gaps - PC (Desktop)
 *
 * Responsive layout spacing for desktop views
 * From KRDS Figma tokens
 */
export const layoutGapPC = {
  'header-breadcrumb': '2.4rem',
  'left-content': '1.8rem',
  'content-right': '1.8rem',
  'breadcrumb-title': '3.2rem',
  'title-body': '1rem',
  'body-footer': '0.8rem',
} as const;

/**
 * Layout Gaps - Mobile
 *
 * Responsive layout spacing for mobile views
 * From KRDS Figma tokens
 */
export const layoutGapMobile = {
  'header-breadcrumb': '0.8rem',
  'left-content': '0rem',
  'content-right': '0rem',
  'breadcrumb-title': '0.9rem',
  'title-body': '0.5rem',
  'body-footer': '0rem',
} as const;

/**
 * Border Radius Scale
 *
 * From KRDS Figma tokens
 */
export const radius = {
  none: '0rem',
  xs: '0.2rem', // 2px
  sm: '0.4rem', // 4px
  md: '0.6rem', // 6px
  lg: '0.8rem', // 8px
  xl: '1rem', // 10px
  '2xl': '1.2rem', // 12px
  full: '100rem', // Fully rounded (9999px equivalent)
} as const;

/**
 * Component Height Scale
 *
 * Standardized heights for components
 * From KRDS Figma tokens (11 levels)
 */
export const height = {
  1: '0.8rem', // 8px
  2: '1.6rem', // 16px
  3: '2.4rem', // 24px
  4: '3.2rem', // 32px
  5: '4rem', // 40px - Standard button/input height
  6: '4.8rem', // 48px
  7: '5.6rem', // 56px
  8: '6.4rem', // 64px
  9: '7.2rem', // 72px
  10: '8rem', // 80px
  11: '8.8rem', // 88px
} as const;

/**
 * Spacing Tokens Export
 */
export const spacingTokens = {
  spacing,
  space,
  gap,
  padding,
  layoutGapPC,
  layoutGapMobile,
  radius,
  height,
} as const;

/**
 * Export all spacing types
 */
export type Spacing = typeof spacing;
export type Space = typeof space;
export type Gap = typeof gap;
export type Padding = typeof padding;
export type LayoutGapPC = typeof layoutGapPC;
export type LayoutGapMobile = typeof layoutGapMobile;
export type Radius = typeof radius;
export type Height = typeof height;
export type SpacingTokens = typeof spacingTokens;
