import { type ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
}

export function ComponentPreview({
  children,
  className = '',
}: ComponentPreviewProps) {
  return (
    <div
      className={`relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-10 ${className}`}
    >
      <div className="flex items-center justify-center min-h-[200px]">
        {children}
      </div>
    </div>
  );
}
