import type { Config } from 'tailwindcss';
import hanUIPreset from './packages/react/tailwind.preset';

/**
 * Root Tailwind Config
 *
 * 이 파일은 monorepo 전체를 위한 기본 설정입니다.
 * 모든 KRDS 설정은 packages/react/tailwind.preset.ts에서 관리됩니다.
 *
 * 각 앱별 커스터마이징:
 * - apps/docs/tailwind.config.ts: 문서 사이트 전용 설정
 */
const config: Config = {
  presets: [hanUIPreset],
  content: [
    './packages/react/src/**/*.{ts,tsx}',
    './apps/docs/src/**/*.{ts,tsx}',
  ],
  plugins: [],
};

export default config;
