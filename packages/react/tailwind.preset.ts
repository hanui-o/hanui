/**
 * HANUI Tailwind Preset
 *
 * KRDS(Korean Government Design System) 기반 Tailwind 설정
 * 사용자 프로젝트의 tailwind.config.ts에서 이 preset을 import하여 사용
 *
 * @example
 * ```ts
 * // tailwind.config.ts
 * import hanUIPreset from '@hanui/react/tailwind.preset';
 *
 * export default {
 *   presets: [hanUIPreset],
 *   content: ['./src/**\/*.{ts,tsx}'],
 * };
 * ```
 */
const hanUIPreset = {
  theme: {
    extend: {
      colors: {
        // Base Colors - 순수 흰색/검은색 (모드 무관, 항상 동일)
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        // KRDS Base Colors - 모드에 따라 반전
        'krds-white': {
          DEFAULT: 'var(--krds-white)',
        },
        'krds-black': {
          DEFAULT: 'var(--krds-black)',
        },

        // KRDS Primary Colors
        'krds-primary': {
          DEFAULT: 'var(--krds-primary-base)',
          text: 'var(--krds-primary-text)',
          surface: 'var(--krds-primary-surface)',
          base: 'var(--krds-primary-base)',
          border: 'var(--krds-primary-border)',
          5: 'var(--krds-color-light-primary-5)',
          10: 'var(--krds-color-light-primary-10)',
          20: 'var(--krds-color-light-primary-20)',
          30: 'var(--krds-color-light-primary-30)',
          40: 'var(--krds-color-light-primary-40)',
          50: 'var(--krds-color-light-primary-50)',
          60: 'var(--krds-color-light-primary-60)',
          70: 'var(--krds-color-light-primary-70)',
          80: 'var(--krds-color-light-primary-80)',
          90: 'var(--krds-color-light-primary-90)',
          95: 'var(--krds-color-light-primary-95)',
        },

        // KRDS Secondary Colors
        'krds-secondary': {
          DEFAULT: 'var(--krds-secondary-base)',
          text: 'var(--krds-secondary-text)',
          surface: 'var(--krds-secondary-surface)',
          base: 'var(--krds-secondary-base)',
          5: 'var(--krds-color-light-secondary-5)',
          10: 'var(--krds-color-light-secondary-10)',
          20: 'var(--krds-color-light-secondary-20)',
          30: 'var(--krds-color-light-secondary-30)',
          40: 'var(--krds-color-light-secondary-40)',
          50: 'var(--krds-color-light-secondary-50)',
          60: 'var(--krds-color-light-secondary-60)',
          70: 'var(--krds-color-light-secondary-70)',
          80: 'var(--krds-color-light-secondary-80)',
          90: 'var(--krds-color-light-secondary-90)',
          95: 'var(--krds-color-light-secondary-95)',
        },

        // KRDS Gray Scale
        'krds-gray': {
          text: 'var(--krds-gray-text)',
          surface: 'var(--krds-gray-surface)',
          background: 'var(--krds-gray-background)',
          border: 'var(--krds-gray-border)',
          0: 'var(--krds-color-light-gray-0)',
          5: 'var(--krds-color-light-gray-5)',
          10: 'var(--krds-color-light-gray-10)',
          20: 'var(--krds-color-light-gray-20)',
          30: 'var(--krds-color-light-gray-30)',
          40: 'var(--krds-color-light-gray-40)',
          50: 'var(--krds-color-light-gray-50)',
          60: 'var(--krds-color-light-gray-60)',
          70: 'var(--krds-color-light-gray-70)',
          80: 'var(--krds-color-light-gray-80)',
          90: 'var(--krds-color-light-gray-90)',
          95: 'var(--krds-color-light-gray-95)',
          100: 'var(--krds-color-light-gray-100)',
        },

        // KRDS Accent Colors
        'krds-accent': {
          DEFAULT: 'var(--krds-accent-base)',
          text: 'var(--krds-accent-text)',
          surface: 'var(--krds-accent-surface)',
          base: 'var(--krds-accent-base)',
          5: 'var(--krds-color-light-accent-5)',
          10: 'var(--krds-color-light-accent-10)',
          20: 'var(--krds-color-light-accent-20)',
          30: 'var(--krds-color-light-accent-30)',
          40: 'var(--krds-color-light-accent-40)',
          50: 'var(--krds-color-light-accent-50)',
          60: 'var(--krds-color-light-accent-60)',
          70: 'var(--krds-color-light-accent-70)',
          80: 'var(--krds-color-light-accent-80)',
          90: 'var(--krds-color-light-accent-90)',
          95: 'var(--krds-color-light-accent-95)',
        },

        // KRDS Danger Colors
        'krds-danger': {
          DEFAULT: 'var(--krds-danger-base)',
          icon: 'var(--krds-danger-icon)',
          text: 'var(--krds-danger-text)',
          surface: 'var(--krds-danger-surface)',
          base: 'var(--krds-danger-base)',
          border: 'var(--krds-danger-border)',
          5: 'var(--krds-color-light-danger-5)',
          10: 'var(--krds-color-light-danger-10)',
          20: 'var(--krds-color-light-danger-20)',
          30: 'var(--krds-color-light-danger-30)',
          40: 'var(--krds-color-light-danger-40)',
          50: 'var(--krds-color-light-danger-50)',
          60: 'var(--krds-color-light-danger-60)',
          70: 'var(--krds-color-light-danger-70)',
          80: 'var(--krds-color-light-danger-80)',
          90: 'var(--krds-color-light-danger-90)',
          95: 'var(--krds-color-light-danger-95)',
        },

        // KRDS Warning Colors
        'krds-warning': {
          DEFAULT: 'var(--krds-warning-base)',
          icon: 'var(--krds-warning-icon)',
          text: 'var(--krds-warning-text)',
          surface: 'var(--krds-warning-surface)',
          base: 'var(--krds-warning-base)',
          border: 'var(--krds-warning-border)',
          5: 'var(--krds-color-light-warning-5)',
          10: 'var(--krds-color-light-warning-10)',
          20: 'var(--krds-color-light-warning-20)',
          30: 'var(--krds-color-light-warning-30)',
          40: 'var(--krds-color-light-warning-40)',
          50: 'var(--krds-color-light-warning-50)',
          60: 'var(--krds-color-light-warning-60)',
          70: 'var(--krds-color-light-warning-70)',
          80: 'var(--krds-color-light-warning-80)',
          90: 'var(--krds-color-light-warning-90)',
          95: 'var(--krds-color-light-warning-95)',
        },

        // KRDS Success Colors
        'krds-success': {
          DEFAULT: 'var(--krds-success-base)',
          icon: 'var(--krds-success-icon)',
          text: 'var(--krds-success-text)',
          surface: 'var(--krds-success-surface)',
          base: 'var(--krds-success-base)',
          border: 'var(--krds-success-border)',
          5: 'var(--krds-color-light-success-5)',
          10: 'var(--krds-color-light-success-10)',
          20: 'var(--krds-color-light-success-20)',
          30: 'var(--krds-color-light-success-30)',
          40: 'var(--krds-color-light-success-40)',
          50: 'var(--krds-color-light-success-50)',
          60: 'var(--krds-color-light-success-60)',
          70: 'var(--krds-color-light-success-70)',
          80: 'var(--krds-color-light-success-80)',
          90: 'var(--krds-color-light-success-90)',
          95: 'var(--krds-color-light-success-95)',
        },

        // KRDS Information Colors
        'krds-info': {
          DEFAULT: 'var(--krds-information-base)',
          icon: 'var(--krds-information-icon)',
          text: 'var(--krds-information-text)',
          surface: 'var(--krds-information-surface)',
          base: 'var(--krds-information-base)',
          border: 'var(--krds-information-border)',
          5: 'var(--krds-color-light-information-5)',
          10: 'var(--krds-color-light-information-10)',
          20: 'var(--krds-color-light-information-20)',
          30: 'var(--krds-color-light-information-30)',
          40: 'var(--krds-color-light-information-40)',
          50: 'var(--krds-color-light-information-50)',
          60: 'var(--krds-color-light-information-60)',
          70: 'var(--krds-color-light-information-70)',
          80: 'var(--krds-color-light-information-80)',
          90: 'var(--krds-color-light-information-90)',
          95: 'var(--krds-color-light-information-95)',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard GOV',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        // KRDS Typography Scale
        'krds-body-xs': ['13px', { lineHeight: '150%' }],
        'krds-body-sm': ['15px', { lineHeight: '150%' }],
        'krds-body-md': ['17px', { lineHeight: '150%' }],
        'krds-body-lg': ['19px', { lineHeight: '150%' }],

        'krds-title-xs': ['18px', { lineHeight: '140%', fontWeight: '700' }],
        'krds-title-sm': ['20px', { lineHeight: '140%', fontWeight: '700' }],
        'krds-title-md': ['24px', { lineHeight: '140%', fontWeight: '700' }],
        'krds-title-lg': ['28px', { lineHeight: '140%', fontWeight: '700' }],
        'krds-title-xl': ['32px', { lineHeight: '140%', fontWeight: '700' }],

        'krds-display-sm': ['32px', { lineHeight: '130%', fontWeight: '700' }],
        'krds-display-md': ['36px', { lineHeight: '130%', fontWeight: '700' }],
        'krds-display-lg': ['42px', { lineHeight: '130%', fontWeight: '700' }],
        'krds-display-xl': ['48px', { lineHeight: '130%', fontWeight: '700' }],
      },
      spacing: {
        // KRDS 8px grid system 추가 값
        '2.5': '10px',
        '4.5': '1.125rem', // 18px
        '12': '48px',
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
        '18': '4.5rem', // 72px
        '20': '80px',
        '22': '5.5rem', // 88px
        '26': '6.5rem', // 104px
        '30': '7.5rem', // 120px
      },
      maxWidth: {
        // KRDS Container Max Width
        'krds-xs': '360px',
        'krds-sm': '640px',
        'krds-md': '768px',
        'krds-lg': '1024px',
        'krds-xl': '1280px',
        'krds-2xl': '1536px',
      },
      borderRadius: {
        DEFAULT: '0.5rem', // 8px
      },
      keyframes: {
        slideDown: {
          from: {
            height: '0',
            opacity: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
        },
        slideUp: {
          from: {
            height: 'var(--radix-accordion-content-height)',
            opacity: '1',
          },
          to: {
            height: '0',
            opacity: '0',
          },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
};

export default hanUIPreset;
