import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import MegaMenu from './MegaMenu.vue';

const testColumns = [
  {
    title: '서비스',
    href: '/services',
    links: [
      { label: '서비스 A', href: '/services/a' },
      { label: '서비스 B', href: '/services/b', active: true },
    ],
  },
  {
    title: '소개',
    href: '/about',
    links: [
      { label: '회사 소개', href: '/about/company' },
      { label: '연혁', href: '/about/history' },
    ],
  },
];

describe('MegaMenu 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('aria-label="메인 메뉴"를 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    expect(wrapper.attributes('aria-label')).toBe('메인 메뉴');
  });

  it('메뉴 아이템은 aria-haspopup="true"를 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    const menuItem = wrapper.find('[aria-haspopup="true"]');
    expect(menuItem.exists()).toBe(true);
  });

  it('메뉴 아이템은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    const menuItem = wrapper.find('[aria-expanded]');
    expect(menuItem.exists()).toBe(true);
  });

  it('드롭다운 영역은 role="menu"를 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    // MegaMenu는 기본적으로 열려 있음
    const menu = wrapper.find('[role="menu"]');
    expect(menu.exists()).toBe(true);
  });

  it('서브메뉴 링크는 role="menuitem"을 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    const menuItems = wrapper.findAll('[role="menuitem"]');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('활성 링크는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    const activeLink = wrapper.find('[aria-current="page"]');
    expect(activeLink.exists()).toBe(true);
  });

  it('Escape 키로 메뉴를 닫을 수 있어야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: { columns: testColumns },
    });
    const menuItem = wrapper.find('[aria-haspopup="true"]');
    await menuItem.trigger('keydown', { key: 'Escape' });

    // 메뉴가 닫힌 후에는 role="menu"가 없어야 함
    // (isOpen이 false가 되므로)
    await wrapper.vm.$nextTick();
    // MegaMenu의 isOpen이 false가 되면 드롭다운이 사라짐
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
  });

  it('MegaMenu의 nav 요소가 접근 가능해야 합니다', async () => {
    const wrapper = mount(MegaMenu, {
      props: {
        columns: [
          {
            title: '홈',
            href: '/',
            links: [{ label: '대시보드', href: '/dashboard' }],
          },
        ],
      },
    });
    // MegaMenu는 nav 요소이고 aria-label을 가짐
    expect(wrapper.element.tagName).toBe('NAV');
    expect(wrapper.attributes('aria-label')).toBe('메인 메뉴');
    // 메뉴바 링크가 존재
    const links = wrapper.findAll('a');
    expect(links.length).toBeGreaterThan(0);
  });
});
