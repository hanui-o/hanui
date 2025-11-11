import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const fileUtils = {
  /**
   * 디렉토리가 존재하는지 확인
   */
  async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * 디렉토리가 비어있는지 확인
   */
  async isEmpty(dirPath: string): Promise<boolean> {
    try {
      const files = await fs.readdir(dirPath);
      return files.length === 0;
    } catch {
      return true;
    }
  },

  /**
   * 디렉토리 재귀적으로 복사
   */
  async copyDir(src: string, dest: string): Promise<void> {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await this.copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  },

  /**
   * 파일 내용 치환
   */
  async replaceInFile(
    filePath: string,
    replacements: Record<string, string>
  ): Promise<void> {
    let content = await fs.readFile(filePath, 'utf-8');

    for (const [key, value] of Object.entries(replacements)) {
      content = content.replaceAll(key, value);
    }

    await fs.writeFile(filePath, content, 'utf-8');
  },

  /**
   * 템플릿 디렉토리 경로 가져오기
   */
  getTemplateDir(framework: string, template: string): string {
    // CLI 패키지의 루트 디렉토리로 이동
    const cliRoot = path.resolve(__dirname, '../../');
    return path.join(cliRoot, 'templates', framework, template);
  },

  /**
   * 프로젝트명이 유효한지 확인
   */
  isValidProjectName(name: string): boolean {
    return /^[a-z0-9-]+$/.test(name);
  },

  /**
   * npm 패키지명으로 변환
   */
  toPackageName(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
  },
};
