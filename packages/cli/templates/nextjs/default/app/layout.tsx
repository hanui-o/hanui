import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HANUI App',
  description: 'Created with create-hanui-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
