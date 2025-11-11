/**
 * KRDS (Korean Government Design System) Typography Tokens
 *
 * Official typography system from KRDS Figma tokens
 * Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json
 *
 * Font: Pretendard GOV (KRDS official) with fallbacks
 */

/**
 * Font Family Stacks
 *
 * Primary: Pretendard GOV (KRDS) → Pretendard → Noto Sans KR → System fonts
 * Mono: Fira Code → D2Coding → System monospace
 */
export const fontFamily = {
  sans: [
    'Pretendard GOV',
    'Pretendard',
    'Pretendard Variable',
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  mono: [
    'Fira Code',
    'D2Coding',
    'SFMono-Regular',
    'Menlo',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ],
} as const;

/**
 * Font Weights
 *
 * KRDS uses Regular and Bold primarily
 */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Letter Spacing
 *
 * From KRDS Figma tokens
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em', // KRDS letter-spacing: 1
} as const;

/**
 * Line Height Scale
 *
 * Calculated for optimal readability
 * Based on common Korean typography practices
 */
export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '1.75',
  looser: '2',
} as const;

/**
 * Font Size Scale - Desktop (PC)
 *
 * From KRDS Figma tokens
 * All sizes in rem units
 */
export interface TypeScale {
  fontSize: string;
  lineHeight: string;
  letterSpacing?: string;
  fontWeight?: string;
}

export const fontSize = {
  // Display sizes
  'display-lg': '6rem', // 96px
  'display-md': '4.4rem', // 70.4px
  'display-sm': '3.6rem', // 57.6px

  // Heading sizes
  'heading-xl': '4rem', // 64px
  'heading-lg': '3.2rem', // 51.2px
  'heading-md': '2.4rem', // 38.4px
  'heading-sm': '1.9rem', // 30.4px
  'heading-xs': '1.7rem', // 27.2px
  'heading-2xs': '1.5rem', // 24px

  // Body & Label sizes
  'body-lg': '1.9rem', // 30.4px
  'body-md': '1.7rem', // 27.2px
  'body-sm': '1.5rem', // 24px
  'body-xs': '1.3rem', // 20.8px

  // Navigation sizes
  'nav-title-md': '2.4rem', // 38.4px
  'nav-title-sm': '1.9rem', // 30.4px
  'nav-depth-md': '1.7rem', // 27.2px
  'nav-depth-sm': '1.5rem', // 24px
} as const;

/**
 * Font Size Scale - Mobile
 *
 * From KRDS Figma tokens
 * Responsive sizes for mobile devices
 */
export const fontSizeMobile = {
  // Display sizes
  'display-lg': '4.4rem', // 70.4px
  'display-md': '3.2rem', // 51.2px
  'display-sm': '2.8rem', // 44.8px

  // Heading sizes
  'heading-xl': '2.8rem', // 44.8px
  'heading-lg': '2.4rem', // 38.4px
  'heading-md': '2.2rem', // 35.2px
  'heading-sm': '1.9rem', // 30.4px
  'heading-xs': '1.7rem', // 27.2px - not specified, using desktop
  'heading-2xs': '1.5rem', // 24px - not specified, using desktop

  // Body & Label sizes (same as desktop)
  'body-lg': '1.9rem',
  'body-md': '1.7rem',
  'body-sm': '1.5rem',
  'body-xs': '1.3rem',
} as const;

/**
 * Complete Type Scale with Line Heights
 *
 * Combines font sizes with appropriate line heights
 * for optimal readability
 */
export const typeScale: Record<string, TypeScale> = {
  // Display styles
  'display-lg': {
    fontSize: fontSize['display-lg'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.bold,
  },
  'display-md': {
    fontSize: fontSize['display-md'],
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.bold,
  },
  'display-sm': {
    fontSize: fontSize['display-sm'],
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.tight,
    fontWeight: fontWeight.bold,
  },

  // Heading styles
  'heading-xl': {
    fontSize: fontSize['heading-xl'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.bold,
  },
  'heading-lg': {
    fontSize: fontSize['heading-lg'],
    lineHeight: lineHeight.snug,
    fontWeight: fontWeight.bold,
  },
  'heading-md': {
    fontSize: fontSize['heading-md'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.bold,
  },
  'heading-sm': {
    fontSize: fontSize['heading-sm'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
  },
  'heading-xs': {
    fontSize: fontSize['heading-xs'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
  },
  'heading-2xs': {
    fontSize: fontSize['heading-2xs'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
  },

  // Body styles
  'body-lg': {
    fontSize: fontSize['body-lg'],
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
  },
  'body-md': {
    fontSize: fontSize['body-md'],
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
  },
  'body-sm': {
    fontSize: fontSize['body-sm'],
    lineHeight: lineHeight.relaxed,
    fontWeight: fontWeight.regular,
  },
  'body-xs': {
    fontSize: fontSize['body-xs'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.regular,
  },

  // Navigation styles
  'nav-title-md': {
    fontSize: fontSize['nav-title-md'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.semibold,
  },
  'nav-title-sm': {
    fontSize: fontSize['nav-title-sm'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.medium,
  },
  'nav-depth-md': {
    fontSize: fontSize['nav-depth-md'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.medium,
  },
  'nav-depth-sm': {
    fontSize: fontSize['nav-depth-sm'],
    lineHeight: lineHeight.normal,
    fontWeight: fontWeight.regular,
  },
} as const;

/**
 * Typography Tokens Export
 */
export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  fontSizeMobile,
  lineHeight,
  letterSpacing,
  typeScale,
} as const;

/**
 * Export all typography types
 */
export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
export type Typography = typeof typography;
