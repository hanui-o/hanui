import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  it('문의 폼이 렌더링되어야 합니다', () => {
    render(<ContactForm />);
    expect(screen.getByText('문의하기')).toBeInTheDocument();
  });

  it('입력 필드들이 있어야 합니다', () => {
    render(<ContactForm />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('제출 버튼이 있어야 합니다', () => {
    render(<ContactForm />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
