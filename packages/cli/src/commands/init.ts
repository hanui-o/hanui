import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import {
  getProjectInfo,
  getDefaultPaths,
  getTailwindConfigPath,
  getDefaultCssPath,
} from '../utils/get-project-info.js';
import type { HanuiConfig } from '../types.js';

/**
 * Init Command
 *
 * Initializes a project for HANUI components
 * Usage: npx hanui init
 */
export const init = new Command()
  .name('init')
  .description('Initialize your project for HANUI')
  .option('-y, --yes', 'skip confirmation and use defaults')
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

      logger.info(
        `Detected: ${chalk.cyan(projectInfo.type)} ${projectInfo.srcDir ? chalk.dim('(with src/)') : ''}\n`
      );

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
          {
            type: 'confirm',
            name: 'tailwindCss',
            message: 'Would you like to configure Tailwind CSS?',
            initial: true,
          },
        ]);

        if (response.componentsPath)
          config.componentsPath = response.componentsPath;
        if (response.utilsPath) config.utilsPath = response.utilsPath;
        if (typeof response.tailwindCss === 'boolean')
          config.tailwindCss = response.tailwindCss;
      }

      const spinner = ora('Setting up project...').start();

      // 1. Create directories
      const componentsDir = path.join(cwd, config.componentsPath);

      // Extract lib path from utils alias (e.g., @/lib/utils -> lib)
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

/**
 * Utility function to merge class names
 *
 * Combines clsx for conditional classes and tailwind-merge for Tailwind class conflicts
 * Used throughout HANUI components to merge Tailwind classes
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * \`\`\`tsx
 * cn('base-class', condition && 'conditional-class', className)
 * // => 'base-class conditional-class custom-class'
 * \`\`\`
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

      const utilsPath = path.join(libDir, 'utils.ts');
      await fs.writeFile(utilsPath, utilsContent);
      spinner.text = 'Created utility functions';

      // 3. Configure Tailwind CSS
      if (config.tailwindCss) {
        const configPath = path.join(cwd, config.tailwindConfig);

        if (fs.existsSync(configPath)) {
          spinner.info(
            'Tailwind config found. Please manually add the following to your content array:'
          );
          console.log(
            chalk.dim(
              `\n  './${config.componentsPath}/**/*.{js,ts,jsx,tsx}',\n`
            )
          );
        } else {
          spinner.warn(
            'Tailwind config not found. Please install Tailwind CSS first:'
          );
          console.log(
            chalk.dim('\n  npm install -D tailwindcss postcss autoprefixer')
          );
          console.log(chalk.dim('  npx tailwindcss init -p\n'));
        }
      }

      // 4. Create hanui.json config (like shadcn's components.json)
      const hanuiConfig: HanuiConfig = {
        $schema: 'https://hanui.io/schema.json',
        style: 'default',
        tailwind: {
          config: config.tailwindConfig,
          css: cssPath,
          baseColor: 'slate',
          cssVariables: true,
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

      // Success message
      logger.success('\n✓ HANUI initialized successfully!\n');
      logger.info('Configuration saved to hanui.json\n');
      logger.info('Next steps:\n');
      console.log(
        `  ${chalk.cyan('1.')} Install dependencies: ${chalk.bold('npm install clsx tailwind-merge')}`
      );
      console.log(
        `  ${chalk.cyan('2.')} Add components: ${chalk.bold('npx @hanui/cli add button')}`
      );
      console.log(
        `  ${chalk.cyan('3.')} Start building: ${chalk.bold('npm run dev')}\n`
      );
    } catch (error) {
      logger.error('Failed to initialize project');
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  });
