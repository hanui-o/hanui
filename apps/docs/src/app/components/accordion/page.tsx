'use client';

// Docs layout components
import {
  PageSection as Section,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';
import { ComponentPreview } from '@/components/content/ComponentPreview';

// UI components - from @hanui/react
import {
  Code,
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
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@hanui/react';

export default function AccordionPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Accordion"
        description="접었다 펼칠 수 있는 콘텐츠 섹션 컴포넌트"
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>접근성이란 무엇인가요?</AccordionTrigger>
                  <AccordionContent>
                    접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게 이용할 수
                    있도록 보장하는 것입니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>KRDS는 무엇인가요?</AccordionTrigger>
                  <AccordionContent>
                    KRDS는 대한민국 정부 웹사이트의 일관된 사용자 경험을
                    제공하기 위한 디자인 시스템입니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>접근성이란 무엇인가요?</AccordionTrigger>
    <AccordionContent>
      접근성은 모든 사람이 웹 콘텐츠와 서비스를 동등하게...
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>KRDS는 무엇인가요?</AccordionTrigger>
    <AccordionContent>
      KRDS는 대한민국 정부 웹사이트의 일관된 사용자 경험을...
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            </Code>
          </Section>

          <Section level="h2">
            <Installation componentName="accordion" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/hanui/accordion'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>제목</AccordionTrigger>
    <AccordionContent>내용</AccordionContent>
  </AccordionItem>
</Accordion>`}
            </Code>
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Type" />
              <ComponentPreview className="max-w-full">
                <div className="flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Single (한 번에 하나만 열기)
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>개인정보</AccordionTrigger>
                        <AccordionContent>
                          이름, 이메일, 전화번호 등을 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>보안 설정</AccordionTrigger>
                        <AccordionContent>
                          비밀번호 변경, 2단계 인증 등을 설정합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>알림 설정</AccordionTrigger>
                        <AccordionContent>
                          이메일 및 푸시 알림 수신 여부를 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Multiple (여러 개 동시 열기)
                    </div>
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>개인정보</AccordionTrigger>
                        <AccordionContent>
                          이름, 이메일, 전화번호 등을 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>보안 설정</AccordionTrigger>
                        <AccordionContent>
                          비밀번호 변경, 2단계 인증 등을 설정합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>알림 설정</AccordionTrigger>
                        <AccordionContent>
                          이메일 및 푸시 알림 수신 여부를 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Single: 한 번에 하나의 패널만 열림
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>개인정보</AccordionTrigger>
    <AccordionContent>이름, 이메일, 전화번호 등을 관리합니다.</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>

// Multiple: 여러 패널을 동시에 열 수 있음
<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>개인정보</AccordionTrigger>
    <AccordionContent>이름, 이메일, 전화번호 등을 관리합니다.</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview className="max-w-full">
                <div className="flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Default (박스형)
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>배송 정책</AccordionTrigger>
                        <AccordionContent>
                          국내 배송은 주문 후 2-3일 소요되며, 50,000원 이상 구매
                          시 무료배송입니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>환불 정책</AccordionTrigger>
                        <AccordionContent>
                          제품 수령 후 7일 이내 미개봉 상태에서 환불이
                          가능합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Line (구분선형)
                    </div>
                    <Accordion
                      type="single"
                      collapsible
                      variant="line"
                      className="w-full"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>배송 정책</AccordionTrigger>
                        <AccordionContent>
                          국내 배송은 주문 후 2-3일 소요되며, 50,000원 이상 구매
                          시 무료배송입니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>환불 정책</AccordionTrigger>
                        <AccordionContent>
                          제품 수령 후 7일 이내 미개봉 상태에서 환불이
                          가능합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Default: 박스형 스타일
<Accordion type="single" collapsible variant="default">
  <AccordionItem value="item-1">
    <AccordionTrigger>배송 정책</AccordionTrigger>
    <AccordionContent>국내 배송은 주문 후 2-3일 소요되며...</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>

// Line: 구분선형 스타일
<Accordion type="single" collapsible variant="line">
  <AccordionItem value="item-1">
    <AccordionTrigger>배송 정책</AccordionTrigger>
    <AccordionContent>국내 배송은 주문 후 2-3일 소요되며...</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Collapsible" />
              <ComponentPreview className="max-w-full">
                <div className="flex flex-col gap-6 w-full">
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      collapsible=true (열린 패널을 다시 닫을 수 있음)
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>개인정보</AccordionTrigger>
                        <AccordionContent>
                          이름, 이메일, 전화번호 등을 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>보안 설정</AccordionTrigger>
                        <AccordionContent>
                          비밀번호 변경, 2단계 인증 등을 설정합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      collapsible=false (항상 하나가 열려 있음)
                    </div>
                    <Accordion
                      type="single"
                      collapsible={false}
                      defaultValue="item-1"
                      className="w-full"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>개인정보</AccordionTrigger>
                        <AccordionContent>
                          이름, 이메일, 전화번호 등을 관리합니다.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>보안 설정</AccordionTrigger>
                        <AccordionContent>
                          비밀번호 변경, 2단계 인증 등을 설정합니다.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// collapsible=true: 열린 패널을 다시 클릭하면 닫힘
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>개인정보</AccordionTrigger>
    <AccordionContent>이름, 이메일, 전화번호 등을 관리합니다.</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>

// collapsible=false: 항상 하나의 패널이 열려 있어야 함
<Accordion type="single" collapsible={false} defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>개인정보</AccordionTrigger>
    <AccordionContent>이름, 이메일, 전화번호 등을 관리합니다.</AccordionContent>
  </AccordionItem>
  {/* ... */}
</Accordion>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Default Value" />
              <ComponentPreview>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="item-2"
                  className="w-full"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Step 1: 계정 생성</AccordionTrigger>
                    <AccordionContent>
                      이메일과 비밀번호로 계정을 생성합니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Step 2: 프로필 작성</AccordionTrigger>
                    <AccordionContent>
                      이름, 프로필 사진, 자기소개를 입력합니다.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Step 3: 인증 완료</AccordionTrigger>
                    <AccordionContent>
                      이메일 인증을 완료하면 서비스 이용이 가능합니다.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Accordion type="single" collapsible defaultValue="item-2">
  <AccordionItem value="item-1">
    <AccordionTrigger>Step 1: 계정 생성</AccordionTrigger>
    <AccordionContent>이메일과 비밀번호로 계정을 생성합니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Step 2: 프로필 작성</AccordionTrigger>
    <AccordionContent>이름, 프로필 사진, 자기소개를 입력합니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Step 3: 인증 완료</AccordionTrigger>
    <AccordionContent>이메일 인증을 완료하면 서비스 이용이 가능합니다.</AccordionContent>
  </AccordionItem>
</Accordion>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Accordion" />
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
                    <TableCell className="font-mono">
                      <Code>type</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'single' | 'multiple'</Code>
                    </TableCell>
                    <TableCell>'single'</TableCell>
                    <TableCell>
                      단일(single) 또는 다중(multiple) 패널 열기
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>collapsible</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      열린 패널을 다시 닫을 수 있는지 (type="single"일 때만)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>defaultValue</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | string[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>기본으로 열릴 패널의 value</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string | string[]</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>제어 모드: 열린 패널의 value</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onValueChange</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: string | string[]) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>패널이 열리거나 닫힐 때 호출되는 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">'default' | 'line'</Code>
                    </TableCell>
                    <TableCell>'default'</TableCell>
                    <TableCell>
                      스타일 변형 (default: 박스형, line: 구분선)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="AccordionItem" />
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
                    <TableCell className="font-mono">
                      <Code>value</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>패널을 식별하는 고유 값 (required)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="AccordionTrigger" />
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
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>비활성화 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="AccordionContent" />
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
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>추가 CSS 클래스</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Overview', href: '/components' }}
        next={{ title: 'Body', href: '/components/body' }}
      />
    </>
  );
}
