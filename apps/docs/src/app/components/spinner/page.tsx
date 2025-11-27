'use client';

import { useState } from 'react';
import { PageSection as Section, Heading } from '@/components/content';
import { PreviewBox } from '@/components/helpers';
import {
  Spinner,
  SpinnerOverlay,
  SpinnerInline,
  Button,
  Stack,
  Body,
  Code,
} from '@hanui/react';

function SpinnerOverlayDemo() {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <>
      <Button onClick={handleShow}>오버레이 표시 (2초)</Button>
      <SpinnerOverlay show={show} message="처리 중입니다..." />
    </>
  );
}

function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? <SpinnerInline>저장 중...</SpinnerInline> : '저장하기'}
    </Button>
  );
}

export default function SpinnerPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Spinner"
        description="로딩 상태를 표시하는 회전 애니메이션 컴포넌트입니다."
        badge="New"
      />

      {/* 기본 사용법 */}
      <Section>
        <Heading level="h2" id="default" title="기본 사용법">
          <Body>Spinner는 로딩 상태를 표시하는 기본 컴포넌트입니다.</Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
              <Spinner />
              <Spinner variant="secondary" />
              <Spinner variant="default" />
            </Stack>
          }
          code={`<Spinner />
<Spinner variant="secondary" />
<Spinner variant="default" />`}
        />
      </Section>

      {/* 크기 */}
      <Section>
        <Heading level="h2" id="sizes" title="크기">
          <Body>
            <Code>size</Code> prop으로 크기를 조절합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
              <Spinner size="xs" />
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="xl" />
            </Stack>
          }
          code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        />
      </Section>

      {/* 색상 변형 */}
      <Section>
        <Heading level="h2" id="variants" title="색상 변형">
          <Body>
            <Code>variant</Code> prop으로 색상을 지정합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="flex-wrap items-center">
              <div className="p-4">
                <Spinner variant="default" size="lg" />
                <p className="text-xs text-center mt-2">default</p>
              </div>
              <div className="p-4">
                <Spinner variant="primary" size="lg" />
                <p className="text-xs text-center mt-2">primary</p>
              </div>
              <div className="p-4">
                <Spinner variant="secondary" size="lg" />
                <p className="text-xs text-center mt-2">secondary</p>
              </div>
              <div className="p-4 bg-krds-gray-95 rounded">
                <Spinner variant="white" size="lg" />
                <p className="text-xs text-center mt-2 text-white">white</p>
              </div>
              <div className="p-4 text-krds-primary-base">
                <Spinner variant="inherit" size="lg" />
                <p className="text-xs text-center mt-2">inherit</p>
              </div>
            </Stack>
          }
          code={`<Spinner variant="default" />
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="white" />  {/* 어두운 배경에서 사용 */}
<Spinner variant="inherit" /> {/* 부모 색상 상속 */}`}
        />
      </Section>

      {/* 레이블 */}
      <Section>
        <Heading level="h2" id="label" title="스크린리더 레이블">
          <Body>
            <Code>label</Code> prop으로 스크린리더용 대체 텍스트를 지정합니다.
            기본값은 &quot;로딩 중&quot;입니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" direction="row" className="items-center">
              <Spinner label="데이터를 불러오는 중입니다" />
              <Spinner label="검색 결과 로딩 중" />
            </Stack>
          }
          code={`<Spinner label="데이터를 불러오는 중입니다" />
<Spinner label="검색 결과 로딩 중" />`}
        />
      </Section>

      {/* 인라인 스피너 */}
      <Section>
        <Heading level="h2" id="inline" title="인라인 스피너">
          <Body>
            <Code>SpinnerInline</Code>은 텍스트와 함께 표시됩니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg">
              <SpinnerInline>로딩 중...</SpinnerInline>
              <SpinnerInline position="right">데이터 처리 중</SpinnerInline>
              <SpinnerInline size="xs">불러오는 중</SpinnerInline>
            </Stack>
          }
          code={`<SpinnerInline>로딩 중...</SpinnerInline>
<SpinnerInline position="right">데이터 처리 중</SpinnerInline>
<SpinnerInline size="xs">불러오는 중</SpinnerInline>`}
        />
      </Section>

      {/* 버튼 로딩 상태 */}
      <Section>
        <Heading level="h2" id="button-loading" title="버튼 로딩 상태">
          <Body>버튼의 로딩 상태에 SpinnerInline을 사용합니다.</Body>
        </Heading>

        <PreviewBox
          preview={<ButtonLoadingDemo />}
          code={`const [loading, setLoading] = useState(false);

<Button onClick={handleClick} disabled={loading}>
  {loading ? <SpinnerInline>저장 중...</SpinnerInline> : '저장하기'}
</Button>`}
        />
      </Section>

      {/* 오버레이 */}
      <Section>
        <Heading level="h2" id="overlay" title="전체 화면 오버레이">
          <Body>
            <Code>SpinnerOverlay</Code>는 전체 화면을 덮는 로딩 오버레이입니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={<SpinnerOverlayDemo />}
          code={`const [show, setShow] = useState(false);

<SpinnerOverlay show={show} message="처리 중입니다..." />
<Button onClick={() => setShow(true)}>오버레이 표시</Button>`}
        />
      </Section>

      {/* 오버레이 배경 */}
      <Section>
        <Heading level="h2" id="overlay-backdrop" title="오버레이 배경 스타일">
          <Body>
            <Code>backdrop</Code> prop으로 배경 스타일을 설정합니다.
          </Body>
        </Heading>

        <PreviewBox
          preview={null}
          code={`{/* 밝은 배경 (기본) */}
<SpinnerOverlay backdrop="light" show={show} />

{/* 어두운 배경 */}
<SpinnerOverlay backdrop="dark" show={show} message="처리 중..." />

{/* 블러 효과 */}
<SpinnerOverlay backdrop="blur" show={show} />`}
        />
      </Section>

      {/* 실제 사용 예시 */}
      <Section>
        <Heading level="h2" id="examples" title="실제 사용 예시">
          <Body>데이터 로딩, 제출 상태 등 실제 사용 사례입니다.</Body>
        </Heading>

        <PreviewBox
          preview={
            <Stack gap="lg" className="w-full max-w-md">
              {/* 카드 로딩 */}
              <div className="rounded-lg border border-krds-gray-20 p-6 relative min-h-[120px] flex items-center justify-center">
                <div className="text-center">
                  <Spinner size="lg" />
                  <p className="mt-3 text-sm text-krds-gray-60">
                    데이터를 불러오는 중...
                  </p>
                </div>
              </div>

              {/* 검색 입력 */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full px-4 py-2 pr-10 border border-krds-gray-30 rounded-lg"
                  disabled
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Spinner size="sm" />
                </div>
              </div>

              {/* 무한 스크롤 */}
              <div className="text-center py-4">
                <SpinnerInline size="sm">더 불러오는 중...</SpinnerInline>
              </div>
            </Stack>
          }
          code={`{/* 카드 로딩 */}
<div className="card loading-state">
  <Spinner size="lg" />
  <p>데이터를 불러오는 중...</p>
</div>

{/* 검색 입력 */}
<div className="search-input">
  <input placeholder="검색어 입력" />
  <Spinner size="sm" />
</div>

{/* 무한 스크롤 */}
<SpinnerInline size="sm">더 불러오는 중...</SpinnerInline>`}
        />
      </Section>

      {/* 접근성 */}
      <Section>
        <Heading level="h2" id="accessibility" title="접근성">
          <Body>Spinner 컴포넌트는 KWCAG 2.2 AA 기준을 준수합니다.</Body>
        </Heading>

        <Stack gap="md" className="mt-4">
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">ARIA 속성</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                <Code>role=&quot;status&quot;</Code>: 상태 표시기임을 명시
              </li>
              <li>
                <Code>aria-live=&quot;polite&quot;</Code>: 스크린리더에 알림
              </li>
              <li>
                <Code>aria-busy=&quot;true&quot;</Code>: 오버레이에서 로딩 중
                표시
              </li>
              <li>
                <Code>sr-only</Code>: 시각 장애인을 위한 대체 텍스트
              </li>
            </ul>
          </div>
          <div className="rounded-lg border border-krds-gray-20 p-4">
            <h3 className="font-semibold text-krds-gray-95 mb-2">권장 사항</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-krds-gray-70">
              <li>
                항상 <Code>label</Code> prop으로 명확한 설명 제공
              </li>
              <li>오버레이 사용 시 포커스 트래핑 고려</li>
              <li>긴 로딩 시 진행률 표시 (Progress 컴포넌트) 권장</li>
            </ul>
          </div>
        </Stack>
      </Section>

      {/* Progress vs Spinner */}
      <Section>
        <Heading level="h2" id="vs-progress" title="Progress vs Spinner">
          <Body>Progress와 Spinner의 사용 시나리오를 비교합니다.</Body>
        </Heading>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-krds-gray-20">
                <th className="text-left py-3 px-4 font-semibold">특성</th>
                <th className="text-left py-3 px-4 font-semibold">Progress</th>
                <th className="text-left py-3 px-4 font-semibold">Spinner</th>
              </tr>
            </thead>
            <tbody className="text-krds-gray-70">
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">진행률</td>
                <td className="py-3 px-4">확정/불확정 모두 지원</td>
                <td className="py-3 px-4">불확정만</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">사용 사례</td>
                <td className="py-3 px-4">파일 업로드, 다운로드</td>
                <td className="py-3 px-4">페이지 로딩, API 호출</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">크기</td>
                <td className="py-3 px-4">가로로 길게</td>
                <td className="py-3 px-4">작고 컴팩트</td>
              </tr>
              <tr className="border-b border-krds-gray-10">
                <td className="py-3 px-4 font-medium">정보량</td>
                <td className="py-3 px-4">%로 정확한 진행률</td>
                <td className="py-3 px-4">로딩 중임만 표시</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* API Reference */}
      <Section>
        <Heading level="h2" id="api" title="API Reference" />

        <div className="space-y-6">
          {/* Spinner */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Spinner</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
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
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>size</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; |
                        &quot;lg&quot; | &quot;xl&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;md&quot;</Code>
                    </td>
                    <td className="py-3 px-4">크기</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>variant</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;default&quot; | &quot;primary&quot; |
                        &quot;secondary&quot; | &quot;white&quot; |
                        &quot;inherit&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;primary&quot;</Code>
                    </td>
                    <td className="py-3 px-4">색상 변형</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>label</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;로딩 중&quot;</Code>
                    </td>
                    <td className="py-3 px-4">스크린리더 레이블</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>strokeWidth</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>number</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>2</Code>
                    </td>
                    <td className="py-3 px-4">선 두께</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SpinnerOverlay */}
          <div>
            <h3 className="text-lg font-semibold mb-3">SpinnerOverlay</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
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
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>show</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>boolean</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>true</Code>
                    </td>
                    <td className="py-3 px-4">표시 여부</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>message</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>string</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">로딩 메시지</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>backdrop</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>
                        &quot;light&quot; | &quot;dark&quot; | &quot;blur&quot;
                      </Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;light&quot;</Code>
                    </td>
                    <td className="py-3 px-4">배경 스타일</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SpinnerInline */}
          <div>
            <h3 className="text-lg font-semibold mb-3">SpinnerInline</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-krds-gray-20">
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
                <tbody className="text-krds-gray-70">
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>children</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>ReactNode</Code>
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">텍스트 내용</td>
                  </tr>
                  <tr className="border-b border-krds-gray-10">
                    <td className="py-3 px-4">
                      <Code>position</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;left&quot; | &quot;right&quot;</Code>
                    </td>
                    <td className="py-3 px-4">
                      <Code>&quot;left&quot;</Code>
                    </td>
                    <td className="py-3 px-4">스피너 위치</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
