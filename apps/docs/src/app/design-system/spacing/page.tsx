'use client';

import { Stack, Section, Button, Input } from '@hanui/react';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { CodeBlock } from '@/components/docs/CodeBlock';

export default function SpacingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Stack spacing="h1-h2">
        <h1 className="text-heading-xl font-bold">Spacing</h1>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">개요</h2>
          <p className="text-body-md text-gray-70">
            HANUI는 KRDS의 8포인트 그리드 시스템을 따르는 시맨틱 스페이싱
            시스템을 제공합니다.
            <strong>Stack</strong>과 <strong>Section</strong> 컴포넌트를
            사용하면 gap-layout과 padding-layout 토큰을 외우지 않고도 일관된
            간격을 적용할 수 있습니다.
          </p>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">왜 시맨틱 스페이싱인가?</h2>

          <div className="bg-gray-5 dark:bg-gray-90 p-6 rounded-lg">
            <Stack spacing="h3-content">
              <h3 className="text-heading-sm font-semibold text-primary-70">
                문제점
              </h3>
              <p className="text-body-md text-gray-70">
                기존 방식에서는 "폼에는 gap-5를 쓰고, 카드 리스트에는 gap-7을
                쓴다"는 규칙을 모든 개발자가 외워야 했습니다. 바쁜 작업 중에
                KRDS 문서를 확인하며 작업하는 것은 비효율적입니다.
              </p>
            </Stack>

            <Stack spacing="h3-content" className="mt-6">
              <h3 className="text-heading-sm font-semibold text-primary-70">
                해결책
              </h3>
              <p className="text-body-md text-gray-70">
                시맨틱 컴포넌트를 사용하면{' '}
                <code className="text-sm bg-gray-10 px-2 py-1 rounded">
                  spacing="form"
                </code>
                처럼 의미를 명시하면 자동으로 올바른 간격이 적용됩니다.
              </p>
            </Stack>
          </div>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">Stack - Gap Layout</h2>
          <p className="text-body-md text-gray-70">
            Stack은 수직/수평 방향으로 요소를 배치하고 간격을 관리하는
            컴포넌트입니다. KRDS gap-layout 토큰을 시맨틱하게 적용할 수
            있습니다.
          </p>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">폼 레이아웃</h3>
            <ComponentPreview>
              <Stack spacing="form" className="max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    이름
                  </label>
                  <Input placeholder="홍길동" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    이메일
                  </label>
                  <Input type="email" placeholder="hong@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    비밀번호
                  </label>
                  <Input type="password" placeholder="********" />
                </div>
                <Button className="w-full">제출</Button>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="form">
  <div>
    <label>이름</label>
    <Input placeholder="홍길동" />
  </div>
  <div>
    <label>이메일</label>
    <Input type="email" placeholder="hong@example.com" />
  </div>
  <Button>제출</Button>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">카드 리스트</h3>
            <ComponentPreview>
              <Stack spacing="card-list">
                <div className="p-6 bg-white dark:bg-gray-90 rounded-lg border">
                  <h4 className="text-heading-sm font-semibold mb-2">카드 1</h4>
                  <p className="text-body-sm text-gray-70">카드 내용입니다.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-90 rounded-lg border">
                  <h4 className="text-heading-sm font-semibold mb-2">카드 2</h4>
                  <p className="text-body-sm text-gray-70">카드 내용입니다.</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-90 rounded-lg border">
                  <h4 className="text-heading-sm font-semibold mb-2">카드 3</h4>
                  <p className="text-body-sm text-gray-70">카드 내용입니다.</p>
                </div>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="card-list">
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">제목 계층</h3>
            <ComponentPreview>
              <Stack spacing="h1-h2">
                <h1 className="text-heading-xl font-bold">메인 제목</h1>
                <Stack spacing="h2-h3">
                  <h2 className="text-heading-lg font-bold">서브 제목 1</h2>
                  <Stack spacing="h3-content">
                    <h3 className="text-heading-md font-bold">소제목</h3>
                    <p className="text-body-md text-gray-70">
                      콘텐츠 내용입니다. KRDS 타이포그래피 계층에 맞춰 자동으로
                      간격이 조정됩니다.
                    </p>
                  </Stack>
                </Stack>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="h1-h2">
  <h1>메인 제목</h1>
  <Stack spacing="h2-h3">
    <h2>서브 제목</h2>
    <Stack spacing="h3-content">
      <h3>소제목</h3>
      <p>콘텐츠 내용</p>
    </Stack>
  </Stack>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">가로 방향 레이아웃</h3>
            <ComponentPreview>
              <Stack direction="horizontal" spacing="md" align="center">
                <Button variant="primary">저장</Button>
                <Button variant="outline">취소</Button>
                <Button variant="ghost">삭제</Button>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack direction="horizontal" spacing="md" align="center">
  <Button variant="primary">저장</Button>
  <Button variant="outline">취소</Button>
  <Button variant="ghost">삭제</Button>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              전체 KRDS 스페이싱 프리셋
            </h3>
            <p className="text-body-md text-gray-70">
              모든 간격은 반응형으로 모바일과 PC에서 자동으로 조정됩니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">프리셋</th>
                    <th className="text-left py-3 px-4">모바일</th>
                    <th className="text-left py-3 px-4">PC</th>
                    <th className="text-left py-3 px-4">용도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Header & Navigation
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>header-breadcrumb</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">헤더와 브레드크럼 사이</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Layout Spacing
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>left-contents</code>
                    </td>
                    <td className="py-3 px-4">0px</td>
                    <td className="py-3 px-4">64px</td>
                    <td className="py-3 px-4">사이드바-콘텐츠 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>contents-right</code>
                    </td>
                    <td className="py-3 px-4">0px</td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">콘텐츠-우측 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>contents-footer</code>
                    </td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">64px</td>
                    <td className="py-3 px-4">콘텐츠-푸터 간격</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Heading Hierarchy
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h1-h2</code>
                    </td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">48px</td>
                    <td className="py-3 px-4">H1과 H2 제목 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h2-h2</code>
                    </td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">80px</td>
                    <td className="py-3 px-4">H2 제목들 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h2-h3</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">H2와 H3 제목 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h3-h3</code>
                    </td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">64px</td>
                    <td className="py-3 px-4">H3 제목들 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h3-h4</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">H3와 H4 제목 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h4-h4</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">H4 제목들 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h4-h5</code>
                    </td>
                    <td className="py-3 px-4">12px</td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">H4와 H5 제목 사이</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>h5-h5</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">H5 제목들 사이</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Title to Body
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>title-body-small</code>
                    </td>
                    <td className="py-3 px-4">8px</td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">작은 제목-본문 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>title-body-medium</code>
                    </td>
                    <td className="py-3 px-4">12px</td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">중간 제목-본문 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>title-body-large</code>
                    </td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">큰 제목-본문 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>breadcrumb-h1</code>
                    </td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">브레드크럼-H1 간격</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Text Spacing
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>text-text-small</code>
                    </td>
                    <td className="py-3 px-4">10px</td>
                    <td className="py-3 px-4">12px</td>
                    <td className="py-3 px-4">작은 텍스트 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>text-text-medium</code>
                    </td>
                    <td className="py-3 px-4">12px</td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">중간 텍스트 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>text-text-large</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">큰 텍스트 간격</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Image to Text
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>image-text-small</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">작은 이미지-텍스트 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>image-text-medium</code>
                    </td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">중간 이미지-텍스트 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>image-text-large</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">큰 이미지-텍스트 간격</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Common Use Cases
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>form</code>
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      16px
                    </td>
                    <td className="py-3 px-4">폼 필드 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>card-list</code>
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      24px
                    </td>
                    <td className="py-3 px-4">카드 리스트 간격</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>input-group</code>
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      8px
                    </td>
                    <td className="py-3 px-4">라벨-입력 필드 간격</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">제네릭 스페이싱</h3>
            <p className="text-body-md text-gray-70">
              시맨틱 프리셋이 없는 경우 제네릭 사이즈를 사용할 수 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">사이즈</th>
                    <th className="text-left py-3 px-4">간격</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>xs</code>
                    </td>
                    <td className="py-3 px-4">8px</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>sm</code>
                    </td>
                    <td className="py-3 px-4">12px</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>md</code>
                    </td>
                    <td className="py-3 px-4">16px (기본값)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>lg</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>xl</code>
                    </td>
                    <td className="py-3 px-4">32px</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>2xl</code>
                    </td>
                    <td className="py-3 px-4">40px</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>3xl</code>
                    </td>
                    <td className="py-3 px-4">64px</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">
            Section - Padding Layout
          </h2>
          <p className="text-body-md text-gray-70">
            Section은 페이지 섹션, 카드, 폼 등에 패딩을 적용하는 컴포넌트입니다.
            KRDS padding-layout 토큰을 시맨틱하게 적용할 수 있습니다.
          </p>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">페이지 섹션</h3>
            <ComponentPreview>
              <Section padding="page-section" background="gray">
                <h2 className="text-heading-lg font-bold mb-4">페이지 섹션</h2>
                <p className="text-body-md text-gray-70">
                  페이지 섹션 기본 패딩이 적용되었습니다. PC에서는 24px/64px,
                  모바일에서는 16px/40px이 적용됩니다.
                </p>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Section padding="page-section" background="gray">
  <h2>페이지 섹션</h2>
  <p>페이지 섹션 기본 패딩이 적용되었습니다.</p>
