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
import { Footer } from '@/components/hanui/footer';

export default function FooterPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Footer"
        description="KRDS 표준을 따르는 정부 서비스 푸터 컴포넌트입니다. CSS Modules 방식으로 구현되어 복잡한 레이아웃과 반응형 디자인을 효과적으로 관리합니다."
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
              npx hanui add footer
            </Code>

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
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="Footer란?"
              description="KRDS 표준에 따라 구조화된 정부 서비스 푸터입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>CSS Modules 방식:</strong> SCSS를 활용한 명확한 스타일
                  구조
                </ListItem>
                <ListItem>
                  <strong>KRDS 표준 준수:</strong> #krds-footer ID 적용 및
                  시맨틱 HTML 구조
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Desktop(1280px+) /
                  Large(1024px+) / Tablet(768px+) / Mobile 자동 대응
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> KRDS 디자인 토큰을 활용한 자동
                  테마 전환
                </ListItem>
                <ListItem>
                  <strong>접근성:</strong> WCAG 2.1 / KWCAG 2.2 완전 준수
                </ListItem>
                <ListItem>
                  <strong>KRDS 디자인 토큰:</strong> CSS 변수를 통한 일관된
                  스타일 적용
                </ListItem>
              </List>
            </Card>
          </Section>

          <Section>
            <Footer />
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="usage"
              title="사용 예제"
              description="Footer 컴포넌트의 기본 사용법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="기본 사용" />
              <Body className="mb-4 text-krds-gray-70">
                Footer 컴포넌트는 KRDS 표준 레이아웃을 그대로 제공합니다.
                레이아웃의 최하단에 배치하세요.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="커스터마이징" />
              <Body className="mb-4 text-krds-gray-70">
                내용을 변경하려면 <Code>footer.tsx</Code> 파일을 직접
                수정하세요. CSS Modules 방식이므로{' '}
                <Code>footer.module.scss</Code>에서 스타일을 조정할 수 있습니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
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
            <p className={styles.infoAddr}>
              (우편번호) 주소
            </p>
            <ul className={styles.infoCs}>
              <li>
                <strong className={styles.strong}>대표전화 1577-1000</strong>
                <span className={styles.span}>(유료, 평일 09시~18시)</span>
              </li>
            </ul>
          </div>

          {/* Links & Social */}
          <div className={styles.fLink}>
            {/* 링크 섹션 */}
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.fBtm}>
          {/* 하단 메뉴 및 저작권 */}
        </div>
      </div>
    </footer>
  );
}`}
              </Code>
            </Subsection>
          </Section>

          {/* Structure */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="structure"
              title="레이아웃 구조"
              description="Footer는 다음과 같은 KRDS 표준 구조로 구성됩니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Quick Links (footQuick)" />
              <Body className="mb-4 text-krds-gray-70">
                관련 사이트 빠른 링크 영역입니다. 버튼 형태로 구성되며,
                모바일에서는 세로로 쌓입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className={styles.footQuick}>
  <div className={styles.inner}>
    <button type="button" className={styles.link}>
      건강iN
    </button>
    <button type="button" className={styles.link}>
      The건강보험
    </button>
  </div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Logo & Content (fLogo, fCnt)" />
              <Body className="mb-4 text-krds-gray-70">
                조직 로고, 주소, 연락처, 유틸리티 링크, 소셜 미디어 링크
                영역입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className={styles.fLogo}>
  <span className={styles.srOnly}>KRDS - Korea Design System</span>
</div>

<div className={styles.fCnt}>
  <div className={styles.fInfo}>
    <p className={styles.infoAddr}>
      (26464) 강원특별자치도 원주시 건강로 32(반곡동)
    </p>
    <ul className={styles.infoCs}>
      <li>
        <strong>대표전화 1577-1000</strong>
        <span>(유료, 평일 09시~18시)</span>
      </li>
    </ul>
  </div>

  <div className={styles.fLink}>
    {/* 유틸리티 링크 및 소셜 미디어 */}
  </div>
</div>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Bottom Section (fBtm)" />
              <Body className="mb-4 text-krds-gray-70">
                하단 메뉴(개인정보처리방침 등), 저작권, KRDS Identifier
                영역입니다.
              </Body>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<div className={styles.fBtm}>
  <div className={styles.fBtmText}>
    <div className={styles.fMenu}>
      <a href="#" className={styles.point}>개인정보처리방침</a>
      <a href="#">저작권 정책</a>
    </div>
    <p className={styles.fCopy}>
      © 2023 National Health Insurance Service. All rights reserved.
    </p>
  </div>

  <div className={styles.krdsIdentifier}>
    <span className={styles.logo}>
      <span className={styles.srOnly}>KRDS - Korea Design System</span>
    </span>
    <span className={styles.banTxt}>
      이 누리집은 보건복지부 누리집입니다.
    </span>
  </div>
</div>`}
              </Code>
            </Subsection>
          </Section>

          {/* Styling */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="styling"
              title="스타일 커스터마이징"
              description="CSS Modules를 활용한 스타일 수정 방법입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="KRDS 디자인 토큰 활용" />
              <Body className="mb-4 text-krds-gray-70">
                footer.module.scss에서 KRDS CSS 변수를 사용하여 일관된 디자인을
                유지합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.footer {
  background-color: var(--krds-color-light-gray-5);

  .footQuick {
    border-top: 1px solid var(--krds-color-light-gray-10);

    .link {
      gap: var(--krds-gap-3);
      padding: 0 var(--krds-padding-8, 2rem);
      height: calc(4rem - 0.2rem);

      &:hover {
        background-color: var(--krds-color-light-gray-10);
      }
    }
  }
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="반응형 브레이크포인트" />
              <Body className="mb-4 text-krds-gray-70">
                SCSS 미디어 쿼리를 통해 4단계 반응형 디자인을 제공합니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`// Web (1280px 이상)
@media (min-width: 1280px) {
  gap: var(--krds-gap-9, 3rem);
  padding: var(--krds-padding-10, 2.5rem) 0;
}

// Large (1024px ~ 1279px)
@media (min-width: 1024px) and (max-width: 1279px) {
  padding: var(--krds-padding-10, 2.5rem) var(--krds-padding-6, 1.5rem);
}

// Tablet (768px ~ 1023px)
@media (min-width: 768px) and (max-width: 1023px) {
  flex-direction: column;
  gap: var(--krds-gap-5, 1.25rem);
}

// Mobile (767px 이하)
@media (max-width: 767px) {
  font-size: 0.875rem;
  gap: var(--krds-gap-3, 0.75rem);
}`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="다크 모드" />
              <Body className="mb-4 text-krds-gray-70">
                .dark 클래스를 통해 다크 모드 스타일이 자동으로 적용됩니다.
              </Body>

              <Code variant="block" language="scss" showLineNumbers={false}>
                {`.dark {
  .footer {
    background-color: var(--krds-color-light-gray-95);

    .fLogo {
      background-image: url('...ico_logo_krds_dark.svg');
    }

    .footQuick {
      background-color: var(--krds-color-light-gray-100);
      border-color: var(--krds-color-light-gray-80);
    }
  }
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
                <strong>KRDS ID 유지:</strong> <Code>#krds-footer</Code> ID는
                KRDS 표준 요구사항이므로 변경하지 마세요
              </ListItem>
              <ListItem>
                <strong>조직 정보 수정:</strong> footer.tsx 파일에서 조직명,
                주소, 연락처를 직접 수정하세요
              </ListItem>
              <ListItem>
                <strong>법적 링크:</strong> 개인정보처리방침, 이용약관 등 필수
                법적 링크를 포함합니다
              </ListItem>
              <ListItem>
                <strong>외부 링크 보안:</strong> 외부 링크에는{' '}
                <Code>target="_blank"</Code>,{' '}
                <Code>rel="noopener noreferrer"</Code>를 사용하세요
              </ListItem>
              <ListItem>
                <strong>스타일 수정:</strong> footer.module.scss에서 KRDS 디자인
                토큰을 활용하여 일관성을 유지하세요
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
              <Body className="font-semibold mb-3">준수하는 KRDS 표준:</Body>
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>필수 ID:</strong> <Code>#krds-footer</Code> ID 적용
                  (KRDS 필수 요구사항)
                </ListItem>
                <ListItem>
                  <strong>레이아웃 구조:</strong> Quick Links → Logo → Content →
                  Bottom 순서의 표준 구조
                </ListItem>
                <ListItem>
                  <strong>시맨틱 HTML:</strong> footer, nav, ul, li 등 시맨틱
                  요소 사용
                </ListItem>
                <ListItem>
                  <strong>반응형 디자인:</strong> Web(1280px+) / Large(1024px+)
                  / Tablet(768px+) / Mobile 4단계 대응
                </ListItem>
                <ListItem>
                  <strong>다크 모드:</strong> .dark 클래스를 통한 자동 테마 전환
                </ListItem>
                <ListItem>
                  <strong>CSS Variables:</strong> KRDS 디자인 토큰 활용
                  (--krds-color-*, --krds-gap-*, --krds-padding-*)
                </ListItem>
                <ListItem>
                  <strong>Identifier:</strong> KRDS 로고 및 인증 문구 포함
                </ListItem>
                <ListItem>
                  <strong>아이콘:</strong> KRDS SVG 아이콘 사용 (Plus,
                  ChevronRight 등)
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
              <SectionHeading level="h3" title="className" />
              <List variant="unordered">
                <ListItem>
                  <strong>타입:</strong> <Code>string</Code>
                </ListItem>
                <ListItem>
                  <strong>필수:</strong> No
                </ListItem>
                <ListItem>
                  <strong>설명:</strong> 추가 CSS 클래스명
                </ListItem>
              </List>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Footer className="custom-footer-class" />`}
              </Code>
            </Subsection>
          </Section>

          {/* CSS Modules Classes */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="css-modules"
              title="CSS Modules 클래스"
              description="footer.module.scss에서 사용 가능한 클래스 목록입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="레이아웃 클래스" />
              <List variant="unordered">
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
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Quick Links 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.link</Code> - Quick Links 버튼
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="정보 영역 클래스" />
              <List variant="unordered">
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
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="링크 영역 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.linkGo</Code> - 유틸리티 링크 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.linkGoBtn</Code> - 유틸리티 링크 버튼
                </ListItem>
                <ListItem>
                  <Code>.linkSns</Code> - 소셜 미디어 컨테이너
                </ListItem>
                <ListItem>
                  <Code>.snsLink</Code> - 소셜 미디어 링크
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="하단 영역 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.fBtmText</Code> - 하단 텍스트 영역
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
                  <Code>.banTxt</Code> - Identifier 텍스트
                </ListItem>
              </List>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="유틸리티 클래스" />
              <List variant="unordered">
                <ListItem>
                  <Code>.srOnly</Code> - 스크린 리더 전용 텍스트
                </ListItem>
              </List>
            </Subsection>
          </Section>

          {/* CSS Variables */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="css-variables"
              title="CSS 변수"
              description="사용되는 KRDS 디자인 토큰입니다."
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="색상 (Color)" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-color-light-gray-0
--krds-color-light-gray-5
--krds-color-light-gray-10
--krds-color-light-gray-20
--krds-color-light-gray-50
--krds-color-light-gray-70
--krds-color-light-gray-90
--krds-color-light-gray-95
--krds-color-light-gray-100
--krds-accent-text`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="간격 (Gap)" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-gap-2     /* 0.5rem */
--krds-gap-3     /* 0.75rem */
--krds-gap-5     /* 1.25rem */
--krds-gap-6     /* 1.5rem */
--krds-gap-7     /* 2rem */
--krds-gap-8     /* 2.5rem */
--krds-gap-9     /* 3rem */`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="패딩 (Padding)" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-padding-6     /* 1.5rem */
--krds-padding-8     /* 2rem */
--krds-padding-10    /* 2.5rem */`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="크기 (Size)" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-size-height-7        /* 3.5rem */
--krds-icon--size-medium    /* 1.5rem */`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="폰트 (Font)" />
              <Code variant="block" language="css" showLineNumbers={false}>
                {`--krds-font-weight-regular    /* 400 */
--krds-font-weight-bold       /* 700 */`}
              </Code>
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
