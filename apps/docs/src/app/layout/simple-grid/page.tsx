'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Body,
  Stack,
  SimpleGrid,
  Button,
  Card,
  Code,
  PageNavigation,
} from '@/components/hanui';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function SimpleGridPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="SimpleGrid"
        description="자동으로 반응형 그리드 레이아웃을 생성하는 간단한 그리드 컴포넌트입니다."
      />

      <Section level="h2">
        <SectionHeading level="h2" id="overview" title="개요">
          <Body className="leading-relaxed">
            SimpleGrid 컴포넌트는 CSS Grid를 기반으로 반응형 레이아웃을 쉽게
            만들 수 있는 유틸리티입니다. 고정된 열 개수를 지정하거나, 최소
            너비를 설정하여 자동으로 열 개수를 조정할 수 있습니다.
          </Body>
        </SectionHeading>

        <ComponentPreview>
          <SimpleGrid columns={3} gap="md">
            <Card padding="md">
              <Body>Item 1</Body>
            </Card>
            <Card padding="md">
              <Body>Item 2</Body>
            </Card>
            <Card padding="md">
              <Body>Item 3</Body>
            </Card>
            <Card padding="md">
              <Body>Item 4</Body>
            </Card>
            <Card padding="md">
              <Body>Item 5</Body>
            </Card>
            <Card padding="md">
              <Body>Item 6</Body>
            </Card>
          </SimpleGrid>
        </ComponentPreview>
      </Section>

      <Section level="h2">
        <SectionHeading
          level="h2"
          id="installation"
          title="설치"
          description="CLI 명령어로 SimpleGrid 컴포넌트를 프로젝트에 추가합니다."
        />
        <Code variant="block">{`npx hanui add simple-grid`}</Code>
      </Section>

      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용법" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="고정된 열 개수" />
          <Body className="mb-4">
            <Code>columns</Code> prop으로 그리드의 열 개수를 지정할 수 있습니다.
          </Body>
          <ComponentPreview>
            <SimpleGrid columns={4} gap="md">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="px-4 py-8 bg-krds-gray-10 rounded text-center"
                >
                  {i + 1}
                </div>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">
            {`<SimpleGrid columns={4} gap="md">
  {items.map((item, i) => (
    <div key={i}>{item}</div>
  ))}
</SimpleGrid>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="자동 반응형 (minChildWidth)" />
          <Body className="mb-4">
            <Code>minChildWidth</Code> prop으로 각 아이템의 최소 너비를
            지정하면, 컨테이너 크기에 따라 자동으로 열 개수가 조정됩니다.
          </Body>
          <ComponentPreview>
            <SimpleGrid minChildWidth="200px" gap="lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} padding="lg">
                  <Body>Auto Item {i + 1}</Body>
                  <Body className="text-sm text-gray-600 mt-2">
                    최소 200px 너비
                  </Body>
                </Card>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">
            {`<SimpleGrid minChildWidth="200px" gap="lg">
  {items.map((item, i) => (
    <Card key={i}>
      <Body>{item}</Body>
    </Card>
  ))}
</SimpleGrid>`}
          </Code>
        </Subsection>
      </Section>

      <Section level="h2">
        <SectionHeading level="h2" id="guidelines" title="사용 가이드라인" />
        <Stack gap="md">
          <Card variant="outlined">
            <Body className="font-semibold mb-2">✓ 이럴 때 사용하세요</Body>
            <ul className="list-disc list-inside space-y-2">
              <li>카드 그리드를 만들 때</li>
              <li>균등한 너비의 아이템을 정렬할 때</li>
              <li>대시보드 레이아웃을 구성할 때</li>
              <li>갤러리나 제품 목록을 표시할 때</li>
              <li>반응형 그리드가 필요할 때</li>
            </ul>
          </Card>

          <Card variant="outlined">
            <Body className="font-semibold mb-2">
              ✗ 이럴 때는 다른 컴포넌트를 고려하세요
            </Body>
            <ul className="list-disc list-inside space-y-2">
              <li>아이템들이 자동 줄바꿈되어야 할 때 (Wrap 사용)</li>
              <li>수직/수평 스택 레이아웃이 필요할 때 (Stack 사용)</li>
              <li>복잡한 그리드 레이아웃이 필요할 때 (CSS Grid 직접 사용)</li>
            </ul>
          </Card>
        </Stack>
      </Section>

      {/* Gap Sizes */}
      <Section level="h2">
        <SectionHeading level="h2" id="gap-sizes" title="간격 조정" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="작은 간격 (sm - 16px)" />
          <ComponentPreview>
            <SimpleGrid columns={3} gap="sm">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                >
                  {i + 1}
                </div>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">{`<SimpleGrid columns={3} gap="sm">...</SimpleGrid>`}</Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="중간 간격 (md - 24px)" />
          <ComponentPreview>
            <SimpleGrid columns={3} gap="md">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                >
                  {i + 1}
                </div>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">{`<SimpleGrid columns={3} gap="md">...</SimpleGrid>`}</Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="큰 간격 (lg - 32px)" />
          <ComponentPreview>
            <SimpleGrid columns={3} gap="lg">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="px-4 py-6 bg-krds-primary-10 rounded text-center"
                >
                  {i + 1}
                </div>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">{`<SimpleGrid columns={3} gap="lg">...</SimpleGrid>`}</Code>
        </Subsection>
      </Section>

      {/* Column Variations */}
      <Section level="h2">
        <SectionHeading level="h2" id="columns" title="열 개수 변형" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="2열 그리드" />
          <ComponentPreview>
            <SimpleGrid columns={2} gap="md">
              <Card padding="md">
                <Body className="font-semibold">왼쪽 컨텐츠</Body>
                <Body className="text-sm mt-2">2열 그리드의 첫 번째 열</Body>
              </Card>
              <Card padding="md">
                <Body className="font-semibold">오른쪽 컨텐츠</Body>
                <Body className="text-sm mt-2">2열 그리드의 두 번째 열</Body>
              </Card>
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">{`<SimpleGrid columns={2} gap="md">...</SimpleGrid>`}</Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="4열 그리드" />
          <ComponentPreview>
            <SimpleGrid columns={4} gap="sm">
              {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((tech) => (
                <Card key={tech} padding="sm">
                  <Body className="text-center text-sm">{tech}</Body>
                </Card>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block">{`<SimpleGrid columns={4} gap="sm">...</SimpleGrid>`}</Code>
        </Subsection>
      </Section>

      {/* Examples */}
      <Section level="h2">
        <SectionHeading level="h2" id="examples" title="사용 예시" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="제품 카드 그리드" />
          <ComponentPreview>
            <SimpleGrid minChildWidth="250px" gap="lg">
              {[
                { name: '제품 A', price: '29,000원' },
                { name: '제품 B', price: '39,000원' },
                { name: '제품 C', price: '49,000원' },
                { name: '제품 D', price: '59,000원' },
              ].map((product) => (
                <Card key={product.name} padding="lg" gap="sm">
                  <div className="w-full h-32 bg-krds-gray-10 rounded mb-4" />
                  <Body className="font-semibold">{product.name}</Body>
                  <Body className="text-krds-primary-base">
                    {product.price}
                  </Body>
                  <Button variant="primary" className="w-full mt-2">
                    장바구니
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<SimpleGrid minChildWidth="250px" gap="lg">
  {products.map(product => (
    <Card key={product.id} padding="lg">
      <Image src={product.image} />
      <Body className="font-semibold">{product.name}</Body>
      <Body className="text-krds-primary-base">{product.price}</Body>
      <Button variant="primary" className="w-full">장바구니</Button>
    </Card>
  ))}
</SimpleGrid>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="대시보드 위젯" />
          <ComponentPreview>
            <SimpleGrid columns={3} gap="md">
              <Card variant="shadow" padding="lg" gap="sm">
                <Body className="text-sm text-gray-600">총 방문자</Body>
                <Body className="text-3xl font-bold">1,234</Body>
                <Body className="text-sm text-green-600">+12.5%</Body>
              </Card>
              <Card variant="shadow" padding="lg" gap="sm">
                <Body className="text-sm text-gray-600">신규 가입</Body>
                <Body className="text-3xl font-bold">89</Body>
                <Body className="text-sm text-blue-600">+8.3%</Body>
              </Card>
              <Card variant="shadow" padding="lg" gap="sm">
                <Body className="text-sm text-gray-600">매출</Body>
                <Body className="text-3xl font-bold">456만원</Body>
                <Body className="text-sm text-red-600">-3.2%</Body>
              </Card>
            </SimpleGrid>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<SimpleGrid columns={3} gap="md">
  <Card variant="shadow" padding="lg">
    <Body className="text-sm text-gray-600">총 방문자</Body>
    <Body className="text-3xl font-bold">1,234</Body>
    <Body className="text-sm text-green-600">+12.5%</Body>
  </Card>
  {/* More widgets... */}
</SimpleGrid>`}
          </Code>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section level="h2">
        <SectionHeading level="h2" id="accessibility" title="접근성" />
        <Card variant="info" gap="sm">
          <Body>
            <strong>시맨틱 마크업:</strong> SimpleGrid는 의미론적으로 중립적인{' '}
            <Code>&lt;div&gt;</Code> 요소를 사용합니다. 필요시 적절한 ARIA
            역할을 추가하세요.
          </Body>
          <Body>
            <strong>반응형 레이아웃:</strong> minChildWidth를 사용하면 다양한
            화면 크기에서 자동으로 최적화된 레이아웃을 제공합니다.
          </Body>
          <Body>
            <strong>키보드 네비게이션:</strong> 그리드 내 요소들의 Tab 순서가
            자연스럽게 유지됩니다.
          </Body>
        </Card>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="SimpleGrid Props" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-krds-gray-20">
                  <th className="text-left py-3 px-4">Prop</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Default</th>
                  <th className="text-left py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>columns</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>
                      1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
                    </Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>1</Code>
                  </td>
                  <td className="py-3 px-4">
                    그리드 열 개수 (minChildWidth가 설정되면 무시됨)
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>minChildWidth</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>string</Code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">
                    각 자식 요소의 최소 너비 (예: "200px", "15rem"). 설정 시
                    자동으로 열 개수 조정
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>gap</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>'md'</Code>
                  </td>
                  <td className="py-3 px-4">그리드 아이템 간 간격</td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>className</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>string</Code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">추가 CSS 클래스</td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>children</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>ReactNode</Code>
                  </td>
                  <td className="py-3 px-4">-</td>
                  <td className="py-3 px-4">그리드 내부에 표시할 요소들</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Gap 크기" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-krds-gray-20">
                  <th className="text-left py-3 px-4">Size</th>
                  <th className="text-left py-3 px-4">픽셀 값</th>
                  <th className="text-left py-3 px-4">Tailwind 클래스</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>none</Code>
                  </td>
                  <td className="py-3 px-4">0px</td>
                  <td className="py-3 px-4">
                    <Code>gap-0</Code>
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>xs</Code>
                  </td>
                  <td className="py-3 px-4">8px</td>
                  <td className="py-3 px-4">
                    <Code>gap-2</Code>
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>sm</Code>
                  </td>
                  <td className="py-3 px-4">16px</td>
                  <td className="py-3 px-4">
                    <Code>gap-4</Code>
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>md</Code>
                  </td>
                  <td className="py-3 px-4">24px</td>
                  <td className="py-3 px-4">
                    <Code>gap-6</Code>
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>lg</Code>
                  </td>
                  <td className="py-3 px-4">32px</td>
                  <td className="py-3 px-4">
                    <Code>gap-8</Code>
                  </td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>xl</Code>
                  </td>
                  <td className="py-3 px-4">40px</td>
                  <td className="py-3 px-4">
                    <Code>gap-10</Code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      <PageNavigation
        prev={{ title: 'Wrap', href: '/layout/wrap' }}
        next={{ title: 'Card', href: '/layout/card' }}
      />
    </>
  );
}
