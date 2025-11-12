'use client';

import { Button, Input } from '@hanui/react';
import { useState } from 'react';

const examples = [
  { id: 'examples', label: 'Examples' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'playground', label: 'Playground' },
  { id: 'auth', label: 'Authentication' },
];

export function ExampleShowcase() {
  const [activeTab, setActiveTab] = useState('examples');

  return (
    <div className="w-full">
      {/* Tab Navigation - shadcn/ui style */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          {examples.map((example) => (
            <button
              key={example.id}
              onClick={() => setActiveTab(example.id)}
              className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                activeTab === example.id
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {example.label}
              {activeTab === example.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-gray-100" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Theme:
          </span>
          <select className="h-8 px-2 text-xs border border-gray-200 dark:border-gray-800 rounded-md bg-transparent">
            <option>Neutral</option>
          </select>
          <button className="flex items-center justify-center h-8 w-8 border border-gray-200 dark:border-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Example Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Payment Method */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <h3 className="text-lg font-semibold mb-4">결제 수단</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              모든 거래는 안전하게 암호화됩니다
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="card-holder"
                  className="text-sm font-medium mb-2 block"
                >
                  카드 소유자명
                </label>
                <Input id="card-holder" placeholder="홍길동" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label
                    htmlFor="card-number"
                    className="text-sm font-medium mb-2 block"
                  >
                    카드 번호
                  </label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="text-sm font-medium mb-2 block"
                  >
                    CVV
                  </label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                16자리 카드 번호를 입력하세요.
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="month"
                    className="text-sm font-medium mb-2 block"
                  >
                    월
                  </label>
                  <select
                    id="month"
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-800 rounded-md bg-transparent text-sm"
                  >
                    <option>MM</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="text-sm font-medium mb-2 block"
                  >
                    년도
                  </label>
                  <select
                    id="year"
                    className="w-full h-10 px-3 border border-gray-200 dark:border-gray-800 rounded-md bg-transparent text-sm"
                  >
                    <option>YYYY</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <h3 className="text-lg font-semibold mb-4">청구지 주소</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              결제 수단과 연결된 청구지 주소
            </p>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="same-address" className="rounded" />
              <label htmlFor="same-address" className="text-sm">
                배송지 주소와 동일
              </label>
            </div>
          </div>
        </div>

        {/* Center Column - Team */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="flex -space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-950" />
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-950" />
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-950" />
            </div>
            <h3 className="text-lg font-semibold mb-2">팀원 없음</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
              이 프로젝트에서 협업할 팀원을
              <br />
              초대하세요.
            </p>
            <Button variant="primary">+ 팀원 초대</Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>동기화 중</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm">
                <div className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-700" />
                <span>업데이트 중</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800 text-sm">
                <div className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-700" />
                <span>로딩 중</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
            <div className="flex items-center gap-2 mb-3">
              <button className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900">
                +
              </button>
              <input
                type="text"
                placeholder="메시지 보내기..."
                className="flex-1 text-sm bg-transparent outline-none"
              />
              <button className="text-sm text-gray-400">🎤</button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <h3 className="text-lg font-semibold mb-4">가격 범위</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              예산 범위를 설정하세요 ($200 - 800).
            </p>
            <div className="relative pt-1">
              <input type="range" min="200" max="800" className="w-full" />
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="검색..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border border-gray-200 dark:border-gray-800 rounded-md outline-none"
                />
              </div>
              <span className="text-sm text-gray-500">12 results</span>
            </div>
          </div>
        </div>

        {/* Right Column - Authentication */}
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <div className="flex items-center gap-2 mb-4 p-3 border border-gray-200 dark:border-gray-800 rounded-md">
              <span className="text-gray-400">🌐</span>
              <span className="text-sm text-gray-500">https://</span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold mb-1">2단계 인증</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  이메일 또는 전화번호로 인증하세요.
                </p>
              </div>
              <Button variant="primary" size="sm">
                활성화
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <span>프로필이 인증되었습니다.</span>
              <button className="ml-auto text-gray-400">→</button>
            </div>
          </div>

          <div className="text-center py-4">
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              모양 설정
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <h3 className="font-semibold mb-4">컴퓨팅 환경</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              클러스터의 컴퓨팅 환경을 선택하세요.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-800 rounded-md">
                <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100" />
                <div className="flex-1">
                  <div className="font-medium text-sm">Kubernetes</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    K8s 구성에서 GPU 워크로드 실행. 기본값입니다.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-800 rounded-md">
                <div className="w-2 h-2 rounded-full border border-gray-300 dark:border-gray-700" />
                <div className="flex-1">
                  <div className="font-medium text-sm">가상 머신</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    워크로드를 실행하기 위해 VM 구성 클러스터에 접근. (곧 출시)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
            <h3 className="font-semibold mb-4">저희를 어떻게 알게 되셨나요?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              가장 적합한 옵션을 선택하세요.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="social"
                  name="referral"
                  className="rounded-full"
                />
                <label htmlFor="social" className="text-sm">
                  소셜 미디어
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="search"
                  name="referral"
                  className="rounded-full"
                />
                <label htmlFor="search" className="text-sm">
                  검색 엔진
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="referral"
                  name="referral"
                  className="rounded-full"
                />
                <label htmlFor="referral" className="text-sm">
                  추천
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="other"
                  name="referral"
                  className="rounded-full"
                />
                <label htmlFor="other" className="text-sm">
                  기타
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
              ← 보관
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
              리포트
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
              다시 알림
            </button>
            <button className="px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
              •••
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="rounded" />
              <label htmlFor="terms" className="text-sm">
                이용약관 및 정책에 동의합니다
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                3
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                ←
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900">
                →
              </button>
              <button className="px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-900 flex items-center gap-1">
                📋 Copilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
