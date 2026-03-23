'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  AspectRatio,
  Image,
  Code,
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
  Card,
  List,
  ListItem,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function AspectRatioPage() {
  return (
    <>
      <Heading
        level="h1"
        title="AspectRatio"
        description="비디오, 지도 등을 임베드할 때 종횡비를 유지하는 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <AspectRatio
                ratio={16 / 9}
                className="bg-krds-gray-10 rounded-lg overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&h=450&fit=crop"
                  alt="16:9 비율 이미지 예제"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<AspectRatio ratio={16 / 9}>
  <Image
    src="/image.jpg"
    alt="16:9 비율 이미지"
    className="object-cover"
  />
</AspectRatio>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="aspect-ratio" />
          </Section>

          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="AspectRatio와 Image를 import하여 사용합니다. ratio prop으로 종횡비를 설정합니다."
            />
            <Code variant="block" language="tsx">
              {`import { AspectRatio, Image } from '@/components/hanui'

<AspectRatio ratio={4 / 3}>
  <Image src="/image.jpg" alt="이미지 설명" />
</AspectRatio>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="이미지 종횡비 유지"
                description="이미지가 부모 컨테이너에 맞춰 종횡비를 유지합니다."
              />
              <ComponentPreview>
                <div className="w-[300px]">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src="https://picsum.photos/400/300"
                      alt="4:3 Image"
                      width={400}
                      height={300}
                      className="object-cover rounded-md"
                    />
                  </AspectRatio>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<AspectRatio ratio={4 / 3}>
  <Image
    src="https://picsum.photos/400/300"
    alt="4:3 Image"
    className="object-cover rounded-md"
  />
</AspectRatio>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="지도 임베드"
                description="Google Maps 등 iframe 콘텐츠를 16:9 비율로 표시합니다."
              />
              <ComponentPreview>
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.926573532729!2d126.97691431531191!3d37.56629517979796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2f332cbdd0d%3A0x6c26f7485848c2c1!2z7ISc7Jq47Iuc7LKt!5e0!3m2!1sko!2skr!4v1646811757893!5m2!1sko!2skr"
                    className="border-0 w-full h-full rounded-lg"
                    loading="lazy"
                    title="Google Map"
                  />
                </AspectRatio>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<AspectRatio ratio={16 / 9}>
  <iframe
    src="https://www.google.com/maps/embed?..."
    className="border-0 w-full h-full rounded-lg"
  />
</AspectRatio>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="반응형 비율"
                description="브레이크포인트별로 다른 종횡비를 적용할 수 있습니다."
              />
              <ComponentPreview>
                <AspectRatio
                  ratio={{ base: 1, md: 16 / 9, lg: 21 / 9 }}
                  className="bg-krds-info-5 rounded-lg flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <p className="font-bold text-krds-info-base">
                      화면 크기를 조절해 비율 변화를 확인하세요
                    </p>
                    <p className="text-sm text-krds-gray-60">
                      Base: 1:1, MD: 16:9, LG: 21:9
                    </p>
                  </div>
                </AspectRatio>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<AspectRatio
  ratio={{ base: 1, md: 16 / 9, lg: 21 / 9 }}
  className="bg-krds-info-5 rounded-lg"
>
  {/* 콘텐츠 */}
</AspectRatio>`}
              </Code>
            </Subsection>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <List variant="check" className="text-krds-gray-90">
              <ListItem>
                <strong>시맨틱 마크업:</strong> AspectRatio는 의미론적으로
                중립적인 <Code>&lt;div&gt;</Code> 래퍼를 사용합니다. 내부
                콘텐츠에 적절한 시맨틱 태그 사용 권장
              </ListItem>
              <ListItem>
                <strong>임베드 콘텐츠:</strong> iframe, video 등을 사용할 때는
                적절한 <Code>title</Code> 속성을 제공하여 스크린 리더 사용자에게
                콘텐츠를 설명
              </ListItem>
              <ListItem>
                <strong>이미지 대체 텍스트:</strong> AspectRatio 내부의 이미지는
                반드시 <Code>alt</Code> 속성을 포함해야 합니다
              </ListItem>
              <ListItem>
                <strong>반응형 비율:</strong> 반응형 비율 사용 시 모든
                브레이크포인트에서 콘텐츠가 적절히 표시되는지 확인
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
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
                    <TableCell className="font-mono">
                      <Code>ratio</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number | ResponsiveObject</Code>
                    </TableCell>
                    <TableCell>4 / 3</TableCell>
                    <TableCell>
                      종횡비 (너비 / 높이). 예: 16/9, 4/3. 반응형 객체 지원.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      내부 콘텐츠 (이미지, 비디오, iframe 등)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
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
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'AlertDialog', href: '/components/alert-dialog' }}
        next={{ title: 'Badge', href: '/components/badge' }}
      />
    </>
  );
}
