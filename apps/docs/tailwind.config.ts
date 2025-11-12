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
  plugins: [],
};

export default config;
