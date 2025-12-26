'use client';

import { Sparkles } from 'lucide-react';
import { useCopilot } from './CopilotProvider';

export function CopilotButton() {
  const { openCopilot } = useCopilot();

  return (
    <button
      onClick={openCopilot}
      className="fixed right-6 bottom-6 z-50 w-14 h-14 rounded-full bg-krds-primary-base text-white shadow-lg hover:bg-krds-primary-dark hover:scale-105 transition-all flex items-center justify-center group"
      aria-label="HANUI Copilot 열기"
    >
      <Sparkles className="w-6 h-6" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 rounded-lg bg-krds-gray-90 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        AI 도우미
        <span className="ml-2 text-krds-gray-40">⌘/</span>
      </span>

      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-krds-primary-base animate-ping opacity-20" />
    </button>
  );
}
