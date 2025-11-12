import { type ReactNode } from 'react';

interface GuidelineSectionProps {
  type: 'do' | 'dont';
  title: string;
  children: ReactNode;
  className?: string;
}

export function GuidelineSection({
  type,
  title,
  children,
  className = '',
}: GuidelineSectionProps) {
  const isDo = type === 'do';

  const borderColor = isDo
    ? 'border-green-200 dark:border-green-900'
    : 'border-red-200 dark:border-red-900';

  const bgColor = isDo
    ? 'bg-green-50 dark:bg-green-950/30'
    : 'bg-red-50 dark:bg-red-950/30';

  const iconBgColor = isDo
    ? 'bg-green-500 dark:bg-green-600'
    : 'bg-red-500 dark:bg-red-600';

  const textColor = isDo
    ? 'text-green-900 dark:text-green-100'
    : 'text-red-900 dark:text-red-100';

  const Icon = isDo ? CheckIcon : XIcon;

  return (
    <div
      className={`rounded-lg border-2 ${borderColor} ${bgColor} p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`rounded-full ${iconBgColor} p-1.5`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h4 className={`text-lg font-semibold ${textColor}`}>{title}</h4>
      </div>
      <div className={`text-sm ${textColor}/90 space-y-2`}>{children}</div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