</Section>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">카드</h3>
            <ComponentPreview>
              <Section
                padding="card-md"
                background="white"
                className="rounded-lg border max-w-md"
              >
                <h3 className="text-heading-sm font-semibold mb-2">
                  카드 제목
                </h3>
                <p className="text-body-sm text-gray-70">
                  카드 미디엄 패딩(24px)이 적용되었습니다.
                </p>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Section padding="card-md" background="white" className="rounded-lg border">
  <h3>카드 제목</h3>
  <p>카드 미디엄 패딩(24px)이 적용되었습니다.</p>
</Section>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">폼 섹션</h3>
            <ComponentPreview>
              <Section
                padding="form-section"
                background="gray"
                className="rounded-lg max-w-md"
              >
                <h3 className="text-heading-sm font-semibold mb-4">로그인</h3>
                <Stack spacing="form">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      이메일
                    </label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      비밀번호
                    </label>
                    <Input type="password" placeholder="********" />
                  </div>
                  <Button className="w-full">로그인</Button>
                </Stack>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Section padding="form-section" background="gray" className="rounded-lg">
  <h3>로그인</h3>
  <Stack spacing="form">
    <div>
      <label>이메일</label>
      <Input type="email" />
    </div>
    <div>
      <label>비밀번호</label>
      <Input type="password" />
    </div>
    <Button>로그인</Button>
  </Stack>
