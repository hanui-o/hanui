import { Command } from 'commander';
import prompts from 'prompts';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import fs from 'fs-extra';
import { logger } from '../utils/logger.js';
import {
  detectPackageManager,
  installDependencies,
} from '../utils/installer.js';
import type { HanuiVueConfig } from '../types.js';

/**
 * Detect Vue project type
 */
async function detectProjectType(cwd: string): Promise<{
  type: 'nuxt' | 'vite' | 'vue-cli' | 'unknown';
  srcDir: boolean;
}> {
  const packageJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return { type: 'unknown', srcDir: false };
  }

  const packageJson = await fs.readJSON(packageJsonPath);
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Check for Nuxt
  if (deps['nuxt'] || deps['nuxt3']) {
    return { type: 'nuxt', srcDir: true };
  }

  // Check for Vite + Vue
  if (deps['vite'] && deps['vue']) {
    const hasSrcDir = fs.existsSync(path.join(cwd, 'src'));
    return { type: 'vite', srcDir: hasSrcDir };
  }

  // Check for Vue CLI
  if (deps['@vue/cli-service']) {
    return { type: 'vue-cli', srcDir: true };
  }

  return { type: 'unknown', srcDir: fs.existsSync(path.join(cwd, 'src')) };
}

/**
 * Detect Tailwind version (v3 vs v4)
 */
async function detectTailwindVersion(cwd: string): Promise<3 | 4 | null> {
  const packageJsonPath = path.join(cwd, 'package.json');
  if (!fs.existsSync(packageJsonPath)) return null;

  const packageJson = await fs.readJSON(packageJsonPath);
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  if (deps['@tailwindcss/postcss']) return 4;

  const tailwindVersion = deps['tailwindcss'];
  if (tailwindVersion) {
    if (tailwindVersion.match(/^[\^~]?4/)) return 4;
    if (tailwindVersion.match(/^[\^~]?3/)) return 3;
  }

  // Check for config file
  const hasV3Config =
    fs.existsSync(path.join(cwd, 'tailwind.config.js')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.ts')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.mjs'));

  if (hasV3Config) return 3;

  return null;
}

/**
 * KRDS CSS Variables
 */
const VARIABLES_CSS = `/**
 * HANUI Design System - CSS Variables
 * Korean Government Design System (KRDS) 기반 CSS 변수
 */

:root {
  --font-pretendard: 'Pretendard GOV', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;

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
  --krds-color-light-danger-50: #de3412;
  --krds-color-light-danger-60: #bd2c0f;

  /* Success */
  --krds-color-light-success-5: #eaf6ec;
  --krds-color-light-success-10: #d8eedd;
  --krds-color-light-success-50: #228738;
  --krds-color-light-success-60: #267337;

  /* Warning */
  --krds-color-light-warning-5: #fff3db;
  --krds-color-light-warning-10: #ffe0a3;
  --krds-color-light-warning-30: #ffb114;
  --krds-color-light-warning-50: #9e6a00;

  /* Information */
  --krds-color-light-information-5: #e7f4fe;
  --krds-color-light-information-10: #d3ebfd;
  --krds-color-light-information-50: #0b78cb;
  --krds-color-light-information-60: #096ab3;

  /* Semantic Color Tokens */
  --krds-gray-text: var(--krds-color-light-gray-90);
  --krds-gray-surface: var(--krds-color-light-gray-5);
  --krds-gray-background: var(--krds-color-light-gray-0);
  --krds-gray-border: var(--krds-color-light-gray-20);

  --krds-primary-text: var(--krds-color-light-primary-60);
  --krds-primary-surface: var(--krds-color-light-primary-5);
  --krds-primary-base: var(--krds-color-light-primary-50);
  --krds-primary-border: var(--krds-color-light-primary-20);

  --krds-danger-text: var(--krds-color-light-danger-60);
  --krds-danger-surface: var(--krds-color-light-danger-5);
  --krds-danger-base: var(--krds-color-light-danger-50);

  --krds-success-text: var(--krds-color-light-success-60);
  --krds-success-surface: var(--krds-color-light-success-5);
  --krds-success-base: var(--krds-color-light-success-50);

  --krds-warning-text: var(--krds-color-light-warning-50);
  --krds-warning-surface: var(--krds-color-light-warning-5);
  --krds-warning-base: var(--krds-color-light-warning-30);

  --krds-information-text: var(--krds-color-light-information-60);
  --krds-information-surface: var(--krds-color-light-information-5);
  --krds-information-base: var(--krds-color-light-information-50);
}

/* Dark Mode */
.dark {
  --krds-white: #000000;
  --krds-black: #ffffff;

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

  --krds-gray-text: var(--krds-color-light-gray-10);
  --krds-gray-surface: var(--krds-color-light-gray-95);
  --krds-gray-background: var(--krds-color-light-gray-100);
  --krds-gray-border: var(--krds-color-light-gray-80);
}
`;

