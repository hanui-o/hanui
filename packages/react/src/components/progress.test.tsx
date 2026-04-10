import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Progress } from './progress';

describe('Progress', () => {
  it('progressbar role로 렌더링되어야 합니다', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('aria-valuenow가 올바르게 설정되어야 합니다', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '75'
    );
  });

  it('aria-valuemin과 aria-valuemax가 설정되어야 합니다', () => {
    render(<Progress value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('value가 null이면 indeterminate 상태여야 합니다', () => {
    render(<Progress value={null} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Progress value={50} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
