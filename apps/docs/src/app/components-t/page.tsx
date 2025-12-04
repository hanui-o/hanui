'use client';

import React, { useState } from 'react';
import {
  // Phase 1-3: 피드백 컴포넌트
  Alert,
  AlertTitle,
  AlertDescription,
  ToastProvider,
  Toaster,
  useToast,
  Progress,
  CircularProgress,
  Spinner,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Badge,
  NumberBadge,
  DotBadge,
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  // Form 컴포넌트
  Input,
  Textarea,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Combobox,
  type ComboboxOption,
  Slider,
  FormField,
  FormLabel,
  FormError,
  FormHelperText,
  Label,
  // Navigation 컴포넌트
  Breadcrumb,
  Pagination,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Link,
  SkipLink,
  // Action 컴포넌트
  Button,
  Modal,
  ModalTitle,
  ModalBody,
  ModalFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  // Layout
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  // Typography
  Heading,
  Body,
  List,
  ListItem,
  HeaderWithMegaMenu,
  HeaderWithNavigation,
  NavigationMenuItem,
  MegaMenuColumn,
  Footer,
  Container,
  Masthead,
} from '@hanui/react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  User,
  Settings,
  LogOut,
  Bell,
  Home,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

// ============================================================================
// Header 컴포넌트
// ============================================================================
// 개발자의 거짓말 시리즈 🤥
const navigationItems: NavigationMenuItem[] = [
  { label: '금방 돼', href: '/', active: true },
  {
    label: '내 로컬에선 돼',
    children: [
      { label: '재부팅 해봐', href: '/lies/reboot' },
      { label: '캐시 지워봐', href: '/lies/cache' },
      { label: '브랜치 다시 받아봐', href: '/lies/branch' },
      { label: '환경변수 확인해봐', href: '/lies/env' },
    ],
  },
  {
    label: '테스트 다 했어',
    children: [
      { label: '수동으로 확인함', href: '/lies/manual-test' },
      { label: '시간 없어서 스킵', href: '/lies/no-time' },
      { label: '어차피 QA가 찾음', href: '/lies/qa-will-find' },
      { label: 'console.log만 찍음', href: '/lies/console-log' },
    ],
  },
  {
    label: '리팩토링 예정',
    children: [
      { label: '일단 돌아가니까', href: '/lies/it-works' },
      { label: '기술부채 이슈 생성', href: '/lies/tech-debt' },
      { label: '다음 스프린트에', href: '/lies/next-sprint' },
      { label: '누가 건드리면 그때', href: '/lies/someone-else' },
    ],
  },
  { label: '거의 다 됐어', href: '/lies/almost-done' },
];

const megaColumns: MegaMenuColumn[] = [
  {
    title: '회의',
    links: [
      { label: '회의하기 싫다', href: '/hate/meeting' },
      { label: '이 회의 왜 하는거지', href: '/meeting/why' },
      { label: '나 왜 초대됨?', href: '/meeting/invited' },
      { label: '메일로 될 것 같은데', href: '/meeting/email-pls' },
    ],
    active: true,
  },
  {
    title: '코드리뷰',
    links: [
      { label: '리뷰하기 싫다', href: '/hate/review' },
      { label: 'LGTM (안봄)', href: '/review/lgtm' },
      { label: '이거 누가 짠거야', href: '/review/who' },
      { label: '아 내가 짰네', href: '/review/me' },
    ],
  },
  {
    title: '배포',
    links: [
      { label: '배포하기 싫다', href: '/hate/deploy' },
      { label: '금요일 배포 ㄴㄴ', href: '/deploy/friday-no' },
      { label: '롤백 각오하셈', href: '/deploy/rollback' },
      { label: '핫픽스 또?', href: '/deploy/hotfix' },
      { label: '스테이징 먼저요', href: '/deploy/staging' },
    ],
  },
  {
    title: '문서화',
    links: [
      { label: '문서 쓰기 싫다', href: '/hate/docs' },
      { label: '코드가 곧 문서', href: '/docs/code-is-doc' },
      { label: 'TODO: 나중에 작성', href: '/docs/todo' },
      { label: '주석 달기 귀찮아', href: '/docs/comment' },
      { label: 'README 업데이트', href: '/docs/readme' },
    ],
  },
];

