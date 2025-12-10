import { type ReactNode } from 'react';

interface ComponentPreviewProps {
  children: ReactNode;
  className?: string;
  /** 내부 flex 컨테이너에 적용할 추가 클래스 (기본: items-center justify-center) */
  align?: 'center' | 'start';
}

export function ComponentPreview({
  children,
  className = '',
  align = 'center',
}: ComponentPreviewProps) {
  return (
    <div
      className={`relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-10 ${className}`}
    >
      <div
        className={`flex min-h-[200px] ${
          align === 'start'
            ? 'items-start justify-start pt-6'
            : 'items-center justify-center'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
