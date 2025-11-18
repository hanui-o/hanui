import { Footer, Stack, Heading, Body } from '@hanui/react';
import { CodeBlock } from '@/components/content/CodeBlock';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function FooterPage() {
  return (
    <>
      {/* Header */}
      <PageHeader
        title="Footer (정부기관 푸터)"
        description="KRDS 표준을 따르는 정부기관 웹사이트 푸터 레이아웃입니다. 기관 정보, 연락처, 관련 링크, 소셜 미디어, 그리고 운영기관 식별자를 포함합니다."
      />

      {/* Usage Examples */}
      <PageSection>
        <Heading level="h2" id="examples" className="text-2xl font-semibold">
          예제
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본 사용</Heading>
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
          </Stack>

          {/* With Contact Info */}
          <Stack spacing="heading-tight">
            <Heading level="h3">연락처 정보 포함</Heading>
            <Body>대표전화, 팩스 등 연락처 정보를 추가할 수 있습니다.</Body>
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
          </Stack>

          {/* Full Featured */}
          <Stack spacing="heading-tight">
            <Heading level="h3">전체 기능 (권장)</Heading>
            <Body>
              관련 사이트, 유틸리티 링크, 소셜 미디어, 푸터 메뉴, 저작권 정보를
              모두 포함한 완전한 Footer입니다.
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
                      { label: '건강iN', href: 'https://hi.nhis.or.kr' },
                      {
                        label: '사회보험통합징수포털',
                        href: 'https://si4n.nhis.or.kr',
                      },
                      { label: '민원신청', href: 'https://minwon.nhis.or.kr' },
                    ]}
                    utilityLinks={[
                      { label: '오시는 길', href: '#' },
                      { label: '이용안내', href: '#' },
                      { label: '직원찾기', href: '#' },
                    ]}
                    socialLinks={[
                      { platform: 'instagram', href: 'https://instagram.com' },
                      { platform: 'youtube', href: 'https://youtube.com' },
                      { platform: 'facebook', href: 'https://facebook.com' },
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
          </Stack>

          {/* Dark Mode */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Dark Mode 지원</Heading>
            <Body>
              Footer는 자동으로 다크 모드를 지원합니다. 시스템 설정에 따라
              자동으로 색상이 변경됩니다.
            </Body>
            <div>
              <ComponentPreview>
                <div className="w-full bg-gray-95 dark">
                  <Footer
                    organizationName="행정안전부"
                    address="(03171) 서울특별시 종로구 세종대로 209"
                    contactInfo={[{ label: '대표전화', value: '02-2100-3399' }]}
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
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Heading level="h2" id="guidelines" className="text-2xl font-semibold">
          사용 가이드라인
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <GuidelineSection
            title="필수 요소"
            type="do"
            items={[
              '기관명(organizationName)과 주소(address)는 반드시 제공해야 합니다',
              '연락처 정보(대표전화, 팩스)를 포함하는 것이 권장됩니다',
              'Footer는 페이지 최하단에 배치되어야 합니다',
              '운영기관 식별자(Identifier)는 Footer 내 최종 섹션으로 자동 포함됩니다',
            ]}
          />

          <GuidelineSection
            title="관련 사이트 (Quick Links)"
            type="do"
            items={[
              '관련된 정부 서비스나 포털 사이트 링크를 제공합니다',
              '토글 버튼으로 펼침/접힘 기능이 자동으로 제공됩니다',
              '최대 5-6개 이내로 제한하는 것이 좋습니다',
              '모든 외부 링크는 새 탭에서 열립니다',
            ]}
          />

          <GuidelineSection
            title="소셜 미디어 링크"
            type="do"
            items={[
              '지원되는 플랫폼: Instagram, YouTube, X(Twitter), Facebook, Blog',
              '각 플랫폼의 아이콘은 자동으로 제공됩니다',
              '실제 운영 중인 소셜 미디어 계정만 포함해야 합니다',
              'aria-label이 자동으로 추가되어 접근성이 보장됩니다',
            ]}
          />

          <GuidelineSection
            title="접근성"
            type="do"
            items={[
              'Footer에는 id="krds-footer"가 자동으로 부여됩니다',
              '모든 링크는 키보드로 접근 가능합니다',
              '스크린 리더 사용자를 위한 적절한 레이블이 제공됩니다',
              '충분한 색상 대비(WCAG AA)가 보장됩니다',
            ]}
          />

          <GuidelineSection
            title="피해야 할 사항"
            type="dont"
            items={[
              '필수 정보(기관명, 주소)를 생략하지 마세요',
              '너무 많은 링크로 Footer를 복잡하게 만들지 마세요',
              '운영하지 않는 소셜 미디어 계정을 포함하지 마세요',
              'Footer를 페이지 중간에 배치하지 마세요',
            ]}
          />
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Heading level="h2" id="api" className="text-2xl font-semibold">
          API
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
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
                  <td className="px-6 py-4 text-sm font-mono">string</td>
                  <td className="px-6 py-4 text-sm">-</td>
                  <td className="px-6 py-4 text-sm">기관명 (필수)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    address
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">string</td>
                  <td className="px-6 py-4 text-sm">-</td>
                  <td className="px-6 py-4 text-sm">기관 주소 (필수)</td>
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
                  <td className="px-6 py-4 text-sm font-mono">string</td>
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
                  <td className="px-6 py-4 text-sm">관련 사이트 링크 목록</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    utilityLinks
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">FooterLink[]</td>
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
                  <td className="px-6 py-4 text-sm">소셜 미디어 링크</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    menuLinks
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">FooterLink[]</td>
                  <td className="px-6 py-4 text-sm">[]</td>
                  <td className="px-6 py-4 text-sm">
                    푸터 메뉴 (개인정보처리방침 등)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    copyright
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">string</td>
                  <td className="px-6 py-4 text-sm">-</td>
                  <td className="px-6 py-4 text-sm">저작권 텍스트</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600">
                    showIdentifier
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">boolean</td>
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
                  <td className="px-6 py-4 text-sm">&apos;light&apos;</td>
                  <td className="px-6 py-4 text-sm">식별자 테마</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Stack>
      </PageSection>

      {/* Types */}
      <PageSection>
        <Heading level="h2" id="types" className="text-2xl font-semibold">
          Types
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <div>
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
        </Stack>
      </PageSection>
    </>
  );
}
