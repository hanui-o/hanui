import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { SignupForm } from './signup-form';

describe('SignupForm', () => {
  it('회원가입 폼이 렌더링되어야 합니다', () => {
    render(<SignupForm />);
    expect(screen.getAllByText('회원가입').length).toBeGreaterThan(0);
  });

  it('입력 필드들이 있어야 합니다', () => {
    render(<SignupForm />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<SignupForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
