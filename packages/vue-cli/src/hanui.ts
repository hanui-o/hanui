import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';

/**
 * HANUI Vue CLI
 *
 * CLI for adding HANUI Vue components to your project
 */
const program = new Command();

program
  .name('hanui-vue')
  .description('Add HANUI Vue components to your project')
  .version('0.1.0');

// Add commands
program.addCommand(init);
program.addCommand(add);

// Parse arguments
program.parse();
