'use client';

import React, { useState } from 'react';
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
  Heading,
  Body,
  Code,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@hanui/react';
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
      <Heading level="h1">DropdownMenu</Heading>
      <Body className="text-krds-gray-60 mb-8">
        버튼을 클릭하면 나타나는 액션 메뉴입니다. 메뉴 아이템, 체크박스, 라디오,
        하위 메뉴를 지원합니다.
      </Body>

      {/* 기본 사용 */}
      <section className="space-y-4">
        <Heading level="h2">기본 사용</Heading>
        <Body>기본적인 드롭다운 메뉴입니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
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
              <DropdownMenuItem icon={<HelpCircle className="h-4 w-4" />}>
                도움말
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

        <Code variant="block" language="tsx">{`import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Button,
} from '@hanui/react';
import { User, Settings, LogOut } from 'lucide-react';

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
    <DropdownMenuItem icon={<LogOut className="h-4 w-4" />} destructive>
      로그아웃
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</Code>
      </section>

      {/* 단축키 */}
      <section className="space-y-4">
        <Heading level="h2">단축키</Heading>
        <Body>메뉴 아이템에 단축키를 표시할 수 있습니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">편집</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem shortcut="⌘C">
                복사
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘V">
                붙여넣기
                <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem shortcut="⌘X">
                잘라내기
                <DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem shortcut="⌘Z">
                실행 취소
                <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem shortcut="⇧⌘Z">
                다시 실행
                <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Code variant="block" language="tsx">{`<DropdownMenuItem>
  복사
  <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
</DropdownMenuItem>`}</Code>
      </section>

      {/* 체크박스 */}
      <section className="space-y-4">
        <Heading level="h2">체크박스</Heading>
        <Body>토글 가능한 체크박스 메뉴 아이템입니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
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
          <Body className="mt-2 text-sm text-krds-gray-50">
            상태: {showStatusBar ? '✓' : '✗'} 상태 표시줄,{' '}
            {showActivityBar ? '✓' : '✗'} 활동 표시줄, {showPanel ? '✓' : '✗'}{' '}
            패널
          </Body>
        </div>

        <Code
          variant="block"
          language="tsx"
        >{`const [showStatusBar, setShowStatusBar] = useState(true);

<DropdownMenuCheckboxItem
  checked={showStatusBar}
  onCheckedChange={setShowStatusBar}
>
  상태 표시줄
</DropdownMenuCheckboxItem>`}</Code>
      </section>

      {/* 라디오 그룹 */}
      <section className="space-y-4">
        <Heading level="h2">라디오 그룹</Heading>
        <Body>단일 선택 가능한 라디오 메뉴 아이템입니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
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
                <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  하단
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">왼쪽</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  오른쪽
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Body className="mt-2 text-sm text-krds-gray-50">
            선택된 위치: {position}
          </Body>
        </div>

        <Code
          variant="block"
          language="tsx"
        >{`const [position, setPosition] = useState('bottom');

<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
  <DropdownMenuRadioItem value="top">상단</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="bottom">하단</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="left">왼쪽</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="right">오른쪽</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>`}</Code>
      </section>

      {/* 하위 메뉴 */}
      <section className="space-y-4">
        <Heading level="h2">하위 메뉴</Heading>
        <Body>중첩된 하위 메뉴를 추가할 수 있습니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
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
        </div>

        <Code variant="block" language="tsx">{`<DropdownMenuSub>
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
</DropdownMenuSub>`}</Code>
      </section>

      {/* 그룹화 */}
      <section className="space-y-4">
        <Heading level="h2">그룹화</Heading>
        <Body>관련 메뉴 아이템을 그룹으로 묶을 수 있습니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
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
                <DropdownMenuItem icon={<CreditCard className="h-4 w-4" />}>
                  결제
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Keyboard className="h-4 w-4" />}>
                  단축키
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>지원</DropdownMenuLabel>
                <DropdownMenuItem icon={<HelpCircle className="h-4 w-4" />}>
                  도움말
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Mail className="h-4 w-4" />}>
                  문의하기
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Code variant="block" language="tsx">{`<DropdownMenuGroup>
  <DropdownMenuLabel>계정</DropdownMenuLabel>
  <DropdownMenuItem icon={<User className="h-4 w-4" />}>
    프로필
  </DropdownMenuItem>
  <DropdownMenuItem icon={<CreditCard className="h-4 w-4" />}>
    결제
  </DropdownMenuItem>
</DropdownMenuGroup>`}</Code>
      </section>

      {/* 액션 메뉴 */}
      <section className="space-y-4">
        <Heading level="h2">액션 메뉴</Heading>
        <Body>테이블 행이나 카드에서 사용하는 액션 메뉴 예시입니다.</Body>

        <div className="p-6 border border-krds-gray-20 rounded-lg">
          <div className="flex items-center justify-between p-4 border border-krds-gray-20 rounded-lg">
            <div>
              <div className="font-medium">프로젝트 문서</div>
              <div className="text-sm text-krds-gray-50">2024년 1월 15일</div>
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
        </div>

        <Code variant="block" language="tsx">{`<DropdownMenu>
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
</DropdownMenu>`}</Code>
      </section>

      {/* Props 테이블 */}
      <section className="space-y-4">
        <Heading level="h2">DropdownMenuItem Props</Heading>
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
              <TableCell>
                <Code>icon</Code>
              </TableCell>
              <TableCell>
                <Code>React.ReactNode</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>아이템 왼쪽에 표시할 아이콘</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>shortcut</Code>
              </TableCell>
              <TableCell>
                <Code>string</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>단축키 표시 (예: "⌘K")</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>inset</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>왼쪽 들여쓰기 (체크박스/라디오와 정렬용)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>destructive</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>위험 액션 스타일 (빨간색)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>disabled</Code>
              </TableCell>
              <TableCell>
                <Code>boolean</Code>
              </TableCell>
              <TableCell>false</TableCell>
              <TableCell>비활성화</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Code>onSelect</Code>
              </TableCell>
              <TableCell>
                <Code>(event: Event) =&gt; void</Code>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>선택 시 콜백</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* 컴포넌트 목록 */}
      <section className="space-y-4">
        <Heading level="h2">사용 가능한 컴포넌트</Heading>
        <Code variant="block" language="typescript">{`// 기본 구성
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
DropdownMenuPortal // 포털 (Content에 내장)`}</Code>
      </section>
    </>
  );
}
