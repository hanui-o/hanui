import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Link from './Link.vue';

describe('Link 접근성', () => {
  it('a 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: '/page' },
      slots: { default: '링크 텍스트' },
    });
    expect(wrapper.element.tagName).toBe('A');
  });

  it('href 속성을 가져야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: '/about' },
      slots: { default: '소개' },
    });
    expect(wrapper.attributes('href')).toBe('/about');
  });

  it('외부 링크는 target="_blank"를 가져야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', external: true },
      slots: { default: '외부 링크' },
    });
    expect(wrapper.attributes('target')).toBe('_blank');
  });

  it('외부 링크는 rel="noopener noreferrer"를 가져야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', external: true },
      slots: { default: '외부 링크' },
    });
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
  });

  it('외부 링크 아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', external: true },
      slots: { default: '외부 링크' },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('외부 링크는 sr-only로 "(새 창 열림)"을 알려야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', external: true },
      slots: { default: '외부 링크' },
    });
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.exists()).toBe(true);
    expect(srOnly.text()).toBe('(새 창 열림)');
  });

  it('기본 Link는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: '/page' },
      slots: { default: '페이지 링크' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('외부 Link도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', external: true },
      slots: { default: '외부 사이트' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = ['default', 'primary'] as const;

    for (const variant of variants) {
      const wrapper = mount(Link, {
        props: { href: '/page', variant },
        slots: { default: `${variant} 링크` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
