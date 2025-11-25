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
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Button,
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
} from '@hanui/react';

export default function CardPage() {
  return (
    <>
      <Heading
        level="h1"
        title="Card"
        description="관련 콘텐츠를 그룹화하여 표시하는 유연한 컨테이너 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>카드 제목</CardTitle>
                  <CardDescription>
                    카드에 대한 간단한 설명입니다.
                  </CardDescription>
                </CardHeader>
                <CardBody>
                  <p className="text-[15px] text-krds-gray-90">
                    카드의 주요 콘텐츠가 여기에 들어갑니다.
                  </p>
                </CardBody>
                <CardFooter>
                  <Button size="sm">확인</Button>
                  <Button size="sm" variant="outline">
                    취소
                  </Button>
                </CardFooter>
              </Card>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
  </CardHeader>
  <CardBody>
    <p>카드의 주요 콘텐츠가 여기에 들어갑니다.</p>
  </CardBody>
  <CardFooter>
    <Button size="sm">확인</Button>
    <Button size="sm" variant="outline">취소</Button>
  </CardFooter>
</Card>`}
            </Code>
          </Section>

          {/* 설치 */}
          <Section level="h2">
            <Installation componentName="card" />
          </Section>

          {/* 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from '@/components/hanui/card'

<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드 설명</CardDescription>
  </CardHeader>
  <CardBody>
    <p>카드 내용</p>
  </CardBody>
  <CardFooter>
    <Button>액션</Button>
  </CardFooter>
</Card>`}
            </Code>
          </Section>

          {/* 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Variant */}
            <Subsection level="h3">
              <Heading level="h3" title="Variant" />
              <ComponentPreview>
                <div className="grid grid-cols-2 gap-6">
                  <Card variant="outlined">
                    <CardHeader>
                      <CardTitle as="h4">Outlined</CardTitle>
                      <CardDescription>기본 테두리 스타일</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        가장 기본적인 카드 스타일입니다. 테두리만 있고 그림자나
                        배경색이 없어 깔끔한 느낌을 줍니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        일반적인 콘텐츠 그룹화에 적합합니다.
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="shadow">
                    <CardHeader>
                      <CardTitle as="h4">Shadow</CardTitle>
                      <CardDescription>그림자 + 테두리</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        은은한 그림자가 있는 카드입니다. 적당한 깊이감을
                        표현하여 콘텐츠를 돋보이게 합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        중요한 정보를 강조할 때 사용합니다.
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="filled">
                    <CardHeader>
                      <CardTitle as="h4">Filled</CardTitle>
                      <CardDescription>배경색 스타일</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        배경색이 있는 카드입니다. 부드러운 배경색으로 콘텐츠
                        영역을 명확히 구분합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        섹션 구분이 필요할 때 유용합니다.
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle as="h4">Elevated</CardTitle>
                      <CardDescription>강조된 그림자</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        강한 그림자로 강조된 카드입니다. 높은 깊이감으로 시선을
                        집중시킵니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        가장 중요한 콘텐츠를 표시할 때 사용합니다.
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Card variant="outlined">
  <CardHeader>
    <CardTitle>Outlined</CardTitle>
    <CardDescription>기본 테두리 스타일</CardDescription>
  </CardHeader>
  <CardBody>
    <p>가장 기본적인 카드 스타일입니다.</p>
  </CardBody>
</Card>

<Card variant="shadow">
  <CardHeader>
    <CardTitle>Shadow</CardTitle>
    <CardDescription>그림자 + 테두리</CardDescription>
  </CardHeader>
  <CardBody>
    <p>은은한 그림자가 있는 카드입니다.</p>
  </CardBody>
</Card>`}
              </Code>
            </Subsection>

            {/* Semantic Variants */}
            <Subsection level="h3">
              <Heading level="h3" title="Semantic Variants" />
              <ComponentPreview>
                <div className="grid grid-cols-2 gap-6">
                  <Card variant="info">
                    <CardHeader>
                      <CardTitle as="h4">정보</CardTitle>
                      <CardDescription>일반 알림</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        일반적인 정보나 도움말을 제공할 때 사용합니다.
                        사용자에게 참고 사항을 안내하는데 적합합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        예: 시스템 공지, 기능 안내
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="success">
                    <CardHeader>
                      <CardTitle as="h4">성공</CardTitle>
                      <CardDescription>작업 완료</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        성공적인 작업 완료를 표시합니다. 긍정적인 결과를
                        사용자에게 알릴 때 사용합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        예: 저장 성공, 전송 완료
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="warning">
                    <CardHeader>
                      <CardTitle as="h4">경고</CardTitle>
                      <CardDescription>주의 필요</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        주의가 필요한 정보를 표시합니다. 사용자의 주의를
                        환기시켜야 하는 상황에 사용합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        예: 삭제 전 확인, 중요 변경사항
                      </p>
                    </CardBody>
                  </Card>
                  <Card variant="error">
                    <CardHeader>
                      <CardTitle as="h4">오류</CardTitle>
                      <CardDescription>실패 상태</CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        오류나 실패 상태를 표시합니다. 문제가 발생했음을 명확히
                        전달할 때 사용합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        예: 검증 실패, 서버 오류
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Card variant="info">
  <CardHeader>
    <CardTitle>정보</CardTitle>
  </CardHeader>
  <CardBody>
    <p>일반적인 정보나 도움말에 사용합니다.</p>
  </CardBody>
</Card>

<Card variant="success">
  <CardHeader>
    <CardTitle>성공</CardTitle>
  </CardHeader>
  <CardBody>
    <p>성공적인 작업 완료를 표시합니다.</p>
  </CardBody>
</Card>`}
              </Code>
            </Subsection>

            {/* Padding */}
            <Subsection level="h3">
              <Heading level="h3" title="Padding" />
              <ComponentPreview>
                <div className="space-y-6">
                  <Card padding="none">
                    <div className="p-4 bg-krds-gray-10">
                      <CardHeader>
                        <CardTitle as="h4">Padding: none (0px)</CardTitle>
                        <CardDescription>
                          내부 여백이 없어 커스텀 레이아웃에 적합
                        </CardDescription>
                      </CardHeader>
                      <CardBody>
                        <p className="text-[15px] text-krds-gray-90">
                          이미지나 커스텀 콘텐츠를 카드 전체에 배치할 때
                          사용합니다.
                        </p>
                      </CardBody>
                    </div>
                  </Card>
                  <Card padding="sm">
                    <CardHeader>
                      <CardTitle as="h4">Padding: sm (16px)</CardTitle>
                      <CardDescription>
                        작은 여백으로 콤팩트한 디자인
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90">
                        공간이 제한적이거나 여러 카드를 밀집하게 배치할 때
                        적합합니다.
                      </p>
                    </CardBody>
                  </Card>
                  <Card padding="md">
                    <CardHeader>
                      <CardTitle as="h4">Padding: md (24px)</CardTitle>
                      <CardDescription>
                        표준 여백으로 가장 많이 사용
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90">
                        일반적인 콘텐츠 카드에 적합한 기본 패딩값입니다.
                      </p>
                    </CardBody>
                  </Card>
                  <Card padding="lg">
                    <CardHeader>
                      <CardTitle as="h4">Padding: lg (32px)</CardTitle>
                      <CardDescription>
                        넓은 여백으로 여유로운 레이아웃
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90">
                        중요한 콘텐츠를 강조하거나 시각적 여유를 줄 때
                        사용합니다.
                      </p>
                    </CardBody>
                  </Card>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Card padding="none">
  <CardBody>Padding: none (0px)</CardBody>
