import prompts from 'prompts';
import { ProjectConfig } from './types.js';
import { fileUtils } from './utils/file.js';
import { logger } from './utils/logger.js';

export async function promptForConfig(
  initialProjectName?: string
): Promise<ProjectConfig | null> {
  const questions: prompts.PromptObject[] = [];

  // 프로젝트명 입력
  if (!initialProjectName) {
    questions.push({
      type: 'text',
      name: 'projectName',
      message: '프로젝트 이름을 입력하세요:',
      initial: 'my-hanui-app',
      validate: (value: string) => {
        if (!value) return '프로젝트 이름을 입력해주세요.';
        if (!fileUtils.isValidProjectName(value)) {
          return '프로젝트 이름은 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.';
        }
        return true;
      },
    });
  }

  // 프레임워크 선택
  questions.push({
    type: 'select',
    name: 'framework',
    message: '프레임워크를 선택하세요:',
    choices: [
      { title: 'React', value: 'react', description: 'React 18 + TypeScript' },
      {
        title: 'Vue (Coming soon)',
        value: 'vue',
        description: 'Vue 3 + TypeScript',
        disabled: true,
      },
    ],
    initial: 0,
  });

  // 템플릿 선택
  questions.push({
    type: 'select',
    name: 'template',
    message: '템플릿을 선택하세요:',
    choices: [
      {
        title: 'Portal (민원 포털)',
        value: 'portal',
        description: '시민 대상 민원 포털 템플릿',
      },
      {
        title: 'Admin (관리자)',
        value: 'admin',
        description: '관리자용 백오피스 템플릿',
      },
      {
        title: 'Both (Portal + Admin)',
        value: 'both',
        description: '포털 + 관리자 멀티 앱',
      },
    ],
    initial: 0,
  });

  // Dependencies 설치 여부
  questions.push({
    type: 'confirm',
    name: 'installDeps',
    message: 'Dependencies를 자동으로 설치하시겠습니까?',
    initial: true,
  });

  // Git 초기화 여부
  questions.push({
    type: 'confirm',
    name: 'initGit',
    message: 'Git 저장소를 초기화하시겠습니까?',
    initial: true,
  });

  try {
    const answers = await prompts(questions, {
      onCancel: () => {
        logger.warning('프로젝트 생성이 취소되었습니다.');
        process.exit(0);
      },
    });

    return {
      projectName: initialProjectName || answers.projectName,
      framework: answers.framework,
      template: answers.template,
      installDeps: answers.installDeps,
      initGit: answers.initGit,
    };
  } catch (error) {
    logger.error('프롬프트 실행 중 오류가 발생했습니다.');
    return null;
  }
}
