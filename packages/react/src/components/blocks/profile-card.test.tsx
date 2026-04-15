import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { ProfileCard } from './profile-card';

describe('ProfileCard', () => {
  it('이름이 렌더링되어야 합니다', () => {
    render(<ProfileCard name="홍길동" />);
    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });

  it('직책이 렌더링되어야 합니다', () => {
    render(<ProfileCard name="홍길동" role="관리자" />);
    expect(screen.getByText('관리자')).toBeInTheDocument();
  });

  it('이메일과 전화번호가 렌더링되어야 합니다', () => {
    render(
      <ProfileCard
        name="홍길동"
        email="test@example.com"
        phone="010-1234-5678"
      />
    );
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <ProfileCard name="홍길동" role="관리자" email="test@example.com" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
