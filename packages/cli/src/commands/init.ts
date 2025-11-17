import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';

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

      // Prompt for configuration
      let config = {
        componentsPath: 'components/hanui',
        libPath: 'lib',
        tailwindCss: true,
      };

      if (!options.yes) {
        const response = await prompts([
          {
            type: 'text',
            name: 'componentsPath',
            message: 'Where would you like to install components?',
            initial: 'components/hanui',
          },
          {
            type: 'text',
            name: 'libPath',
            message: 'Where would you like to install utility functions?',
            initial: 'lib',
          },
          {
            type: 'confirm',
            name: 'tailwindCss',
            message: 'Would you like to configure Tailwind CSS?',
            initial: true,
          },
        ]);

        config = { ...config, ...response };
      }

      const spinner = ora('Setting up project...').start();

      // 1. Create directories
      const componentsDir = path.join(cwd, config.componentsPath);
      const libDir = path.join(cwd, config.libPath);

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
        const tailwindConfigPath = path.join(cwd, 'tailwind.config.js');
        const tailwindConfigTsPath = path.join(cwd, 'tailwind.config.ts');

        const configPath = fs.existsSync(tailwindConfigTsPath)
          ? tailwindConfigTsPath
          : tailwindConfigPath;

        if (fs.existsSync(configPath)) {
          spinner.info(
            'Tailwind config found. Please manually add the following to your content array:'
          );
          console.log(
            chalk.dim(
              `\n  './node_modules/@hanui/react/**/*.{js,ts,jsx,tsx}',\n`
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

      // 4. Create hanui.json config
      const hanuiConfig = {
        $schema: 'https://hanui.io/schema.json',
        componentsPath: config.componentsPath,
        libPath: config.libPath,
        tailwind: {
          config: config.tailwindCss ? 'tailwind.config.js' : undefined,
        },
      };

      const hanuiConfigPath = path.join(cwd, 'hanui.json');
      await fs.writeJSON(hanuiConfigPath, hanuiConfig, { spaces: 2 });
      spinner.text = 'Created configuration file';

      spinner.succeed('Project initialized!');

      // Success message
      logger.success('\n✓ HANUI initialized successfully!\n');
      logger.info('Next steps:\n');
      console.log(
        `  ${chalk.cyan('1.')} Add components: ${chalk.bold('npx hanui add button')}`
      );
      console.log(
        `  ${chalk.cyan('2.')} Install dependencies: ${chalk.bold('npm install')}`
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
