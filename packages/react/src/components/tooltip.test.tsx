import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('트리거가 렌더링되어야 합니다', () => {
    render(
      <Tooltip content="도움말">
        <button>호버하세요</button>
      </Tooltip>
    );
    expect(screen.getByText('호버하세요')).toBeInTheDocument();
  });

  it('호버 시 tooltip이 표시되어야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="도움말 텍스트" delay={0}>
        <button>호버하세요</button>
      </Tooltip>
    );
    await user.hover(screen.getByText('호버하세요'));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });

  it('disabled일 때 tooltip이 표시되지 않아야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="도움말" disabled delay={0}>
        <button>호버하세요</button>
      </Tooltip>
    );
    await user.hover(screen.getByText('호버하세요'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Tooltip content="도움말">
        <button>버튼</button>
      </Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
