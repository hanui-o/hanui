'use client';

import {
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Section,
  SectionHeading,
  Subsection,
  Body,
  Stack,
  Card,
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
  PageNavigation,
  DoCard,
  DontCard,
} from '@/components/hanui';
import { useState } from 'react';

export default function ModalPage() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isXlOpen, setIsXlOpen] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [isCloseButtonOpen, setIsCloseButtonOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <SectionHeading
        level="h1"
        title="Modal"
        description="Radix UI Dialog 기반의 접근성 높은 모달 컴포넌트입니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Installation */}
          <Section level="h2">
            <SectionHeading level="h2" id="installation" title="설치">
              <Body className="leading-relaxed">
                다음 명령어로 Modal 컴포넌트를 설치합니다:
              </Body>
            </SectionHeading>

            <Code variant="block" language="bash" showLineNumbers={false}>
              npx @hanui/cli add modal
            </Code>
          </Section>

          {/* What is it */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="what-is-it"
              title="무엇인가요?"
              description="Modal은 사용자의 주의를 집중시키고 중요한 정보를 표시하거나 액션을 수행하는 오버레이 다이얼로그입니다."
            />

            <Card variant="info">
              <List variant="check" className="text-krds-gray-90">
                <ListItem>
                  <strong>Radix UI 기반:</strong> Radix UI Dialog Primitive를
                  사용하여 접근성이 자동으로 보장됩니다.
                </ListItem>
                <ListItem>
                  <strong>Focus Management:</strong> 모달 열기/닫기 시 포커스가
                  자동으로 관리됩니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> ESC 키로 닫기, Tab으로
                  요소 순환 등 완전한 키보드 지원을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>다양한 크기:</strong> sm, md, lg, xl, full 5가지 크기
                  옵션을 제공합니다.
                </ListItem>
                <ListItem>
                  <strong>KRDS 준수:</strong> 한국형 웹 콘텐츠 접근성 지침을
                  준수합니다.
                </ListItem>
              </List>
            </Card>
          </Section>

          {/* Preview */}
          <Section level="h2">
            <SectionHeading level="h2" id="preview" title="미리보기" />

            <Card variant="outlined">
              <Button onClick={() => setIsBasicOpen(true)}>모달 열기</Button>

              <Modal open={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
                <ModalTitle>기본 모달</ModalTitle>
                <ModalBody>
                  <p>모달 컨텐츠가 여기에 표시됩니다.</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsBasicOpen(false)}
                  >
                    취소
                  </Button>
                  <Button onClick={() => setIsBasicOpen(false)}>확인</Button>
                </ModalFooter>
              </Modal>
            </Card>

            <Code variant="block" language="tsx" showLineNumbers={false}>
              {`import { Modal, ModalTitle, ModalBody, ModalFooter, Button } from '@hanui/react';
import { useState } from 'react';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalTitle>기본 모달</ModalTitle>
        <ModalBody>
          <p>모달 컨텐츠가 여기에 표시됩니다.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button onClick={() => setIsOpen(false)}>확인</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};`}
            </Code>
          </Section>

          {/* Usage */}
          <Section level="h2">
            <SectionHeading level="h2" id="usage" title="사용법" />

            <Subsection level="h3">
              <SectionHeading level="h3" title="크기 옵션">
                <Body className="leading-relaxed">
                  다섯 가지 크기를 지원합니다: sm, md (기본), lg, xl, full
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => setIsSmallOpen(true)} size="sm">
                    Small
                  </Button>
                  <Button onClick={() => setIsMediumOpen(true)}>
                    Medium (기본)
                  </Button>
                  <Button onClick={() => setIsLargeOpen(true)} size="lg">
                    Large
                  </Button>
                  <Button onClick={() => setIsXlOpen(true)} size="lg">
                    Extra Large
                  </Button>
                  <Button
                    onClick={() => setIsFullOpen(true)}
                    variant="secondary"
                  >
                    Full Screen
                  </Button>
                </div>

                <Modal
                  open={isSmallOpen}
                  onClose={() => setIsSmallOpen(false)}
                  size="sm"
                >
                  <ModalTitle>Small 모달</ModalTitle>
                  <ModalBody>
                    <p>작은 크기의 모달입니다.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsSmallOpen(false)}>닫기</Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  open={isMediumOpen}
                  onClose={() => setIsMediumOpen(false)}
                  size="md"
                >
                  <ModalTitle>Medium 모달</ModalTitle>
                  <ModalBody>
                    <p>중간 크기의 모달입니다. 기본값입니다.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsMediumOpen(false)}>닫기</Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  open={isLargeOpen}
                  onClose={() => setIsLargeOpen(false)}
                  size="lg"
                >
                  <ModalTitle>Large 모달</ModalTitle>
                  <ModalBody>
                    <p>큰 크기의 모달입니다.</p>
                    <p className="mt-2">더 많은 컨텐츠를 담을 수 있습니다.</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsLargeOpen(false)}>닫기</Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  open={isXlOpen}
                  onClose={() => setIsXlOpen(false)}
                  size="xl"
                >
                  <ModalTitle>Extra Large 모달</ModalTitle>
                  <ModalBody>
                    <p>매우 큰 크기의 모달입니다.</p>
                    <p className="mt-2">
                      복잡한 컨텐츠나 폼을 담을 때 유용합니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsXlOpen(false)}>닫기</Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  open={isFullOpen}
                  onClose={() => setIsFullOpen(false)}
                  size="full"
                >
                  <ModalTitle>Full Screen 모달</ModalTitle>
                  <ModalBody>
                    <p>전체 화면을 차지하는 모달입니다.</p>
                    <p className="mt-2">
                      대량의 데이터나 복잡한 인터페이스를 표시할 때 사용합니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsFullOpen(false)}>닫기</Button>
                  </ModalFooter>
                </Modal>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Modal open={isOpen} onClose={onClose} size="sm">
  <ModalTitle>Small 모달</ModalTitle>
  <ModalBody>작은 크기의 모달입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>닫기</Button>
  </ModalFooter>
