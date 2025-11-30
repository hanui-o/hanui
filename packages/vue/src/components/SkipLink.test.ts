import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import SkipLink from './SkipLink.vue';

describe('SkipLink 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(SkipLink);
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('aria-label="건너뛰기 링크"를 가져야 합니다', async () => {
    const wrapper = mount(SkipLink);
    expect(wrapper.attributes('aria-label')).toBe('건너뛰기 링크');
  });

  it('id="krds-skip-link"를 가져야 합니다', async () => {
    const wrapper = mount(SkipLink);
    expect(wrapper.attributes('id')).toBe('krds-skip-link');
  });

  it('기본 링크는 "본문 바로가기"여야 합니다', async () => {
    const wrapper = mount(SkipLink);
    const link = wrapper.find('a');
    expect(link.text()).toBe('본문 바로가기');
    expect(link.attributes('href')).toBe('#main-content');
  });

  it('커스텀 링크를 지원해야 합니다', async () => {
    const wrapper = mount(SkipLink, {
      props: {
        links: [
          { href: '#nav', label: '메뉴 바로가기' },
          { href: '#main', label: '본문 바로가기' },
        ],
      },
    });
    const links = wrapper.findAll('a');
    expect(links.length).toBe(2);
    expect(links[0].text()).toBe('메뉴 바로가기');
    expect(links[1].text()).toBe('본문 바로가기');
  });

  it('hidden variant는 포커스시에만 보여야 합니다', async () => {
    const wrapper = mount(SkipLink, {
      props: { variant: 'hidden' },
    });
    const link = wrapper.find('a');
    // hidden variant는 CSS로 처리되므로 클래스 확인
    expect(link.classes().join(' ')).toContain('-top-full');
    expect(link.classes().join(' ')).toContain('focus:top-0');
  });

  it('visible variant는 항상 보여야 합니다', async () => {
    const wrapper = mount(SkipLink, {
      props: { variant: 'visible' },
    });
    const link = wrapper.find('a');
    expect(link.classes().join(' ')).not.toContain('-top-full');
  });

  it('기본 SkipLink는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(SkipLink);
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('visible variant도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(SkipLink, {
      props: { variant: 'visible' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
