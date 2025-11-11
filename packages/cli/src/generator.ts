import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import ora from 'ora';
import { ProjectConfig } from './types.js';
import { fileUtils } from './utils/file.js';
import { logger } from './utils/logger.js';

const execAsync = promisify(exec);

export class ProjectGenerator {
  private config: ProjectConfig;
  private projectPath: string;

  constructor(config: ProjectConfig) {
    this.config = config;
    this.projectPath = path.resolve(process.cwd(), config.projectName);
  }

  /**
   * 프로젝트 생성 메인 로직
   */
  async generate(): Promise<void> {
    try {
      // 1. 프로젝트 디렉토리 확인
      await this.validateProjectPath();

      // 2. 템플릿 복사
      await this.copyTemplate();

      // 3. package.json 수정
      await this.updatePackageJson();

      // 4. Dependencies 설치
      if (this.config.installDeps) {
        await this.installDependencies();
      }

      // 5. Git 초기화
      if (this.config.initGit) {
        await this.initializeGit();
      }

      // 6. 완료 메시지
      logger.nextSteps(this.config.projectName);
    } catch (error) {
      logger.error('프로젝트 생성 중 오류가 발생했습니다.');
      if (error instanceof Error) {
        logger.error(error.message);
      }
      throw error;
    }
  }

  /**
   * 프로젝트 경로 검증
   */
  private async validateProjectPath(): Promise<void> {
    const spinner = ora('프로젝트 디렉토리 확인 중...').start();

    const exists = await fileUtils.exists(this.projectPath);

    if (exists) {
      const isEmpty = await fileUtils.isEmpty(this.projectPath);
      if (!isEmpty) {
        spinner.fail();
        throw new Error(
          `디렉토리 "${this.config.projectName}"가 이미 존재하고 비어있지 않습니다.`
        );
      }
    }

    spinner.succeed('프로젝트 디렉토리 확인 완료');
  }

  /**
   * 템플릿 복사
   */
  private async copyTemplate(): Promise<void> {
    const spinner = ora('템플릿 파일 복사 중...').start();

    const templateDir = fileUtils.getTemplateDir(
      this.config.framework,
      this.config.template
    );

    const templateExists = await fileUtils.exists(templateDir);

    if (!templateExists) {
      spinner.fail();
      throw new Error(
        `템플릿을 찾을 수 없습니다: ${this.config.framework}/${this.config.template}`
      );
    }

    await fileUtils.copyDir(templateDir, this.projectPath);

    spinner.succeed('템플릿 파일 복사 완료');
  }

  /**
   * package.json 수정
   */
  private async updatePackageJson(): Promise<void> {
    const spinner = ora('프로젝트 설정 중...').start();

    const packageJsonPath = path.join(this.projectPath, 'package.json');
    const packageName = fileUtils.toPackageName(this.config.projectName);

    await fileUtils.replaceInFile(packageJsonPath, {
      '"name": "template-name"': `"name": "${packageName}"`,
      '"version": "0.0.0"': '"version": "0.1.0"',
    });

    spinner.succeed('프로젝트 설정 완료');
  }

  /**
   * Dependencies 설치
   */
  private async installDependencies(): Promise<void> {
    const spinner = ora(
      'Dependencies 설치 중... (시간이 걸릴 수 있습니다)'
    ).start();

    try {
      await execAsync('pnpm install', {
        cwd: this.projectPath,
      });
      spinner.succeed('Dependencies 설치 완료');
    } catch (error) {
      spinner.fail('Dependencies 설치 실패');
      logger.warning('수동으로 설치해주세요: pnpm install');
    }
  }

  /**
   * Git 초기화
   */
  private async initializeGit(): Promise<void> {
    const spinner = ora('Git 저장소 초기화 중...').start();

    try {
      await execAsync('git init', {
        cwd: this.projectPath,
      });

      await execAsync('git add .', {
        cwd: this.projectPath,
      });

      await execAsync(
        'git commit -m "chore: Initial commit from create-hanui-app"',
        {
          cwd: this.projectPath,
        }
      );

      spinner.succeed('Git 저장소 초기화 완료');
    } catch (error) {
      spinner.fail('Git 초기화 실패');
      logger.warning('수동으로 초기화해주세요: git init');
    }
  }
}