</Section>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">전체 KRDS 패딩 프리셋</h3>
            <p className="text-body-md text-gray-70">
              모든 패딩은 반응형으로 모바일과 PC에서 자동으로 조정됩니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">프리셋</th>
                    <th className="text-left py-3 px-4">모바일</th>
                    <th className="text-left py-3 px-4">PC</th>
                    <th className="text-left py-3 px-4">용도</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      KRDS Card Padding
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>card-large</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">40px</td>
                    <td className="py-3 px-4">큰 카드</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>card-medium</code>
                    </td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">32px</td>
                    <td className="py-3 px-4">중간 카드</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>card-small</code>
                    </td>
                    <td className="py-3 px-4">20px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">작은 카드</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>card-xsmall</code>
                    </td>
                    <td className="py-3 px-4">12px</td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">매우 작은 카드</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Page Sections
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>page-section</code>
                    </td>
                    <td className="py-3 px-4">16px/40px</td>
                    <td className="py-3 px-4">24px/64px</td>
                    <td className="py-3 px-4">페이지 섹션</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>content-area</code>
                    </td>
                    <td className="py-3 px-4">16px/32px</td>
                    <td className="py-3 px-4">24px/48px</td>
                    <td className="py-3 px-4">콘텐츠 영역</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Form Sections
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>form-section</code>
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      24px
                    </td>
                    <td className="py-3 px-4">폼 섹션</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>input-container</code>
                    </td>
                    <td className="py-3 px-4" colSpan={2}>
                      16px
                    </td>
                    <td className="py-3 px-4">입력 필드 컨테이너</td>
                  </tr>

                  <tr className="border-b bg-gray-5 dark:bg-gray-90">
                    <td colSpan={4} className="py-2 px-4 font-semibold">
                      Navigation/Header
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>header</code>
                    </td>
                    <td className="py-3 px-4">16px</td>
                    <td className="py-3 px-4">24px</td>
                    <td className="py-3 px-4">헤더</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>footer</code>
                    </td>
                    <td className="py-3 px-4">16px/40px</td>
                    <td className="py-3 px-4">24px/64px</td>
                    <td className="py-3 px-4">푸터</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">복합 사용 예제</h2>
          <p className="text-body-md text-gray-70">
            Stack과 Section을 함께 사용하여 완전한 페이지 레이아웃을 구성할 수
            있습니다.
          </p>

          <ComponentPreview>
            <Section
              padding="page-section"
              background="white"
              className="rounded-lg border"
            >
              <Stack spacing="h1-h2">
                <h1 className="text-heading-xl font-bold">회원가입</h1>

                <Stack spacing="h2-h3">
                  <h2 className="text-heading-lg font-bold">기본 정보</h2>

                  <Section
                    padding="form-section"
                    background="gray"
                    className="rounded-lg"
                  >
                    <Stack spacing="form">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          이름
                        </label>
                        <Input placeholder="홍길동" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          이메일
                        </label>
                        <Input type="email" placeholder="hong@example.com" />
                      </div>
                    </Stack>
                  </Section>
                </Stack>

                <Stack spacing="h2-h3">
                  <h2 className="text-heading-lg font-bold">보안 정보</h2>

                  <Section
                    padding="form-section"
                    background="gray"
                    className="rounded-lg"
                  >
                    <Stack spacing="form">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          비밀번호
                        </label>
                        <Input type="password" placeholder="********" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          비밀번호 확인
                        </label>
                        <Input type="password" placeholder="********" />
                      </div>
                    </Stack>
                  </Section>
                </Stack>

                <Stack direction="horizontal" spacing="md" justify="end">
                  <Button variant="outline">취소</Button>
                  <Button variant="primary">가입하기</Button>
                </Stack>
              </Stack>
            </Section>
          </ComponentPreview>

          <CodeBlock
            code={`<Section padding="page-section" background="white">
  <Stack spacing="h1-h2">
    <h1>회원가입</h1>

    <Stack spacing="h2-h3">
      <h2>기본 정보</h2>
      <Section padding="form-section" background="gray">
        <Stack spacing="form">
          <div>
            <label>이름</label>
            <Input placeholder="홍길동" />
          </div>
          <div>
            <label>이메일</label>
            <Input type="email" />
          </div>
        </Stack>
      </Section>
    </Stack>

    <Stack spacing="h2-h3">
      <h2>보안 정보</h2>
      <Section padding="form-section" background="gray">
        <Stack spacing="form">
          <div>
            <label>비밀번호</label>
            <Input type="password" />
          </div>
          <div>
            <label>비밀번호 확인</label>
            <Input type="password" />
          </div>
        </Stack>
      </Section>
    </Stack>

    <Stack direction="horizontal" spacing="md" justify="end">
      <Button variant="outline">취소</Button>
      <Button variant="primary">가입하기</Button>
    </Stack>
  </Stack>
</Section>`}
            language="tsx"
          />
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">API</h2>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">Stack Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Prop</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Default</th>
                    <th className="text-left py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>spacing</code>
                    </td>
                    <td className="py-3 px-4">시맨틱 프리셋 | 제네릭 사이즈</td>
                    <td className="py-3 px-4">"md"</td>
                    <td className="py-3 px-4">간격 크기</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>direction</code>
                    </td>
                    <td className="py-3 px-4">"vertical" | "horizontal"</td>
                    <td className="py-3 px-4">"vertical"</td>
                    <td className="py-3 px-4">배치 방향</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>align</code>
                    </td>
                    <td className="py-3 px-4">
                      "start" | "center" | "end" | "stretch"
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">정렬</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>justify</code>
                    </td>
                    <td className="py-3 px-4">
                      "start" | "center" | "end" | "between" | "around"
                    </td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">justify</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>as</code>
                    </td>
                    <td className="py-3 px-4">
                      "div" | "section" | "article" | "main" | "aside" |
                      "header" | "footer"
                    </td>
                    <td className="py-3 px-4">"div"</td>
                    <td className="py-3 px-4">렌더링할 HTML 요소</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">Section Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Prop</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Default</th>
                    <th className="text-left py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>padding</code>
                    </td>
                    <td className="py-3 px-4">시맨틱 프리셋 | 제네릭 사이즈</td>
                    <td className="py-3 px-4">"page-section"</td>
                    <td className="py-3 px-4">패딩 크기</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>background</code>
                    </td>
                    <td className="py-3 px-4">
                      "white" | "gray" | "primary" | "transparent"
                    </td>
                    <td className="py-3 px-4">"transparent"</td>
                    <td className="py-3 px-4">배경색</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      <code>as</code>
                    </td>
                    <td className="py-3 px-4">
                      "div" | "section" | "article" | "main" | "aside" |
                      "header" | "footer" | "nav"
                    </td>
                    <td className="py-3 px-4">"section"</td>
                    <td className="py-3 px-4">렌더링할 HTML 요소</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">실전 예제</h2>
          <p className="text-body-md text-gray-70">
            다양한 KRDS gap-layout 토큰을 실제로 사용하는 예제입니다.
          </p>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              블로그 포스트 레이아웃
            </h3>
            <ComponentPreview>
              <Section
                padding="page-section"
                background="white"
                className="rounded-lg border max-w-2xl"
              >
                <Stack spacing="breadcrumb-h1">
                  <div className="text-sm text-primary-70">
                    홈 &gt; 블로그 &gt; 개발
                  </div>
                  <Stack spacing="h1-h2">
                    <h1 className="text-heading-xl font-bold">
                      KRDS 디자인 시스템 소개
                    </h1>
                    <Stack spacing="h2-h3">
                      <h2 className="text-heading-lg font-bold">시작하기</h2>
                      <Stack spacing="title-body-medium">
                        <h3 className="text-heading-md font-semibold">
                          설치 방법
                        </h3>
                        <p className="text-body-md text-gray-70">
                          KRDS는 한국 정부의 공식 디자인 시스템입니다. 접근성과
                          사용성을 최우선으로 설계되었습니다.
                        </p>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="breadcrumb-h1">
  <Breadcrumb />
  <Stack spacing="h1-h2">
    <h1>KRDS 디자인 시스템 소개</h1>
    <Stack spacing="h2-h3">
      <h2>시작하기</h2>
      <Stack spacing="title-body-medium">
        <h3>설치 방법</h3>
        <p>설명 텍스트...</p>
      </Stack>
    </Stack>
  </Stack>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">이미지 갤러리</h3>
            <ComponentPreview>
              <Stack spacing="image-text-medium">
                <div className="bg-gray-20 h-48 rounded-lg flex items-center justify-center">
                  <span className="text-gray-60">이미지</span>
                </div>
                <Stack spacing="text-text-small">
                  <h4 className="text-heading-sm font-semibold">서울 야경</h4>
                  <p className="text-body-sm text-gray-70">
                    서울 남산에서 바라본 아름다운 야경입니다.
                  </p>
                </Stack>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="image-text-medium">
  <img src="..." alt="서울 야경" />
  <Stack spacing="text-text-small">
    <h4>서울 야경</h4>
    <p>서울 남산에서 바라본 아름다운 야경입니다.</p>
  </Stack>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">다단계 제목 구조</h3>
            <ComponentPreview>
              <Section
                padding="content-area"
                background="white"
                className="rounded-lg border"
              >
                <Stack spacing="h2-h2">
                  <Stack spacing="h2-h3">
                    <h2 className="text-heading-lg font-bold">첫 번째 섹션</h2>
                    <Stack spacing="h3-h4">
                      <h3 className="text-heading-md font-semibold">
                        주요 기능
                      </h3>
                      <Stack spacing="h4-h5">
                        <h4 className="text-heading-sm font-semibold">
                          접근성
                        </h4>
                        <h5 className="text-heading-xs font-semibold">
                          WCAG 2.1 AA 준수
                        </h5>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack spacing="h2-h3">
                    <h2 className="text-heading-lg font-bold">두 번째 섹션</h2>
                    <p className="text-body-md text-gray-70">
                      다른 섹션 내용...
                    </p>
                  </Stack>
                </Stack>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="h2-h2">
  <Stack spacing="h2-h3">
    <h2>첫 번째 섹션</h2>
    <Stack spacing="h3-h4">
      <h3>주요 기능</h3>
      <Stack spacing="h4-h5">
        <h4>접근성</h4>
        <h5>WCAG 2.1 AA 준수</h5>
      </Stack>
    </Stack>
  </Stack>

  <Stack spacing="h2-h3">
    <h2>두 번째 섹션</h2>
    <p>다른 섹션 내용...</p>
  </Stack>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">텍스트 목록</h3>
            <ComponentPreview>
              <Stack spacing="text-text-medium">
                <p className="text-body-md">
                  첫 번째 문단입니다. 이것은 중간 크기의 텍스트 간격을
                  사용합니다.
                </p>
                <p className="text-body-md">
                  두 번째 문단입니다. 가독성을 위해 적절한 간격이
                  적용되었습니다.
                </p>
                <p className="text-body-md">
                  세 번째 문단입니다. 모든 문단이 일관된 간격을 유지합니다.
                </p>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="text-text-medium">
  <p>첫 번째 문단입니다...</p>
  <p>두 번째 문단입니다...</p>
  <p>세 번째 문단입니다...</p>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">2단 레이아웃</h3>
            <ComponentPreview>
              <Stack
                direction="horizontal"
                spacing="left-contents"
                align="start"
                className="w-full"
              >
                <div className="hidden md:block w-48 bg-gray-10 dark:bg-gray-90 p-4 rounded-lg">
                  <p className="text-body-sm font-semibold">사이드바</p>
                </div>
                <div className="flex-1">
                  <Stack spacing="h2-h3">
                    <h2 className="text-heading-lg font-bold">메인 콘텐츠</h2>
                    <p className="text-body-md text-gray-70">
                      PC에서는 사이드바와 64px 간격이 적용되고, 모바일에서는
                      사이드바가 숨겨지고 간격이 0이 됩니다.
                    </p>
                  </Stack>
                </div>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack direction="horizontal" spacing="left-contents">
  <aside className="hidden md:block w-48">
    사이드바 내용
  </aside>
  <main className="flex-1">
    <Stack spacing="h2-h3">
      <h2>메인 콘텐츠</h2>
      <p>콘텐츠...</p>
    </Stack>
  </main>
