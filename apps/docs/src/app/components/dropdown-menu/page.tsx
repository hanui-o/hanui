'use client';

import React, { useState } from 'react';

// Docs layout components
import {
  PageSection,
  Heading,
  Subsection,
  PageNavigation,
} from '@/components/content';
import { Installation } from '@/components/content/Installation';

// UI components - from @hanui/react
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
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
import { ComponentPreview } from '@/components/content/ComponentPreview';
import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  Mail,
  PlusCircle,
  UserPlus,
  Cloud,
  CreditCard,
  Keyboard,
  MoreHorizontal,
  Trash2,
  Copy,
  Edit,
  Globe,
  RefreshCw,
} from 'lucide-react';

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState('bottom');
  const [language, setLanguage] = useState('ko');
  const [fontSize, setFontSize] = useState('medium');

  const languages = [
    { value: 'ko', label: '한국어' },
    { value: 'en', label: 'English (영어)' },
    { value: 'zh', label: '中文 (중국어)' },
    { value: 'ja', label: '日本語 (일본어)' },
    { value: 'fr', label: 'français (프랑스어)' },
  ];

  const positions = [
    { value: 'top', label: '상단' },
    { value: 'bottom', label: '하단' },
    { value: 'left', label: '왼쪽' },
    { value: 'right', label: '오른쪽' },
  ];

  const [selectedOption, setSelectedOption] = useState('option1');
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' },
  ];

  const fontSizes = [
    { value: 'small', label: '작게' },
    { value: 'medium', label: '보통' },
    { value: 'large', label: '조금 크게' },
    { value: 'xlarge', label: '크게' },
    { value: 'xxlarge', label: '가장크게' },
  ];

  return (
    <>
      <Heading
        level="h1"
        title="DropdownMenu"
        description="버튼을 클릭하면 나타나는 액션 메뉴입니다. 메뉴 아이템, 체크박스, 라디오, 하위 메뉴를 지원합니다."
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="api">API 레퍼런스</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview">
          <PageSection level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              description="DropdownMenu는 Radix UI 기반의 접근성이 보장된 드롭다운 메뉴입니다. 키보드 탐색, 체크박스/라디오 선택, 하위 메뉴를 지원합니다."
              className="sr-only"
            />
            <ComponentPreview>
              <div className="flex items-center gap-10">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconLeft={<Globe className="h-4 w-4" />}
                    >
                      {languages.find((l) => l.value === language)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent showArrow className="w-48">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.value}
                        onSelect={() => setLanguage(lang.value)}
                        selected={language === lang.value}
                      >
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">메뉴 열기</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
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
              </div>
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">메뉴 열기</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<User />}>프로필</DropdownMenuItem>
    <DropdownMenuItem icon={<Settings />}>설정</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<LogOut />} destructive>로그아웃</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
            </Code>
          </PageSection>

          <PageSection level="h2">
            <Installation componentName="dropdown-menu" />
          </PageSection>

          <PageSection level="h2">
            <Heading
              level="h2"
              id="usage"
              title="사용법"
              description="DropdownMenu 컴포넌트들을 import하여 사용합니다. Button을 Trigger의 자식으로 사용하면 화살표가 자동으로 추가됩니다."
            />
            <Code variant="block" language="tsx">
              {`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
} from '@hanui/react'

{/* Button을 자식으로 사용하면 화살표가 자동으로 추가됩니다 */}
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">메뉴 열기</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>프로필</DropdownMenuItem>
    <DropdownMenuItem>설정</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
            </Code>
          </PageSection>

          {/* 예제 섹션 */}
          <PageSection level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading
                level="h3"
                title="기본 트리거 (자동 화살표)"
                description="asChild 없이 사용하면 화살표가 자동으로 추가됩니다."
              />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-md border border-krds-gray-30 px-4 py-2 hover:bg-krds-gray-5">
                    {options.find((o) => o.value === selectedOption)?.label}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {options.map((opt) => (
                      <DropdownMenuItem
                        key={opt.value}
                        onSelect={() => setSelectedOption(opt.value)}
                        selected={selectedOption === opt.value}
                      >
                        {opt.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`{/* asChild 없이 사용하면 화살표가 자동으로 추가됩니다 */}
<DropdownMenu>
  <DropdownMenuTrigger className="...">
    메뉴 선택
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>옵션 1</DropdownMenuItem>
    <DropdownMenuItem>옵션 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

{/* 화살표를 숨기려면 hideArrow prop 사용 */}
<DropdownMenuTrigger hideArrow>메뉴</DropdownMenuTrigger>

{/* asChild 사용 시 Button의 iconRight로 화살표 추가 */}
<DropdownMenuTrigger asChild>
  <Button iconRight={<ChevronDown />}>메뉴</Button>
</DropdownMenuTrigger>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Shortcut" />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">편집</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                      복사
                      <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      붙여넣기
                      <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      잘라내기
                      <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      실행 취소
                      <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenuItem>
  복사
  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
</DropdownMenuItem>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Checkbox" />
              <ComponentPreview>
                <div className="flex flex-col items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline">보기 설정</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuCheckboxItem
                        checked={showStatusBar}
                        onCheckedChange={setShowStatusBar}
                      >
                        상태 표시줄
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showActivityBar}
                        onCheckedChange={setShowActivityBar}
                      >
                        활동 표시줄
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={showPanel}
                        onCheckedChange={setShowPanel}
                      >
                        패널
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-sm text-krds-gray-50">
                    상태: {showStatusBar ? '✓' : '✗'} 상태 표시줄,{' '}
                    {showActivityBar ? '✓' : '✗'} 활동 표시줄,{' '}
                    {showPanel ? '✓' : '✗'} 패널
                  </span>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [showStatusBar, setShowStatusBar] = useState(true);

