'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export type Framework = 'react' | 'vue';

interface FrameworkContextType {
  framework: Framework;
  setFramework: (framework: Framework) => void;
  isVueSubdomain: boolean;
}

const FrameworkContext = createContext<FrameworkContextType | null>(null);

export function useFramework() {
  const context = useContext(FrameworkContext);
  if (!context) {
    throw new Error('useFramework must be used within a FrameworkProvider');
  }
  return context;
}

/**
 * 서브도메인에서 프레임워크 감지
 * vue.hanui.io → vue
 * hanui.io → react
 * localhost → react (기본값)
 */
function getFrameworkFromHostname(): Framework {
  if (typeof window === 'undefined') return 'react';

  const hostname = window.location.hostname;

  // vue.hanui.io 또는 vue.localhost
  if (hostname.startsWith('vue.')) {
    return 'vue';
  }

  return 'react';
}

interface FrameworkProviderProps {
  children: ReactNode;
  defaultFramework?: Framework;
}

export function FrameworkProvider({
  children,
  defaultFramework,
}: FrameworkProviderProps) {
  const [framework, setFramework] = useState<Framework>(
    defaultFramework ?? 'react'
  );
  const [isVueSubdomain, setIsVueSubdomain] = useState(false);

  useEffect(() => {
    const detectedFramework = getFrameworkFromHostname();
    setFramework(detectedFramework);
    setIsVueSubdomain(detectedFramework === 'vue');
  }, []);

  // 프레임워크 변경 시 서브도메인으로 리다이렉트
  const handleSetFramework = (newFramework: Framework) => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const protocol = window.location.protocol;

    // 로컬 개발 환경에서는 리다이렉트 없이 상태만 변경
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      setFramework(newFramework);
      return;
    }

    // 프로덕션: 서브도메인으로 리다이렉트
    if (newFramework === 'vue' && !hostname.startsWith('vue.')) {
      // hanui.io → vue.hanui.io
      window.location.href = `${protocol}//vue.${hostname}${pathname}`;
    } else if (newFramework === 'react' && hostname.startsWith('vue.')) {
      // vue.hanui.io → hanui.io
      const baseHostname = hostname.replace('vue.', '');
      window.location.href = `${protocol}//${baseHostname}${pathname}`;
    } else {
      setFramework(newFramework);
    }
  };

  return (
    <FrameworkContext.Provider
      value={{ framework, setFramework: handleSetFramework, isVueSubdomain }}
    >
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
