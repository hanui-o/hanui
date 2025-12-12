import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Textarea from './Textarea.vue';

describe('Textarea 접근성', () => {
  it('textarea 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { 'aria-label': '메시지 입력' },
    });
    expect(wrapper.element.tagName).toBe('TEXTAREA');
  });

  it('비활성화 상태를 지원해야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { disabled: true, 'aria-label': '비활성화된 입력' },
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('읽기 전용 상태를 지원해야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { readonly: true, 'aria-label': '읽기 전용 입력' },
    });
    expect(wrapper.attributes('readonly')).toBeDefined();
  });

  it('에러 상태에서는 aria-invalid="true"를 가져야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { status: 'error', 'aria-label': '오류 입력' },
    });
    expect(wrapper.attributes('aria-invalid')).toBe('true');
  });

  it('placeholder를 지원해야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { placeholder: '내용을 입력하세요', 'aria-label': '내용 입력' },
    });
    expect(wrapper.attributes('placeholder')).toBe('내용을 입력하세요');
  });

  it('v-model을 지원해야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '초기값', 'aria-label': '텍스트 입력' },
    });
    expect(wrapper.element.value).toBe('초기값');
  });

  it('입력시 update:modelValue 이벤트가 발생해야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { modelValue: '', 'aria-label': '텍스트 입력' },
    });

    await wrapper.setValue('새로운 값');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['새로운 값']);
  });

  it('기본 Textarea는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Textarea, {
      props: { 'aria-label': '메시지 입력' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = ['default', 'filled'] as const;

    for (const variant of variants) {
      const wrapper = mount(Textarea, {
        props: { variant, 'aria-label': `${variant} 입력` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
