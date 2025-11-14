'use client';

import {
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Heading,
  Body,
  Stack,
} from '@hanui/react';
import { useState } from 'react';
import { ComponentPreview } from '@/components/content/ComponentPreview';
import { CodeBlock } from '@/components/content/CodeBlock';
import { PageHeader } from '@/components/content/PageHeader';
import { PageSection } from '@/components/content/PageSection';

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
      <PageHeader
        title="Modal (모달)"
        description="Headless UI Dialog 기반의 접근성 높은 모달 컴포넌트"
      />

      {/* Quick Start */}
      <PageSection>
        <ComponentPreview>
          <Button onClick={() => setIsBasicOpen(true)}>모달 열기</Button>

          <Modal open={isBasicOpen} onClose={() => setIsBasicOpen(false)}>
            <ModalTitle>기본 모달</ModalTitle>
            <ModalBody>
              <p>모달 컨텐츠가 여기에 표시됩니다.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsBasicOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsBasicOpen(false)}>확인</Button>
            </ModalFooter>
          </Modal>
        </ComponentPreview>
        <div className="mt-4">
          <CodeBlock
            code={`import { Modal, Button } from '@hanui/react';
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
            language="tsx"
            showLineNumbers={false}
          />
        </div>
      </PageSection>

      {/* Examples */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="examples">
            예제
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Sizes */}
          <Stack spacing="heading-tight">
            <Heading level="h3">크기</Heading>
            <Body className="mb-4">
              다섯 가지 크기를 지원합니다: sm, md, lg, xl, full
            </Body>
            <div>
              <ComponentPreview>
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

                {/* Small Modal */}
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

                {/* Medium Modal */}
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

                {/* Large Modal */}
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

                {/* XL Modal */}
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

                {/* Full Modal */}
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
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Modal open={isOpen} onClose={onClose} size="sm">
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
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* With Close Button */}
          <Stack spacing="heading-tight">
            <Heading level="h3">닫기 버튼 포함</Heading>
            <Body className="mb-4">상단에 닫기 버튼을 추가할 수 있습니다.</Body>
            <div>
              <ComponentPreview>
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
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Modal open={isOpen} onClose={onClose}>
  <ModalCloseButton />
  <ModalTitle>닫기 버튼이 있는 모달</ModalTitle>
  <ModalBody>
    <p>오른쪽 상단의 X 버튼으로 닫을 수 있습니다.</p>
  </ModalBody>
  <ModalFooter>
    <Button onClick={onClose}>확인</Button>
  </ModalFooter>
</Modal>`}
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Confirmation Modal */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Confirmation Modal</Heading>
            <Body className="mb-4">
              사용자의 확인이 필요한 작업에 사용하는 패턴입니다.
            </Body>
            <div>
              <ComponentPreview>
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
                    <p className="text-gray-70 dark:text-gray-30">
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
                      onClick={() => {
                        // 삭제 로직
                        setIsConfirmationOpen(false);
                      }}
                    >
                      삭제
                    </Button>
                  </ModalFooter>
                </Modal>
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Modal open={isOpen} onClose={onClose} size="sm">
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
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>

          {/* Form Modal */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Form Modal</Heading>
            <Body className="mb-4">폼을 포함하는 모달 예제입니다.</Body>
            <div>
              <ComponentPreview>
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
                          className="block text-sm font-medium mb-1"
                        >
                          프로젝트 이름
                        </label>
                        <input
                          id="project-name"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-30 dark:border-gray-70 rounded focus:outline-none focus:ring-2 focus:ring-primary-60"
                          placeholder="프로젝트 이름을 입력하세요"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="project-description"
                          className="block text-sm font-medium mb-1"
                        >
                          설명
                        </label>
                        <textarea
                          id="project-description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-30 dark:border-gray-70 rounded focus:outline-none focus:ring-2 focus:ring-primary-60"
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
              </ComponentPreview>
              <div className="mt-4">
                <CodeBlock
                  code={`<Modal open={isOpen} onClose={onClose}>
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
                  language="tsx"
                  showLineNumbers={false}
                />
              </div>
            </div>
          </Stack>
        </Stack>
      </PageSection>

      {/* API Reference */}
      <PageSection>
        <Stack spacing="heading-content">
          <Heading level="h2" id="api">
            API Reference
          </Heading>
        </Stack>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          {/* Modal */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Modal</Heading>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <th className="text-left py-3 px-4 font-semibold w-1/5">
                      Prop
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-2/5">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/6">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-semibold w-1/4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">open</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      boolean
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      모달 표시 여부
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">onClose</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      () =&gt; void
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      모달 닫기 핸들러
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">size</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; |
                      &quot;xl&quot; | &quot;full&quot;
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      &quot;md&quot;
                    </td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      모달 크기
                    </td>
                  </tr>
                  <tr className="border-b border-gray-20 dark:border-gray-80">
                    <td className="py-3 px-4 font-mono text-sm">children</td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-60 dark:text-gray-40">
                      React.ReactNode
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">-</td>
                    <td className="py-3 px-4 text-gray-60 dark:text-gray-40">
                      모달 내용
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          {/* Sub-components */}
          <Stack spacing="heading-tight">
            <Heading level="h3">Sub-components</Heading>
            <Stack spacing="content-tight">
              <div>
                <p className="font-mono text-sm mb-2">ModalTitle</p>
                <Body size="sm">
                  모달의 제목을 표시합니다. children을 받습니다.
                </Body>
              </div>
              <div>
                <p className="font-mono text-sm mb-2">ModalBody</p>
                <Body size="sm">
                  모달의 본문 내용을 표시합니다. children을 받습니다.
                </Body>
              </div>
              <div>
                <p className="font-mono text-sm mb-2">ModalFooter</p>
                <Body size="sm">
                  모달의 하단 액션 버튼 영역입니다. children을 받습니다.
                </Body>
              </div>
              <div>
                <p className="font-mono text-sm mb-2">ModalCloseButton</p>
                <Body size="sm">
                  오른쪽 상단에 표시되는 닫기 버튼입니다. props를 받지 않습니다.
                </Body>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </PageSection>

      {/* Accessibility */}
      <PageSection>
        <Heading
          level="h2"
          id="accessibility"
          className="text-2xl font-semibold"
        >
          접근성
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>KRDS 및 WCAG 2.1 / KWCAG 2.2 접근성 기준을 준수합니다:</Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">1. Focus Management</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>모달 열림 시</strong>: 키보드 포커스가 모달 자체 또는 첫
                번째 상호작용 요소로 자동 이동
              </li>
              <li>
                <strong>모달 닫힘 시</strong>: 포커스가 모달을 연 버튼으로 자동
                복원
              </li>
              <li>
                <strong>포커스 트랩</strong>: 모달이 활성화된 동안 포커스는 모달
                내부에만 유지
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. Close Button Positioning</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>KRDS 요구사항</strong>: 닫기 버튼은 모달의 마지막 요소로
                마크업되어야 함
              </li>
              <li>
                <strong>이유</strong>: 순차 네비게이션 시 사용자가 본문 콘텐츠를
                놓치지 않도록 방지
              </li>
              <li>
                <strong>구현</strong>: ModalCloseButton을 컴포넌트 트리의
                마지막에 배치
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. Keyboard Navigation</Heading>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4">키</th>
                    <th className="text-left py-2 px-4">동작</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">Tab</td>
                    <td className="py-2 px-4">
                      다음 상호작용 요소로 이동 (마지막에서 첫 번째로 순환)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">Shift+Tab</td>
                    <td className="py-2 px-4">
                      이전 상호작용 요소로 이동 (첫 번째에서 마지막으로 순환)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">ESC</td>
                    <td className="py-2 px-4">
                      닫기 버튼이 있는 경우 모달 닫기
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-900">
                    <td className="py-2 px-4 font-mono">Arrow ↑/↓</td>
                    <td className="py-2 px-4">본문 콘텐츠 세로 스크롤</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. ARIA Attributes</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>role=&quot;dialog&quot;</strong>: Headless UI Dialog가
                자동 설정
              </li>
              <li>
                <strong>aria-modal=&quot;true&quot;</strong>: 배경 윈도우
                비활성화 표시
              </li>
              <li>
                <strong>Dialog.Title</strong>: 모달 제목에 자동 ARIA 레이블링
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">5. Usability Standards</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>콘텐츠 최소화</strong>: 모달 내 상호작용을 최소화
              </li>
              <li>
                <strong>스크롤 시각화</strong>: 스크롤이 필요한 경우 스크롤바,
                블러 효과 등으로 시각적 단서 제공
              </li>
              <li>
                <strong>Footer 고정</strong>: 액션 버튼이 항상 보이도록 Footer
                영구 표시
              </li>
              <li>
                <strong>명확한 레이블</strong>: 헤더, 콘텐츠, 버튼 레이블이
                목적과 액션을 명확히 전달
              </li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>

      {/* Foundation Layer */}
      <PageSection>
        <Heading
          level="h2"
          id="foundation-layer"
          className="text-2xl font-semibold"
        >
          Foundation Layer
        </Heading>

        <Stack spacing="content-loose" className="mt-2 md:mt-4">
          <Body>
            Modal 컴포넌트는 Headless UI Dialog를 기반으로 Foundation Layer
            아키텍처를 통해 개발자가 직접 관리하지 않아도 KRDS 접근성 기준을
            자동으로 충족합니다:
          </Body>

          <Stack spacing="heading-tight">
            <Heading level="h3">1. Focus Management Automation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                모달 열림 시 자동 포커스 이동 (모달 또는 첫 상호작용 요소)
              </li>
              <li>모달 닫힘 시 자동 포커스 복원 (트리거 버튼)</li>
              <li>
                포커스 트랩 자동 활성화 (Tab/Shift+Tab 순환, 모달 외부 포커스
                방지)
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">2. ARIA Automation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>role=&quot;dialog&quot;</strong>: Dialog 역할 자동 설정
              </li>
              <li>
                <strong>aria-modal=&quot;true&quot;</strong>: 배경 윈도우
                비활성화 자동 표시
              </li>
              <li>
                <strong>Dialog.Title 연결</strong>: ModalTitle이 자동으로 모달
                레이블로 연결
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">3. Keyboard Navigation</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>ESC 키</strong>: onClose 콜백 자동 호출로 모달 닫기
              </li>
              <li>
                <strong>Tab 순환</strong>: 첫 번째 ↔ 마지막 요소 자동 순환
                네비게이션
              </li>
              <li>
                <strong>포커스 가시성</strong>: focus:ring 스타일로 키보드
                포커스 명확화
              </li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">4. Background Interaction Prevention</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Overlay로 배경 윈도우 시각적 분리</li>
              <li>배경 스크롤 자동 방지</li>
              <li>배경 클릭 시 onClose 콜백 호출 (선택적)</li>
            </ul>
          </Stack>

          <Stack spacing="heading-tight">
            <Heading level="h3">5. Smooth Animations</Heading>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Transition 컴포넌트로 부드러운 열기/닫기 애니메이션</li>
              <li>Overlay와 Panel의 독립적인 애니메이션 타이밍</li>
              <li>prefers-reduced-motion 존중</li>
            </ul>
          </Stack>
        </Stack>
      </PageSection>
    </>
  );
}
