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
  Carousel,
  Body,
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
import type { CarouselSlide } from '@hanui/react';

// 예제 슬라이드 데이터
const visualSlides: CarouselSlide[] = [
  {
    id: 1,
    title: '대한민국 정책브리핑',
    description: '국민과 함께하는 정부, 더 나은 대한민국을 만들어갑니다.',
    buttonText: '자세히 보기',
    buttonHref: '#',
  },
  {
    id: 2,
    title: '디지털 정부혁신',
    description: '스마트한 공공서비스로 국민 편의를 높입니다.',
    buttonText: '바로가기',
    buttonHref: '#',
  },
  {
    id: 3,
    title: '탄소중립 2050',
    description: '지속가능한 미래를 위한 환경 정책을 추진합니다.',
    buttonText: '알아보기',
    buttonHref: '#',
  },
];

const cardSlides: CarouselSlide[] = [
  {
    id: 1,
    subtitle: '공지사항',
    title: '2024년 상반기 정책 설명회 안내',
  },
  {
    id: 2,
    subtitle: '보도자료',
    title: '디지털 정부혁신 성과 발표',
  },
  {
    id: 3,
    subtitle: '이벤트',
    title: '국민참여 아이디어 공모전',
  },
];

export default function CarouselPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Carousel"
        description="여러 슬라이드를 순환하며 보여주는 캐러셀 컴포넌트입니다. 메인 비주얼 배너와 카드형 배너를 지원합니다."
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
              className="sr-only"
            />
            <Body className="mb-3">
              Carousel은 Swiper.js를 기반으로 구축되어 터치/스와이프, 키보드
              네비게이션, 자동 재생 등을 지원합니다. KRDS 디자인 시스템 가이드를
              따르며 접근성을 고려하여 설계되었습니다.
            </Body>
            <ComponentPreview>
              <div className="w-full">
                <Carousel variant="visual" slides={visualSlides} loop />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Carousel } from '@hanui/react';

const slides = [
  {
    id: 1,
    title: '대한민국 정책브리핑',
    description: '국민과 함께하는 정부',
    buttonText: '자세히 보기',
    buttonHref: '#',
  },
  // ...
];

<Carousel variant="visual" slides={slides} loop />`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="carousel" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Body className="mb-3">
              Carousel 컴포넌트를 import하여 사용합니다. slides 배열에 슬라이드
              데이터를 전달합니다.
            </Body>
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Carousel } from '@hanui/react';
import type { CarouselSlide } from '@hanui/react';

const slides: CarouselSlide[] = [
  {
    id: 1,
    title: '타이틀',
    description: '설명 텍스트',
    buttonText: '버튼',
    buttonHref: '/link',
  },
];

// Visual Banner
<Carousel variant="visual" slides={slides} />

// Card Carousel
<Carousel variant="card" slides={slides} sectionTitle="제목" />`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Visual Banner */}
            <Subsection level="h3">
              <Heading level="h3" title="Visual Banner" />
              <Body className="mb-3">
                메인 페이지 상단에 사용하는 큰 비주얼 배너입니다. 타이틀, 설명,
                CTA 버튼, 이미지로 구성됩니다.
              </Body>
              <ComponentPreview>
                <div className="w-full">
                  <Carousel
                    variant="visual"
                    slides={visualSlides}
                    loop
                    moreHref="#"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Carousel
  variant="visual"
  slides={visualSlides}
  loop
  moreHref="/banners"
/>`}
              </Code>
            </Subsection>

            {/* Card Carousel */}
            <Subsection level="h3">
              <Heading level="h3" title="Card Carousel" />
              <Body className="mb-3">
                카드 형태의 작은 배너입니다. 서브타이틀과 타이틀로 구성되며 섹션
                타이틀을 함께 표시할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <Carousel
                    variant="card"
                    sectionTitle="주요 소식"
                    slides={cardSlides}
                    paginationType="fraction"
                    autoPlay
                    showPlayPause
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Carousel
  variant="card"
  sectionTitle="주요 소식"
  slides={cardSlides}
  paginationType="fraction"
  autoPlay
  showPlayPause
/>`}
              </Code>
            </Subsection>

            {/* 자동 재생 */}
            <Subsection level="h3">
              <Heading level="h3" title="자동 재생" />
              <Body className="mb-3">
                autoPlay로 자동 재생을 활성화하고, showPlayPause로 재생/정지
                버튼을 표시합니다. pauseOnHover로 호버시 일시정지할 수 있습니다.
              </Body>
              <ComponentPreview>
                <div className="w-full">
                  <Carousel
                    variant="visual"
                    slides={visualSlides}
                    autoPlay
                    interval={3000}
                    showPlayPause
                    pauseOnHover
                    loop
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Carousel
  variant="visual"
  slides={slides}
  autoPlay
  interval={3000}
  showPlayPause
  pauseOnHover
  loop