/**
 * Tailwind v4 @theme block (실제 HEX 값 - var() 참조 불가)
 */
const TAILWIND_V4_THEME = `@import 'tailwindcss';

@theme {
  /* KRDS Colors - Tailwind v4 requires actual values, not var() references */
  --color-krds-white: #ffffff;
  --color-krds-black: #000000;

  /* Primary */
  --color-krds-primary-5: #ecf2fe;
  --color-krds-primary-10: #d8e5fd;
  --color-krds-primary-20: #b1cefb;
  --color-krds-primary-30: #86aff9;
  --color-krds-primary-40: #4c87f6;
  --color-krds-primary-50: #256ef4;
  --color-krds-primary-60: #0b50d0;
  --color-krds-primary-70: #083891;
  --color-krds-primary-80: #052561;
  --color-krds-primary-90: #03163a;
  --color-krds-primary-95: #020f27;
  --color-krds-primary: #256ef4;

  /* Gray */
  --color-krds-gray-0: #ffffff;
  --color-krds-gray-5: #f4f5f6;
  --color-krds-gray-10: #e6e8ea;
  --color-krds-gray-20: #cdd1d5;
  --color-krds-gray-30: #b1b8be;
  --color-krds-gray-40: #8a949e;
  --color-krds-gray-50: #6d7882;
  --color-krds-gray-60: #58616a;
  --color-krds-gray-70: #464c53;
  --color-krds-gray-80: #33363d;
  --color-krds-gray-90: #1e2124;
  --color-krds-gray-95: #131416;
  --color-krds-gray-100: #000000;

  /* Danger */
  --color-krds-danger-5: #fdefec;
  --color-krds-danger-10: #fcdfd9;
  --color-krds-danger-50: #de3412;
  --color-krds-danger-60: #bd2c0f;
  --color-krds-danger: #de3412;

  /* Success */
  --color-krds-success-5: #eaf6ec;
  --color-krds-success-10: #d8eedd;
  --color-krds-success-50: #228738;
  --color-krds-success-60: #267337;
  --color-krds-success: #228738;

  /* Warning */
  --color-krds-warning-5: #fff3db;
  --color-krds-warning-10: #ffe0a3;
  --color-krds-warning-30: #ffb114;
  --color-krds-warning-50: #9e6a00;
  --color-krds-warning: #ffb114;

  /* Information */
  --color-krds-info-5: #e7f4fe;
  --color-krds-info-10: #d3ebfd;
  --color-krds-info-50: #0b78cb;
  --color-krds-info-60: #096ab3;
  --color-krds-info: #0b78cb;
}
`;

/**
 * Tailwind v3 Preset for Vue
 */
const TAILWIND_PRESET = `/**
 * HANUI Vue Tailwind Preset
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
          text: 'var(--krds-danger-text)',
          surface: 'var(--krds-danger-surface)',
          base: 'var(--krds-danger-base)',
          5: 'var(--krds-color-light-danger-5)',
          50: 'var(--krds-color-light-danger-50)',
          60: 'var(--krds-color-light-danger-60)',
        },
        'krds-success': {
          DEFAULT: 'var(--krds-success-base)',
          text: 'var(--krds-success-text)',
          surface: 'var(--krds-success-surface)',
          base: 'var(--krds-success-base)',
          5: 'var(--krds-color-light-success-5)',
          50: 'var(--krds-color-light-success-50)',
          60: 'var(--krds-color-light-success-60)',
        },
        'krds-warning': {
          DEFAULT: 'var(--krds-warning-base)',
          text: 'var(--krds-warning-text)',
          surface: 'var(--krds-warning-surface)',
          base: 'var(--krds-warning-base)',
          5: 'var(--krds-color-light-warning-5)',
          30: 'var(--krds-color-light-warning-30)',
        },
        'krds-info': {
          DEFAULT: 'var(--krds-information-base)',
          text: 'var(--krds-information-text)',
          surface: 'var(--krds-information-surface)',
          base: 'var(--krds-information-base)',
          5: 'var(--krds-color-light-information-5)',
          50: 'var(--krds-color-light-information-50)',
        },
      },
      fontFamily: {
        sans: ['Pretendard GOV', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
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
      },
    },
  },
};

module.exports = hanUIPreset;
`;

