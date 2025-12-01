import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hanui.io';

  // Docs pages
  const docs = [
    'introduction',
    'installation',
    'quick-start',
    'colors',
    'typography',
    'border-radius',
    'spacing',
    'breakpoints',
  ];

  // All components from Sidebar.tsx
  const components = [
    'accordion',
    'alert',
    'alert-dialog',
    'aspect-ratio',
    'badge',
    'body',
    'breadcrumb',
    'button',
    'card',
    'center',
    'checkbox',
    'code',
    'container',
    'data-table',
    'display',
    'dropdown-menu',
    'file-upload',
    'flex',
    'footer',
    'form-field',
    'grid',
    'heading',
    'identifier',
    'image',
    'in-page-navigation',
    'input',
    'label',
    'link',
    'list',
    'mainmenu',
    'masthead',
    'modal',
    'pagination',
    'progress',
    'radio',
    'section-heading-system',
    'select',
    'side-navigation',
    'simple-grid',
    'skeleton',
    'skiplink',
    'slider',
    'spinner',
    'stack',
    'switch',
    'tabbars',
    'table',
    'tabs',
    'textarea',
    'toast',
    'tooltip',
    'wrap',
  ];

  const docsRoutes = docs.map((doc) => ({
    url: `${baseUrl}/docs/${doc}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const componentRoutes = components.map((component) => ({
    url: `${baseUrl}/components/${component}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...docsRoutes,
    ...componentRoutes,
  ];
}
