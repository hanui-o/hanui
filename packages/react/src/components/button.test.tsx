import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Button } from './button';

describe('Button', () => {
  it('button 요소로 렌더링되어야 합니다', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('children이 올바르게 렌더링되어야 합니다', () => {
    render(<Button>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('클릭 이벤트가 동작해야 합니다', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>클릭</Button>);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('disabled일 때 클릭이 동작하지 않아야 합니다', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <Button disabled onClick={() => (clicked = true)}>
        클릭
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  it('loading일 때 aria-busy="true"여야 합니다', () => {
    render(<Button loading>로딩 중</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('loading일 때 aria-disabled="true"여야 합니다', () => {
    render(<Button loading>로딩 중</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('href가 제공되면 a 태그로 렌더링되어야 합니다', () => {
    render(<Button href="https://hanui.io">링크</Button>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://hanui.io');
  });

  it('ref가 전달되어야 합니다', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Button ref={ref}>테스트</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('추가 className이 병합되어야 합니다', () => {
    render(<Button className="custom-class">테스트</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('type의 기본값은 button이어야 합니다', () => {
    render(<Button>테스트</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('기본 Button은 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<Button>접근성 테스트</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'success',
      'danger',
      'ghost',
      'outline',
    ] as const;

    for (const variant of variants) {
      const { container } = render(
        <Button variant={variant}>{variant}</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('아이콘 전용 버튼에 aria-label이 있으면 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Button size="icon" aria-label="메뉴 열기">
        <span>☰</span>
      </Button>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
