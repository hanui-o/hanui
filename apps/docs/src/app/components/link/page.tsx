'use client';

import { Link, Stack, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function LinkPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Link"
        description="내부 및 외부 링크를 위한 Next.js 통합 링크 컴포넌트"
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview">
            <PageSection>
              <ComponentPreview>
                <Stack gap="md">
                  <Link href="/components">Primary Link (Internal)</Link>
                  <Link href="https://example.com" external>
                    External Link
                  </Link>
                  <Link href="/docs" variant="button">
                    Button Style Link
                  </Link>
                  <Link href="/about" variant="secondary">
                    Secondary Link
                  </Link>
                </Stack>
              </ComponentPreview>
            </PageSection>

            {/* Overview */}
            <SectionHeading level="h2" id="overview" title="개요">
              <Body className="leading-relaxed">
                Link 컴포넌트는 Next.js의 클라이언트 사이드 네비게이션과
                통합되어 빠르고 원활한 페이지 이동을 제공합니다. 외부 링크는
                자동으로 감지되어 새 탭에서 열리며, 접근성을 고려한 다양한
                variant를 제공합니다.
              </Body>
            </SectionHeading>

            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="CLI 명령어로 Link 컴포넌트를 프로젝트에 추가합니다."
            />
            <CodeBlock
              code={`npx @hanui/cli add link`}
              language="bash"
              showLineNumbers={false}
            />

            <SectionHeading level="h2" id="usage" title="사용법" />
            <CodeBlock
              code={`import { Link } from '@/components/hanui/link'

// 내부 링크 (Next.js 라우팅)
<Link href="/components">컴포넌트 보기</Link>

// 외부 링크 (새 탭)
<Link href="https://example.com" external>
  외부 사이트
</Link>

// 버튼 스타일 링크
<Link href="/docs" variant="button">
  문서 보기
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* 가이드라인 섹션 */}
            <SectionHeading
              level="h2"
              id="guidelines"
              title="사용 가이드라인"
            />

            {/* When to use */}
            <SectionHeading level="h3" title="언제 사용해야 하나요?" />
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection type="do" title="링크를 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>다른 페이지로 이동할 때</li>
                  <li>문서나 외부 리소스를 참조할 때</li>
                  <li>관련된 콘텐츠로 연결할 때</li>
                  <li>네비게이션 메뉴나 목차를 구성할 때</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="링크 대신 버튼을 사용해야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>폼 제출이나 데이터 저장 등의 액션을 실행할 때</li>
                  <li>모달을 열거나 UI 상태를 변경할 때</li>
                  <li>JavaScript 함수를 실행할 때</li>
                  <li>페이지 이동 없이 인터랙션이 필요할 때</li>
                </ul>
              </GuidelineSection>
            </div>

            {/* Variants */}
            <SectionHeading level="h2" id="variants" title="Variants" />

            <SectionHeading level="h3" title="Primary (기본)" />
            <ComponentPreview>
              <Link href="/components" variant="primary">
                Primary Link
              </Link>
            </ComponentPreview>
            <CodeBlock
              code={`<Link href="/components" variant="primary">
  Primary Link
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            <SectionHeading level="h3" title="Secondary" />
            <ComponentPreview>
              <Link href="/components" variant="secondary">
                Secondary Link
              </Link>
            </ComponentPreview>
            <CodeBlock
              code={`<Link href="/components" variant="secondary">
  Secondary Link
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            <SectionHeading level="h3" title="Button Style" />
            <ComponentPreview>
              <Stack gap="md">
                <Link href="/components" variant="button">
                  Button Link
                </Link>
                <Link href="/components" variant="outline">
                  Outline Link
                </Link>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Link href="/components" variant="button">
  Button Link
</Link>

<Link href="/components" variant="outline">
  Outline Link
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            <SectionHeading level="h3" title="Custom Style (None)" />
            <ComponentPreview>
              <Link
                href="/components"
                variant="none"
                className="text-green-600 hover:text-green-700 font-bold"
              >
                Custom Styled Link
              </Link>
            </ComponentPreview>
            <CodeBlock
              code={`<Link
  href="/components"
  variant="none"
  className="text-green-600 hover:text-green-700 font-bold"
>
  Custom Styled Link
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* External Links */}
            <SectionHeading level="h2" id="external" title="외부 링크" />
            <Body className="leading-relaxed mb-4">
              외부 링크는 자동으로 감지되거나 <code>external</code> prop으로
              명시할 수 있습니다. 외부 링크는 새 탭에서 열리며{' '}
              <code>rel="noopener noreferrer"</code>가 자동으로 추가됩니다.
            </Body>
            <ComponentPreview>
              <Stack gap="md">
                <Link href="https://github.com">자동 감지 (GitHub)</Link>
                <Link href="https://example.com" external>
                  명시적 외부 링크
                </Link>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`// URL이 http:// 또는 https://로 시작하면 자동 감지
<Link href="https://github.com">
  자동 감지 (GitHub)
</Link>

// external prop으로 명시
<Link href="https://example.com" external>
  명시적 외부 링크
</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Size */}
            <SectionHeading level="h2" id="size" title="크기" />
            <ComponentPreview>
              <Stack gap="md">
                <Link href="/components" size="sm">
                  Small Link
                </Link>
                <Link href="/components" size="md">
                  Medium Link (기본)
                </Link>
                <Link href="/components" size="lg">
                  Large Link
                </Link>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Link href="/components" size="sm">Small Link</Link>
<Link href="/components" size="md">Medium Link</Link>
<Link href="/components" size="lg">Large Link</Link>`}
              language="tsx"
              showLineNumbers={false}
            />

            {/* Accessibility */}
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <GuidelineSection type="do" title="접근성 모범 사례">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  링크 텍스트는 목적지를 명확하게 설명해야 합니다 ("여기 클릭"
                  대신 "사용자 가이드 보기")
                </li>
                <li>외부 링크는 자동으로 새 탭에서 열립니다</li>
                <li>키보드 네비게이션이 자동으로 지원됩니다 (Tab, Enter)</li>
                <li>포커스 상태가 명확하게 표시됩니다</li>
                <li>스크린 리더가 링크를 올바르게 인식합니다</li>
              </ul>
            </GuidelineSection>
          </TabsContent>

          {/* API 탭 */}
          <TabsContent value="api">
            <SectionHeading level="h2" id="props" title="Props" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
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
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">href</td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">링크 URL (필수)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">
                      variant
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      'primary' | 'secondary' | 'button' | 'outline' | 'none'
                    </td>
                    <td className="py-3 px-4">'primary'</td>
                    <td className="py-3 px-4">링크 스타일</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">size</td>
                    <td className="py-3 px-4 font-mono text-sm">
                      'sm' | 'md' | 'lg'
                    </td>
                    <td className="py-3 px-4">'md'</td>
                    <td className="py-3 px-4">링크 크기</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">
                      external
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">boolean</td>
                    <td className="py-3 px-4">auto-detect</td>
                    <td className="py-3 px-4">
                      외부 링크 여부 (자동 감지 또는 명시)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">
                      className
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">string</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">추가 CSS 클래스</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-mono text-blue-600">
                      children
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">링크 내용 (필수)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeading level="h2" id="examples" title="사용 예제" />

            <SectionHeading level="h3" title="기본 사용" />
            <CodeBlock
              code={`import { Link } from '@/components/hanui/link'

function Navigation() {
  return (
    <nav>
      <Link href="/">홈</Link>
      <Link href="/about">소개</Link>
      <Link href="/contact">문의</Link>
    </nav>
  )
}`}
              language="tsx"
              showLineNumbers={false}
            />

            <SectionHeading level="h3" title="외부 링크와 내부 링크 혼합" />
            <CodeBlock
              code={`import { Link } from '@/components/hanui/link'

function Footer() {
  return (
    <footer>
      <Link href="/privacy">개인정보처리방침</Link>
      <Link href="/terms">이용약관</Link>
      <Link href="https://github.com/your-org" external>
        GitHub
      </Link>
    </footer>
  )
}`}
              language="tsx"
              showLineNumbers={false}
            />

            <SectionHeading level="h3" title="커스텀 스타일링" />
            <CodeBlock
              code={`import { Link } from '@/components/hanui/link'

function CustomLink() {
  return (
    <Link
      href="/special"
      variant="none"
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
    >
      특별한 링크
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  )
}`}
              language="tsx"
              showLineNumbers={false}
            />
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
