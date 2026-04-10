import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { RadioGroup, RadioGroupItem, Radio } from './radio';

describe('RadioGroup', () => {
  it('radiogroup role로 렌더링되어야 합니다', () => {
    render(
      <RadioGroup aria-label="옵션 선택">
        <RadioGroupItem value="a" aria-label="옵션 A" />
        <RadioGroupItem value="b" aria-label="옵션 B" />
      </RadioGroup>
    );
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('radio 항목들이 렌더링되어야 합니다', () => {
    render(
      <RadioGroup aria-label="옵션 선택">
        <RadioGroupItem value="a" aria-label="옵션 A" />
        <RadioGroupItem value="b" aria-label="옵션 B" />
      </RadioGroup>
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('클릭하면 선택 상태가 변경되어야 합니다', async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="옵션 선택">
        <RadioGroupItem value="a" aria-label="옵션 A" />
        <RadioGroupItem value="b" aria-label="옵션 B" />
      </RadioGroup>
    );
    const radios = screen.getAllByRole('radio');
    await user.click(radios[0]);
    expect(radios[0]).toHaveAttribute('data-state', 'checked');
    expect(radios[1]).toHaveAttribute('data-state', 'unchecked');
  });

  it('기본 RadioGroup은 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <RadioGroup aria-label="옵션 선택">
        <RadioGroupItem value="a" aria-label="옵션 A" />
        <RadioGroupItem value="b" aria-label="옵션 B" />
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('Radio (편의 컴포넌트)', () => {
  it('label이 올바르게 렌더링되어야 합니다', () => {
    render(
      <RadioGroup aria-label="선택">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
    expect(screen.getByText('옵션 A')).toBeInTheDocument();
    expect(screen.getByText('옵션 B')).toBeInTheDocument();
  });

  it('label이 있는 Radio는 접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <RadioGroup aria-label="선택">
        <Radio value="a" label="옵션 A" />
        <Radio value="b" label="옵션 B" />
      </RadioGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
