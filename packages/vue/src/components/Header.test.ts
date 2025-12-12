import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Header from './Header.vue';

const testNavigationItems = [
  { label: '소개', href: '/intro' },
  {
    label: '서비스',
    children: [
      { label: '서비스1', href: '/service/1' },
      { label: '서비스2', href: '/service/2' },
    ],
  },
];

describe('Header 접근성', () => {
  it('header 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Header);
    expect(wrapper.element.tagName).toBe('HEADER');
  });

  it('로고 링크는 적절한 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Header, {
      props: { logoAlt: '테스트 기관' },
    });
    const logoLink = wrapper.find('a[aria-label]');
    expect(logoLink.attributes('aria-label')).toContain('홈으로 이동');
  });

  it('검색 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Header);
    const searchBtn = wrapper.find('button[aria-label="검색"]');
    expect(searchBtn.exists()).toBe(true);
  });

  it('모바일 메뉴 버튼은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(Header);
    const menuBtn = wrapper.find('button[aria-label*="메뉴"]');
    expect(menuBtn.exists()).toBe(true);
    expect(menuBtn.attributes('aria-expanded')).toBe('false');
  });

  it('네비게이션은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Header, {
      props: { navigationItems: testNavigationItems },
    });
    const nav = wrapper.find('nav[aria-label="주 메뉴"]');
    expect(nav.exists()).toBe(true);
  });

  it('드롭다운 메뉴 버튼은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(Header, {
      props: { navigationItems: testNavigationItems },
    });
    const dropdownBtn = wrapper.find('.nav-item button[aria-expanded]');
    expect(dropdownBtn.exists()).toBe(true);
  });

  it('관련사이트 버튼은 aria-label과 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(Header, {
      props: {
        relatedSites: [{ label: '사이트1', href: '#' }],
      },
    });
    const relatedBtn = wrapper.find('button[aria-label="관련사이트 메뉴"]');
    expect(relatedBtn.exists()).toBe(true);
    expect(relatedBtn.attributes('aria-expanded')).toBeDefined();
  });

  it('외부 링크는 sr-only로 새 창 열림을 알려야 합니다', async () => {
    const wrapper = mount(Header, {
      props: {
        relatedSites: [{ label: '외부사이트', href: 'https://example.com' }],
      },
    });
    // 드롭다운 열기
    const relatedBtn = wrapper.find('button[aria-label="관련사이트 메뉴"]');
    await relatedBtn.trigger('click');

    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.text()).toContain('새 창 열기');
  });

  it('활성 메뉴는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(Header, {
      props: {
        navigationItems: [
          { label: '현재 페이지', href: '/current', active: true },
        ],
      },
    });
    const activeLink = wrapper.find('a[aria-current="page"]');
    expect(activeLink.exists()).toBe(true);
  });

  it('기본 Header는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Header, {
      props: { navigationItems: testNavigationItems },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
