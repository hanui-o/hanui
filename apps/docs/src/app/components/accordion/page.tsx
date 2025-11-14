'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Stack,
  Heading,
  Body,
  Card,
  CardBody,
} from '@hanui/react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { Installation } from '@/components/content/Installation';
import { GuidelineSection } from '@/components/content/GuidelineSection';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

export default function AccordionPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Accordion (아코디언)"
        description="관련된 여러 콘텐츠 섹션을 하나의 페이지에서 확인하고, 헤더를 선택하여 하위 콘텐츠를 표시하거나 숨길 수 있는 컴포넌트입니다."
      />

      {/* Installation */}
      <PageSection>
        <Installation componentName="Accordion" />
      </PageSection>

      {/* Usage Examples */}
      <PageSection>
        <Heading level="h2" className="text-2xl font-semibold">
          사용 예시
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Basic Example */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본 사용</Heading>
            <Body>
              기본 Accordion은 한 번에 하나의 패널만 열 수
              있으며(type=&quot;single&quot;), collapsible을 true로 설정하면
              열린 패널을 다시 닫을 수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>
                        접근성이란 무엇인가요?
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게
                        이용할 수 있도록 보장하는 것입니다. 이는 장애가 있는
                        사람뿐만 아니라 노인, 일시적 장애가 있는 사람 등 모든
                        사용자에게 중요합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>KRDS는 무엇인가요?</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        KRDS(Korean Government Design System)는 대한민국 정부
                        웹사이트의 일관된 사용자 경험을 제공하기 위한 디자인
                        시스템입니다. WCAG 2.1과 KWCAG 2.2 표준을 준수합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>
                        시맨틱 HTML이 왜 중요한가요?
                      </AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        시맨틱 HTML은 스크린 리더 사용자가 페이지 구조를 빠르게
                        파악하고 원하는 섹션으로 쉽게 이동할 수 있게 합니다.
                        제목 태그(h1-h6)는 문서 계층 구조를 나타냅니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>접근성이란 무엇인가요?</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게...</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                />
              </div>
            </div>
          </Stack>

          {/* Multiple Open */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Multiple Open</Heading>
            <Body>
              type=&quot;multiple&quot;로 설정하면 여러 패널을 동시에 열 수
              있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>개인정보</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이름, 이메일, 전화번호 등을 관리합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>보안 설정</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>비밀번호 변경, 2단계 인증 등을 설정합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>알림 설정</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이메일 및 푸시 알림 수신 여부를 관리합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`<Accordion type="multiple">
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>개인정보</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>이름, 이메일, 전화번호 등을 관리합니다.</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                />
              </div>
            </div>
          </Stack>

          {/* Line Variant */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Line Variant</Heading>
            <Body>
              variant=&quot;line&quot;으로 설정하면 구분선 스타일로 표시됩니다.
            </Body>
            <div>
              <ComponentPreview>
                <Accordion
                  type="single"
                  collapsible
                  variant="line"
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>배송 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        국내 배송은 주문 후 2-3일 소요되며, 50,000원 이상 구매
                        시 무료배송입니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>환불 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        제품 수령 후 7일 이내 미개봉 상태에서 환불이 가능합니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>교환 정책</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>
                        불량 제품인 경우 무상으로 교환해드리며, 단순 변심인 경우
                        배송비가 발생할 수 있습니다.
                      </Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`<Accordion type="single" collapsible variant="line">
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>배송 정책</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>국내 배송은 주문 후 2-3일 소요되며...</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                />
              </div>
            </div>
          </Stack>

          {/* Default Value */}
          <Stack spacing="heading-tight">
            <Heading level="h3">기본값</Heading>
            <Body>defaultValue로 초기에 열릴 패널을 지정할 수 있습니다.</Body>
            <div>
              <ComponentPreview>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-2"
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>Step 1: 회원가입</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이메일과 비밀번호로 계정을 생성합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>Step 2: 프로필 작성</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>이름, 프로필 사진, 자기소개를 입력합니다.</Body>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <h3>
                      <AccordionTrigger>Step 3: 이용 시작</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Body>모든 기능을 자유롭게 이용할 수 있습니다.</Body>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`<Accordion type="single" collapsible defaultValue="item-2">
  <AccordionItem value="item-2">
    <h3>
      <AccordionTrigger>Step 2: 프로필 작성</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Body>이름, 프로필 사진, 자기소개를 입력합니다.</Body>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                />
              </div>
            </div>
          </Stack>

          {/* With Cards */}
          <Stack spacing="heading-tight">
            <Heading level="h3">카드와 함께 사용</Heading>
            <Body>
              AccordionContent 내부에 Card를 사용하여 구조화된 콘텐츠를 표시할
              수 있습니다.
            </Body>
            <div>
              <ComponentPreview>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <h3>
                      <AccordionTrigger>Basic Plan</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Card>
                        <CardBody>
                          <Stack spacing="content-tight">
                            <Heading level="h4">월 9,900원</Heading>
                            <Body>
                              • 개인 사용자 1명
                              <br />
                              • 스토리지 10GB
                              <br />
                              • 이메일 지원
                              <br />
                            </Body>
                          </Stack>
                        </CardBody>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <h3>
                      <AccordionTrigger>Pro Plan</AccordionTrigger>
                    </h3>
                    <AccordionContent>
                      <Card>
                        <CardBody>
                          <Stack spacing="content-tight">
                            <Heading level="h4">월 29,900원</Heading>
                            <Body>
                              • 팀원 10명
                              <br />
                              • 스토리지 100GB
                              <br />
                              • 우선 지원
                              <br />
                            </Body>
                          </Stack>
                        </CardBody>
                      </Card>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>

              <div className="mt-4">
                <CodeBlock
                  language="tsx"
                  code={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <h3>
      <AccordionTrigger>Basic Plan</AccordionTrigger>
    </h3>
    <AccordionContent>
      <Card>
        <CardBody>
          <Stack spacing="content-tight">
            <Heading level="h4">월 9,900원</Heading>
            <Body>• 개인 사용자 1명...</Body>
          </Stack>
        </CardBody>
      </Card>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Guidelines */}
      <PageSection>
        <Heading level="h2" className="text-2xl font-semibold">
          사용 가이드
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* When to use */}
          <Stack spacing="heading-tight">
            <Heading level="h3">언제 사용해야 하나요?</Heading>

            <div className="grid grid-cols-1 gap-4">
              <GuidelineSection
                type="do"
                title="Accordion을 사용하기 적합한 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>모바일 화면이나 사이드 패널</strong> - 제한된
                    공간에서 여러 섹션을 표시할 때
                  </li>
                  <li>
                    <strong>부분적인 정보 확인</strong> - 사용자가 여러 섹션 중
                    필요한 부분만 확인하면 될 때
                  </li>
                  <li>
                    <strong>개요 비교</strong> - 관련된 여러 섹션의 개요를
                    빠르게 비교해야 할 때
                  </li>
                  <li>
                    <strong>FAQ, 정책 문서</strong> - 여러 질문이나 항목을
                    카테고리별로 정리할 때
                  </li>
                </ul>
              </GuidelineSection>

              <GuidelineSection
                type="dont"
                title="Accordion을 사용하지 말아야 하는 경우"
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>중요한 정보</strong> - 사용자가 반드시 검토해야 하는
                    중요 콘텐츠는 직접 표시
                  </li>
                  <li>
                    <strong>중첩 구조</strong> - 이미 아코디언이나 탭이 있는
                    곳에 추가하면 인지 부하 증가
                  </li>
                  <li>
                    <strong>복잡하고 긴 콘텐츠</strong> - 로딩 지연이 발생하는
                    무거운 콘텐츠
                  </li>
                  <li>
                    <strong>매우 간단한 콘텐츠</strong> - 일반 제목만으로도
                    충분히 구조화할 수 있는 경우
                  </li>
                </ul>
              </GuidelineSection>
            </div>
          </Stack>

          {/* Accessibility */}
          <Stack spacing="heading-tight">
            <Heading level="h3">접근성</Heading>
            <Body>KRDS 및 WCAG 2.1 접근성 기준을 준수합니다:</Body>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>시맨틱 제목 구조</strong> - AccordionTrigger를 h1-h6로
                감싸서 스크린 리더 사용자가 빠르게 탐색 가능
              </li>
              <li>
                <strong>버튼 역할</strong> - 헤더에 button 요소 사용으로
                상호작용 목적 명확화
              </li>
              <li>
                <strong>상태 정보</strong> - aria-expanded로 펼침/접힘 상태 전달
              </li>
              <li>
                <strong>키보드 네비게이션</strong> - Tab/Shift+Tab으로 헤더 간
                이동, Enter/Space로 토글
              </li>
              <li>
                <strong>시각적 방향성</strong> - 아이콘으로 펼침(∨)/접힘(∧) 방향
                표시
              </li>
              <li>
                <strong>포커스 가시성</strong> - focus-visible로 키보드 포커스
                링 표시
              </li>
            </ul>
          </Stack>

          {/* Usability */}
          <Stack spacing="heading-tight">
            <Heading level="h3">사용성 권장사항</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>아이콘 위치 일관성</strong> - 아이콘을 헤더 끝에
                일관되게 배치하여 시선 피로 감소
              </li>
              <li>
                <strong>전체 헤더 클릭</strong> - 헤더 전체 영역을 클릭 가능하게
                만들어 상호작용 난이도 감소
              </li>
              <li>
                <strong>시각적 연관성</strong> - 간격, 색상, 그림자, 테두리로
                헤더-패널 관계 명확화
              </li>
              <li>
                <strong>패널 스크롤 방지</strong> - 패널 내부에 별도 스크롤바를
                만들지 말고 페이지 스크롤 사용
              </li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Heading level="h2" className="text-2xl font-semibold">
          API Reference
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Accordion Props */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Accordion Props</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">type</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;single&quot; | &quot;multiple&quot;
                    </td>
                    <td className="py-2 px-4 font-mono">&quot;single&quot;</td>
                    <td className="py-2 px-4">
                      한 번에 하나만 열기(single) 또는 여러 개 열기(multiple)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">collapsible</td>
                    <td className="py-2 px-4 font-mono">boolean</td>
                    <td className="py-2 px-4 font-mono">false</td>
                    <td className="py-2 px-4">
                      열린 패널을 다시 닫을 수 있는지 (type=&quot;single&quot;일
                      때만)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">defaultValue</td>
                    <td className="py-2 px-4 font-mono">string | string[]</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">기본으로 열릴 패널의 value</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">value</td>
                    <td className="py-2 px-4 font-mono">string | string[]</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      제어 모드: 열린 패널의 value (controlled)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">onValueChange</td>
                    <td className="py-2 px-4 font-mono">
                      (value: string | string[]) =&gt; void
                    </td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      패널이 열리거나 닫힐 때 호출되는 콜백
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">variant</td>
                    <td className="py-2 px-4 font-mono">
                      &quot;default&quot; | &quot;line&quot;
                    </td>
                    <td className="py-2 px-4 font-mono">&quot;default&quot;</td>
                    <td className="py-2 px-4">
                      스타일 변형 (default: 박스형, line: 구분선)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* AccordionItem Props */}
          <Stack spacing="heading-tight">
            <Heading level="h3">AccordionItem Props</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">value</td>
                    <td className="py-2 px-4 font-mono">string</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">
                      패널을 식별하는 고유 값 (required)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* AccordionTrigger Props */}
          <Stack spacing="heading-tight">
            <Heading level="h3">AccordionTrigger Props</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">Prop</th>
                    <th className="text-left py-2 px-4">Type</th>
                    <th className="text-left py-2 px-4">Default</th>
                    <th className="text-left py-2 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">disabled</td>
                    <td className="py-2 px-4 font-mono">boolean</td>
                    <td className="py-2 px-4">-</td>
                    <td className="py-2 px-4">비활성화 여부</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Body className="mt-2">
              <strong>중요:</strong> KRDS 접근성을 위해 AccordionTrigger는
              반드시 시맨틱 제목 태그(h1-h6)로 감싸야 합니다.
            </Body>
            <div className="mt-2">
              <CodeBlock
                language="tsx"
                code={`<h3>
  <AccordionTrigger>제목</AccordionTrigger>
</h3>`}
              />
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Heading level="h2" className="text-2xl font-semibold">
          Foundation Layer
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Accordion 컴포넌트는 Foundation Layer 아키텍처를 통해 개발자가 직접
            관리하지 않아도 KRDS 접근성 기준을 자동으로 충족합니다:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">1. ARIA Automation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>aria-expanded</strong>: 패널의 펼침/접힘 상태 자동 관리
              </li>
              <li>
                <strong>aria-controls</strong>: 버튼과 패널의 연결 관계 자동
                설정
              </li>
              <li>
                <strong>aria-labelledby</strong>: 패널이 어떤 헤더에 속하는지
                자동 설정
              </li>
              <li>고유 ID 자동 생성으로 ARIA 속성 충돌 방지</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. Keyboard Navigation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Tab / Shift+Tab</strong>: 아코디언 헤더 간 순차적 접근
              </li>
              <li>
                <strong>Enter / Space</strong>: 패널 토글 (포커스는 헤더에 유지)
              </li>
              <li>버튼 요소 사용으로 네이티브 키보드 지원</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. Semantic Heading Structure</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>AccordionTrigger를 h1-h6로 감싸서 문서 계층 구조 표현</li>
              <li>
                스크린 리더 사용자가 헤딩 목록으로 빠르게 원하는 섹션으로 이동
                가능
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. Visual Direction</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>아이콘이 펼침/접힘 상태에 따라 자동 회전 (∨ ↔ ∧)</li>
              <li>색상만으로 상태를 구별하지 않음 (KRDS 색상 독립성 준수)</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
