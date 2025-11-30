'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Heading, Code } from '@hanui/react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';
type Framework = 'react' | 'vue';

interface InstallationProps {
  componentName: string;
  /** Vue 컴포넌트가 아직 없는 경우 false로 설정 */
  hasVue?: boolean;
}

export function Installation({
  componentName,
  hasVue = true,
}: InstallationProps) {
  const [framework, setFramework] = useState<Framework>('react');
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);

  const getCommand = () => {
    const runners: Record<PackageManager, string> = {
      pnpm: 'pnpm',
      npm: 'npx',
      yarn: 'yarn',
      bun: 'bun',
    };
    const frameworkFlag = framework === 'vue' ? ' -f vue' : '';
    return `${runners[packageManager]} hanui add ${componentName}${frameworkFlag}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <Heading level="h2" id="installation" className="text-2xl font-bold mb-4">
        설치
      </Heading>

      <div className="space-y-4">
        {/* Framework Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-krds-gray-5 rounded-lg">
            <button
              onClick={() => setFramework('react')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                framework === 'react'
                  ? 'bg-white text-krds-gray-90 shadow-sm'
                  : 'text-krds-gray-60 hover:text-krds-gray-90'
              }`}
            >
              React
            </button>
            <button
              onClick={() => setFramework('vue')}
              disabled={!hasVue}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                framework === 'vue'
                  ? 'bg-white text-krds-gray-90 shadow-sm'
                  : 'text-krds-gray-60 hover:text-krds-gray-90'
              } ${!hasVue ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!hasVue ? 'Vue 버전 준비 중' : undefined}
            >
              Vue
            </button>
          </div>
        </div>

        {/* Package Manager Selector */}
        <div className="flex items-center gap-2">
          {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPackageManager(pm)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                packageManager === pm
                  ? 'bg-krds-gray-90 text-white border-krds-gray-90'
                  : 'bg-transparent border-krds-gray-20 text-krds-gray-70 hover:border-krds-gray-30'
              }`}
            >
              {pm}
            </button>
          ))}
        </div>

        <div className="relative group">
          <Code variant="block" language="bash">
            {getCommand()}
          </Code>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-md transition-all bg-krds-gray-70 hover:bg-krds-gray-60 text-krds-gray-10 opacity-0 group-hover:opacity-100"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
