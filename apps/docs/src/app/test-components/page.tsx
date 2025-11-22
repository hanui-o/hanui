'use client';

import { useState } from 'react';

// UI components - from @hanui/react
import {
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Heading,
  Body,
  Stack,
  Container,
} from '@hanui/react';

export default function TestComponentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('');

  const cities = [
    { value: 'seoul', label: '서울' },
    { value: 'busan', label: '부산' },
    { value: 'incheon', label: '인천' },
  ];

  return (
    <Container maxWidth="xl" className="py-10">
      <Stack gap="2xl">
        {/* Header */}
        <div>
          <Heading level="h1">컴포넌트 테스트 페이지</Heading>
          <Body size="lg" className="mt-4">
            Radix UI 통합 및 모든 컴포넌트 동작 확인
          </Body>
        </div>

        {/* Modal Test */}
        <Stack gap="md">
          <Heading level="h2">Modal 테스트</Heading>
          <div>
            <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
          </div>

          <Modal open={isModalOpen} onClose={setIsModalOpen}>
            <ModalTitle>테스트 모달</ModalTitle>
            <ModalBody>
              <Body>이것은 Radix UI Dialog를 사용한 모달입니다.</Body>
              <Input placeholder="텍스트 입력..." className="mt-4" />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>확인</Button>
            </ModalFooter>
            <ModalCloseButton />
          </Modal>
        </Stack>

        {/* Select Test */}
        <Stack gap="md">
          <Heading level="h2">Select 테스트</Heading>
          <div className="max-w-xs">
            <Select
              options={cities}
              value={selectedCity}
              onChange={(value) => setSelectedCity(value as string)}
              placeholder="도시를 선택하세요"
              label="도시"
            />
            {selectedCity && (
              <Body className="mt-2">선택된 도시: {selectedCity}</Body>
            )}
          </div>
        </Stack>

        {/* Tabs Test */}
        <Stack gap="md">
          <Heading level="h2">Tabs 테스트</Heading>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Body>첫 번째 탭 내용입니다.</Body>
            </TabsContent>
            <TabsContent value="tab2">
              <Body>두 번째 탭 내용입니다.</Body>
            </TabsContent>
            <TabsContent value="tab3">
              <Body>세 번째 탭 내용입니다.</Body>
            </TabsContent>
          </Tabs>
        </Stack>

        {/* Accordion Test */}
        <Stack gap="md">
          <Heading level="h2">Accordion 테스트</Heading>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>아코디언 섹션 1</AccordionTrigger>
              <AccordionContent>
                <Body>첫 번째 아코디언 내용입니다.</Body>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>아코디언 섹션 2</AccordionTrigger>
              <AccordionContent>
                <Body>두 번째 아코디언 내용입니다.</Body>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>아코디언 섹션 3</AccordionTrigger>
              <AccordionContent>
                <Body>세 번째 아코디언 내용입니다.</Body>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stack>

        {/* Input Test */}
        <Stack gap="md">
          <Heading level="h2">Input 테스트</Heading>
          <Stack gap="md" className="max-w-md">
            <Input placeholder="기본 입력" />
            <Input placeholder="Filled 스타일" variant="filled" />
            <Input placeholder="에러 상태" error />
            <Input placeholder="Small" size="sm" />
            <Input placeholder="Large" size="lg" />
          </Stack>
        </Stack>

        {/* Button Test */}
        <Stack gap="md">
          <Heading level="h2">Button 테스트</Heading>
          <Stack direction="row" gap="sm">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
