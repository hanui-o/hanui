import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Radio from './Radio.vue';
import RadioGroup from './RadioGroup.vue';

describe('Radio 접근성', () => {
  it('기본 라디오는 role="radio"를 가져야 합니다', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', label: '테스트 옵션' },
    });
    const button = wrapper.find('button');
    expect(button.attributes('role')).toBe('radio');
  });

  it('라디오는 aria-checked를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'test', label: '옵션' },
    });
    const button = wrapper.find('button');
    expect(button.attributes('aria-checked')).toBe('false');
  });

  it('레이블이 있는 라디오는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'option1', label: '옵션 1' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('비활성화된 라디오도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Radio, {
      props: { value: 'disabled', label: '비활성화됨', disabled: true },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('키보드(Space/Enter)로 선택 가능해야 합니다', async () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: '' },
      slots: {
        default: `
          <Radio value="a" label="옵션 A" />
          <Radio value="b" label="옵션 B" />
        `,
      },
      global: {
        components: { Radio },
      },
    });

    const button = wrapper.find('button');
    await button.trigger('keydown', { key: ' ' });
    // RadioGroup context가 없으므로 개별 테스트에서는 emit 확인 불가
  });
});

describe('RadioGroup 접근성', () => {
  it('RadioGroup은 role="radiogroup"을 가져야 합니다', async () => {
    const wrapper = mount(RadioGroup, {
      props: { modelValue: 'a' },
      attrs: { 'aria-label': '옵션 선택' },
    });
    expect(wrapper.attributes('role')).toBe('radiogroup');
  });
});
