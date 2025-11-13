import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hanui.io';

  const components = [
    'button',
    'input',
    'card',
    'table',
    'pagination',
    'breadcrumb',
    'modal',
    'select',
    'file-upload',
  ];

  const componentRoutes = components.map((component) => ({
    url: `${baseUrl}/components/${component}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...componentRoutes,
  ];
}
