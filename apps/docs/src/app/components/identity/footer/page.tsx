import { Footer, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';
import { SectionHeading } from '@/components/hanui/section-header';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/hanui/tabs';

export default function FooterPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Footer (정부기관 푸터)"
        description="KRDS 표준을 따르는 정부기관 웹사이트 푸터 레이아웃입니다. 기관 정보, 연락처, 관련 링크, 소셜 미디어, 그리고 운영기관 식별자를 포함합니다."
      />

      <PageSection>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Usage Examples */}
            <div className="space-y-8">
              <div>
                <SectionHeading level="h2" id="examples" title="예제" />

                <div className="mt-2 md:mt-4 space-y-6">
                  {/* Basic Example */}
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="basic-usage"
                      title="기본 사용"
                    />
                    <Body>
                      최소한의 정보만 포함한 기본 Footer입니다. 기관명과 주소는
                      필수입니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <div className="w-full bg-gray-5">
                          <Footer
                            organizationName="행정안전부"
                            address="(03171) 서울특별시 종로구 세종대로 209 정부서울청사"
                          />
                        </div>
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`import { Footer } from '@hanui/react';

<Footer
  organizationName="행정안전부"
  address="(03171) 서울특별시 종로구 세종대로 209 정부서울청사"
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* With Contact Info */}
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="contact-info"
                      title="연락처 정보 포함"
                    />
                    <Body>
                      대표전화, 팩스 등 연락처 정보를 추가할 수 있습니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <div className="w-full bg-gray-5">
                          <Footer
                            organizationName="국민건강보험공단"
                            logo="https://via.placeholder.com/120x40?text=Logo"
                            logoAlt="국민건강보험공단 로고"
                            address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
                            contactInfo={[
                              { label: '대표전화', value: '1577-1000' },
                              { label: '팩스', value: '033-811-2000' },
                            ]}
                          />
                        </div>
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`<Footer
  organizationName="국민건강보험공단"
  logo="/logo.svg"
  logoAlt="국민건강보험공단 로고"
  address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
  contactInfo={[
    { label: '대표전화', value: '1577-1000' },
    { label: '팩스', value: '033-811-2000' }
  ]}
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full Featured */}
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="full-featured"
                      title="전체 기능 (권장)"
                    />
                    <Body>
                      관련 사이트, 유틸리티 링크, 소셜 미디어, 푸터 메뉴, 저작권
                      정보를 모두 포함한 완전한 Footer입니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <div className="w-full bg-gray-5">
                          <Footer
                            organizationName="국민건강보험공단"
                            logo="https://via.placeholder.com/120x40?text=NHIS"
                            logoAlt="국민건강보험공단"
                            address="(26464) 강원특별자치도 원주시 건강로 32(반곡동)"
                            contactInfo={[
                              { label: '대표전화', value: '1577-1000' },
                              { label: '팩스', value: '033-811-2000' },
                            ]}
                            quickLinks={[
                              {
                                label: '건강iN',
                                href: 'https://hi.nhis.or.kr',
                              },
                              {
                                label: '사회보험통합징수포털',
                                href: 'https://si4n.nhis.or.kr',
                              },
                              {
                                label: '민원신청',
                                href: 'https://minwon.nhis.or.kr',
                              },
                            ]}
                            utilityLinks={[
                              { label: '오시는 길', href: '#' },
                              { label: '이용안내', href: '#' },
                              { label: '직원찾기', href: '#' },
                            ]}
                            socialLinks={[
                              {
                                platform: 'instagram',
                                href: 'https://instagram.com',
                              },
                              {
                                platform: 'youtube',
                                href: 'https://youtube.com',
                              },
                              {
                                platform: 'facebook',
                                href: 'https://facebook.com',
                              },
                            ]}
                            menuLinks={[
                              { label: '개인정보처리방침', href: '#' },
                              { label: '이용약관', href: '#' },
                              { label: '저작권정책', href: '#' },
                              { label: '웹접근성인증', href: '#' },
                            ]}
                            copyright="Copyright © National Health Insurance Service. All rights reserved."
                          />
                        </div>
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`<Footer
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
    { label: '오시는 길', href: '#' },
    { label: '이용안내', href: '#' }
  ]}
  socialLinks={[
    { platform: 'instagram', href: 'https://instagram.com' },
    { platform: 'youtube', href: 'https://youtube.com' },
    { platform: 'facebook', href: 'https://facebook.com' }
  ]}
  menuLinks={[
    { label: '개인정보처리방침', href: '#' },
    { label: '이용약관', href: '#' }
  ]}
  copyright="Copyright © NHIS. All rights reserved."
/>`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dark Mode */}
                  <div className="space-y-2">
                    <SectionHeading
                      level="h3"
                      id="dark-mode"
                      title="Dark Mode 지원"
                    />
                    <Body>
                      Footer는 자동으로 다크 모드를 지원합니다. 시스템 설정에
                      따라 자동으로 색상이 변경됩니다.
                    </Body>
                    <div>
                      <ComponentPreview>
                        <div className="w-full bg-gray-95 dark">
                          <Footer
                            organizationName="행정안전부"
                            address="(03171) 서울특별시 종로구 세종대로 209"
                            contactInfo={[
                              { label: '대표전화', value: '02-2100-3399' },
                            ]}
                            identifierVariant="dark"
                          />
                        </div>
                      </ComponentPreview>

                      <div className="mt-4">
                        <CodeBlock
                          language="tsx"
                          code={`<Footer
  organizationName="행정안전부"
  address="(03171) 서울특별시 종로구 세종대로 209"
  identifierVariant="dark"
/>`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div>
                <SectionHeading level="h2" id="installation" title="설치" />
                <div className="mt-2 md:mt-4">
                  <CodeBlock language="bash" code={`hanui add footer`} />
                </div>
              </div>

              {/* Guidelines */}
              <div>
                <SectionHeading
                  level="h2"
                  id="guidelines"
                  title="사용 가이드라인"
                />

                <div className="mt-2 md:mt-4 space-y-4">
                  <GuidelineSection title="필수 요소" type="do">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        기관명(organizationName)과 주소(address)는 반드시
                        제공해야 합니다
                      </li>
                      <li>
                        연락처 정보(대표전화, 팩스)를 포함하는 것이 권장됩니다
                      </li>
                      <li>Footer는 페이지 최하단에 배치되어야 합니다</li>
                      <li>
                        운영기관 식별자(Identifier)는 Footer 내 최종 섹션으로
                        자동 포함됩니다
                      </li>
                    </ul>
                  </GuidelineSection>

                  <GuidelineSection title="관련 사이트 (Quick Links)" type="do">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        관련된 정부 서비스나 포털 사이트 링크를 제공합니다
                      </li>
                      <li>
                        토글 버튼으로 펼침/접힘 기능이 자동으로 제공됩니다
                      </li>
                      <li>최대 5-6개 이내로 제한하는 것이 좋습니다</li>
                      <li>모든 외부 링크는 새 탭에서 열립니다</li>
                    </ul>
                  </GuidelineSection>

                  <GuidelineSection title="소셜 미디어 링크" type="do">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        지원되는 플랫폼: Instagram, YouTube, X(Twitter),
                        Facebook, Blog
                      </li>
                      <li>각 플랫폼의 아이콘은 자동으로 제공됩니다</li>
                      <li>실제 운영 중인 소셜 미디어 계정만 포함해야 합니다</li>
                      <li>
                        aria-label이 자동으로 추가되어 접근성이 보장됩니다
                      </li>
                    </ul>
                  </GuidelineSection>

                  <GuidelineSection title="접근성" type="do">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Footer에는 id="krds-footer"가 자동으로 부여됩니다</li>
                      <li>모든 링크는 키보드로 접근 가능합니다</li>
                      <li>
                        스크린 리더 사용자를 위한 적절한 레이블이 제공됩니다
                      </li>
                      <li>충분한 색상 대비(WCAG AA)가 보장됩니다</li>
                    </ul>
                  </GuidelineSection>

                  <GuidelineSection title="피해야 할 사항" type="dont">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>필수 정보(기관명, 주소)를 생략하지 마세요</li>
                      <li>너무 많은 링크로 Footer를 복잡하게 만들지 마세요</li>
                      <li>운영하지 않는 소셜 미디어 계정을 포함하지 마세요</li>
                      <li>Footer를 페이지 중간에 배치하지 마세요</li>
                    </ul>
                  </GuidelineSection>
                </div>
              </div>

              {/* Technical Background */}
              <div>
                <SectionHeading level="h2" id="technical" title="기술 배경" />

                <div className="mt-2 md:mt-4 space-y-4">
                  <div>
                    <SectionHeading
                      level="h3"
                      id="why-css-module"
                      title="왜 CSS Module (SCSS)을 사용했나요?"
                    />
                    <Body>
                      Footer 컴포넌트는 HANUI의 다른 27개 컴포넌트와 달리 CSS
                      Module 방식을 채택했습니다. 그 이유는 다음과 같습니다:
                    </Body>

                    <div className="mt-4 space-y-4">
                      <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                        <SectionHeading
                          level="h4"
                          className="font-semibold mb-2"
                          id="krds-complexity"
                          title="1. KRDS 공식 코드의 복잡성"
                        />
                        <Body className="text-sm">
                          KRDS 정부기관 Footer는{' '}
                          <a
                            href="https://github.com/KRDS-uiux/krds-uiux/blob/main/resources/scss/component/_footer.scss"
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            공식 SCSS 파일
                          </a>
                          이 매우 복잡합니다. 수백 줄의 SCSS 코드에 다음과 같은
                          의존성이 포함되어 있습니다:
                        </Body>
                        <ul className="mt-2 ml-6 text-sm list-disc space-y-1">
                          <li>
                            8개 이상의 커스텀 mixin (@include flex-layout,
                            @include size-large-more 등)
                          </li>
                          <li>
                            복잡한 반응형 미디어 쿼리 (Mobile/Tablet/Desktop)
                          </li>
                          <li>고대비 모드 (High Contrast Mode) 별도 스타일</li>
                          <li>중첩된 그리드 레이아웃과 Flexbox 조합</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-green-500 bg-green-50 p-4">
                        <SectionHeading
                          level="h4"
                          className="font-semibold mb-2"
                          id="tailwind-conversion-cost"
                          title="2. Tailwind 변환의 시간 비용"
                        />
                        <Body className="text-sm">
                          이 복잡한 SCSS를 Tailwind CSS로 완전히 변환하려면:
                        </Body>
                        <ul className="mt-2 ml-6 text-sm list-disc space-y-1">
                          <li>
                            모든 mixin을 수작업으로 인라인 CSS로 풀어야 함
                            (2-3일 소요 예상)
                          </li>
                          <li>
                            KRDS 공식 스타일 100% 재현 보장 어려움 (미묘한 차이
                            발생 가능)
                          </li>
                          <li>
                            반응형 레이아웃의 복잡한 브레이크포인트 로직 재구현
                            필요
                          </li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-purple-500 bg-purple-50 p-4">
                        <SectionHeading
                          level="h4"
                          className="font-semibold mb-2"
                          id="self-contained-css-module"
                          title="3. Self-Contained CSS Module 방식 채택"
                        />
                        <Body className="text-sm">
                          shadcn/ui 철학에 맞춰, 외부 의존성 없이 동작하는
                          방식을 선택했습니다:
                        </Body>
                        <ul className="mt-2 ml-6 text-sm list-disc space-y-1">
                          <li>
                            <strong>Mixin 제거:</strong> KRDS의 모든 mixin을
                            실제 CSS로 변환하여 인라인화
                          </li>
                          <li>
                            <strong>CSS 변수 활용:</strong> globals.css의 KRDS
                            디자인 토큰 (--krds-color-*, --krds-spacing-*) 사용
                          </li>
                          <li>
                            <strong>단일 파일 설치:</strong> footer.tsx +
                            footer.module.scss 2개 파일만으로 완결
                          </li>
                          <li>
                            <strong>sass 의존성:</strong> Next.js SCSS 컴파일을
                            위해 필요한 유일한 의존성
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionHeading
                      level="h3"
                      id="v2-roadmap"
                      title="v2.0 로드맵: Tailwind 마이그레이션"
                    />
                    <Body>
                      장기적으로는 HANUI 전체 컴포넌트와의 일관성을 위해
                      Tailwind 버전으로 전환할 계획입니다:
                    </Body>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>v1.0 (현재):</strong> CSS Module - 빠른 출시,
                          KRDS 100% 재현
                        </li>
                        <li>
                          <strong>v2.0 (향후):</strong> Tailwind All-in-One -
                          디자인 시스템 통합
                        </li>
                        <li>
                          <strong>제공 방식:</strong> 두 버전 모두 registry에서
                          선택 가능
                          <CodeBlock
                            language="bash"
                            code={`# v1 (CSS Module - 기본)
hanui add footer

# v2 (Tailwind - 선택)
hanui add footer@tailwind`}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <SectionHeading
                      level="h3"
                      id="file-structure"
                      title="파일 구조"
                    />
                    <Body>
                      Footer 컴포넌트를 설치하면 다음 파일들이 추가됩니다:
                    </Body>
                    <div className="mt-4">
                      <CodeBlock
                        language="bash"
                        code={`src/
├── components/
│   ├── footer.tsx              # React 컴포넌트
│   ├── footer.module.scss      # KRDS 스타일 (self-contained)
│   └── identifier.tsx          # 의존 컴포넌트 (자동 설치)`}
                      />
                    </div>
                  </div>

                  <div>
                    <SectionHeading
                      level="h3"
                      id="auto-added-on-install"
                      title="설치 시 자동 추가되는 것"
                    />
                    <Body>
                      <code className="px-2 py-1 bg-gray-100 rounded">
                        hanui add footer
                      </code>{' '}
                      실행 시:
                    </Body>
                    <ul className="mt-2 ml-6 list-disc space-y-1 text-sm">
                      <li>
                        <strong>sass</strong> 패키지가 자동으로 설치됩니다 (SCSS
                        컴파일 필요)
                      </li>
                      <li>
                        <strong>identifier</strong> 컴포넌트가 자동으로
                        설치됩니다 (registryDependency)
                      </li>
                      <li>
                        Next.js가 SCSS 파일을 자동으로 처리합니다 (추가 설정
                        불필요)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            {/* API Reference */}
            <div className="space-y-8">
              <div>
                <SectionHeading level="h2" id="api" title="API" />

                <div className="mt-2 md:mt-4 space-y-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Prop
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Default
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            organizationName
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm">-</td>
                          <td className="px-6 py-4 text-sm">기관명 (필수)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            address
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm">-</td>
                          <td className="px-6 py-4 text-sm">
                            기관 주소 (필수)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            logo
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            string | ReactElement
                          </td>
                          <td className="px-6 py-4 text-sm">-</td>
                          <td className="px-6 py-4 text-sm">
                            기관 로고 (이미지 URL 또는 커스텀 엘리먼트)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            logoAlt
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm">-</td>
                          <td className="px-6 py-4 text-sm">
                            로고 alt 텍스트 (logo가 string일 때 필수)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            contactInfo
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            FooterInfoItem[]
                          </td>
                          <td className="px-6 py-4 text-sm">[]</td>
                          <td className="px-6 py-4 text-sm">
                            연락처 정보 (대표전화, 팩스 등)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            quickLinks
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            FooterQuickLink[]
                          </td>
                          <td className="px-6 py-4 text-sm">[]</td>
                          <td className="px-6 py-4 text-sm">
                            관련 사이트 링크 목록
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            utilityLinks
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            FooterLink[]
                          </td>
                          <td className="px-6 py-4 text-sm">[]</td>
                          <td className="px-6 py-4 text-sm">
                            유틸리티 링크 (오시는 길, 이용안내 등)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            socialLinks
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            FooterSocialLink[]
                          </td>
                          <td className="px-6 py-4 text-sm">[]</td>
                          <td className="px-6 py-4 text-sm">
                            소셜 미디어 링크
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            menuLinks
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            FooterLink[]
                          </td>
                          <td className="px-6 py-4 text-sm">[]</td>
                          <td className="px-6 py-4 text-sm">
                            푸터 메뉴 (개인정보처리방침 등)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            copyright
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm">-</td>
                          <td className="px-6 py-4 text-sm">저작권 텍스트</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            showIdentifier
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            boolean
                          </td>
                          <td className="px-6 py-4 text-sm">true</td>
                          <td className="px-6 py-4 text-sm">
                            운영기관 식별자 표시 여부
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm font-mono text-blue-600">
                            identifierVariant
                          </td>
                          <td className="px-6 py-4 text-sm font-mono">
                            &apos;light&apos; | &apos;dark&apos;
                          </td>
                          <td className="px-6 py-4 text-sm">
                            &apos;light&apos;
                          </td>
                          <td className="px-6 py-4 text-sm">식별자 테마</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Types */}
              <div>
                <SectionHeading level="h2" id="types" title="Types" />

                <div className="mt-2 md:mt-4">
                  <CodeBlock
                    language="tsx"
                    code={`interface FooterQuickLink {
  label: string;
  href: string;
}

interface FooterInfoItem {
  label: string;
  value: string;
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSocialLink {
  platform: 'instagram' | 'youtube' | 'x' | 'facebook' | 'blog';
  href: string;
  label?: string;
}`}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </>
  );
}