<DropdownMenuCheckboxItem
  checked={showStatusBar}
  onCheckedChange={setShowStatusBar}
>
  상태 표시줄
</DropdownMenuCheckboxItem>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Radio Group" />
              <ComponentPreview>
                <div className="flex flex-col items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="outline">
                        패널 위치:{' '}
                        {positions.find((p) => p.value === position)?.label}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        {positions.map((pos) => (
                          <DropdownMenuRadioItem
                            key={pos.value}
                            value={pos.value}
                          >
                            {pos.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`const [position, setPosition] = useState('bottom');

<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">하단</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="left">왼쪽</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="right">오른쪽</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Submenu" />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">더 보기</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem icon={<PlusCircle className="h-4 w-4" />}>
                      새로 만들기
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <UserPlus className="mr-2 h-4 w-4" />
                        사용자 초대
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem icon={<Mail className="h-4 w-4" />}>
                          이메일로 초대
                        </DropdownMenuItem>
                        <DropdownMenuItem icon={<Cloud className="h-4 w-4" />}>
                          링크 공유
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>
                      설정
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenuSub>
  <DropdownMenuSubTrigger>
    <UserPlus className="mr-2 h-4 w-4" />
    사용자 초대
  </DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem icon={<Mail className="h-4 w-4" />}>
      이메일로 초대
    </DropdownMenuItem>
    <DropdownMenuItem icon={<Cloud className="h-4 w-4" />}>
      링크 공유
    </DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Group" />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="outline">계정</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem icon={<User className="h-4 w-4" />}>
                        프로필
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        icon={<CreditCard className="h-4 w-4" />}
                      >
                        결제
                      </DropdownMenuItem>
                      <DropdownMenuItem icon={<Keyboard className="h-4 w-4" />}>
                        단축키
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        icon={<HelpCircle className="h-4 w-4" />}
                      >
                        도움말
                      </DropdownMenuItem>
                      <DropdownMenuItem icon={<Mail className="h-4 w-4" />}>
                        문의하기
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenuGroup>
  <DropdownMenuLabel>계정</DropdownMenuLabel>
  <DropdownMenuItem icon={<User className="h-4 w-4" />}>
    프로필
  </DropdownMenuItem>
  <DropdownMenuItem icon={<CreditCard className="h-4 w-4" />}>
    결제
  </DropdownMenuItem>
</DropdownMenuGroup>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Action Menu" />
              <ComponentPreview>
                <div className="flex items-center justify-between p-4 border border-krds-gray-20 rounded-lg min-w-80">
                  <div>
                    <div className="font-medium">프로젝트 문서</div>
                    <div className="text-sm text-krds-gray-50">
                      2024년 1월 15일
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">액션 메뉴</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem icon={<Edit className="h-4 w-4" />}>
                        수정
                      </DropdownMenuItem>
                      <DropdownMenuItem icon={<Copy className="h-4 w-4" />}>
                        복제
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        icon={<Trash2 className="h-4 w-4" />}
                        destructive
                      >
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">액션 메뉴</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem icon={<Edit className="h-4 w-4" />}>수정</DropdownMenuItem>
    <DropdownMenuItem icon={<Copy className="h-4 w-4" />}>복제</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash2 className="h-4 w-4" />} destructive>
      삭제
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="언어 변경"
                description="언어 선택 드롭다운 예제입니다. showArrow prop으로 화살표를 표시합니다."
              />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconLeft={<Globe className="h-4 w-4" />}
                    >
                      {languages.find((l) => l.value === language)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent showArrow className="w-48">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.value}
                        onSelect={() => setLanguage(lang.value)}
                        selected={language === lang.value}
                      >
                        {lang.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="xs" iconLeft={<Globe className="h-4 w-4" />}>
      언어 변경
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent showArrow className="w-48">
    <DropdownMenuLabel>한국어</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>한국어</DropdownMenuItem>
    <DropdownMenuItem>English (영어)</DropdownMenuItem>
    <DropdownMenuItem>中文 (중국어)</DropdownMenuItem>
    <DropdownMenuItem>日本語 (일본어)</DropdownMenuItem>
    <DropdownMenuItem>français (프랑스어)</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              </Code>
            </Subsection>

            <Subsection level="h3">
              <Heading
                level="h3"
                title="화면크기 조정"
                description="화면 크기/글꼴 크기 조정 드롭다운 예제입니다."
              />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="xs">
                      화면크기
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent showArrow className="w-36">
                    {fontSizes.map((size) => (
                      <DropdownMenuItem
                        key={size.value}
                        onSelect={() => setFontSize(size.value)}
                        className="gap-3"
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded border text-sm font-medium ${
                            fontSize === size.value
                              ? 'border-krds-primary-base bg-krds-primary-5 text-krds-primary-base'
                              : 'border-krds-gray-30 text-krds-gray-70'
                          }`}
                        >
                          가
                        </span>
                        {size.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setFontSize('medium')}
                      className="gap-2 text-krds-gray-50"
                    >
                      <RefreshCw className="h-4 w-4" />
                      초기화
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ComponentPreview>
              <Code variant="block" language="tsx">
                {`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="xs">
      화면크기
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent showArrow className="w-36">
    <DropdownMenuItem>
      <span className="flex h-6 w-6 items-center justify-center rounded border">가</span>
      작게
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span className="flex h-6 w-6 items-center justify-center rounded border border-krds-primary-base bg-krds-primary-5 text-krds-primary-base">가</span>
      보통
    </DropdownMenuItem>
    {/* ... */}
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <RefreshCw className="h-4 w-4" />
      초기화
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              </Code>
            </Subsection>
          </PageSection>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <PageSection level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="DropdownMenuTrigger Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>hideArrow</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      화살표 아이콘 숨김 (asChild 미사용 시)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>asChild</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      자식 컴포넌트를 트리거로 사용 (화살표 자동 추가 안됨)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="DropdownMenuItem Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>icon</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">React.ReactNode</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>아이템 왼쪽에 표시할 아이콘</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>shortcut</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">string</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>단축키 표시 (예: "⌘K")</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>inset</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>
                      왼쪽 들여쓰기 (체크박스/라디오와 정렬용)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>destructive</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>위험 액션 스타일 (빨간색)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>disabled</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>비활성화</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>onSelect</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">(event: Event) =&gt; void</Code>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>선택 시 콜백</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="DropdownMenuContent Props" />
              <Table small>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>기본값</TableHead>
                    <TableHead>설명</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>showArrow</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">boolean</Code>
                    </TableCell>
                    <TableCell>false</TableCell>
                    <TableCell>화살표 표시 여부</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>arrowWidth</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>10</TableCell>
                    <TableCell>화살표 너비 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>arrowHeight</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>화살표 높이 (px)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>align</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">
                        'start' | 'center' | 'end'
                      </Code>
                    </TableCell>
                    <TableCell>'start'</TableCell>
                    <TableCell>정렬 위치</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">
                      <Code>sideOffset</Code>
                    </TableCell>
                    <TableCell>
                      <Code className="text-xs">number</Code>
                    </TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>트리거와의 간격 (px)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Subsection>

            <Subsection level="h3">
              <Heading level="h3" title="Available Components" />
              <Code variant="block" language="typescript">
                {`// 기본 구성
DropdownMenu        // Root
DropdownMenuTrigger // 트리거 버튼
DropdownMenuContent // 메뉴 콘텐츠 컨테이너
DropdownMenuItem    // 메뉴 아이템

// 레이블 & 구분선
DropdownMenuLabel     // 섹션 레이블
DropdownMenuSeparator // 구분선
DropdownMenuShortcut  // 단축키 표시

// 선택 아이템
DropdownMenuCheckboxItem // 체크박스 아이템
DropdownMenuRadioGroup   // 라디오 그룹
DropdownMenuRadioItem    // 라디오 아이템

// 그룹화
DropdownMenuGroup // 메뉴 그룹

// 하위 메뉴
DropdownMenuSub        // 하위 메뉴 Root
DropdownMenuSubTrigger // 하위 메뉴 트리거
DropdownMenuSubContent // 하위 메뉴 콘텐츠

// 포털
DropdownMenuPortal // 포털 (Content에 내장)`}
              </Code>
            </Subsection>
          </PageSection>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Display', href: '/components/display' }}
        next={{ title: 'File Upload', href: '/components/file-upload' }}
      />
    </>
  );
}
