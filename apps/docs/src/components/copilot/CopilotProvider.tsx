'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { CopilotContextType } from '@/lib/copilot/types';

const CopilotContext = createContext<CopilotContextType | null>(null);

export function useCopilot() {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error('useCopilot must be used within a CopilotProvider');
  }
  return context;
}

interface CopilotProviderProps {
  children: ReactNode;
}

export function CopilotProvider({ children }: CopilotProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openCopilot = useCallback(() => setIsOpen(true), []);
  const closeCopilot = useCallback(() => setIsOpen(false), []);
  const toggleCopilot = useCallback(() => setIsOpen((prev) => !prev), []);

  // Keyboard shortcut: Cmd/Ctrl + /
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        toggleCopilot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCopilot]);

  return (
    <CopilotContext.Provider
      value={{ isOpen, openCopilot, closeCopilot, toggleCopilot }}
    >
      {children}
    </CopilotContext.Provider>
  );
}
