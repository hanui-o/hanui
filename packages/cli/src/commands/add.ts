import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { fetchRegistry } from '../utils/registry.js';
import { installDependencies } from '../utils/installer.js';
import { logger } from '../utils/logger.js';

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
  .action(async (components: string[], options) => {
    try {
      const cwd = process.cwd();

      // Check if package.json exists
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        logger.error(
          'package.json not found. Make sure you are in a valid project directory.'
        );
        process.exit(1);
      }

      // Fetch registry
      logger.info('Fetching component registry...');
      const registry = await fetchRegistry();

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
        logger.info('\nThe following components will be installed:\n');
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

      for (const componentName of componentsToInstall) {
        const component = registry[componentName];

        for (const file of component.files) {
          // Resolve source path from packages/react/src/
          const reactPackagePath = path.resolve(
            cwd,
            '../../packages/react/src'
          );
          const sourcePath = path.join(reactPackagePath, file.path);

          // Check if source file exists
          if (!fs.existsSync(sourcePath)) {
            spinner.fail(
              `Source file not found: ${chalk.red(sourcePath)}\n` +
                `This is likely a development environment issue. In production, files will be fetched from the registry.`
            );
            continue;
          }

          const targetPath = path.join(
            cwd,
            file.target || path.join(options.path, file.path)
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

          // Copy file
          await fs.copy(sourcePath, targetPath);
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
        `\n✓ Successfully installed ${componentsToInstall.size} component(s)!`
      );
      logger.info(
        `\nComponents installed to: ${chalk.cyan(path.join(cwd, options.path))}`
      );
    } catch (error) {
      logger.error('Failed to add components');
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  });
