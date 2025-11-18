import path from 'path';
import fs from 'fs-extra';
import type { ProjectType } from '../types.js';

interface ProjectInfo {
  type: ProjectType;
  srcDir: boolean;
  appDir: boolean;
  pagesDir: boolean;
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

  let type: ProjectType = 'unknown';

  if (appDir && srcDir) {
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
  const { srcDir, appDir } = projectInfo;

  // Next.js App Router
  if (appDir) {
    const appGlobalsCss = path.resolve(
      cwd,
      `${srcDir ? 'src/' : ''}app/globals.css`
    );
    if (await fs.pathExists(appGlobalsCss)) {
      return `${srcDir ? 'src/' : ''}app/globals.css`;
    }
  }

  // Next.js Pages or Vite
  const stylesCss = path.resolve(
    cwd,
    `${srcDir ? 'src/' : ''}styles/globals.css`
  );
  if (await fs.pathExists(stylesCss)) {
    return `${srcDir ? 'src/' : ''}styles/globals.css`;
  }

  // Vite default
  const indexCss = path.resolve(cwd, `${srcDir ? 'src/' : ''}index.css`);
  if (await fs.pathExists(indexCss)) {
    return `${srcDir ? 'src/' : ''}index.css`;
  }

  // Default fallback
  return srcDir ? 'src/app/globals.css' : 'app/globals.css';
}
