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
  AspectRatio,
  Body,
  Card,
  List,
  ListItem,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';

export default function ImagePage() {
  return (
    <>
      <Heading
        level="h1"
        title="Image"
        description="Next.js 자동 최적화를 지원하는 반응형 이미지 컴포넌트"
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
              <Image
                src="https://picsum.photos/400/300"
                alt="Sample Image"
                width={400}
                height={300}
                priority
              />
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Image 
  src="https://picsum.photos/400/300"
  alt="Sample Image"
  width={400}
  height={300}
/>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="image" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Image } from '@/components/hanui/image'

<Image 
  src="/photo.jpg" 
  alt="Photo"
  width={800}
  height={600}
/>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="기본 사용" />
              <ComponentPreview>
                <Image
                  src="https://picsum.photos/600/400"
                  alt="Basic Image"
                  width={600}
                  height={400}
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Image 
  src="https://picsum.photos/600/400"
  alt="Basic Image"
  width={600}
  height={400}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Object Fit" />
              <ComponentPreview>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Cover</p>
                    <div className="h-40 border">
                      <Image
                        src="https://picsum.photos/400/600"
                        alt="Cover"
                        width={400}
                        height={600}
                        fit="cover"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Contain</p>
                    <div className="h-40 border">
                      <Image
                        src="https://picsum.photos/400/600"
                        alt="Contain"
                        width={400}
                        height={600}
                        fit="contain"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fill</p>
                    <div className="h-40 border">
                      <Image
                        src="https://picsum.photos/400/600"
                        alt="Fill"
                        width={400}
                        height={600}
                        fit="fill"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Image fit="cover" ... />
<Image fit="contain" ... />
<Image fit="fill" ... />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="AspectRatio와 함께 사용" />
              <ComponentPreview>
                <div className="max-w-md">
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src="https://picsum.photos/1600/900"
                      alt="16:9 Image"
                      width={1600}
                      height={900}
                      fit="cover"
                      className="w-full h-full rounded-lg"
                    />
                  </AspectRatio>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<AspectRatio ratio={16 / 9}>
  <Image 
    src="/banner.jpg"
    alt="16:9 Image"
    width={1600}
    height={900}
    fit="cover"
    className="w-full h-full rounded-lg"
  />
</AspectRatio>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Fallback 처리" />
              <ComponentPreview>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fallback Image</p>
                    <Image
                      src="https://invalid-url.com/image.jpg"
                      fallbackSrc="https://picsum.photos/300/200?grayscale"
                      alt="With Fallback"
                      width={300}
                      height={200}
                      useNextImage={false}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fallback Component</p>
                    <Image
                      src="https://invalid-url.com/image.jpg"
                      fallback={
                        <div className="w-[300px] h-[200px] bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500">
                            이미지 로드 실패
                          </span>
                        </div>
                      }
                      alt="With Fallback Component"
                      width={300}
                      height={200}
                      useNextImage={false}
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Fallback Image
<Image 
  src="/invalid.jpg"
  fallbackSrc="/placeholder.jpg"
  alt="With Fallback"
  useNextImage={false}
/>

// Fallback Component
<Image 
  src="/invalid.jpg"
  fallback={<div>이미지 로드 실패</div>}
  alt="With Fallback Component"
  useNextImage={false}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="반응형 이미지 (srcSet)" />
              <ComponentPreview>
                <Image
                  src="https://picsum.photos/800/600"
                  srcSet="https://picsum.photos/400/300 400w, https://picsum.photos/800/600 800w, https://picsum.photos/1200/900 1200w"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt="Responsive Image"
                  width={800}
                  height={600}
                  className="rounded-lg"
                />
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Image 
  src="/image-800.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w, /image-1200.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Responsive Image"
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Loading 전략" />
              <ComponentPreview>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Lazy (기본값)</p>
                    <Image
                      src="https://picsum.photos/400/300?random=1"
                      alt="Lazy Loading"
                      width={400}
                      height={300}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Eager (즉시 로드)
                    </p>
                    <Image
                      src="https://picsum.photos/400/300?random=2"
                      alt="Eager Loading"
                      width={400}
                      height={300}
                      loading="eager"
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Image loading="lazy" ... />  // 기본값
<Image loading="eager" ... /> // LCP 이미지에 사용`}
              </Code>
            </Subsection>

            <Section level="h2">
              <Heading
                level="h2"
                id="optimization-script"
                title="이미지 최적화 스크립트"
              />
              <Body className="mb-4">
                일반 React 환경이나 정적 사이트에서 반응형 이미지를 위해 여러
                크기의 이미지를 생성해야 할 때, 제공되는 스크립트를 사용하여
                이미지를 자동으로 리사이징하고 WebP 포맷으로 변환할 수 있습니다.
              </Body>

              <Subsection level="h3">
                <Heading level="h3" title="1. 사전 준비" />
                <Body className="mb-2">
                  이미지 처리를 위해 <Code>sharp</Code> 라이브러리가 필요합니다.
                </Body>
                <Code variant="block" language="bash">
                  pnpm add -D sharp
                </Code>
              </Subsection>

              <Subsection level="h3">
                <Heading level="h3" title="2. 스크립트 실행" />
                <Body className="mb-2">
                  다음 명령어로 특정 디렉토리의 이미지를 최적화할 수 있습니다.
                </Body>
                <Code variant="block" language="bash">
                  {`# 기본 실행 (public/images 폴더 처리)
pnpm optimize-images

# 입력/출력 디렉토리 지정
pnpm optimize-images ./src/assets/images ./public/optimized`}
                </Code>
                <Body className="mt-2 text-sm text-gray-600">
                  스크립트는 다음 작업을 수행합니다:
                </Body>
                <ul className="list-disc list-inside mt-1 ml-2 text-sm text-gray-600">
                  <li>이미지를 640px, 768px, 1024px, 1280px 너비로 리사이징</li>
                  <li>WebP 포맷으로 변환 (품질 80%)</li>
                  <li>원본 파일명 유지 (예: image-640.webp)</li>
                </ul>
              </Subsection>
            </Section>
          </Section>

          {/* 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 AA 기준을 준수합니다."
            />
            <Card variant="filled">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>대체 텍스트 (필수):</strong> 모든 이미지에 의미 있는{' '}
                  <Code>alt</Code> 속성을 제공해야 합니다. 장식적 이미지는{' '}
                  <Code>alt=""</Code> 사용
                </ListItem>
                <ListItem>
                  <strong>로딩 전략:</strong> LCP(Largest Contentful Paint)
                  이미지는 <Code>priority</Code> 또는{' '}
                  <Code>loading="eager"</Code> 사용하여 성능 최적화
                </ListItem>
                <ListItem>
                  <strong>반응형 이미지:</strong> <Code>srcSet</Code>과{' '}
                  <Code>sizes</Code>를 사용하여 다양한 화면 크기에 적합한 이미지
                  제공
                </ListItem>
                <ListItem>
                  <strong>에러 처리:</strong> <Code>fallbackSrc</Code>나{' '}
                  <Code>fallback</Code>으로 이미지 로드 실패 시 대체 콘텐츠 제공
                </ListItem>
                <ListItem>
                  <strong>비동기 디코딩:</strong> 일반 img 태그는 자동으로{' '}
                  <Code>decoding="async"</Code>가 적용되어 렌더링 차단 방지
                </ListItem>
              </List>
            </Card>
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
                      <Code>src</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>이미지 URL (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>alt</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>대체 텍스트 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>width</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>이미지 너비</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>height</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>이미지 높이</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>loading</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'eager' | 'lazy'</Code>
                    </TableCell>
                    <TableCell>'lazy'</TableCell>
                    <TableCell>로딩 전략</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>fit</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>object-fit 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      object-position 스타일 ('center', 'top', 'bottom' 등)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>srcSet</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      반응형 이미지 srcset (일반 React 환경)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>sizes</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>자동 설정</TableCell>
                    <TableCell>
                      반응형 sizes 속성 (srcSet 사용 시 자동 기본값 적용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>fallbackSrc</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>에러 시 대체 이미지 URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>fallback</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>에러 시 대체 UI 컴포넌트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>priority</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      Next.js: LCP 이미지에 사용 (지연 로딩 비활성화)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>quality</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>Next.js: 이미지 품질 (1-100)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>fill</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>Next.js: 부모 요소 크기에 맞춤</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>useNextImage</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>auto</TableCell>
                    <TableCell>
                      Next.js Image 사용 여부 (false로 설정 시 일반 img 태그
                      사용)
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

            <Subsection level="h3">
              <Heading level="h3" title="환경별 동작" />
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold mb-2">
                    Next.js 환경 (자동 감지)
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>자동으로 next/image 사용</li>
                    <li>여러 크기의 이미지 자동 생성</li>
                    <li>WebP/AVIF 자동 변환</li>
                    <li>sizes 기본값 자동 적용</li>
                    <li>quality 기본값: 85%</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold mb-2">일반 React 환경</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>표준 {'<img>'} 태그 사용</li>
                    <li>srcSet prop으로 반응형 지원</li>
                    <li>sizes 기본값 자동 적용 (srcSet 사용 시)</li>
                    <li>decoding="async" 자동 추가</li>
                    <li>여러 크기 이미지는 수동 제공 필요</li>
                  </ul>
                </div>
              </div>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'AspectRatio', href: '/components/aspect-ratio' }}
        next={{ title: 'Card', href: '/components/card' }}
      />
    </>
  );
}
