import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import {
  fetchRegistry,
  getSourceBaseUrl,
  type Framework,
} from '../utils/registry.js';
import { installDependencies } from '../utils/installer.js';
import { logger } from '../utils/logger.js';
import type { HanuiConfig } from '../types.js';

/**
 * hanui.json 설정 파일 읽기
 */
async function loadHanuiConfig(cwd: string): Promise<HanuiConfig | null> {
  const configPath = path.join(cwd, 'hanui.json');
  if (!fs.existsSync(configPath)) {
    return null;
  }
  return fs.readJSON(configPath);
}

/**
 * Fetch file content from GitHub
 */
async function fetchFileFromGitHub(
  filePath: string,
  framework: Framework = 'react'
): Promise<string> {
  const baseUrl = getSourceBaseUrl(framework);
  const url = `${baseUrl}/${filePath}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Add Command
 *
 * Adds HANUI components to the user's project
 * Usage: npx hanui add <component-name>
 */
export const add = new Command()
  .name('add')
  .description('Add a HANUI component to your project')
  .argument('[components...]', 'component(s) to add')
  .option('-y, --yes', 'skip confirmation prompt')
  .option('-o, --overwrite', 'overwrite existing files')
  .option('-p, --path <path>', 'custom path for components', 'components/hanui')
  .option(
    '-f, --framework <framework>',
    'framework to use (react or vue)',
    'react'
  )
  .action(async (components: string[], options) => {
    try {
      const cwd = process.cwd();
      const framework = (options.framework as Framework) || 'react';

      // Validate framework option
      if (!['react', 'vue'].includes(framework)) {
        logger.error(`Invalid framework: ${framework}. Use 'react' or 'vue'.`);
        process.exit(1);
      }

      // Check if package.json exists
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        logger.error(
          'package.json not found. Make sure you are in a valid project directory.'
        );
        process.exit(1);
      }

      // Load hanui.json config
      const hanuiConfig = await loadHanuiConfig(cwd);

      // Determine components path from hanui.json or options
      let componentsPath = options.path;
      if (hanuiConfig?.aliases?.components) {
        // Convert alias like "@/components/hanui" to "src/components/hanui"
        componentsPath = hanuiConfig.aliases.components
          .replace(/^@\//, 'src/')
          .replace(/^~\//, '');
      }

      // Fetch registry
      logger.info(`Fetching ${framework} component registry...`);
      const registry = await fetchRegistry(framework);

      // If no components specified, show interactive selection
      let selectedComponents = components;
      if (!selectedComponents || selectedComponents.length === 0) {
        const response = await prompts({
          type: 'multiselect',
          name: 'components',
          message: 'Which components would you like to add?',
          choices: Object.keys(registry).map((name) => ({
            title: name,
            value: name,
            description: registry[name].description,
          })),
          min: 1,
        });

        if (!response.components || response.components.length === 0) {
          logger.warn('No components selected. Exiting...');
          process.exit(0);
        }

        selectedComponents = response.components;
      }

      // Validate components
      const invalidComponents = selectedComponents.filter(
        (name) => !registry[name]
      );
      if (invalidComponents.length > 0) {
        logger.error(
          `Invalid component(s): ${invalidComponents.join(', ')}\n` +
            `Available components: ${Object.keys(registry).join(', ')}`
        );
        process.exit(1);
      }

      // Collect all dependencies (including registry dependencies)
      const allDependencies = new Set<string>();
      const devDependencies = new Set<string>();
      const componentsToInstall = new Set<string>(selectedComponents);

      // Recursively resolve registry dependencies
      const resolveRegistryDeps = (componentName: string) => {
        const component = registry[componentName];
        if (!component) return;

        // Add dependencies
        component.dependencies?.forEach((dep) => allDependencies.add(dep));
        component.devDependencies?.forEach((dep) => devDependencies.add(dep));

        // Resolve registry dependencies recursively
        component.registryDependencies?.forEach((dep) => {
          if (!componentsToInstall.has(dep)) {
            componentsToInstall.add(dep);
            resolveRegistryDeps(dep);
          }
        });
      };

      selectedComponents.forEach((name) => resolveRegistryDeps(name));

      // Show confirmation
      if (!options.yes) {
        logger.info(
          `\nThe following ${framework} components will be installed:\n`
        );
        Array.from(componentsToInstall).forEach((name) => {
          console.log(
            `  ${chalk.cyan('•')} ${chalk.bold(name)} ${chalk.dim(`(${registry[name].type})`)}`
          );
        });

        if (allDependencies.size > 0) {
          console.log(chalk.dim('\nDependencies:'));
          Array.from(allDependencies).forEach((dep) => {
            console.log(`  ${chalk.dim('•')} ${dep}`);
          });
        }

        const { proceed } = await prompts({
          type: 'confirm',
          name: 'proceed',
          message: 'Proceed with installation?',
          initial: true,
        });

        if (!proceed) {
          logger.warn('Installation cancelled.');
          process.exit(0);
        }
      }

      // Install components
      const spinner = ora('Installing components...').start();
      const packageDir = framework === 'vue' ? 'vue' : 'react';

      for (const componentName of componentsToInstall) {
        const component = registry[componentName];

        for (const file of component.files) {
          // Try to resolve source path from local development environment
          // Look for hanui monorepo structure
          let sourcePath: string | null = null;

          // Strategy 1: Check if we're in the hanui monorepo (development)
          const monorepoPath = path.resolve(
            cwd,
            `../../packages/${packageDir}/src`
          );
          const devSourcePath = path.join(monorepoPath, file.path);

          if (fs.existsSync(devSourcePath)) {
            sourcePath = devSourcePath;
          } else {
            // Strategy 2: Check sibling directories (e.g., hanui-test and hanui are siblings)
            const parentDir = path.dirname(cwd);
            const siblingHanuiPath = path.join(
              parentDir,
              `hanui/packages/${packageDir}/src`,
              file.path
            );
            if (fs.existsSync(siblingHanuiPath)) {
              sourcePath = siblingHanuiPath;
            } else {
              // Strategy 3: Check parent directories for hanui monorepo
              let currentDir = cwd;
              for (let i = 0; i < 5; i++) {
                const testPath = path.join(
                  currentDir,
                  `packages/${packageDir}/src`,
                  file.path
                );
                if (fs.existsSync(testPath)) {
                  sourcePath = testPath;
                  break;
                }
                currentDir = path.dirname(currentDir);
              }
            }
          }

          // Remove "components/" prefix from file.path since componentsPath already includes it
          const filePath = file.path.replace(/^components\//, '');
          const targetPath = path.join(
            cwd,
            file.target || path.join(componentsPath, filePath)
          );

          // Check if file exists
          if (fs.existsSync(targetPath) && !options.overwrite) {
            spinner.warn(
              `File ${chalk.cyan(path.relative(cwd, targetPath))} already exists. Use --overwrite to replace.`
            );
            continue;
          }

          // Create directory if needed
          await fs.ensureDir(path.dirname(targetPath));

          // Get file content (local or remote)
          let content: string;

          if (sourcePath && fs.existsSync(sourcePath)) {
            // Local development: copy from monorepo
            content = await fs.readFile(sourcePath, 'utf-8');
            spinner.text = `Copying ${chalk.cyan(componentName)} from local source...`;
          } else {
            // Production: fetch from GitHub
            try {
              spinner.text = `Downloading ${chalk.cyan(componentName)} from registry...`;
              content = await fetchFileFromGitHub(file.path, framework);
            } catch (error) {
              spinner.fail(
                `Failed to download ${chalk.red(file.path)}: ${error instanceof Error ? error.message : 'Unknown error'}`
              );
              continue;
            }
          }

          // Transform imports to use alias paths
          // Handle both ../lib/utils and ../../lib/utils patterns
          content = content.replace(
            /from ['"](\.\.\/)+lib\/utils['"]/g,
            "from '@/lib/utils'"
          );

          // Write file
          await fs.writeFile(targetPath, content, 'utf-8');
        }

        spinner.succeed(`Installed ${chalk.green(componentName)}`);
      }

      spinner.stop();

      // Install npm dependencies
      if (allDependencies.size > 0 || devDependencies.size > 0) {
        logger.info('\nInstalling dependencies...');
        await installDependencies({
          dependencies: Array.from(allDependencies),
          devDependencies: Array.from(devDependencies),
          cwd,
        });
      }

      logger.success(
        `\n✓ Successfully installed ${componentsToInstall.size} ${framework} component(s)!`
      );
      logger.info(
        `\nComponents installed to: ${chalk.cyan(path.join(cwd, componentsPath))}`
      );
    } catch (error) {
      logger.error('Failed to add components');
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  });
