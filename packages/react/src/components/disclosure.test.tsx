import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Disclosure } from './disclosure';

describe('Disclosure', () => {
  it('트리거가 렌더링되어야 합니다', () => {
    render(<Disclosure trigger={<span>더보기</span>}>숨겨진 내용</Disclosure>);
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('클릭하면 콘텐츠가 표시되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<Disclosure trigger={<span>더보기</span>}>숨겨진 내용</Disclosure>);
    await user.click(screen.getByText('더보기'));
    expect(screen.getByText('숨겨진 내용')).toBeVisible();
  });

  it('defaultOpen이 true면 처음부터 열려야 합니다', () => {
    render(
      <Disclosure trigger={<span>더보기</span>} defaultOpen>
        열린 내용
      </Disclosure>
    );
    expect(screen.getByText('열린 내용')).toBeVisible();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Disclosure trigger={<span>더보기</span>}>내용</Disclosure>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
