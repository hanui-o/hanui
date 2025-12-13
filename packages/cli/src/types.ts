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
  framework?: Framework;
  tailwind: {
    config: string;
    css?: string;
    baseColor?: string;
    cssVariables?: boolean;
    version?: 3 | 4;
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
  | 'nuxt'
  | 'nuxt-src'
  | 'vue'
  | 'vue-src'
  | 'unknown';

export type Framework = 'react' | 'vue';
