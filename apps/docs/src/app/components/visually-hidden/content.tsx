'use client';

// Docs layout
import { PageSection as Section, Heading } from '@/components/content';

// Docs helper
import { PreviewBox } from '@/components/helpers';

// UI Components
import {
  VisuallyHidden,
  Body,
  Button,
  Stack,
  Link,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

// ============================================================================
// 코드 예제
// ============================================================================

const installCode = `npm install @hanui/react`;

const importCode = `import { VisuallyHidden } from '@/components/hanui/visually-hidden';`;

const basicUsageCode = `// 스크린리더에만 읽히는 텍스트
<VisuallyHidden>스크린리더 전용 설명</VisuallyHidden>

// 이미지에 추가 설명 제공
<div>
  <img src="/icon-warning.svg" alt="경고" />
  <VisuallyHidden>주의: 이 작업은 되돌릴 수 없습니다.</VisuallyHidden>
</div>`;

const iconButtonCode = `// 아이콘만 있는 버튼에 접근성 레이블 제공
<button>
  <svg aria-hidden="true">...</svg>
  <VisuallyHidden>메뉴 열기</VisuallyHidden>
</button>

// 또는 aria-label 사용
<button aria-label="메뉴 열기">
  <svg aria-hidden="true">...</svg>
</button>`;

const focusableCode = `// 포커스 시 표시되는 건너뛰기 링크
<VisuallyHidden as="a" href="#main-content" focusable>
  본문으로 바로가기
</VisuallyHidden>`;

const srOnlyCode = `// Tailwind CSS sr-only 클래스 사용
<span className="sr-only">스크린리더 전용 텍스트</span>

// 포커스 시 표시 (Skip Link 패턴)
<a href="#main" className="sr-only focus:not-sr-only">
  본문으로 바로가기
</a>`;

const badExamplesCode = `// ❌ 잘못된 예시 - 스크린리더가 읽지 못함
<span style={{ display: 'none' }}>숨긴 텍스트</span>
<span style={{ visibility: 'hidden' }}>숨긴 텍스트</span>
<span style={{ width: 0, height: 0 }}>숨긴 텍스트</span>

// ✅ 올바른 예시
<VisuallyHidden>숨긴 텍스트</VisuallyHidden>
<span className="sr-only">숨긴 텍스트</span>`;

// ============================================================================
// 아이콘 컴포넌트
// ============================================================================

const MenuIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// ============================================================================
// 페이지 컴포넌트
// ============================================================================

export default function VisuallyHiddenPage() {
  return (
    <>
      {/* 헤더 */}
      <Heading
        level="h1"
        title="Visually Hidden"
        description="화면에는 보이지 않지만 스크린리더가 읽을 수 있는 접근성 유틸리티 컴포넌트입니다."
        links={[
          {
            label: 'KRDS 숨긴 콘텐츠',
            href: 'https://www.krds.go.kr/html/site/component/component_11_02.html',
          },
        ]}
      />

      {/* 개요 */}
      <Section>
        <Heading level="h2" title="개요" id="overview" />
        <Body>
          Visually Hidden 컴포넌트는 시각적으로는 숨겨지지만 스크린리더
          사용자에게는 읽히는 콘텐츠를 제공합니다. 이를 통해 시각적 인터페이스를
          깔끔하게 유지하면서도 보조 기술 사용자에게 필요한 정보를 전달할 수
          있습니다.
        </Body>
        <PreviewBox>
          <Stack direction="row" gap="md" align="center">
            <Button variant="outline" size="sm">
              <MenuIcon />
              <VisuallyHidden>메뉴 열기</VisuallyHidden>
            </Button>
            <Button variant="outline" size="sm">
              <SearchIcon />
              <VisuallyHidden>검색</VisuallyHidden>
            </Button>
            <Button variant="outline" size="sm">
              <CloseIcon />
              <VisuallyHidden>닫기</VisuallyHidden>
            </Button>
            <Body className="text-sm text-krds-gray-60">
              ← 각 버튼에 스크린리더용 레이블이 숨겨져 있습니다
            </Body>
          </Stack>
        </PreviewBox>
      </Section>

      {/* 설치 */}
      <Section>
        <Heading level="h2" title="설치" id="installation" />
        <Code variant="block" language="bash" showLineNumbers={false}>
          {installCode}
        </Code>
      </Section>

      {/* Import */}
      <Section>
        <Heading level="h2" title="Import" id="import" />
        <Code variant="block" language="typescript" showLineNumbers={false}>
          {importCode}
        </Code>
      </Section>

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" title="기본 사용법" id="basic-usage" />
        <Body>
          스크린리더에만 전달해야 하는 추가 설명이나 맥락 정보를 제공할 때
          사용합니다.
        </Body>
        <PreviewBox>
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-hidden="true">
              ⚠️
            </span>
            <span>경고</span>
            <VisuallyHidden>주의: 이 작업은 되돌릴 수 없습니다.</VisuallyHidden>
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {basicUsageCode}
        </Code>
      </Section>

      {/* 아이콘 버튼 */}
      <Section>
        <Heading level="h2" title="아이콘 버튼에 적용" id="icon-button" />
        <Body>
          아이콘만 있는 버튼에 접근성 레이블을 제공합니다. aria-label을 사용하는
          것도 좋은 대안입니다.
        </Body>
        <PreviewBox>
          <Stack direction="row" gap="md">
            <Button variant="outline" size="icon">
              <MenuIcon />
              <VisuallyHidden>메뉴 열기</VisuallyHidden>
            </Button>
            <Button variant="outline" size="icon" aria-label="검색">
              <SearchIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="닫기">
              <CloseIcon />
            </Button>
          </Stack>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {iconButtonCode}
        </Code>
      </Section>

      {/* sr-only 클래스 */}
      <Section>
        <Heading level="h2" title="sr-only 클래스 사용" id="sr-only" />
        <Body>
          Tailwind CSS의 <code>sr-only</code> 클래스를 사용할 수도 있습니다.
          VisuallyHidden 컴포넌트와 동일한 효과를 냅니다.
        </Body>
        <PreviewBox>
          <div className="flex flex-col gap-4">
            <div>
              <span className="sr-only">이 텍스트는 스크린리더만 읽습니다</span>
              <span>시각적으로 표시되는 텍스트</span>
            </div>
          </div>
        </PreviewBox>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {srOnlyCode}
        </Code>
      </Section>

      {/* 잘못된 예시 */}
      <Section>
        <Heading level="h2" title="피해야 할 패턴" id="bad-examples" />
        <Body>
          다음 CSS 속성들은 스크린리더가 콘텐츠를 읽지 못하게 하므로 사용하면 안
          됩니다:
        </Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            <code>display: none</code> - 완전히 숨김
          </li>
          <li>
            <code>visibility: hidden</code> - 완전히 숨김
          </li>
          <li>
            <code>width: 0; height: 0</code> - 크기 0
          </li>
          <li>
            <code>font-size: 0</code> - 폰트 크기 0
          </li>
        </ul>
        <Code variant="block" language="tsx" showLineNumbers={false}>
          {badExamplesCode}
        </Code>
      </Section>

      {/* 적절한 사용 사례 */}
      <Section>
        <Heading level="h2" title="사용 사례" id="use-cases" />
        <Body>Visually Hidden이 적절한 경우:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>아이콘 버튼에 레이블 제공</li>
          <li>복잡한 비텍스트 콘텐츠에 추가 설명 제공</li>
          <li>상태 변화 정보 전달 (예: &quot;3개 항목 선택됨&quot;)</li>
          <li>조작 방법 안내 (예: &quot;Enter 키를 눌러 제출&quot;)</li>
        </ul>
        <Body className="mt-4">
          Visually Hidden을 사용하지 않아야 하는 경우:
        </Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>
            간단한 이미지 설명 → <code>alt</code> 속성 사용
          </li>
          <li>
            요소의 접근성 이름 → <code>aria-label</code> 사용
          </li>
          <li>
            연결된 레이블 → <code>aria-labelledby</code> 사용
          </li>
        </ul>
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" title="접근성" id="accessibility" />
        <Body>KRDS 접근성 가이드라인:</Body>
        <ul className="list-disc pl-6 space-y-2 text-krds-gray-80">
          <li>시맨틱 HTML을 우선 사용하고, 숨긴 텍스트는 보조 수단으로 활용</li>
          <li>다양한 스크린리더(센스리더, VoiceOver, TalkBack)로 테스트</li>
          <li>다국어 서비스의 경우 숨긴 텍스트도 번역 제공</li>
          <li>CMS에서 숨긴 텍스트 작성 기능 지원 권장</li>
        </ul>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" title="API Reference" id="api" />
        <Table small>
          <TableHeader>
            <TableRow>
              <TableHead>속성</TableHead>
              <TableHead>타입</TableHead>
              <TableHead>기본값</TableHead>
              <TableHead>설명</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Code>children</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">React.ReactNode</Code>
              </TableCell>
              <TableCell>필수</TableCell>
              <TableCell>스크린리더에 전달할 콘텐츠</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>as</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">
                  &quot;span&quot; | &quot;div&quot;
                </Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">&quot;span&quot;</Code>
              </TableCell>
              <TableCell>렌더링할 HTML 요소</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>focusable</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">boolean</Code>
              </TableCell>
              <TableCell>
                <Code className="text-xs">false</Code>
              </TableCell>
              <TableCell>포커스 시 표시할지 여부 (인터랙티브 요소용)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
    </>
  );
}
