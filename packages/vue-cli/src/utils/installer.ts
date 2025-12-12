import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

/**
 * Detect package manager
 */
export function detectPackageManager(
  cwd: string
): 'pnpm' | 'yarn' | 'npm' | 'bun' {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

interface InstallOptions {
  dependencies?: string[];
  devDependencies?: string[];
  cwd: string;
}

/**
 * Install npm dependencies
 */
export async function installDependencies(
  options: InstallOptions
): Promise<void> {
  const { dependencies = [], devDependencies = [], cwd } = options;
  const pm = detectPackageManager(cwd);

  if (dependencies.length > 0) {
    const args =
      pm === 'yarn'
        ? ['add', ...dependencies]
        : pm === 'bun'
          ? ['add', ...dependencies]
          : ['install', ...dependencies];
    await execa(pm, args, { cwd, stdio: 'pipe' });
  }

  if (devDependencies.length > 0) {
    const args =
      pm === 'yarn'
        ? ['add', '-D', ...devDependencies]
        : pm === 'bun'
          ? ['add', '-d', ...devDependencies]
          : ['install', '-D', ...devDependencies];
    await execa(pm, args, { cwd, stdio: 'pipe' });
  }
}
