import { Command } from 'commander';
import { logger } from './utils/logger.js';
import { promptForConfig } from './prompts.js';
import { ProjectGenerator } from './generator.js';

const program = new Command();

program
  .name('create-hanui-app')
  .description('KRDS 기반 공공 웹 프로젝트 생성 CLI')
  .version('0.1.0')
  .argument('[project-name]', '프로젝트 이름')
  .action(async (projectName?: string) => {
    logger.banner();

    try {
      // 인터랙티브 프롬프트로 설정 수집
      const config = await promptForConfig(projectName);

      if (!config) {
        logger.error('프로젝트 설정을 가져올 수 없습니다.');
        process.exit(1);
      }

      // 프로젝트 생성
      const generator = new ProjectGenerator(config);
      await generator.generate();
    } catch (error) {
      logger.error('프로젝트 생성에 실패했습니다.');
      if (error instanceof Error) {
        console.error(error.message);
      }
      process.exit(1);
    }
  });

program.parse();
