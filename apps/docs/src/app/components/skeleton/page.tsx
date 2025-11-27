'use client';

import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonTable,
  Body,
  Code,
  Heading,
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
      <Heading level="h1">Skeleton</Heading>
      <Body className="text-krds-gray-60 mb-8">
        콘텐츠가 로딩되는 동안 표시되는 플레이스홀더 컴포넌트입니다. 사용자에게
        로딩 상태를 시각적으로 전달합니다.
      </Body>

      {/* 기본 사용 */}
      <section className="space-y-4">
        <Heading level="h2">기본 사용</Heading>
        <Body className="mb-4">
          기본 Skeleton은 직사각형 모양의 플레이스홀더입니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex flex-col gap-4 min-h-[200px]">
          <Skeleton width={200} height={20} />
          <Skeleton width="100%" height={100} />
          <Skeleton width="60%" height={16} />
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Skeleton width={200} height={20} />
<Skeleton width="100%" height={100} />
<Skeleton width="60%" height={16} />`}</Code>
      </section>

      {/* 변형 */}
      <section className="space-y-4">
        <Heading level="h2">변형</Heading>
        <Body className="mb-4">
          rectangular, rounded, circular, text 네 가지 변형을 지원합니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center gap-6 min-h-[200px]">
          <div className="text-center">
            <Skeleton variant="rectangular" width={80} height={80} />
            <Body className="mt-2 text-sm">Rectangular</Body>
          </div>
          <div className="text-center">
            <Skeleton variant="rounded" width={80} height={80} />
            <Body className="mt-2 text-sm">Rounded</Body>
          </div>
          <div className="text-center">
            <Skeleton variant="circular" width={80} height={80} />
            <Body className="mt-2 text-sm">Circular</Body>
          </div>
          <div className="text-center w-32">
            <Skeleton variant="text" />
            <Body className="mt-2 text-sm">Text</Body>
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Skeleton variant="rectangular" width={80} height={80} />
<Skeleton variant="rounded" width={80} height={80} />
<Skeleton variant="circular" width={80} height={80} />
<Skeleton variant="text" />`}</Code>
      </section>

      {/* SkeletonText */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonText</Heading>
        <Body className="mb-4">
          여러 줄의 텍스트 플레이스홀더를 생성합니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg min-h-[200px]">
          <div className="max-w-md">
            <SkeletonText lines={4} lastLineWidth={60} />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<SkeletonText lines={4} lastLineWidth={60} />`}</Code>
      </section>

      {/* SkeletonAvatar */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonAvatar</Heading>
        <Body className="mb-4">아바타 형태의 플레이스홀더입니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex items-center gap-4 min-h-[200px]">
          <div className="text-center">
            <SkeletonAvatar size="sm" />
            <Body className="mt-2 text-sm">Small</Body>
          </div>
          <div className="text-center">
            <SkeletonAvatar size="md" />
            <Body className="mt-2 text-sm">Medium</Body>
          </div>
          <div className="text-center">
            <SkeletonAvatar size="lg" />
            <Body className="mt-2 text-sm">Large</Body>
          </div>
          <div className="text-center">
            <SkeletonAvatar size="xl" />
            <Body className="mt-2 text-sm">XLarge</Body>
          </div>
        </div>
        <Code variant="block" language="tsx">{`<SkeletonAvatar size="sm" />
<SkeletonAvatar size="md" />
<SkeletonAvatar size="lg" />
<SkeletonAvatar size="xl" />`}</Code>
      </section>

      {/* SkeletonCard */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonCard</Heading>
        <Body className="mb-4">카드 형태의 복합 플레이스홀더입니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <SkeletonCard />
            <SkeletonCard hasAvatar hasImage={false} lines={2} />
          </div>
        </div>
        <Code variant="block" language="tsx">{`{/* 이미지가 있는 카드 */}
<SkeletonCard />

{/* 아바타가 있는 카드 */}
<SkeletonCard hasAvatar hasImage={false} lines={2} />`}</Code>
      </section>

      {/* SkeletonTable */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonTable</Heading>
        <Body className="mb-4">테이블 형태의 플레이스홀더입니다.</Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg min-h-[300px]">
          <SkeletonTable rows={4} columns={3} />
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<SkeletonTable rows={4} columns={3} />`}</Code>
      </section>

      {/* 애니메이션 비활성화 */}
      <section className="space-y-4">
        <Heading level="h2">애니메이션 비활성화</Heading>
        <Body className="mb-4">
          disableAnimation prop으로 애니메이션을 비활성화할 수 있습니다.
        </Body>
        <div className="p-6 border border-krds-gray-20 rounded-lg flex gap-4 min-h-[200px]">
          <div className="flex-1">
            <Body className="mb-2 text-sm font-medium">애니메이션 활성화</Body>
            <Skeleton width="100%" height={40} />
          </div>
          <div className="flex-1">
            <Body className="mb-2 text-sm font-medium">
              애니메이션 비활성화
            </Body>
            <Skeleton width="100%" height={40} disableAnimation />
          </div>
        </div>
        <Code
          variant="block"
          language="tsx"
        >{`<Skeleton width="100%" height={40} />
<Skeleton width="100%" height={40} disableAnimation />`}</Code>
      </section>

      {/* Props 테이블 - Skeleton */}
      <section className="space-y-4">
        <Heading level="h2">Skeleton Props</Heading>
        <Table>
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
                <Code>variant</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;rectangular&quot; | &quot;rounded&quot; |
                  &quot;circular&quot; | &quot;text&quot;
                </Code>
              </TableCell>
              <TableCell>&quot;rectangular&quot;</TableCell>
              <TableCell>변형 스타일</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>width</Code>
              </TableCell>
              <TableCell>
                <Code>string | number</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>너비</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>height</Code>
              </TableCell>
              <TableCell>
                <Code>string | number</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>높이</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disableAnimation</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>애니메이션 비활성화</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Props 테이블 - SkeletonText */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonText Props</Heading>
        <Table>
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
                <Code>lines</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>라인 수</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>gap</Code>
              </TableCell>
              <TableCell>
                <Code>&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</Code>
              </TableCell>
              <TableCell>&quot;md&quot;</TableCell>
              <TableCell>라인 간격</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>lastLineWidth</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>70</TableCell>
              <TableCell>마지막 라인 너비 비율 (0-100)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Props 테이블 - SkeletonAvatar */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonAvatar Props</Heading>
        <Table>
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
                <Code>size</Code>
              </TableCell>
              <TableCell>
                <Code>
                  &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
                  &quot;xl&quot;
                </Code>
              </TableCell>
              <TableCell>&quot;md&quot;</TableCell>
              <TableCell>크기 (32px, 40px, 48px, 64px)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Props 테이블 - SkeletonCard */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonCard Props</Heading>
        <Table>
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
                <Code>hasImage</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>true</TableCell>
              <TableCell>이미지 포함 여부</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>imageHeight</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>200</TableCell>
              <TableCell>이미지 높이</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hasAvatar</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>아바타 포함 여부</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>lines</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>텍스트 라인 수</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Props 테이블 - SkeletonTable */}
      <section className="space-y-4">
        <Heading level="h2">SkeletonTable Props</Heading>
        <Table>
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
                <Code>rows</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>5</TableCell>
              <TableCell>행 수</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>columns</Code>
              </TableCell>
              <TableCell>
                <Code>number</Code>
              </TableCell>
              <TableCell>4</TableCell>
              <TableCell>열 수</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>hasHeader</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>true</TableCell>
              <TableCell>헤더 포함 여부</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 접근성 */}
      <section className="space-y-4">
        <Heading level="h2">접근성</Heading>
        <Body>Skeleton 컴포넌트는 WCAG 2.2 AA 기준을 준수합니다:</Body>
        <ul className="list-disc list-inside space-y-2 text-krds-gray-70">
          <li>
            <Code>aria-hidden=&quot;true&quot;</Code>가 적용되어 스크린 리더가
            무시합니다.
          </li>
          <li>
            실제 로딩 상태는 상위 컨테이너에서 <Code>aria-busy</Code>로
            전달하세요.
          </li>
          <li>
            prefers-reduced-motion 미디어 쿼리를 지원하여 모션 감소 설정을
            존중합니다.
          </li>
        </ul>
      </section>
    </>
  );
}
