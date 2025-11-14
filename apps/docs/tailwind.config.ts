import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        krona: ['var(--font-krona-one)'],
      },
      fontSize: {
        // KRDS Typography Scale
        'body-xs': ['13px', { lineHeight: '150%' }],
        'body-sm': ['15px', { lineHeight: '150%' }],
        'body-md': ['17px', { lineHeight: '150%' }], // 기본값
        'body-lg': ['19px', { lineHeight: '150%' }],

        'heading-xs': ['17px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-sm': ['19px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-md': ['24px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-lg': ['32px', { lineHeight: '150%', fontWeight: '700' }],
        'heading-xl': ['40px', { lineHeight: '150%', fontWeight: '700' }],

        'display-sm': ['36px', { lineHeight: '150%', fontWeight: '700' }],
        'display-md': ['44px', { lineHeight: '150%', fontWeight: '700' }],
        'display-lg': ['60px', { lineHeight: '150%', fontWeight: '700' }],

        // Override Tailwind default font sizes to KRDS
        base: ['17px', { lineHeight: '150%' }], // KRDS 기본 (기존 16px → 17px)
      },
      spacing: {
        // KRDS Spacing (8-point grid)
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px', // gap-2 (기존 Tailwind와 동일)
        '2.5': '10px', // gap-2.5 (KRDS 추가)
        '3': '12px', // gap-3 (기존 Tailwind와 동일)
        '4': '16px', // gap-4 (기존 Tailwind와 동일)
        '5': '20px', // gap-5 (기존 Tailwind와 동일)
        '6': '24px', // gap-6 (기존 Tailwind와 동일)
        '7': '28px', // gap-7 (기존 Tailwind와 동일)
        '8': '32px', // gap-8 (기존 Tailwind와 동일)
        '10': '40px', // gap-10 (기존 Tailwind와 동일)
        '12': '48px', // gap-12 (KRDS 추가)
        '16': '64px', // gap-16 (기존 Tailwind와 동일)
        '20': '80px', // gap-20 (KRDS 추가)
      },
      colors: {
        // KRDS Primary Colors
        // 참고: CSS 변수 사용 - 라이트/다크 모드 자동 대응
        primary: {
          DEFAULT: 'var(--krds-color-light-primary-60)',
          // KRDS 스케일 (5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95)
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
          // Tailwind 호환 스케일 추가 (100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
          100: 'var(--krds-color-light-primary-10)',
          200: 'var(--krds-color-light-primary-20)',
          300: 'var(--krds-color-light-primary-30)',
          400: 'var(--krds-color-light-primary-40)',
          500: 'var(--krds-color-light-primary-50)',
          600: 'var(--krds-color-light-primary-60)',
          700: 'var(--krds-color-light-primary-70)',
          800: 'var(--krds-color-light-primary-80)',
          900: 'var(--krds-color-light-primary-90)',
          950: 'var(--krds-color-light-primary-95)',
        },
        // KRDS Secondary Colors
        secondary: {
          DEFAULT: 'var(--krds-color-light-secondary-60)',
          // KRDS 스케일
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
          // Tailwind 호환 스케일
          100: 'var(--krds-color-light-secondary-10)',
          200: 'var(--krds-color-light-secondary-20)',
          300: 'var(--krds-color-light-secondary-30)',
          400: 'var(--krds-color-light-secondary-40)',
          500: 'var(--krds-color-light-secondary-50)',
          600: 'var(--krds-color-light-secondary-60)',
          700: 'var(--krds-color-light-secondary-70)',
          800: 'var(--krds-color-light-secondary-80)',
          900: 'var(--krds-color-light-secondary-90)',
          950: 'var(--krds-color-light-secondary-95)',
        },
        // KRDS Gray Scale
        gray: {
          // KRDS 스케일 (5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95)
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
          // Tailwind 호환 스케일 (100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
          100: 'var(--krds-color-light-gray-10)',
          200: 'var(--krds-color-light-gray-20)',
          300: 'var(--krds-color-light-gray-30)',
          400: 'var(--krds-color-light-gray-40)',
          500: 'var(--krds-color-light-gray-50)',
          600: 'var(--krds-color-light-gray-60)',
          700: 'var(--krds-color-light-gray-70)',
          800: 'var(--krds-color-light-gray-80)',
          900: 'var(--krds-color-light-gray-90)',
          950: 'var(--krds-color-light-gray-95)',
        },
        // KRDS Danger Colors
        danger: {
          DEFAULT: 'var(--krds-color-light-danger-60)',
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
          // Tailwind 호환
          100: 'var(--krds-color-light-danger-10)',
          200: 'var(--krds-color-light-danger-20)',
          300: 'var(--krds-color-light-danger-30)',
          400: 'var(--krds-color-light-danger-40)',
          500: 'var(--krds-color-light-danger-50)',
          600: 'var(--krds-color-light-danger-60)',
          700: 'var(--krds-color-light-danger-70)',
          800: 'var(--krds-color-light-danger-80)',
          900: 'var(--krds-color-light-danger-90)',
          950: 'var(--krds-color-light-danger-95)',
        },
        // KRDS Warning Colors
        warning: {
          DEFAULT: 'var(--krds-color-light-warning-60)',
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
          // Tailwind 호환
          100: 'var(--krds-color-light-warning-10)',
          200: 'var(--krds-color-light-warning-20)',
          300: 'var(--krds-color-light-warning-30)',
          400: 'var(--krds-color-light-warning-40)',
          500: 'var(--krds-color-light-warning-50)',
          600: 'var(--krds-color-light-warning-60)',
          700: 'var(--krds-color-light-warning-70)',
          800: 'var(--krds-color-light-warning-80)',
          900: 'var(--krds-color-light-warning-90)',
          950: 'var(--krds-color-light-warning-95)',
        },
        // KRDS Success Colors
        success: {
          DEFAULT: 'var(--krds-color-light-success-60)',
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
          // Tailwind 호환
          100: 'var(--krds-color-light-success-10)',
          200: 'var(--krds-color-light-success-20)',
          300: 'var(--krds-color-light-success-30)',
          400: 'var(--krds-color-light-success-40)',
          500: 'var(--krds-color-light-success-50)',
          600: 'var(--krds-color-light-success-60)',
          700: 'var(--krds-color-light-success-70)',
          800: 'var(--krds-color-light-success-80)',
          900: 'var(--krds-color-light-success-90)',
          950: 'var(--krds-color-light-success-95)',
        },
        // KRDS Information Colors
        information: {
          DEFAULT: 'var(--krds-color-light-information-60)',
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
          // Tailwind 호환
          100: 'var(--krds-color-light-information-10)',
          200: 'var(--krds-color-light-information-20)',
          300: 'var(--krds-color-light-information-30)',
          400: 'var(--krds-color-light-information-40)',
          500: 'var(--krds-color-light-information-50)',
          600: 'var(--krds-color-light-information-60)',
          700: 'var(--krds-color-light-information-70)',
          800: 'var(--krds-color-light-information-80)',
          900: 'var(--krds-color-light-information-90)',
          950: 'var(--krds-color-light-information-95)',
        },
        // KRDS Point Colors
        point: {
          DEFAULT: 'var(--krds-color-light-point-60)',
          5: 'var(--krds-color-light-point-5)',
          10: 'var(--krds-color-light-point-10)',
          20: 'var(--krds-color-light-point-20)',
          30: 'var(--krds-color-light-point-30)',
          40: 'var(--krds-color-light-point-40)',
          50: 'var(--krds-color-light-point-50)',
          60: 'var(--krds-color-light-point-60)',
          70: 'var(--krds-color-light-point-70)',
          80: 'var(--krds-color-light-point-80)',
          90: 'var(--krds-color-light-point-90)',
          95: 'var(--krds-color-light-point-95)',
          // Tailwind 호환
          100: 'var(--krds-color-light-point-10)',
          200: 'var(--krds-color-light-point-20)',
          300: 'var(--krds-color-light-point-30)',
          400: 'var(--krds-color-light-point-40)',
          500: 'var(--krds-color-light-point-50)',
          600: 'var(--krds-color-light-point-60)',
          700: 'var(--krds-color-light-point-70)',
          800: 'var(--krds-color-light-point-80)',
          900: 'var(--krds-color-light-point-90)',
          950: 'var(--krds-color-light-point-95)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

export default config;
