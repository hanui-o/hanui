'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function QuickStartPage() {
  return (
    <>
      <PageHeader
        title="Quick Start"
        description="HANUI의 기본 사용법을 빠르게 익혀보세요. 5분이면 충분합니다!"
      />

      {/* First Component */}
      <PageSection>
        <Heading level="h2" id="first-component">
          첫 번째 컴포넌트 사용하기
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>가장 기본적인 Button 컴포넌트부터 시작해보겠습니다.</Body>

          <div className="space-y-4">
            <div>
              <Body size="sm" weight="bold" className="mb-2">
                1. 컴포넌트 import
              </Body>
              <CodeBlock
                code="import { Button } from '@hanui/react';"
                language="typescript"
                showLineNumbers={false}
              />
            </div>

            <div>
              <Body size="sm" weight="bold" className="mb-2">
                2. 컴포넌트 사용
              </Body>
              <CodeBlock
                code={`function App() {
  return (
    <div className="p-8">
      <Button>클릭하세요</Button>
    </div>
  );
}`}
                language="tsx"
              />
            </div>

            <div>
              <Body size="sm" weight="bold" className="mb-2">
                3. Props로 커스터마이징
              </Body>
              <CodeBlock
                code={`<Button variant="primary" size="lg">
  주요 버튼
</Button>

<Button variant="secondary" size="md">
  부차 버튼
</Button>

<Button variant="outline" size="sm">
  외곽선 버튼
</Button>`}
                language="tsx"
              />
            </div>
          </div>
        </Stack>
      </PageSection>

      {/* Common Patterns */}
      <PageSection>
        <Heading level="h2" id="common-patterns">
          자주 사용하는 패턴
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Form Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">폼 만들기</Heading>
            <div>
              <Body size="sm" className="text-gray-600 dark:text-gray-400 mb-3">
                Input과 Button을 조합하여 간단한 로그인 폼을 만들어보세요:
              </Body>
              <CodeBlock
                code={`import { Input, Button } from '@hanui/react';

function LoginForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium">
          비밀번호
        </label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <Button type="submit" variant="primary" className="w-full">
        로그인
      </Button>
    </form>
  );
}`}
                language="tsx"
              />
            </div>
          </Stack>

          {/* Card Layout */}
          <Stack spacing="heading-tight">
            <Heading level="h3">카드 레이아웃</Heading>
            <div>
              <Body size="sm" className="text-gray-600 dark:text-gray-400 mb-3">
                Container와 Card를 사용하여 깔끔한 레이아웃을 구성하세요:
              </Body>
              <CodeBlock
                code={`import { Container, Card, Button } from '@hanui/react';

function Dashboard() {
  return (
    <Container maxWidth="xl">
      <h1 className="text-3xl font-bold mb-6">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <h2 className="text-xl font-semibold mb-2">방문자 수</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">신규 회원</h2>
          <p className="text-3xl font-bold text-green-600">56</p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">문의사항</h2>
          <p className="text-3xl font-bold text-orange-600">12</p>
        </Card>
      </div>
    </Container>
  );
}`}
                language="tsx"
              />
            </div>
          </Stack>

          {/* Modal Usage */}
          <Stack spacing="heading-tight">
            <Heading level="h3">모달 사용하기</Heading>
            <div>
              <Body size="sm" className="text-gray-600 dark:text-gray-400 mb-3">
                Modal 컴포넌트로 사용자 인터랙션을 추가하세요:
              </Body>
              <CodeBlock
                code={`import { useState } from 'react';
import { Modal, Button } from '@hanui/react';

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        삭제하기
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="정말 삭제하시겠습니까?"
      >
        <p className="mb-4">
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // 삭제 로직
              setIsOpen(false);
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>
    </>
  );
}`}
                language="tsx"
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* TypeScript Support */}
      <PageSection>
        <Heading level="h2" id="typescript-support">
          TypeScript 지원
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>
            HANUI는 TypeScript로 작성되어 완벽한 타입 지원을 제공합니다:
          </Body>
          <CodeBlock
            code={`import { Button, type ButtonProps } from '@hanui/react';

// Props의 타입이 자동으로 추론됩니다
function CustomButton(props: ButtonProps) {
  return (
    <Button
      variant="primary"  // 자동완성 지원
      size="md"          // 잘못된 값은 에러 표시
      {...props}
    />
  );
}

// 이벤트 핸들러도 타입 안전
<Button onClick={(e: React.MouseEvent) => {
  console.log(e.currentTarget);
}}>
  클릭
</Button>`}
            language="tsx"
          />
        </Stack>
      </PageSection>

      {/* Styling Customization */}
      <PageSection>
        <Heading level="h2" id="styling-customization">
          스타일 커스터마이징
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Tailwind CSS 클래스를 사용하여 컴포넌트를 쉽게 커스터마이징할 수
            있습니다:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">className prop 사용</Heading>
            <CodeBlock
              code={`<Button className="w-full rounded-full shadow-lg">
  전체 너비 둥근 버튼
</Button>

<Input className="border-2 border-blue-500 focus:ring-4" />

<Card className="hover:shadow-xl transition-shadow duration-300">
  호버 시 그림자 효과
</Card>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">다크 모드 지원</Heading>
            <CodeBlock
              code={`// HANUI 컴포넌트는 기본적으로 다크 모드를 지원합니다
<div className="bg-white dark:bg-gray-900">
  <Button>자동으로 다크 모드 적용</Button>
</div>`}
              language="tsx"
            />
          </Stack>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Heading level="h2" id="accessibility">
          접근성 (Accessibility)
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>HANUI는 웹 접근성을 기본으로 제공합니다:</Body>

          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-6 border border-blue-200 dark:border-blue-900">
            <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                <span>
                  <strong>키보드 네비게이션:</strong> Tab, Enter, Space 키로
                  모든 컴포넌트 조작 가능
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                <span>
                  <strong>스크린 리더:</strong> ARIA 레이블과 역할이 자동으로
                  적용
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                <span>
                  <strong>포커스 관리:</strong> 명확한 포커스 표시 및 순서
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400">✓</span>
                <span>
                  <strong>색상 대비:</strong> WCAG 2.1 AA 수준의 명암비 준수
                </span>
              </li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Heading level="h2" id="best-practices">
          모범 사례
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <Heading
              level="h3"
              className="text-green-800 dark:text-green-200 mb-1"
            >
              ✓ Do: 시맨틱 HTML 사용
            </Heading>
            <CodeBlock
              code={`<Container as="main">
  <h1>페이지 제목</h1>
  <Button type="submit">제출</Button>
</Container>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-green-500 pl-4 py-2">
            <Heading
              level="h3"
              className="text-green-800 dark:text-green-200 mb-1"
            >
              ✓ Do: 명확한 레이블 제공
            </Heading>
            <CodeBlock
              code={`<label htmlFor="email">이메일</label>
<Input id="email" type="email" />`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-red-500 pl-4 py-2">
            <Heading level="h3" className="text-red-800 dark:text-red-200 mb-1">
              ✗ Don't: 접근성 무시
            </Heading>
            <CodeBlock
              code={`<div onClick={handleClick}>  {/* 버튼이 아님 */}
  클릭하세요
</div>`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>
        </Stack>
      </PageSection>

      {/* Next Steps */}
      <PageSection>
        <Heading level="h2" id="next-steps">
          다음 단계
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <Body className="mb-4">
              이제 HANUI의 기본 사용법을 익혔습니다! 더 많은 컴포넌트를
              살펴보세요:
            </Body>
            <div className="space-y-2">
              <a
                href="/components"
                className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                전체 컴포넌트 보기 →
              </a>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href="/components/button"
                  className="block px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center text-sm"
                >
                  Button
                </a>
                <a
                  href="/components/input"
                  className="block px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center text-sm"
                >
                  Input
                </a>
                <a
                  href="/components/select"
                  className="block px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center text-sm"
                >
                  Select
                </a>
                <a
                  href="/layout/container"
                  className="block px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center text-sm"
                >
                  Container
                </a>
              </div>
            </div>
          </div>
        </Stack>
      </PageSection>
    </>
  );
}
