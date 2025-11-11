/**
 * @hanui/core - HANUI Design System Core Tokens
 *
 * KRDS (Korean Government Design System) based design tokens
 */

// Color tokens
export {
  colors,
  primary,
  secondary,
  gray,
  success,
  warning,
  danger,
  info,
  semanticColors,
  darkColors,
} from './tokens/colors';

export type {
  ColorScale,
  Colors,
  SemanticColors,
  DarkColors,
} from './tokens/colors';

// Typography tokens
export {
  typography,
  fontFamily,
  fontWeight,
  fontSize,
  fontSizeMobile,
  lineHeight,
  letterSpacing,
  typeScale,
} from './tokens/typography';

export type {
  Typography,
  FontFamily,
  FontWeight,
  FontSize,
  LineHeight,
  LetterSpacing,
  TypeScale,
} from './tokens/typography';

// Spacing tokens
export {
  spacingTokens,
  spacing,
  space,
  gap,
  padding,
  layoutGapPC,
  layoutGapMobile,
  radius,
  height,
} from './tokens/spacing';

export type {
  SpacingTokens,
  Spacing,
  Space,
  Gap,
  Padding,
  LayoutGapPC,
  LayoutGapMobile,
  Radius,
  Height,
} from './tokens/spacing';

// Layout tokens
export {
  layoutTokens,
  breakpoints,
  breakpointValues,
  container,
  containerPadding,
  grid,
  zIndex,
  maxWidth,
  aspectRatio,
  getBreakpointValue,
  isAboveBreakpoint,
  isBelowBreakpoint,
  getResponsiveValue,
} from './tokens/layout';

export type {
  LayoutTokens,
  Breakpoints,
  BreakpointValues,
  Container,
  ContainerPadding,
  Grid,
  ZIndex,
  MaxWidth,
  AspectRatio,
} from './tokens/layout';

// CSS utilities
export {
  flattenObject,
  toCSSVariables,
  toCSSString,
  createCSSVariables,
  createColorScaleVariables,
  createThemeCSS,
} from './utils/css-variables';

// Version
export const version = '0.0.0';
