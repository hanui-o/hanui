import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Stack, VStack, HStack } from './stack';

describe('Stack', () => {
  it('자식 요소를 렌더링해야 합니다', () => {
    render(
      <Stack>
        <span>첫째</span>
        <span>둘째</span>
      </Stack>
    );
    expect(screen.getByText('첫째')).toBeInTheDocument();
    expect(screen.getByText('둘째')).toBeInTheDocument();
  });

  it('기본적으로 column 방향이어야 합니다', () => {
    const { container } = render(<Stack>내용</Stack>);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('direction="row"가 적용되어야 합니다', () => {
    const { container } = render(<Stack direction="row">내용</Stack>);
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('gap variant가 클래스로 변환되어야 합니다', () => {
    const { container } = render(<Stack gap="md">내용</Stack>);
    expect(container.firstChild).toHaveClass('gap-4');
  });

  it('숫자 gap이 임의 클래스로 변환되어야 합니다', () => {
    const { container } = render(<Stack gap={10}>내용</Stack>);
    expect(container.firstChild).toHaveClass('gap-10');
  });

  it('as prop으로 다른 HTML 요소가 렌더링되어야 합니다', () => {
    const { container } = render(<Stack as="section">내용</Stack>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('align과 justify 클래스가 적용되어야 합니다', () => {
    const { container } = render(
      <Stack align="center" justify="between">
        내용
      </Stack>
    );
    expect(container.firstChild).toHaveClass('items-center', 'justify-between');
  });

  it('ref가 전달되어야 합니다', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Stack ref={ref}>테스트</Stack>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it('추가 className이 병합되어야 합니다', () => {
    const { container } = render(<Stack className="custom-class">내용</Stack>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Stack as="section" aria-label="테스트 영역">
        내용
      </Stack>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('VStack', () => {
  it('column 방향이 고정되어야 합니다', () => {
    const { container } = render(<VStack>내용</VStack>);
    expect(container.firstChild).toHaveClass('flex-col');
  });
});

describe('HStack', () => {
  it('row 방향이 고정되어야 합니다', () => {
    const { container } = render(<HStack>내용</HStack>);
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('기본 align이 center여야 합니다', () => {
    const { container } = render(<HStack>내용</HStack>);
    expect(container.firstChild).toHaveClass('items-center');
  });
});
