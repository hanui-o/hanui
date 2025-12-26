'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { X, Send, Sparkles, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useCopilot } from './CopilotProvider';

export function CopilotModal() {
  const { isOpen, closeCopilot } = useCopilot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: '/api/copilot/chat',
  });

  // Helper to set input value
  const setInputValue = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value;
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
      handleInputChange({
        target: { value },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset messages when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen, setMessages]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCopilot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCopilot]);

  // Handle form submit with Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input?.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={closeCopilot}
    >
      <div
        className="w-full max-w-2xl mx-4 h-[70vh] bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 border border-krds-gray-10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-krds-gray-10 bg-krds-gray-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-krds-primary-base/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-krds-primary-base" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-krds-gray-95">
                HANUI Copilot
              </h2>
              <p className="text-sm text-krds-gray-60">AI 문서 도우미</p>
            </div>
          </div>
          <button
            onClick={closeCopilot}
            className="p-2 rounded-lg hover:bg-krds-gray-10 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-krds-gray-60" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-krds-primary-base/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-krds-primary-base" />
              </div>
              <h3 className="text-lg font-semibold text-krds-gray-95 mb-2">
                HANUI에 대해 물어보세요
              </h3>
              <p className="text-sm text-krds-gray-60 mb-6 max-w-sm">
                컴포넌트 사용법, KRDS 가이드라인, 접근성 등 무엇이든 질문하세요.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  'Button 사용법',
                  'Input 유효성 검사',
                  'Modal 열기/닫기',
                  'KRDS 색상',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-4 py-2 text-sm rounded-lg bg-krds-gray-5 text-krds-gray-70 hover:bg-krds-primary-base/10 hover:text-krds-primary-base transition-all border border-krds-gray-10"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-krds-gray-80'
                      : 'bg-krds-primary-base/10'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-krds-primary-base" />
                  )}
                </div>

                {/* Message */}
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === 'user' ? 'text-right' : ''
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-krds-primary-base text-white rounded-br-md'
                        : 'bg-krds-gray-5 text-krds-gray-95 rounded-bl-md'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none prose-pre:bg-krds-gray-90 prose-pre:text-krds-gray-10 prose-code:text-krds-primary-base prose-code:bg-krds-primary-base/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-krds-primary-base/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-krds-primary-base" />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-krds-gray-5 rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin text-krds-primary-base" />
                <span className="text-sm text-krds-gray-60">
                  답변 생성 중...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-krds-gray-10 bg-white"
        >
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="질문을 입력하세요... (Enter로 전송)"
              rows={1}
              className="flex-1 px-4 py-3 rounded-xl border border-krds-gray-20 bg-krds-gray-0 resize-none focus:outline-none focus:ring-2 focus:ring-krds-primary-base/30 focus:border-krds-primary-base text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input?.trim() || isLoading}
              className="px-4 py-3 rounded-xl bg-krds-primary-base text-white hover:bg-krds-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="전송"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-krds-gray-50 mt-2 text-center">
            <kbd className="px-1.5 py-0.5 rounded bg-krds-gray-10 text-krds-gray-60">
              Cmd
            </kbd>{' '}
            +{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-krds-gray-10 text-krds-gray-60">
              /
            </kbd>{' '}
            로 열기 ·{' '}
            <kbd className="px-1.5 py-0.5 rounded bg-krds-gray-10 text-krds-gray-60">
              ESC
            </kbd>{' '}
            로 닫기
          </p>
        </form>
      </div>
    </div>
  );
}
