export interface ProjectConfig {
  projectName: string;
  framework: 'react' | 'vue' | 'nextjs';
  template: 'portal' | 'admin' | 'both' | 'default';
  installDeps: boolean;
  initGit: boolean;
}

export interface TemplateInfo {
  name: string;
  description: string;
  path: string;
}

export interface HanuiConfig {
  $schema?: string;
  style?: string;
  tailwind: {
    config: string;
    css?: string;
    baseColor?: string;
    cssVariables?: boolean;
  };
  aliases: {
    components: string;
    utils: string;
    ui?: string;
    lib?: string;
  };
}

export type ProjectType =
  | 'next-app'
  | 'next-app-src'
  | 'next-pages'
  | 'next-pages-src'
  | 'vite'
  | 'vite-src'
  | 'unknown';
