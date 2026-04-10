import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
  it('링크들이 렌더링되어야 합니다', () => {
    render(
      <SkipLink
        links={[
          { href: '#main', label: '본문 바로가기' },
          { href: '#nav', label: '메뉴 바로가기' },
        ]}
      />
    );
    expect(screen.getByText('본문 바로가기')).toBeInTheDocument();
    expect(screen.getByText('메뉴 바로가기')).toBeInTheDocument();
  });

  it('링크가 올바른 href를 가져야 합니다', () => {
    render(<SkipLink links={[{ href: '#main', label: '본문 바로가기' }]} />);
    expect(screen.getByText('본문 바로가기').closest('a')).toHaveAttribute(
      'href',
      '#main'
    );
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <SkipLink links={[{ href: '#main', label: '본문 바로가기' }]} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
