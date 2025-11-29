import chalk from 'chalk';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },

  warn: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },

  error: (message: string) => {
    console.log(chalk.red('✖'), message);
  },

  banner: () => {
    console.log();
    console.log(chalk.bold.green('  ██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗██╗'));
    console.log(chalk.bold.green('  ██║  ██║██╔══██╗████╗  ██║██║   ██║██║'));
    console.log(chalk.bold.green('  ███████║███████║██╔██╗ ██║██║   ██║██║'));
    console.log(chalk.bold.green('  ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║'));
    console.log(chalk.bold.green('  ██║  ██║██║  ██║██║ ╚████║╚██████╔╝██║'));
    console.log(chalk.bold.green('  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝'));
    console.log();
    console.log(chalk.gray('  KRDS 기반 Vue 컴포넌트 라이브러리'));
    console.log();
  },
};
