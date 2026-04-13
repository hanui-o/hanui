import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { NoticeList } from './notice-list';

const items = [
  {
    id: 1,
    title: '공지 1',
    date: '2026-04-10',
    category: '공지',
    pinned: true,
  },
  { id: 2, title: '공지 2', date: '2026-04-08', isNew: true },
  { id: 3, title: '공지 3', date: '2026-04-05' },
];

describe('NoticeList', () => {
  it('aria-label이 있는 section으로 렌더링되어야 합니다', () => {
    render(<NoticeList items={items} />);
    expect(screen.getByLabelText('공지사항')).toBeInTheDocument();
  });

  it('모든 항목이 표시되어야 합니다', () => {
    render(<NoticeList items={items} />);
    expect(screen.getByText('공지 1')).toBeInTheDocument();
    expect(screen.getByText('공지 2')).toBeInTheDocument();
    expect(screen.getByText('공지 3')).toBeInTheDocument();
  });

  it('카테고리 뱃지가 표시되어야 합니다', () => {
    render(<NoticeList items={items} />);
    expect(screen.getByText('공지')).toBeInTheDocument();
  });

  it('새 글에 N 뱃지가 표시되어야 합니다', () => {
    render(<NoticeList items={items} />);
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('더보기 링크가 표시되어야 합니다', () => {
    render(<NoticeList items={items} moreHref="/notice" />);
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<NoticeList items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
