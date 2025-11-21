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
  PageNavigation,
} from '@/components/hanui';

export default function FooterPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Footer"
        description="정부 서비스의 하단에 위치하여 조직 정보, 연락처, 관련 링크를 제공하는 푸터 컴포넌트입니다. 현재는 CSS Modules 방식으로 제공되며, Tailwind 스타일은 추후 지원 예정입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="installation"
              title="설치"
              description="Footer 컴포넌트를 프로젝트에 추가합니다."
            />

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add footer
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Footer란?"
              description="KRDS 표준에 따라 일관된 레이아웃을 제공하는 푸터 컴포넌트입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>KRDS 표준 준수:</strong> #krds-footer ID 자동 적용 및
                  시맨틱 HTML 사용
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop / Tablet / Mobile 자동
                  대응
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> WCAG 2.1 / KWCAG 2.2 완전 준수
                </ListItem>
                <ListItem>
                  <strong>Identifier 통합:</strong> 공식 상징 마크 자동 렌더링
                </ListItem>
                <ListItem>
                  <strong>관련 사이트 드롭다운:</strong> Quick Links 확장/축소
                  상태 자동 관리
                </ListItem>
                <ListItem>
                  <strong>외부 링크 보안:</strong> noopener noreferrer 자동 설정
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Footer 컴포넌트의 기본 사용법입니다."
            />

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Footer } from '@/components/hanui/footer';

export default function Layout() {
  return (
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
      copyright="© 2024 National Health Insurance Service. All rights reserved."
    />
  );
}`}
            </Code>
          </Section>

          {/* Examples */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="examples"
              title="예제"
              description="다양한 Footer 구성 예제입니다."
            />

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="기본 사용"
                description="최소한의 정보만 제공하는 간단한 Footer입니다."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Footer
  organizationName="행정안전부"
  address="(30128) 세종특별자치시 도움6로 42"
  contactInfo={[
    { label: '대표전화', value: '02-2100-3399' }
  ]}
/>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="관련 사이트 추가"
                description="quickLinks로 관련 사이트 드롭다운을 추가할 수 있습니다."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="소셜 미디어 링크"
                description="지원되는 플랫폼: instagram, youtube, x, facebook, blog"
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading
                level="h3"
                title="전체 예제"
                description="모든 옵션을 포함한 완전한 Footer 예제입니다."
              />

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`import { Footer } from '@/components/hanui/footer';

export default function Layout({ children }) {
  return (
    <>
      <main id="main-content">{children}</main>
      <Footer
        organizationName="국민건강보험공단"
        logo="/assets/logo.svg"
        logoAlt="국민건강보험공단"
        address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
        contactInfo={[
          { label: '대표전화', value: '1577-1000' },
          { label: '팩스', value: '033-811-2000' },
          { label: '당직실', value: '033-736-2299' }
        ]}
        quickLinks={[
          { label: '건강iN', href: 'https://hi.nhis.or.kr' },
          { label: '사회보험통합징수포털', href: 'https://si4n.nhis.or.kr' },
          { label: '민원접수', href: 'https://minwon.nhis.or.kr' }
        ]}
        utilityLinks={[
          { label: '찾아오시는 길', href: '/directions' },
          { label: '이용안내', href: '/guide' }
        ]}
        socialLinks={[
          { platform: 'youtube', href: 'https://youtube.com/@nhis' },
          { platform: 'instagram', href: 'https://instagram.com/nhis' }
        ]}
        menuLinks={[
          { label: '개인정보처리방침', href: '/privacy', external: false },
          { label: '이용약관', href: '/terms', external: false },
          { label: '저작권정책', href: '/copyright', external: false }
        ]}
        copyright="© 2024 National Health Insurance Service. All rights reserved."
        showIdentifier={true}
      />
    </>
  );
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="모범 사례"
              description="Footer 컴포넌트를 효과적으로 사용하기 위한 가이드입니다."
            />

            <List variant="unordered">
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
            <SectionHeading
              level="h2"
              id="accessibility"
              title="접근성"
              description="이 컴포넌트는 WCAG 2.1 / KWCAG 2.2 기준을 준수합니다."
            />

            <List variant="unordered">
              <ListItem>
                <strong>Semantic HTML:</strong> footer 요소를 사용하여 페이지
                구조를 명확히 합니다
              </ListItem>
              <ListItem>
                <strong>필수 ID:</strong> #krds-footer ID로 직접 접근 가능합니다
              </ListItem>
              <ListItem>
                <strong>ARIA 속성:</strong> 관련 사이트 버튼에 aria-expanded를
                자동 관리합니다
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> 모든 링크와 버튼에 키보드로
                접근할 수 있습니다
              </ListItem>
              <ListItem>
                <strong>명도 대비:</strong> 모든 텍스트가 WCAG AA 기준 4.5:1
                이상을 충족합니다
              </ListItem>
              <ListItem>
                <strong>외부 링크 보안:</strong> rel="noopener noreferrer" 자동
                설정으로 보안을 강화합니다
              </ListItem>
            </List>
          </Section>

          {/* KRDS Standards */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="krds-standards"
              title="KRDS 표준"
              description="Footer 컴포넌트가 준수하는 KRDS 표준입니다."
            />

            <Card variant="info">
              <Body className="font-semibold mb-3">
                자동 처리되는 KRDS 표준:
              </Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>필수 ID:</strong> <Code>#krds-footer</Code> ID 자동
                  적용 (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>레이아웃 구조:</strong> KRDS 표준 레이아웃 자동 적용
                  (Quick Links → Logo → Info → Links → Bottom)
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> footer 요소를 사용하여 페이지
                  구조를 명확히 합니다
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop / Tablet / Mobile 자동
                  대응
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> 라이트/다크 모드를 자동으로
                  지원합니다
                </ListItem>
                <ListItem>
                  <strong>CSS Variables:</strong> KRDS 디자인 토큰을 CSS
                  Variables로 제공합니다
                </ListItem>
                <ListItem>
                  <strong>Identifier 통합:</strong> 공식 상징 마크 자동 렌더링
                </ListItem>
              </List>
            </Card>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          {/* Props */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="props"
              title="Props"
              description="Footer 컴포넌트의 속성입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="organizationName" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 조직명 (필수)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="logo" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>string | React.ReactElement</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 조직 로고 (이미지 URL 또는 컴포넌트)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="logoAlt" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 로고 이미지 대체 텍스트 (logo가
                  문자열인 경우 권장)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="address" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> Yes
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 조직 주소 (필수)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="contactInfo" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ label: string; value: string }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 연락처 정보 (대표전화, 팩스 등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="quickLinks" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ label: string; href: string }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 관련 사이트 링크 (드롭다운)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="utilityLinks" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ label: string; href: string; external?: boolean }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 유틸리티 링크 (오시는 길, 이용안내 등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="socialLinks" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ platform: 'instagram' | 'youtube' | 'x' | 'facebook' | 'blog'; href: string; label?: string }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 소셜 미디어 링크
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="menuLinks" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong>{' '}
                  <Code>{`Array<{ label: string; href: string; external?: boolean }>`}</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>[]</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 하단 메뉴 링크 (개인정보처리방침,
                  이용약관 등)
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="copyright" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 저작권 텍스트
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="showIdentifier" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>boolean</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>true</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> Identifier(공식 상징 마크) 표시 여부
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="identifierVariant" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>'light' | 'dark'</Code>
                </ListItem>
                <ListItem>
                  <strong>기본값:</strong> <Code>'light'</Code>
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> Identifier 테마
                </ListItem>
              </List>
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
