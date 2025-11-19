'use client';

import {
  Section,
  SectionHeading,
  Subsection,
  Body,
  Stack,
  Wrap,
  WrapItem,
  Button,
  Card,
  Code,
  PageNavigation,
} from '@/components/hanui';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function WrapPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Wrap"
        description="공간이 부족할 때 자동으로 줄바꿈되는 flexbox 레이아웃 컴포넌트입니다."
      />

      <Section level="h2">
        <SectionHeading level="h2" id="overview" title="개요">
          <Body className="leading-relaxed">
            Wrap 컴포넌트는 요소들 사이에 간격을 추가하고, 공간이 부족할 때
            자동으로 줄바꿈하는 레이아웃 유틸리티입니다. 태그 목록, 버튼 그룹,
            카드 그리드 등 반응형 레이아웃에 이상적입니다.
          </Body>
        </SectionHeading>

        <ComponentPreview>
          <Wrap gap="md">
            <WrapItem>
              <Button>Item 1</Button>
            </WrapItem>
            <WrapItem>
              <Button>Item 2</Button>
            </WrapItem>
            <WrapItem>
              <Button>Item 3</Button>
            </WrapItem>
            <WrapItem>
              <Button>Item 4</Button>
            </WrapItem>
            <WrapItem>
              <Button>Item 5</Button>
            </WrapItem>
          </Wrap>
        </ComponentPreview>
      </Section>

      <Section level="h2">
        <SectionHeading
          level="h2"
          id="installation"
          title="설치"
          description="CLI 명령어로 Wrap 컴포넌트를 프로젝트에 추가합니다."
        />
        <Code variant="block">{`npx hanui add wrap`}</Code>
      </Section>

      <Section level="h2">
        <SectionHeading level="h2" id="usage" title="사용법" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="기본 사용" />
          <ComponentPreview>
            <Wrap gap="md">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 1</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 2</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 3</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 4</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 5</div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block">
            {`<Wrap gap="md">
  <WrapItem>
    <div>Item 1</div>
  </WrapItem>
  <WrapItem>
    <div>Item 2</div>
  </WrapItem>
  <WrapItem>
    <div>Item 3</div>
  </WrapItem>
</Wrap>`}
          </Code>
        </Subsection>
      </Section>

      <Section level="h2">
        <SectionHeading level="h2" id="guidelines" title="사용 가이드라인" />
        <Stack gap="md">
          <Card variant="outlined">
            <Body className="font-semibold mb-2">✓ 이럴 때 사용하세요</Body>
            <ul className="list-disc list-inside space-y-2">
              <li>태그나 배지 목록을 표시할 때</li>
              <li>버튼 그룹을 반응형으로 배치할 때</li>
              <li>
                카드나 아이템을 그리드처럼 배치하되 자동 줄바꿈이 필요할 때
              </li>
              <li>화면 크기에 따라 유연하게 배치되어야 하는 요소들</li>
            </ul>
          </Card>

          <Card variant="outlined">
            <Body className="font-semibold mb-2">
              ✗ 이럴 때는 다른 컴포넌트를 고려하세요
            </Body>
            <ul className="list-disc list-inside space-y-2">
              <li>고정된 그리드 레이아웃이 필요할 때 (CSS Grid 사용)</li>
              <li>항상 한 줄로 표시되어야 할 때 (Stack 사용)</li>
              <li>복잡한 레이아웃 구조가 필요할 때 (Container + Stack 조합)</li>
            </ul>
          </Card>
        </Stack>
      </Section>

      {/* Spacing */}
      <Section level="h2">
        <SectionHeading level="h2" id="spacing" title="간격 조정" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="간격 없음 (none)" />
          <ComponentPreview>
            <Wrap gap="none">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10">Item 1</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10">Item 2</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10">Item 3</div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block">{`<Wrap gap="none">...</Wrap>`}</Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="작은 간격 (sm)" />
          <ComponentPreview>
            <Wrap gap="sm">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 1</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 2</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 3</div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block">{`<Wrap gap="sm">...</Wrap>`}</Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="큰 간격 (lg)" />
          <ComponentPreview>
            <Wrap gap="lg">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 1</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 2</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Item 3</div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block">{`<Wrap gap="lg">...</Wrap>`}</Code>
        </Subsection>
      </Section>

      {/* Alignment */}
      <Section level="h2">
        <SectionHeading level="h2" id="alignment" title="정렬" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="가운데 정렬" />
          <ComponentPreview>
            <Wrap gap="md" justify="center" align="center">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-primary-base text-white rounded">
                  Center 1
                </div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-primary-base text-white rounded">
                  Center 2
                </div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-primary-base text-white rounded">
                  Center 3
                </div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<Wrap gap="md" justify="center" align="center">
  <WrapItem>Center 1</WrapItem>
  <WrapItem>Center 2</WrapItem>
  <WrapItem>Center 3</WrapItem>
