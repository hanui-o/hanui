import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Breadcrumb } from './breadcrumb';

const items = [
  { label: '홈', href: '/' },
  { label: '컴포넌트', href: '/components' },
  { label: 'Breadcrumb', isCurrent: true },
];

describe('Breadcrumb', () => {
  it('navigation role로 렌더링되어야 합니다', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('모든 항목이 렌더링되어야 합니다', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('홈')).toBeInTheDocument();
    expect(screen.getByText('컴포넌트')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
  });

  it('현재 페이지에 aria-current="page"가 있어야 합니다', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Breadcrumb')).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('링크 항목은 a 태그여야 합니다', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('홈').closest('a')).toHaveAttribute('href', '/');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Breadcrumb items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