</Stack>`}
              language="tsx"
            />
          </Stack>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">
            Section (Padding-Layout) 실전 예제
          </h2>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              대형 카드 (card-large)
            </h3>
            <p className="text-body-md text-gray-70">
              중요한 콘텐츠나 히어로 섹션에 적합한 넉넉한 패딩입니다. 모바일:
              24px / PC: 40px
            </p>
            <ComponentPreview>
              <Section
                padding="card-large"
                background="primary"
                className="rounded-lg max-w-2xl"
              >
                <Stack spacing="title-body-large">
                  <h3 className="text-heading-lg font-bold text-primary-90 dark:text-primary-10">
                    환영합니다
                  </h3>
                  <p className="text-body-md text-primary-80 dark:text-primary-20">
                    HANUI는 KRDS 기반의 React 컴포넌트 라이브러리입니다.
                    접근성과 일관성을 최우선으로 설계되었습니다.
                  </p>
                </Stack>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Section padding="card-large" background="primary" className="rounded-lg">
  <Stack spacing="title-body-large">
    <h3 className="text-heading-lg font-bold">환영합니다</h3>
    <p className="text-body-md">
      HANUI는 KRDS 기반의 React 컴포넌트 라이브러리입니다.
    </p>
  </Stack>
</Section>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              중형 카드 (card-medium)
            </h3>
            <p className="text-body-md text-gray-70">
              일반적인 카드 컴포넌트에 적합한 표준 패딩입니다. 모바일: 24px /
              PC: 32px
            </p>
            <ComponentPreview>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                <Section
                  padding="card-medium"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="title-body-medium">
                    <h4 className="text-heading-md font-bold">디자인 토큰</h4>
                    <p className="text-body-sm text-gray-70">
                      KRDS 기반의 색상, 타이포그래피, 간격 토큰을 제공합니다.
                    </p>
                  </Stack>
                </Section>
                <Section
                  padding="card-medium"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="title-body-medium">
                    <h4 className="text-heading-md font-bold">접근성</h4>
                    <p className="text-body-sm text-gray-70">
                      WCAG 2.1 AA 기준을 준수하여 모든 사용자가 접근 가능합니다.
                    </p>
                  </Stack>
                </Section>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Section padding="card-medium" background="white">
    <Stack spacing="title-body-medium">
      <h4>디자인 토큰</h4>
      <p>KRDS 기반의 색상, 타이포그래피, 간격 토큰을 제공합니다.</p>
    </Stack>
  </Section>
  <Section padding="card-medium" background="white">
    <Stack spacing="title-body-medium">
      <h4>접근성</h4>
      <p>WCAG 2.1 AA 기준을 준수합니다.</p>
    </Stack>
  </Section>
</div>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              소형 카드 (card-small)
            </h3>
            <p className="text-body-md text-gray-70">
              간결한 정보 카드나 목록 아이템에 적합합니다. 모바일: 20px / PC:
              24px
            </p>
            <ComponentPreview>
              <Stack spacing="card-list" className="max-w-md">
                <Section
                  padding="card-small"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="input-group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-60 flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <h5 className="text-heading-xs font-semibold">설치</h5>
                        <p className="text-body-xs text-gray-60">
                          npm install @hanui/react
                        </p>
                      </div>
                    </div>
                  </Stack>
                </Section>
                <Section
                  padding="card-small"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="input-group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-60 flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <h5 className="text-heading-xs font-semibold">
                          Import
                        </h5>
                        <p className="text-body-xs text-gray-60">
                          컴포넌트를 가져오기
                        </p>
                      </div>
                    </div>
                  </Stack>
                </Section>
                <Section
                  padding="card-small"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="input-group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-60 flex items-center justify-center text-white font-bold">
                        3
                      </div>
                      <div>
                        <h5 className="text-heading-xs font-semibold">사용</h5>
                        <p className="text-body-xs text-gray-60">
                          프로젝트에 적용
                        </p>
                      </div>
                    </div>
                  </Stack>
                </Section>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="card-list">
  <Section padding="card-small" background="white">
    <Stack spacing="input-group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-60">1</div>
        <div>
          <h5>설치</h5>
          <p>npm install @hanui/react</p>
        </div>
      </div>
    </Stack>
  </Section>
  <Section padding="card-small" background="white">
    {/* 다른 단계들... */}
  </Section>
</Stack>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              초소형 카드 (card-xsmall)
            </h3>
            <p className="text-body-md text-gray-70">
              태그, 칩, 작은 레이블 등에 적합한 최소 패딩입니다. 모바일: 12px /
              PC: 16px
            </p>
            <ComponentPreview>
              <div className="flex flex-wrap gap-3">
                <Section
                  padding="card-xsmall"
                  background="white"
                  className="rounded-full border inline-flex"
                  as="div"
                >
                  <span className="text-body-xs font-medium text-primary-70">
                    React
                  </span>
                </Section>
                <Section
                  padding="card-xsmall"
                  background="white"
                  className="rounded-full border inline-flex"
                  as="div"
                >
                  <span className="text-body-xs font-medium text-primary-70">
                    TypeScript
                  </span>
                </Section>
                <Section
                  padding="card-xsmall"
                  background="white"
                  className="rounded-full border inline-flex"
                  as="div"
                >
                  <span className="text-body-xs font-medium text-primary-70">
                    Tailwind CSS
                  </span>
                </Section>
                <Section
                  padding="card-xsmall"
                  background="white"
                  className="rounded-full border inline-flex"
                  as="div"
                >
                  <span className="text-body-xs font-medium text-primary-70">
                    KRDS
                  </span>
                </Section>
              </div>
            </ComponentPreview>
            <CodeBlock
              code={`<div className="flex flex-wrap gap-3">
  <Section
    padding="card-xsmall"
    background="white"
    className="rounded-full border"
    as="div"
  >
    <span className="text-body-xs font-medium">React</span>
  </Section>
  <Section padding="card-xsmall" background="white" as="div">
    <span className="text-body-xs font-medium">TypeScript</span>
  </Section>
  <Section padding="card-xsmall" background="white" as="div">
    <span className="text-body-xs font-medium">Tailwind CSS</span>
  </Section>
