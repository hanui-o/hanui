import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { ServiceCardGrid } from './service-card-grid';

const services = [
  {
    title: '온라인 민원',
    description: '24시간 민원 접수 가능',
    href: '/civil',
  },
  {
    title: '정보공개',
    description: '공개된 정보 열람',
    href: '/info',
  },
];

describe('ServiceCardGrid', () => {
  it('서비스 카드들이 렌더링되어야 합니다', () => {
    render(<ServiceCardGrid services={services} />);
    expect(screen.getByText('온라인 민원')).toBeInTheDocument();
    expect(screen.getByText('정보공개')).toBeInTheDocument();
  });

  it('설명이 렌더링되어야 합니다', () => {
    render(<ServiceCardGrid services={services} />);
    expect(screen.getByText('24시간 민원 접수 가능')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<ServiceCardGrid services={services} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
