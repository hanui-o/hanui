import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('textarea 요소로 렌더링되어야 합니다', () => {
    render(<Textarea aria-label="내용" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('값을 입력할 수 있어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="내용" />);
    await user.type(screen.getByRole('textbox'), '안녕하세요');
    expect(screen.getByRole('textbox')).toHaveValue('안녕하세요');
  });

  it('disabled일 때 입력이 불가능해야 합니다', () => {
    render(<Textarea disabled aria-label="비활성" />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('error 상태일 때 aria-invalid="true"여야 합니다', () => {
    render(<Textarea status="error" aria-label="에러" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Textarea aria-label="내용 입력" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