// ============================================================================
// Combobox 옵션
// ============================================================================
const frameworkOptions: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const selectOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'incheon', label: '인천' },
];

// ============================================================================
// Toast Demo Component
// ============================================================================
function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        size="sm"
        onClick={() =>
          toast({ title: '정보', description: '일반 알림 메시지입니다.' })
        }
      >
        기본 Toast
      </Button>
      <Button
        size="sm"
        variant="success"
        onClick={() =>
          toast({
            title: '성공',
            description: '작업이 완료되었습니다.',
            variant: 'success',
          })
        }
      >
        성공 Toast
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() =>
          toast({
            title: '오류',
            description: '문제가 발생했습니다.',
            variant: 'error',
          })
        }
      >
        에러 Toast
      </Button>
    </div>
  );
}

// ============================================================================
// Tab 1: 피드백 & 상태 컴포넌트
// ============================================================================
function FeedbackTab() {
  const [progress, setProgress] = useState(45);

  return (
    <div className="space-y-8">
      <Heading level="h2" className="sr-only">
        피드백 및 상태 컴포넌트
      </Heading>
      {/* Alert */}
      <Card>
        <CardHeader>
          <CardTitle>Alert</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <Alert variant="info">
            <AlertTitle>정보</AlertTitle>
            <AlertDescription>
              시스템 점검이 예정되어 있습니다.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>성공</AlertTitle>
            <AlertDescription>저장이 완료되었습니다.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>경고</AlertTitle>
            <AlertDescription>저장 공간이 부족합니다.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>오류</AlertTitle>
            <AlertDescription>네트워크 연결이 끊어졌습니다.</AlertDescription>
          </Alert>
        </CardBody>
      </Card>

      {/* Toast */}
      <Card>
        <CardHeader>
          <CardTitle>Toast</CardTitle>
        </CardHeader>
        <CardBody>
          <ToastDemo />
        </CardBody>
      </Card>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="space-y-2">
            <Body className="text-sm">Linear Progress: {progress}%</Body>
            <Progress value={progress} />
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                -10%
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                +10%
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <CircularProgress value={75} size={48} />
              <Body className="text-sm mt-2">75%</Body>
            </div>
            <div className="text-center">
              <CircularProgress value={45} size={48} color="success" />
              <Body className="text-sm mt-2">45%</Body>
            </div>
            <div className="text-center">
              <CircularProgress size={48} color="danger" />
              <Body className="text-sm mt-2">불확정</Body>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Spinner */}
      <Card>
        <CardHeader>
          <CardTitle>Spinner</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Spinner size="sm" />
              <Body className="text-sm mt-2">Small</Body>
            </div>
            <div className="text-center">
              <Spinner size="md" />
              <Body className="text-sm mt-2">Medium</Body>
            </div>
            <div className="text-center">
              <Spinner size="lg" />
              <Body className="text-sm mt-2">Large</Body>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Badge */}
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Badge>기본</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="danger">Danger</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-6 w-6" />
              <NumberBadge count={5} className="absolute -top-2 -right-2" />
            </div>
            <div className="relative">
              <Bell className="h-6 w-6" />
              <NumberBadge
                count={99}
                max={99}
                className="absolute -top-2 -right-2"
              />
            </div>
            <div className="relative">
              <Bell className="h-6 w-6" />
              <DotBadge className="absolute -top-1 -right-1" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton</CardTitle>
        </CardHeader>
        <CardBody className="space-y-6">
          <div className="flex items-center gap-4">
            <SkeletonAvatar size="lg" />
            <div className="flex-1">
              <SkeletonText lines={2} />
            </div>
          </div>
          <SkeletonCard hasImage imageHeight={100} lines={2} />
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================================================
// Tab 2: 폼 입력 컴포넌트
// ============================================================================
function FormTab() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkboxGroupValue, setCheckboxGroupValue] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [comboValue, setComboValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className="space-y-8">
      <Heading level="h2" className="sr-only">
        폼 입력 컴포넌트
      </Heading>
      {/* Input */}
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4 max-w-md">
          <FormField>
            <FormLabel htmlFor="input-default">기본 입력</FormLabel>
            <Input
              id="input-default"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="텍스트를 입력하세요"
            />
            <FormHelperText>도움말 텍스트입니다.</FormHelperText>
          </FormField>
          <FormField>
            <FormLabel htmlFor="input-error">에러 상태</FormLabel>
            <Input id="input-error" placeholder="에러 상태" error />
            <FormError>필수 입력 항목입니다.</FormError>
          </FormField>
          <FormField>
            <FormLabel htmlFor="input-disabled">비활성화</FormLabel>
            <Input id="input-disabled" placeholder="비활성화" disabled />
          </FormField>
        </CardBody>
      </Card>

      {/* Textarea */}
      <Card>
        <CardHeader>
          <CardTitle>Textarea</CardTitle>
        </CardHeader>
        <CardBody className="max-w-md">
          <FormField>
            <FormLabel htmlFor="textarea-default">내용 입력</FormLabel>
            <Textarea
              id="textarea-default"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="여러 줄의 텍스트를 입력하세요"
              rows={4}
            />
          </FormField>
        </CardBody>
      </Card>

      {/* Checkbox */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="checkbox-single"
              checked={checkboxValue}
              onCheckedChange={(checked) =>
                setCheckboxValue(checked as boolean)
              }
            />
            <Label htmlFor="checkbox-single">단일 체크박스</Label>
          </div>
          <CheckboxGroup
            value={checkboxGroupValue}
            onValueChange={setCheckboxGroupValue}
          >
            <div className="space-y-2">
              <CheckboxGroupItem value="option1" label="옵션 1" />
              <CheckboxGroupItem value="option2" label="옵션 2" />
              <CheckboxGroupItem value="option3" label="옵션 3" />
            </div>
          </CheckboxGroup>
          <Body className="text-sm text-krds-gray-50">
            선택: {checkboxGroupValue.join(', ') || '없음'}
          </Body>
        </CardBody>
      </Card>

      {/* Radio */}
      <Card>
        <CardHeader>
          <CardTitle>Radio</CardTitle>
        </CardHeader>
        <CardBody>
          <RadioGroup value={radioValue} onValueChange={setRadioValue}>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="radio1" id="radio-1" />
                <Label htmlFor="radio-1">라디오 1</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="radio2" id="radio-2" />
                <Label htmlFor="radio-2">라디오 2</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="radio3" id="radio-3" />
                <Label htmlFor="radio-3">라디오 3</Label>
              </div>
            </div>
          </RadioGroup>
          <Body className="text-sm text-krds-gray-50 mt-2">
            선택: {radioValue || '없음'}
          </Body>
        </CardBody>
      </Card>

      {/* Select */}
      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
        </CardHeader>
        <CardBody className="max-w-xs">
          <Select
            options={selectOptions}
            value={selectValue}
            onChange={(v) => setSelectValue(v as string)}
            placeholder="도시를 선택하세요"
            label="도시"
          />
          <Body className="text-sm text-krds-gray-50 mt-2">
            선택: {selectValue || '없음'}
          </Body>
        </CardBody>
      </Card>

      {/* Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch
              id="switch-default"
              checked={switchValue}
              onCheckedChange={setSwitchValue}
            />
            <Label htmlFor="switch-default">알림 받기</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="switch-disabled" disabled />
            <Label htmlFor="switch-disabled">비활성화됨</Label>
          </div>
        </CardBody>
      </Card>

      {/* Combobox */}
      <Card>
        <CardHeader>
          <CardTitle>Combobox</CardTitle>
        </CardHeader>
        <CardBody className="max-w-xs">
          <Combobox
            options={frameworkOptions}
            value={comboValue}
            onValueChange={setComboValue}
            placeholder="프레임워크 선택"
            clearable
          />
          <Body className="text-sm text-krds-gray-50 mt-2">
            선택: {comboValue || '없음'}
          </Body>
        </CardBody>
      </Card>

      {/* Slider */}
      <Card>
        <CardHeader>
          <CardTitle>Slider</CardTitle>
        </CardHeader>
        <CardBody className="max-w-md space-y-4">
          <Slider
            value={sliderValue}
            onValueChange={(v) => setSliderValue(v as number)}
            label="볼륨"
            showValue
          />
          <Slider defaultValue={[20, 80]} label="가격 범위" showValue />
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================================================
// Tab 3: 네비게이션 컴포넌트
// ============================================================================
function NavigationTab() {
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '컴포넌트', href: '/components' },
    { label: '테스트', href: '/test-components' },
  ];

  return (
    <div className="space-y-8">
      <Heading level="h2" className="sr-only">
        네비게이션 컴포넌트
      </Heading>
      {/* Breadcrumb */}
      <Card>
        <CardHeader>
          <CardTitle>Breadcrumb</CardTitle>
        </CardHeader>
        <CardBody>
          <Breadcrumb items={breadcrumbItems} />
        </CardBody>
      </Card>

      {/* Pagination */}
      <Card>
        <CardHeader>
          <CardTitle>Pagination</CardTitle>
        </CardHeader>
        <CardBody>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
          <Body className="text-sm text-krds-gray-50 mt-2">
            현재 페이지: {currentPage}
          </Body>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
        </CardHeader>
        <CardBody>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">탭 1</TabsTrigger>
              <TabsTrigger value="tab2">탭 2</TabsTrigger>
              <TabsTrigger value="tab3">탭 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Body className="p-4">첫 번째 탭 내용입니다.</Body>
            </TabsContent>
            <TabsContent value="tab2">
              <Body className="p-4">두 번째 탭 내용입니다.</Body>
            </TabsContent>
            <TabsContent value="tab3">
              <Body className="p-4">세 번째 탭 내용입니다.</Body>
            </TabsContent>
          </Tabs>
        </CardBody>
      </Card>

      {/* Link */}
      <Card>
        <CardHeader>
          <CardTitle>Link</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          <div>
            <Link href="/">기본 링크</Link>
          </div>
          <div>
            <Link href="https://google.com" external>
              외부 링크 <ExternalLink className="inline h-3 w-3" />
            </Link>
          </div>
          <div>
            <Link href="/">플레인 링크</Link>
          </div>
        </CardBody>
      </Card>

      {/* SkipLink */}
      <Card>
        <CardHeader>
          <CardTitle>SkipLink</CardTitle>
        </CardHeader>
        <CardBody>
          <Body className="text-sm text-krds-gray-50 mb-2">
            Tab 키를 눌러 포커스하면 건너뛰기 링크가 나타납니다.
          </Body>
          <div className="relative p-4 border border-krds-gray-20 rounded-lg">
            <SkipLink
              links={[{ href: '#main-content', label: '본문 바로가기' }]}
            />
            <Body>건너뛰기 링크 테스트 영역</Body>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================================================
// Tab 4: 액션 & 오버레이 컴포넌트
// ============================================================================
function ActionTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const [menuStatus, setMenuStatus] = useState('online');

  return (
    <div className="space-y-8">
      <Heading level="h2" className="sr-only">
        액션 및 오버레이 컴포넌트
      </Heading>
      {/* Button */}
      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </CardBody>
      </Card>

      {/* AlertDialog */}
      <Card>
        <CardHeader>
          <CardTitle>AlertDialog</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">확인 다이얼로그</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction>삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="danger">위험 작업</Button>
              </AlertDialogTrigger>
              <AlertDialogContent variant="danger">
                <AlertDialogHeader>
                  <AlertDialogTitle>계정 삭제</AlertDialogTitle>
                  <AlertDialogDescription>
                    계정을 삭제하면 모든 데이터가 삭제됩니다.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <AlertDialogAction variant="danger">삭제</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Modal</CardTitle>
        </CardHeader>
        <CardBody>
          <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
          <Modal open={isModalOpen} onClose={setIsModalOpen}>
            <ModalTitle>모달 제목</ModalTitle>
            <ModalBody>
              <Body>모달 내용입니다. 포커스 트래핑이 작동합니다.</Body>
              <Input placeholder="포커스 테스트" className="mt-4" />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>확인</Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>

      {/* DropdownMenu */}
      <Card>
        <CardHeader>
          <CardTitle>DropdownMenu</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">기본 메뉴</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<User className="h-4 w-4" />}>
                  프로필
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>
                  설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  icon={<LogOut className="h-4 w-4" />}
                  destructive
                >
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">체크박스 메뉴</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuCheckboxItem
                  checked={showNotifications}
                  onCheckedChange={setShowNotifications}
                >
                  알림 표시
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">라디오 메뉴</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuRadioGroup
                  value={menuStatus}
                  onValueChange={setMenuStatus}
                >
                  <DropdownMenuRadioItem value="online">
                    온라인
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="away">
                    자리 비움
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="offline">
                    오프라인
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardBody>
      </Card>

      {/* Tooltip */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex gap-4">
            <Tooltip content="위쪽 툴팁">
              <Button variant="outline">위</Button>
            </Tooltip>
            <Tooltip content="오른쪽 툴팁" position="right">
              <Button variant="outline">오른쪽</Button>
            </Tooltip>
            <Tooltip content="아래쪽 툴팁" position="bottom">
              <Button variant="outline">아래</Button>
            </Tooltip>
            <Tooltip content="왼쪽 툴팁" position="left">
              <Button variant="outline">왼쪽</Button>
            </Tooltip>
          </div>
        </CardBody>
      </Card>

      {/* Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Accordion</CardTitle>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================================================
// Tab 5: 데이터 표시 컴포넌트
// ============================================================================
function DataTab() {
  return (
    <div className="space-y-8">
      <Heading level="h2" className="sr-only">
        데이터 표시 컴포넌트
      </Heading>
      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Table</CardTitle>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>홍길동</TableCell>
                <TableCell>hong@example.com</TableCell>
                <TableCell>
                  <Badge color="success">활성</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>김철수</TableCell>
                <TableCell>kim@example.com</TableCell>
                <TableCell>
                  <Badge color="warning">대기</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>이영희</TableCell>
                <TableCell>lee@example.com</TableCell>
                <TableCell>
                  <Badge color="danger">비활성</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle>List</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <Body className="font-medium mb-2">순서 없는 목록</Body>
            <List>
              <ListItem>첫 번째 항목</ListItem>
              <ListItem>두 번째 항목</ListItem>
              <ListItem>세 번째 항목</ListItem>
            </List>
          </div>
          <div>
            <Body className="font-medium mb-2">순서 있는 목록</Body>
            <List variant="ordered">
              <ListItem>첫 번째 단계</ListItem>
              <ListItem>두 번째 단계</ListItem>
              <ListItem>세 번째 단계</ListItem>
            </List>
          </div>
        </CardBody>
      </Card>

      {/* Card */}
      <Card>
        <CardHeader>
          <CardTitle>Card</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
              </CardHeader>
              <CardBody>
                <Body>그림자가 있는 카드입니다.</Body>
              </CardBody>
            </Card>
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Outline Card</CardTitle>
              </CardHeader>
              <CardBody>
                <Body>테두리가 있는 카드입니다.</Body>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

// ============================================================================
// 접근성 체크리스트 컴포넌트
// ============================================================================
function AccessibilityChecklist() {
  const items = [
    { component: 'Alert', aria: 'role="alert"', keyboard: '-', focus: '-' },
    {
      component: 'Toast',
      aria: 'aria-live="polite"',
      keyboard: '-',
      focus: '-',
    },
    {
      component: 'Progress',
      aria: 'role="progressbar", aria-valuenow',
      keyboard: '-',
      focus: '-',
    },
    {
      component: 'Spinner',
      aria: 'role="status", aria-live',
      keyboard: '-',
      focus: '-',
    },
    { component: 'Badge', aria: 'aria-label', keyboard: '-', focus: '-' },
    {
      component: 'Skeleton',
      aria: 'aria-hidden="true"',
      keyboard: '-',
      focus: '-',
    },
    {
      component: 'Input',
      aria: 'aria-invalid, aria-describedby',
      keyboard: '✓',
      focus: '✓',
    },
    {
      component: 'Textarea',
      aria: 'aria-invalid, aria-describedby',
      keyboard: '✓',
      focus: '✓',
    },
    {
      component: 'Checkbox',
      aria: 'role="checkbox", aria-checked',
      keyboard: 'Space',
      focus: '✓',
    },
    {
      component: 'Radio',
      aria: 'role="radio", aria-checked',
      keyboard: '화살표',
      focus: '✓',
    },
    {
      component: 'Select',
      aria: 'role="listbox"',
      keyboard: '화살표/Enter',
      focus: '✓',
    },
    {
      component: 'Switch',
      aria: 'role="switch", aria-checked',
      keyboard: 'Space',
      focus: '✓',
    },
    {
      component: 'Combobox',
      aria: 'role="combobox", aria-expanded',
      keyboard: '화살표/Enter',
      focus: '✓',
    },
    {
      component: 'Slider',
      aria: 'role="slider", aria-valuenow',
      keyboard: '화살표',
      focus: '✓',
    },
    {
      component: 'Breadcrumb',
      aria: 'nav aria-label',
      keyboard: 'Tab',
      focus: '✓',
    },
    {
      component: 'Pagination',
      aria: 'nav aria-label',
      keyboard: 'Tab',
      focus: '✓',
    },
    {
      component: 'Tabs',
      aria: 'role="tablist/tab/tabpanel"',
      keyboard: '화살표',
      focus: '✓',
    },
    {
      component: 'Link',
      aria: 'href, aria-current',
      keyboard: 'Enter',
      focus: '✓',
    },
    {
      component: 'SkipLink',
      aria: 'href (anchor)',
      keyboard: 'Tab/Enter',
      focus: '✓',
    },
    {
      component: 'Button',
      aria: 'aria-disabled, aria-busy',
      keyboard: 'Enter/Space',
      focus: '✓',
    },
    {
      component: 'AlertDialog',
      aria: 'role="alertdialog"',
      keyboard: 'Esc',
      focus: '트래핑',
    },
    {
      component: 'Modal',
      aria: 'role="dialog"',
      keyboard: 'Esc',
      focus: '트래핑',
    },
    {
      component: 'DropdownMenu',
      aria: 'role="menu/menuitem"',
      keyboard: '화살표/Enter',
      focus: '✓',
    },
    { component: 'Tooltip', aria: 'role="tooltip"', keyboard: '-', focus: '✓' },
    {
      component: 'Accordion',
      aria: 'aria-expanded, aria-controls',
      keyboard: 'Enter/Space',
      focus: '✓',
    },
    {
      component: 'Table',
      aria: 'role="table/row/cell"',
      keyboard: 'Tab',
      focus: '✓',
    },
  ];

  return (
    <>
      <Heading level="h2" className="sr-only">
        접근성 체크리스트
      </Heading>
      <Card>
        <CardHeader>
          <CardTitle>접근성 체크리스트 (KWCAG 2.2 AA)</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>컴포넌트</TableHead>
                  <TableHead>ARIA 속성</TableHead>
                  <TableHead>키보드</TableHead>
                  <TableHead>포커스</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.component}>
                    <TableCell className="font-medium">
                      {item.component}
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {item.aria}
                    </TableCell>
                    <TableCell>{item.keyboard}</TableCell>
                    <TableCell>{item.focus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

// ============================================================================
// Main Page Component
// ============================================================================
export default function TestComponentsPage() {
  return (
    <ToastProvider>
      <div>
        <Masthead />
        <HeaderWithNavigation
          navigationItems={navigationItems}
          stickyBehavior="auto"
        />
        {/* <HeaderWithMegaMenu megaColumns={megaColumns} stickyBehavior="auto" /> */}

        <Container>
          <Tabs defaultValue="feedback">
            <TabsList className="flex-wrap">
              <TabsTrigger value="feedback">피드백 & 상태</TabsTrigger>
              <TabsTrigger value="form">폼 입력</TabsTrigger>
              <TabsTrigger value="navigation">네비게이션</TabsTrigger>
              <TabsTrigger value="action">액션 & 오버레이</TabsTrigger>
              <TabsTrigger value="data">데이터 표시</TabsTrigger>
              <TabsTrigger value="checklist">체크리스트</TabsTrigger>
            </TabsList>

            <TabsContent value="feedback">
              <FeedbackTab />
            </TabsContent>

            <TabsContent value="form">
              <FormTab />
            </TabsContent>

            <TabsContent value="navigation">
              <NavigationTab />
            </TabsContent>

            <TabsContent value="action">
              <ActionTab />
            </TabsContent>

            <TabsContent value="data">
              <DataTab />
            </TabsContent>

            <TabsContent value="checklist">
              <AccessibilityChecklist />
            </TabsContent>
          </Tabs>
        </Container>

        <Footer />
      </div>
      <Toaster />
    </ToastProvider>
  );
}
