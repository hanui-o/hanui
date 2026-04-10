import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './alert-dialog';

describe('AlertDialog', () => {
  it('트리거 클릭 시 다이얼로그가 열려야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>삭제</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    await user.click(screen.getByText('삭제'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('정말 삭제하시겠습니까?')).toBeInTheDocument();
  });

  it('취소 버튼 클릭 시 다이얼로그가 닫혀야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>삭제</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>삭제 확인</AlertDialogTitle>
          <AlertDialogDescription>설명</AlertDialogDescription>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    await user.click(screen.getByText('삭제'));
    await user.click(screen.getByText('취소'));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('alertdialog role을 가져야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialogTrigger>열기</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>제목</AlertDialogTitle>
          <AlertDialogDescription>설명</AlertDialogDescription>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    await user.click(screen.getByText('열기'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <AlertDialog>
        <AlertDialogTrigger>삭제</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>삭제 확인</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );
    await user.click(screen.getByText('삭제'));
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
