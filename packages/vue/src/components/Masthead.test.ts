import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Masthead from './Masthead.vue';

describe('Masthead 접근성', () => {
  it('role="banner"를 가져야 합니다', async () => {
    const wrapper = mount(Masthead);
    expect(wrapper.attributes('role')).toBe('banner');
  });

  it('id="krds-masthead"를 가져야 합니다', async () => {
    const wrapper = mount(Masthead);
    expect(wrapper.attributes('id')).toBe('krds-masthead');
  });

  it('링크에 aria-label이 있어야 합니다', async () => {
    const wrapper = mount(Masthead);
    const link = wrapper.find('a[aria-label]');
    expect(link.exists()).toBe(true);
    expect(link.attributes('aria-label')).toBe('대한민국 정부포털 바로가기');
  });

  it('이미지는 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Masthead);
    const img = wrapper.find('img[aria-hidden="true"]');
    expect(img.exists()).toBe(true);
  });

  it('이미지는 빈 alt를 가져야 합니다 (장식용)', async () => {
    const wrapper = mount(Masthead);
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('');
  });

  it('기본 Masthead는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Masthead);
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('커스텀 텍스트를 지원해야 합니다', async () => {
    const wrapper = mount(Masthead, {
      props: { text: '커스텀 텍스트' },
    });
    expect(wrapper.text()).toContain('커스텀 텍스트');
  });
});
