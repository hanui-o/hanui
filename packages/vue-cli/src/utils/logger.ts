import chalk from 'chalk';

export const logger = {
  banner() {
    console.log();
    console.log(chalk.bold.cyan('  ╦ ╦╔═╗╔╗╔╦ ╦╦  '));
    console.log(chalk.bold.cyan('  ╠═╣╠═╣║║║║ ║║  '));
    console.log(chalk.bold.cyan('  ╩ ╩╩ ╩╝╚╝╚═╝╩  ') + chalk.dim(' Vue CLI'));
    console.log();
    console.log(chalk.dim('  KRDS 기반 Vue 컴포넌트 라이브러리'));
    console.log();
  },

  info(message: string) {
    console.log(chalk.blue('ℹ'), message);
  },

  success(message: string) {
    console.log(chalk.green('✓'), message);
  },

  warning(message: string) {
    console.log(chalk.yellow('⚠'), message);
  },

  error(message: string) {
    console.log(chalk.red('✖'), message);
  },

  step(step: number, total: number, message: string) {
    console.log(chalk.dim(`[${step}/${total}]`), message);
  },
};
