import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Switch from './Switch.vue';

describe('Switch 접근성', () => {
  it('role="switch"를 가져야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { label: '알림 설정' },
    });
    const switchBtn = wrapper.find('button');
    expect(switchBtn.attributes('role')).toBe('switch');
  });

  it('aria-checked를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: '알림 설정' },
    });
    const switchBtn = wrapper.find('button');
    expect(switchBtn.attributes('aria-checked')).toBe('false');

    await wrapper.setProps({ modelValue: true });
    expect(switchBtn.attributes('aria-checked')).toBe('true');
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: true, label: '알림 설정' },
    });
    const icons = wrapper.findAll('[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('레이블이 있는 Switch는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { label: '알림 받기', id: 'test-switch' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('비활성화된 Switch도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { disabled: true, label: '비활성화' },
    });
    const switchBtn = wrapper.find('button');
    expect(switchBtn.attributes('disabled')).toBeDefined();
  });

  it('키보드(Space/Enter)로 토글 가능해야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: '키보드 테스트' },
    });

    const switchBtn = wrapper.find('button');
    await switchBtn.trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

    await switchBtn.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([true]);
  });

  it('레이블 클릭으로 토글 가능해야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: { modelValue: false, label: '클릭 테스트' },
    });

    const label = wrapper.find('span');
    await label.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('labelPosition="left"도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Switch, {
      props: {
        label: '왼쪽 레이블',
        labelPosition: 'left',
        id: 'test-switch-left',
      },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 size도 접근성 위반이 없어야 합니다', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const wrapper = mount(Switch, {
        props: { size, label: `${size} 크기`, id: `test-switch-${size}` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
