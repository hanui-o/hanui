'use client';

import { Button, Stack, Heading, Body } from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function ButtonPage() {
  return (
    <>
      <PageHeader
        title="Button"
        description="다양한 스타일과 크기를 지원하는 버튼 컴포넌트"
      />

      <PageSection>
        <ComponentPreview>
          <div className="flex items-center gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </ComponentPreview>
      </PageSection>

      {/* Overview */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="overview">
            개요
          </Heading>
          <Body className="leading-relaxed">
            버튼은 사용자가 서비스를 이용하는 과정에서 어떤 행동이 중요한지
            알려주는 핵심 인터랙션 요소입니다. HANUI Button은{' '}
            <strong>KRDS(한국형 웹 콘텐츠 접근성 지침)</strong>를 준수하여 공공
            웹사이트에 최적화된 접근성과 사용성을 제공합니다.
          </Body>
        </Stack>
      </PageSection>

      {/* Usage Guidelines */}
      <PageSection>
        <Heading level="h2" id="guidelines">
          사용 가이드라인
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>
            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection type="do" title="버튼을 사용하기 적합한 경우">
                <ul className="list-disc list-inside space-y-2">
                  <li>입력폼 제출, 대화창 실행, 기능 취소 등</li>
                  <li>일반적인 기능을 실행할 때</li>
                  <li>상태를 전환할 때</li>
                  <li>도움말을 제공할 때</li>
                  <li>전행 중인 프로세스를 중단하거나 취소할 때</li>
                  <li>중요한 데이터를 완전히 삭제할 때</li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="버튼을 사용하지 말아야 하는 경우"
              >
                <p>
                  현재 화면에서 완전히 다른 화면이나 서비스로 이동하는 경우에는
                  Link 컴포넌트를 사용해야 합니다.
                </p>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Button Hierarchy */}
          <Stack spacing="heading-tight">
            <Heading level="h3">버튼 위계</Heading>
            <Stack spacing="heading-tight">
              <Body>
                버튼의 시각적 강조도는 액션의 중요도와 일치해야 합니다.
              </Body>
              <Stack spacing="compact">
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                  <Stack spacing="compact">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">
                        Primary - 가장 중요한 액션
                      </h4>
                      <Button variant="primary" size="sm">
                        제출
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      페이지당 하나만 사용 권장. 주요 목표 달성 액션 (제출,
                      저장, 구매 등)
                    </p>
                  </Stack>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                  <Stack spacing="compact">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Secondary - 보조 액션</h4>
                      <Button variant="secondary" size="sm">
                        취소
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Primary와 함께 사용. 취소, 이전 단계 등
                    </p>
                  </Stack>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                  <Stack spacing="compact">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Outline - 낮은 강조</h4>
                      <Button variant="outline" size="sm">
                        옵션
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      추가 옵션이나 덜 중요한 액션
                    </p>
                  </Stack>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
                  <Stack spacing="compact">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Ghost - 최소 강조</h4>
                      <Button variant="ghost" size="sm">
                        닫기
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      인라인 액션, 닫기 버튼 등
                    </p>
                  </Stack>
                </div>
              </Stack>
            </Stack>
          </Stack>

          {/* Button Placement */}
          <Stack spacing="heading-tight">
            <Heading level="h3">버튼 배치</Heading>
            <Stack spacing="compact">
              <GuidelineSection type="do" title="올바른 배치">
                <Stack spacing="heading-tight">
                  <p>가장 중요한 버튼을 오른쪽에 배치 (수평 배치 시)</p>
                  <ComponentPreview>
                    <div className="flex items-center gap-3">
                      <Button variant="outline">취소</Button>
                      <Button variant="primary">확인</Button>
                    </div>
                  </ComponentPreview>
                </Stack>
              </GuidelineSection>

              <GuidelineSection type="dont" title="피해야 할 배치">
                <Stack spacing="heading-tight">
                  <p>한 페이지에 Primary 버튼을 여러 개 사용하지 마세요</p>
                  <ComponentPreview>
                    <div className="flex items-center gap-3">
                      <Button variant="primary">취소</Button>
                      <Button variant="primary">확인</Button>
                    </div>
                  </ComponentPreview>
                </Stack>
              </GuidelineSection>
            </Stack>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <GuidelineSection type="do" title="중복 클릭 방지">
              <Stack spacing="heading-tight">
                <p>
                  네트워크 지연 시 사용자가 버튼을 여러 번 클릭할 수 있습니다.
                  loading 상태를 활용하세요.
                </p>
                <ComponentPreview>
                  <Button loading disabled>
                    처리 중...
                  </Button>
                </ComponentPreview>
              </Stack>
            </GuidelineSection>
          </Stack>
        </Stack>
      </PageSection>

      <PageSection>
        <Installation componentName="button" />
      </PageSection>

      {/* Usage */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="usage">
            Usage
          </Heading>
          <CodeBlock
            code={`import { Button } from '@hanui/react'

<Button variant="primary">Click me</Button>`}
            language="tsx"
            showLineNumbers={false}
          />
        </Stack>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Heading level="h2" id="examples">
          Examples
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Default */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Default</Heading>
            <div>
              <ComponentPreview>
                <Button>Button</Button>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button>Button</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Sizes */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Sizes</Heading>
            <div>
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Primary */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Primary</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 페이지에서 가장 중요한
                  액션에 사용합니다. 예: 회원가입 완료, 결제하기, 제출
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">회원가입</Button>
                  <Button variant="primary">결제하기</Button>
                  <Button variant="primary">제출</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="primary">회원가입</Button>
<Button variant="primary">결제하기</Button>
<Button variant="primary">제출</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Secondary */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Secondary</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> Primary 버튼의 보조 액션에
                  사용합니다. 예: 취소, 뒤로가기, 건너뛰기
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="secondary">취소</Button>
                  <Button variant="secondary">뒤로가기</Button>
                  <Button variant="secondary">건너뛰기</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="secondary">취소</Button>
<Button variant="secondary">뒤로가기</Button>
<Button variant="secondary">건너뛰기</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Success & Danger */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Success & Danger</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> Success는 긍정적 결과,
                  Danger는 삭제나 위험한 액션에 사용합니다.
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="success">승인</Button>
                  <Button variant="danger">삭제</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="success">승인</Button>
<Button variant="danger">삭제</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Outline */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Outline</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 중간 수준의 강조가 필요한
                  경우에 사용합니다. 예: 필터 옵션, 추가 설정, 보조 기능
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline">필터</Button>
                  <Button variant="outline">설정</Button>
                  <Button variant="outline">더보기</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="outline">필터</Button>
<Button variant="outline">설정</Button>
<Button variant="outline">더보기</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Ghost */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Ghost</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 최소한의 시각적 강조가
                  필요한 경우에 사용합니다. 예: 닫기, 접기/펼치기, 인라인 액션
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost">닫기</Button>
                  <Button variant="ghost">접기</Button>
                  <Button variant="ghost">편집</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="ghost">닫기</Button>
<Button variant="ghost">접기</Button>
<Button variant="ghost">편집</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Ghost Primary */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Ghost Primary</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> Ghost 스타일이지만 Primary
                  색상으로 약간의 강조가 필요한 경우. 예: 중요한 링크형 액션
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="ghost-primary">자세히 보기</Button>
                  <Button variant="ghost-primary">더 알아보기</Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button variant="ghost-primary">자세히 보기</Button>
<Button variant="ghost-primary">더 알아보기</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Loading */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Loading</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 비동기 작업 처리 중임을
                  표시하고 중복 클릭을 방지할 때 사용합니다. 예: 데이터 전송,
                  파일 업로드
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button loading>처리 중...</Button>
                  <Button loading disabled>
                    제출 중...
                  </Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button loading>처리 중...</Button>
<Button loading disabled>제출 중...</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Disabled */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Disabled</Heading>
            <div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>언제 사용하나요?</strong> 특정 조건이 충족되지 않아
                  액션을 수행할 수 없을 때 사용합니다. 예: 필수 입력 미완료,
                  권한 없음
                </p>
              </div>
              <ComponentPreview>
                <div className="flex flex-wrap items-center gap-3">
                  <Button disabled>제출 불가</Button>
                  <Button variant="outline" disabled>
                    권한 없음
                  </Button>
                </div>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Button disabled>제출 불가</Button>
<Button variant="outline" disabled>권한 없음</Button>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
