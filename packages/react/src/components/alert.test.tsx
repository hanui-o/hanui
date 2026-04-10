import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Alert } from './alert';

describe('Alert', () => {
  it('alert role로 렌더링되어야 합니다', () => {
    render(<Alert>알림 메시지</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('role을 status로 변경할 수 있어야 합니다', () => {
    render(<Alert role="status">상태 메시지</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('children이 올바르게 렌더링되어야 합니다', () => {
    render(<Alert>테스트 알림</Alert>);
    expect(screen.getByText('테스트 알림')).toBeInTheDocument();
  });

  it('title이 렌더링되어야 합니다', () => {
    render(<Alert title="경고">내용</Alert>);
    expect(screen.getByText('경고')).toBeInTheDocument();
  });

  it('closable일 때 닫기 버튼이 있어야 합니다', () => {
    render(
      <Alert closable onClose={() => {}}>
        닫을 수 있는 알림
      </Alert>
    );
    expect(screen.getByLabelText('닫기')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    let closed = false;
    render(
      <Alert closable onClose={() => (closed = true)}>
        알림
      </Alert>
    );
    await user.click(screen.getByLabelText('닫기'));
    expect(closed).toBe(true);
  });

  it('aria-live가 올바르게 설정되어야 합니다', () => {
    render(<Alert>긴급 알림</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('기본 Alert는 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Alert>접근성 테스트</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Alert variant={variant}>{variant} 알림</Alert>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
