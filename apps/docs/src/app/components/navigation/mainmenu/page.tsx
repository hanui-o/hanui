import { MainMenu, Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function MainMenuPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Main Menu (주 메뉴)"
        description="서비스의 정보 구조를 탐색할 때 사용하는 주요 네비게이션 컴포넌트입니다. 헤더에 표시되며 드롭다운, 섹션, 설명, 유틸리티 링크를 지원합니다."
      />

      {/* Usage Examples */}
      <PageSection>
        <Heading level="h2" id="examples" className="text-2xl font-semibold">
          예제
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          {/* Basic Horizontal Menu */}
          <Stack gap="sm">
            <Heading level="h3">기본 수평 메뉴</Heading>
            <Body>
              간단한 링크들로 구성된 수평 메뉴입니다. 드롭다운 없이 직접 링크만
              제공합니다.
            </Body>
            <div>
              <ComponentPreview>
                <MainMenu
                  items={[
                    { label: '홈', href: '/', active: true },
                    { label: '소개', href: '/about' },
                    { label: '서비스', href: '/services' },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { MainMenu } from '@hanui/react';

<MainMenu
  items={[
    { label: '홈', href: '/', active: true },
    { label: '소개', href: '/about' },
    { label: '서비스', href: '/services' },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
                />
              </div>
            </div>
          </Stack>

          {/* Dropdown with Simple Children */}
          <Stack gap="sm">
            <Heading level="h3">드롭다운 메뉴 (간단한 서브메뉴)</Heading>
            <Body>
              <code>children</code> 속성을 사용하여 간단한 드롭다운 메뉴를 만들
              수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <MainMenu
                  items={[
                    { label: '홈', href: '/' },
                    {
                      label: '서비스',
                      children: [
                        { label: '건강검진', href: '/services/checkup' },
                        { label: '보험료 조회', href: '/services/premium' },
                        {
                          label: '민원서류 발급',
                          href: '/services/documents',
                        },
                      ],
                    },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { MainMenu } from '@hanui/react';

<MainMenu
  items={[
    { label: '홈', href: '/' },
    {
      label: '서비스',
      children: [
        { label: '건강검진', href: '/services/checkup' },
        { label: '보험료 조회', href: '/services/premium' },
        { label: '민원서류 발급', href: '/services/documents' },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
                />
              </div>
            </div>
          </Stack>

          {/* Dropdown with Sections and Descriptions */}
          <Stack gap="sm">
            <Heading level="h3">
              섹션별 드롭다운 (설명 및 유틸리티 링크 포함)
            </Heading>
            <Body>
              <code>sections</code>를 사용하여 섹션 제목, 링크 설명, 유틸리티
              링크를 포함한 풍부한 드롭다운을 만들 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <MainMenu
                  items={[
                    { label: '홈', href: '/' },
                    {
                      label: '서비스',
                      sections: [
                        {
                          title: '인기 서비스',
                          links: [
                            {
                              label: '건강검진 예약',
                              href: '/services/checkup',
                              description:
                                '온라인으로 건강검진을 간편하게 예약하세요',
                            },
                            {
                              label: '보험료 조회',
                              href: '/services/premium',
                              description:
                                '나의 건강보험료를 실시간으로 확인하세요',
                            },
                          ],
                          utilityLinks: [
                            {
                              label: '모든 서비스 보기',
                              href: '/services',
                            },
                          ],
                        },
                      ],
                    },
                    { label: '고객지원', href: '/support' },
                  ]}
                />
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`import { MainMenu } from '@hanui/react';

<MainMenu
  items={[
    { label: '홈', href: '/' },
    {
      label: '서비스',
      sections: [
        {
          title: '인기 서비스',
          links: [
            {
              label: '건강검진 예약',
              href: '/services/checkup',
              description: '온라인으로 건강검진을 간편하게 예약하세요',
            },
            {
              label: '보험료 조회',
              href: '/services/premium',
              description: '나의 건강보험료를 실시간으로 확인하세요',
            },
          ],
          utilityLinks: [
            { label: '모든 서비스 보기', href: '/services' },
          ],
        },
      ],
    },
    { label: '고객지원', href: '/support' },
  ]}
/>`}
                />
              </div>
            </div>
          </Stack>

          {/* Multiple Sections */}
          <Stack gap="sm">
            <Heading level="h3">다중 섹션 드롭다운</Heading>
            <Body>
              하나의 드롭다운에 여러 섹션을 포함할 수 있습니다. 섹션 간 구분선이
              자동으로 표시됩니다.
            </Body>
            <div className="mt-4">
              <CodeBlock
                language="tsx"
                code={`import { MainMenu } from '@hanui/react';

<MainMenu
  items={[
    {
      label: '서비스',
      sections: [
        {
          title: '개인 서비스',
          links: [
            { label: '건강검진', href: '/services/individual/checkup' },
            { label: '보험료 납부', href: '/services/individual/payment' },
          ],
        },
        {
          title: '사업장 서비스',
          links: [
            { label: '직원 등록', href: '/services/business/register' },
            { label: '보험료 신고', href: '/services/business/report' },
          ],
          utilityLinks: [
            { label: '사업장 지원센터', href: '/business-center' },
          ],
        },
      ],
    },
  ]}
/>`}
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Heading level="h2" id="guidelines" className="text-2xl font-semibold">
          디자인 가이드라인
        </Heading>

        <Stack gap="lg" className="mt-2 md:mt-4">
          <GuidelineSection title="메뉴 구조" type="do">
            <ul className="list-disc pl-5 space-y-2">
              <li>최대 3단계까지 메뉴 깊이 제한</li>
              <li>드롭다운 레이블을 좌측 정렬하여 일관된 스캔 가능</li>
              <li>필수 링크만 표시하여 메뉴 개수 최소화</li>
              <li>우선순위가 높은 링크를 좌측에 배치</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="드롭다운 설계" type="do">
            <ul className="list-disc pl-5 space-y-2">
              <li>드롭다운 높이가 뷰포트를 초과하면 내부 스크롤 구현</li>
              <li>활성/선택된 링크 상태를 명확하게 구분</li>
              <li>섹션 제목을 제공하여 사용자 오리엔테이션 지원</li>
              <li>유틸리티 링크로 "모두 보기" 등의 추가 탐색 지원</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="링크 레이블" type="do">
            <ul className="list-disc pl-5 space-y-2">
              <li>명확하고 간단한 언어 사용</li>
              <li>설명(description)으로 링크 이해도 향상</li>
              <li>일관된 명명 규칙 유지</li>
            </ul>
          </GuidelineSection>

          <GuidelineSection title="피해야 할 사항" type="dont">
            <ul className="list-disc pl-5 space-y-2">
              <li>3단계를 초과하는 깊은 메뉴 구조</li>
              <li>너무 많은 링크로 인한 복잡성</li>
              <li>마우스 호버에만 의존하는 인터랙션 (키보드 접근성 필수)</li>
              <li>모호하거나 전문 용어가 많은 레이블</li>
            </ul>
          </GuidelineSection>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Heading
          level="h2"
          id="accessibility"
          className="text-2xl font-semibold"
        >
          접근성
        </Heading>

        <Stack gap="md" className="mt-2 md:mt-4">
          <Body>
            MainMenu는 KRDS 접근성 표준을 준수하며 다음 기준을 충족합니다:
          </Body>

          <Stack gap="sm">
            <Heading level="h3" className="text-lg font-medium">
              WCAG 2.1 / KWCAG 2.2 준수
            </Heading>
            <ul className="list-disc list-inside space-y-2 text-krds-gray-70 dark:text-krds-gray-30">
              <li>
                <strong>시맨틱 HTML:</strong> nav 요소와 계층적 리스트 구조 사용
              </li>
              <li>
                <strong>ARIA 속성:</strong> aria-label, aria-expanded,
                aria-haspopup, aria-current 제공
              </li>
              <li>
                <strong>키보드 네비게이션:</strong> Tab, Enter, Esc, Arrow keys
                지원
              </li>
              <li>
                <strong>포커스 관리:</strong> 명확한 포커스 순서 및 시각적 표시
              </li>
              <li>
                <strong>외부 클릭 처리:</strong> 드롭다운 외부 클릭 시 자동 닫기
              </li>
            </ul>
          </Stack>

          <Stack gap="sm">
            <Heading level="h3" className="text-lg font-medium">
              키보드 네비게이션
            </Heading>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-krds-gray-20 dark:border-krds-gray-80">
                <thead className="bg-krds-gray-5 dark:bg-krds-gray-95">
                  <tr>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                      키
                    </th>
                    <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                      동작
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      <code className="bg-krds-gray-10 dark:bg-krds-gray-90 px-2 py-1 rounded">
                        Tab
                      </code>
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      다음 메뉴 항목으로 포커스 이동
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      <code className="bg-krds-gray-10 dark:bg-krds-gray-90 px-2 py-1 rounded">
                        Enter / Space
                      </code>
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      드롭다운 열기/닫기
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      <code className="bg-krds-gray-10 dark:bg-krds-gray-90 px-2 py-1 rounded">
                        Esc
                      </code>
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      모든 드롭다운 닫기
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      <code className="bg-krds-gray-10 dark:bg-krds-gray-90 px-2 py-1 rounded">
                        Arrow Down
                      </code>
                    </td>
                    <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                      드롭다운 열기 (닫혀있을 때)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <code className="bg-krds-gray-10 dark:bg-krds-gray-90 px-2 py-1 rounded">
                        Arrow Left/Right
                      </code>
                    </td>
                    <td className="px-4 py-2">
                      이전/다음 메뉴 항목으로 이동 (수평 메뉴)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Props API */}
      <PageSection>
        <Heading level="h2" id="props" className="text-2xl font-semibold">
          Props
        </Heading>

        <div className="overflow-x-auto mt-2 md:mt-4">
          <table className="min-w-full border border-krds-gray-20 dark:border-krds-gray-80">
            <thead className="bg-krds-gray-5 dark:bg-krds-gray-95">
              <tr>
                <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                  Prop
                </th>
                <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                  Type
                </th>
                <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                  Default
                </th>
                <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                  items
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                  MainMenuItem[]
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                  -
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                  메뉴 항목 배열 (필수)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                  currentPath
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                  string
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                  -
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                  현재 활성 경로 (aria-current 설정용)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                  orientation
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                  &apos;horizontal&apos; | &apos;vertical&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                  &apos;horizontal&apos;
                </td>
                <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                  메뉴 방향
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono">className</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2">-</td>
                <td className="px-4 py-2">추가 CSS 클래스</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Stack gap="sm" className="mt-4">
          <Heading level="h3" className="text-lg font-medium">
            MainMenuItem
          </Heading>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-krds-gray-20 dark:border-krds-gray-80">
              <thead className="bg-krds-gray-5 dark:bg-krds-gray-95">
                <tr>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                    Property
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left border-b border-krds-gray-20 dark:border-krds-gray-80">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                    label
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                    string
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                    메뉴 레이블 (필수)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                    href
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                    string
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                    링크 URL (드롭다운 없는 경우 필수)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                    active
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                    boolean
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                    활성 상태 여부
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono">
                    sections
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80 font-mono text-xs">
                    MainMenuSection[]
                  </td>
                  <td className="px-4 py-2 border-b border-krds-gray-20 dark:border-krds-gray-80">
                    드롭다운 섹션 (제목, 설명, 유틸리티 링크 포함)
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">children</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    MainMenuLink[]
                  </td>
                  <td className="px-4 py-2">
                    간단한 서브메뉴 링크 (sections 대신 사용)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>

        <Stack gap="sm" className="mt-4">
          <Heading level="h3" className="text-lg font-medium">
            MainMenuSection
          </Heading>
          <CodeBlock
            language="typescript"
            code={`interface MainMenuSection {
  title?: string;              // 섹션 제목
  links: MainMenuLink[];       // 섹션 내 링크들
  utilityLinks?: MainMenuLink[]; // "모두 보기" 등 추가 링크
}`}
          />
        </Stack>

        <Stack gap="sm" className="mt-4">
          <Heading level="h3" className="text-lg font-medium">
            MainMenuLink
          </Heading>
          <CodeBlock
            language="typescript"
            code={`interface MainMenuLink {
  label: string;        // 링크 텍스트
  href: string;         // 링크 URL
  description?: string; // 링크 설명 (선택)
  active?: boolean;     // 활성 상태
}`}
          />
        </Stack>
      </PageSection>

      {/* KRDS Standards */}
      <PageSection>
        <Heading
          level="h2"
          id="krds-standards"
          className="text-2xl font-semibold"
        >
          KRDS 표준
        </Heading>

        <Stack gap="md" className="mt-2 md:mt-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
            <Heading level="h3" className="text-lg font-medium mb-2">
              필수 요구사항
            </Heading>
            <ul className="list-disc list-inside space-y-1">
              <li>
                CSS 클래스:{' '}
                <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                  .krds-main-menu
                </code>
              </li>
              <li>서비스 정보 구조 탐색의 주요 수단</li>
              <li>모든 페이지에서 일관된 위치(헤더)에 표시</li>
              <li>최대 3단계 메뉴 구조 권장</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
            <Heading level="h3" className="text-lg font-medium mb-2">
              드롭다운 설계 원칙
            </Heading>
            <ul className="list-disc list-inside space-y-1">
              <li>레이블 좌측 정렬로 일관된 스캔 가능</li>
              <li>뷰포트 초과 시 내부 스크롤 제공</li>
              <li>섹션 제목으로 사용자 오리엔테이션 지원</li>
              <li>유틸리티 링크로 관련 페이지 빠른 접근</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded">
            <Heading level="h3" className="text-lg font-medium mb-2">
              접근성 표준
            </Heading>
            <ul className="list-disc list-inside space-y-1">
              <li>nav 요소 또는 role=&quot;navigation&quot; 사용</li>
              <li>계층적 리스트 구조 (ul, li)</li>
              <li>aria-current=&quot;page&quot; 활성 페이지 표시</li>
              <li>키보드 단독 네비게이션 가능 (마우스 호버 의존 금지)</li>
              <li>키보드 트랩 방지</li>
            </ul>
          </div>
        </Stack>
      </PageSection>

      {/* Installation */}
      <PageSection>
        <Heading
          level="h2"
          id="installation"
          className="text-2xl font-semibold"
        >
          설치
        </Heading>

        <Stack gap="md" className="mt-2 md:mt-4">
          <Body>
            HANUI CLI를 사용하여 MainMenu 컴포넌트를 프로젝트에 추가할 수
            있습니다:
          </Body>

          <CodeBlock language="bash" code={`npx hanui add main-menu`} />

          <Body>또는 수동으로 설치:</Body>

          <CodeBlock
            language="tsx"
            code={`// components/hanui/main-menu.tsx
import { MainMenu } from '@hanui/react';

export { MainMenu };`}
          />
        </Stack>
      </PageSection>
    </>
  );
}
