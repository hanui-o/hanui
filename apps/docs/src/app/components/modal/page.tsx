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
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
  Code,
  List,
  ListItem,
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
import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalPage() {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isXlOpen, setIsXlOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);

  return (
    <>
      <Heading
        level="h1"
        title="Modal"
        description="Radix UI Dialog 기반의 접근성 높은 모달 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* 1. 개요 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <div className="relative w-full max-w-lg mx-auto bg-krds-white border border-krds-gray-30 rounded-lg pt-14 px-10 pb-10 shadow-lg">
                {/* 모달 제목 */}
                <h3 className="text-2xl font-bold leading-6 text-krds-gray-90">
                  기본 모달
                </h3>

                {/* 모달 본문 */}
                <div className="mt-4 text-krds-gray-70">
                  <p>모달 콘텐츠가 여기에 표시됩니다.</p>
                </div>

                {/* 모달 푸터 */}
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="tertiary">아니요</Button>
                  <Button>예</Button>
                </div>

                {/* 닫기 버튼 */}
                <button
                  className="absolute right-4 top-4 rounded-md flex items-center justify-center w-10 h-10 p-1 text-krds-gray-90 hover:text-krds-gray-95 focus:outline-none focus:ring-2 focus:ring-krds-primary-50 focus:ring-offset-2"
                  aria-label="닫기"
                >
                  <span className="sr-only">닫기</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<Modal open={isOpen} onClose={setIsOpen}>
  <ModalTitle>기본 모달</ModalTitle>
  <ModalBody>
    <p>모달 콘텐츠가 여기에 표시됩니다.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={() => setIsOpen(false)}>
      취소
    </Button>
    <Button onClick={() => setIsOpen(false)}>확인</Button>
  </ModalFooter>
</Modal>`}
            </Code>
          </Section>

          {/* 2. 설치 */}
          <Section level="h2">
            <Installation componentName="modal" />
          </Section>

          {/* 3. 사용법 */}
          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
            <Code variant="block" language="tsx">
              {`import { Modal, ModalTitle, ModalBody, ModalFooter } from '@hanui/react';

<Modal open={isOpen} onClose={setIsOpen}>
  <ModalTitle>제목</ModalTitle>
  <ModalBody>내용</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>확인</Button>
  </ModalFooter>
</Modal>`}
            </Code>
          </Section>

          {/* 4. 예제 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            {/* Size */}
            <Subsection level="h3">
              <Heading level="h3" title="Size" />
              <ComponentPreview className="max-w-full">
                <div className="flex flex-col gap-6 w-full">
                  {/* Small */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Small (max-w-md / 28rem)
                    </div>
                    <Button onClick={() => setIsSmallOpen(true)} size="sm">
                      Small 모달 열기
                    </Button>
                    <Modal
                      open={isSmallOpen}
                      onClose={() => setIsSmallOpen(false)}
                      size="sm"
                    >
                      <ModalTitle>Small 모달</ModalTitle>
                      <ModalBody>
                        <p>간단한 확인이나 경고에 적합한 크기입니다.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setIsSmallOpen(false)}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                  {/* Medium */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Medium (max-w-lg / 32rem) - 기본값
                    </div>
                    <Button onClick={() => setIsMediumOpen(true)}>
                      Medium 모달 열기
                    </Button>
                    <Modal
                      open={isMediumOpen}
                      onClose={() => setIsMediumOpen(false)}
                      size="md"
                    >
                      <ModalTitle>Medium 모달</ModalTitle>
                      <ModalBody>
                        <p>일반적인 모달에 사용하는 기본 크기입니다.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setIsMediumOpen(false)}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                  {/* Large */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Large (max-w-2xl / 42rem)
                    </div>
                    <Button onClick={() => setIsLargeOpen(true)} size="lg">
                      Large 모달 열기
                    </Button>
                    <Modal
                      open={isLargeOpen}
                      onClose={() => setIsLargeOpen(false)}
                      size="lg"
                    >
                      <ModalTitle>Large 모달</ModalTitle>
                      <ModalBody>
                        <p>폼이나 상세 정보를 담기에 적합한 크기입니다.</p>
                        <p className="mt-2">
                          더 많은 콘텐츠를 담을 수 있습니다.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setIsLargeOpen(false)}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                  {/* Extra Large */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Extra Large (max-w-4xl / 56rem)
                    </div>
                    <Button onClick={() => setIsXlOpen(true)} size="lg">
                      Extra Large 모달 열기
                    </Button>
                    <Modal
                      open={isXlOpen}
                      onClose={() => setIsXlOpen(false)}
                      size="xl"
                    >
                      <ModalTitle>Extra Large 모달</ModalTitle>
                      <ModalBody>
                        <p>복잡한 폼이나 데이터를 담기에 적합한 크기입니다.</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setIsXlOpen(false)}>닫기</Button>
                      </ModalFooter>
                    </Modal>
                  </div>

                  {/* Full */}
                  <div className="w-full">
                    <div className="mb-2 text-sm font-medium text-krds-gray-70">
                      Full (max-w-full)
                    </div>
                    <Button
                      onClick={() => setIsFullOpen(true)}
                      variant="secondary"
                    >
                      Full 모달 열기
                    </Button>
                    <Modal
                      open={isFullOpen}
                      onClose={() => setIsFullOpen(false)}
                      size="full"
                    >
                      <ModalTitle>Full 모달</ModalTitle>
                      <ModalBody>
                        <p>전체 화면을 차지하는 모달입니다.</p>
                        <p className="mt-2">
                          대량의 데이터나 복잡한 인터페이스를 표시할 때
                          사용합니다.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={() => setIsFullOpen(false)}>
                          닫기
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`// Small - 간단한 확인/경고
<Modal open={isOpen} onClose={setIsOpen} size="sm">
  <ModalTitle>Small 모달</ModalTitle>
  <ModalBody>간단한 확인이나 경고에 적합한 크기입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>닫기</Button>
  </ModalFooter>
</Modal>

// Medium - 기본값 (일반 모달)
<Modal open={isOpen} onClose={setIsOpen}>
  <ModalTitle>Medium 모달</ModalTitle>
  <ModalBody>일반적인 모달에 사용하는 기본 크기입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>닫기</Button>
  </ModalFooter>
</Modal>

// Large - 폼/상세 정보
<Modal open={isOpen} onClose={setIsOpen} size="lg">
  <ModalTitle>Large 모달</ModalTitle>
  <ModalBody>폼이나 상세 정보를 담기에 적합한 크기입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>닫기</Button>
  </ModalFooter>
</Modal>

// Extra Large - 복잡한 폼/데이터
<Modal open={isOpen} onClose={setIsOpen} size="xl">
  <ModalTitle>Extra Large 모달</ModalTitle>
  <ModalBody>복잡한 폼이나 데이터를 담기에 적합한 크기입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>닫기</Button>
  </ModalFooter>
</Modal>

// Full - 전체 화면
<Modal open={isOpen} onClose={setIsOpen} size="full">
  <ModalTitle>Full 모달</ModalTitle>
  <ModalBody>대량의 데이터나 복잡한 인터페이스를 표시할 때 사용합니다.</ModalBody>
  <ModalFooter>
    <Button onClick={() => setIsOpen(false)}>닫기</Button>
  </ModalFooter>
</Modal>`}
              </Code>
            </Subsection>
          </Section>

          {/* 5. 접근성 */}
          <Section level="h2">
            <Heading
              level="h2"
              id="accessibility"
              title="접근성"
              description="WCAG 2.1 / KWCAG 2.2 Level AA 기준을 준수합니다."
            />
            <List variant="check">
              <ListItem>
                <strong>닫기 버튼:</strong> 모든 모달은 오른쪽 상단에 X 닫기
                버튼을 기본으로 포함합니다. 포커스 순서는 제목 → 본문 → footer
                버튼들 → 닫기 버튼 순서로 이동합니다.
              </ListItem>
              <ListItem>
                <strong>Focus Management:</strong> 모달이 열리면 포커스가
                자동으로 모달로 이동하고, 닫히면 원래 요소로 복원됩니다.
              </ListItem>
              <ListItem>
                <strong>키보드 네비게이션:</strong> Tab/Shift+Tab으로 요소 순환,
                ESC 키로 닫기가 지원됩니다.
              </ListItem>
              <ListItem>
                <strong>ARIA 속성:</strong> <Code>role="dialog"</Code>,{' '}
                <Code>aria-modal="true"</Code> 등 필요한 ARIA 속성이 자동으로
                적용됩니다.
              </ListItem>
              <ListItem>
                <strong>포커스 트랩:</strong> 모달이 열린 동안 포커스가 모달
                내부에만 유지되어 배경 콘텐츠로 이동하지 않습니다.
              </ListItem>
              <ListItem>
                <strong>스크린 리더 지원:</strong> ModalTitle이 자동으로 모달의
                레이블로 연결됩니다.
              </ListItem>
              <ListItem>
                <strong>배경 스크롤 방지:</strong> 모달이 열리면 배경 스크롤이
                자동으로 비활성화됩니다.
              </ListItem>
            </List>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="Props" />
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
                      <Code>open</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onClose</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        (value: boolean) =&gt; void
                      </Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 닫기 콜백</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>size</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'sm' | 'md' | 'lg' | 'xl' | 'full'
                      </Code>
                    </TableCell>
                    <TableCell>'md'</TableCell>
                    <TableCell>모달 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>children</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 콘텐츠</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>className</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 패널 추가 className</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Sub-components" />
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
                      <Code>ModalTitle</Code>
                    </TableCell>
                    <TableCell>
                      모달의 제목을 표시합니다. ARIA labeling이 자동으로
                      적용됩니다.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>ModalBody</Code>
                    </TableCell>
                    <TableCell>모달의 본문 콘텐츠 영역입니다.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>ModalFooter</Code>
                    </TableCell>
                    <TableCell>모달의 하단 액션 버튼 영역입니다.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>ModalDescription</Code>
                    </TableCell>
                    <TableCell>
                      모달의 설명을 표시합니다. ARIA description이 자동으로
                      적용됩니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Masthead', href: '/components/masthead' }}
        next={{ title: 'Pagination', href: '/components/pagination' }}
      />
    </>
  );
}
