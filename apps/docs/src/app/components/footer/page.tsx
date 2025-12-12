'use client';

// Docs layout components
import {
  PageSection as Section,
  Subsection,
  Heading,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Body,
  Card,
  Code,
  List,
  ListItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Footer,
} from '@hanui/react';

export default function FooterPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Footer"
        description="KRDS 표준에 따라 구조화된 정부 서비스 푸터 컴포넌트입니다. CSS Modules 방식으로 구현되어 복잡한 레이아웃과 반응형 디자인을 효과적으로 관리하며, WCAG 2.1 / KWCAG 2.2 접근성 표준을 완전히 준수합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Overview */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div
                className="scale-[0.7] origin-top w-[1280px]"
                style={{ height: '571px' }}
              >
                <Footer className="w-[1280px]" />
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`import { Footer } from '@/components/hanui/footer';

<Footer />`}
            </Code>
          </Section>

          <Installation componentName="footer" />

          <Card variant="info" className="mt-6">
            <Body className="mb-3">설치 시 다음 파일이 추가됩니다:</Body>
            <List className="text-krds-gray-90">
              <ListItem>
                <Code>components/hanui/footer.tsx</Code> - Footer 컴포넌트
              </ListItem>
              <ListItem>
                <Code>components/hanui/footer.module.scss</Code> - CSS Modules
                스타일
              </ListItem>
            </List>
          </Card>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Footer } from '@/components/hanui/footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}`}
            </Code>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="레이아웃 구조" />
              <Body className="mb-4">
                Footer는 KRDS 표준 레이아웃 구조를 따릅니다:
              </Body>
              <List variant="check" className="mb-4">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Quick Links (footQuick)
                  </Body>
                  <Body size="sm" as="span">
                    : 상단 관련 사이트 영역
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Logo (fLogo)
                  </Body>
                  <Body size="sm" as="span">
                    : 조직 로고 영역
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Content (fCnt)
                  </Body>
                  <Body size="sm" as="span">
                    : 메인 콘텐츠 (주소, 연락처, 링크)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Bottom (fBtm)
                  </Body>
                  <Body size="sm" as="span">
                    : 하단 메뉴 및 저작권 정보
                  </Body>
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="커스터마이징" />
              <Body className="mb-4">
                조직 정보를 수정하려면 <Code>components/hanui/footer.tsx</Code>{' '}
                파일을 직접 편집합니다:
              </Body>
              <Code variant="block" language="tsx">
                {`// components/hanui/footer.tsx
export function Footer({ className }: FooterProps) {
  return (
    <footer id="krds-footer" className={\`\${styles.footer} \${className || ''}\`}>
      {/* Quick Links */}
      <div className={styles.footQuick}>
        <div className={styles.inner}>
          <button type="button" className={styles.link}>
            관련사이트 1
          </button>
          {/* 필요한 만큼 추가 */}
        </div>
      </div>

      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.fLogo}>
          <span className={styles.srOnly}>조직명</span>
        </div>

        {/* Content */}
        <div className={styles.fCnt}>
          <div className={styles.fInfo}>
            <p className={styles.infoAddr}>(우편번호) 주소</p>
            <ul className={styles.infoCs}>
              <li>
                <strong>대표전화 1577-1000</strong>
                <span>(유료, 평일 09시~18시)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.fBtm}>
          <div className={styles.fBtmText}>
            <div className={styles.fMenu}>
              <a href="#" className={styles.point}>개인정보처리방침</a>
              <a href="#">저작권 정책</a>
            </div>
            <p className={styles.fCopy}>
              © 2023 조직명. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="반응형 동작" />
              <Body className="mb-4">
                Footer는 4단계 브레이크포인트에서 자동으로 레이아웃을
                조정합니다:
              </Body>
              <List spacing="tight" className="mb-4">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Desktop (1280px+)
                  </Body>
                  <Body size="sm" as="span">
                    : 전체 레이아웃, 최대 간격 적용
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Large (1024px~1279px)
                  </Body>
                  <Body size="sm" as="span">
                    : 좌우 패딩 추가
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Tablet (768px~1023px)
                  </Body>
                  <Body size="sm" as="span">
                    : 세로 방향 레이아웃
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Mobile (~767px)
                  </Body>
                  <Body size="sm" as="span">
                    : 축소된 폰트 및 간격
                  </Body>
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="스타일 커스터마이징" />
              <Body className="mb-4">
                <Code>footer.module.scss</Code>에서 KRDS 디자인 토큰을 활용하여
                스타일을 수정할 수 있습니다:
              </Body>
              <Code variant="block" language="scss">
                {`.footer {
  background-color: var(--krds-color-light-gray-5);

  .footQuick {
    border-top: 1px solid var(--krds-color-light-gray-10);

    .link {
      gap: var(--krds-gap-3);
      padding: 0 var(--krds-padding-8, 2rem);

      &:hover {
        background-color: var(--krds-color-light-gray-10);
      }
    }
  }
}

// 다크 모드
.dark .footer {
  background-color: var(--krds-color-light-gray-95);

  .fLogo {
    background-image: url('...ico_logo_krds_dark.svg');
  }
}`}
              </Code>
            </Subsection>
          </Section>

          <Section level="h2">
            <Heading level="h2" id="accessibility" title="접근성" />

            <List variant="check">
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  시맨틱 HTML
                </Body>
                <Body size="sm" as="span">
                  : footer 요소를 사용하여 페이지 구조를 명확히 합니다
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  필수 ID
                </Body>
                <Body size="sm" as="span">
                  : #krds-footer ID로 직접 접근 가능합니다
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  ARIA 속성
                </Body>
                <Body size="sm" as="span">
                  : 관련 사이트 버튼에 aria-expanded를 자동 관리합니다
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  키보드 네비게이션
                </Body>
                <Body size="sm" as="span">
                  : 모든 링크와 버튼에 키보드로 접근할 수 있습니다
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  명도 대비
                </Body>
                <Body size="sm" as="span">
                  : 모든 텍스트가 WCAG AA 기준 4.5:1 이상을 충족합니다
                </Body>
              </ListItem>
              <ListItem>
                <Body size="sm" weight="bold" as="span">
                  외부 링크 보안
                </Body>
                <Body size="sm" as="span">
                  : rel="noopener noreferrer" 자동 설정으로 보안을 강화합니다
                </Body>
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API Reference" />

            <Subsection level="h3">
              <Heading level="h3" title="Footer Props" />
              <Body className="mb-4">
                <Code>className</Code> - 추가 CSS 클래스명 (선택)
              </Body>
              <Code variant="block" language="tsx">
                {`<Footer className="custom-footer-class" />`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="CSS Modules 클래스" />
              <Body className="mb-4">
                Footer 컴포넌트는 다음 CSS Modules 클래스를 사용합니다:
              </Body>

              <Card>
                <Body className="font-semibold mb-2">레이아웃 구조</Body>
                <List spacing="tight" className="mb-4">
                  <ListItem>
                    <Code>.footer</Code> - 메인 푸터 컨테이너
                  </ListItem>
                  <ListItem>
                    <Code>.inner</Code> - 내부 컨텐츠 래퍼 (max-width 적용)
                  </ListItem>
                  <ListItem>
                    <Code>.footQuick</Code> - 상단 Quick Links 영역
                  </ListItem>
                  <ListItem>
                    <Code>.fLogo</Code> - 조직 로고 영역
                  </ListItem>
                  <ListItem>
                    <Code>.fCnt</Code> - 메인 컨텐츠 영역
                  </ListItem>
                  <ListItem>
                    <Code>.fInfo</Code> - 조직 정보 (주소, 연락처)
                  </ListItem>
                  <ListItem>
                    <Code>.fLink</Code> - 링크 섹션 (유틸리티, 소셜)
                  </ListItem>
                  <ListItem>
                    <Code>.fBtm</Code> - 하단 영역 (메뉴, 저작권)
                  </ListItem>
                </List>

                <Body className="font-semibold mb-2">세부 클래스</Body>
                <List spacing="tight">
                  <ListItem>
                    <Code>.link</Code> - Quick Links 버튼
                  </ListItem>
                  <ListItem>
                    <Code>.infoAddr</Code> - 주소
                  </ListItem>
                  <ListItem>
                    <Code>.infoCs</Code> - 연락처 리스트
                  </ListItem>
                  <ListItem>
                    <Code>.strong</Code> - 굵은 텍스트 (전화번호 등)
                  </ListItem>
                  <ListItem>
                    <Code>.span</Code> - 보조 텍스트 (영업 시간 등)
                  </ListItem>
                  <ListItem>
                    <Code>.fMenu</Code> - 하단 메뉴
                  </ListItem>
                  <ListItem>
                    <Code>.point</Code> - 강조 링크 (개인정보처리방침 등)
                  </ListItem>
                  <ListItem>
                    <Code>.fCopy</Code> - 저작권 텍스트
                  </ListItem>
                  <ListItem>
                    <Code>.krdsIdentifier</Code> - KRDS Identifier 영역
                  </ListItem>
                  <ListItem>
                    <Code>.srOnly</Code> - 스크린 리더 전용 텍스트
                  </ListItem>
                </List>
              </Card>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="KRDS 준수사항" />
              <List variant="check">
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    필수 ID
                  </Body>
                  <Body size="sm" as="span">
                    : <Code>#krds-footer</Code> ID 적용 (KRDS 필수 요구사항)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    레이아웃 구조
                  </Body>
                  <Body size="sm" as="span">
                    : Quick Links → Logo → Content → Bottom 순서의 표준 구조
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    시맨틱 HTML
                  </Body>
                  <Body size="sm" as="span">
                    : footer, nav, ul, li 등 시맨틱 요소 사용
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    반응형 디자인
                  </Body>
                  <Body size="sm" as="span">
                    : Desktop(1280px+) / Large(1024px+) / Tablet(768px+) /
                    Mobile 4단계 대응
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    다크 모드
                  </Body>
                  <Body size="sm" as="span">
                    : .dark 클래스를 통한 자동 테마 전환
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    디자인 토큰
                  </Body>
                  <Body size="sm" as="span">
                    : KRDS CSS 변수 활용 (--krds-color-*, --krds-gap-*,
                    --krds-padding-*)
                  </Body>
                </ListItem>
                <ListItem>
                  <Body size="sm" weight="bold" as="span">
                    Identifier
                  </Body>
                  <Body size="sm" as="span">
                    : KRDS 로고 및 인증 문구 포함
                  </Body>
                </ListItem>
              </List>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Flex', href: '/components/flex' }}
        next={{ title: 'Form Field', href: '/components/form-field' }}
      />
    </>
  );
}
