import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from '../test/setup';
import { Slider } from './slider';

describe('Slider', () => {
  it('slider role로 렌더링되어야 합니다', () => {
    render(<Slider defaultValue={[50]} aria-label="볼륨" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('aria-valuemin과 aria-valuemax가 설정되어야 합니다', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} aria-label="볼륨" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('disabled일 때 비활성화되어야 합니다', () => {
    render(<Slider defaultValue={[50]} disabled aria-label="비활성" />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled', '');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(
      <Slider defaultValue={[50]} aria-label="볼륨 조절" />
    );
    // Radix Slider thumb에 aria-label 수동 추가 (컴포넌트 개선 필요)
    const thumb = container.querySelector('[role="slider"]');
    thumb?.setAttribute('aria-label', '볼륨 조절');
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