</Card>

<Card padding="sm">
  <CardBody>Padding: sm (16px)</CardBody>
</Card>

<Card padding="md">
  <CardBody>Padding: md (24px)</CardBody>
</Card>

<Card padding="lg">
  <CardBody>Padding: lg (32px)</CardBody>
</Card>`}
              </Code>
            </Subsection>

            {/* Hoverable */}
            <Subsection level="h3">
              <Heading level="h3" title="Hoverable" />
              <ComponentPreview>
                <Card
                  hoverable
                  onClick={() => alert('Card clicked!')}
                  aria-label="클릭 가능한 카드"
                >
                  <CardHeader>
                    <CardTitle>클릭 가능한 카드</CardTitle>
                    <CardDescription>
                      이 카드를 클릭하거나 Enter/Space 키를 눌러보세요
                    </CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-[15px] text-krds-gray-90">
                      카드 전체가 버튼처럼 작동합니다.
                    </p>
                  </CardBody>
                </Card>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<Card
  hoverable
  onClick={() => console.log('Card clicked')}
  aria-label="클릭 가능한 카드"
>
  <CardHeader>
    <CardTitle>클릭 가능한 카드</CardTitle>
    <CardDescription>
      이 카드를 클릭하거나 Enter/Space 키를 눌러보세요
    </CardDescription>
  </CardHeader>
  <CardBody>
    <p>카드 전체가 버튼처럼 작동합니다.</p>
  </CardBody>
</Card>`}
              </Code>
            </Subsection>

            {/* Complete Example */}
            <Subsection level="h3">
              <Heading level="h3" title="Complete Example" />
              <ComponentPreview>
                <div className="grid grid-cols-2 gap-6">
                  <Card hoverable variant="shadow">
                    <CardHeader>
                      <CardTitle as="h4">데이터 분석</CardTitle>
                      <CardDescription>
                        실시간 데이터 시각화 및 분석
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        대시보드를 통해 비즈니스 지표를 실시간으로 모니터링하고
                        데이터 기반 의사결정을 내릴 수 있습니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        차트, 그래프, 테이블 등 다양한 형태로 데이터를
                        시각화합니다.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">자세히 보기</Button>
                      <Button size="sm" variant="outline">
                        데모 보기
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card hoverable variant="shadow">
                    <CardHeader>
                      <CardTitle as="h4">보고서 생성</CardTitle>
                      <CardDescription>
                        자동화된 보고서 작성 시스템
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        설정한 주기에 따라 자동으로 보고서를 생성하고 관련자에게
                        이메일로 발송합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        PDF, Excel 등 다양한 형식으로 내보내기가 가능합니다.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">자세히 보기</Button>
                      <Button size="sm" variant="outline">
                        데모 보기
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card hoverable variant="elevated">
                    <CardHeader>
                      <CardTitle as="h4">팀 협업</CardTitle>
                      <CardDescription>
                        실시간 협업 도구 및 커뮤니케이션
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        팀원들과 실시간으로 소통하고 작업을 공유하며 프로젝트를
                        효율적으로 관리할 수 있습니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        채팅, 화상회의, 파일 공유 등 다양한 협업 기능을
                        제공합니다.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">자세히 보기</Button>
                      <Button size="sm" variant="outline">
                        데모 보기
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card hoverable variant="elevated">
                    <CardHeader>
                      <CardTitle as="h4">보안 관리</CardTitle>
                      <CardDescription>
                        통합 보안 모니터링 시스템
                      </CardDescription>
                    </CardHeader>
                    <CardBody>
                      <p className="text-[15px] text-krds-gray-90 mb-4">
                        사용자 권한 관리, 접근 로그 추적, 보안 정책 설정 등을
                        통해 시스템을 안전하게 보호합니다.
                      </p>
                      <p className="text-[13px] text-krds-gray-60">
                        2단계 인증, IP 화이트리스트, 암호화 등 다양한 보안
                        기능을 제공합니다.
                      </p>
                    </CardBody>
                    <CardFooter>
                      <Button size="sm">자세히 보기</Button>
                      <Button size="sm" variant="outline">
                        데모 보기
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card hoverable>
    <CardHeader>
      <CardTitle>서비스 1</CardTitle>
      <CardDescription>간단한 설명</CardDescription>
    </CardHeader>
    <CardBody>
      <p>서비스 상세 내용이 여기에 들어갑니다.</p>
    </CardBody>
    <CardFooter>
      <Button size="sm">자세히 보기</Button>
    </CardFooter>
  </Card>

  <Card hoverable>
    <CardHeader>
      <CardTitle>서비스 2</CardTitle>
      <CardDescription>간단한 설명</CardDescription>
    </CardHeader>
    <CardBody>
      <p>서비스 상세 내용이 여기에 들어갑니다.</p>
    </CardBody>
    <CardFooter>
      <Button size="sm">자세히 보기</Button>
    </CardFooter>
  </Card>
