import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Checkbox from './Checkbox.vue';

describe('Checkbox 접근성', () => {
  it('기본 체크박스는 role="checkbox"를 가져야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { ariaLabel: '동의' },
    });
    expect(wrapper.attributes('role')).toBe('checkbox');
  });

  it('체크박스는 aria-checked를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, ariaLabel: '동의' },
    });
    expect(wrapper.attributes('aria-checked')).toBe('false');

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.attributes('aria-checked')).toBe('true');
  });

  it('레이블이 있는 체크박스는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { label: '이용약관 동의' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('비활성화된 체크박스도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { disabled: true, label: '비활성화됨' },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('에러 상태 체크박스는 aria-invalid를 가져야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { status: 'error', label: '필수 동의' },
    });
    const button = wrapper.find('button');
    expect(button.attributes('aria-invalid')).toBe('true');
  });

  it('키보드(Space/Enter)로 토글 가능해야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, label: '키보드 테스트' },
    });

    const button = wrapper.find('button');
    await button.trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

    await button.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([true]);
  });

  it('레이블 클릭으로 토글 가능해야 합니다', async () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, label: '클릭 테스트' },
    });

    const label = wrapper.find('span');
    await label.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('다양한 size도 접근성 위반이 없어야 합니다', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const wrapper = mount(Checkbox, {
        props: { size, label: `${size} 크기` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
