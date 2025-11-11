import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './packages/react/src/**/*.{ts,tsx}',
    './apps/docs/app/**/*.{ts,tsx}',
    './apps/docs/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // KRDS 공식 컬러 팔레트
        // Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json
        primary: {
          5: '#ecf2fe',
          10: '#d8e5fd',
          20: '#b1cefb',
          30: '#86aff9',
          40: '#4c87f6',
          50: '#256ef4',
          60: '#0b50d0',
          70: '#083891',
          80: '#052561',
          90: '#03163a',
          95: '#020f27',
        },
        secondary: {
          5: '#eef2f7',
          10: '#d6e0eb',
          20: '#bacbde',
          30: '#90b0d5',
          40: '#6b96c7',
          50: '#346fb2',
          60: '#1c589c',
          70: '#063a74',
          80: '#052b57',
          90: '#031f3f',
          95: '#02162c',
        },
        success: {
          5: '#eaf6ec',
          10: '#d8eedd',
          20: '#a9dab4',
          30: '#7ec88e',
          40: '#3fa654',
          50: '#228738',
          60: '#267337',
          70: '#285d33',
          80: '#1f4727',
          90: '#122b18',
          95: '#0e2012',
        },
        warning: {
          5: '#fff3db',
          10: '#ffe0a3',
          20: '#ffc95c',
          30: '#ffb114',
          40: '#c78500',
          50: '#9e6a00',
          60: '#8a5c00',
          70: '#614100',
          80: '#422c00',
          90: '#2e1f00',
          95: '#241800',
        },
        danger: {
          5: '#fdefec',
          10: '#fcdfd9',
          20: '#f7afa1',
          30: '#f48771',
          40: '#f05f42',
          50: '#de3412',
          60: '#bd2c0f',
          70: '#8a240f',
          80: '#5c180a',
          90: '#390d05',
          95: '#260903',
        },
        info: {
          5: '#e7f4fe',
          10: '#d3ebfd',
          20: '#9ed2fa',
          30: '#5fb5f7',
          40: '#2098f3',
          50: '#0b78cb',
          60: '#096ab3',
          70: '#085691',
          80: '#053961',
          90: '#03253f',
          95: '#021a2c',
        },
        gray: {
          0: '#ffffff',
          5: '#f4f5f6',
          10: '#e6e8ea',
          20: '#cdd1d5',
          30: '#b1b8be',
          40: '#8a949e',
          50: '#6d7882',
          60: '#58616a',
          70: '#464c53',
          80: '#33363d',
          90: '#1e2124',
          95: '#131416',
          100: '#000000',
        },
      },
      fontFamily: {
        // KRDS Typography - Pretendard GOV (official)
        // Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json
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
      },
      spacing: {
        // KRDS 8px grid system
        '4.5': '1.125rem', // 18px
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
      },
      borderRadius: {
        DEFAULT: '0.5rem', // 8px - KRDS grid
        sm: '0.25rem', // 4px
        md: '0.5rem', // 8px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        '2xl': '2rem', // 32px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: '0 0 #0000',
      },
      fontSize: {
        // KRDS Typography Scale - Desktop
        // Source: https://github.com/KRDS-uiux/krds-uiux/blob/main/tokens/figma_token.json

        // Display sizes
        'display-lg': [
          '6rem',
          { lineHeight: '1.25', letterSpacing: '-0.025em', fontWeight: '700' },
        ], // 96px
        'display-md': [
          '4.4rem',
          { lineHeight: '1.25', letterSpacing: '-0.025em', fontWeight: '700' },
        ], // 70.4px
        'display-sm': [
          '3.6rem',
          { lineHeight: '1.375', letterSpacing: '-0.025em', fontWeight: '700' },
        ], // 57.6px

        // Heading sizes
        'heading-xl': ['4rem', { lineHeight: '1.375', fontWeight: '700' }], // 64px
        'heading-lg': ['3.2rem', { lineHeight: '1.375', fontWeight: '700' }], // 51.2px
        'heading-md': ['2.4rem', { lineHeight: '1.5', fontWeight: '700' }], // 38.4px
        'heading-sm': ['1.9rem', { lineHeight: '1.5', fontWeight: '600' }], // 30.4px
        'heading-xs': ['1.7rem', { lineHeight: '1.5', fontWeight: '600' }], // 27.2px
        'heading-2xs': ['1.5rem', { lineHeight: '1.5', fontWeight: '600' }], // 24px

        // Body & Label sizes
        'body-lg': ['1.9rem', { lineHeight: '1.625', fontWeight: '400' }], // 30.4px
        'body-md': ['1.7rem', { lineHeight: '1.625', fontWeight: '400' }], // 27.2px
        'body-sm': ['1.5rem', { lineHeight: '1.625', fontWeight: '400' }], // 24px
        'body-xs': ['1.3rem', { lineHeight: '1.5', fontWeight: '400' }], // 20.8px

        // Navigation sizes
        'nav-title-md': ['2.4rem', { lineHeight: '1.5', fontWeight: '600' }], // 38.4px
        'nav-title-sm': ['1.9rem', { lineHeight: '1.5', fontWeight: '500' }], // 30.4px
        'nav-depth-md': ['1.7rem', { lineHeight: '1.5', fontWeight: '500' }], // 27.2px
        'nav-depth-sm': ['1.5rem', { lineHeight: '1.5', fontWeight: '400' }], // 24px
      },
      fontWeight: {
        // KRDS Font Weights
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      lineHeight: {
        // KRDS Line Heights
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '1.75',
        looser: '2',
      },
      letterSpacing: {
        // KRDS Letter Spacing
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
    },
  },
  plugins: [],
};

export default config;
