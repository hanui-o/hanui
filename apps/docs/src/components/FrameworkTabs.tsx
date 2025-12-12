'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Framework = 'react' | 'vue';

interface FrameworkContextType {
  framework: Framework;
  setFramework: (framework: Framework) => void;
}

const FrameworkContext = createContext<FrameworkContextType | null>(null);

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (!context) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return context;
}

interface FrameworkProviderProps {
  children: ReactNode;
  defaultFramework?: Framework;
}

export function FrameworkProvider({
  children,
  defaultFramework = 'react',
}: FrameworkProviderProps) {
  const [framework, setFramework] = useState<Framework>(defaultFramework);

  return (
    <FrameworkContext.Provider value={{ framework, setFramework }}>
      {children}
    </FrameworkContext.Provider>
  );
}

interface FrameworkTabsProps {
  className?: string;
}

export function FrameworkTabs({ className = '' }: FrameworkTabsProps) {
  const { framework, setFramework } = useFramework();

  const tabs: { value: Framework; label: string }[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
  ];

  return (
    <div className={`flex gap-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setFramework(tab.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            framework === tab.value
              ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
