import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Button from './Button.vue';

describe('Button 접근성', () => {
  it('기본 버튼은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Button, {
      slots: { default: '버튼' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('비활성화된 버튼도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '비활성화 버튼' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('로딩 상태 버튼은 aria-busy를 가져야 합니다', async () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: '로딩 중' },
    });
    expect(wrapper.attributes('aria-busy')).toBe('true');
  });

  it('아이콘 전용 버튼은 aria-label이 필요합니다', async () => {
    const wrapper = mount(Button, {
      props: { size: 'icon', ariaLabel: '검색' },
      slots: { iconLeft: '<span>🔍</span>' },
    });
    expect(wrapper.attributes('aria-label')).toBe('검색');
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('링크 버튼은 <a> 태그로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Button, {
      props: { href: 'https://example.com', target: '_blank', rel: 'noopener' },
      slots: { default: '링크 버튼' },
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('https://example.com');
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('버튼은 키보드로 포커스 가능해야 합니다', () => {
    const wrapper = mount(Button, {
      slots: { default: '포커스 테스트' },
    });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'ghost',
    ] as const;

    for (const variant of variants) {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: `${variant} 버튼` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
