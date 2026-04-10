import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Select } from './select';

const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'cherry', label: '체리' },
];

describe('Select', () => {
  it('combobox role로 렌더링되어야 합니다', () => {
    render(<Select options={options} aria-label="과일 선택" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('placeholder가 표시되어야 합니다', () => {
    render(
      <Select
        options={options}
        placeholder="선택하세요"
        aria-label="과일 선택"
      />
    );
    expect(screen.getByText('선택하세요')).toBeInTheDocument();
  });

  it('disabled일 때 비활성화되어야 합니다', () => {
    render(<Select options={options} disabled aria-label="비활성" />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('error 상태일 때 aria-invalid="true"여야 합니다', () => {
    render(<Select options={options} status="error" aria-label="에러" />);
    expect(screen.getByRole('combobox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('기본 Select는 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <label>
        과일 선택
        <Select options={options} placeholder="선택하세요" />
      </label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
