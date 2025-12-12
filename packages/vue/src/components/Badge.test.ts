import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Badge from './Badge.vue';

describe('Badge 접근성', () => {
  it('span 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Badge, {
      slots: { default: '새로운' },
    });
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Badge, {
      slots: {
        default: '새로운',
        iconLeft: '<span class="test-icon">★</span>',
      },
    });
    const iconWrapper = wrapper.find('[aria-hidden="true"]');
    expect(iconWrapper.exists()).toBe(true);
  });

  it('기본 Badge는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Badge, {
      slots: { default: '새로운' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = [
      'primary',
      'success',
      'warning',
      'error',
      'info',
    ] as const;

    for (const variant of variants) {
      const wrapper = mount(Badge, {
        props: { variant },
        slots: { default: `${variant}` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
