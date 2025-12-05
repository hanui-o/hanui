'use client';

import { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { Heading, Code } from '@hanui/react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

interface InstallationProps {
  componentName: string;
  componentDescription?: string;
}

export function Installation({
  componentName,
  componentDescription,
}: InstallationProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);
  const [aiCopied, setAiCopied] = useState(false);

  const getCommand = () => {
    const runners: Record<PackageManager, string> = {
      pnpm: 'pnpm',
      npm: 'npx',
      yarn: 'yarn',
      bun: 'bun',
    };
    return `${runners[packageManager]} hanui add ${componentName}`;
  };

  const getAiPrompt = () => {
    return `HANUI 라이브러리에서 ${componentName} 컴포넌트를 설치해줘.

설치 명령어: npx hanui add ${componentName}

설치 후 사용법:
import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())} } from '@/components/ui/${componentName}'

공식 문서: https://hanui.io/components/${componentName}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCommand());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiCopy = async () => {
    await navigator.clipboard.writeText(getAiPrompt());
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2" id="installation" className="text-2xl font-bold">
          설치
        </Heading>
        <button
          onClick={handleAiCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent hover:from-violet-600 hover:to-purple-600"
          title="AI에게 설치 요청할 프롬프트를 복사합니다"
        >
          {aiCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              복사됨
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              AI 프롬프트 복사
            </>
          )}
        </button>
      </div>

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
          <Code variant="block" language="bash">
            {getCommand()}
          </Code>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-3 p-2 rounded-md transition-all bg-krds-gray-70 hover:bg-krds-gray-60 text-krds-gray-10 opacity-0 group-hover:opacity-100"
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
