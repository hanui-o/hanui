export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HANUI',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    description:
      'KRDS(Korea Republic Design System)를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      name: 'odada-o',
      url: 'https://github.com/odada-o',
    },
    provider: {
      '@type': 'Organization',
      name: 'HANUI',
      url: 'https://hanui.io',
    },
    screenshot: 'https://hanui.io/og-image.png',
    softwareVersion: '0.1.0',
    programmingLanguage: 'TypeScript',
    url: 'https://hanui.io',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://hanui.io',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