</div>`}
              </Code>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Card" />
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
                      <Code>variant</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'outlined' | 'shadow' | 'filled' | 'elevated' | 'info' |
                        'success' | 'warning' | 'error'
                      </Code>
                    </TableCell>
                    <TableCell>'outlined'</TableCell>
                    <TableCell>카드 시각적 스타일</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>padding</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'none' | 'sm' | 'md' | 'lg'
                      </Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>패딩 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>hoverable</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>호버 효과 및 클릭 가능 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onClick</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">() =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>클릭 핸들러</TableCell>
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
              <Heading level="h3" title="하위 컴포넌트" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>CardHeader</Code>
                    </TableCell>
                    <TableCell>
                      카드 헤더 영역. CardTitle과 CardDescription을 포함합니다.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>CardTitle</Code>
                    </TableCell>
                    <TableCell>
                      카드 제목 (h3 요소, 24px, font-semibold)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>CardDescription</Code>
                    </TableCell>
                    <TableCell>카드 설명 (p 요소, 15px, gray-60)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>CardBody</Code>
                    </TableCell>
                    <TableCell>카드 본문 콘텐츠 영역</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>CardFooter</Code>
                    </TableCell>
                    <TableCell>
                      카드 푸터 영역. 주로 버튼 등 액션을 배치합니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Button', href: '/components/button' }}
        next={{ title: 'Code', href: '/components/code' }}
      />
    </>
  );
}
