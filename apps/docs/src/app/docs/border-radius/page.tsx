'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';

// Docs helper components
import { Wrap } from '@/components/helpers';

// UI components - from @hanui/react
import {
  Code,
  Body,
  Card,
  Stack,
  Link,
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
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function BorderRadiusPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Border Radius"
        description="KRDS 기반 모서리 둥글기 시스템입니다. 표준형 스타일과 확장형 스타일을 제공하여 일관된 디자인을 만들 수 있습니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 핵심 요약 */}
          <Section>
            <Card variant="filled">
              <Body>
                <strong>핵심:</strong> KRDS 표준형 스타일은 2px~12px의 6단계
                스케일을 제공합니다. Tailwind의 <Code>rounded-*</Code> 클래스로
                쉽게 적용할 수 있습니다.
              </Body>
            </Card>

            <Body className="mt-4">
              Border Radius는 Tailwind 기본 설정을 사용하며, 별도의 CSS 변수
              정의 없이 Tailwind 클래스로 바로 사용할 수 있습니다.
            </Body>
          </Section>

          {/* What is it */}
          <Section>
            <Heading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Border Radius는 UI 요소에 적용되는 모서리 둥글기로 브랜드의 시각적 아이덴티티를 표현합니다."
            />

            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>표준형 스타일:</strong> 2px~12px의 체계적인 5단계
                  스케일을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>확장형 스타일:</strong> 기관의 아이덴티티에 맞게
                  커스터마이즈할 수 있습니다.
                </ListItem>
                <ListItem>
                  <strong>계산 공식:</strong> 컨테이너 높이 × 1/8 비율로
                  일관성을 유지합니다.
                </ListItem>
                <ListItem>
                  <strong>Tailwind 통합:</strong> KRDS 표준을 Tailwind 클래스로
                  쉽게 사용할 수 있습니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Standard Style */}
          <Section>
            <Heading
              level="h2"
              id="standard-style"
              title="표준형 스타일"
              description="Xsmall-Small-Medium-Large-Xlarge-Max 6단계로 구성된 표준 스케일입니다."
            />

            <Body className="mb-4">
              표준형 스타일은 2px~12px의 radius 값을 사용하며, 정부가 주는
              신뢰감과 안정감, 친근함을 표현하기 위한 값입니다. 과하게 둥근
              형태로 변형되는 것을 방지하기 위해 최댓값을 12px로 설정합니다.
            </Body>

            <Subsection level="h3">
              <Heading level="h3" title="표준 스케일 표" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Radius</TableHead>
                    <TableHead>Container Size</TableHead>
                    <TableHead>적용 컴포넌트</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">Xsmall</TableCell>
                    <TableCell>2px</TableCell>
                    <TableCell>8×8, 12×12, 16×16</TableCell>
                    <TableCell>
                      Element (인디케이터, 배지, 프로그레스 바)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Small</TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell>20×20, 24×24, 32×32</TableCell>
                    <TableCell>Chips, Checkbox, Radio, Switch, Tag</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Medium</TableCell>
                    <TableCell>6px</TableCell>
                    <TableCell>40×40, 48×48</TableCell>
                    <TableCell>Button, Input, Select, Textarea</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Large</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>56×56, 64×64</TableCell>
                    <TableCell>Card, Container, Image</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Xlarge</TableCell>
                    <TableCell>10px</TableCell>
                    <TableCell>72×72, 80×80</TableCell>
                    <TableCell>Large Card, Panel</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Max</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>96×96, 120×120</TableCell>
                    <TableCell>Banner, Dialog, Bottom sheet</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="시각적 예시"
                description="각 radius 레벨의 시각적 차이를 확인할 수 있습니다"
              />

              <Wrap gap="sm">
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-[2px] mb-2"></div>
                  <Code size="sm">rounded-[2px]</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Xsmall - 2px
                  </Body>
                </Card>
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-sm mb-2"></div>
                  <Code size="sm">rounded-sm</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Small - 4px
                  </Body>
                </Card>
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-md mb-2"></div>
                  <Code size="sm">rounded-md</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Medium - 6px
                  </Body>
                </Card>
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-lg mb-2"></div>
                  <Code size="sm">rounded-lg</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Large - 8px
                  </Body>
                </Card>
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-xl mb-2"></div>
                  <Code size="sm">rounded-xl</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Xlarge - 10px
                  </Body>
                </Card>
                <Card variant="outlined" className="p-4">
                  <div className="w-16 h-16 bg-krds-primary-base rounded-2xl mb-2"></div>
                  <Code size="sm">rounded-2xl</Code>
                  <Body size="xs" className="text-krds-gray-70 mt-1">
                    Max - 12px
                  </Body>
                </Card>
              </Wrap>
            </Subsection>
          </Section>

          {/* Calculation */}
          <Section>
            <Heading
              level="h2"
              id="calculation"
              title="표준형 스타일 radius 계산법"
              description="표준형 스타일의 radius는 컨테이너 높이에 비율을 적용하여 계산합니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="계산 공식" />

              <Card variant="outlined">
                <Stack gap="sm">
                  <div className="p-3 bg-krds-gray-5 rounded">
                    <Code>컨테이너 높이 × 비율 1/8 (0.125) = radius</Code>
                  </div>
                  <div className="p-3 bg-krds-gray-5 rounded">
                    <Code>radius 결과값 반올림</Code>
                  </div>
                </Stack>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="계산 시 주의 사항" />

              <Card
                variant="outlined"
                className="bg-krds-warning-5 border-krds-warning-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    계산한 radius 값을 반올림했을 때 홀수인 경우, 숫자가 더 높은
                    짝수로 변경합니다.
                  </ListItem>
                  <ListItem>
                    높이(12) × 비율(0.125) = 1.5일 때 radius는{' '}
                    <strong>2</strong>로 적용합니다.
                  </ListItem>
                  <ListItem>
                    높이(20) × 비율(0.125) = 2.5일 때 radius는{' '}
                    <strong>4</strong>로 적용합니다.
                  </ListItem>
                  <ListItem>
                    높이(120) × 비율(0.125) = 15일 때 radius는 max 값인{' '}
                    <strong>12</strong>로 적용합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="계산 예시" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>컨테이너 높이</TableHead>
                    <TableHead>계산식</TableHead>
                    <TableHead>결과</TableHead>
                    <TableHead>적용 radius</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>8px</TableCell>
                    <TableCell>8 × 0.125</TableCell>
                    <TableCell>1.0</TableCell>
                    <TableCell>2px (짝수로 조정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>20px</TableCell>
                    <TableCell>20 × 0.125</TableCell>
                    <TableCell>2.5</TableCell>
                    <TableCell>4px (짝수로 조정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>40px</TableCell>
                    <TableCell>40 × 0.125</TableCell>
                    <TableCell>5.0</TableCell>
                    <TableCell>6px (짝수로 조정)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>64px</TableCell>
                    <TableCell>64 × 0.125</TableCell>
                    <TableCell>8.0</TableCell>
                    <TableCell>8px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>80px</TableCell>
                    <TableCell>80 × 0.125</TableCell>
                    <TableCell>10.0</TableCell>
                    <TableCell>10px</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>120px</TableCell>
                    <TableCell>120 × 0.125</TableCell>
                    <TableCell>15.0</TableCell>
                    <TableCell>12px (max 값)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>

          {/* Extended Style */}
          <Section>
            <Heading
              level="h2"
              id="extended-style"
              title="확장형 스타일"
              description="각 기관의 아이덴티티에 맞게 커스터마이즈된 radius 값을 설정할 수 있습니다."
            />

            <Body className="mb-4">
              1px 이상의 radius 값을 사용할 때는 표준형 스타일의 계층 구조를
              참고하여 일관성을 유지합니다.
            </Body>

            <Subsection level="h3">
              <Heading level="h3" title="radius 비율 적용 방법" />

              <Card variant="outlined">
                <Body>
                  <strong>컨테이너 높이 × 비율 = radius 값</strong>
                </Body>

                <List className="mt-3">
                  <ListItem>
                    기준이 되는 컴포넌트를 기관에 맞는 radius 값을 테스트하여
                    비율 값을 찾습니다.
                  </ListItem>
                  <ListItem>
                    그 비율로 사용되는 컴포넌트 높이 값 기준으로 radius 값을
                    적용합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="주의 사항" />

              <Card
                variant="outlined"
                className="bg-krds-warning-5 border-krds-warning-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    디자인 시스템에서 radius 값은 짝수로 사용하는 것을
                    권장합니다.
                  </ListItem>
                  <ListItem>
                    컨테이너와 비율을 계산 후 나온 수치가 홀수이거나 소수점으로
                    나올 시 함께 사용될 컴포넌트를 고려하여 근사치에 맞게 올림
                    하여 짝수의 값을 사용합니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Expression Method */}
          <Section>
            <Heading
              level="h2"
              id="expression"
              title="표현 방법"
              description="radius 값은 px와 % 단위로 설정할 수 있습니다."
            />

            <Subsection level="h3">
              <Heading level="h3" title="px 값 사용">
                <Body className="leading-relaxed">
                  버튼이나 입력 필드 같은 요소는 크기에 맞는 일관된 둥글기
                  설정이 중요하므로 px 단위로 설정합니다.
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<button className="rounded-md">Button</button>
<input className="rounded-md" />
<div className="rounded-lg">Card</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="% 값 사용">
                <Body className="leading-relaxed">
                  프로필 사진처럼 완전한 원형이 필요한 경우 % 값을 사용하여 더
                  직관적으로 설정할 수 있습니다.
                </Body>
              </Heading>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<img className="rounded-full" />
<div className="rounded-[50%]">Circle</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="% 설정 시 주의 사항" />

              <Card
                variant="outlined"
                className="bg-krds-warning-5 border-krds-warning-20"
              >
                <List className="text-krds-gray-70">
                  <ListItem>
                    <strong>비율 변동:</strong> 컴포넌트마다 크기 비율이
                    달라지므로 radius 값 조정이 어려울 수 있습니다.
                  </ListItem>
                  <ListItem>
                    <strong>일관성 부족:</strong> % 단위로 설정하면 UI 요소마다
                    radius 값이 일정하지 않아 디자인의 일관성을 유지하기
                    어렵습니다.
                  </ListItem>
                  <ListItem>
                    <strong>작은 컴포넌트:</strong> 작은 컴포넌트에 50%를
                    적용하면 지나치게 둥글어져 의도와 다른 디자인 결과가 나올 수
                    있습니다.
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>

          {/* Usage Guide */}
          <Section>
            <Heading
              level="h2"
              id="usage"
              title="사용 방법"
              description="Border Radius를 효과적으로 사용하는 방법입니다."
            />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 사용"
                description="HANUI는 KRDS 표준형 스타일을 Tailwind 클래스로 제공합니다"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 표준형 스타일
<div className="rounded-[2px]">Xsmall - 2px</div>
<div className="rounded-sm">Small - 4px</div>
<div className="rounded-md">Medium - 6px</div>
<div className="rounded-lg">Large - 8px</div>
<div className="rounded-xl">Xlarge - 10px</div>
<div className="rounded-2xl">Max - 12px</div>

// 완전한 원형
<div className="rounded-full">Circle</div>

// 커스텀 값
<div className="rounded-[14px]">Custom 14px</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="비율에 맞게 적용"
                description="컨테이너 사이즈가 커지면 radius 값도 비율에 맞게 적용합니다"
              />

              <ComponentPreview>
                <Stack gap="md">
                  <button className="h-10 px-4 bg-krds-primary-base text-white rounded-md">
                    작은 버튼 (6px)
                  </button>
                  <button className="h-16 px-6 bg-krds-primary-base text-white rounded-lg text-lg">
                    큰 버튼 (8px)
                  </button>
                </Stack>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<button className="h-10 rounded-md">작은 버튼 (6px)</button>
<button className="h-16 rounded-lg">큰 버튼 (8px)</button>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="동일한 radius 적용"
                description="비슷한 크기의 구성 요소는 동일한 radius를 적용하면 디자인의 통일성과 조화로움을 높일 수 있습니다"
              />

              <ComponentPreview>
                <div className="flex gap-3">
                  <input
                    className="h-10 px-3 border border-krds-gray-20 rounded-md"
                    placeholder="Input"
                  />
                  <button className="h-10 px-4 bg-krds-primary-base text-white rounded-md">
                    Button
                  </button>
                </div>
              </ComponentPreview>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<input className="h-10 rounded-md" />
<button className="h-10 rounded-md">Button</button>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section>
            <Heading level="h2" id="best-practices" title="Best Practices" />

            <List>
              <ListItem>
                <strong>일관성 유지:</strong> 비슷한 크기의 컴포넌트는 동일한
                radius를 사용하세요.
              </ListItem>
              <ListItem>
                <strong>비율 준수:</strong> 컨테이너 크기에 따라 적절한 radius를
                적용하세요.
              </ListItem>
              <ListItem>
                <strong>최댓값 제한:</strong> 표준형 스타일에서는 12px를
                초과하지 않도록 하세요.
              </ListItem>
              <ListItem>
                <strong>짝수 값 사용:</strong> 디자인 시스템에서는 짝수 radius
                값을 권장합니다.
              </ListItem>
              <ListItem>
                <strong>용도에 맞는 단위:</strong> 일반 요소는 px, 원형 요소는
                %를 사용하세요.
              </ListItem>
            </List>
          </Section>

          {/* Reference */}
          <Section>
            <Heading
              level="h2"
              id="reference"
              title="참고 자료"
              description="KRDS Border Radius 관련 문서입니다."
            />

            <Stack gap="sm">
              <Link
                href="https://www.krds.go.kr/html/site/style/style_04.html"
                external
                className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
              >
                <h4 className="font-semibold mb-1">
                  KRDS 형태(Border Radius) 가이드
                </h4>
                <Body size="sm" className="text-krds-gray-70">
                  표준형 스타일, 확장형 스타일, 사용 가이드
                </Body>
              </Link>

              <Link
                href="https://www.figma.com/@krds"
                external
                className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
              >
                <h4 className="font-semibold mb-1">KRDS Figma 라이브러리</h4>
                <Body size="sm" className="text-krds-gray-70">
                  공식 디자인 토큰 및 컴포넌트
                </Body>
              </Link>

              <Link
                href="https://github.com/KRDS-uiux/krds-uiux"
                external
                className="block p-4 bg-krds-white border border-krds-gray-20 rounded-lg hover:border-krds-primary-base transition-colors"
              >
                <h4 className="font-semibold mb-1">KRDS GitHub</h4>
                <Body size="sm" className="text-krds-gray-70">
                  공식 토큰 및 컴포넌트 소스코드
                </Body>
              </Link>
            </Stack>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* API Reference */}
          <Section>
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="표준형 Tailwind Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Radius</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">rounded-[2px]</TableCell>
                    <TableCell>2px</TableCell>
                    <TableCell>Xsmall</TableCell>
                    <TableCell>Element (인디케이터, 배지)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-sm</TableCell>
                    <TableCell>4px</TableCell>
                    <TableCell>Small</TableCell>
                    <TableCell>Chips, Checkbox, Radio</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-md</TableCell>
                    <TableCell>6px</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Button, Input, Select</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-lg</TableCell>
                    <TableCell>8px</TableCell>
                    <TableCell>Large</TableCell>
                    <TableCell>Card, Container</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-xl</TableCell>
                    <TableCell>10px</TableCell>
                    <TableCell>Xlarge</TableCell>
                    <TableCell>Large Card, Panel</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-2xl</TableCell>
                    <TableCell>12px</TableCell>
                    <TableCell>Max</TableCell>
                    <TableCell>Banner, Dialog</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="특수 Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">rounded-full</TableCell>
                    <TableCell>9999px</TableCell>
                    <TableCell>완전한 원형 (프로필 사진 등)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-none</TableCell>
                    <TableCell>0px</TableCell>
                    <TableCell>모서리 둥글기 제거</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-[14px]</TableCell>
                    <TableCell>14px</TableCell>
                    <TableCell>커스텀 값 (확장형 스타일)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="방향별 Classes" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">rounded-t-*</TableCell>
                    <TableCell>상단 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-r-*</TableCell>
                    <TableCell>우측 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-b-*</TableCell>
                    <TableCell>하단 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-l-*</TableCell>
                    <TableCell>좌측 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-tl-*</TableCell>
                    <TableCell>좌측 상단 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-tr-*</TableCell>
                    <TableCell>우측 상단 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-bl-*</TableCell>
                    <TableCell>좌측 하단 모서리만 적용</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">rounded-br-*</TableCell>
                    <TableCell>우측 하단 모서리만 적용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      {/* Page Navigation */}
      <PageNavigation
        prev={{ title: 'Spacing', href: '/docs/spacing' }}
        next={{ title: 'Breakpoints', href: '/docs/breakpoints' }}
      />
    </>
  );
}
