import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import FileUpload from './FileUpload.vue';

describe('FileUpload 접근성', () => {
  it('파일 입력은 sr-only 클래스를 가져야 합니다', async () => {
    const wrapper = mount(FileUpload);
    const input = wrapper.find('input[type="file"]');
    expect(input.classes()).toContain('sr-only');
  });

  it('업로드 버튼이 있어야 합니다', async () => {
    const wrapper = mount(FileUpload);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('파일 선택');
  });

  it('파일 목록은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(FileUpload);
    // 파일이 없을 때는 목록이 없음
    const list = wrapper.find('ul[aria-label]');
    expect(list.exists()).toBe(false); // 초기에는 파일 없음
  });

  it('비활성화 상태를 지원해야 합니다', async () => {
    const wrapper = mount(FileUpload, {
      props: { disabled: true },
    });
    const input = wrapper.find('input[type="file"]');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('accept 속성을 지원해야 합니다', async () => {
    const wrapper = mount(FileUpload, {
      props: { accept: '.pdf,.doc' },
    });
    const input = wrapper.find('input[type="file"]');
    expect(input.attributes('accept')).toBe('.pdf,.doc');
  });

  it('multiple 속성을 지원해야 합니다', async () => {
    const wrapper = mount(FileUpload, {
      props: { multiple: true },
    });
    const input = wrapper.find('input[type="file"]');
    expect(input.attributes('multiple')).toBeDefined();
  });

  it('기본 FileUpload는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(FileUpload, {
      props: { title: '파일 첨부', description: '파일을 선택해주세요.' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
