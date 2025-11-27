'use client';

import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
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

export default function SkeletonPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Skeleton"
        description="콘텐츠가 로딩되는 동안 표시되는 플레이스홀더 컴포넌트입니다. 사용자에게 로딩 상태를 시각적으로 전달합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex flex-col gap-4 max-w-md">
                <Skeleton width={200} height={20} />
                <Skeleton width="100%" height={100} />
                <Skeleton width="60%" height={16} />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Skeleton width={200} height={20} />
<Skeleton width="100%" height={100} />
<Skeleton width="60%" height={16} />`}
            </Code>
          </Section>

          {/* 설치 */}
          <Installation componentName="skeleton" />

          {/* 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="Skeleton 컴포넌트를 import하여 사용합니다. width, height로 크기를 지정하고 variant로 형태를 선택합니다."
            />
            <Code variant="block" language="tsx">
              {`import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable
} from '@hanui/react';

// 기본 스켈레톤
<Skeleton width={200} height={40} />

// 텍스트 스켈레톤
<SkeletonText lines={3} />

// 아바타 스켈레톤
<SkeletonAvatar size="md" />

// 카드 스켈레톤
<SkeletonCard hasImage hasAvatar />

// 테이블 스켈레톤
<SkeletonTable rows={5} columns={4} />`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* 변형 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="Variant"
                description="rectangular, rounded, circular, text 네 가지 변형을 지원합니다."
              />
              <ComponentPreview>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Skeleton variant="rectangular" width={80} height={80} />
                    <p className="mt-2 text-sm text-krds-gray-70">
                      Rectangular
                    </p>
                  </div>
                  <div className="text-center">
                    <Skeleton variant="rounded" width={80} height={80} />
                    <p className="mt-2 text-sm text-krds-gray-70">Rounded</p>
                  </div>
                  <div className="text-center">
                    <Skeleton variant="circular" width={80} height={80} />
                    <p className="mt-2 text-sm text-krds-gray-70">Circular</p>
                  </div>
                  <div className="text-center w-32">
                    <Skeleton variant="text" />
                    <p className="mt-2 text-sm text-krds-gray-70">Text</p>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Skeleton variant="rectangular" width={80} height={80} />
<Skeleton variant="rounded" width={80} height={80} />
<Skeleton variant="circular" width={80} height={80} />
<Skeleton variant="text" />`}
              </Code>
            </Subsection>

            {/* SkeletonText */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="SkeletonText"
                description="여러 줄의 텍스트 플레이스홀더를 생성합니다. lines로 줄 수를, lastLineWidth로 마지막 줄 너비를 조절합니다."
              />
              <ComponentPreview>
                <div className="max-w-md">
                  <SkeletonText lines={4} lastLineWidth={60} />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SkeletonText lines={4} lastLineWidth={60} />`}
              </Code>
            </Subsection>

            {/* SkeletonAvatar */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="SkeletonAvatar"
                description="아바타 형태의 원형 플레이스홀더입니다. sm, md, lg, xl 네 가지 크기를 지원합니다."
              />
              <ComponentPreview>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <SkeletonAvatar size="sm" />
                    <p className="mt-2 text-sm text-krds-gray-70">32px</p>
                  </div>
                  <div className="text-center">
                    <SkeletonAvatar size="md" />
                    <p className="mt-2 text-sm text-krds-gray-70">40px</p>
                  </div>
                  <div className="text-center">
                    <SkeletonAvatar size="lg" />
                    <p className="mt-2 text-sm text-krds-gray-70">48px</p>
                  </div>
                  <div className="text-center">
                    <SkeletonAvatar size="xl" />
                    <p className="mt-2 text-sm text-krds-gray-70">64px</p>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SkeletonAvatar size="sm" />  {/* 32px */}
<SkeletonAvatar size="md" />  {/* 40px */}
<SkeletonAvatar size="lg" />  {/* 48px */}
<SkeletonAvatar size="xl" />  {/* 64px */}`}
              </Code>
            </Subsection>

            {/* SkeletonCard */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="SkeletonCard"
                description="카드 형태의 복합 플레이스홀더입니다. 이미지, 아바타, 텍스트를 조합하여 사용합니다."
              />
              <ComponentPreview>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                  <SkeletonCard />
                  <SkeletonCard hasAvatar hasImage={false} lines={2} />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`{/* 이미지가 있는 카드 */}
<SkeletonCard />

{/* 아바타가 있는 카드 (이미지 없음) */}
<SkeletonCard hasAvatar hasImage={false} lines={2} />`}
              </Code>
            </Subsection>

            {/* SkeletonTable */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="SkeletonTable"
                description="테이블 형태의 플레이스홀더입니다. rows와 columns로 행/열 수를 지정할 수 있습니다."
              />
              <ComponentPreview>
                <SkeletonTable rows={4} columns={3} />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<SkeletonTable rows={4} columns={3} />`}
              </Code>
            </Subsection>

            {/* 애니메이션 비활성화 */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="애니메이션 비활성화"
                description="disableAnimation prop으로 펄스 애니메이션을 비활성화할 수 있습니다."
              />
              <ComponentPreview>
                <div className="flex gap-8">
                  <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-krds-gray-90">
                      애니메이션 활성화
                    </p>
                    <Skeleton width="100%" height={40} />
                  </div>
                  <div className="flex-1">
                    <p className="mb-2 text-sm font-medium text-krds-gray-90">
                      애니메이션 비활성화
                    </p>
                    <Skeleton width="100%" height={40} disableAnimation />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Skeleton width="100%" height={40} />
<Skeleton width="100%" height={40} disableAnimation />`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Skeleton은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>aria-hidden:</strong> 모든 Skeleton 컴포넌트에
                aria-hidden=&quot;true&quot;가 적용되어 스크린 리더가
                무시합니다.
              </ListItem>
              <ListItem>
                <strong>aria-busy:</strong> 실제 로딩 상태는 상위 컨테이너에서
                aria-busy=&quot;true&quot;로 전달하세요.
              </ListItem>
              <ListItem>
                <strong>prefers-reduced-motion:</strong> 시스템의 모션 감소
                설정을 존중합니다. Tailwind의 animate-pulse는 자동으로
                지원합니다.
              </ListItem>
              <ListItem>
                로딩이 완료되면 실제 콘텐츠로 교체하고 aria-busy를 제거하세요.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            {/* Skeleton Props */}
            <Subsection level="h3">
              <Heading level="h3" title="Skeleton Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;rectangular&apos; | &apos;rounded&apos; |
                        &apos;circular&apos; | &apos;text&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;rectangular&apos;</Code>
                    </TableCell>
                    <TableCell>변형 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>width</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>너비 (px 또는 CSS 단위)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>height</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>높이 (px 또는 CSS 단위)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>disableAnimation</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>애니메이션 비활성화</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* SkeletonText Props */}
            <Subsection level="h3">
              <Heading level="h3" title="SkeletonText Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>lines</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">3</Code>
                    </TableCell>
                    <TableCell>라인 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>gap</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;md&apos;</Code>
                    </TableCell>
                    <TableCell>라인 간격</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lastLineWidth</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">70</Code>
                    </TableCell>
                    <TableCell>마지막 라인 너비 비율 (0-100%)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* SkeletonAvatar Props */}
            <Subsection level="h3">
              <Heading level="h3" title="SkeletonAvatar Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; |
                        &apos;xl&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;md&apos;</Code>
                    </TableCell>
                    <TableCell>크기 (32px, 40px, 48px, 64px)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* SkeletonCard Props */}
            <Subsection level="h3">
              <Heading level="h3" title="SkeletonCard Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>hasImage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">true</Code>
                    </TableCell>
                    <TableCell>이미지 영역 포함 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>imageHeight</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">200</Code>
                    </TableCell>
                    <TableCell>이미지 영역 높이 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasAvatar</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>아바타 포함 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>lines</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">3</Code>
                    </TableCell>
                    <TableCell>텍스트 라인 수</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* SkeletonTable Props */}
            <Subsection level="h3">
              <Heading level="h3" title="SkeletonTable Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>rows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">5</Code>
                    </TableCell>
                    <TableCell>행 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>columns</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">4</Code>
                    </TableCell>
                    <TableCell>열 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>hasHeader</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">true</Code>
                    </TableCell>
                    <TableCell>헤더 행 포함 여부</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Side Navigation', href: '/components/side-navigation' }}
        next={{ title: 'Slider', href: '/components/slider' }}
      />
    </>
  );
}
