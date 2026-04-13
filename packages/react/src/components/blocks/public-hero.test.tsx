import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { PublicHero } from './public-hero';

describe('PublicHero', () => {
  it('section으로 렌더링되어야 합니다', () => {
    render(<PublicHero />);
    expect(screen.getByLabelText('메인 배너')).toBeInTheDocument();
  });

  it('제목이 표시되어야 합니다', () => {
    render(<PublicHero title="테스트 기관" />);
    expect(screen.getByText('테스트 기관')).toBeInTheDocument();
  });

  it('CTA 버튼이 렌더링되어야 합니다', () => {
    render(<PublicHero ctaLabel="바로가기" />);
    expect(screen.getByText('바로가기')).toBeInTheDocument();
  });

  it('children이 렌더링되어야 합니다', () => {
    render(
      <PublicHero>
        <input placeholder="검색어 입력" aria-label="검색" />
      </PublicHero>
    );
    expect(screen.getByPlaceholderText('검색어 입력')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<PublicHero />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
