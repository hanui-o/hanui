import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

describe('DropdownMenu', () => {
  it('트리거가 렌더링되어야 합니다', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>항목 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    expect(screen.getByText('메뉴')).toBeInTheDocument();
  });

  it('트리거 클릭 시 메뉴가 열려야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>수정</DropdownMenuItem>
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('메뉴'));
    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByText('삭제')).toBeInTheDocument();
  });

  it('메뉴 항목 클릭이 동작해야 합니다', async () => {
    const user = userEvent.setup();
    let clicked = false;
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => (clicked = true)}>
            수정
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    await user.click(screen.getByText('메뉴'));
    await user.click(screen.getByText('수정'));
    expect(clicked).toBe(true);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <DropdownMenu>
        <DropdownMenuTrigger>메뉴</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>항목</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
