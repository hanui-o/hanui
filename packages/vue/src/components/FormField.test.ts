import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import FormField from './FormField.vue';
import FormLabel from './FormLabel.vue';
import FormError from './FormError.vue';
import FormHelperText from './FormHelperText.vue';
import Input from './Input.vue';

describe('FormField 접근성', () => {
  it('label이 input과 연결되어야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { id: 'test-input' },
      slots: {
        default: ['<FormLabel>이름</FormLabel>', '<Input />'],
      },
      global: {
        components: { FormLabel, Input },
      },
    });
    const label = wrapper.find('label');
    expect(label.attributes('for')).toBe('test-input');
  });

  it('필수 필드는 시각적 표시와 sr-only 텍스트를 가져야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { required: true },
      slots: {
        default: '<FormLabel>필수 입력</FormLabel>',
      },
      global: {
        components: { FormLabel },
      },
    });
    const asterisk = wrapper.find('[aria-hidden="true"]');
    expect(asterisk.exists()).toBe(true);
    expect(asterisk.text()).toBe('*');

    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.text()).toBe('(필수)');
  });

  it('FormError는 role="alert"를 가져야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { status: 'error' },
      slots: {
        default: '<FormError>오류 메시지입니다</FormError>',
      },
      global: {
        components: { FormError },
      },
    });
    const error = wrapper.find('[role="alert"]');
    expect(error.exists()).toBe(true);
  });

  it('FormError는 aria-live="polite"를 가져야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { status: 'error' },
      slots: {
        default: '<FormError>오류 메시지</FormError>',
      },
      global: {
        components: { FormError },
      },
    });
    const error = wrapper.find('[aria-live="polite"]');
    expect(error.exists()).toBe(true);
  });

  it('FormError 아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { status: 'error' },
      slots: {
        default: '<FormError>오류</FormError>',
      },
      global: {
        components: { FormError },
      },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('FormHelperText 아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { status: 'success' },
      slots: {
        default: '<FormHelperText>성공</FormHelperText>',
      },
      global: {
        components: { FormHelperText },
      },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('FormField는 label과 helper text를 올바르게 연결해야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { id: 'test-field' },
      slots: {
        default: [
          '<FormLabel>이메일</FormLabel>',
          '<FormHelperText>유효한 이메일을 입력하세요</FormHelperText>',
        ],
      },
      global: {
        components: { FormLabel, FormHelperText },
      },
    });
    // label이 올바른 for 속성을 가지고 있는지 확인
    const label = wrapper.find('label');
    expect(label.attributes('for')).toBe('test-field');
    // helper text가 있는지 확인
    expect(wrapper.text()).toContain('유효한 이메일');
  });

  it('에러 상태의 FormField도 올바르게 표시되어야 합니다', async () => {
    const wrapper = mount(FormField, {
      props: { id: 'error-field', status: 'error' },
      slots: {
        default: [
          '<FormLabel>비밀번호</FormLabel>',
          '<FormError>비밀번호는 8자 이상이어야 합니다</FormError>',
        ],
      },
      global: {
        components: { FormLabel, FormError },
      },
    });
    // 에러 메시지가 role="alert"를 가지고 있는지 확인
    const error = wrapper.find('[role="alert"]');
    expect(error.exists()).toBe(true);
    expect(error.text()).toContain('비밀번호는 8자 이상');
  });
});
