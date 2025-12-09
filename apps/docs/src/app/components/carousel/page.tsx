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
  PreviewCarousel,
  HeroCarousel,
  ContentCarousel,
  Code,
  List,
  ListItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@hanui/react';
import type { HeroCarouselSlide, ContentCarouselSlide } from '@hanui/react';

// HeroCarousel 예제 데이터
const heroSlides: HeroCarouselSlide[] = [
  {
    id: 1,
    title: '월요일 출근하기 싫어',
    description: '주말은 왜 이렇게 빨리 가는 걸까요. 금요일이 보고 싶습니다.',
    buttonText: '퇴근하기',
    buttonHref: '#',
    imageSrc:
      'https://pikaso.cdnpk.net/private/production/1200801274/enhanced.png?token=exp=1765497600~hmac=747bc8f36aee543932afb5998ed71574065c618ded381f00e1336a4f07bef31e',
    imageAlt: '월요일 싫어하는 캐릭터',
  },
  {
    id: 2,
    title: '회의하기 싫어',
    description: '이 회의는 메일로 대체할 수 있었습니다. 30분 돌려주세요.',
    buttonText: '회의 거절',
    buttonHref: '#',
    imageSrc:
      'https://img.freepik.com/free-photo/beautiful-pet-portrait-cat_23-2149218505.jpg?t=st=1765275515~exp=1765279115~hmac=76d534905c1624a31108178fa4cfa5fee6a86ac3778dc9f8f63d7c4afd37d0ba&w=740',
    imageAlt: '회의 싫어하는 캐릭터',
  },
  {
    id: 3,
    title: '수정사항 확인하기 싫어',
    description:
      'LGTM 누르고 싶은 마음을 참고 있습니다. 이거 누가 짠 거야... 아 내가 짰네.',
    buttonText: 'LGTM',
    buttonHref: '#',
    imageSrc:
      'https://img.freepik.com/free-photo/gray-kitty-with-monochrome-wall-her_23-2148955126.jpg?t=st=1765275557~exp=1765279157~hmac=dba078bed3be9f5d145ee97b6e50055a970ace155e6503f6b28553c2d3d50ffd&w=740',
    imageAlt: '수정사항 확인 싫어하는 캐릭터',
  },
];

// ContentCarousel 예제 데이터
const contentSlides: ContentCarouselSlide[] = [
  {
    id: 1,
    subtitle: '공지사항',
    title: '2024년 상반기 정책 설명회 안내',
    href: '#',
  },
  {
    id: 2,
    subtitle: '보도자료',
    title: '디지털 정부혁신 성과 발표',
    href: '#',
  },
  {
    id: 3,
    subtitle: '이벤트',
    title: '국민참여 아이디어 공모전',
    href: '#',
  },
];

// PreviewCarousel 예제 카드
const PreviewCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-lg border border-krds-gray-20 p-4 h-full">
    <h3 className="font-semibold text-krds-gray-90 mb-2">{title}</h3>
    <p className="text-sm text-krds-gray-60">{description}</p>
  </div>
);

export default function CarouselPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Carousel"
        description="여러 슬라이드를 순환하며 보여주는 캐러셀 컴포넌트입니다. Swiper.js 기반으로 터치/스와이프, 키보드 네비게이션, 접근성을 지원합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="용도에 따라 3가지 타입을 제공합니다."
              className="sr-only"
            />
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead>컴포넌트</TableHead>
                  <TableHead>용도</TableHead>
                  <TableHead>설치</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>HeroCarousel</strong>
                  </TableCell>
                  <TableCell>메인 비주얼 배너 (텍스트 + 이미지)</TableCell>
                  <TableCell>
                    <Code variant="inline">npx hanui add carousel-hero</Code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>ContentCarousel</strong>
                  </TableCell>
                  <TableCell>섹션 배너, 공지 슬라이더</TableCell>
                  <TableCell>
                    <Code variant="inline">npx hanui add carousel-content</Code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>PreviewCarousel</strong>
                  </TableCell>
                  <TableCell>카드 목록, 부분 슬라이드 노출</TableCell>
                  <TableCell>
                    <Code variant="inline">npx hanui add carousel-preview</Code>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="carousel-hero" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="용도에 맞는 Carousel 컴포넌트를 import하여 사용합니다."
            />
            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { HeroCarousel, ContentCarousel, PreviewCarousel } from '@hanui/react';

// 메인 비주얼 배너
<HeroCarousel slides={heroSlides} autoPlay showPlayPause loop />

// 섹션 배너
<ContentCarousel slides={contentSlides} sectionTitle="주요 소식" />

// 카드 캐러셀
<PreviewCarousel slidesPerView={{ mobile: 1.2, tablet: 2.2, desktop: 3.2 }}>
  <Card>카드 1</Card>
  <Card>카드 2</Card>