/**
 * Init Command
 */
export const init = new Command()
  .name('init')
  .description('Initialize your Vue project for HANUI')
  .option('-y, --yes', 'skip confirmation and use defaults')
  .action(async (options) => {
    try {
      const cwd = process.cwd();

      logger.banner();
      logger.info('Initializing HANUI Vue in your project...\n');

      // Check package.json
      const packageJsonPath = path.join(cwd, 'package.json');
      if (!fs.existsSync(packageJsonPath)) {
        logger.error(
          'package.json not found. Make sure you are in a valid project directory.'
        );
        process.exit(1);
      }

      // Detect project type
      const projectInfo = await detectProjectType(cwd);
      const tailwindVersion = await detectTailwindVersion(cwd);

      logger.info(
        `Detected: ${chalk.cyan(projectInfo.type)} ${projectInfo.srcDir ? chalk.dim('(with src/)') : ''}`
      );
      if (tailwindVersion) {
        logger.info(`Tailwind CSS: ${chalk.cyan(`v${tailwindVersion}`)}\n`);
      }

      // Check Tailwind CSS
      if (!tailwindVersion) {
        logger.warning(
          'Tailwind CSS not detected. Please install Tailwind CSS first:\n'
        );
        console.log(
          chalk.dim('  npm install -D tailwindcss postcss autoprefixer')
        );
        console.log(chalk.dim('  npx tailwindcss init -p\n'));
        process.exit(1);
      }

      const isV4 = tailwindVersion === 4;

      // Configuration
      let config = {
        componentsPath: projectInfo.srcDir
          ? 'src/components/hanui'
          : 'components/hanui',
        utilsPath: '@/lib',
        stylesPath: projectInfo.srcDir ? 'src/styles' : 'styles',
        cssPath: projectInfo.srcDir ? 'src/assets/main.css' : 'assets/main.css',
      };

      // Detect actual CSS path for Vite projects
      const possibleCssPaths = [
        'src/assets/main.css',
        'src/style.css',
        'src/index.css',
        'src/assets/style.css',
        'assets/main.css',
        'style.css',
      ];

      for (const cssPath of possibleCssPaths) {
        if (fs.existsSync(path.join(cwd, cssPath))) {
          config.cssPath = cssPath;
          break;
        }
      }

      if (!options.yes) {
        const response = await prompts([
          {
            type: 'text',
            name: 'componentsPath',
            message: 'Where would you like to install components?',
            initial: config.componentsPath,
          },
        ]);

        if (response.componentsPath)
          config.componentsPath = response.componentsPath;
      }

      const spinner = ora('Setting up project...').start();

      // 1. Create directories
      const componentsDir = path.join(cwd, config.componentsPath);
      const stylesDir = path.join(cwd, config.stylesPath);
      const libDir = path.join(cwd, projectInfo.srcDir ? 'src/lib' : 'lib');

      await fs.ensureDir(componentsDir);
      await fs.ensureDir(stylesDir);
      await fs.ensureDir(libDir);

      // 2. Create utils.ts
      const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
      await fs.writeFile(path.join(libDir, 'utils.ts'), utilsContent);
      spinner.text = 'Created utility functions';

      // 3. Create variables.css
      await fs.writeFile(path.join(stylesDir, 'variables.css'), VARIABLES_CSS);
      spinner.text = 'Created KRDS design tokens';

      // 4. Tailwind configuration
      if (!isV4) {
        // Create preset file
        await fs.writeFile(path.join(cwd, 'hanui.preset.js'), TAILWIND_PRESET);

        // Update tailwind.config
        const tailwindConfigPath = fs.existsSync(
          path.join(cwd, 'tailwind.config.ts')
        )
          ? 'tailwind.config.ts'
          : fs.existsSync(path.join(cwd, 'tailwind.config.js'))
            ? 'tailwind.config.js'
            : fs.existsSync(path.join(cwd, 'tailwind.config.mjs'))
              ? 'tailwind.config.mjs'
              : null;

        if (tailwindConfigPath) {
          let content = await fs.readFile(
            path.join(cwd, tailwindConfigPath),
            'utf-8'
          );

          if (!content.includes('hanui.preset')) {
            // Add import
            if (content.includes('export default')) {
              content = `import hanUIPreset from './hanui.preset.js';\n\n${content}`;
            } else if (content.includes('module.exports')) {
              content = `const hanUIPreset = require('./hanui.preset.js');\n\n${content}`;
            }

            // Add presets array
            if (!content.includes('presets:')) {
              if (content.match(/export default\s*\{/)) {
                content = content.replace(
                  /export default\s*\{/,
                  'export default {\n  presets: [hanUIPreset],'
                );
              } else if (
                content.match(/(const\s+\w+\s*(?::\s*\w+)?\s*=\s*)\{/)
              ) {
                content = content.replace(
                  /(const\s+\w+\s*(?::\s*\w+)?\s*=\s*)\{/,
                  '$1{\n  presets: [hanUIPreset],'
                );
              } else if (content.includes('module.exports')) {
                content = content.replace(
                  /module\.exports\s*=\s*\{/,
                  'module.exports = {\n  presets: [hanUIPreset],'
                );
              }
            }

            await fs.writeFile(path.join(cwd, tailwindConfigPath), content);
          }
        }
        spinner.text = 'Updated Tailwind config';
      }

      // 5. Update main CSS file
      const cssFullPath = path.join(cwd, config.cssPath);
      if (fs.existsSync(cssFullPath)) {
        let cssContent = await fs.readFile(cssFullPath, 'utf-8');

        if (isV4) {
          // Tailwind v4: Replace entire CSS with @theme block
          if (!cssContent.includes('@theme')) {
            cssContent = TAILWIND_V4_THEME;
            await fs.writeFile(cssFullPath, cssContent);
          }
        } else {
          // Tailwind v3: Just import variables.css
          const importPath = config.cssPath.includes('src/')
            ? '../styles/variables.css'
            : './styles/variables.css';

          if (!cssContent.includes('variables.css')) {
            cssContent = `@import '${importPath}';\n\n${cssContent}`;
            await fs.writeFile(cssFullPath, cssContent);
          }
        }
      } else if (isV4) {
        // Create CSS file with @theme if it doesn't exist (v4)
        await fs.ensureDir(path.dirname(cssFullPath));
        await fs.writeFile(cssFullPath, TAILWIND_V4_THEME);
      }
      spinner.text = 'Updated CSS imports';

      // 6. Configure path aliases for Vite projects
      if (projectInfo.type === 'vite') {
        spinner.text = 'Configuring path aliases...';

        // Update vite.config.ts
        const viteConfigPath = path.join(cwd, 'vite.config.ts');
        const viteConfigJsPath = path.join(cwd, 'vite.config.js');
        const viteConfigFile = fs.existsSync(viteConfigPath)
          ? viteConfigPath
          : fs.existsSync(viteConfigJsPath)
            ? viteConfigJsPath
            : null;

        if (viteConfigFile) {
          let viteContent = await fs.readFile(viteConfigFile, 'utf-8');

          // Check if alias is already configured
          if (!viteContent.includes("'@'") && !viteContent.includes('"@"')) {
            // Add path import if not exists
            if (!viteContent.includes('import path from')) {
              viteContent = `import path from 'path';\n${viteContent}`;
            }

            // Add resolve.alias configuration
            if (viteContent.includes('defineConfig({')) {
              viteContent = viteContent.replace(
                /defineConfig\(\{/,
                `defineConfig({\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './${projectInfo.srcDir ? 'src' : '.'}'),\n    },\n  },`
              );
            } else if (viteContent.includes('defineConfig({\n')) {
              viteContent = viteContent.replace(
                /defineConfig\(\{\n/,
                `defineConfig({\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './${projectInfo.srcDir ? 'src' : '.'}'),\n    },\n  },\n`
              );
            }

            await fs.writeFile(viteConfigFile, viteContent);
            spinner.text = 'Updated vite.config with @ alias';
          }
        }

        // Update tsconfig.json
        const tsconfigPath = path.join(cwd, 'tsconfig.json');
        if (fs.existsSync(tsconfigPath)) {
          const tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');

          if (
            !tsconfigContent.includes('"@/*"') &&
            !tsconfigContent.includes("'@/*'")
          ) {
            try {
              const tsconfig = JSON.parse(
                tsconfigContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
              );

              if (!tsconfig.compilerOptions) {
                tsconfig.compilerOptions = {};
              }
              tsconfig.compilerOptions.baseUrl = '.';
              tsconfig.compilerOptions.paths = {
                '@/*': [projectInfo.srcDir ? './src/*' : './*'],
              };

              await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });
              spinner.text = 'Updated tsconfig.json with @ path alias';
            } catch {
              // Skip if parsing fails
            }
          }
        }

        // Also check tsconfig.app.json
        const tsconfigAppPath = path.join(cwd, 'tsconfig.app.json');
        if (fs.existsSync(tsconfigAppPath)) {
          const tsconfigAppContent = await fs.readFile(
            tsconfigAppPath,
            'utf-8'
          );

          if (
            !tsconfigAppContent.includes('"@/*"') &&
            !tsconfigAppContent.includes("'@/*'")
          ) {
            try {
              const tsconfigApp = JSON.parse(
                tsconfigAppContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
              );

              if (!tsconfigApp.compilerOptions) {
                tsconfigApp.compilerOptions = {};
              }
              tsconfigApp.compilerOptions.baseUrl = '.';
              tsconfigApp.compilerOptions.paths = {
                '@/*': [projectInfo.srcDir ? './src/*' : './*'],
              };

              await fs.writeJSON(tsconfigAppPath, tsconfigApp, { spaces: 2 });
              spinner.text = 'Updated tsconfig.app.json with @ path alias';
            } catch {
              // Skip if parsing fails
            }
          }
        }
      }

      // 7. Create hanui.json config
      const hanuiConfig: HanuiVueConfig = {
        $schema: 'https://hanui.io/schema.json',
        style: 'default',
        tailwind: {
          config: isV4 ? '' : 'tailwind.config.js',
          css: config.cssPath,
          baseColor: 'slate',
          cssVariables: true,
          version: isV4 ? 4 : 3,
        },
        aliases: {
          components: `@/${config.componentsPath.replace(/^src\//, '')}`,
          utils: config.utilsPath,
          lib: '@/lib',
        },
      };
      await fs.writeJSON(path.join(cwd, 'hanui.json'), hanuiConfig, {
        spaces: 2,
      });

      spinner.succeed('Project initialized!');

      // Install dependencies
      const pm = detectPackageManager(cwd);
      const depsToInstall = [
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
      ];

      spinner.start(`Installing dependencies with ${pm}...`);
      try {
        await installDependencies({ dependencies: depsToInstall, cwd });
        spinner.succeed(`Dependencies installed (${depsToInstall.join(', ')})`);
      } catch {
        spinner.warn(
          `Could not auto-install. Please run: ${pm} install ${depsToInstall.join(' ')}`
        );
      }

      // Success message
      logger.success(
        `\n✓ HANUI Vue initialized successfully! (Tailwind ${isV4 ? 'v4' : 'v3'})\n`
      );

      console.log(chalk.dim('  Created files:'));
      console.log(chalk.dim(`    - ${config.stylesPath}/variables.css`));
      if (!isV4) console.log(chalk.dim('    - hanui.preset.js'));
      console.log(
        chalk.dim(`    - ${projectInfo.srcDir ? 'src/' : ''}lib/utils.ts`)
      );
      console.log(chalk.dim('    - hanui.json\n'));

      logger.info('Next steps:\n');
      console.log(
        `  ${chalk.cyan('1.')} Add components: ${chalk.bold('npx hanui-vue add button')}`
      );
      console.log(
        `  ${chalk.cyan('2.')} Add all components: ${chalk.bold('npx hanui-vue add all')}`
      );
      console.log(
        `  ${chalk.cyan('3.')} Start building: ${chalk.bold(`${pm} run dev`)}\n`
      );
    } catch (error) {
      logger.error('Failed to initialize project');
      if (error instanceof Error) console.error(error.message);
      process.exit(1);
    }
  });