</Wrap>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="균등 분배 (space-between)" />
          <ComponentPreview>
            <Wrap gap="md" justify="between">
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Start</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">Middle</div>
              </WrapItem>
              <WrapItem>
                <div className="px-4 py-2 bg-krds-gray-10 rounded">End</div>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<Wrap gap="md" justify="between">...</Wrap>`}
          </Code>
        </Subsection>
      </Section>

      {/* Examples */}
      <Section level="h2">
        <SectionHeading level="h2" id="examples" title="사용 예시" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="태그 목록" />
          <ComponentPreview>
            <Wrap gap="sm">
              {[
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Next.js',
                'Radix UI',
              ].map((tag) => (
                <WrapItem key={tag}>
                  <span className="px-3 py-1 text-sm bg-krds-primary-10 text-krds-primary-base rounded-full">
                    {tag}
                  </span>
                </WrapItem>
              ))}
            </Wrap>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<Wrap gap="sm">
  {tags.map(tag => (
    <WrapItem key={tag}>
      <span className="px-3 py-1 text-sm bg-krds-primary-10 text-krds-primary-base rounded-full">
        {tag}
      </span>
    </WrapItem>
  ))}
</Wrap>`}
          </Code>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="버튼 그룹" />
          <ComponentPreview>
            <Wrap gap="md">
              <WrapItem>
                <Button variant="primary">저장</Button>
              </WrapItem>
              <WrapItem>
                <Button variant="secondary">취소</Button>
              </WrapItem>
              <WrapItem>
                <Button variant="outlined">삭제</Button>
              </WrapItem>
              <WrapItem>
                <Button variant="ghost">더보기</Button>
              </WrapItem>
            </Wrap>
          </ComponentPreview>
          <Code variant="block" language="tsx">
            {`<Wrap gap="md">
  <WrapItem><Button variant="primary">저장</Button></WrapItem>
  <WrapItem><Button variant="secondary">취소</Button></WrapItem>
  <WrapItem><Button variant="outlined">삭제</Button></WrapItem>
  <WrapItem><Button variant="ghost">더보기</Button></WrapItem>
</Wrap>`}
          </Code>
        </Subsection>
      </Section>

      {/* Accessibility */}
      <Section level="h2">
        <SectionHeading level="h2" id="accessibility" title="접근성" />
        <Card variant="info">
          <Stack gap="sm">
            <Body>
              <strong>시맨틱 마크업:</strong> Wrap은 의미론적으로 중립적인{' '}
              <Code>&lt;div&gt;</Code> 요소를 사용합니다.
            </Body>
            <Body>
              <strong>반응형 레이아웃:</strong> 화면 크기에 관계없이 모든
              아이템이 접근 가능하도록 자동으로 줄바꿈됩니다.
            </Body>
            <Body>
              <strong>키보드 네비게이션:</strong> 내부 요소들의 Tab 순서가
              자연스럽게 유지됩니다.
            </Body>
          </Stack>
        </Card>
      </Section>

      {/* API Reference */}
      <Section level="h2">
        <SectionHeading level="h2" id="api" title="API" />

        <Subsection level="h3">
          <SectionHeading level="h3" title="Wrap Props" />
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
                    <Code>gap</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>
                      'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
                    </Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>'md'</Code>
                  </td>
                  <td className="py-3 px-4">아이템 간 간격</td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>align</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>
                      'start' | 'center' | 'end' | 'stretch' | 'baseline'
                    </Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>'start'</Code>
                  </td>
                  <td className="py-3 px-4">교차축 정렬</td>
                </tr>
                <tr className="border-b border-krds-gray-10">
                  <td className="py-3 px-4">
                    <Code>justify</Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>
                      'start' | 'center' | 'end' | 'between' | 'around' |
                      'evenly'
                    </Code>
                  </td>
                  <td className="py-3 px-4">
                    <Code>'start'</Code>
                  </td>
                  <td className="py-3 px-4">주축 정렬</td>
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
              </tbody>
            </table>
          </div>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="WrapItem Props" />
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
                  <td className="py-3 px-4">자식 요소</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Subsection>
      </Section>

      <PageNavigation
        prev={{ title: 'Stack', href: '/layout/stack' }}
        next={{ title: 'Card', href: '/layout/card' }}
      />
    </>
  );
}
