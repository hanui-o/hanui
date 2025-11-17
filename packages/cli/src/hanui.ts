import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';

/**
 * HANUI CLI
 *
 * shadcn/ui style CLI for adding HANUI components to your project
 */
const program = new Command();

program
  .name('hanui')
  .description('Add HANUI components to your project')
  .version('0.1.0');

// Add commands
program.addCommand(init);
program.addCommand(add);

// Parse arguments
program.parse();
