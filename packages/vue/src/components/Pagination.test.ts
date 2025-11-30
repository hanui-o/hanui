import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Pagination from './Pagination.vue';

describe('Pagination 접근성', () => {
  it('nav 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
  });

  it('role="navigation"을 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    const nav = wrapper.find('nav');
    expect(nav.attributes('role')).toBe('navigation');
  });

  it('aria-label="Pagination Navigation"을 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    const nav = wrapper.find('nav');
    expect(nav.attributes('aria-label')).toBe('Pagination Navigation');
  });

  it('현재 페이지는 aria-current="page"를 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 5, totalPages: 10 },
    });
    const currentBtn = wrapper.find('[aria-current="page"]');
    expect(currentBtn.exists()).toBe(true);
    expect(currentBtn.text()).toBe('5');
  });

  it('각 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 5, totalPages: 10 },
    });
    const buttons = wrapper.findAll('button[aria-label]');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('비활성화된 버튼은 disabled 속성을 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    const firstBtn = wrapper.find('button[aria-label*="처음"]');
    expect(firstBtn.attributes('disabled')).toBeDefined();
  });

  it('ellipsis는 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 5, totalPages: 20 },
    });
    const ellipsis = wrapper.find('[aria-hidden="true"]');
    expect(ellipsis.exists()).toBe(true);
  });

  it('sr-only 상태 알림이 있어야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10 },
    });
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.exists()).toBe(true);
    expect(srOnly.attributes('role')).toBe('status');
    expect(srOnly.attributes('aria-live')).toBe('polite');
  });

  it('direct-input variant는 input을 포함해야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 1, totalPages: 10, variant: 'direct-input' },
    });
    const input = wrapper.find('input[type="number"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('aria-label')).toContain('페이지');
  });

  it('load-more variant는 aria-busy를 지원해야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 10,
        variant: 'load-more',
        isLoading: true,
      },
    });
    const loadMoreBtn = wrapper.find('button[aria-busy="true"]');
    expect(loadMoreBtn.exists()).toBe(true);
  });

  it('기본 Pagination은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 5, totalPages: 10 },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('direct-input variant도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Pagination, {
      props: { currentPage: 5, totalPages: 10, variant: 'direct-input' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