</Modal>

<Modal open={isOpen} onClose={onClose} size="full">
  <ModalTitle>Full Screen 모달</ModalTitle>
  <ModalBody>전체 화면을 차지하는 모달입니다.</ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>닫기</Button>
  </ModalFooter>
</Modal>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="닫기 버튼 포함">
                <Body className="leading-relaxed">
                  상단에 닫기 버튼을 추가할 수 있습니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <Button onClick={() => setIsCloseButtonOpen(true)}>
                  닫기 버튼 있는 모달
                </Button>

                <Modal
                  open={isCloseButtonOpen}
                  onClose={() => setIsCloseButtonOpen(false)}
                >
                  <ModalCloseButton />
                  <ModalTitle>닫기 버튼이 있는 모달</ModalTitle>
                  <ModalBody>
                    <p>
                      오른쪽 상단의 X 버튼이나 Footer의 버튼으로 닫을 수
                      있습니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => setIsCloseButtonOpen(false)}>
                      확인
                    </Button>
                  </ModalFooter>
                </Modal>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Modal open={isOpen} onClose={onClose}>
  <ModalCloseButton />
  <ModalTitle>닫기 버튼이 있는 모달</ModalTitle>
  <ModalBody>
    <p>오른쪽 상단의 X 버튼으로 닫을 수 있습니다.</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>확인</Button>
  </ModalFooter>
</Modal>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Confirmation Modal">
                <Body className="leading-relaxed">
                  사용자의 확인이 필요한 작업에 사용하는 패턴입니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <Button
                  variant="danger"
                  onClick={() => setIsConfirmationOpen(true)}
                >
                  계정 삭제
                </Button>

                <Modal
                  open={isConfirmationOpen}
                  onClose={() => setIsConfirmationOpen(false)}
                  size="sm"
                >
                  <ModalTitle>계정을 삭제하시겠습니까?</ModalTitle>
                  <ModalBody>
                    <p className="text-krds-gray-70">
                      이 작업은 되돌릴 수 없습니다. 계정과 모든 데이터가
                      영구적으로 삭제됩니다.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsConfirmationOpen(false)}
                    >
                      취소
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => setIsConfirmationOpen(false)}
                    >
                      삭제
                    </Button>
                  </ModalFooter>
                </Modal>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Modal open={isOpen} onClose={onClose} size="sm">
  <ModalTitle>계정을 삭제하시겠습니까?</ModalTitle>
  <ModalBody>
    <p>이 작업은 되돌릴 수 없습니다.</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>
      취소
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      삭제
    </Button>
  </ModalFooter>
