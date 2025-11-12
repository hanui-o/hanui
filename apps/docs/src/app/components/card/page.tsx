'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Button,
} from '@hanui/react';
import Link from 'next/link';

export default function CardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-20 dark:border-gray-80">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary-60">HANUI</h1>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-sm text-gray-60 dark:text-gray-40 mb-4">
            <Link href="/" className="hover:text-primary-60">
              홈
            </Link>
            {' / '}
            <Link href="/components" className="hover:text-primary-60">
              컴포넌트
            </Link>
            {' / '}
            <span>Card</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Card</h1>
          <p className="text-xl text-gray-60 dark:text-gray-40 mb-8">
            콘텐츠를 담는 KRDS 기반 카드 레이아웃 컴포넌트
          </p>

          {/* Quick Start */}
          <section className="mb-12">
            <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
              <Card>
                <CardHeader>
                  <CardTitle>카드 제목</CardTitle>
                  <CardDescription>카드 설명입니다</CardDescription>
                </CardHeader>
                <CardBody>카드 본문 내용</CardBody>
                <CardFooter>
                  <Button size="sm">확인</Button>
                </CardFooter>
              </Card>
            </div>
            <pre className="mt-4 p-4 bg-white dark:bg-gray-95 rounded overflow-x-auto text-sm">
              <code>{`import { Card } from '@hanui/react';

<Card>
  <Card.Header>
    <Card.Title>카드 제목</Card.Title>
    <Card.Description>카드 설명</Card.Description>
  </Card.Header>
  <Card.Body>내용</Card.Body>
  <Card.Footer>
    <Button>확인</Button>
  </Card.Footer>
</Card>`}</code>
            </pre>
          </section>

          {/* Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Examples</h2>

            <div className="space-y-12">
              {/* Variant */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Variant</h3>
                <p className="text-gray-60 dark:text-gray-40 mb-4">
                  세 가지 시각적 스타일을 지원합니다.
                </p>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="default">
                      <CardBody>Default (그림자)</CardBody>
                    </Card>
                    <Card variant="outlined">
                      <CardBody>Outlined (테두리)</CardBody>
                    </Card>
                    <Card variant="filled">
                      <CardBody>Filled (배경)</CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Padding */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Padding</h3>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <div className="space-y-4">
                    <Card padding="small">
                      <CardBody>Small Padding</CardBody>
                    </Card>
                    <Card padding="medium">
                      <CardBody>Medium Padding</CardBody>
                    </Card>
                    <Card padding="large">
                      <CardBody>Large Padding</CardBody>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Hoverable */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Hoverable</h3>
                <div className="p-6 bg-gray-5 dark:bg-gray-90 rounded-lg">
                  <Card hoverable onClick={() => alert('클릭!')}>
                    <CardBody>클릭 가능한 카드 (마우스 올려보세요)</CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8">API Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <th className="text-left py-3 px-4 font-semibold">Prop</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">variant</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;default&quot; | &quot;outlined&quot; |
                      &quot;filled&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;default&quot;
                    </td>
                    <td className="py-3 px-4">카드의 시각적 스타일</td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">padding</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;none&quot; | &quot;small&quot; | &quot;medium&quot;
                      | &quot;large&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;medium&quot;
                    </td>
                    <td className="py-3 px-4">패딩 크기</td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">hoverable</td>
                    <td className="py-3 px-4 font-mono text-sm">boolean</td>
                    <td className="py-3 px-4 font-mono text-sm">false</td>
                    <td className="py-3 px-4">호버 효과 활성화</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-20 dark:border-gray-80 py-8">
        <div className="container mx-auto px-4 text-center text-gray-60 dark:text-gray-40">
          <p>MIT License · KRDS 기반 공공 웹 UI 컴포넌트 라이브러리</p>
        </div>
      </footer>
    </div>
  );
}
