/**
 * CSS Variables utility
 *
 * Converts design tokens to CSS custom properties (variables)
 */

import type { ColorScale } from '../tokens/colors';

/**
 * Flatten nested object into dot notation
 *
 * @example
 * flattenObject({ primary: { 500: '#0066CC' } })
 * // Returns: { 'primary-500': '#0066CC' }
 */
export function flattenObject(
  obj: Record<string, unknown>,
  prefix = ''
): Record<string, string> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}-${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(
          acc,
          flattenObject(value as Record<string, unknown>, newKey)
        );
      } else if (typeof value === 'string') {
        acc[newKey] = value;
      }

      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Convert object to CSS variables format
 *
 * @example
 * toCSSVariables({ 'primary-500': '#0066CC' })
 * // Returns: { '--primary-500': '#0066CC' }
 */
export function toCSSVariables(
  obj: Record<string, string>,
  prefix = ''
): Record<string, string> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const variableName = prefix ? `--${prefix}-${key}` : `--${key}`;
      acc[variableName] = obj[key];
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Convert CSS variables object to CSS string
 *
 * @example
 * toCSSString({ '--primary-500': '#0066CC' })
 * // Returns: '--primary-500: #0066CC;'
 */
export function toCSSString(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Generate CSS custom properties from design tokens
 *
 * @param tokens - Design tokens object
 * @param options - Configuration options
 * @returns CSS variables as object or string
 *
 * @example
 * const colors = { primary: { 500: '#0066CC' } };
 * createCSSVariables(colors)
 * // Returns: { '--primary-500': '#0066CC' }
 *
 * createCSSVariables(colors, { format: 'string', selector: ':root' })
 * // Returns: ':root {\n  --primary-500: #0066CC;\n}'
 */
export function createCSSVariables<T extends Record<string, unknown>>(
  tokens: T,
  options?: {
    prefix?: string;
    format?: 'object' | 'string';
    selector?: string;
  }
): Record<string, string> | string {
  const { prefix = '', format = 'object', selector = ':root' } = options || {};

  const flattened = flattenObject(tokens);
  const variables = toCSSVariables(flattened, prefix);

  if (format === 'string') {
    const cssString = toCSSString(variables);
    return `${selector} {\n${cssString}\n}`;
  }

  return variables;
}

/**
 * Generate color scale CSS variables
 *
 * @param scale - Color scale object
 * @param name - Color name (e.g., 'primary')
 * @returns CSS variables for the color scale
 *
 * @example
 * createColorScaleVariables(primary, 'primary')
 * // Returns: { '--primary-50': '#E6F0FF', ... }
 */
export function createColorScaleVariables(
  scale: ColorScale,
  name: string
): Record<string, string> {
  return Object.entries(scale).reduce(
    (acc, [key, value]) => {
      acc[`--${name}-${key}`] = value;
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Generate theme CSS with light and dark mode support
 *
 * @param lightTokens - Light mode tokens
 * @param darkTokens - Dark mode tokens
 * @returns Complete CSS string with theme variables
 *
 * @example
 * const css = createThemeCSS(semanticColors, darkColors);
 * // Returns CSS string with :root and [data-theme="dark"] selectors
 */
export function createThemeCSS(
  lightTokens: Record<string, unknown>,
  darkTokens: Record<string, unknown>
): string {
  const lightCSS = createCSSVariables(lightTokens, {
    format: 'string',
    selector: ':root',
  }) as string;

  const darkCSS = createCSSVariables(darkTokens, {
    format: 'string',
    selector: '[data-theme="dark"]',
  }) as string;

  return `${lightCSS}\n\n${darkCSS}`;
}
