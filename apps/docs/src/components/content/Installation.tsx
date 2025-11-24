'use client';

import { useState } from 'react';
import { Heading } from '@hanui/react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

interface InstallationProps {
  componentName: string;
}

export function Installation({ componentName }: InstallationProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');

  const getInstallCommand = () => {
    const commands = {
      pnpm: `pnpm dlx @hanui/cli add ${componentName}`,
      npm: `npx @hanui/cli add ${componentName}`,
      yarn: `npx @hanui/cli add ${componentName}`,
      bun: `bunx @hanui/cli add ${componentName}`,
    };
    return commands[packageManager];
  };

  return (
    <div className="space-y-4">
      <Heading level="h2" id="installation" className="text-2xl font-bold mb-4">
        설치
      </Heading>

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
    </div>
  );
}
