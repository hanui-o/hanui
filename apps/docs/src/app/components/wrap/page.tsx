'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// Docs helper components
import { DoCard, DontCard } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Wrap,
  Button,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';

export default function WrapPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Wrap"
        description="공간이 부족할 때 자동으로 줄바꿈되는 flexbox 레이아웃 컴포넌트입니다. 태그 목록, 버튼 그룹, 카드 배열 등에 적합합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="Wrap은 요소들에 간격을 추가하고 공간이 부족할 때 자동으로 줄바꿈하는 레이아웃 컴포넌트입니다."
              className="sr-only"
            />
            <ComponentPreview>
              <Wrap gap="md">
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 1
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 2
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 3
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 4
                </div>
                <div className="px-4 py-2 bg-krds-primary-10 rounded">
                  Item 5
                </div>
              </Wrap>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`import { Wrap } from '@/components/hanui/wrap';

<Wrap gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</Wrap>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="wrap" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Wrap 컴포넌트를 import하고 gap prop으로 간격을 설정합니다."
            />
            <Code variant="block" language="tsx">
              {`import { Wrap } from '@/components/hanui/wrap';

<Wrap gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Wrap>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="간격 조절 (Gap)"
                description="gap prop으로 요소 간 간격을 조절합니다. none, xs, sm, md(기본값), lg, xl, 2xl을 제공합니다."
              />
              <ComponentPreview>
                <div className="space-y-6 w-full">
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      작은 간격 (sm - 8px)
                    </p>
                    <Wrap gap="sm">
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-krds-accent-10 rounded">
                        Item 3
                      </div>
                    </Wrap>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      큰 간격 (md - 16px)
                    </p>
                    <Wrap gap="md">
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 3
                      </div>
                    </Wrap>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      큰 간격 (lg - 24px)
                    </p>
                    <Wrap gap="lg">
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-krds-warning-10 rounded">
                        Item 3
                      </div>
                    </Wrap>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Wrap gap="sm">...</Wrap>  {/* 8px */}
<Wrap gap="md">...</Wrap>  {/* 16px - 기본값 */}
<Wrap gap="lg">...</Wrap>  {/* 24px */}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="정렬 (Align & Justify)"
                description="align으로 교차축 정렬, justify로 주축 정렬을 설정합니다."
              />
              <ComponentPreview>
                <div className="space-y-6 w-full">
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      가운데 정렬
                    </p>
                    <Wrap gap="md" justify="center" align="center">
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 1
                      </div>
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 2
                      </div>
                      <div className="px-4 py-2 bg-krds-primary-10 text-krds-primary-base rounded">
                        Center 3
                      </div>
                    </Wrap>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      균등 분배 (between)
                    </p>
                    <Wrap gap="md" justify="between">
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        Start
                      </div>
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        Middle
                      </div>
                      <div className="px-4 py-2 bg-krds-gray-10 rounded">
                        End
                      </div>
                    </Wrap>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 가운데 정렬
<Wrap gap="md" justify="center" align="center">
  <div>Center 1</div>
  <div>Center 2</div>
</Wrap>

// 균등 분배
<Wrap gap="md" justify="between">
  <div>Start</div>
  <div>End</div>
</Wrap>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="실제 사용 예시"
                description="태그 목록과 버튼 그룹에 Wrap을 적용한 예시입니다."
              />
              <ComponentPreview>
                <div className="space-y-6 w-full">
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      태그 목록
                    </p>
                    <Wrap gap="sm">
                      {['React', 'TypeScript', 'Tailwind', 'Next.js'].map(
                        (tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-krds-primary-10 text-krds-primary-base rounded-full"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </Wrap>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2 text-krds-gray-70">
                      버튼 그룹
                    </p>
                    <Wrap gap="md">
                      <Button variant="primary">저장</Button>
                      <Button variant="secondary">취소</Button>
                      <Button variant="outline">삭제</Button>
                    </Wrap>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// 태그 목록
<Wrap gap="sm">
  {tags.map(tag => (
    <span key={tag} className="px-3 py-1 text-sm rounded-full">
      {tag}
    </span>
  ))}
</Wrap>

// 버튼 그룹
<Wrap gap="md">
  <Button variant="primary">저장</Button>
  <Button variant="secondary">취소</Button>
</Wrap>`}
              </Code>
            </Subsection>
          </Section>

          {/* 6. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />

            <List>
              <ListItem>
                <strong>시맨틱 마크업:</strong> 의미론적으로 중립적인{' '}
                <Code>&lt;div&gt;</Code> 요소 사용
              </ListItem>
              <ListItem>
                <strong>반응형 레이아웃:</strong> 화면 크기에 관계없이 모든
                아이템이 접근 가능
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 내부 요소들의 Tab 순서가
                자연스럽게 유지
              </ListItem>
              <ListItem>
                <strong>내부 요소 접근성:</strong> Wrap 자체는 레이아웃만 담당,
                내부 요소의 접근성은 개별적으로 처리
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Wrap Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
                      </Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>아이템 간 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'start' | 'center' | 'end' | 'stretch' | 'baseline'
                      </Code>
                    </TableCell>
                    <TableCell>'start'</TableCell>
                    <TableCell>교차축(cross-axis) 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>justify</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'start' | 'center' | 'end' | 'between' | 'around' |
                        'evenly'
                      </Code>
                    </TableCell>
                    <TableCell>'start'</TableCell>
                    <TableCell>주축(main-axis) 정렬</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Gap 옵션" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>값</TableHead>
                    <TableHead>간격</TableHead>
                    <TableHead>Tailwind 클래스</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>none</Code>
                    </TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell>
                      <Code>gap-0</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xs</Code>
                    </TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell>
                      <Code>gap-1</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sm</Code>
                    </TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>
                      <Code>gap-2</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>md</Code>
                    </TableCell>
                    <TableCell>16px</TableCell>
                    <TableCell>
                      <Code>gap-4</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lg</Code>
                    </TableCell>
                    <TableCell>24px</TableCell>
                    <TableCell>
                      <Code>gap-6</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>xl</Code>
                    </TableCell>
                    <TableCell>32px</TableCell>
                    <TableCell>
                      <Code>gap-8</Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>2xl</Code>
                    </TableCell>
                    <TableCell>48px</TableCell>
                    <TableCell>
                      <Code>gap-12</Code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Tooltip', href: '/components/tooltip' }}
      />
    </>
  );
}
