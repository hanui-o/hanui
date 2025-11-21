'use client';

import { Header } from '@hanui/react';
import { Container } from '@hanui/react';

export default function HeaderPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative z-50">
        <Header
          serviceName="HANUI Design System"
          utilityLinks={[
            { label: '로그인', href: '#' },
            { label: '회원가입', href: '#' },
            { label: '사이트맵', href: '#' },
          ]}
          navLinks={[
            {
              label: '가이드',
              href: '#',
              children: [
                { label: '시작하기', href: '#' },
                { label: '원칙', href: '#' },
              ],
            },
            {
              label: '컴포넌트',
              href: '#',
              active: true,
              children: [
                { label: '레이아웃', href: '#' },
                { label: '네비게이션', href: '#', active: true },
                { label: '입력 서식', href: '#' },
              ],
            },
            { label: '패턴', href: '#' },
            { label: '템플릿', href: '#' },
          ]}
          showSearch
          onSearch={(query) => alert(`검색어: ${query}`)}
        />
      </div>

      <Container className="pt-40">
        <h1 className="text-4xl font-bold mb-8">Header Component</h1>
        <p className="mb-8 text-lg text-gray-600">
          The Header component provides a standard navigation structure
          compliant with KRDS.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              {`import { Header } from '@hanui/react';

<Header
  serviceName="My Service"
  utilityLinks={[...]}
  navLinks={[...]}
  showSearch
/>`}
            </pre>
          </section>
        </div>
      </Container>
    </div>
  );
}
