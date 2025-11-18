'use client';

import { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { Heading } from '@hanui/react';

type InstallMethod = 'cli' | 'manual';
type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

interface InstallationProps {
  componentName: string;
  manualCode?: string;
}

export function Installation({
  componentName: _componentName,
  manualCode,
}: InstallationProps) {
  const [method, setMethod] = useState<InstallMethod>('cli');
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');

  const getInstallCommand = () => {
    const commands = {
      pnpm: `pnpm add @hanui/react`,
      npm: `npm install @hanui/react`,
      yarn: `yarn add @hanui/react`,
      bun: `bun add @hanui/react`,
    };
    return commands[packageManager];
  };

  return (
    <div className="space-y-4">
      <Heading level="h2" id="installation" className="text-2xl font-bold mb-4">
        설치
      </Heading>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setMethod('cli')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            method === 'cli'
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          CLI
          {method === 'cli' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
          )}
        </button>
        <button
          onClick={() => setMethod('manual')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            method === 'manual'
              ? 'text-gray-900 dark:text-gray-100'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Manual
          {method === 'manual' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
          )}
        </button>
      </div>

      {method === 'cli' && (
        <div className="space-y-4">
          {/* Package Manager Selector */}
          <div className="flex items-center gap-2">
            {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
              <button
                key={pm}
                onClick={() => setPackageManager(pm)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  packageManager === pm
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100'
                    : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {pm}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-gray-950 dark:bg-gray-900 p-4 font-mono">
            <div className="text-gray-100">{getInstallCommand()}</div>
          </div>
        </div>
      )}

      {method === 'manual' && manualCode && (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            패키지 설치 후 아래 코드를 복사하여 사용하세요.
          </p>
          <CodeBlock code={manualCode} language="tsx" showLineNumbers={false} />
        </div>
      )}
    </div>
  );
}
