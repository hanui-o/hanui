import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../../test/setup';
import { StatsCard } from './stats-card';

const items = [
  { label: '총 사용자', value: '12,345', change: 12.5 },
  { label: '방문자', value: '3,456', change: -5.2 },
];

describe('StatsCard', () => {
  it('통계 항목들이 렌더링되어야 합니다', () => {
    render(<StatsCard items={items} />);
    expect(screen.getByText('총 사용자')).toBeInTheDocument();
    expect(screen.getByText('12,345')).toBeInTheDocument();
    expect(screen.getByText('방문자')).toBeInTheDocument();
  });

  it('변화율이 표시되어야 합니다', () => {
    render(<StatsCard items={items} />);
    expect(screen.getByText(/12.5/)).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<StatsCard items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
