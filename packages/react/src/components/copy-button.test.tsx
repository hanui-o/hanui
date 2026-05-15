import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CopyButton } from './copy-button';

const writeTextMock = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
  writeTextMock.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: writeTextMock },
    writable: true,
    configurable: true,
  });
});

describe('CopyButton', () => {
  it('기본 렌더링 — 복사 아이콘과 aria-label 표시', () => {
    render(<CopyButton value="hello" />);
    const button = screen.getByRole('button', { name: '복사' });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  it('클릭 시 클립보드에 value를 복사한다', async () => {
    render(<CopyButton value="복사할 텍스트" />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '복사' }));
    });

    expect(writeTextMock).toHaveBeenCalledWith('복사할 텍스트');
  });

  it('복사 성공 시 aria-label이 "복사됨"으로 변경된다', async () => {
    render(<CopyButton value="hello" />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '복사' }));
    });

    expect(screen.getByRole('button', { name: '복사됨' })).toBeInTheDocument();
  });

  it('복사 성공 시 onCopy 콜백을 호출한다', async () => {
    const onCopy = vi.fn();
    render(<CopyButton value="hello" onCopy={onCopy} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '복사' }));
    });

    expect(onCopy).toHaveBeenCalledWith('hello');
  });

  it('resetDelay 후 원래 상태로 돌아온다', async () => {
    vi.useFakeTimers();
    render(<CopyButton value="hello" resetDelay={500} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '복사' }));
    });
    expect(screen.getByRole('button', { name: '복사됨' })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByRole('button', { name: '복사' })).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('클립보드 API 실패 시 onError를 호출한다', async () => {
    writeTextMock.mockRejectedValueOnce(new Error('Clipboard API failed'));
    const onError = vi.fn();

    render(<CopyButton value="hello" onError={onError} />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: '복사' }));
    });

    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    expect(screen.getByRole('button', { name: '복사' })).toBeInTheDocument();
  });

  it('value가 빈 문자열이면 disabled 상태가 된다', () => {
    render(<CopyButton value="" />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('ref를 전달할 수 있다', () => {
    const ref = vi.fn();
    render(<CopyButton value="hello" ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('displayName이 설정되어 있다', () => {
    expect(CopyButton.displayName).toBe('CopyButton');
  });
});
