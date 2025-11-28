'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Heading } from '@hanui/react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

interface InstallationProps {
  componentName: string;
}

export function Installation({ componentName }: InstallationProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);

  const getCommand = () => {
    const runners: Record<PackageManager, string> = {
      pnpm: 'pnpm dlx',
      npm: 'npx',
      yarn: 'npx',
      bun: 'bunx',
    };
    return `${runners[packageManager]} @hanui/cli add ${componentName}`;
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
          <div className="overflow-x-auto rounded-lg bg-krds-gray-90 p-5">
            <code className="text-krds-white text-[17px] leading-6">
              {getCommand()}
            </code>
          </div>
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
