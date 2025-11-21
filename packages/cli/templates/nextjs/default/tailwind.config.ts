import type { Config } from 'tailwindcss';
import krdsPreset from '@hanui/react/preset';

const config: Config = {
  presets: [krdsPreset],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@hanui/react/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
