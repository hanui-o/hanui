import type { Config } from 'tailwindcss';
import hanUIPreset from '../../packages/react/tailwind.preset';

const config: Config = {
  presets: [hanUIPreset],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/react/dist/**/*.{js,mjs}',
  ],
  safelist: [
    // Tabs pills variant classes
    'bg-krds-gray-10',
    'bg-krds-secondary-80',
    'bg-krds-gray-20',
    'bg-krds-white',
    'flex-1',
    'rounded-lg',
    'rounded-md',
    'overflow-hidden',
    'border-r',
    'last:border-r-0',
    'p-1',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Docs-specific font (Krona One for headings)
      fontFamily: {
        krona: ['var(--font-krona-one)'],
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
