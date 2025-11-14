import Link from 'next/link';
import { Stack, Heading } from '@hanui/react';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

const components = [
  {
    name: 'Button',
    href: '/components/button',
    updated: true,
  },
  {
    name: 'Input',
    href: '/components/input',
    updated: true,
  },
  {
    name: 'Select',
    href: '/components/select',
    updated: true,
  },
  {
    name: 'Card',
    href: '/components/card',
    updated: true,
  },
  {
    name: 'Table',
    href: '/components/table',
    updated: true,
  },
  {
    name: 'Modal',
    href: '/components/modal',
    updated: true,
  },
  {
    name: 'Masthead',
    href: '/components/masthead',
    updated: true,
  },
  {
    name: 'Identifier',
    href: '/components/identifier',
    updated: true,
  },
  {
    name: 'Header',
    href: '/components/header',
    updated: true,
  },
  {
    name: 'SkipLink',
    href: '/components/skiplink',
    updated: true,
  },
  {
    name: 'Breadcrumb',
    href: '/components/breadcrumb',
    updated: true,
  },
  {
    name: 'Pagination',
    href: '/components/pagination',
    updated: false,
  },
  {
    name: 'File Upload',
    href: '/components/file-upload',
    updated: false,
  },
  {
    name: 'Tooltip',
    href: '/components/tooltip',
    updated: true,
  },
  {
    name: 'Tabs',
    href: '/components/tabs',
    updated: true,
  },
  {
    name: 'Accordion',
    href: '/components/accordion',
    updated: true,
  },
];

const layoutComponents = [
  {
    name: 'Container',
    href: '/layout/container',
    updated: true,
  },
  {
    name: 'Box',
    href: '/layout/box',
    updated: true,
  },
  {
    name: 'Stack',
    href: '/layout/stack',
    updated: true,
  },
  {
    name: 'Section',
    href: '/layout/section',
    updated: true,
  },
];

const typographyComponents = [
  {
    name: 'Display',
    href: '/typography/display',
    updated: true,
  },
  {
    name: 'Heading',
    href: '/typography/heading',
    updated: true,
  },
  {
    name: 'Body',
    href: '/typography/body',
    updated: true,
  },
  {
    name: 'Label',
    href: '/typography/label',
    updated: true,
  },
  {
    name: 'NavText',
    href: '/typography/navtext',
    updated: true,
  },
];

export default function ComponentsPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Components (컴포넌트)"
        description="HANUI 라이브러리에서 제공하는 모든 컴포넌트를 확인할 수 있습니다. 더
            많은 컴포넌트를 추가하고 있습니다."
      />

      <PageSection>
        {/* Typography Section */}
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="typography"
            className="text-2xl font-semibold"
          >
            타이포그래피
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {typographyComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative rounded-lg transition-all group flex items-center gap-2"
              >
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                  {component.name}
                </span>
                {component.updated && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </Link>
            ))}
          </div>
        </Stack>
      </PageSection>

      <PageSection>
        {/* Layout Section */}
        <Stack spacing="heading-content">
          <Heading level="h2" id="layout" className="text-2xl font-semibold">
            레이아웃
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {layoutComponents.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative rounded-lg transition-all group flex items-center gap-2"
              >
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                  {component.name}
                </span>
                {component.updated && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </Link>
            ))}
          </div>
        </Stack>
      </PageSection>

      <PageSection>
        {/* Components Section */}
        <Stack spacing="heading-content">
          <Heading
            level="h2"
            id="components"
            className="text-2xl font-semibold"
          >
            Components
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {components.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="relative rounded-lg transition-all group flex items-center gap-2"
              >
                <span className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:underline transition-all">
                  {component.name}
                </span>
                {component.updated && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </Link>
            ))}
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
