'use client';

import { Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function QuickStartPage() {
  return (
    <>
      <PageHeader
        title="Quick Start"
        description="HANUI의 기본 사용법을 빠르게 익혀보세요. 5분이면 충분합니다!"
      />

      {/* Getting Started */}
      <PageSection>
        <Heading level="h2" id="getting-started">
          시작하기
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            HANUI는 <strong>소스 코드 복사 방식</strong>으로 배포됩니다. CLI
            명령어로 컴포넌트 소스 코드를 프로젝트에 직접 복사하여 완전히
            소유하고 자유롭게 커스터마이징할 수 있습니다.
          </Body>

          {/* Step 1: Init */}
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <Stack spacing="heading-tight">
              <Heading level="h3">1. 프로젝트 초기화</Heading>
              <Body size="sm" className="text-krds-gray-70">
                프로젝트에 HANUI를 처음 설치하는 경우, 먼저 초기화 명령을
                실행하세요:
              </Body>
              <CodeBlock
                code={`npx hanui init`}
                language="bash"
                showLineNumbers={false}
              />
              <Body size="sm" className="text-krds-gray-70">
                이 명령어는 다음을 생성합니다:
              </Body>
              <ul className="space-y-1 text-krds-gray-70 ml-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    <code className="bg-krds-gray-10 px-1 rounded text-xs">
                      components/hanui/
                    </code>{' '}
                    디렉토리
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    <code className="bg-krds-gray-10 px-1 rounded text-xs">
                      lib/utils.ts
                    </code>{' '}
                    유틸리티 파일
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>
                    <code className="bg-krds-gray-10 px-1 rounded text-xs">
                      hanui.json
                    </code>{' '}
                    설정 파일
                  </span>
                </li>
              </ul>
            </Stack>
          </div>

          {/* Step 2: Add Components */}
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <Stack spacing="heading-tight">
              <Heading level="h3">2. 컴포넌트 추가</Heading>
              <Body size="sm" className="text-krds-gray-70">
                필요한 컴포넌트를 프로젝트에 추가합니다:
              </Body>
              <CodeBlock
                code={`npx hanui add button`}
                language="bash"
                showLineNumbers={false}
              />
              <Body size="sm" className="text-krds-gray-70">
                이 명령어는 Button 컴포넌트의 소스 코드를{' '}
                <code className="bg-krds-gray-10 px-1 rounded text-xs">
                  components/hanui/button.tsx
                </code>{' '}
                경로에 복사하고, 필요한 npm 패키지를 자동으로 설치합니다.
              </Body>
            </Stack>
          </div>

          {/* Step 3: Use Components */}
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <Stack spacing="heading-tight">
              <Heading level="h3">3. 컴포넌트 사용</Heading>
              <Body size="sm" className="text-krds-gray-70 mb-2">
                이제 프로젝트 어디서든 컴포넌트를 import하여 사용할 수 있습니다:
              </Body>
              <CodeBlock
                code={`import { Button } from '@/components/hanui/button';

export default function MyPage() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">주요 버튼</Button>
      <Button variant="secondary">부차 버튼</Button>
      <Button variant="outline">아웃라인</Button>
    </div>
  );
}`}
                language="typescript"
                fileName="app/my-page.tsx"
              />
              <Body size="sm" className="text-krds-gray-70 mt-3">
                위 코드를 실행하면 다음과 같이 렌더링됩니다. 자세한 예제는{' '}
                <a
                  href="/components/action/button"
                  className="text-krds-primary-base hover:underline"
                >
                  Button 컴포넌트 페이지
                </a>
                를 참고하세요.
              </Body>
            </Stack>
          </div>

          {/* Why Source Code? */}
          <div className="bg-krds-primary-surface rounded-lg p-6 border border-krds-primary-border">
            <Heading level="h3" className="mb-3">
              왜 소스 코드 복사 방식인가요?
            </Heading>
            <ul className="space-y-2 text-krds-primary-text">
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>완전한 소유권:</strong> 컴포넌트 코드가 프로젝트 안에
                  있어 자유롭게 수정 가능
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>버전 의존성 없음:</strong> 패키지 업데이트로 인한
                  Breaking Change 걱정 불필요
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>번들 최적화:</strong> 사용하는 컴포넌트만 포함되어
                  번들 크기 최소화
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>프로젝트 맞춤 커스터마이징:</strong> 디자인 시스템에
                  맞게 자유롭게 변경
                </span>
              </li>
            </ul>
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
              <Body size="sm" className="text-krds-gray-70 mb-3">
                먼저 필요한 컴포넌트를 추가합니다:
              </Body>
              <CodeBlock
                code={`npx hanui add button input`}
                language="bash"
                showLineNumbers={false}
              />
              <Body size="sm" className="text-krds-gray-70 mt-3 mb-3">
                그 다음 간단한 로그인 폼을 만들 수 있습니다:
              </Body>
              <CodeBlock
                code={`import { Input } from '@/components/hanui/input';
import { Button } from '@/components/hanui/button';

function LoginForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label htmlFor="email" className="block mb-2 font-medium">
          이메일
        </label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 font-medium">
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
              <Body size="sm" className="text-krds-gray-70 mb-3">
                Container와 Card 컴포넌트를 추가하고 깔끔한 레이아웃을
                구성하세요:
              </Body>
              <CodeBlock
                code={`npx hanui add container card`}
                language="bash"
                showLineNumbers={false}
              />
              <Body size="sm" className="text-krds-gray-70 mt-3 mb-3">
                대시보드 UI 예제:
              </Body>
              <CodeBlock
                code={`import { Container } from '@/components/hanui/container';
import { Card } from '@/components/hanui/card';

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
              <Body size="sm" className="text-krds-gray-70 mb-3">
                Modal과 Button 컴포넌트로 사용자 인터랙션을 추가합니다:
              </Body>
              <CodeBlock
                code={`npx hanui add modal button`}
                language="bash"
                showLineNumbers={false}
              />
              <Body size="sm" className="text-krds-gray-70 mt-3 mb-3">
                확인 다이얼로그 예제:
              </Body>
              <CodeBlock
                code={`import { useState } from 'react';
import { Modal } from '@/components/hanui/modal';
import { Button } from '@/components/hanui/button';

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
            HANUI 컴포넌트는 TypeScript로 작성되어 완벽한 타입 지원을
            제공합니다. 복사된 소스 코드에는 모든 타입 정의가 포함되어 있어 즉시
            사용 가능합니다:
          </Body>
          <CodeBlock
            code={`import { Button, type ButtonProps } from '@/components/hanui/button';

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
          <div className="bg-krds-primary-surface rounded-lg p-4 border border-krds-primary-20 mt-4">
            <Body size="sm" className="text-krds-primary-text">
              <strong>장점:</strong> 소스 코드가 프로젝트 안에 있어 타입 정의를
              직접 수정하여 프로젝트 요구사항에 맞게 확장할 수 있습니다.
            </Body>
          </div>
        </Stack>
      </PageSection>

      {/* Styling Customization */}
      <PageSection>
        <Heading level="h2" id="styling-customization">
          스타일 커스터마이징
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            소스 코드를 직접 소유하므로 자유롭게 커스터마이징할 수 있습니다.
            Tailwind CSS 클래스나 컴포넌트 소스 코드를 직접 수정하세요:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">방법 1: className prop으로 간단히 수정</Heading>
            <CodeBlock
              code={`import { Button } from '@/components/hanui/button';

<Button className="w-full rounded-full shadow-lg">
  전체 너비 둥근 버튼
</Button>

<Button className="bg-gradient-to-r from-purple-500 to-pink-500">
  그라데이션 버튼
</Button>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">방법 2: 소스 코드를 직접 수정</Heading>
            <div>
              <Body size="sm" className="text-krds-gray-70 mb-2">
                <code className="bg-krds-gray-5 px-1 rounded text-xs">
                  components/hanui/button.tsx
                </code>{' '}
                파일을 열어 variant를 추가하거나 수정하세요:
              </Body>
              <CodeBlock
                code={`// components/hanui/button.tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 ...',
  {
    variants: {
      variant: {
        primary: 'bg-[#256ef4] text-white hover:bg-[#0b50d0]',
        // 새로운 variant 추가! 🎨
        gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
        // 기존 variant 수정도 자유롭게
      },
    },
  }
);`}
                language="typescript"
                fileName="components/hanui/button.tsx"
              />
              <Body size="sm" className="text-krds-gray-70 mt-2">
                이제 프로젝트에서 새로운 variant를 사용할 수 있습니다:
              </Body>
              <CodeBlock
                code={`<Button variant="gradient">그라데이션 버튼</Button>`}
                language="tsx"
                showLineNumbers={false}
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Heading level="h2" id="accessibility">
          접근성 (Accessibility)
        </Heading>

        <Stack spacing="heading-content" className="mt-2 md:mt-4">
          <Body>
            HANUI는 Radix UI Primitives 기반으로 구축되어 웹 접근성을 기본으로
            제공합니다:
          </Body>

          <div className="bg-krds-primary-surface rounded-lg p-6 border border-krds-primary-border">
            <ul className="space-y-3 text-krds-primary-text">
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>Radix UI 기반:</strong> WAI-ARIA 표준을 준수하는
                  Headless UI 컴포넌트 사용
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>키보드 네비게이션:</strong> Tab, Enter, Space, Escape
                  키로 모든 컴포넌트 조작 가능
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>스크린 리더:</strong> ARIA 레이블과 역할이 자동으로
                  적용되어 스크린 리더 호환
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>포커스 관리:</strong> 명확한 포커스 표시 및 논리적인
                  포커스 순서
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-krds-primary-base">✓</span>
                <span>
                  <strong>WCAG 2.1 AA 준수:</strong> KRDS 디자인 시스템의 색상
                  대비 기준 적용
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-krds-gray-5 rounded-lg p-4 border border-krds-gray-20 mt-4">
            <Body size="sm">
              <strong>참고:</strong> 복사된 소스 코드에 모든 접근성 기능이
              포함되어 있으며, 코드 내 주석으로 자세한 설명이 제공됩니다.
            </Body>
          </div>
        </Stack>
      </PageSection>

      {/* Best Practices */}
      <PageSection>
        <Heading level="h2" id="best-practices">
          모범 사례
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div className="border-l-4 border-krds-success-base pl-4 py-2">
            <Heading level="h3" className="text-krds-success-text mb-1">
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

          <div className="border-l-4 border-krds-success-base pl-4 py-2">
            <Heading level="h3" className="text-krds-success-text mb-1">
              ✓ Do: 명확한 레이블 제공
            </Heading>
            <CodeBlock
              code={`<label htmlFor="email">이메일</label>
<Input id="email" type="email" />`}
              language="tsx"
              showLineNumbers={false}
            />
          </div>

          <div className="border-l-4 border-krds-danger-base pl-4 py-2">
            <Heading level="h3" className="text-krds-danger-text mb-1">
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
          <div className="bg-krds-gray-5 rounded-lg p-6 border border-krds-gray-20">
            <Body className="mb-4">
              이제 HANUI의 기본 사용법을 익혔습니다! 더 많은 컴포넌트를
              살펴보세요:
            </Body>
            <div className="space-y-2">
              <a
                href="/components"
                className="block px-4 py-2 bg-krds-primary-base text-krds-white rounded-md hover:bg-krds-primary-60 transition-colors text-center"
              >
                전체 컴포넌트 보기 →
              </a>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <a
                  href="/components/button"
                  className="block px-4 py-2 border border-krds-gray-20 rounded-md hover:bg-krds-gray-5 transition-colors text-center"
                >
                  Button
                </a>
                <a
                  href="/components/input"
                  className="block px-4 py-2 border border-krds-gray-20 rounded-md hover:bg-krds-gray-5 transition-colors text-center"
                >
                  Input
                </a>
                <a
                  href="/components/select"
                  className="block px-4 py-2 border border-krds-gray-20 rounded-md hover:bg-krds-gray-5 transition-colors text-center"
                >
                  Select
                </a>
                <a
                  href="/layout/container"
                  className="block px-4 py-2 border border-krds-gray-20 rounded-md hover:bg-krds-gray-5 transition-colors text-center"
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
