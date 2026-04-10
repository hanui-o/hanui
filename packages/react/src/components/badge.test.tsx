import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Badge, NumberBadge, DotBadge, BadgeGroup } from './badge';

describe('Badge', () => {
  it('span 요소로 렌더링되어야 합니다', () => {
    render(<Badge>새로운</Badge>);
    const badge = screen.getByText('새로운');
    expect(badge.tagName).toBe('SPAN');
  });

  it('children이 올바르게 렌더링되어야 합니다', () => {
    render(<Badge>테스트</Badge>);
    expect(screen.getByText('테스트')).toBeInTheDocument();
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', () => {
    const { container } = render(
      <Badge icon={<span data-testid="icon">★</span>}>새로운</Badge>
    );
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeInTheDocument();
  });

  it('아이콘 위치가 right일 때 올바르게 렌더링되어야 합니다', () => {
    const { container } = render(
      <Badge icon={<span>★</span>} iconPosition="right">
        새로운
      </Badge>
    );
    const iconWrapper = container.querySelector('[aria-hidden="true"]');
    expect(iconWrapper).toBeInTheDocument();
  });

  it('ref가 전달되어야 합니다', () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;
    render(<Badge ref={ref}>테스트</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it('추가 className이 병합되어야 합니다', () => {
    render(<Badge className="custom-class">테스트</Badge>);
    expect(screen.getByText('테스트')).toHaveClass('custom-class');
  });

  it('기본 Badge는 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Badge>새로운</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = [
      'primary',
      'success',
      'warning',
      'error',
      'info',
      'gray',
      'outline-primary',
      'solid-primary',
    ] as const;

    for (const variant of variants) {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});

describe('NumberBadge', () => {
  it('숫자를 올바르게 표시해야 합니다', () => {
    render(<NumberBadge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('max를 초과하면 max+ 형식으로 표시해야 합니다', () => {
    render(<NumberBadge count={100} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('count가 0이면 렌더링되지 않아야 합니다', () => {
    const { container } = render(<NumberBadge count={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('showZero가 true면 0도 표시해야 합니다', () => {
    render(<NumberBadge count={0} showZero />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('aria-label이 올바르게 설정되어야 합니다', () => {
    render(<NumberBadge count={5} />);
    expect(screen.getByLabelText('5개')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<NumberBadge count={5} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('DotBadge', () => {
  it('기본적으로 렌더링되어야 합니다', () => {
    const { container } = render(<DotBadge />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('show가 false면 렌더링되지 않아야 합니다', () => {
    const { container } = render(<DotBadge show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('aria-hidden="true"를 가져야 합니다 (장식적 요소)', () => {
    const { container } = render(<DotBadge />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<DotBadge />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('BadgeGroup', () => {
  it('자식 요소들을 올바르게 렌더링해야 합니다', () => {
    render(
      <BadgeGroup>
        <span>아이콘</span>
        <NumberBadge count={3} />
      </BadgeGroup>
    );
    expect(screen.getByText('아이콘')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <BadgeGroup>
        <span>아이콘</span>
        <NumberBadge count={3} />
      </BadgeGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
