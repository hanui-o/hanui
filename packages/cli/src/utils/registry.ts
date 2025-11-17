import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';

const REGISTRY_URL =
  process.env.HANUI_REGISTRY_URL ||
  'https://raw.githubusercontent.com/hanui-o/hanui/main/packages/registry/registry.json';

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
export async function fetchRegistry(): Promise<Registry> {
  try {
    // In development, try local file first
    const cwd = process.cwd();
    const possiblePaths = [
      // From apps/docs
      path.resolve(cwd, '../../packages/registry/registry.json'),
      // From packages/cli
      path.resolve(cwd, '../registry/registry.json'),
      // From root
      path.resolve(cwd, './packages/registry/registry.json'),
    ];

    for (const localPath of possiblePaths) {
      if (fs.existsSync(localPath)) {
        return await fs.readJSON(localPath);
      }
    }

    // Try to fetch from URL
    if (REGISTRY_URL.startsWith('http')) {
      const response = await fetch(REGISTRY_URL);
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
