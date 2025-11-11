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
