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
        primary: {
          5: '#f0f5ff',
          10: '#e0ebff',
          20: '#c2d7ff',
          30: '#a3c3ff',
          40: '#85afff',
          50: '#669bff',
          60: '#256ef4',
          70: '#0b50d0',
          80: '#0040a8',
          90: '#003080',
          95: '#002058',
        },
        // KRDS Gray Scale
        gray: {
          5: '#f9fafb',
          10: '#f3f4f6',
          20: '#e5e7eb',
          30: '#d1d5db',
          40: '#9ca3af',
          50: '#6b7280',
          60: '#4b5563',
          70: '#374151',
          80: '#1f2937',
          90: '#111827',
          95: '#030712',
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
