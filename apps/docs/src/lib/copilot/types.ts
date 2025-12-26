export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date;
}

export interface DocumentChunk {
  id: string;
  title: string;
  content: string;
  href: string;
  category: string;
  embedding?: number[];
}

export interface CopilotContextType {
  isOpen: boolean;
  openCopilot: () => void;
  closeCopilot: () => void;
  toggleCopilot: () => void;
}
