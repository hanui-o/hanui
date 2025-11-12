'use client';

import { useState } from 'react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

const commands: Record<PackageManager, string> = {
  pnpm: 'pnpm add @hanui/react',
  npm: 'npm install @hanui/react',
  yarn: 'yarn add @hanui/react',
  bun: 'bun add @hanui/react',
};

export function PackageManagerTabs() {
  const [activeTab, setActiveTab] = useState<PackageManager>('pnpm');

  const tabs: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun'];

  return (
    <div className="space-y-3">
      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
            )}
          </button>
        ))}
      </div>

      {/* Command Display */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4">
        <code className="text-sm font-mono text-gray-900 dark:text-gray-100">
          {commands[activeTab]}
        </code>
      </div>
    </div>
  );
}
