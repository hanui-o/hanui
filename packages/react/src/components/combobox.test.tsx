import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Combobox } from './combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

describe('Combobox (단일 선택)', () => {
  it('combobox role로 렌더링되어야 합니다', () => {
    render(<Combobox options={options} aria-label="프레임워크" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('placeholder가 표시되어야 합니다', () => {
    render(
      <Combobox
        options={options}
        placeholder="프레임워크 선택"
        aria-label="프레임워크"
      />
    );
    expect(screen.getByText('프레임워크 선택')).toBeInTheDocument();
  });

  it('선택된 값의 레이블이 트리거에 표시되어야 합니다', () => {
    render(
      <Combobox options={options} value="react" aria-label="프레임워크" />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('disabled일 때 비활성화되어야 합니다', () => {
    render(<Combobox options={options} disabled aria-label="비활성" />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('aria-expanded가 false로 시작해야 합니다', () => {
    render(<Combobox options={options} aria-label="프레임워크" />);
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });

  it('clearable일 때 값이 있으면 선택 해제 버튼이 표시되어야 합니다', () => {
    render(
      <Combobox
        options={options}
        value="react"
        clearable
        aria-label="프레임워크"
      />
    );
    expect(screen.getByLabelText('선택 해제')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Combobox options={options} aria-label="프레임워크" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Combobox (다중 선택)', () => {
  it('multiple 모드에서 빈 배열이면 placeholder가 표시되어야 합니다', () => {
    render(
      <Combobox
        options={options}
        multiple
        value={[]}
        placeholder="복수 선택"
        aria-label="다중 프레임워크"
      />
    );
    expect(screen.getByText('복수 선택')).toBeInTheDocument();
  });

  it('multiple 모드에서 선택된 값들이 칩으로 표시되어야 합니다', () => {
    render(
      <Combobox
        options={options}
        multiple
        value={['react', 'vue']}
        aria-label="다중 프레임워크"
      />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  it('칩의 X 버튼을 누르면 onValueChange가 호출되어야 합니다', async () => {
    const user = userEvent.setup();
    let result: string[] = [];
    render(
      <Combobox
        options={options}
        multiple
        value={['react', 'vue']}
        onValueChange={(v) => (result = v)}
        aria-label="다중 프레임워크"
      />
    );
    await user.click(screen.getByLabelText('React 제거'));
    expect(result).toEqual(['vue']);
  });

  it('maxDisplayedItems 초과 시 +N으로 표시되어야 합니다', () => {
    render(
      <Combobox
        options={options}
        multiple
        value={['react', 'vue', 'angular']}
        maxDisplayedItems={2}
        aria-label="다중 프레임워크"
      />
    );
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('clearable + multiple일 때 전체 해제 버튼이 빈 배열을 전달해야 합니다', async () => {
    const user = userEvent.setup();
    let result: string[] | null = null;
    render(
      <Combobox
        options={options}
        multiple
        value={['react', 'vue']}
        onValueChange={(v) => (result = v)}
        clearable
        aria-label="다중 프레임워크"
      />
    );
    await user.click(screen.getByLabelText('선택 해제'));
    expect(result).toEqual([]);
  });

  it('disabled일 때 칩 제거 버튼이 표시되지 않아야 합니다', () => {
    render(
      <Combobox
        options={options}
        multiple
        value={['react']}
        disabled
        aria-label="다중 프레임워크"
      />
    );
    expect(screen.queryByLabelText('React 제거')).not.toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Combobox
        options={options}
        multiple
        value={['react']}
        aria-label="다중 프레임워크"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
