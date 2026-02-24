import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // www → non-www 리다이렉트는 Vercel 도메인 설정에서 처리
      // (next.config에서 하면 Vercel 자체 리다이렉트와 충돌하여 무한 루프 발생)

      // 이전 경로 → 현재 경로
      {
        source: '/design-system/typography',
        destination: '/docs/typography',
        permanent: true,
      },
      {
        source: '/design-system/spacing',
        destination: '/docs/spacing',
        permanent: true,
      },
      {
        source: '/design-system/colors',
        destination: '/docs/colors',
        permanent: true,
      },
      {
        source: '/components/inpagenavigation',
        destination: '/components/in-page-navigation',
        permanent: true,
      },
      {
        source: '/components/section-heading',
        destination: '/components/section-heading-system',
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['@hanui/react'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
    ],
    qualities: [85],
  },
  // NOTE: optimizePackageImports disabled - it incorrectly tries to bundle
  // content components (PageSection, SectionHeading) with @hanui/react
  // experimental: {
  //   optimizePackageImports: ['@hanui/react'],
  // },
  webpack: (config) => {
    // Enable CSS imports from workspace packages
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.css': ['.css'],
    };
    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
