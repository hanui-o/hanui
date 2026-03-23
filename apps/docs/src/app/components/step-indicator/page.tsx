import type { Metadata } from 'next';
import StepIndicatorPage from './content';

export const metadata: Metadata = {
  title: 'Step Indicator - 단계 표시 UI 컴포넌트',
  description:
    'KRDS 기반 Step Indicator 컴포넌트. 회원가입, 결제 등 다단계 프로세스의 현재 위치를 안내하는 UI. useSteps 훅, Steps Compound Component 지원. React, 접근성 AA 준수.',
  keywords: [
    'step indicator',
    '단계 표시',
    'stepper',
    'wizard',
    'React stepper',
    'KRDS',
  ],
  alternates: {
    canonical: '/components/step-indicator',
  },
};

export default function Page() {
  return <StepIndicatorPage />;
}
