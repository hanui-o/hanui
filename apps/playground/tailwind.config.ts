import type { Config } from 'tailwindcss';
import krdsPreset from '@hanui/react/preset';

const config: Config = {
  presets: [krdsPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
