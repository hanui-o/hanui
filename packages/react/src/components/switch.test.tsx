import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Switch } from './switch';

describe('Switch', () => {
  it('switch role로 렌더링되어야 합니다', () => {
    render(<Switch aria-label="알림 설정" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('클릭하면 상태가 변경되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="알림 설정" />);
    const sw = screen.getByRole('switch');
    expect(sw).toHaveAttribute('data-state', 'unchecked');
    await user.click(sw);
    expect(sw).toHaveAttribute('data-state', 'checked');
  });

  it('label이 렌더링되어야 합니다', () => {
    render(<Switch label="다크 모드" />);
    expect(screen.getByText('다크 모드')).toBeInTheDocument();
  });

  it('disabled일 때 클릭이 동작하지 않아야 합니다', async () => {
    const user = userEvent.setup();
    render(<Switch disabled aria-label="비활성" />);
    const sw = screen.getByRole('switch');
    await user.click(sw);
    expect(sw).toHaveAttribute('data-state', 'unchecked');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Switch aria-label="알림 설정" label="알림 설정" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
