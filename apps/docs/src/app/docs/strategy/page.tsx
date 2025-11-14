import { Display, Heading, Body } from '@hanui/react';

export default function StrategyPage() {
  return (
    <div className="flex-1 container mx-auto py-8">
      <Display size="lg" className="mb-8">
        HANUI 글로벌 포지셔닝 전략
      </Display>

      <Body className="mb-8">
        HANUI는 공공 서비스 표준과 현대적 기술 브랜드를 결합한 UI
        프레임워크로서, 글로벌 시장에서 독자적인 포지션을 구축할 수 있는 차별화
        전략을 가지고 있습니다.
      </Body>

      <section className="mb-12">
        <Heading level="h2" id="market-analysis" className="mb-6">
          1. 글로벌 UI 프레임워크 시장 분석
        </Heading>

        <div className="mb-8">
          <Heading level="h3" className="mb-4">
            미국: MUI에서 Radix UI로의 전환
          </Heading>

          <Body className="mb-4">
            최근 2~3년간 미국 스타트업과 SaaS 기업들이 MUI에서 Radix UI로
            이동하는 추세가 강화되고 있습니다.
          </Body>

          <div className="ml-6 mb-4">
            <Heading level="h4" className="mb-3">
              주요 선택 이유:
            </Heading>

            <ul className="space-y-3 list-disc ml-6">
              <li>
                <Body>
                  <strong>Headless UI 구조:</strong> MUI는 완성된 디자인을
                  제공하여 커스터마이징이 어렵고 브랜드 정체성을 살리기
                  힘듭니다. 반면 Radix는 UI 로직과 접근성만 제공하고 디자인은
                  사용자가 직접 구현할 수 있어, B2B SaaS 회사들이 자사 브랜드
                  UI를 유지하면서도 개발 속도를 높일 수 있습니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>세계 최고 수준의 접근성(A11y):</strong> Radix는 접근성
                  컴포넌트 아키텍처가 정교하여 대기업도 신뢰하고 사용할 수 있는
                  안정성을 제공합니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>Atomic Design 최적화:</strong> Design Token 시스템,
                  Tailwind, Figma Design System과의 통합이 매우 용이합니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>조직 전체의 만족:</strong>
                  <ul className="ml-6 mt-2 space-y-1">
                    <li>디자인팀 → 브랜드 자율성 확보</li>
                    <li>개발팀 → 예측 가능한 컴포넌트 구조</li>
                    <li>PM/경영진 → 개발 속도 증가</li>
                  </ul>
                </Body>
              </li>
            </ul>
          </div>

          <Body className="mt-4">
            특히 Series A~C 단계의 성장 기업들에서 MUI에서 Radix로 전환하는
            사례가 증가하고 있습니다.
          </Body>
        </div>

        <div className="mb-8">
          <Heading level="h3" className="mb-4">
            중국: Ant Design의 사실상 표준화
          </Heading>

          <Body className="mb-4">
            중국의 UI 프레임워크 생태계는 미국과 완전히 다른 양상을 보이며, Ant
            Design이 압도적인 점유율을 차지하고 있습니다.
          </Body>

          <div className="ml-6 mb-4">
            <Heading level="h4" className="mb-3">
              표준화 요인:
            </Heading>

            <ul className="space-y-3 list-disc ml-6">
              <li>
                <Body>
                  <strong>알리바바의 직접 개발:</strong> Alibaba, Taobao, Ant
                  Financial 등 중국 대기업들이 대규모 트래픽과 복잡한 업무
                  시스템을 운영하면서 축적한 UI 패턴이 Ant Design에 집약되어
                  있습니다. 중국 기업들은 "알리바바에서 사용하는 것을 사용하면
                  안정적"이라는 인식을 가지고 있습니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>개발자 교육 생태계:</strong> 중국 개발자의 절대 다수가
                  React + Ant Design 조합을 학습합니다. 온라인 강의, 부트캠프,
                  교육 플랫폼 모두 Ant Design 중심으로 구성되어 있어 "배우는
                  것이 Ant Design → 회사도 Ant Design 채택 → 생태계 더 강화"되는
                  선순환이 발생합니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>엔터프라이즈 UI 최적화:</strong> 중국 정부 및 기업
                  프로젝트는 표, 테이블, 양식, CRUD 중심의 Enterprise UI를
                  선호하며, Ant Design은 이러한 "엔터프라이즈 관리 시스템"에
                  최적화되어 있습니다.
                </Body>
              </li>
              <li>
                <Body>
                  <strong>압도적인 생태계 규모:</strong> 컴포넌트, 플러그인,
                  테마, 템플릿, 유지보수 커뮤니티가 매우 방대합니다.
                </Body>
              </li>
            </ul>
          </div>

          <Body className="mt-4">
            중국은 사실상 "Ant Design 독점 시장"으로 볼 수 있습니다.
          </Body>
        </div>
      </section>

      <section className="mb-12">
        <Heading level="h2" id="differentiation-strategy" className="mb-6">
          2. HANUI의 차별화 전략
        </Heading>

        <Body className="mb-6">
          HANUI는 한국적 공공 디자인 시스템과 글로벌 SaaS 브랜드 스타일의
          결합이라는 이중 포지션을 통해 글로벌 시장에서 독자적인 경쟁력을 확보할
          수 있습니다.
        </Body>

        <div className="space-y-8">
          <div>
            <Heading level="h3" className="mb-4">
              2.1 공공 서비스 표준 특화 컴포넌트
            </Heading>

            <Body className="mb-4">
              전 세계 주요 국가들은 공공기관 UX 표준을 별도 프레임워크로
              운영하고 있습니다:
            </Body>

            <ul className="ml-6 mb-4 space-y-2 list-disc">
              <li>
                <Body>미국 → USWDS (US Web Design System)</Body>
              </li>
              <li>
                <Body>EU → EU Design System</Body>
              </li>
              <li>
                <Body>영국 → GOV.UK Design System</Body>
              </li>
              <li>
                <Body>호주 → AU Design System</Body>
              </li>
            </ul>

            <Body className="mt-4">
              그러나 "공공서비스 표준 + 현대적 기술 브랜드"를 동시에 만족하는 UI
              프레임워크는 존재하지 않습니다.
              <strong> HANUI가 이 영역에서 최초가 될 수 있습니다.</strong>
            </Body>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              2.2 접근성 + 국제화(i18n) + 다국어 정서 반영
            </Heading>

            <Body className="mb-4">
              한국 공공기관의 다국어 지원 니즈가 증가하고 있으며, 글로벌 SaaS
              기업도 i18n 문제를 지속적으로 직면하고 있습니다.
            </Body>

            <Body>
              <strong>한글 기반 디자인 모티프 + 다국적 UI 흐름</strong>의 결합은
              독창적인 차별화 요소가 될 수 있습니다.
            </Body>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              2.3 '공공 SaaS' 시대의 Founder-Friendly 제품
            </Heading>

            <Body className="mb-4">
              전 세계적으로 "정부 + 기업 공동 SaaS 플랫폼" 구축이 시작되고
              있으며, 다음과 같은 공통 요구사항이 있습니다:
            </Body>

            <ul className="ml-6 mb-4 space-y-2 list-disc">
              <li>
                <Body>표준화된 디자인</Body>
              </li>
              <li>
                <Body>접근성(A11y) 준수</Body>
              </li>
              <li>
                <Body>컴포넌트 규격화</Body>
              </li>
              <li>
                <Body>빠른 구축 가능</Body>
              </li>
            </ul>

            <Body>
              HANUI가 이 영역에 특화되면 미국, 유럽, 아시아의 정부·NGO·교육기관
              시장까지 확장할 수 있습니다.
            </Body>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              2.4 Radix의 장점 + Ant Design의 장점 결합
            </Heading>

            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      기능
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Radix
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Ant Design
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      HANUI (목표)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">접근성</td>
                    <td className="border border-gray-300 px-4 py-2">
                      최고 수준
                    </td>
                    <td className="border border-gray-300 px-4 py-2">양호</td>
                    <td className="border border-gray-300 px-4 py-2">
                      최고 수준 목표
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">디자인</td>
                    <td className="border border-gray-300 px-4 py-2">
                      자유도 높음
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      정형화됨
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      공공 + 기술감 균형
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      컴포넌트 수
                    </td>
                    <td className="border border-gray-300 px-4 py-2">적음</td>
                    <td className="border border-gray-300 px-4 py-2">
                      매우 많음
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      공공 + 기업 특화 확장
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      디자인 언어
                    </td>
                    <td className="border border-gray-300 px-4 py-2">없음</td>
                    <td className="border border-gray-300 px-4 py-2">
                      중국 스타일
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      동아시아 + 기술 브랜드
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Body>
              HANUI는{' '}
              <strong>
                "Radix 수준의 접근성 + Ant Design 수준의 생산성 + 한국적 UI
                감성"
              </strong>
              이라는 유니크한 포지션을 만들 수 있습니다.
            </Body>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              2.5 한국형 'Governance + DX(개발자 경험)' 모델
            </Heading>

            <Body className="mb-4">
              한국 정부 서비스는 UX 규칙이 매우 촘촘하게 정의되어 있으며, 이를
              그대로 모델화하면 해외 공공기관에게도 매력적인 솔루션이 될 수
              있습니다.
            </Body>

            <Body className="mb-4">
              HANUI가 이 영역에 특화되면 다음과 같은 확장이 가능합니다:
            </Body>

            <ul className="ml-6 space-y-2 list-disc">
              <li>
                <Body>공공기관 웹사이트 빌더</Body>
              </li>
              <li>
                <Body>교육기관 템플릿</Body>
              </li>
              <li>
                <Body>NGO/시민단체 사이트</Body>
              </li>
              <li>
                <Body>글로벌 공공 SaaS 플랫폼</Body>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Heading level="h2" id="a11y-strategy" className="mb-6">
          3. A11y(Accessibility) 핵심 전략
        </Heading>

        <Body className="mb-6">
          A11y는 단순한 "장애인 웹 접근성"을 넘어{' '}
          <strong>웹 접근성 + UX 보편성 + 기술 표준 준수</strong>를 의미하며,
          HANUI의 가장 중요한 경쟁력 포인트가 될 수 있습니다.
        </Body>

        <div className="space-y-8">
          <div>
            <Heading level="h3" className="mb-4">
              3.1 A11y의 진정한 의미
            </Heading>

            <Body className="mb-4">
              A11y는 한국 장애인차별금지법에서 요구하는 웹 접근성을 포함하되,
              훨씬 더 넓고 깊은 개념입니다:
            </Body>

            <div className="ml-6 mb-4">
              <Heading level="h4" className="mb-3">
                기본 웹 접근성 요구사항:
              </Heading>

              <ul className="space-y-2 list-disc ml-6">
                <li>
                  <Body>스크린 리더(음성 읽기) 대응</Body>
                </li>
                <li>
                  <Body>키보드로만 사이트 조작 가능</Body>
                </li>
                <li>
                  <Body>명확한 포커스 표시</Body>
                </li>
                <li>
                  <Body>색약/색맹 배려</Body>
                </li>
                <li>
                  <Body>동작·플래시 위험 요소 제거</Body>
                </li>
              </ul>

              <Body className="mt-4">
                이는 한국 공공사업에서 이미 필수 요건이지만, Radix UI 같은
                글로벌 리더가 말하는 A11y는 더 깊은 기술적 요소를 의미합니다.
              </Body>
            </div>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              3.2 고급 A11y 기술 요소
            </Heading>

            <div className="space-y-6">
              <div>
                <Heading level="h4" className="mb-3">
                  ① 고급 ARIA 속성 처리
                </Heading>

                <Body className="mb-3">
                  컴포넌트 자체가 올바른 ARIA 속성을 자동으로 세팅하여, 개발자가
                  잘못 사용해도 장애인 사용자에게 문제가 없도록 자동화합니다:
                </Body>

                <ul className="ml-6 space-y-1 list-disc">
                  <li>
                    <Body>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        role="dialog"
                      </code>{' '}
                      - 대화상자 역할 정의
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        aria-labelledby
                      </code>{' '}
                      - 레이블 연결
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        aria-describedby
                      </code>{' '}
                      - 설명 연결
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        aria-expanded
                      </code>{' '}
                      - 확장/축소 상태
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <code className="bg-gray-100 px-2 py-1 rounded">
                        aria-hidden
                      </code>{' '}
                      - 스크린 리더 숨김
                    </Body>
                  </li>
                </ul>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ② 키보드 네비게이션 완벽 지원
                </Heading>

                <Body className="mb-3">
                  모든 컴포넌트에 통일된 키보드 조작 규칙을 자동 적용합니다:
                </Body>

                <ul className="ml-6 space-y-1 list-disc">
                  <li>
                    <Body>
                      <kbd className="bg-gray-100 px-2 py-1 rounded border">
                        Tab
                      </kbd>{' '}
                      - 요소 이동
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <kbd className="bg-gray-100 px-2 py-1 rounded border">
                        Shift
                      </kbd>{' '}
                      +{' '}
                      <kbd className="bg-gray-100 px-2 py-1 rounded border">
                        Tab
                      </kbd>{' '}
                      - 역방향 이동
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <kbd className="bg-gray-100 px-2 py-1 rounded border">
                        Esc
                      </kbd>{' '}
                      - 팝업 닫힘
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <kbd className="bg-gray-100 px-2 py-1 rounded border">
                        Arrow Keys
                      </kbd>{' '}
                      - 메뉴 선택
                    </Body>
                  </li>
                </ul>

                <Body className="mt-3">
                  이러한 일관된 키보드 인터랙션이 Radix UI가 세계 최고인
                  이유입니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ③ 포커스 트랩(Focus Trap)
                </Heading>

                <Body>
                  모달이 열렸을 때 포커스가 모달 밖으로 나가지 않도록 하는
                  기능으로, 장애인 접근성뿐 아니라 일반 사용자 UX에도 매우
                  중요합니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ④ 스크린 리더 최적화 구조
                </Heading>

                <Body className="mb-3">
                  예를 들어 Alert Dialog는 다음을 자동으로 보장해야 합니다:
                </Body>

                <ul className="ml-6 space-y-1 list-disc">
                  <li>
                    <Body>"경고"라는 역할(role) 명시</Body>
                  </li>
                  <li>
                    <Body>제목 읽기</Body>
                  </li>
                  <li>
                    <Body>설명 읽기</Body>
                  </li>
                  <li>
                    <Body>버튼 구조 정보 제공</Body>
                  </li>
                </ul>

                <Body className="mt-3">
                  개발자가 매번 이를 구현하는 것은 거의 불가능하므로, 컴포넌트가
                  자동으로 처리해야 합니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ⑤ 국제 표준 준수
                </Heading>

                <Body className="mb-3">세계적으로 인정받는 접근성 기준:</Body>

                <ul className="ml-6 space-y-2 list-disc">
                  <li>
                    <Body>
                      <strong>
                        WCAG (Web Content Accessibility Guidelines)
                      </strong>{' '}
                      - W3C 웹 콘텐츠 접근성 지침
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <strong>WAI-ARIA</strong> - 웹 접근성 이니셔티브 아리아
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <strong>ADA (Americans with Disabilities Act)</strong> -
                      미국 장애인법
                    </Body>
                  </li>
                  <li>
                    <Body>
                      <strong>EN 301 549</strong> - 유럽 접근성 표준
                    </Body>
                  </li>
                </ul>

                <Body className="mt-3">
                  HANUI가 이를 충족하면 전 세계 공공기관 + 글로벌 SaaS 회사
                  모두가 사용할 수 있습니다.
                </Body>
              </div>
            </div>
          </div>

          <div>
            <Heading level="h3" className="mb-4">
              3.3 A11y 강화로 얻는 시장 경쟁력
            </Heading>

            <div className="space-y-6">
              <div>
                <Heading level="h4" className="mb-3">
                  ① 한국 공공사업 필수 요건 충족
                </Heading>

                <Body>
                  나라장터 입찰에서 UX 접근성 점수는 매우 중요한 평가
                  항목입니다. HANUI 컴포넌트로 개발하면{' '}
                  <strong>'자동으로 접근성 완성'</strong>되어 입찰 경쟁력이
                  급상승합니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ② 미국·유럽 시장 즉시 진출 가능
                </Heading>

                <Body>
                  특히 미국은 ADA 소송이 매우 많아 웹 접근성 솔루션이 거대한
                  시장을 형성하고 있습니다. Radix UI가 급성장한 이유도 바로
                  여기에 있습니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ③ 개발자 피로도 감소
                </Heading>

                <Body>
                  A11y는 대부분의 개발자가 잘 이해하지 못하는 복잡한 영역입니다.
                  이를 자동화해주면 큰 차별화 요소가 됩니다.
                </Body>
              </div>

              <div>
                <Heading level="h4" className="mb-3">
                  ④ 한국형 접근성 + 글로벌 표준 결합
                </Heading>

                <Body>
                  한국의 KRDS 접근성 기준은 아시아에서 가장 체계적입니다. 이를
                  모델링하여 제공하면 동남아·중동 시장에서도 강력한 경쟁력을
                  확보할 수 있습니다.
                </Body>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
            <Heading level="h4" className="mb-3">
              핵심 요약
            </Heading>

            <Body className="mb-3">
              <strong>
                A11y = 장애인 웹 접근성 + 국제 표준 + UX 자동화 기술
              </strong>
            </Body>

            <Body>
              HANUI가 A11y에 집중하면 Radix UI처럼 강력한 차별화 포인트를 만들
              수 있으며, 이는 글로벌 공공기관과 엔터프라이즈 시장 진출의 핵심
              경쟁력이 됩니다.
            </Body>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <Heading level="h2" id="conclusion" className="mb-6">
          4. 결론
        </Heading>

        <div className="space-y-4">
          <Body>
            미국(MUI, Radix), 중국(Ant Design), 한국(HANUI) 시장은 비즈니스 모델
            자체가 완전히 다르기 때문에 공존이 가능합니다.
          </Body>

          <Body>
            HANUI의 전략은 논리적이며 확장성이 크고, 한국 공공서비스 기반이라는
            강점은 오히려 해외 확장 시 <strong>핵심 차별화 포인트</strong>가 될
            수 있습니다.
          </Body>

          <Body>
            글로벌 시장에서 "공공 + 기술 브랜드"를 결합한 최초의 UI 프레임워크로
            자리매김할 수 있는 기회가 있습니다.
          </Body>
        </div>
      </section>
    </div>
  );
}
