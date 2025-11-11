/**
 * KRDS (Korean Government Design System) Layout Tokens
 *
 * Layout system including breakpoints, containers, and grid specifications
 * Based on common Korean government website patterns and modern responsive design
 */

/**
 * Breakpoints
 *
 * Responsive design breakpoints
 * Follows industry standards for Korean government websites
 */
export const breakpoints = {
  sm: '640px', // Mobile landscape, small tablets
  md: '768px', // Tablets
  lg: '1024px', // Desktop, laptops
  xl: '1280px', // Large desktop
  '2xl': '1440px', // Extra large desktop (KRDS recommended max-width)
} as const;

/**
 * Breakpoint Values (in pixels)
 *
 * Numeric values for calculations
 */
export const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

/**
 * Container Max Widths
 *
 * Maximum width constraints for content containers
 * KRDS recommendation: 1440px max for optimal readability
 */
export const container = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px', // KRDS recommended max-width
  full: '100%',
} as const;

/**
 * Container Padding
 *
 * Responsive horizontal padding for containers
 */
export const containerPadding = {
  sm: '1.6rem', // 16px - Mobile
  md: '2.4rem', // 24px - Tablet
  lg: '3.2rem', // 32px - Desktop
  xl: '4rem', // 40px - Large desktop
} as const;

/**
 * Grid System
 *
 * 12-column grid system for layout
 * Standard for responsive design
 */
export const grid = {
  columns: 12,
  // Column gaps at different breakpoints
  gap: {
    sm: '1.6rem', // 16px
    md: '2.4rem', // 24px
    lg: '3.2rem', // 32px
  },
} as const;

/**
 * Z-Index Scale
 *
 * Standardized layering system
 * Prevents z-index conflicts
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  notification: 1700,
  max: 9999,
} as const;

/**
 * Content Width Constraints
 *
 * Maximum widths for different content types
 * For optimal readability
 */
export const maxWidth = {
  xs: '320px', // Mobile minimum
  sm: '384px', // Small content
  md: '448px', // Medium content
  lg: '512px', // Large content
  xl: '576px', // Extra large content
  '2xl': '672px', // 2x extra large
  '3xl': '768px', // 3x extra large
  '4xl': '896px', // 4x extra large
  '5xl': '1024px', // 5x extra large
  '6xl': '1152px', // 6x extra large
  '7xl': '1280px', // 7x extra large
  full: '100%',
  prose: '65ch', // Optimal line length for text readability
} as const;

/**
 * Aspect Ratios
 *
 * Common aspect ratios for media and containers
 */
export const aspectRatio = {
  square: '1 / 1',
  video: '16 / 9',
  wide: '21 / 9',
  ultrawide: '32 / 9',
  portrait: '3 / 4',
  landscape: '4 / 3',
  thumbnail: '3 / 2',
} as const;

/**
 * Responsive Utility Functions
 */

/**
 * Get breakpoint value
 *
 * @param breakpoint - Breakpoint key
 * @returns Pixel value of breakpoint
 */
export function getBreakpointValue(
  breakpoint: keyof typeof breakpointValues
): number {
  return breakpointValues[breakpoint];
}

/**
 * Check if current width is above breakpoint
 *
 * @param width - Current width in pixels
 * @param breakpoint - Breakpoint to check against
 * @returns Whether width is above breakpoint
 */
export function isAboveBreakpoint(
  width: number,
  breakpoint: keyof typeof breakpointValues
): boolean {
  return width >= breakpointValues[breakpoint];
}

/**
 * Check if current width is below breakpoint
 *
 * @param width - Current width in pixels
 * @param breakpoint - Breakpoint to check against
 * @returns Whether width is below breakpoint
 */
export function isBelowBreakpoint(
  width: number,
  breakpoint: keyof typeof breakpointValues
): boolean {
  return width < breakpointValues[breakpoint];
}

/**
 * Get responsive value based on current width
 *
 * @param width - Current width in pixels
 * @param values - Responsive values object
 * @returns Appropriate value for current width
 */
export function getResponsiveValue<T>(
  width: number,
  values: Partial<Record<keyof typeof breakpointValues, T>> & { base: T }
): T {
  if (width >= breakpointValues['2xl'] && values['2xl']) return values['2xl'];
  if (width >= breakpointValues.xl && values.xl) return values.xl;
  if (width >= breakpointValues.lg && values.lg) return values.lg;
  if (width >= breakpointValues.md && values.md) return values.md;
  if (width >= breakpointValues.sm && values.sm) return values.sm;
  return values.base;
}

/**
 * Layout Tokens Export
 */
export const layoutTokens = {
  breakpoints,
  breakpointValues,
  container,
  containerPadding,
  grid,
  zIndex,
  maxWidth,
  aspectRatio,
} as const;

/**
 * Export all layout types
 */
export type Breakpoints = typeof breakpoints;
export type BreakpointValues = typeof breakpointValues;
export type Container = typeof container;
export type ContainerPadding = typeof containerPadding;
export type Grid = typeof grid;
export type ZIndex = typeof zIndex;
export type MaxWidth = typeof maxWidth;
export type AspectRatio = typeof aspectRatio;
export type LayoutTokens = typeof layoutTokens;
