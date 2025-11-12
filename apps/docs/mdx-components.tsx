import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-4">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-gray-70 dark:text-gray-30 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-70 dark:text-gray-30">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-70 dark:text-gray-30">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="text-sm bg-gray-10 dark:bg-gray-90 px-1.5 py-0.5 rounded font-mono text-primary-60">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="p-4 bg-gray-5 dark:bg-gray-95 rounded-lg overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary-60 hover:text-primary-70 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-60 pl-4 py-2 my-4 text-gray-60 dark:text-gray-40 italic">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="text-left py-3 px-4 font-semibold border-b border-gray-20 dark:border-gray-80">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="py-3 px-4 border-b border-gray-20 dark:border-gray-80 text-gray-70 dark:text-gray-30">
        {children}
      </td>
    ),
    ...components,
  };
}
