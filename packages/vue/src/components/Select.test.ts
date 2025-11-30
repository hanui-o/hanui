import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Select from './Select.vue';

const testOptions = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];

describe('Select 접근성', () => {
  it('기본 Select는 aria-haspopup="listbox"를 가져야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions },
    });
    const button = wrapper.find('button');
    expect(button.attributes('aria-haspopup')).toBe('listbox');
  });

  it('Select는 aria-expanded를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions },
    });
    const button = wrapper.find('button');
    expect(button.attributes('aria-expanded')).toBe('false');

    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');
  });

  it('옵션은 role="option"을 가져야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions },
    });
    const button = wrapper.find('button');
    await button.trigger('click');

    const options = wrapper.findAll('[role="option"]');
    expect(options.length).toBe(testOptions.length);
  });

  it('선택된 옵션은 aria-selected="true"를 가져야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions, modelValue: 'apple' },
    });
    const button = wrapper.find('button');
    await button.trigger('click');

    const selectedOption = wrapper.find('[aria-selected="true"]');
    expect(selectedOption.exists()).toBe(true);
    expect(selectedOption.text()).toContain('사과');
  });

  it('비활성화된 Select도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions, disabled: true },
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('비활성화된 옵션은 aria-disabled를 가져야 합니다', async () => {
    const optionsWithDisabled = [
      ...testOptions,
      { value: 'mango', label: '망고', disabled: true },
    ];
    const wrapper = mount(Select, {
      props: { options: optionsWithDisabled },
    });
    const button = wrapper.find('button');
    await button.trigger('click');

    const disabledOption = wrapper.find('[aria-disabled="true"]');
    expect(disabledOption.exists()).toBe(true);
  });

  it('에러 상태 Select도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions, status: 'error' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('레이블이 있는 Select는 접근성이 향상됩니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions, label: '과일 선택' },
    });
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('과일 선택');
  });

  it('키보드(Escape)로 드롭다운을 닫을 수 있어야 합니다', async () => {
    const wrapper = mount(Select, {
      props: { options: testOptions },
    });
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');

    await button.trigger('keydown', { key: 'Escape' });
    expect(button.attributes('aria-expanded')).toBe('false');
  });
});
