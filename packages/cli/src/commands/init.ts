import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import { logger } from '../utils/logger.js';
import {
  getProjectInfo,
  getDefaultPaths,
  getTailwindConfigPath,
  getDefaultCssPath,
} from '../utils/get-project-info.js';
import type { HanuiConfig, Framework } from '../types.js';

/**
 * 패키지 매니저 감지
 */
function detectPackageManager(cwd: string): 'pnpm' | 'yarn' | 'npm' {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

/**
 * 의존성 설치
 */
async function installDependencies(
  cwd: string,
  packages: string[],
  packageManager: 'pnpm' | 'yarn' | 'npm'
): Promise<void> {
  const args =
    packageManager === 'yarn' ? ['add', ...packages] : ['install', ...packages];

  await execa(packageManager, args, { cwd, stdio: 'pipe' });
}

/**
 * Tailwind 버전 감지 (v3 vs v4)
 */
async function detectTailwindVersion(cwd: string): Promise<3 | 4 | null> {
  const packageJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;

  const packageJson = await fs.readJSON(packageJsonPath);
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // v4 감지: @tailwindcss/postcss 또는 tailwindcss ^4.x
  if (deps['@tailwindcss/postcss']) {
    return 4;
  }

  // tailwindcss 버전 확인
  const tailwindVersion = deps['tailwindcss'];
  if (tailwindVersion) {
    // ^4, 4.x, ~4 등
    if (tailwindVersion.match(/^[\^~]?4/)) {
      return 4;
    }
    // ^3, 3.x, ~3 등
    if (tailwindVersion.match(/^[\^~]?3/)) {
      return 3;
    }
  }

  // postcss.config.mjs에서 @tailwindcss/postcss 확인
  const postcssConfigPath = path.join(cwd, 'postcss.config.mjs');
  if (fs.existsSync(postcssConfigPath)) {
    const postcssContent = await fs.readFile(postcssConfigPath, 'utf-8');
    if (postcssContent.includes('@tailwindcss/postcss')) {
      return 4;
    }
  }

  // tailwind.config 파일 존재 여부로 판단 (v4는 없음)
  const hasV3Config =
    fs.existsSync(path.join(cwd, 'tailwind.config.js')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.ts')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.mjs')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.cjs'));

  if (hasV3Config) {
    return 3;
  }

  return null;
}

/**
 * KRDS CSS Variables (variables.css 내용)
 */
const VARIABLES_CSS = `/**
 * HANUI Design System - CSS Variables
 * Korean Government Design System (KRDS) 기반 CSS 변수
 */

:root {
  --font-pretendard:
    'Pretendard GOV', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  /* Typography Base Font Size (KRDS 기준) */
  --base-font-size: 17px;

  /* ============================================
   * KRDS Typography - Font Sizes & Line Heights
   * ============================================ */

  /* Display (특대 제목) */
  --krds-display-xl: 48px;
  --krds-display-lg: 42px;
  --krds-display-md: 36px;
  --krds-display-sm: 32px;

  /* Title (제목) */
  --krds-title-xl: 32px;
  --krds-title-lg: 28px;
  --krds-title-md: 24px;
  --krds-title-sm: 20px;
  --krds-title-xs: 18px;

  /* Body (본문) */
  --krds-body-lg: 19px;
  --krds-body-md: 17px;
  --krds-body-sm: 15px;
  --krds-body-xs: 13px;

  /* Label (레이블) */
  --krds-label-lg: 17px;
  --krds-label-md: 15px;
  --krds-label-sm: 13px;
  --krds-label-xs: 11px;

  /* Line Heights */
  --krds-leading-display: 130%;
  --krds-leading-title: 140%;
  --krds-leading-body: 150%;
  --krds-leading-label: 140%;

  /* KRDS Spacing Variables */
  --krds-gap-2: 0.5rem;
  --krds-gap-3: 0.75rem;
  --krds-gap-4: 1rem;
  --krds-padding-2: 0.5rem;
  --krds-padding-3: 0.75rem;
  --krds-padding-4: 1rem;
  --krds-padding-5: 1.25rem;
  --krds-padding-6: 1.5rem;
  --krds-padding-8: 2rem;

  /* KRDS Container Variables */
  --krds-container-padding-mobile: 1rem;
  --krds-container-padding-tablet: 1.5rem;
  --krds-container-padding-desktop: 2rem;
  --krds-container-xl: 1280px;

  /* Base Colors */
  --krds-white: #ffffff;
  --krds-black: #000000;
  --color-white: #ffffff;
  --color-black: #000000;

  /* KRDS Color Tokens - Light Mode */
  /* Primary */
  --krds-color-light-primary-5: #ecf2fe;
  --krds-color-light-primary-10: #d8e5fd;
  --krds-color-light-primary-20: #b1cefb;
  --krds-color-light-primary-30: #86aff9;
  --krds-color-light-primary-40: #4c87f6;
  --krds-color-light-primary-50: #256ef4;
  --krds-color-light-primary-60: #0b50d0;
  --krds-color-light-primary-70: #083891;
  --krds-color-light-primary-80: #052561;
  --krds-color-light-primary-90: #03163a;
  --krds-color-light-primary-95: #020f27;

  /* Secondary */
  --krds-color-light-secondary-5: #eef2f7;
  --krds-color-light-secondary-10: #d6e0eb;
  --krds-color-light-secondary-20: #bacbde;
  --krds-color-light-secondary-30: #90b0d5;
  --krds-color-light-secondary-40: #6b96c7;
  --krds-color-light-secondary-50: #346fb2;
  --krds-color-light-secondary-60: #1c589c;
  --krds-color-light-secondary-70: #063a74;
  --krds-color-light-secondary-80: #052b57;
  --krds-color-light-secondary-90: #031f3f;
  --krds-color-light-secondary-95: #02162c;

  /* Gray */
  --krds-color-light-gray-0: #ffffff;
  --krds-color-light-gray-5: #f4f5f6;
  --krds-color-light-gray-10: #e6e8ea;
  --krds-color-light-gray-20: #cdd1d5;
  --krds-color-light-gray-30: #b1b8be;
  --krds-color-light-gray-40: #8a949e;
  --krds-color-light-gray-50: #6d7882;
  --krds-color-light-gray-60: #58616a;
  --krds-color-light-gray-70: #464c53;
  --krds-color-light-gray-80: #33363d;
  --krds-color-light-gray-90: #1e2124;
  --krds-color-light-gray-95: #131416;
  --krds-color-light-gray-100: #000000;

  /* Danger */
  --krds-color-light-danger-5: #fdefec;
  --krds-color-light-danger-10: #fcdfd9;
  --krds-color-light-danger-20: #f7afa1;
  --krds-color-light-danger-30: #f48771;
  --krds-color-light-danger-40: #f05f42;
  --krds-color-light-danger-50: #de3412;
  --krds-color-light-danger-60: #bd2c0f;
  --krds-color-light-danger-70: #8a240f;
  --krds-color-light-danger-80: #5c180a;
  --krds-color-light-danger-90: #390d05;
  --krds-color-light-danger-95: #260903;

  /* Warning */
  --krds-color-light-warning-5: #fff3db;
  --krds-color-light-warning-10: #ffe0a3;
  --krds-color-light-warning-20: #ffc95c;
  --krds-color-light-warning-30: #ffb114;
  --krds-color-light-warning-40: #c78500;
  --krds-color-light-warning-50: #9e6a00;
  --krds-color-light-warning-60: #8a5c00;
  --krds-color-light-warning-70: #614100;
  --krds-color-light-warning-80: #422c00;
  --krds-color-light-warning-90: #2e1f00;
  --krds-color-light-warning-95: #241800;

  /* Success */
  --krds-color-light-success-5: #eaf6ec;
  --krds-color-light-success-10: #d8eedd;
  --krds-color-light-success-20: #a9dab4;
  --krds-color-light-success-30: #7ec88e;
  --krds-color-light-success-40: #3fa654;
  --krds-color-light-success-50: #228738;
  --krds-color-light-success-60: #267337;
  --krds-color-light-success-70: #285d33;
  --krds-color-light-success-80: #1f4727;
  --krds-color-light-success-90: #122b18;
  --krds-color-light-success-95: #0e2012;

  /* Information */
  --krds-color-light-information-5: #e7f4fe;
  --krds-color-light-information-10: #d3ebfd;
  --krds-color-light-information-20: #9ed2fa;
  --krds-color-light-information-30: #5fb5f7;
  --krds-color-light-information-40: #2098f3;
  --krds-color-light-information-50: #0b78cb;
  --krds-color-light-information-60: #096ab3;
  --krds-color-light-information-70: #085691;
  --krds-color-light-information-80: #053961;
  --krds-color-light-information-90: #03253f;
  --krds-color-light-information-95: #021a2c;

  /* Accent */
  --krds-color-light-accent-5: #fbeff0;
  --krds-color-light-accent-10: #f5d6d9;
  --krds-color-light-accent-20: #ebadb2;
  --krds-color-light-accent-30: #e0858c;
  --krds-color-light-accent-40: #d65c66;
  --krds-color-light-accent-50: #d63d4a;
  --krds-color-light-accent-60: #ab2b36;
  --krds-color-light-accent-70: #7a1f26;
  --krds-color-light-accent-80: #521419;
  --krds-color-light-accent-90: #310c0f;
  --krds-color-light-accent-95: #21080a;

  /* Semantic Color Tokens */
  --krds-gray-text: var(--krds-color-light-gray-90);
  --krds-gray-surface: var(--krds-color-light-gray-5);
  --krds-gray-background: var(--krds-color-light-gray-0);
  --krds-gray-border: var(--krds-color-light-gray-20);

  --krds-primary-text: var(--krds-color-light-primary-60);
  --krds-primary-surface: var(--krds-color-light-primary-5);
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-primary-border: var(--krds-color-light-primary-20);

  --krds-secondary-text: var(--krds-color-light-secondary-80);
  --krds-secondary-surface: var(--krds-color-light-secondary-5);
  --krds-secondary-base: var(--krds-color-light-secondary-70);

  --krds-danger-icon: var(--krds-color-light-danger-50);
  --krds-danger-text: var(--krds-color-light-danger-60);
  --krds-danger-surface: var(--krds-color-light-danger-5);
  --krds-danger-base: var(--krds-color-light-danger-50);
  --krds-danger-border: var(--krds-color-light-danger-10);

  --krds-warning-icon: var(--krds-color-light-warning-50);
  --krds-warning-text: var(--krds-color-light-warning-60);
  --krds-warning-surface: var(--krds-color-light-warning-5);
  --krds-warning-base: var(--krds-color-light-warning-30);
  --krds-warning-border: var(--krds-color-light-warning-10);

  --krds-success-icon: var(--krds-color-light-success-50);
  --krds-success-text: var(--krds-color-light-success-60);
  --krds-success-surface: var(--krds-color-light-success-5);
  --krds-success-base: var(--krds-color-light-success-50);
  --krds-success-border: var(--krds-color-light-success-10);

  --krds-information-icon: var(--krds-color-light-information-50);
  --krds-information-text: var(--krds-color-light-information-60);
  --krds-information-surface: var(--krds-color-light-information-5);
  --krds-information-base: var(--krds-color-light-information-50);
  --krds-information-border: var(--krds-color-light-information-10);

  --krds-accent-text: var(--krds-color-light-accent-60);
  --krds-accent-surface: var(--krds-color-light-accent-5);
  --krds-accent-base: var(--krds-color-light-accent-50);
}

/* Dark Mode */
.dark {
  --krds-white: #000000;
  --krds-black: #ffffff;

  /* Gray - 반전 */
  --krds-color-light-gray-0: #000000;
  --krds-color-light-gray-5: #131416;
  --krds-color-light-gray-10: #1e2124;
  --krds-color-light-gray-20: #33363d;
  --krds-color-light-gray-30: #464c53;
  --krds-color-light-gray-40: #58616a;
  --krds-color-light-gray-50: #6d7882;
  --krds-color-light-gray-60: #8a949e;
  --krds-color-light-gray-70: #b1b8be;
  --krds-color-light-gray-80: #cdd1d5;
  --krds-color-light-gray-90: #e6e8ea;
  --krds-color-light-gray-95: #f4f5f6;
  --krds-color-light-gray-100: #ffffff;

  /* Semantic - Dark Mode */
  --krds-gray-text: var(--krds-color-light-gray-10);
  --krds-gray-surface: var(--krds-color-light-gray-95);
  --krds-gray-background: var(--krds-color-light-gray-100);
  --krds-gray-border: var(--krds-color-light-gray-80);
}
`;

/**
 * Tailwind v4용 @theme 블록
 * CSS 변수를 Tailwind 유틸리티로 매핑
 */
const TAILWIND_V4_THEME = `
@theme {
  /* Base Colors */
  --color-white: var(--color-white);
  --color-black: var(--color-black);
  --color-krds-white: var(--krds-white);
  --color-krds-black: var(--krds-black);

  /* KRDS Primary */
  --color-krds-primary: var(--krds-primary-base);
  --color-krds-primary-text: var(--krds-primary-text);
  --color-krds-primary-surface: var(--krds-primary-surface);
  --color-krds-primary-base: var(--krds-primary-base);
  --color-krds-primary-border: var(--krds-primary-border);
  --color-krds-primary-5: var(--krds-color-light-primary-5);
  --color-krds-primary-10: var(--krds-color-light-primary-10);
  --color-krds-primary-20: var(--krds-color-light-primary-20);
  --color-krds-primary-30: var(--krds-color-light-primary-30);
  --color-krds-primary-40: var(--krds-color-light-primary-40);
  --color-krds-primary-50: var(--krds-color-light-primary-50);
  --color-krds-primary-60: var(--krds-color-light-primary-60);
  --color-krds-primary-70: var(--krds-color-light-primary-70);
  --color-krds-primary-80: var(--krds-color-light-primary-80);
  --color-krds-primary-90: var(--krds-color-light-primary-90);
  --color-krds-primary-95: var(--krds-color-light-primary-95);

  /* KRDS Secondary */
  --color-krds-secondary: var(--krds-secondary-base);
  --color-krds-secondary-text: var(--krds-secondary-text);
  --color-krds-secondary-surface: var(--krds-secondary-surface);
  --color-krds-secondary-base: var(--krds-secondary-base);
  --color-krds-secondary-5: var(--krds-color-light-secondary-5);
  --color-krds-secondary-10: var(--krds-color-light-secondary-10);
  --color-krds-secondary-20: var(--krds-color-light-secondary-20);
  --color-krds-secondary-30: var(--krds-color-light-secondary-30);
  --color-krds-secondary-40: var(--krds-color-light-secondary-40);
  --color-krds-secondary-50: var(--krds-color-light-secondary-50);
  --color-krds-secondary-60: var(--krds-color-light-secondary-60);
  --color-krds-secondary-70: var(--krds-color-light-secondary-70);
  --color-krds-secondary-80: var(--krds-color-light-secondary-80);
  --color-krds-secondary-90: var(--krds-color-light-secondary-90);
  --color-krds-secondary-95: var(--krds-color-light-secondary-95);

  /* KRDS Gray */
  --color-krds-gray-text: var(--krds-gray-text);
  --color-krds-gray-surface: var(--krds-gray-surface);
  --color-krds-gray-background: var(--krds-gray-background);
  --color-krds-gray-border: var(--krds-gray-border);
  --color-krds-gray-0: var(--krds-color-light-gray-0);
  --color-krds-gray-5: var(--krds-color-light-gray-5);
  --color-krds-gray-10: var(--krds-color-light-gray-10);
  --color-krds-gray-20: var(--krds-color-light-gray-20);
  --color-krds-gray-30: var(--krds-color-light-gray-30);
  --color-krds-gray-40: var(--krds-color-light-gray-40);
  --color-krds-gray-50: var(--krds-color-light-gray-50);
  --color-krds-gray-60: var(--krds-color-light-gray-60);
  --color-krds-gray-70: var(--krds-color-light-gray-70);
  --color-krds-gray-80: var(--krds-color-light-gray-80);
  --color-krds-gray-90: var(--krds-color-light-gray-90);
  --color-krds-gray-95: var(--krds-color-light-gray-95);
  --color-krds-gray-100: var(--krds-color-light-gray-100);

  /* KRDS Danger */
  --color-krds-danger: var(--krds-danger-base);
  --color-krds-danger-icon: var(--krds-danger-icon);
  --color-krds-danger-text: var(--krds-danger-text);
  --color-krds-danger-surface: var(--krds-danger-surface);
  --color-krds-danger-base: var(--krds-danger-base);
  --color-krds-danger-border: var(--krds-danger-border);
  --color-krds-danger-5: var(--krds-color-light-danger-5);
  --color-krds-danger-10: var(--krds-color-light-danger-10);
  --color-krds-danger-20: var(--krds-color-light-danger-20);
  --color-krds-danger-30: var(--krds-color-light-danger-30);
  --color-krds-danger-40: var(--krds-color-light-danger-40);
  --color-krds-danger-50: var(--krds-color-light-danger-50);
  --color-krds-danger-60: var(--krds-color-light-danger-60);
  --color-krds-danger-70: var(--krds-color-light-danger-70);
  --color-krds-danger-80: var(--krds-color-light-danger-80);
  --color-krds-danger-90: var(--krds-color-light-danger-90);
  --color-krds-danger-95: var(--krds-color-light-danger-95);

  /* KRDS Warning */
  --color-krds-warning: var(--krds-warning-base);
  --color-krds-warning-icon: var(--krds-warning-icon);
  --color-krds-warning-text: var(--krds-warning-text);
  --color-krds-warning-surface: var(--krds-warning-surface);
  --color-krds-warning-base: var(--krds-warning-base);
  --color-krds-warning-border: var(--krds-warning-border);
  --color-krds-warning-5: var(--krds-color-light-warning-5);
  --color-krds-warning-10: var(--krds-color-light-warning-10);
  --color-krds-warning-20: var(--krds-color-light-warning-20);
  --color-krds-warning-30: var(--krds-color-light-warning-30);
  --color-krds-warning-40: var(--krds-color-light-warning-40);
  --color-krds-warning-50: var(--krds-color-light-warning-50);
  --color-krds-warning-60: var(--krds-color-light-warning-60);
  --color-krds-warning-70: var(--krds-color-light-warning-70);
  --color-krds-warning-80: var(--krds-color-light-warning-80);
  --color-krds-warning-90: var(--krds-color-light-warning-90);
  --color-krds-warning-95: var(--krds-color-light-warning-95);

  /* KRDS Success */
  --color-krds-success: var(--krds-success-base);
  --color-krds-success-icon: var(--krds-success-icon);
  --color-krds-success-text: var(--krds-success-text);
  --color-krds-success-surface: var(--krds-success-surface);
  --color-krds-success-base: var(--krds-success-base);
  --color-krds-success-border: var(--krds-success-border);
  --color-krds-success-5: var(--krds-color-light-success-5);
  --color-krds-success-10: var(--krds-color-light-success-10);
  --color-krds-success-20: var(--krds-color-light-success-20);
  --color-krds-success-30: var(--krds-color-light-success-30);
  --color-krds-success-40: var(--krds-color-light-success-40);
  --color-krds-success-50: var(--krds-color-light-success-50);
  --color-krds-success-60: var(--krds-color-light-success-60);
  --color-krds-success-70: var(--krds-color-light-success-70);
  --color-krds-success-80: var(--krds-color-light-success-80);
  --color-krds-success-90: var(--krds-color-light-success-90);
  --color-krds-success-95: var(--krds-color-light-success-95);

  /* KRDS Info */
  --color-krds-info: var(--krds-information-base);
  --color-krds-info-icon: var(--krds-information-icon);
  --color-krds-info-text: var(--krds-information-text);
  --color-krds-info-surface: var(--krds-information-surface);
  --color-krds-info-base: var(--krds-information-base);
  --color-krds-info-border: var(--krds-information-border);
  --color-krds-info-5: var(--krds-color-light-information-5);
  --color-krds-info-10: var(--krds-color-light-information-10);
  --color-krds-info-20: var(--krds-color-light-information-20);
  --color-krds-info-30: var(--krds-color-light-information-30);
  --color-krds-info-40: var(--krds-color-light-information-40);
  --color-krds-info-50: var(--krds-color-light-information-50);
  --color-krds-info-60: var(--krds-color-light-information-60);
  --color-krds-info-70: var(--krds-color-light-information-70);
  --color-krds-info-80: var(--krds-color-light-information-80);
  --color-krds-info-90: var(--krds-color-light-information-90);
  --color-krds-info-95: var(--krds-color-light-information-95);

  /* KRDS Accent */
  --color-krds-accent: var(--krds-accent-base);
  --color-krds-accent-text: var(--krds-accent-text);
  --color-krds-accent-surface: var(--krds-accent-surface);
  --color-krds-accent-base: var(--krds-accent-base);
  --color-krds-accent-5: var(--krds-color-light-accent-5);
  --color-krds-accent-10: var(--krds-color-light-accent-10);
  --color-krds-accent-20: var(--krds-color-light-accent-20);
  --color-krds-accent-30: var(--krds-color-light-accent-30);
  --color-krds-accent-40: var(--krds-color-light-accent-40);
  --color-krds-accent-50: var(--krds-color-light-accent-50);
  --color-krds-accent-60: var(--krds-color-light-accent-60);
  --color-krds-accent-70: var(--krds-color-light-accent-70);
  --color-krds-accent-80: var(--krds-color-light-accent-80);
  --color-krds-accent-90: var(--krds-color-light-accent-90);
  --color-krds-accent-95: var(--krds-color-light-accent-95);

  /* Font Family */
  --font-sans: 'Pretendard GOV', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

  /* Font Sizes - KRDS Typography */
  --text-krds-body-xs: 13px;
  --text-krds-body-sm: 15px;
  --text-krds-body-md: 17px;
  --text-krds-body-lg: 19px;
  --text-krds-title-xs: 18px;
  --text-krds-title-sm: 20px;
  --text-krds-title-md: 24px;
  --text-krds-title-lg: 28px;
  --text-krds-title-xl: 32px;
  --text-krds-display-sm: 32px;
  --text-krds-display-md: 36px;
  --text-krds-display-lg: 42px;
  --text-krds-display-xl: 48px;
}
`;

/**
 * Tailwind Preset 내용
 */
const TAILWIND_PRESET = `/**
 * HANUI Tailwind Preset
 * KRDS(Korean Government Design System) 기반 Tailwind 설정
 */
const hanUIPreset = {
  theme: {
    extend: {
      colors: {
        white: 'var(--color-white)',
        black: 'var(--color-black)',
        'krds-white': { DEFAULT: 'var(--krds-white)' },
        'krds-black': { DEFAULT: 'var(--krds-black)' },
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
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
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
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
};

module.exports = hanUIPreset;
`;

/**
 * Init Command
 *
 * Initializes a project for HANUI components
 * Usage: npx @hanui/cli init
 */
export const init = new Command()
  .name('init')
  .description('Initialize your project for HANUI')
  .option('-y, --yes', 'skip confirmation and use defaults')
  .option('-f, --framework <framework>', 'framework to use (react or vue)')
  .action(async (options) => {
    try {
      const cwd = process.cwd();

      logger.info('Initializing HANUI in your project...\n');

      // Check if package.json exists
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        logger.error(
          'package.json not found. Make sure you are in a valid project directory.'
        );
        process.exit(1);
      }

      // Detect project structure (like shadcn/ui)
      const projectInfo = await getProjectInfo(cwd);
      const defaultPaths = getDefaultPaths(projectInfo);
      const tailwindConfigPath = await getTailwindConfigPath(cwd);
      const cssPath = await getDefaultCssPath(cwd, projectInfo);

      // Detect Tailwind version (v3 vs v4)
      const tailwindVersion = await detectTailwindVersion(cwd);

      // Determine framework (from option or auto-detect)
      const framework: Framework =
        (options.framework as Framework) || projectInfo.framework;

      logger.info(
        `Detected: ${chalk.cyan(projectInfo.type)} ${projectInfo.srcDir ? chalk.dim('(with src/)') : ''} ${chalk.dim(`[${framework}]`)}`
      );

      if (tailwindVersion) {
        logger.info(`Tailwind CSS: ${chalk.cyan(`v${tailwindVersion}`)}\n`);
      }

      // Check if Tailwind CSS is installed
      if (!tailwindVersion) {
        // v4 확인: globals.css에서 @import "tailwindcss" 체크
        const globalsCssPath = path.join(cwd, cssPath);
        let hasV4InCss = false;
        if (fs.existsSync(globalsCssPath)) {
          const cssContent = await fs.readFile(globalsCssPath, 'utf-8');
          hasV4InCss =
            cssContent.includes('@import "tailwindcss"') ||
            cssContent.includes("@import 'tailwindcss'");
        }

        if (!hasV4InCss) {
          const hasTailwindConfig = fs.existsSync(
            path.join(cwd, tailwindConfigPath)
          );
          if (!hasTailwindConfig) {
            logger.warning(
              'Tailwind CSS not detected. Please install Tailwind CSS first:\n'
            );
            console.log(chalk.dim('  For Tailwind v4 (recommended):'));
            console.log(
              chalk.dim('    npm install -D tailwindcss @tailwindcss/postcss')
            );
            console.log(chalk.dim('\n  For Tailwind v3:'));
            console.log(
              chalk.dim('    npm install -D tailwindcss@3 postcss autoprefixer')
            );
            console.log(chalk.dim('    npx tailwindcss init -p\n'));
            logger.info('Then run this command again.\n');
            process.exit(1);
          }
        }
      }

      const isV4 = tailwindVersion === 4;

      // Prompt for configuration
      let config = {
        componentsPath: path.join(defaultPaths.components, 'hanui'),
        utilsPath: defaultPaths.utils,
        tailwindConfig: tailwindConfigPath,
        tailwindCss: true,
      };

      if (!options.yes) {
        const response = await prompts([
          {
            type: 'text',
            name: 'componentsPath',
            message: 'Where would you like to install components?',
            initial: config.componentsPath,
          },
          {
            type: 'text',
            name: 'utilsPath',
            message: 'Configure the import alias for utils:',
            initial: config.utilsPath,
          },
        ]);

        if (response.componentsPath)
          config.componentsPath = response.componentsPath;
        if (response.utilsPath) config.utilsPath = response.utilsPath;
      }

      const spinner = ora('Setting up project...').start();

      // 1. Create directories
      const componentsDir = path.join(cwd, config.componentsPath);
      const libPath = config.utilsPath.replace('@/', '').replace('/utils', '');
      const libDir = path.join(
        cwd,
        projectInfo.srcDir ? `src/${libPath}` : libPath
      );

      await fs.ensureDir(componentsDir);
      await fs.ensureDir(libDir);
      spinner.text = 'Created directories';

      // 2. Create utils.ts
      const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

      const utilsFilePath = path.join(libDir, 'utils.ts');
      await fs.writeFile(utilsFilePath, utilsContent);
      spinner.text = 'Created utility functions';

      // 3. Create variables.css (KRDS 디자인 토큰)
      // cssPath 기준으로 styles 폴더 위치 결정
      // 예: app/globals.css → styles/, src/app/globals.css → src/styles/, src/index.css → src/styles/
      const cssDir = path.dirname(cssPath); // app 또는 src/app 또는 src
      const cssBaseDir =
        cssDir === 'src' || cssDir.startsWith('src/') ? 'src' : '';
      const stylesDir = cssBaseDir
        ? path.join(cwd, cssBaseDir, 'styles')
        : path.join(cwd, 'styles');
      await fs.ensureDir(stylesDir);

      const variablesCssPath = path.join(stylesDir, 'variables.css');
      await fs.writeFile(variablesCssPath, VARIABLES_CSS);
      spinner.text = 'Created KRDS design tokens (variables.css)';

      // v3/v4 분기 처리
      if (isV4) {
        // ===== Tailwind v4 설정 =====
        spinner.text = 'Configuring for Tailwind v4...';

        // v4: globals.css에 CSS 변수 import + @theme 블록 추가
        const globalsCssPath = path.join(cwd, cssPath);
        // cssPath가 app/ 또는 src/app/ 안에 있으면 ../styles/, 그 외에는 ./styles/
        const isInAppDir =
          cssPath.includes('/app/') || cssPath.startsWith('app/');
        const importPath = isInAppDir
          ? '../styles/variables.css'
          : './styles/variables.css';

        if (fs.existsSync(globalsCssPath)) {
          let globalsContent = await fs.readFile(globalsCssPath, 'utf-8');

          // variables.css import 추가 (이미 없으면)
          if (!globalsContent.includes('variables.css')) {
            // @import "tailwindcss" 바로 뒤에 추가
            if (globalsContent.includes('@import "tailwindcss"')) {
              globalsContent = globalsContent.replace(
                '@import "tailwindcss"',
                `@import "tailwindcss";\n@import "${importPath}"`
              );
            } else if (globalsContent.includes("@import 'tailwindcss'")) {
              globalsContent = globalsContent.replace(
                "@import 'tailwindcss'",
                `@import 'tailwindcss';\n@import '${importPath}'`
              );
            } else {
              // @import "tailwindcss"가 없으면 맨 앞에 추가
              globalsContent = `@import "${importPath}";\n\n${globalsContent}`;
            }
          }

          // @theme 블록 추가 (이미 없으면)
          if (!globalsContent.includes('@theme {')) {
            globalsContent = globalsContent + TAILWIND_V4_THEME;
          }

          await fs.writeFile(globalsCssPath, globalsContent);
          spinner.text = 'Updated globals.css with KRDS imports + @theme (v4)';
        } else {
          // globals.css가 없으면 생성 (v4 형식)
          const newGlobalsContent = `@import "tailwindcss";
@import "${importPath}";
${TAILWIND_V4_THEME}`;
          await fs.ensureDir(path.dirname(globalsCssPath));
          await fs.writeFile(globalsCssPath, newGlobalsContent);
          spinner.text = 'Created globals.css (v4)';
        }

        spinner.text = 'Tailwind v4 configured (CSS-based with @theme)';
      } else {
        // ===== Tailwind v3 설정 =====

        // 4. Create hanui.preset.js (Tailwind preset)
        const presetPath = path.join(cwd, 'hanui.preset.js');
        await fs.writeFile(presetPath, TAILWIND_PRESET);
        spinner.text = 'Created Tailwind preset';

        // 5. Update tailwind.config (자동 수정)
        const tailwindConfigFullPath = path.join(cwd, tailwindConfigPath);
        if (fs.existsSync(tailwindConfigFullPath)) {
          let tailwindContent = await fs.readFile(
            tailwindConfigFullPath,
            'utf-8'
          );

          // preset 추가 여부 확인 (import와 presets 배열 모두 체크)
          const hasPresetImport = tailwindContent.includes('hanui.preset');
          const hasPresetsArray =
            tailwindContent.includes('presets:') ||
            tailwindContent.includes('presets :');

          if (!hasPresetImport || !hasPresetsArray) {
            // 기존 tailwind.config 수정
            if (tailwindContent.includes('export default')) {
              // ESM 형식 - import 추가 (없으면)
              if (!hasPresetImport) {
                tailwindContent = `import hanUIPreset from './hanui.preset.js';\n\n${tailwindContent}`;
              }
              // presets 배열 추가 (없으면)
              if (!hasPresetsArray) {
                // 두 가지 형식 지원:
                // 1. export default { ... } - 직접 객체 export
                // 2. const config = { ... }; export default config; - 변수 선언 후 export
                if (tailwindContent.match(/export default\s*\{/)) {
                  tailwindContent = tailwindContent.replace(
                    /export default\s*\{/,
                    'export default {\n  presets: [hanUIPreset],'
                  );
                } else {
                  // const config: Config = { ... } 또는 const config = { ... } 형식
                  tailwindContent = tailwindContent.replace(
                    /(const\s+\w+\s*(?::\s*\w+)?\s*=\s*)\{/,
                    '$1{\n  presets: [hanUIPreset],'
                  );
                }
              }
            } else if (tailwindContent.includes('module.exports')) {
              // CommonJS 형식 - require 추가 (없으면)
              if (!hasPresetImport) {
                tailwindContent = `const hanUIPreset = require('./hanui.preset.js');\n\n${tailwindContent}`;
              }
              // presets 배열 추가 (없으면)
              if (!hasPresetsArray) {
                tailwindContent = tailwindContent.replace(
                  /module\.exports\s*=\s*\{/,
                  'module.exports = {\n  presets: [hanUIPreset],'
                );
              }
            }

            // content 배열에 hanui 경로 추가
            if (!tailwindContent.includes('hanui')) {
              tailwindContent = tailwindContent.replace(
                /content:\s*\[/,
                `content: [\n    './${config.componentsPath}/**/*.{js,ts,jsx,tsx}',`
              );
            }

            await fs.writeFile(tailwindConfigFullPath, tailwindContent);
            spinner.text = 'Updated Tailwind config';
          }
        }

        // 6. Update globals.css (CSS 변수 import 추가)
        const globalsCssPath = path.join(cwd, cssPath);
        if (fs.existsSync(globalsCssPath)) {
          let globalsContent = await fs.readFile(globalsCssPath, 'utf-8');

          // variables.css import 추가 (이미 없으면)
          // cssPath가 app/ 또는 src/app/ 안에 있으면 ../styles/
          const isInAppDir =
            cssPath.includes('/app/') || cssPath.startsWith('app/');
          const importPath = isInAppDir
            ? '../styles/variables.css'
            : './styles/variables.css';

          if (!globalsContent.includes('variables.css')) {
            globalsContent = `@import '${importPath}';\n\n${globalsContent}`;
            await fs.writeFile(globalsCssPath, globalsContent);
            spinner.text = 'Updated globals.css with KRDS imports';
          }
        } else {
          // globals.css가 없으면 생성
          const isInAppDir =
            cssPath.includes('/app/') || cssPath.startsWith('app/');
          const importPath = isInAppDir
            ? '../styles/variables.css'
            : './styles/variables.css';
          const newGlobalsContent = `@import '${importPath}';

@tailwind base;
@tailwind components;
@tailwind utilities;
`;
          await fs.ensureDir(path.dirname(globalsCssPath));
          await fs.writeFile(globalsCssPath, newGlobalsContent);
          spinner.text = 'Created globals.css';
        }
      }

      // 7. Create hanui.json config
      const hanuiConfig: HanuiConfig = {
        $schema: 'https://hanui.io/schema.json',
        style: 'default',
        framework,
        tailwind: {
          config: isV4 ? '' : config.tailwindConfig,
          css: cssPath,
          baseColor: 'slate',
          cssVariables: true,
          version: isV4 ? 4 : 3,
        },
        aliases: {
          components: `@/${config.componentsPath.replace(/^src\//, '')}`,
          utils: config.utilsPath,
          ui: `@/${config.componentsPath.replace(/^src\//, '')}`,
          lib: `@/${libPath}`,
        },
      };

      const hanuiConfigPath = path.join(cwd, 'hanui.json');
      await fs.writeJSON(hanuiConfigPath, hanuiConfig, { spaces: 2 });
      spinner.text = 'Created configuration file';

      spinner.succeed('Project initialized!');

      // 패키지 매니저 감지 및 의존성 자동 설치
      const packageManager = detectPackageManager(cwd);
      const depsToInstall = ['clsx', 'tailwind-merge'];

      spinner.start(`Installing dependencies with ${packageManager}...`);
      try {
        await installDependencies(cwd, depsToInstall, packageManager);
        spinner.succeed(`Dependencies installed (${depsToInstall.join(', ')})`);
      } catch {
        spinner.warn(
          `Could not auto-install dependencies. Please run manually:\n  ${packageManager} ${packageManager === 'yarn' ? 'add' : 'install'} ${depsToInstall.join(' ')}`
        );
      }

      // Success message
      const frameworkLabel = framework === 'vue' ? 'Vue' : 'React';
      logger.success(
        `\n✓ HANUI initialized successfully! (${frameworkLabel} + Tailwind ${isV4 ? 'v4' : 'v3'})\n`
      );

      console.log(chalk.dim('  Created files:'));
      console.log(
        chalk.dim(
          `    - ${projectInfo.srcDir ? 'src/' : ''}styles/variables.css`
        )
      );
      if (!isV4) {
        console.log(chalk.dim('    - hanui.preset.js'));
      }
      console.log(chalk.dim(`    - ${libPath}/utils.ts`));
      console.log(chalk.dim('    - hanui.json\n'));

      console.log(chalk.dim('  Updated files:'));
      if (!isV4) {
        console.log(chalk.dim(`    - ${tailwindConfigPath}`));
      }
      console.log(chalk.dim(`    - ${cssPath}\n`));

      logger.info('Next steps:\n');
      const addCommand =
        framework === 'vue'
          ? 'npx hanui add button -f vue'
          : 'npx hanui add button';
      console.log(
        `  ${chalk.cyan('1.')} Add components: ${chalk.bold(addCommand)}`
      );
      console.log(
        `  ${chalk.cyan('2.')} Start building: ${chalk.bold(`${packageManager} run dev`)}\n`
      );
    } catch (error) {
      logger.error('Failed to initialize project');
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  });