</Modal>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Form Modal">
                <Body className="leading-relaxed">
                  폼을 포함하는 모달 예제입니다:
                </Body>
              </SectionHeading>

              <Card variant="outlined">
                <Button onClick={() => setIsFormOpen(true)}>
                  새 프로젝트 만들기
                </Button>

                <Modal open={isFormOpen} onClose={() => setIsFormOpen(false)}>
                  <ModalTitle>새 프로젝트 만들기</ModalTitle>
                  <ModalBody>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="project-name"
                          className="block font-medium mb-1"
                        >
                          프로젝트 이름
                        </label>
                        <input
                          id="project-name"
                          type="text"
                          className="w-full px-3 py-2 border border-krds-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-krds-primary-base"
                          placeholder="프로젝트 이름을 입력하세요"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="project-description"
                          className="block font-medium mb-1"
                        >
                          설명
                        </label>
                        <textarea
                          id="project-description"
                          rows={3}
                          className="w-full px-3 py-2 border border-krds-gray-20 rounded focus:outline-none focus:ring-2 focus:ring-krds-primary-base"
                          placeholder="프로젝트 설명을 입력하세요"
                        />
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsFormOpen(false)}
                    >
                      취소
                    </Button>
                    <Button onClick={() => setIsFormOpen(false)}>만들기</Button>
                  </ModalFooter>
                </Modal>
              </Card>

              <Code variant="block" language="tsx" showLineNumbers={false}>
                {`<Modal open={isOpen} onClose={onClose}>
  <ModalTitle>새 프로젝트 만들기</ModalTitle>
  <ModalBody>
    <form className="space-y-4">
      <div>
        <label>프로젝트 이름</label>
        <input type="text" placeholder="이름을 입력하세요" />
      </div>
      <div>
        <label>설명</label>
        <textarea placeholder="설명을 입력하세요" />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline" onClick={onClose}>취소</Button>
    <Button onClick={handleSubmit}>만들기</Button>
  </ModalFooter>
</Modal>`}
              </Code>
            </Subsection>
          </Section>

          {/* Best Practices */}
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="best-practices"
              title="Best Practices"
            />

            <Stack gap="content">
              <DoCard
                title="콘텐츠 최소화"
                description="모달 내 상호작용과 콘텐츠를 최소화하여 사용자가 쉽게 작업을 완료할 수 있도록 하세요."
              />

              <DoCard
                title="명확한 액션 버튼"
                description="Footer의 버튼은 취소/확인, 삭제/취소 등 명확한 레이블을 사용하세요."
              />

              <DoCard
                title="적절한 크기 선택"
                description="간단한 확인은 sm, 폼은 md/lg, 복잡한 데이터는 xl/full을 사용하세요."
              />

              <DontCard
                title="모달 안에 모달 중첩하지 않기"
                description="모달 위에 모달을 띄우면 사용자가 혼란스러워합니다. 다른 UI 패턴을 고려하세요."
              />

              <DontCard
                title="중요하지 않은 정보에 모달 사용하지 않기"
                description="간단한 알림이나 도움말은 Toast, Tooltip 등 다른 컴포넌트를 사용하세요."
              />
            </Stack>
          </Section>

          {/* Accessibility */}
          <Section level="h2">
            <SectionHeading level="h2" id="accessibility" title="접근성" />

            <Card variant="info">
              <List variant="check">
                <ListItem>
                  <strong>Focus Management:</strong> 모달이 열리면 포커스가
                  자동으로 모달로 이동하고, 닫히면 원래 요소로 복원됩니다.
                </ListItem>
                <ListItem>
                  <strong>키보드 네비게이션:</strong> Tab/Shift+Tab으로 요소
                  순환, ESC 키로 닫기가 지원됩니다.
                </ListItem>
                <ListItem>
                  <strong>ARIA 속성:</strong> role="dialog", aria-modal="true"
                  등 필요한 ARIA 속성이 자동으로 적용됩니다.
                </ListItem>
                <ListItem>
                  <strong>스크린 리더:</strong> ModalTitle이 자동으로 모달의
                  레이블로 연결됩니다.
                </ListItem>
                <ListItem>
                  <strong>포커스 트랩:</strong> 모달이 열린 동안 포커스가 모달
                  내부에만 유지됩니다.
                </ListItem>
              </List>
            </Card>

            <Subsection level="h3">
              <SectionHeading level="h3" title="키보드 단축키" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>키</TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">Tab</TableCell>
                    <TableCell>
                      다음 상호작용 요소로 이동 (마지막에서 첫 번째로 순환)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Shift+Tab</TableCell>
                    <TableCell>
                      이전 상호작용 요소로 이동 (첫 번째에서 마지막으로 순환)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">ESC</TableCell>
                    <TableCell>모달 닫기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">Arrow ↑/↓</TableCell>
                    <TableCell>본문 콘텐츠 세로 스크롤</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>

        <TabsContent value="api">
          <Section level="h2">
            <SectionHeading
              level="h2"
              id="api-reference"
              title="API Reference"
            />

            <Subsection level="h3">
              <SectionHeading level="h3" title="Modal Props" />

              <Table>
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
                    <TableCell className="font-mono">open</TableCell>
                    <TableCell className="text-krds-gray-70">boolean</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">onClose</TableCell>
                    <TableCell className="text-krds-gray-70">
                      () =&gt; void
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 닫기 핸들러</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">size</TableCell>
                    <TableCell className="text-krds-gray-70">
                      &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; |
                      &apos;xl&apos; | &apos;full&apos;
                    </TableCell>
                    <TableCell className="font-mono">&apos;md&apos;</TableCell>
                    <TableCell>모달 크기</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">children</TableCell>
                    <TableCell className="text-krds-gray-70">
                      React.ReactNode
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>모달 내용</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Sub-components" />

              <Stack gap="md">
                <div>
                  <Body className="font-mono font-medium mb-2">ModalTitle</Body>
                  <Body size="sm" className="text-krds-gray-70">
                    모달의 제목을 표시합니다. children을 받습니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">ModalBody</Body>
                  <Body size="sm" className="text-krds-gray-70">
                    모달의 본문 내용을 표시합니다. children을 받습니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">
                    ModalFooter
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    모달의 하단 액션 버튼 영역입니다. children을 받습니다.
                  </Body>
                </div>
                <div>
                  <Body className="font-mono font-medium mb-2">
                    ModalCloseButton
                  </Body>
                  <Body size="sm" className="text-krds-gray-70">
                    오른쪽 상단에 표시되는 닫기 버튼입니다. props를 받지
                    않습니다.
                  </Body>
                </div>
              </Stack>
            </Subsection>

            <Subsection level="h3">
              <SectionHeading level="h3" title="Size 옵션" />

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Size</TableHead>
                    <TableHead>최대 너비</TableHead>
                    <TableHead>용도</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">sm</TableCell>
                    <TableCell>max-w-md (28rem)</TableCell>
                    <TableCell>간단한 확인, 경고</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">md</TableCell>
                    <TableCell>max-w-lg (32rem)</TableCell>
                    <TableCell>일반 모달 (기본값)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">lg</TableCell>
                    <TableCell>max-w-2xl (42rem)</TableCell>
                    <TableCell>폼, 상세 정보</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">xl</TableCell>
                    <TableCell>max-w-4xl (56rem)</TableCell>
                    <TableCell>복잡한 폼, 데이터</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">full</TableCell>
                    <TableCell>max-w-full</TableCell>
                    <TableCell>전체 화면, 대량 데이터</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Masthead', href: '/components/masthead' }}
        next={{ title: 'NavText', href: '/components/navtext' }}
      />
    </>
  );
}