/>`}
              </Code>
            </Subsection>

            {/* 페이지네이션 타입 */}
            <Subsection level="h3">
              <Heading level="h3" title="페이지네이션 타입" />
              <Body className="mb-3">
                bullets(도트)와 fraction(분수형) 두 가지 페이지네이션을
                지원합니다.
              </Body>
              <ComponentPreview>
                <div className="w-full space-y-8">
                  <div>
                    <Body className="text-sm text-krds-gray-50 mb-2">
                      Bullets (기본)
                    </Body>
                    <Carousel
                      variant="visual"
                      slides={visualSlides}
                      paginationType="bullets"
                      loop
                    />
                  </div>
                  <div>
                    <Body className="text-sm text-krds-gray-50 mb-2">
                      Fraction
                    </Body>
                    <Carousel
                      variant="visual"
                      slides={visualSlides}
                      paginationType="fraction"
                      loop
                    />
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 도트 페이지네이션 (기본)
<Carousel paginationType="bullets" />

// 분수형 페이지네이션 (1/3)
<Carousel paginationType="fraction" />`}
              </Code>
            </Subsection>

            {/* 단일 슬라이드 */}
            <Subsection level="h3">
              <Heading level="h3" title="단일 슬라이드 (Hero)" />
              <Body className="mb-3">
                슬라이드가 1개일 경우 화살표와 페이지네이션이 자동으로 숨겨져
                Hero 배너처럼 동작합니다.
              </Body>
              <ComponentPreview>
                <div className="w-full">
                  <Carousel variant="visual" slides={[visualSlides[0]]} />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`// 슬라이드 1개 = 화살표/페이지네이션 자동 숨김
<Carousel
  variant="visual"
  slides={[{ id: 1, title: '히어로 배너', description: '설명' }]}
/>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="Carousel은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Swiper A11y 모듈:</strong> 스크린 리더용 안내 메시지가
                자동으로 제공됩니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 좌/우 화살표로 슬라이드를
                이동할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>자동 재생 제어:</strong> 재생/정지 버튼으로 사용자가
                자동 재생을 제어할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>aria-label:</strong> 모든 컨트롤 버튼에 명확한 레이블이
                제공됩니다.
              </ListItem>
              <ListItem>
                <strong>포커스 관리:</strong> 키보드 사용자가 슬라이드 콘텐츠에
                접근할 수 있습니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="CarouselProps" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>slides</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">CarouselSlide[]</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>슬라이드 데이터 배열</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;visual&apos; | &apos;card&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;visual&apos;</Code>
                    </TableCell>
                    <TableCell>캐러셀 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>autoPlay</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>자동 재생 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>interval</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">5000</Code>
                    </TableCell>
                    <TableCell>자동 재생 간격 (ms)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>loop</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">true</Code>
                    </TableCell>
                    <TableCell>무한 루프</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showArrows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        boolean | &apos;auto&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;auto&apos;</Code>
                    </TableCell>
                    <TableCell>화살표 표시 (auto: 2개+ 자동)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPagination</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        boolean | &apos;auto&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;auto&apos;</Code>
                    </TableCell>
                    <TableCell>페이지네이션 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>paginationType</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        &apos;bullets&apos; | &apos;fraction&apos;
                      </Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">&apos;bullets&apos;</Code>
                    </TableCell>
                    <TableCell>페이지네이션 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPlayPause</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">false</Code>
                    </TableCell>
                    <TableCell>재생/정지 버튼 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>pauseOnHover</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">true</Code>
                    </TableCell>
                    <TableCell>호버시 일시정지</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>moreHref</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>더보기 버튼 링크</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sectionTitle</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>섹션 타이틀 (card variant)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onSlideChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (index: number) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>슬라이드 변경 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CarouselSlide" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>속성</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>필수</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Code>id</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | number</Code>
                    </TableCell>
                    <TableCell>O</TableCell>
                    <TableCell>슬라이드 고유 ID</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>title</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>O</TableCell>
                    <TableCell>타이틀</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>description</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>설명 (visual variant)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>subtitle</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>서브타이틀 (card variant)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>image</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>이미지 URL</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>imageAlt</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>이미지 alt 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>buttonText</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CTA 버튼 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>buttonHref</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>CTA 버튼 링크</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>onButtonClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>버튼 클릭 핸들러</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Card', href: '/components/card' }}
        next={{ title: 'Center', href: '/components/center' }}
      />
    </>
  );
}
