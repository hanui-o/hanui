import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Breadcrumb from './Breadcrumb.vue';

const testItems = [
  { label: '홈', href: '/' },
  { label: '카테고리', href: '/category' },
  { label: '현재 페이지' },
];

describe('Breadcrumb 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    expect(wrapper.element.tagName).toBe('NAV');
  });

  it('aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    expect(wrapper.attributes('aria-label')).toBe('Breadcrumb');
  });

  it('커스텀 aria-label을 지원해야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems, ariaLabel: '경로 탐색' },
    });
    expect(wrapper.attributes('aria-label')).toBe('경로 탐색');
  });

  it('ol 요소를 포함해야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    expect(wrapper.find('ol').exists()).toBe(true);
  });

  it('현재 페이지는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    const currentPage = wrapper.find('[aria-current="page"]');
    expect(currentPage.exists()).toBe(true);
    expect(currentPage.text()).toBe('현재 페이지');
  });

  it('구분자는 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    const separators = wrapper.findAll('[aria-hidden="true"]');
    expect(separators.length).toBe(testItems.length - 1);
  });

  it('커스텀 구분자를 지원해야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems, separator: '>' },
    });
    const separators = wrapper.findAll('[aria-hidden="true"]');
    expect(separators[0].text()).toBe('>');
  });

  it('collapse 시 ...은 aria-hidden="true"를 가져야 합니다', async () => {
    const manyItems = [
      { label: '홈', href: '/' },
      { label: '레벨1', href: '/1' },
      { label: '레벨2', href: '/2' },
      { label: '레벨3', href: '/3' },
      { label: '현재 페이지' },
    ];
    const wrapper = mount(Breadcrumb, {
      props: { items: manyItems, maxItems: 3 },
    });
    // 모든 aria-hidden 요소 중 ...를 찾음
    const hiddenElements = wrapper.findAll('span[aria-hidden="true"]');
    const ellipsis = hiddenElements.find((el) => el.text() === '...');
    expect(ellipsis?.text()).toBe('...');
  });

  it('기본 Breadcrumb는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: testItems },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
