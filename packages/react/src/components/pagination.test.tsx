import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('navigation role로 렌더링되어야 합니다', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('현재 페이지에 aria-current="page"가 있어야 합니다', () => {
    render(
      <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
    );
    const currentButton = screen.getByText('3');
    expect(currentButton.closest('button')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('페이지 버튼 클릭 시 onPageChange가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    let page = 1;
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={(p) => (page = p)}
      />
    );
    await user.click(screen.getByText('2'));
    expect(page).toBe(2);
  });

  it('이전/다음 버튼이 있어야 합니다', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getByText('이전')).toBeInTheDocument();
    expect(screen.getByText('다음')).toBeInTheDocument();
  });

  it('첫 페이지일 때 이전 버튼이 비활성화되어야 합니다', () => {
    render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getByText('이전').closest('button')).toBeDisabled();
  });

  it('마지막 페이지일 때 다음 버튼이 비활성화되어야 합니다', () => {
    render(
      <Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getByText('다음').closest('button')).toBeDisabled();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
