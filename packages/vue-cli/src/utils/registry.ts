/**
 * Vue Component Registry
 */

import fs from 'fs-extra';

export interface RegistryComponent {
  name: string;
  type: 'component' | 'util';
  description: string;
  files: {
    path: string;
    target?: string;
  }[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}

export type Registry = Record<string, RegistryComponent>;

const REGISTRY_URL =
  process.env.HANUI_REGISTRY_URL ||
  'https://raw.githubusercontent.com/hanui-o/hanui/main/packages/registry/registry-vue.json';

const SOURCE_BASE_URL =
  'https://raw.githubusercontent.com/hanui-o/hanui/main/packages/vue/src';

/**
 * Fetch the Vue component registry
 */
export async function fetchRegistry(): Promise<Registry> {
  // Support local file:// URLs for development
  if (REGISTRY_URL.startsWith('file://')) {
    const filePath = REGISTRY_URL.replace('file://', '');
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  const response = await fetch(REGISTRY_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Get the base URL for fetching component source files
 */
export function getSourceBaseUrl(): string {
  return SOURCE_BASE_URL;
}
