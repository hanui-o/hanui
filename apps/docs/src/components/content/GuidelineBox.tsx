import { type ReactNode } from 'react';
import { Heading } from '@hanui/react';

interface GuidelineBoxProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function GuidelineBox({
  title,
  children,
  className = '',
}: GuidelineBoxProps) {
  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 ${className}`}
    >
      <Heading level="h3" className="mb-3">
        {title}
      </Heading>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}
