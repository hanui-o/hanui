'use client';

import React, { useState } from 'react';

// Docs layout components
import {
  PageSection as Section,
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
} from 'lucide-react';

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState('bottom');

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
          <Section level="h2">
            <Heading
              level="h2"
              id="overview"
              title="개요"
              className="sr-only"
            />
            <ComponentPreview>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">메뉴 열기</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
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
            </ComponentPreview>
            <Code variant="block" language="tsx">
              {`<DropdownMenu>
  <DropdownMenuTrigger asChild>
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
          </Section>

          <Section level="h2">
            <Installation componentName="dropdown-menu" />
          </Section>

          <Section level="h2">
            <Heading level="h2" id="usage" title="사용법" />
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

<DropdownMenu>
  <DropdownMenuTrigger asChild>
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
          </Section>

          {/* 예제 섹션 */}
          <Section level="h2">
            <Heading level="h2" id="examples" title="예제" />

            <Subsection level="h3">
              <Heading level="h3" title="Shortcut" />
              <ComponentPreview>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">보기 설정</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>표시 옵션</DropdownMenuLabel>
                      <DropdownMenuSeparator />
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
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">패널 위치</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>패널 위치</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={position}
                        onValueChange={setPosition}
                      >
                        <DropdownMenuRadioItem value="top">
                          상단
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">
                          하단
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="left">
                          왼쪽
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">
                          오른쪽
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-sm text-krds-gray-50">
                    선택된 위치: {position}
                  </span>
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
                  <DropdownMenuTrigger asChild>
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
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">계정</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>계정</DropdownMenuLabel>
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
                      <DropdownMenuLabel>지원</DropdownMenuLabel>
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
          </Section>
        </TabsContent>

        {/* API 탭 */}
        <TabsContent value="api">
          <Section level="h2">
            <Heading level="h2" id="api" title="API 레퍼런스" />

            <Subsection level="h3">
              <Heading level="h3" title="DropdownMenuItem Props" />
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
          </Section>
        </TabsContent>
      </Tabs>

      <PageNavigation
        prev={{ title: 'Combobox', href: '/components/combobox' }}
        next={{ title: 'Form', href: '/components/form' }}
      />
    </>
  );
}
