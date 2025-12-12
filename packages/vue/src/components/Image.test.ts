import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Image from './Image.vue';

describe('Image 접근성', () => {
  it('img 요소를 포함해야 합니다', async () => {
    const wrapper = mount(Image, {
      props: { src: '/test.jpg', alt: '테스트 이미지' },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
  });

  it('alt 속성이 필수입니다', async () => {
    const wrapper = mount(Image, {
      props: { src: '/test.jpg', alt: '이미지 설명' },
    });
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('이미지 설명');
  });

  it('빈 alt는 장식용 이미지를 나타냅니다', async () => {
    const wrapper = mount(Image, {
      props: { src: '/decorative.jpg', alt: '' },
    });
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('');
  });

  it('loading="lazy"를 기본으로 가져야 합니다', async () => {
    const wrapper = mount(Image, {
      props: { src: '/test.jpg', alt: '테스트' },
    });
    const img = wrapper.find('img');
    expect(img.attributes('loading')).toBe('lazy');
  });

  it('srcSet을 지원해야 합니다', async () => {
    const wrapper = mount(Image, {
      props: {
        src: '/test.jpg',
        alt: '테스트',
        srcSet: '/test-small.jpg 300w, /test-large.jpg 600w',
      },
    });
    // srcset 또는 srcSet prop이 전달됨
    expect(wrapper.html()).toContain('srcset');
  });

  it('기본 Image는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Image, {
      props: { src: '/test.jpg', alt: '테스트 이미지 설명' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
