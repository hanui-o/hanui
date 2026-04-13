import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/setup';
import { SearchBar } from './search-bar';

describe('SearchBar', () => {
  it('검색 입력 필드가 있어야 합니다', () => {
    render(<SearchBar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('placeholder가 표시되어야 합니다', () => {
    render(<SearchBar placeholder="검색어를 입력하세요" />);
    expect(
      screen.getByPlaceholderText('검색어를 입력하세요')
    ).toBeInTheDocument();
  });

  it('검색 버튼이 있어야 합니다', () => {
    render(<SearchBar />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<SearchBar showCategory={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
