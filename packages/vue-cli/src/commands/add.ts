import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import {
  fetchRegistry,
  getSourceBaseUrl,
  type Registry,
} from '../utils/registry.js';
import { installDependencies } from '../utils/installer.js';
import { logger } from '../utils/logger.js';
import type { HanuiVueConfig } from '../types.js';

/**
 * Load hanui.json config
 */
async function loadHanuiConfig(cwd: string): Promise<HanuiVueConfig | null> {
  const configPath = path.join(cwd, 'hanui.json');
  if (!fs.existsSync(configPath)) {
    return null;
  }
  return fs.readJSON(configPath);
}

/**
 * Fetch file content from GitHub
 */
async function fetchFileFromGitHub(filePath: string): Promise<string> {
  const baseUrl = getSourceBaseUrl();
  const url = `${baseUrl}/${filePath}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response.text();
}

/**
 * Add Command
 */
export const add = new Command()
  .name('add')
  .description('Add a HANUI Vue component to your project')
  .argument('[components...]', 'component(s) to add')
  .option('-y, --yes', 'skip confirmation prompt')
  .option('-o, --overwrite', 'overwrite existing files')
  .option('-p, --path <path>', 'custom path for components')
  .action(async (components: string[], options) => {
    try {
      const cwd = process.cwd();

      // Check package.json
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        logger.error(
          'package.json not found. Make sure you are in a valid project directory.'
        );
        process.exit(1);
      }

      // Load hanui.json config
      const hanuiConfig = await loadHanuiConfig(cwd);

      // Determine components path
      let componentsPath = options.path || 'src/components/hanui';
      let componentsAlias = '@/components/hanui';

      if (hanuiConfig?.aliases?.components) {
        componentsAlias = hanuiConfig.aliases.components;
        componentsPath = hanuiConfig.aliases.components
          .replace(/^@\//, 'src/')
          .replace(/^~\//, '');
      }

      // Fetch registry
      logger.info('Fetching Vue component registry...');
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (error) {
        logger.error(
          'Failed to fetch component registry. Check your internet connection.'
        );
        process.exit(1);
      }

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
          logger.warning('No components selected. Exiting...');
          process.exit(0);
        }

        selectedComponents = response.components;
      }

      // Handle "all" keyword
      if (selectedComponents.length === 1 && selectedComponents[0] === 'all') {
        selectedComponents = Object.keys(registry);
        logger.info(
          `Installing all ${selectedComponents.length} components...`
        );
      }

      // Validate components
      const invalidComponents = selectedComponents.filter(
        (name) => !registry[name]
      );
      if (invalidComponents.length > 0) {
        logger.error(
          `Invalid component(s): ${invalidComponents.join(', ')}\n` +
            `Run 'npx hanui-vue add' to see available components.`
        );
        process.exit(1);
      }

      // Collect all dependencies
      const allDependencies = new Set<string>();
      const devDependencies = new Set<string>();
      const componentsToInstall = new Set<string>(selectedComponents);

      // Resolve registry dependencies recursively
      const resolveRegistryDeps = (componentName: string) => {
        const component = registry[componentName];
        if (!component) return;

        component.dependencies?.forEach((dep) => allDependencies.add(dep));
        component.devDependencies?.forEach((dep) => devDependencies.add(dep));

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
        logger.info(`\nThe following Vue components will be installed:\n`);
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
          logger.warning('Installation cancelled.');
          process.exit(0);
        }
      }

      // Install components
      const spinner = ora('Installing components...').start();

      for (const componentName of componentsToInstall) {
        const component = registry[componentName];

        for (const file of component.files) {
          // Try local source first (development)
          let sourcePath: string | null = null;

          // Check parent directories for hanui monorepo
          let currentDir = cwd;
          for (let i = 0; i < 5; i++) {
            const testPath = path.join(
              currentDir,
              'packages/vue/src',
              file.path
            );
            if (fs.existsSync(testPath)) {
              sourcePath = testPath;
              break;
            }
            currentDir = path.dirname(currentDir);
          }

          // Check sibling directory
          if (!sourcePath) {
            const siblingPath = path.join(
              path.dirname(cwd),
              'hanui/packages/vue/src',
              file.path
            );
            if (fs.existsSync(siblingPath)) {
              sourcePath = siblingPath;
            }
          }

          // Remove "components/" prefix from file.path
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

          // Create directory
          await fs.ensureDir(path.dirname(targetPath));

          // Get file content
          let content: string;

          if (sourcePath && fs.existsSync(sourcePath)) {
            content = await fs.readFile(sourcePath, 'utf-8');
            spinner.text = `Copying ${chalk.cyan(componentName)} from local source...`;
          } else {
            try {
              spinner.text = `Downloading ${chalk.cyan(componentName)} from registry...`;
              content = await fetchFileFromGitHub(file.path);
            } catch (error) {
              spinner.fail(`Failed to download ${chalk.red(file.path)}`);
              continue;
            }
          }

          // Transform imports
          // @/lib/utils -> @/lib/utils (keep as is for alias)
          content = content.replace(
            /from ['"](\.\.\/)+lib\/utils['"]/g,
            "from '@/lib/utils'"
          );

          // Relative component imports
          content = content.replace(
            /from ['"]\.\/([A-Z][a-zA-Z0-9]*)['"]/g,
            `from '${componentsAlias}/$1'`
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
        try {
          await installDependencies({
            dependencies: Array.from(allDependencies),
            devDependencies: Array.from(devDependencies),
            cwd,
          });
        } catch {
          logger.warning(
            'Could not auto-install dependencies. Please install manually.'
          );
        }
      }

      logger.success(
        `\n✓ Successfully installed ${componentsToInstall.size} Vue component(s)!`
      );
      logger.info(
        `\nComponents installed to: ${chalk.cyan(path.join(cwd, componentsPath))}`
      );

      // Usage example
      console.log(chalk.dim('\nUsage example:'));
      console.log(chalk.dim(`  <script setup lang="ts">`));
      console.log(
        chalk.dim(`  import { Button } from '${componentsAlias}/Button.vue';`)
      );
      console.log(chalk.dim(`  </script>\n`));
    } catch (error) {
      logger.error('Failed to add components');
      if (error instanceof Error) console.error(error.message);
      process.exit(1);
    }
  });
