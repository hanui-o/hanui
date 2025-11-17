import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { logger } from './logger.js';

interface InstallOptions {
  dependencies?: string[];
  devDependencies?: string[];
  cwd: string;
}

/**
 * Detect package manager used in the project
 */
export async function detectPackageManager(
  cwd: string
): Promise<'npm' | 'pnpm' | 'yarn'> {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

/**
 * Install npm dependencies
 */
export async function installDependencies(
  options: InstallOptions
): Promise<void> {
  const { dependencies = [], devDependencies = [], cwd } = options;

  if (dependencies.length === 0 && devDependencies.length === 0) {
    return;
  }

  const packageManager = await detectPackageManager(cwd);

  try {
    // Install dependencies
    if (dependencies.length > 0) {
      logger.info(`Installing dependencies with ${packageManager}...`);

      if (packageManager === 'npm') {
        await execa('npm', ['install', '--save', ...dependencies], { cwd });
      } else if (packageManager === 'pnpm') {
        await execa('pnpm', ['add', ...dependencies], { cwd });
      } else if (packageManager === 'yarn') {
        await execa('yarn', ['add', ...dependencies], { cwd });
      }
    }

    // Install dev dependencies
    if (devDependencies.length > 0) {
      logger.info(`Installing dev dependencies with ${packageManager}...`);

      if (packageManager === 'npm') {
        await execa('npm', ['install', '--save-dev', ...devDependencies], {
          cwd,
        });
      } else if (packageManager === 'pnpm') {
        await execa('pnpm', ['add', '-D', ...devDependencies], { cwd });
      } else if (packageManager === 'yarn') {
        await execa('yarn', ['add', '-D', ...devDependencies], { cwd });
      }
    }

    logger.success('Dependencies installed successfully!');
  } catch (error) {
    throw new Error(
      `Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Add dependencies to package.json without installing
 */
export async function addToPackageJson(
  dependencies: string[],
  cwd: string,
  isDev = false
): Promise<void> {
  const packageJsonPath = path.join(cwd, 'package.json');
  const packageJson = await fs.readJSON(packageJsonPath);

  const depKey = isDev ? 'devDependencies' : 'dependencies';
  packageJson[depKey] = packageJson[depKey] || {};

  dependencies.forEach((dep) => {
    const [name, version = 'latest'] = dep.split('@');
    packageJson[depKey][name] = version;
  });

  await fs.writeJSON(packageJsonPath, packageJson, { spaces: 2 });
}
