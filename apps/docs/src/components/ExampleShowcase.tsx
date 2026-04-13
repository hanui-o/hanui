'use client';

import React, { useState } from 'react';
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
  CardFooter,
  Switch,
  Checkbox,
  Alert,
  AlertTitle,
  AlertDescription,
  LoginForm,
  EmptyState,
  StatsCard,
  ContactForm,
} from '@hanui/react';

const tabs = [
  { id: 'components', label: '컴포넌트' },
  { id: 'forms', label: '공공 서식' },
  { id: 'auth', label: '인증' },
];

function ComponentsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>결제 수단</CardTitle>
            <CardDescription>모든 거래는 안전하게 암호화됩니다</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="font-medium mb-2 block">카드 소유자명</label>
              <Input placeholder="홍길동" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="font-medium mb-2 block">카드 번호</label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div>
                <label className="font-medium mb-2 block">CVV</label>
                <Input placeholder="123" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">이메일 알림</p>
                <p className="text-sm text-krds-gray-50">
                  새 소식을 이메일로 받기
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="font-semibold">마케팅 수신</p>
                <p className="text-sm text-krds-gray-50">
                  프로모션 및 이벤트 알림
                </p>
              </div>
              <Switch />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Center */}
      <div className="space-y-6">
        <EmptyState
          title="팀원 없음"
          description="이 프로젝트에서 협업할 팀원을 초대하세요."
          actionLabel="+ 팀원 초대"
        />

        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">동기화 중</Badge>
            <Badge variant="outline">업데이트 중</Badge>
            <Badge variant="outline">로딩 중</Badge>
          </div>
        </div>

        <Card>
          <CardBody>
            <h3 className="font-semibold mb-4">가격 범위</h3>
            <p className="text-sm text-krds-gray-50 mb-4">
              예산 범위를 설정하세요 ($200 - 800).
            </p>
            <input type="range" min="200" max="800" className="w-full" />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input placeholder="검색..." />
              </div>
              <span className="text-krds-gray-50 text-sm whitespace-nowrap">
                12 results
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <Alert>
          <AlertTitle>프로필이 인증되었습니다</AlertTitle>
          <AlertDescription>모든 기능을 사용할 수 있습니다.</AlertDescription>
        </Alert>

        <Card>
          <CardBody>
            <h3 className="font-semibold mb-1">2단계 인증</h3>
            <p className="text-sm text-krds-gray-50 mb-4">
              이메일 또는 전화번호로 인증하세요.
            </p>
            <Button size="sm">활성화</Button>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="font-semibold mb-4">컴퓨팅 환경</h3>
            <p className="text-sm text-krds-gray-50 mb-4">
              클러스터의 컴퓨팅 환경을 선택하세요.
            </p>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer">
                <input
                  type="radio"
                  name="compute"
                  defaultChecked
                  className="mt-1"
                />
                <div>
                  <div className="font-medium">Kubernetes</div>
                  <div className="text-xs text-krds-gray-50">
                    K8s 구성에서 GPU 워크로드 실행
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 border rounded-md cursor-pointer">
                <input type="radio" name="compute" className="mt-1" />
                <div>
                  <div className="font-medium">가상 머신</div>
                  <div className="text-xs text-krds-gray-50">
                    VM 구성 클러스터에 접근 (곧 출시)
                  </div>
                </div>
              </label>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Checkbox id="terms" label="이용약관 및 정책에 동의합니다" />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

function FormsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ContactForm />
      <div className="space-y-6">
        <StatsCard
          title="총 민원 접수"
          value="1,234"
          description="전월 대비"
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          title="처리 완료"
          value="1,180"
          description="처리율 95.6%"
          trend={{ value: 3, direction: 'up' }}
        />
        <StatsCard
          title="평균 처리 시간"
          value="2.3일"
          description="전월 대비"
          trend={{ value: 8, direction: 'down' }}
        />
      </div>
    </div>
  );
}

function AuthTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <LoginForm />
      <Card>
        <CardHeader>
          <CardTitle>계정 만들기</CardTitle>
          <CardDescription>
            아래 정보를 입력하여 계정을 생성하세요.
          </CardDescription>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium mb-2 block">성</label>
              <Input placeholder="홍" />
            </div>
            <div>
              <label className="font-medium mb-2 block">이름</label>
              <Input placeholder="길동" />
            </div>
          </div>
          <div>
            <label className="font-medium mb-2 block">이메일</label>
            <Input type="email" placeholder="hong@example.com" />
          </div>
          <div>
            <label className="font-medium mb-2 block">비밀번호</label>
            <Input type="password" placeholder="8자 이상" />
          </div>
          <Checkbox id="signup-terms" label="이용약관에 동의합니다" />
          <Button className="w-full">계정 생성</Button>
        </CardBody>
      </Card>
    </div>
  );
}

const tabContent: Record<string, () => React.ReactElement> = {
  components: ComponentsTab,
  forms: FormsTab,
  auth: AuthTab,
};

export function ExampleShowcase() {
  const [activeTab, setActiveTab] = useState('components');
  const ActiveContent = tabContent[activeTab];

  return (
    <div className="w-full showcase-neutral">
      {/* Tab Navigation */}
      <div className="flex items-center gap-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-600 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <ActiveContent />
    </div>
  );
}
