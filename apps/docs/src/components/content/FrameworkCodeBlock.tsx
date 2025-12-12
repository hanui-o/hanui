'use client';

import type { ReactNode } from 'react';
import { useFramework, FrameworkTabs } from '../FrameworkTabs';
import { CodeBlock } from './CodeBlock';

interface FrameworkCodeBlockProps {
  reactCode: string;
  vueCode: string;
  reactLanguage?: string;
  vueLanguage?: string;
  showLineNumbers?: boolean;
  reactFileName?: string;
  vueFileName?: string;
  showTabs?: boolean;
}

export function FrameworkCodeBlock({
  reactCode,
  vueCode,
  reactLanguage = 'tsx',
  vueLanguage = 'vue',
  showLineNumbers = true,
  reactFileName,
  vueFileName,
  showTabs = false,
}: FrameworkCodeBlockProps) {
  const { framework } = useFramework();

  const code = framework === 'react' ? reactCode : vueCode;
  const language = framework === 'react' ? reactLanguage : vueLanguage;
  const fileName = framework === 'react' ? reactFileName : vueFileName;

  return (
    <div className="space-y-3">
      {showTabs && (
        <div className="flex justify-end">
          <FrameworkTabs />
        </div>
      )}
      <CodeBlock
        code={code}
        language={language}
        showLineNumbers={showLineNumbers}
        fileName={fileName}
      />
    </div>
  );
}

interface FrameworkContentProps {
  react: ReactNode;
  vue: ReactNode;
}

export function FrameworkContent({ react, vue }: FrameworkContentProps) {
  const { framework } = useFramework();
  return <>{framework === 'react' ? react : vue}</>;
}
