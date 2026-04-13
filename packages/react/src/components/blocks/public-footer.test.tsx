import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { PublicFooter } from './public-footer';

describe('PublicFooter', () => {
  it('contentinfo role로 렌더링되어야 합니다', () => {
    render(<PublicFooter />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('기관명이 표시되어야 합니다', () => {
    render(<PublicFooter orgName="테스트기관" />);
    expect(screen.getByText('테스트기관')).toBeInTheDocument();
  });

  it('개인정보처리방침 링크가 굵게 표시되어야 합니다', () => {
    render(<PublicFooter />);
    const privacyLink = screen.getByText('개인정보처리방침');
    expect(privacyLink).toHaveClass('font-bold');
  });

  it('정책 링크 nav에 aria-label이 있어야 합니다', () => {
    render(<PublicFooter />);
    expect(screen.getByLabelText('정책 링크')).toBeInTheDocument();
  });

  it('이메일 링크가 mailto: 형식이어야 합니다', () => {
    render(<PublicFooter email="test@example.go.kr" />);
    expect(screen.getByText('test@example.go.kr').closest('a')).toHaveAttribute(
      'href',
      'mailto:test@example.go.kr'
    );
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<PublicFooter />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
