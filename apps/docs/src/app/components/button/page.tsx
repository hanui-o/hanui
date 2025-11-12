'use client';

import { Button } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Installation } from '@/components/docs/Installation';

export default function ButtonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Button</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          다양한 스타일과 크기를 지원하는 버튼 컴포넌트
        </p>
      </div>

      <div className="mb-12">
        <ComponentPreview>
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </ComponentPreview>
      </div>

      <div className="mb-12">
        <Installation componentName="button" />
      </div>

      {/* Usage */}
      <div className="mb-12">
        <h2 id="usage" className="text-2xl font-bold mb-4">
          Usage
        </h2>
        <CodeBlock
          code={`import { Button } from '@hanui/react'

<Button variant="primary">Click me</Button>`}
          language="tsx"
          showLineNumbers={false}
        />
      </div>

      {/* Examples */}
      <div className="mb-12">
        <h2 id="examples" className="text-2xl font-bold mb-6">
          Examples
        </h2>

        {/* Default */}
        <div className="mb-10">
          <h3 id="default" className="text-xl font-semibold mb-4">
            Default
          </h3>
          <ComponentPreview>
            <Button>Button</Button>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button>Button</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-10">
          <h3 id="sizes" className="text-xl font-semibold mb-4">
            Sizes
          </h3>
          <ComponentPreview>
            <div className="flex items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Variants */}
        <div className="mb-10">
          <h3 id="variants" className="text-xl font-semibold mb-4">
            Variants
          </h3>
          <ComponentPreview>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Outline */}
        <div className="mb-10">
          <h3 id="outline" className="text-xl font-semibold mb-4">
            Outline
          </h3>
          <ComponentPreview>
            <Button variant="outline">Outline</Button>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="outline">Outline</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Ghost */}
        <div className="mb-10">
          <h3 id="ghost" className="text-xl font-semibold mb-4">
            Ghost
          </h3>
          <ComponentPreview>
            <div className="flex items-center gap-3">
              <Button variant="ghost">Ghost</Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="ghost">Ghost</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Black */}
        <div className="mb-10">
          <h3 id="ghost-primary" className="text-xl font-semibold mb-4">
            Ghost Primary
          </h3>
          <ComponentPreview>
            <Button variant="ghost-primary">Ghost Primary</Button>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button variant="ghost-primary">Ghost Primary</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Loading */}
        <div className="mb-10">
          <h3 id="loading" className="text-xl font-semibold mb-4">
            Loading
          </h3>
          <ComponentPreview>
            <div className="flex items-center gap-3">
              <Button loading>Loading</Button>
              <Button loading disabled>
                Loading Disabled
              </Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button loading>Loading</Button>
<Button loading disabled>Loading Disabled</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>

        {/* Disabled */}
        <div className="mb-10">
          <h3 id="disabled" className="text-xl font-semibold mb-4">
            Disabled
          </h3>
          <ComponentPreview>
            <div className="flex items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Outline Disabled
              </Button>
            </div>
          </ComponentPreview>
          <div className="mt-4">
            <CodeBlock
              code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Outline Disabled</Button>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
