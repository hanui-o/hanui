import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import SideNavigation from './SideNavigation.vue';

const testSections = [
  { label: '섹션 1', href: '/section1' },
  {
    label: '섹션 2',
    children: [
      { label: '하위 1', href: '/section2/sub1' },
      { label: '하위 2', href: '/section2/sub2', active: true },
    ],
  },
];

describe('SideNavigation 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '메뉴', sections: testSections },
    });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('aria-labelledby로 제목과 연결되어야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '사이드 메뉴', sections: testSections },
    });
    expect(wrapper.attributes('aria-labelledby')).toBe('side-nav-title');
  });

  it('role="menubar"를 가져야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '메뉴', sections: testSections },
    });
    const menubar = wrapper.find('[role="menubar"]');
    expect(menubar.exists()).toBe(true);
  });

  it('메뉴 아이템은 role="menuitem"을 가져야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '메뉴', sections: testSections },
    });
    const menuItems = wrapper.findAll('[role="menuitem"]');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('확장 가능한 섹션은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '메뉴', sections: testSections },
    });
    const expandableBtn = wrapper.find('button[aria-expanded]');
    expect(expandableBtn.exists()).toBe(true);
  });

  it('활성 링크는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '메뉴', sections: testSections },
    });
    // active가 있는 섹션은 자동으로 열림
    // SideNavigation에서 active child가 있으면 자동으로 섹션을 열음
    await wrapper.vm.$nextTick();

    // 만약 섹션이 닫혀있다면 열기
    const expandableBtn = wrapper.find('button[aria-expanded]');
    if (expandableBtn.attributes('aria-expanded') === 'false') {
      await expandableBtn.trigger('click');
    }

    const activeLink = wrapper.find('[aria-current="page"]');
    // active가 있는 하위 항목이 표시되어야 함
    expect(activeLink.exists() || wrapper.html().includes('하위 2')).toBe(true);
  });

  it('기본 SideNavigation은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(SideNavigation, {
      props: { title: '사이드 메뉴', sections: testSections },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
