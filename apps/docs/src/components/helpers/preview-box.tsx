'use client';

import { type ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Code with SSR disabled to prevent hydration issues
const Code = dynamic(() => import('@hanui/react').then((mod) => mod.Code), {
  ssr: false,
});

interface PreviewBoxProps {
  preview: ReactNode;
  code: string;
  language?: string;
}

export function PreviewBox({
  preview,
  code,
  language = 'tsx',
}: PreviewBoxProps) {
  return (
    <div className="space-y-4">
      {preview && (
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center justify-center min-h-[120px]">
          {preview}
        </div>
      )}
      <Code variant="block" language={language}>
        {code}
      </Code>
    </div>
  );
}
