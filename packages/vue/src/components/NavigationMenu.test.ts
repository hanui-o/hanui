import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import NavigationMenu from './NavigationMenu.vue';

const testItems = [
  { label: '홈', href: '/' },
  {
    label: '서비스',
    children: [
      { label: '서비스 A', href: '/services/a' },
      { label: '서비스 B', href: '/services/b', active: true },
    ],
  },
  {
    label: '소개',
    sections: [
      {
        title: '회사 소개',
        links: [
          { label: '비전', href: '/about/vision' },
          { label: '연혁', href: '/about/history' },
        ],
      },
    ],
  },
];

describe('NavigationMenu 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('aria-label을 가져야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    expect(wrapper.attributes('aria-label')).toBe('Main navigation');
  });

  it('드롭다운 버튼은 aria-haspopup="true"를 가져야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    const dropdownButton = wrapper.find('button[aria-haspopup="true"]');
    expect(dropdownButton.exists()).toBe(true);
  });

  it('드롭다운 버튼은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    const dropdownButton = wrapper.find('button[aria-expanded]');
    expect(dropdownButton.exists()).toBe(true);
    expect(dropdownButton.attributes('aria-expanded')).toBe('false');
  });

  it('드롭다운 열림 시 aria-expanded="true"가 되어야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    const dropdownButton = wrapper.find('button[aria-expanded]');
    await dropdownButton.trigger('click');
    expect(dropdownButton.attributes('aria-expanded')).toBe('true');
  });

  it('활성 링크는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems, currentPath: '/' },
    });
    const activeLink = wrapper.find('[aria-current="page"]');
    expect(activeLink.exists()).toBe(true);
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('Escape 키로 드롭다운을 닫을 수 있어야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: testItems },
    });
    const dropdownButton = wrapper.find('button[aria-expanded]');
    await dropdownButton.trigger('click');
    expect(dropdownButton.attributes('aria-expanded')).toBe('true');

    await dropdownButton.trigger('keydown', { key: 'Escape' });
    expect(dropdownButton.attributes('aria-expanded')).toBe('false');
  });

  it('기본 NavigationMenu는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(NavigationMenu, {
      props: { items: [{ label: '홈', href: '/' }] },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
