import {
  Section,
  SectionHeading,
  Subsection,
  List,
  ListItem,
  Code,
  Body,
  Card,
  PageNavigation,
} from '@/components/hanui';

export default function IntroductionPage() {
  return (
    <>
      <SectionHeading
        level="h1"
        title="Introduction"
        description="HANUI는 Radix UI Primitives 기반의 KRDS(Korea Republic Design System) 컴포넌트 라이브러리입니다. 소스 코드 복사 방식으로 배포되어 완전한 커스터마이징이 가능합니다."
      />

      {/* What is HANUI */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="what-is-hanui"
          title="HANUI란?"
          description="HANUI는 한국 공공기관 웹사이트 개발을 위한 UI 컴포넌트 라이브러리입니다. KRDS 디자인 시스템을 준수하며, 웹 접근성(WCAG 2.1 AA)을 완벽히 지원합니다."
        />

        <Subsection level="h3">
          <SectionHeading level="h3" title="핵심 가치" />

          <List>
            <ListItem>
              <strong>KRDS 준수:</strong> 한국 정부 디자인 시스템 가이드라인
              완벽 준수
            </ListItem>
            <ListItem>
              <strong>Radix UI 기반:</strong> 접근성 로직이 자동으로 처리되어
              개발자는 비즈니스 로직에만 집중
            </ListItem>
            <ListItem>
              <strong>웹 접근성:</strong> WCAG 2.1 AA 수준 웹 접근성 기준 충족
              (Radix UI가 자동 보장)
            </ListItem>
            <ListItem>
              <strong>소스 코드 소유권:</strong> 컴포넌트 소스 코드를 직접
              수정하고 커스터마이징 가능
            </ListItem>
            <ListItem>
              <strong>개발자 경험:</strong> TypeScript 완벽 지원 및 직관적인 API
            </ListItem>
          </List>
        </Subsection>
      </Section>

      {/* Key Features */}
      <Section level="h2">
        <SectionHeading level="h2" id="key-features" title="주요 기능" />

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="KRDS 디자인 시스템"
            description="한국 공공기관 표준 디자인 가이드라인을 준수하는 컴포넌트를 제공합니다. 정부 및 공공기관 웹사이트 개발 시 필수적인 디자인 표준을 손쉽게 적용할 수 있습니다."
          />
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Radix UI Primitives 기반">
            <Body className="leading-relaxed">
              HANUI는 <strong>Radix UI Primitives</strong>를 기반으로 구축되어
              접근성과 사용성을 자동으로 보장합니다.
            </Body>
          </SectionHeading>

          <Card variant="info">
            <List variant="check" className="text-krds-gray-90">
              <ListItem>
                <strong>접근성 자동 보장:</strong> WCAG 2.1 AA 기준을 자동으로
                준수합니다. ARIA 속성, 키보드 네비게이션, 포커스 관리 등 복잡한
                접근성 로직을 Radix가 자동으로 처리합니다.
              </ListItem>
              <ListItem>
                <strong>상태 관리 자동화:</strong> 모달 열림/닫힘, 탭 전환,
                아코디언 펼침/접힘 등 모든 인터랙션 상태를 Radix가 자동으로
                관리합니다. 개발자는 비즈니스 로직에만 집중할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab, Enter, Escape, 화살표
                키 등 모든 키보드 조작이 자동으로 구현됩니다. 스크린 리더
                사용자도 완벽하게 사용할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>완전한 스타일 자유도:</strong> Radix는 Headless
                컴포넌트이므로, KRDS 디자인 가이드를 100% 반영한 스타일을
                Tailwind CSS로 자유롭게 적용할 수 있습니다.
              </ListItem>
            </List>
          </Card>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="소스 코드 기반 배포">
            <Body className="leading-relaxed">
              HANUI는 <strong>소스 코드 복사 방식</strong>으로 배포되어,
              사용자가 컴포넌트를 직접 수정하고 커스터마이징할 수 있습니다.
            </Body>
          </SectionHeading>

          <Card variant="info">
            <List variant="check" className="text-krds-gray-90">
              <ListItem>
                <strong>완전한 소유권:</strong> 컴포넌트 소스 코드가 프로젝트에
                복사되므로, 라이브러리 업데이트에 영향받지 않고 안정적으로
                사용할 수 있습니다. 필요에 따라 자유롭게 수정할 수 있습니다.
              </ListItem>
              <ListItem>
                <strong>유지보수 용이성:</strong> 컴포넌트 코드를 직접 확인하고
                수정할 수 있어, 버그 수정이나 기능 추가가 즉시 가능합니다. 외부
                라이브러리 의존성 문제 없이 프로젝트를 완전히 제어할 수
                있습니다.
              </ListItem>
              <ListItem>
                <strong>프로젝트 특화 커스터마이징:</strong> KRDS 표준을
                준수하면서도 프로젝트의 특수한 요구사항에 맞게 컴포넌트를 수정할
                수 있습니다. 번들 크기도 필요한 컴포넌트만 포함하여 최적화할 수
                있습니다.
              </ListItem>
              <ListItem>
                <strong>학습 자료로 활용:</strong> 실제 동작하는 컴포넌트 소스
                코드를 통해 Radix UI와 접근성 구현 방법을 학습할 수 있습니다. 팀
                내부 지식 공유에도 유용합니다.
              </ListItem>
            </List>
          </Card>
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="웹 접근성"
            description="스크린 리더, 키보드 네비게이션, ARIA 속성 등 웹 접근성을 완벽하게 지원합니다. 모든 사용자가 차별 없이 웹사이트를 이용할 수 있도록 설계되었습니다. Radix UI Primitives 기반으로 접근성 로직이 자동으로 처리되어, 개발자가 별도로 구현할 필요가 없습니다."
          />
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="React + TypeScript"
            description="타입 안정성과 자동완성 기능으로 개발 생산성을 높입니다. 컴포넌트의 모든 Props와 이벤트 핸들러에 대한 완벽한 타입 정의를 제공합니다."
          />
        </Subsection>

        <Subsection level="h3">
          <SectionHeading level="h3" title="Tailwind CSS">
            <Body className="leading-relaxed">
              유틸리티 클래스 기반으로 컴포넌트를 쉽게 커스터마이징할 수
              있습니다. 프로젝트의 디자인 시스템에 맞게 자유롭게 스타일을 조정할
              수 있습니다. Radix UI의 <Code>data-[state]</Code> 속성과 함께
              사용하여 상태 기반 스타일링도 쉽게 구현할 수 있습니다.
            </Body>
          </SectionHeading>
        </Subsection>
      </Section>

      {/* Who should use HANUI */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="who-should-use"
          title="누가 사용하나요?"
        />

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="공공기관 웹 개발자"
            description="정부, 지자체, 공공기관 웹사이트 개발 시 KRDS 준수가 필수인 프로젝트에 적합합니다."
          />
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="SI 개발사"
            description="공공 프로젝트를 수주하는 SI 업체에서 빠른 개발과 표준 준수가 필요한 경우에 활용할 수 있습니다."
          />
        </Subsection>

        <Subsection level="h3">
          <SectionHeading
            level="h3"
            title="접근성 중시 프로젝트"
            description="웹 접근성 준수가 중요한 모든 웹 애플리케이션 개발에 사용할 수 있습니다."
          />
        </Subsection>
      </Section>

      {/* Browser Support */}
      <Section level="h2">
        <SectionHeading
          level="h2"
          id="browser-support"
          title="브라우저 지원"
          description="HANUI는 최신 브라우저를 지원합니다."
        />

        <List>
          <ListItem>
            <strong>Safari</strong> - 최신 2개 버전
          </ListItem>
          <ListItem>
            <strong>Edge</strong> - 최신 2개 버전
          </ListItem>
        </List>
      </Section>

      {/* Next Steps */}
      <PageNavigation
        next={{ title: 'Installation', href: '/docs/installation' }}
      />
    </>
  );
}
