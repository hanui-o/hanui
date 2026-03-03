import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
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
    // Typography classes (title/display만 - body는 text-xs/sm/base/lg 사용)
    'text-krds-title-xs',
    'text-krds-title-sm',
    'text-krds-title-md',
    'text-krds-title-lg',
    'text-krds-title-xl',
    'text-krds-display-sm',
    'text-krds-display-md',
    'text-krds-display-lg',
    'text-krds-display-xl',
    // Semantic color classes (danger/warning/success/info)
    {
      pattern:
        /^(text|bg|border)-krds-(danger|warning|success|info)-(5|10|20|30|40|50|60|70|80|90|95|base|surface|border|text|icon)$/,
    },
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
    typography,
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
