'use client';

import { Code } from '@hanui/react';
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (isValidElement(children)) {
    return extractText((children as ReactElement<any>).props.children);
  }
  return '';
}

function extractLanguage(className?: string): string | undefined {
  if (!className) return undefined;
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : undefined;
}

function InlineCode({ children }: { children?: ReactNode }) {
  return <Code variant="inline">{children}</Code>;
}

function PreBlock({ children }: { children?: ReactNode }) {
  if (isValidElement(children)) {
    const child = children as ReactElement<any>;
    if (child.type === 'code' || (child.props && child.props.className)) {
      const language = extractLanguage(child.props.className);
      const text = extractText(child.props.children).replace(/\n$/, '');

      return (
        <Code
          variant="block"
          language={language || 'text'}
          showLineNumbers={false}
        >
          {text}
        </Code>
      );
    }
  }

  return <pre>{children}</pre>;
}

const componentMap: Record<string, any> = {
  code: InlineCode,
  pre: PreBlock,
};

function replaceComponents(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    const el = child as ReactElement<any>;
    const type = el.type;

    // Replace code/pre with HANUI components
    if (typeof type === 'string' && componentMap[type]) {
      const Component = componentMap[type];
      return <Component {...el.props} />;
    }

    // Recurse into children (but not into pre/code which are already handled)
    if (el.props.children) {
      return cloneElement(el, {
        ...el.props,
        children: replaceComponents(el.props.children),
      });
    }

    return child;
  });
}

export function BlogMDXContent({ children }: { children: ReactNode }) {
  return (
    <div
      data-blog-content=""
      className={[
        'prose prose-lg dark:prose-invert max-w-none',
        // headings
        'prose-headings:text-krds-gray-95 prose-headings:font-bold',
        'prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-krds-gray-10',
        'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
        // text
        'prose-p:text-krds-gray-70 prose-p:leading-[1.8] prose-p:mb-4',
        'prose-li:text-krds-gray-70 prose-li:leading-[1.8]',
        // links
        'prose-a:text-krds-primary-base prose-a:no-underline hover:prose-a:underline',
        // strong
        'prose-strong:text-krds-gray-95 prose-strong:font-semibold',
        // blockquote
        'prose-blockquote:border-l-4 prose-blockquote:border-krds-primary-base prose-blockquote:bg-krds-gray-5/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:not-italic prose-blockquote:text-krds-gray-70',
        // hr
        'prose-hr:border-krds-gray-10 prose-hr:my-8',
        // table
        'prose-table:border prose-table:border-krds-gray-20 prose-th:bg-krds-gray-5 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-krds-gray-10',
        // img
        'prose-img:rounded-lg prose-img:shadow-sm prose-img:mx-auto',
        // Reset prose code/pre styles (HANUI Code handles it)
        'prose-code:text-inherit prose-code:font-inherit prose-code:before:content-none prose-code:after:content-none',
        'prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-0',
        '[&_.github-dark]:p-4',
      ].join(' ')}
    >
      {replaceComponents(children)}
    </div>
  );
}
