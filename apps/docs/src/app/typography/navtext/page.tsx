'use client';

import { NavText } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function NavTextPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">NavText</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          네비게이션 메뉴를 위한 텍스트 컴포넌트
        </p>
      </div>

      <div className="mb-12">
        <ComponentPreview>
          <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 p-6 rounded">
            <NavText variant="tit-lg">Title Large</NavText>
            <NavText variant="tit-sm">Title Small</NavText>
            <NavText variant="depth-md">Depth Medium</NavText>
            <NavText variant="depth-sm">Depth Small</NavText>
          </div>
        </ComponentPreview>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <h2 id="overview" className="text-2xl font-bold mb-4">
          개요
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          NavText는 <strong>KRDS 타이포그래피 시스템</strong>의 네비게이션 전용
          스타일입니다. 메뉴 제목과 하위 메뉴 항목을 구분하여 계층적인
          네비게이션 구조를 명확히 표현합니다.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          tit 변형은 메뉴 제목에, depth 변형은 하위 메뉴 항목에 사용됩니다.
        </p>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 id="variants" className="text-2xl font-bold mb-6">
          변형
        </h2>

        <div className="space-y-8">
          {/* Title Variant */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Title (메뉴 제목)</h3>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <div className="mb-4">
                  <NavText
                    as="a"
                    href="#"
                    variant="tit-lg"
                    className="hover:text-primary-60 transition-colors"
                  >
                    Title Large
                  </NavText>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  24px (PC) / 22px (Mobile) · 700 (Bold) · 150% 줄 간격
                </div>
                <div className="mt-4">
                  <CodeBlock
                    code={`<NavText as="a" href="/menu" variant="tit-lg">
  메인 메뉴
</NavText>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <div className="mb-4">
                  <NavText
                    as="a"
                    href="#"
                    variant="tit-sm"
                    className="hover:text-primary-60 transition-colors"
                  >
                    Title Small
                  </NavText>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  19px (PC) / 17px (Mobile) · 700 (Bold) · 150% 줄 간격
                </div>
                <div className="mt-4">
                  <CodeBlock
                    code={`<NavText as="a" href="/submenu" variant="tit-sm">
  서브 메뉴
</NavText>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Depth Variant */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Depth (메뉴 항목)</h3>
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <div className="mb-4">
                  <NavText
                    as="a"
                    href="#"
                    variant="depth-md"
                    className="hover:text-primary-60 transition-colors"
                  >
                    Depth Medium
                  </NavText>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  17px · 400 (Regular) · 150% 줄 간격
                </div>
                <div className="mt-4">
                  <CodeBlock
                    code={`<NavText as="a" href="/item" variant="depth-md">
  메뉴 항목
</NavText>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <div className="mb-4">
                  <NavText
                    as="a"
                    href="#"
                    variant="depth-sm"
                    className="hover:text-primary-60 transition-colors"
                  >
                    Depth Small
                  </NavText>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  15px · 400 (Regular) · 150% 줄 간격
                </div>
                <div className="mt-4">
                  <CodeBlock
                    code={`<NavText as="a" href="/subitem" variant="depth-sm">
  하위 항목
</NavText>`}
                    language="tsx"
                    showLineNumbers={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-12">
        <h2 id="usage" className="text-2xl font-bold mb-6">
          사용 예시
        </h2>

        <div className="space-y-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">메인 네비게이션</h3>
            <ComponentPreview>
              <nav className="bg-gray-50 dark:bg-gray-900 p-6 rounded">
                <ul className="space-y-4">
                  <li>
                    <NavText
                      as="a"
                      href="#"
                      variant="tit-lg"
                      className="hover:text-primary-60 transition-colors"
                    >
                      서비스 소개
                    </NavText>
                  </li>
                  <li>
                    <NavText
                      as="a"
                      href="#"
                      variant="tit-lg"
                      className="hover:text-primary-60 transition-colors"
                    >
                      이용 안내
                    </NavText>
                  </li>
                  <li>
                    <NavText
                      as="a"
                      href="#"
                      variant="tit-lg"
                      className="hover:text-primary-60 transition-colors"
                    >
                      고객 지원
                    </NavText>
                  </li>
                </ul>
              </nav>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<nav>
  <ul>
    <li>
      <NavText as="a" href="/about" variant="tit-lg">
        서비스 소개
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/guide" variant="tit-lg">
        이용 안내
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/support" variant="tit-lg">
        고객 지원
      </NavText>
    </li>
  </ul>
</nav>`}
                language="tsx"
              />
            </div>
          </div>

          {/* Hierarchical Navigation */}
          <div>
            <h3 className="text-xl font-semibold mb-4">계층형 네비게이션</h3>
            <ComponentPreview>
              <nav className="bg-gray-50 dark:bg-gray-900 p-6 rounded">
                <div className="space-y-4">
                  <div>
                    <NavText
                      as="a"
                      href="#"
                      variant="tit-sm"
                      className="hover:text-primary-60 transition-colors"
                    >
                      공지사항
                    </NavText>
                    <ul className="mt-2 ml-4 space-y-2">
                      <li>
                        <NavText
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-primary-60 transition-colors"
                        >
                          시스템 공지
                        </NavText>
                      </li>
                      <li>
                        <NavText
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-primary-60 transition-colors"
                        >
                          이벤트 소식
                        </NavText>
                      </li>
                      <li>
                        <NavText
                          as="a"
                          href="#"
                          variant="depth-md"
                          className="hover:text-primary-60 transition-colors"
                        >
                          업데이트 내역
                        </NavText>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<nav>
  <NavText as="a" href="/notice" variant="tit-sm">
    공지사항
  </NavText>
  <ul>
    <li>
      <NavText as="a" href="/notice/system" variant="depth-md">
        시스템 공지
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/notice/event" variant="depth-md">
        이벤트 소식
      </NavText>
    </li>
    <li>
      <NavText as="a" href="/notice/update" variant="depth-md">
        업데이트 내역
      </NavText>
    </li>
  </ul>
</nav>`}
                language="tsx"
              />
            </div>
          </div>

          {/* Polymorphic */}
          <div>
            <h3 className="text-xl font-semibold mb-4">다양한 HTML 태그</h3>
            <ComponentPreview>
              <div className="space-y-3">
                <div>
                  <NavText
                    as="a"
                    href="#"
                    variant="tit-lg"
                    className="text-blue-600 hover:underline"
                  >
                    링크로 렌더링 (a 태그)
                  </NavText>
                </div>
                <div>
                  <NavText
                    as="button"
                    variant="depth-md"
                    onClick={() => alert('클릭!')}
                    className="hover:text-primary-60"
                  >
                    버튼으로 렌더링 (button 태그)
                  </NavText>
                </div>
                <div>
                  <NavText as="span" variant="depth-sm">
                    span으로 렌더링 (기본)
                  </NavText>
                </div>
              </div>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`<NavText as="a" href="/page" variant="tit-lg">
  링크로 렌더링 (a 태그)
</NavText>

<NavText as="button" variant="depth-md" onClick={handleClick}>
  버튼으로 렌더링 (button 태그)
</NavText>

<NavText as="span" variant="depth-sm">
  span으로 렌더링 (기본)
</NavText>`}
                language="tsx"
              />
            </div>
          </div>

          {/* Active State */}
          <div>
            <h3 className="text-xl font-semibold mb-4">활성 상태 스타일링</h3>
            <ComponentPreview>
              <nav className="bg-gray-50 dark:bg-gray-900 p-6 rounded">
                <ul className="space-y-2">
                  <li>
                    <NavText
                      as="a"
                      href="#"
                      variant="depth-md"
                      className="text-primary-60"
                    >
                      현재 페이지
                    </NavText>
                  </li>
                  <li>
                    <NavText
                      as="a"
                      href="#"
                      variant="depth-md"
                      className="hover:text-primary-60 transition-colors"
                    >
                      다른 페이지
                    </NavText>
                  </li>
                </ul>
              </nav>
            </ComponentPreview>
            <div className="mt-4">
              <CodeBlock
                code={`{/* 현재 페이지 */}
<NavText
  as="a"
  href="/current"
  variant="depth-md"
  className="text-primary-60"
>
  현재 페이지
</NavText>

{/* 다른 페이지 */}
<NavText
  as="a"
  href="/other"
  variant="depth-md"
  className="hover:text-primary-60"
>
  다른 페이지
</NavText>`}
                language="tsx"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div className="mb-12">
        <h2 id="guidelines" className="text-2xl font-bold mb-6">
          사용 가이드라인
        </h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30 p-6">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
              ✓ NavText를 사용하기 적합한 경우
            </h3>
            <ul className="list-disc list-inside space-y-2 text-green-800 dark:text-green-200">
              <li>헤더 네비게이션 메뉴</li>
              <li>사이드바 메뉴</li>
              <li>드롭다운 메뉴</li>
              <li>탭 메뉴</li>
              <li>브레드크럼(breadcrumb) 네비게이션</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-6">
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
              ⚠ 주의사항
            </h3>
            <ul className="list-disc list-inside space-y-2 text-amber-800 dark:text-amber-200">
              <li>tit 변형은 메뉴 제목/그룹명에 사용</li>
              <li>depth 변형은 실제 링크 항목에 사용</li>
              <li>계층 구조가 명확히 드러나도록 구성</li>
              <li>활성 상태는 색상이나 굵기로 명확히 표시</li>
            </ul>
          </div>

          <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-6">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-3">
              ✗ NavText를 사용하지 말아야 하는 경우
            </h3>
            <ul className="list-disc list-inside space-y-2 text-red-800 dark:text-red-200">
              <li>일반 본문 텍스트 (Body 사용 권장)</li>
              <li>페이지 제목 (Heading 사용 권장)</li>
              <li>버튼 텍스트 (Button 컴포넌트 사용)</li>
              <li>폼 라벨 (Label 사용 권장)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* API */}
      <div className="mb-12">
        <h2 id="api" className="text-2xl font-bold mb-6">
          API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4">Prop</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Default</th>
                <th className="text-left py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4">
                  <code>variant</code>
                </td>
                <td className="py-3 px-4">
                  <code>"tit-lg" | "tit-sm" | "depth-md" | "depth-sm"</code>
                </td>
                <td className="py-3 px-4">
                  <code>"depth-md"</code>
                </td>
                <td className="py-3 px-4">네비게이션 텍스트 스타일</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4">
                  <code>weight</code>
                </td>
                <td className="py-3 px-4">
                  <code>"regular" | "bold"</code>
                </td>
                <td className="py-3 px-4">
                  <code>"regular"</code>
                </td>
                <td className="py-3 px-4">글자 굵기 (tit-* 에는 자동 적용)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4">
                  <code>as</code>
                </td>
                <td className="py-3 px-4">
                  <code>"span" | "div" | "a" | "button"</code>
                </td>
                <td className="py-3 px-4">
                  <code>"span"</code>
                </td>
                <td className="py-3 px-4">렌더링할 HTML 태그</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 px-4">
                  <code>className</code>
                </td>
                <td className="py-3 px-4">
                  <code>string</code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">추가 CSS 클래스</td>
              </tr>
              <tr>
                <td className="py-3 px-4">
                  <code>children</code>
                </td>
                <td className="py-3 px-4">
                  <code>ReactNode</code>
                </td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4">텍스트 내용</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="mb-12">
        <h2 id="accessibility" className="text-2xl font-bold mb-6">
          접근성
        </h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
          <ul className="space-y-2 text-blue-900 dark:text-blue-100">
            <li>✓ 시맨틱 nav 태그와 함께 사용</li>
            <li>✓ 링크는 a 태그로, 동작 트리거는 button 태그로 렌더링</li>
            <li>
              ✓ 현재 페이지는 aria-current=&quot;page&quot; 속성 추가 권장
            </li>
            <li>✓ 키보드 네비게이션 지원 (Tab, Enter)</li>
            <li>✓ 명확한 계층 구조로 스크린 리더 탐색 지원</li>
          </ul>
        </div>
      </div>

      {/* KRDS Compliance */}
      <div className="mb-12">
        <h2 id="krds" className="text-2xl font-bold mb-6">
          KRDS 준수사항
        </h2>
        <div className="rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 p-6">
          <ul className="space-y-2 text-blue-900 dark:text-blue-100">
            <li>✓ tit 변형은 Bold (700) 폰트 굵기</li>
            <li>✓ depth 변형은 Regular (400) 폰트 굵기</li>
            <li>✓ 150% 줄 간격으로 가독성 확보</li>
            <li>✓ 반응형 크기 (tit 변형은 PC/모바일 최적화)</li>
            <li>✓ Pretendard GOV 폰트 적용</li>
          </ul>
        </div>
      </div>
    </>
  );
}
