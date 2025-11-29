import { Command } from 'commander';
import { add } from './commands/add.js';
import { logger } from './utils/logger.js';

const program = new Command();

program
  .name('hanui-vue')
  .description('HANUI Vue CLI - KRDS 기반 Vue 컴포넌트 설치 도구')
  .version('0.1.0');

// Add command
program.addCommand(add);

// List command
program
  .command('list')
  .description('List all available Vue components')
  .action(async () => {
    try {
      const { listComponents } = await import('./utils/registry.js');
      const components = await listComponents();
      logger.info('Available Vue components:');
      components.forEach((name) => {
        console.log(`  - ${name}`);
      });
    } catch (error) {
      logger.error(
        `Failed to list components: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      process.exit(1);
    }
  });

program.parse();
