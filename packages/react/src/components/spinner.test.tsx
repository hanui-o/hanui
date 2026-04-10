import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('status role로 렌더링되어야 합니다', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('기본 label이 "로딩 중"이어야 합니다', () => {
    render(<Spinner />);
    expect(screen.getByText('로딩 중')).toBeInTheDocument();
  });

  it('커스텀 label을 설정할 수 있어야 합니다', () => {
    render(<Spinner label="데이터 불러오는 중" />);
    expect(screen.getByText('데이터 불러오는 중')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
