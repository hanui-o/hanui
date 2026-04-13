import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { SitemapPage } from './sitemap-page';

const items = [
  {
    label: '기관소개',
    href: '/about',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: '연혁', href: '/about/history' },
    ],
  },
  {
    label: '알림마당',
    href: '/notice',
    children: [{ label: '공지사항', href: '/notice/list' }],
  },
];

describe('SitemapPage', () => {
  it('aria-label이 있는 section으로 렌더링되어야 합니다', () => {
    render(<SitemapPage items={items} />);
    expect(screen.getByLabelText('사이트맵')).toBeInTheDocument();
  });

  it('모든 섹션이 표시되어야 합니다', () => {
    render(<SitemapPage items={items} />);
    expect(screen.getByText('기관소개')).toBeInTheDocument();
    expect(screen.getByText('알림마당')).toBeInTheDocument();
  });

  it('하위 메뉴가 표시되어야 합니다', () => {
    render(<SitemapPage items={items} />);
    expect(screen.getByText('인사말')).toBeInTheDocument();
    expect(screen.getByText('연혁')).toBeInTheDocument();
    expect(screen.getByText('공지사항')).toBeInTheDocument();
  });

  it('링크에 올바른 href가 있어야 합니다', () => {
    render(<SitemapPage items={items} />);
    expect(screen.getByText('인사말').closest('a')).toHaveAttribute(
      'href',
      '/about/greeting'
    );
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<SitemapPage items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
