'use client';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  fileName?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  showLineNumbers = true,
  fileName,
}: CodeBlockProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const highlightCode = async () => {
      const highlighted = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
      });
      setHtml(highlighted);
    };

    highlightCode();
  }, [code, language]);

  if (!html) {
    return (
      <div className="relative group">
        <div className="overflow-x-auto rounded-lg bg-gray-800 dark:bg-gray-900 p-5">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 rounded-t-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-xs text-gray-400 font-mono">{fileName}</span>
        </div>
      )}
      <div className="relative">
        <CopyButton text={code} />
        <div
          className={`overflow-x-auto ${fileName ? 'rounded-b-lg' : 'rounded-lg'} ${
            showLineNumbers ? 'code-with-line-numbers' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        .code-with-line-numbers pre {
          padding-left: 3.5rem;
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
        }
        .code-with-line-numbers code {
          counter-reset: line;
        }
        .code-with-line-numbers code .line {
          line-height: 1.75;
        }
        .code-with-line-numbers code .line::before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          width: 1rem;
          margin-right: 1.5rem;
          margin-left: -3.5rem;
          text-align: right;
          color: #6b7280;
        }
        pre {
          padding: 1.25rem 1rem;
        }
        code .line {
          line-height: 1.75;
        }
      `}</style>
    </div>
  );
}