</PreviewCarousel>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* HeroCarousel */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="HeroCarousel"
                description="메인 페이지 상단에 사용하는 히어로 배너입니다. 텍스트는 왼쪽, 이미지는 오른쪽에 배치됩니다."
              />
              <div className="w-full">
                <HeroCarousel slides={heroSlides} autoPlay showPlayPause loop />
              </div>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const slides: HeroCarouselSlide[] = [
  {
    id: 1,
    title: '대한민국 정책브리핑',
    description: '국민과 함께하는 정부',
    buttonText: '자세히 보기',
    buttonHref: '/about',
    imageSrc: '/hero-image.png',
    imageAlt: '대한민국 정책브리핑',
  },
];

<HeroCarousel slides={slides} autoPlay showPlayPause loop />`}
              </Code>
            </Subsection>

            {/* ContentCarousel */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="ContentCarousel"
                description="카드형 섹션 배너입니다. 섹션 타이틀, 분수형 페이지네이션, 더보기 버튼을 지원합니다."
              />
              <ComponentPreview>
                <div className="w-full max-w-md">
                  <ContentCarousel
                    sectionTitle="주요 소식"
                    slides={contentSlides}
                    paginationType="fraction"
                    autoPlay
                    showPlayPause
                    moreHref="#"
                  />
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`const slides: ContentCarouselSlide[] = [
  {
    id: 1,
    subtitle: '공지사항',
    title: '2024년 상반기 정책 설명회 안내',
    href: '/notice/1',
  },
];

<ContentCarousel
  sectionTitle="주요 소식"
  slides={slides}
  paginationType="fraction"
  autoPlay
  showPlayPause
  moreHref="/notices"
/>`}
              </Code>
            </Subsection>

            {/* PreviewCarousel */}
            <Subsection level="h3">
              <Heading
                level="h3"
                title="PreviewCarousel"
                description="부분적으로 다음 슬라이드가 보이는 캐러셀입니다. children 기반으로 자유로운 콘텐츠를 사용할 수 있습니다."
              />
              <ComponentPreview>
                <div className="w-full">
                  <PreviewCarousel
                    slidesPerView={{ mobile: 1.2, tablet: 2.2, desktop: 3.2 }}
                    spaceBetween={16}
                    showArrows
                    showPagination
                  >
                    <PreviewCard
                      title="정책 안내 1"
                      description="국민을 위한 정책 설명입니다."
                    />
                    <PreviewCard
                      title="정책 안내 2"
                      description="디지털 혁신 관련 내용입니다."
                    />
                    <PreviewCard
                      title="정책 안내 3"
                      description="환경 정책 안내입니다."
                    />
                    <PreviewCard
                      title="정책 안내 4"
                      description="복지 정책 안내입니다."
                    />
                    <PreviewCard
                      title="정책 안내 5"
                      description="경제 정책 안내입니다."
                    />
                  </PreviewCarousel>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<PreviewCarousel
  slidesPerView={{ mobile: 1.2, tablet: 2.2, desktop: 3.2 }}
  spaceBetween={16}
  showArrows
  showPagination
>
  <Card>카드 1</Card>
  <Card>카드 2</Card>
  <Card>카드 3</Card>
</PreviewCarousel>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="모든 Carousel은 WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>Swiper A11y 모듈:</strong> 스크린 리더용 안내 메시지
                자동 제공
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 좌/우 화살표로 슬라이드 이동
              </ListItem>
              <ListItem>
                <strong>자동 재생 제어:</strong> 재생/정지 버튼으로 사용자 제어
                가능
              </ListItem>
              <ListItem>
                <strong>aria-label:</strong> 모든 컨트롤 버튼에 명확한 레이블
                제공
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="HeroCarouselProps" />
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
                      <Code>slides</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">HeroCarouselSlide[]</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>슬라이드 데이터</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>autoPlay</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>자동 재생</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>interval</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>5000</TableCell>
                    <TableCell>자동 재생 간격 (ms)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>loop</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>무한 루프</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showArrows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>화살표 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPagination</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>true</TableCell>
                    <TableCell>페이지네이션 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPlayPause</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>재생/정지 버튼</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="ContentCarouselProps" />
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
                      <Code>slides</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ContentCarouselSlide[]</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>슬라이드 데이터</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>sectionTitle</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>섹션 타이틀</TableCell>
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
                    <TableCell>&apos;fraction&apos;</TableCell>
                    <TableCell>페이지네이션 타입</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>autoPlay</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>자동 재생</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPlayPause</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>재생/정지 버튼</TableCell>
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
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="PreviewCarouselProps" />
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
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">ReactNode</Code>
                    </TableCell>
                    <TableCell>필수</TableCell>
                    <TableCell>슬라이드 아이템들</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>slidesPerView</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        number | &#123; mobile, tablet, desktop &#125;
                      </Code>
                    </TableCell>
                    <TableCell>
                      &#123; mobile: 1.2, tablet: 2.2, desktop: 3.2 &#125;
                    </TableCell>
                    <TableCell>표시할 슬라이드 수</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>spaceBetween</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>16</TableCell>
                    <TableCell>슬라이드 간격 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>loop</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>무한 루프</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showArrows</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>화살표 표시</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Code>showPagination</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>페이지네이션 표시</TableCell>
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
