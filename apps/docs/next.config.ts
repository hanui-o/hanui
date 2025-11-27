import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
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
