import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';

export type Framework = 'react' | 'vue';

const getRegistryUrl = (framework: Framework = 'react') => {
  if (process.env.HANUI_REGISTRY_URL) {
    return process.env.HANUI_REGISTRY_URL;
  }
  const registryFile = framework === 'vue' ? 'registry-vue.json' : 'registry.json';
  return `https://raw.githubusercontent.com/hanui-o/hanui/main/packages/registry/${registryFile}`;
};

export const getSourceBaseUrl = (framework: Framework = 'react') => {
  const packageDir = framework === 'vue' ? 'vue' : 'react';
  return `https://raw.githubusercontent.com/hanui-o/hanui/main/packages/${packageDir}/src`;
};

export interface RegistryFile {
  path: string;
  type: 'component' | 'lib' | 'hook';
  target?: string;
}

export interface RegistryComponent {
  name: string;
  type: 'component' | 'ui' | 'lib';
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: {
    config?: Record<string, any>;
  };
}

export type Registry = Record<string, RegistryComponent>;

/**
 * Fetch the component registry from GitHub or local file
 */
export async function fetchRegistry(framework: Framework = 'react'): Promise<Registry> {
  try {
    const registryFile = framework === 'vue' ? 'registry-vue.json' : 'registry.json';

    // In development, try local file first
    const cwd = process.cwd();
    const possiblePaths = [
      // From apps/docs
      path.resolve(cwd, `../../packages/registry/${registryFile}`),
      // From packages/cli
      path.resolve(cwd, `../registry/${registryFile}`),
      // From root
      path.resolve(cwd, `./packages/registry/${registryFile}`),
    ];

    for (const localPath of possiblePaths) {
      if (fs.existsSync(localPath)) {
        return await fs.readJSON(localPath);
      }
    }

    // Try to fetch from URL
    const registryUrl = getRegistryUrl(framework);
    if (registryUrl.startsWith('http')) {
      const response = await fetch(registryUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch registry: ${response.statusText}`);
      }
      return (await response.json()) as Registry;
    }

    throw new Error('Registry not found in local paths or remote URL');
  } catch (error) {
    throw new Error(
      `Failed to load component registry: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get a specific component from the registry
 */
export async function getComponent(
  name: string
): Promise<RegistryComponent | null> {
  const registry = await fetchRegistry();
  return registry[name] || null;
}

/**
 * List all available components
 */
export async function listComponents(): Promise<string[]> {
  const registry = await fetchRegistry();
  return Object.keys(registry);
}
