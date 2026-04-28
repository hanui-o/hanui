import { describe, it, expect } from 'vitest';
import { render, renderHook, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { StepIndicator, useSteps } from './step-indicator';

const steps = [
  { label: '주문 확인', description: '주문 내역 검토' },
  { label: '결제', description: '결제 정보 입력' },
  { label: '완료', description: '주문 완료' },
];

describe('StepIndicator', () => {
  it('ol 요소로 렌더링되어야 합니다', () => {
    const { container } = render(
      <StepIndicator steps={steps} currentStep={0} />
    );
    expect(container.firstChild?.nodeName).toBe('OL');
  });

  it('모든 단계 라벨이 표시되어야 합니다', () => {
    render(<StepIndicator steps={steps} currentStep={0} />);
    expect(screen.getByText('주문 확인')).toBeInTheDocument();
    expect(screen.getByText('결제')).toBeInTheDocument();
    expect(screen.getByText('완료')).toBeInTheDocument();
  });

  it('현재 단계에 aria-current="step"이 있어야 합니다', () => {
    const { container } = render(
      <StepIndicator steps={steps} currentStep={1} />
    );
    const current = container.querySelector('[aria-current="step"]');
    expect(current).toBeInTheDocument();
  });

  it('clickable일 때 완료된 단계 원형 버튼 클릭이 동작해야 합니다', async () => {
    const user = userEvent.setup();
    let clicked = -1;
    render(
      <StepIndicator
        steps={steps}
        currentStep={2}
        clickable
        onStepClick={(i) => (clicked = i)}
      />
    );
    await user.click(screen.getByLabelText(/1단계 \(완료\)/));
    expect(clicked).toBe(0);
  });

  it('clickable이 false일 때는 클릭 가능한 버튼이 없어야 합니다', () => {
    render(
      <StepIndicator
        steps={steps}
        currentStep={2}
        clickable={false}
        onStepClick={() => {}}
      />
    );
    expect(screen.queryByLabelText(/1단계 \(완료\)/)).not.toBeInTheDocument();
  });

  it('vertical 방향으로 렌더링되어야 합니다', () => {
    const { container } = render(
      <StepIndicator steps={steps} currentStep={0} orientation="vertical" />
    );
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <StepIndicator
        steps={steps}
        currentStep={1}
        aria-label="주문 진행 단계"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('useSteps', () => {
  it('초기 상태가 0이어야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3 }));
    expect(result.current.currentStep).toBe(0);
  });

  it('next로 다음 단계로 이동해야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3 }));
    act(() => result.current.next());
    expect(result.current.currentStep).toBe(1);
  });

  it('prev로 이전 단계로 돌아가야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3, initialStep: 2 }));
    act(() => result.current.prev());
    expect(result.current.currentStep).toBe(1);
  });

  it('마지막 단계에서 next는 변경되지 않아야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3, initialStep: 2 }));
    act(() => result.current.next());
    expect(result.current.currentStep).toBe(2);
  });

  it('첫 단계에서 prev는 변경되지 않아야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3 }));
    act(() => result.current.prev());
    expect(result.current.currentStep).toBe(0);
  });

  it('goTo로 특정 단계로 이동해야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3 }));
    act(() => result.current.goTo(2));
    expect(result.current.currentStep).toBe(2);
  });

  it('reset으로 초기 단계로 돌아가야 합니다', () => {
    const { result } = renderHook(() => useSteps({ count: 3, initialStep: 0 }));
    act(() => result.current.goTo(2));
    act(() => result.current.reset());
    expect(result.current.currentStep).toBe(0);
  });
});