</div>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              폼 섹션 (form-section)
            </h3>
            <p className="text-body-md text-gray-70">
              폼 컨테이너에 적합한 패딩입니다. 24px 고정값
            </p>
            <ComponentPreview>
              <Section
                padding="form-section"
                background="white"
                className="rounded-lg border max-w-md"
              >
                <Stack spacing="form">
                  <Stack spacing="input-group">
                    <label className="text-body-sm font-semibold text-gray-90 dark:text-gray-10">
                      이름
                    </label>
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-body-md"
                      placeholder="홍길동"
                    />
                  </Stack>
                  <Stack spacing="input-group">
                    <label className="text-body-sm font-semibold text-gray-90 dark:text-gray-10">
                      이메일
                    </label>
                    <input
                      type="email"
                      className="px-4 py-2 border rounded-lg text-body-md"
                      placeholder="hong@example.com"
                    />
                  </Stack>
                  <button className="mt-2 w-full bg-primary-60 text-white py-2 px-4 rounded-lg text-body-md font-medium hover:bg-primary-70 transition-colors">
                    제출
                  </button>
                </Stack>
              </Section>
            </ComponentPreview>
            <CodeBlock
              code={`<Section padding="form-section" background="white">
  <Stack spacing="form">
    <Stack spacing="input-group">
      <label>이름</label>
      <input type="text" placeholder="홍길동" />
    </Stack>
    <Stack spacing="input-group">
      <label>이메일</label>
      <input type="email" placeholder="hong@example.com" />
    </Stack>
    <button>제출</button>
  </Stack>
</Section>`}
              language="tsx"
            />
          </Stack>

          <Stack spacing="h3-content">
            <h3 className="text-heading-md font-bold">
              대시보드 레이아웃 (복합 예제)
            </h3>
            <p className="text-body-md text-gray-70">
              다양한 패딩 크기를 조합한 대시보드 레이아웃 예제입니다.
            </p>
            <ComponentPreview>
              <Stack spacing="h2-h3" className="w-full">
                {/* Header */}
                <Section
                  padding="header"
                  background="white"
                  className="rounded-lg border"
                  as="header"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-heading-md font-bold">대시보드</h2>
                    <div className="flex gap-2">
                      <Section
                        padding="card-xsmall"
                        background="gray"
                        className="rounded"
                        as="div"
                      >
                        <span className="text-body-xs">알림 3</span>
                      </Section>
                    </div>
                  </div>
                </Section>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Section
                    padding="card-medium"
                    background="white"
                    className="rounded-lg border"
                  >
                    <Stack spacing="input-group">
                      <p className="text-body-sm text-gray-60">총 방문자</p>
                      <p className="text-heading-lg font-bold text-primary-70">
                        1,234
                      </p>
                    </Stack>
                  </Section>
                  <Section
                    padding="card-medium"
                    background="white"
                    className="rounded-lg border"
                  >
                    <Stack spacing="input-group">
                      <p className="text-body-sm text-gray-60">신규 사용자</p>
                      <p className="text-heading-lg font-bold text-primary-70">
                        567
                      </p>
                    </Stack>
                  </Section>
                  <Section
                    padding="card-medium"
                    background="white"
                    className="rounded-lg border"
                  >
                    <Stack spacing="input-group">
                      <p className="text-body-sm text-gray-60">전환율</p>
                      <p className="text-heading-lg font-bold text-primary-70">
                        12.3%
                      </p>
                    </Stack>
                  </Section>
                </div>

                {/* Main Content */}
                <Section
                  padding="content-area"
                  background="white"
                  className="rounded-lg border"
                >
                  <Stack spacing="h3-content">
                    <h3 className="text-heading-md font-bold">최근 활동</h3>
                    <Stack spacing="card-list">
                      <Section
                        padding="card-small"
                        background="gray"
                        className="rounded-lg"
                      >
                        <p className="text-body-sm">
                          사용자 A가 로그인했습니다.
                        </p>
                      </Section>
                      <Section
                        padding="card-small"
                        background="gray"
                        className="rounded-lg"
                      >
                        <p className="text-body-sm">
                          새 주문이 접수되었습니다.
                        </p>
                      </Section>
                    </Stack>
                  </Stack>
                </Section>
              </Stack>
            </ComponentPreview>
            <CodeBlock
              code={`<Stack spacing="h2-h3">
  {/* Header */}
  <Section padding="header" background="white" as="header">
    <h2>대시보드</h2>
    <Section padding="card-xsmall" background="gray" as="div">
      알림 3
    </Section>
  </Section>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Section padding="card-medium" background="white">
      <Stack spacing="input-group">
        <p>총 방문자</p>
        <p className="text-heading-lg">1,234</p>
      </Stack>
    </Section>
    {/* 다른 통계 카드들... */}
  </div>

  {/* Main Content */}
  <Section padding="content-area" background="white">
    <Stack spacing="h3-content">
      <h3>최근 활동</h3>
      <Stack spacing="card-list">
        <Section padding="card-small" background="gray">
          <p>사용자 A가 로그인했습니다.</p>
        </Section>
      </Stack>
    </Stack>
  </Section>
</Stack>`}
              language="tsx"
            />
          </Stack>
        </Stack>

        <Stack spacing="h2-h3">
          <h2 className="text-heading-lg font-bold">베스트 프랙티스</h2>

          <Stack spacing="card-list">
            <Section
              padding="card-md"
              background="white"
              className="rounded-lg border"
            >
              <h3 className="text-heading-sm font-semibold mb-2">
                1. 시맨틱 프리셋 우선 사용
              </h3>
              <p className="text-body-sm text-gray-70">
                가능하면 "form", "card-list" 같은 시맨틱 프리셋을 사용하세요.
                코드의 의도가 명확해지고 KRDS 가이드라인을 자동으로 따릅니다.
              </p>
            </Section>

            <Section
              padding="card-md"
              background="white"
              className="rounded-lg border"
            >
              <h3 className="text-heading-sm font-semibold mb-2">
                2. 시맨틱 HTML 요소 활용
              </h3>
              <p className="text-body-sm text-gray-70">
                as prop을 사용하여 적절한 시맨틱 HTML 요소를 렌더링하세요.
                접근성과 SEO에 도움이 됩니다.
              </p>
            </Section>

            <Section
              padding="card-md"
              background="white"
              className="rounded-lg border"
            >
              <h3 className="text-heading-sm font-semibold mb-2">
                3. 일관된 간격 유지
              </h3>
              <p className="text-body-sm text-gray-70">
                직접 gap/padding 클래스를 사용하지 말고 Stack/Section을 사용하여
                프로젝트 전체에서 일관된 간격을 유지하세요.
              </p>
            </Section>

            <Section
              padding="card-md"
              background="white"
              className="rounded-lg border"
            >
              <h3 className="text-heading-sm font-semibold mb-2">
                4. 중첩 사용
              </h3>
              <p className="text-body-sm text-gray-70">
                복잡한 레이아웃은 Stack과 Section을 중첩하여 구성하세요. 각
                레벨에서 적절한 시맨틱 프리셋을 사용하면 됩니다.
              </p>
            </Section>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}
