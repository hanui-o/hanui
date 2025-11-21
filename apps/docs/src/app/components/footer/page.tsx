'use client';

import {
  Section,
  Subsection,
  SectionHeading,
  Body,
  Card,
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
  PageNavigation,
} from '@/components/hanui';

export default function FooterPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        id="footer"
        title="Footer"
        description="정부 서비스의 하단에 위치하여 조직 정보, 연락처, 관련 링크를 제공하는 푸터 컴포넌트입니다. KRDS 표준을 준수하며, Identifier와 함께 사용됩니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading level="h2" id="installation" title="설치" />
            <Body>
              CLI를 사용하여 컴포넌트를 프로젝트에 설치할 수 있습니다.
            </Body>
            <Card>
              <Code language="bash">npx @hanui/cli add footer</Code>
            </Card>
            <Body size="sm" className="text-krds-gray-60 mt-2">
              설치 시 자동으로 sass 패키지가 devDependencies에 추가되며,
              Identifier 컴포넌트도 함께 설치됩니다.
            </Body>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading level="h2" id="what-is-it" title="Footer란?" />
            <Body>
              Footer는 정부 디지털 서비스의 최하단에 위치하여 조직의 기본 정보,
              연락처, 관련 사이트 링크, 법적 링크 등을 제공하는 컴포넌트입니다.
            </Body>
            <Body>
              KRDS 표준에 따라 일관된 레이아웃을 제공하며, 모든 정부 서비스에서
              필수적으로 사용되어야 합니다. 공식 상징 마크(Identifier)를
              포함하여 신뢰성을 보장합니다.
            </Body>

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>필수 ID:</strong> #krds-footer (KRDS 표준 필수)
                </ListItem>
                <ListItem>
                  <strong>KRDS 레이아웃:</strong> 관련 사이트 + 로고 + 정보 +
                  링크 + 하단
                </ListItem>
                <ListItem>
                  <strong>WCAG 2.1 / KWCAG 2.2:</strong> 완전한 접근성 준수
                </ListItem>
                <ListItem>
                  <strong>반응형:</strong> Desktop / Tablet / Mobile 자동 대응
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />
            <Body className="mb-4">
              Footer는 조직 정보와 다양한 링크를 포함하는 풍부한 컴포넌트입니다.
            </Body>
            <Card>
              <Code language="tsx" showLineNumbers>
                {`import { Footer } from '@hanui/react';

<Footer
  organizationName="국민건강보험공단"
  logo="/logo.svg"
  logoAlt="국민건강보험공단"
  address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
  contactInfo={[
    { label: '대표전화', value: '1577-1000' },
    { label: '팩스', value: '033-811-2000' }
  ]}
  quickLinks={[
    { label: '건강iN', href: 'https://hi.nhis.or.kr' },
    { label: '사회보험통합징수포털', href: 'https://si4n.nhis.or.kr' }
  ]}
  utilityLinks={[
    { label: '오시는 길', href: '/directions' },
    { label: '이용안내', href: '/guide' }
  ]}
  socialLinks={[
    { platform: 'youtube', href: 'https://youtube.com/@nhis' },
    { platform: 'instagram', href: 'https://instagram.com/nhis' }
  ]}
  menuLinks={[
    { label: '개인정보처리방침', href: '/privacy' },
    { label: '이용약관', href: '/terms' }
  ]}
  copyright="Copyright © 2024 National Health Insurance Service. All rights reserved."
/>`}
              </Code>
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용 방법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용" />
              <Body className="mb-4">
                최소한의 정보만 제공하는 간단한 Footer:
              </Body>
              <Card>
                <Code language="tsx">
                  {`<Footer
  organizationName="행정안전부"
  address="(30128) 세종특별자치시 도움6로 42"
  contactInfo={[
    { label: '대표전화', value: '02-2100-3399' }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="관련 사이트 추가" />
              <Body className="mb-4">
                quickLinks로 관련 사이트 드롭다운을 추가할 수 있습니다:
              </Body>
              <Card>
                <Code language="tsx">
                  {`<Footer
  organizationName="행정안전부"
  address="(30128) 세종특별자치시 도움6로 42"
  quickLinks={[
    { label: '정부24', href: 'https://www.gov.kr' },
    { label: '국민신문고', href: 'https://www.epeople.go.kr' },
    { label: '정책브리핑', href: 'https://www.korea.kr' }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="소셜 미디어 링크" />
              <Body className="mb-4">
                지원되는 플랫폼: instagram, youtube, x, facebook, blog
              </Body>
              <Card>
                <Code language="tsx">
                  {`<Footer
  organizationName="문화체육관광부"
  address="(30119) 세종특별자치시 갈매로 388"
  socialLinks={[
    { platform: 'youtube', href: 'https://youtube.com/@mcst' },
    { platform: 'instagram', href: 'https://instagram.com/mcst' },
    { platform: 'facebook', href: 'https://facebook.com/mcst' },
    { platform: 'blog', href: 'https://blog.naver.com/mcst' }
  ]}
/>`}
                </Code>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Identifier 비활성화" />
              <Body className="mb-4">
                특별한 경우 Identifier를 비활성화할 수 있습니다 (권장하지 않음):
              </Body>
              <Card>
                <Code language="tsx">
                  {`<Footer
  organizationName="정부기관명"
  address="주소"
  showIdentifier={false}
/>`}
                </Code>
              </Card>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading level="h2" id="best-practices" title="모범 사례" />

            <List variant="disc">
              <ListItem>
                <strong>일관된 위치:</strong> 모든 페이지 최하단에 고정
                배치합니다
              </ListItem>
              <ListItem>
                <strong>완전한 정보:</strong> 조직명, 주소, 연락처는 필수로
                제공합니다
              </ListItem>
              <ListItem>
                <strong>법적 링크:</strong> 개인정보처리방침, 이용약관 등 필수
                법적 링크를 포함합니다
              </ListItem>
              <ListItem>
                <strong>Identifier 필수:</strong> 정부 서비스임을 명확히 하기
                위해 Identifier를 항상 표시합니다
              </ListItem>
              <ListItem>
                <strong>외부 링크:</strong> 외부 사이트 링크는 새 창에서
                열리도록 설정되어 있습니다 (자동 처리)
              </ListItem>
            </List>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />
            <Body>
              Footer는 WCAG 2.1 Level AA 및 KWCAG 2.2를 완전히 준수합니다:
            </Body>

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Landmark:</strong> &lt;footer&gt; 요소 사용으로 스크린
                  리더가 푸터 영역을 명확히 인식
                </ListItem>
                <ListItem>
                  <strong>필수 ID:</strong> #krds-footer ID로 직접 접근 가능
                </ListItem>
                <ListItem>
                  <strong>ARIA 속성:</strong> 관련 사이트 버튼에 aria-expanded
                  자동 관리
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> 모든 링크와 버튼이 Tab
                  키로 접근 가능
                </ListItem>
                <ListItem>
                  <strong>명도 대비:</strong> 모든 텍스트가 WCAG AA 기준 4.5:1
                  이상
                </ListItem>
                <ListItem>
                  <strong>외부 링크:</strong> rel="noopener noreferrer" 자동
                  설정으로 보안 강화
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Foundation Layer */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="foundation-layer"
              title="Foundation Layer"
            />
            <Body>
              Footer 컴포넌트가 자동으로 처리하는 기능들 - 개발자가 신경 쓸
              필요가 없습니다:
            </Body>

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 필수 ID:</strong> #krds-footer 자동 설정
                </ListItem>
                <ListItem>
                  <strong>레이아웃 구조:</strong> KRDS 표준 레이아웃 자동 적용
                  (Quick Links → Logo → Info → Links → Bottom)
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop / Tablet / Mobile 자동
                  대응
                </ListItem>
                <ListItem>
                  <strong>SCSS 모듈:</strong> 스타일 충돌 방지 및 KRDS 디자인
                  토큰 자동 적용
                </ListItem>
                <ListItem>
                  <strong>접근성 ARIA:</strong> 스크린 리더 지원을 위한 ARIA
                  속성 자동 설정
                </ListItem>
                <ListItem>
                  <strong>보안:</strong> 외부 링크에 noopener noreferrer 자동
                  설정
                </ListItem>
                <ListItem>
                  <strong>Identifier 통합:</strong> 공식 상징 마크 자동 렌더링
                </ListItem>
                <ListItem>
                  <strong>드롭다운 상태:</strong> 관련 사이트 확장/축소 상태
                  자동 관리
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API 레퍼런스"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Footer Props" />

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
                    <TableCell className="font-mono">
                      organizationName
                    </TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>조직명 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">logo</TableCell>
                    <TableCell className="text-krds-gray-70">
                      string | React.ReactElement
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>조직 로고 (이미지 URL 또는 컴포넌트)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">logoAlt</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      로고 대체 텍스트 (logo가 문자열인 경우 권장)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">address</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>조직 주소 (필수)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">contactInfo</TableCell>
                    <TableCell className="text-krds-gray-70">
                      FooterInfoItem[]
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>
                      연락처 정보 (대표전화, 팩스 등){' '}
                      <Code className="text-xs">
                        {'{ label: string, value: string }[]'}
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">quickLinks</TableCell>
                    <TableCell className="text-krds-gray-70">
                      FooterQuickLink[]
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>
                      관련 사이트 링크 (드롭다운){' '}
                      <Code className="text-xs">
                        {'{ label: string, href: string }[]'}
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">utilityLinks</TableCell>
                    <TableCell className="text-krds-gray-70">
                      FooterLink[]
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>
                      유틸리티 링크 (오시는 길, 이용안내 등){' '}
                      <Code className="text-xs">
                        {
                          '{ label: string, href: string, external?: boolean }[]'
                        }
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">socialLinks</TableCell>
                    <TableCell className="text-krds-gray-70">
                      FooterSocialLink[]
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>
                      소셜 미디어 링크{' '}
                      <Code className="text-xs">
                        {
                          "{ platform: 'instagram' | 'youtube' | 'x' | 'facebook' | 'blog', href: string, label?: string }[]"
                        }
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">menuLinks</TableCell>
                    <TableCell className="text-krds-gray-70">
                      FooterLink[]
                    </TableCell>
                    <TableCell>[]</TableCell>
                    <TableCell>
                      하단 메뉴 링크 (개인정보처리방침, 이용약관 등){' '}
                      <Code className="text-xs">
                        {
                          '{ label: string, href: string, external?: boolean }[]'
                        }
                      </Code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">copyright</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>저작권 텍스트</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">showIdentifier</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell className="font-mono">true</TableCell>
                    <TableCell>Identifier(공식 상징 마크) 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      identifierVariant
                    </TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;light&apos; | &apos;dark&apos;
                    </TableCell>
                    <TableCell className="font-mono">
                      &apos;light&apos;
                    </TableCell>
                    <TableCell>Identifier 테마</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">className</TableCell>
                    <TableCell className="text-krds-gray-70">string</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            {/* Type Definitions */}
            <Subsection level="h3">
              <SectionHeading level="h3" title="타입 정의" />

              <Body className="mb-4 font-mono">FooterInfoItem</Body>
              <Card className="mb-6">
                <Code language="typescript">
                  {`interface FooterInfoItem {
  label: string;  // 라벨 (예: '대표전화')
  value: string;  // 값 (예: '1577-1000')
}`}
                </Code>
              </Card>

              <Body className="mb-4 font-mono">FooterQuickLink</Body>
              <Card className="mb-6">
                <Code language="typescript">
                  {`interface FooterQuickLink {
  label: string;  // 사이트명
  href: string;   // URL
}`}
                </Code>
              </Card>

              <Body className="mb-4 font-mono">FooterLink</Body>
              <Card className="mb-6">
                <Code language="typescript">
                  {`interface FooterLink {
  label: string;      // 링크 텍스트
  href: string;       // URL
  external?: boolean; // 외부 링크 여부 (새 창 열림)
}`}
                </Code>
              </Card>

              <Body className="mb-4 font-mono">FooterSocialLink</Body>
              <Card>
                <Code language="typescript">
                  {`interface FooterSocialLink {
  platform: 'instagram' | 'youtube' | 'x' | 'facebook' | 'blog';
  href: string;   // SNS URL
  label?: string; // 접근성 라벨 (기본: platform 이름)
}`}
                </Code>
              </Card>
            </Subsection>

            {/* KRDS Compliance */}
            <Subsection level="h3">
              <SectionHeading
                level="h3"
                id="krds-compliance"
                title="KRDS 준수사항"
              />
              <Card variant="info">
                <List variant="check" className="text-krds-gray-90">
                  <ListItem>
                    <strong>필수 ID:</strong> #krds-footer (모든 정부 서비스
                    필수)
                  </ListItem>
                  <ListItem>
                    <strong>레이아웃 순서:</strong> 관련 사이트 → 로고 → 정보 →
                    링크 → 하단 (KRDS 표준)
                  </ListItem>
                  <ListItem>
                    <strong>Identifier:</strong> 공식 상징 마크 필수 표시 (정부
                    신뢰성 보장)
                  </ListItem>
                  <ListItem>
                    <strong>접근성:</strong> WCAG 2.1 AA, KWCAG 2.2 완전 준수
                  </ListItem>
                  <ListItem>
                    <strong>반응형:</strong> 모든 기기에서 최적화된 레이아웃
                    제공
                  </ListItem>
                </List>
              </Card>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'File Upload', href: '/components/file-upload' }}
        next={{ title: 'Header', href: '/components/header' }}
      />
    </>
  );
}
