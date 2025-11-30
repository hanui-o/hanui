import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Skeleton from './Skeleton.vue';

describe('Skeleton 접근성', () => {
  it('aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Skeleton);
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('div 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Skeleton);
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('커스텀 크기를 지원해야 합니다', async () => {
    const wrapper = mount(Skeleton, {
      props: { width: 100, height: 50 },
    });
    expect(wrapper.attributes('style')).toContain('width: 100px');
    expect(wrapper.attributes('style')).toContain('height: 50px');
  });

  it('circular variant는 기본 크기를 가져야 합니다', async () => {
    const wrapper = mount(Skeleton, {
      props: { variant: 'circular' },
    });
    expect(wrapper.attributes('style')).toContain('width: 40px');
    expect(wrapper.attributes('style')).toContain('height: 40px');
  });

  it('애니메이션 비활성화를 지원해야 합니다', async () => {
    const wrapper = mount(Skeleton, {
      props: { disableAnimation: true },
    });
    expect(wrapper.classes()).toContain('animate-none');
  });
});
