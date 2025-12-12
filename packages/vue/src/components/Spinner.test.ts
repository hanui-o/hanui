import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Spinner from './Spinner.vue';

describe('Spinner 접근성', () => {
  it('role="status"를 가져야 합니다', async () => {
    const wrapper = mount(Spinner);
    const status = wrapper.find('[role="status"]');
    expect(status.exists()).toBe(true);
  });

  it('aria-live="polite"를 가져야 합니다', async () => {
    const wrapper = mount(Spinner);
    const status = wrapper.find('[aria-live="polite"]');
    expect(status.exists()).toBe(true);
  });

  it('SVG는 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Spinner);
    const svg = wrapper.find('svg[aria-hidden="true"]');
    expect(svg.exists()).toBe(true);
  });

  it('sr-only 레이블이 있어야 합니다', async () => {
    const wrapper = mount(Spinner);
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.exists()).toBe(true);
    expect(srOnly.text()).toBe('로딩 중');
  });

  it('커스텀 레이블을 지원해야 합니다', async () => {
    const wrapper = mount(Spinner, {
      props: { label: '데이터 로드 중' },
    });
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.text()).toBe('데이터 로드 중');
  });

  it('기본 Spinner는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Spinner);
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 size도 접근성 위반이 없어야 합니다', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const wrapper = mount(Spinner, {
        props: { size },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
