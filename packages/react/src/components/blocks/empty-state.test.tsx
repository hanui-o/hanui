import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/setup';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('제목이 렌더링되어야 합니다', () => {
    render(<EmptyState title="데이터가 없습니다" />);
    expect(screen.getByText('데이터가 없습니다')).toBeInTheDocument();
  });

  it('설명이 렌더링되어야 합니다', () => {
    render(<EmptyState description="새 항목을 추가해보세요" />);
    expect(screen.getByText('새 항목을 추가해보세요')).toBeInTheDocument();
  });

  it('CTA 버튼이 렌더링되어야 합니다', () => {
    render(<EmptyState actionLabel="추가하기" onAction={() => {}} />);
    expect(screen.getByText('추가하기')).toBeInTheDocument();
  });

  it('CTA 클릭 시 onAction이 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    let called = false;
    render(<EmptyState actionLabel="추가" onAction={() => (called = true)} />);
    await user.click(screen.getByText('추가'));
    expect(called).toBe(true);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <EmptyState title="비어있음" description="설명" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
