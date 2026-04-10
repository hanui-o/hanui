import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Input } from './input';

describe('Input', () => {
  it('input 요소로 렌더링되어야 합니다', () => {
    render(<Input aria-label="테스트" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('placeholder가 올바르게 표시되어야 합니다', () => {
    render(<Input placeholder="이름을 입력하세요" aria-label="이름" />);
    expect(
      screen.getByPlaceholderText('이름을 입력하세요')
    ).toBeInTheDocument();
  });

  it('값을 입력할 수 있어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Input aria-label="이름" />);
    const input = screen.getByRole('textbox');
    await user.type(input, '홍길동');
    expect(input).toHaveValue('홍길동');
  });

  it('disabled일 때 입력이 불가능해야 합니다', () => {
    render(<Input disabled aria-label="비활성" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('error 상태일 때 aria-invalid="true"여야 합니다', () => {
    render(<Input status="error" aria-label="에러" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('ref가 전달되어야 합니다', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(<Input ref={ref} aria-label="테스트" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('추가 className이 병합되어야 합니다', () => {
    render(<Input className="custom-class" aria-label="테스트" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('clearable일 때 값이 있으면 지우기 버튼이 표시되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Input clearable aria-label="검색" />);
    const input = screen.getByRole('textbox');
    await user.type(input, '테스트');
    expect(screen.getByLabelText('입력 지우기')).toBeInTheDocument();
  });

  it('password 타입일 때 토글 버튼이 있어야 합니다', () => {
    render(<Input type="password" aria-label="비밀번호" />);
    expect(screen.getByLabelText('비밀번호 보기')).toBeInTheDocument();
  });

  it('기본 Input은 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Input aria-label="이름" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = ['default', 'filled'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Input variant={variant} aria-label={variant} />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
