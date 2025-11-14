import chalk from 'chalk';

export const logger = {
  info: (message: string) => {
    console.log(chalk.blue('ℹ'), message);
  },

  success: (message: string) => {
    console.log(chalk.green('✔'), message);
  },

  warning: (message: string) => {
    console.log(chalk.yellow('⚠'), message);
  },

  error: (message: string) => {
    console.log(chalk.red('✖'), message);
  },

  banner: () => {
    console.log();
    console.log(chalk.bold.blue('  ██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗██╗'));
    console.log(chalk.bold.blue('  ██║  ██║██╔══██╗████╗  ██║██║   ██║██║'));
    console.log(chalk.bold.blue('  ███████║███████║██╔██╗ ██║██║   ██║██║'));
    console.log(chalk.bold.blue('  ██╔══██║██╔══██║██║╚██╗██║██║   ██║██║'));
    console.log(chalk.bold.blue('  ██║  ██║██║  ██║██║ ╚████║╚██████╔╝██║'));
    console.log(chalk.bold.blue('  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝'));
    console.log();
    console.log(chalk.gray('  KRDS 기반 공공 웹 UI 컴포넌트 라이브러리'));
    console.log();
  },

  nextSteps: (projectName: string) => {
    console.log();
    console.log(chalk.bold.green('🎉 프로젝트가 성공적으로 생성되었습니다!'));
    console.log();
    console.log(chalk.bold('다음 단계:'));
    console.log();
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  pnpm dev'));
    console.log();
    console.log(chalk.gray('문서: https://hanui.io'));
    console.log(chalk.gray('GitHub: https://github.com/hanui-o/hanui'));
    console.log();
  },
};
