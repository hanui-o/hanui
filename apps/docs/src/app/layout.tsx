import type { Metadata } from 'next';
import { Krona_One } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { StructuredData } from '@/components/StructuredData';
import './globals.css';

const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-krona-one',
});

export const metadata: Metadata = {
  title: 'HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리',
  description:
    'KRDS(Korea Republic Design System)를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리. 접근성 AA 등급, TypeScript 지원, 9개 핵심 컴포넌트 제공.',
  keywords: [
    'HANUI',
    'KRDS',
    '공공 웹',
    'React',
    '컴포넌트 라이브러리',
    'UI 라이브러리',
    '접근성',
    'TypeScript',
    '디자인 시스템',
    'Korean Design System',
  ],
  authors: [{ name: 'odada-o', url: 'https://github.com/odada-o' }],
  creator: 'odada-o',
  publisher: 'HANUI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://hanui.io',
    siteName: 'HANUI',
    title: 'HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리',
    description:
      'KRDS를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리. 접근성 AA 등급, TypeScript 지원, 9개 핵심 컴포넌트 제공.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리',
    description:
      'KRDS를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리. 접근성 AA 등급, TypeScript 지원.',
    images: ['/og-image.png'],
    creator: '@odada_o',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  metadataBase: new URL('https://hanui.io'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-gov.min.css"
        />
        <StructuredData />
      </head>
      <body className={`${kronaOne.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
