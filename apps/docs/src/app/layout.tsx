import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: 'HANUI - KRDS 기반 공공 웹 UI 컴포넌트 라이브러리',
  description:
    'KRDS(Korea Republic Design System)를 준수하는 공공 웹사이트용 React 컴포넌트 라이브러리',
  keywords: ['HANUI', 'KRDS', '공공 웹', 'React', '컴포넌트 라이브러리'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKR.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
