import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/setup';
import { LoginForm } from './login-form';

describe('LoginForm', () => {
  it('로그인 폼이 렌더링되어야 합니다', () => {
    render(<LoginForm />);
    expect(screen.getAllByText('로그인').length).toBeGreaterThan(0);
  });

  it('아이디와 비밀번호 입력 필드가 있어야 합니다', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument();
  });

  it('로그인 버튼이 있어야 합니다', () => {
    render(<LoginForm />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
