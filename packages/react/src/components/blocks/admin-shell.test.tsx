import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { AdminShell } from './admin-shell';

const menuItems = [
  { id: 'dashboard', label: '대시보드', href: '/admin', icon: <span>📊</span> },
  { id: 'posts', label: '게시물', href: '/admin/posts', icon: <span>📝</span> },
];

describe('AdminShell', () => {
  it('사이드바가 렌더링되어야 합니다', () => {
    render(
      <AdminShell menuItems={menuItems} siteTitle="관리자">
        <div>콘텐츠</div>
      </AdminShell>
    );
    expect(screen.getByText('대시보드')).toBeInTheDocument();
    expect(screen.getByText('게시물')).toBeInTheDocument();
  });

  it('본문 콘텐츠가 렌더링되어야 합니다', () => {
    render(
      <AdminShell menuItems={menuItems} siteTitle="관리자">
        <div>관리 페이지 콘텐츠</div>
      </AdminShell>
    );
    expect(screen.getByText('관리 페이지 콘텐츠')).toBeInTheDocument();
  });

  it('건너뛰기 링크가 있어야 합니다', () => {
    render(
      <AdminShell menuItems={menuItems} siteTitle="관리자">
        <div>콘텐츠</div>
      </AdminShell>
    );
    expect(screen.getByText('본문으로 건너뛰기')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <AdminShell menuItems={menuItems} siteTitle="관리자">
        <div>콘텐츠</div>
      </AdminShell>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
