import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Checkbox, CheckboxGroup, CheckboxGroupItem } from './checkbox';

describe('Checkbox', () => {
  it('checkbox role로 렌더링되어야 합니다', () => {
    render(<Checkbox aria-label="동의" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('label이 올바르게 렌더링되어야 합니다', () => {
    render(<Checkbox label="이용약관 동의" />);
    expect(screen.getByText('이용약관 동의')).toBeInTheDocument();
  });

  it('클릭하면 체크 상태가 변경되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="동의" />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('disabled일 때 클릭이 동작하지 않아야 합니다', async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled aria-label="비활성" />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('data-state', 'unchecked');
  });

  it('error 상태일 때 aria-invalid="true"여야 합니다', () => {
    render(<Checkbox status="error" aria-label="에러" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('기본 Checkbox는 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Checkbox label="동의합니다" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('CheckboxGroup', () => {
  it('여러 체크박스를 렌더링해야 합니다', () => {
    render(
      <CheckboxGroup>
        <CheckboxGroupItem value="a" label="옵션 A" />
        <CheckboxGroupItem value="b" label="옵션 B" />
      </CheckboxGroup>
    );
    expect(screen.getByText('옵션 A')).toBeInTheDocument();
    expect(screen.getByText('옵션 B')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <CheckboxGroup>
        <CheckboxGroupItem value="a" label="옵션 A" />
        <CheckboxGroupItem value="b" label="옵션 B" />
      </CheckboxGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
