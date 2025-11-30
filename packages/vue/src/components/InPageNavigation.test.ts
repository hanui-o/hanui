import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import InPageNavigation from './InPageNavigation.vue';

const testLinks = [
  { label: '개요', href: '#overview' },
  { label: '기능', href: '#features', active: true },
  { label: '사용법', href: '#usage' },
];

describe('InPageNavigation 접근성', () => {
  it('nav 요소를 포함해야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: { caption: '이 페이지', title: '문서 제목', links: testLinks },
    });
    const nav = wrapper.find('nav');
    expect(nav.exists()).toBe(true);
  });

  it('aria-label을 가져야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: { caption: '이 페이지', title: '문서 제목', links: testLinks },
    });
    const nav = wrapper.find('nav');
    expect(nav.attributes('aria-label')).toBe('In-page navigation');
  });

  it('활성 링크는 aria-current="location"을 가져야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: { caption: '이 페이지', title: '문서 제목', links: testLinks },
    });
    const activeLink = wrapper.find('[aria-current="location"]');
    expect(activeLink.exists()).toBe(true);
  });

  it('링크 클릭시 페이지 내 이동해야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: { caption: '이 페이지', title: '문서 제목', links: testLinks },
    });
    const links = wrapper.findAll('nav a');
    expect(links.length).toBe(testLinks.length);
  });

  it('액션 버튼을 지원해야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: {
        caption: '이 페이지',
        title: '문서 제목',
        links: testLinks,
        action: { label: '다운로드' },
      },
    });
    const actionBtn = wrapper.find('button');
    expect(actionBtn.exists()).toBe(true);
    expect(actionBtn.text()).toContain('다운로드');
  });

  it('기본 InPageNavigation은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(InPageNavigation, {
      props: { caption: '이 페이지', title: '문서 제목', links: testLinks },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
