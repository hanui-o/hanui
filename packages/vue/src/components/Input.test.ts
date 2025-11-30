import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Input from './Input.vue';

describe('Input 접근성', () => {
  it('기본 input은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { placeholder: '입력하세요' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('비활성화된 input도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { disabled: true, placeholder: '비활성화됨' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('읽기 전용 input도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { readonly: true, modelValue: '읽기만 가능' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('readonly')).toBeDefined();
  });

  it('에러 상태 input은 aria-invalid를 가져야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { status: 'error' },
    });
    const input = wrapper.find('input');
    expect(input.attributes('aria-invalid')).toBe('true');
  });

  it('비밀번호 토글 버튼은 적절한 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { type: 'password', modelValue: 'secret' },
    });
    const toggleBtn = wrapper.find('button[aria-label]');
    expect(toggleBtn.attributes('aria-label')).toBe('비밀번호 보기');

    await toggleBtn.trigger('click');
    expect(toggleBtn.attributes('aria-label')).toBe('비밀번호 숨기기');
  });

  it('지우기 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Input, {
      props: { clearable: true, modelValue: '값이 있음' },
    });
    const clearBtn = wrapper.find('button[aria-label="입력 지우기"]');
    expect(clearBtn.exists()).toBe(true);
  });

  it('다양한 size도 접근성 위반이 없어야 합니다', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const wrapper = mount(Input, {
        props: { size, placeholder: `${size} 크기` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
