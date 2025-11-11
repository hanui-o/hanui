export interface ProjectConfig {
  projectName: string;
  framework: 'react' | 'vue';
  template: 'portal' | 'admin' | 'both';
  installDeps: boolean;
  initGit: boolean;
}

export interface TemplateInfo {
  name: string;
  description: string;
  path: string;
}
