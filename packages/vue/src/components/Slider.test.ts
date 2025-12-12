import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Slider from './Slider.vue';

describe('Slider 접근성', () => {
  it('role="slider"를 가져야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, label: '볼륨', labelId: 'volume-label' },
    });
    const slider = wrapper.find('[role="slider"]');
    expect(slider.exists()).toBe(true);
  });

  it('aria-valuemin과 aria-valuemax를 가져야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        min: 0,
        max: 100,
        label: '볼륨',
        labelId: 'volume-label',
      },
    });
    const slider = wrapper.find('[role="slider"]');
    expect(slider.attributes('aria-valuemin')).toBe('0');
    expect(slider.attributes('aria-valuemax')).toBe('100');
  });

  it('aria-valuenow를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 75, label: '볼륨', labelId: 'volume-label' },
    });
    const slider = wrapper.find('[role="slider"]');
    expect(slider.attributes('aria-valuenow')).toBe('75');
  });

  it('aria-labelledby로 레이블과 연결되어야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, label: '볼륨', labelId: 'volume-label' },
    });
    const slider = wrapper.find('[role="slider"]');
    expect(slider.attributes('aria-labelledby')).toBe('volume-label');
  });

  it('비활성화 상태를 지원해야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        disabled: true,
        label: '볼륨',
        labelId: 'volume-label',
      },
    });
    const slider = wrapper.find('[role="slider"]');
    expect(slider.attributes('aria-disabled')).toBe('true');
  });

  it('레이블이 있는 Slider는 접근 가능해야 합니다', async () => {
    const wrapper = mount(Slider, {
      props: { modelValue: 50, label: '볼륨 조절', labelId: 'slider-label' },
    });
    // Slider가 label과 연결되어 있는지 확인
    const slider = wrapper.find('[role="slider"]');
    expect(slider.exists()).toBe(true);
    expect(slider.attributes('aria-labelledby')).toBe('slider-label');
  });
});
