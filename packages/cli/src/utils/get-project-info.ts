import path from 'path';
import fs from 'fs-extra';
import type { ProjectType, Framework } from '../types.js';

interface ProjectInfo {
  type: ProjectType;
  srcDir: boolean;
  appDir: boolean;
  pagesDir: boolean;
  framework: Framework;
}

/**
 * Detect project type and structure
 * Similar to shadcn/ui's getProjectInfo
 */
export async function getProjectInfo(cwd: string): Promise<ProjectInfo> {
  const srcDir = await fs.pathExists(path.resolve(cwd, 'src'));

  // Check for Next.js App Router
  const appDir = await fs.pathExists(
    path.resolve(cwd, `${srcDir ? 'src/' : ''}app`)
  );

  // Check for Next.js Pages Router
  const pagesDir = await fs.pathExists(
    path.resolve(cwd, `${srcDir ? 'src/' : ''}pages`)
  );

  // Check for Vite
  const isVite = await fs.pathExists(path.resolve(cwd, 'vite.config.ts'));
  const isViteJs = await fs.pathExists(path.resolve(cwd, 'vite.config.js'));

  // Check for Nuxt
  const isNuxt =
    (await fs.pathExists(path.resolve(cwd, 'nuxt.config.ts'))) ||
    (await fs.pathExists(path.resolve(cwd, 'nuxt.config.js')));

  // Check for Vue (detect by package.json)
  let isVue = false;
  const packageJsonPath = path.resolve(cwd, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJSON(packageJsonPath);
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };
    isVue = !!deps['vue'];
  }

  let type: ProjectType = 'unknown';
  let framework: Framework = 'react';

  // Vue/Nuxt detection first
  if (isNuxt && srcDir) {
    type = 'nuxt-src';
    framework = 'vue';
  } else if (isNuxt) {
    type = 'nuxt';
    framework = 'vue';
  } else if (isVue && (isVite || isViteJs) && srcDir) {
    type = 'vue-src';
    framework = 'vue';
  } else if (isVue && (isVite || isViteJs)) {
    type = 'vue';
    framework = 'vue';
  } else if (appDir && srcDir) {
    type = 'next-app-src';
  } else if (appDir && !srcDir) {
    type = 'next-app';
  } else if (pagesDir && srcDir) {
    type = 'next-pages-src';
  } else if (pagesDir && !srcDir) {
    type = 'next-pages';
  } else if ((isVite || isViteJs) && srcDir) {
    type = 'vite-src';
  } else if (isVite || isViteJs) {
    type = 'vite';
  }

  return {
    type,
    srcDir,
    appDir,
    pagesDir,
    framework,
  };
}

/**
 * Get default paths based on project type
 */
export function getDefaultPaths(projectInfo: ProjectInfo) {
  const { srcDir } = projectInfo;

  return {
    components: srcDir ? 'src/components' : 'components',
    lib: srcDir ? 'src/lib' : 'lib',
    utils: srcDir ? '@/lib/utils' : '@/lib/utils',
    ui: srcDir ? '@/components/hanui' : '@/components/hanui',
  };
}

/**
 * Get default Tailwind config path
 */
export async function getTailwindConfigPath(cwd: string): Promise<string> {
  const tailwindConfigTs = path.resolve(cwd, 'tailwind.config.ts');
  const tailwindConfigJs = path.resolve(cwd, 'tailwind.config.js');

  if (await fs.pathExists(tailwindConfigTs)) {
    return 'tailwind.config.ts';
  }

  if (await fs.pathExists(tailwindConfigJs)) {
    return 'tailwind.config.js';
  }

  return 'tailwind.config.js';
}

/**
 * Get default CSS file path
 */
export async function getDefaultCssPath(
  cwd: string,
  projectInfo: ProjectInfo
): Promise<string> {
  const { srcDir, framework, type } = projectInfo;

  // 실제 존재하는 파일을 우선 순위대로 확인
  const possiblePaths = [
    // Nuxt
    'assets/css/main.css',
    'assets/css/tailwind.css',
    'assets/main.css',
    // Next.js App Router
    'src/app/globals.css',
    'app/globals.css',
    // Next.js Pages or general
    'src/styles/globals.css',
    'styles/globals.css',
    // Vite/Vue default
    'src/assets/main.css',
    'src/style.css',
    'src/index.css',
    'index.css',
  ];

  for (const cssPath of possiblePaths) {
    if (await fs.pathExists(path.resolve(cwd, cssPath))) {
      return cssPath;
    }
  }

  // Default fallback based on framework
  if (type.startsWith('nuxt')) {
    return 'assets/css/main.css';
  }
  if (framework === 'vue') {
    return srcDir ? 'src/assets/main.css' : 'assets/main.css';
  }
  return srcDir ? 'src/app/globals.css' : 'app/globals.css';
}
