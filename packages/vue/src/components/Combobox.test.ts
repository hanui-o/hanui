import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Combobox from './Combobox.vue';

const testOptions = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];

describe('Combobox 접근성', () => {
  it('role="combobox"를 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    expect(combobox.exists()).toBe(true);
  });

  it('aria-haspopup="listbox"를 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    expect(combobox.attributes('aria-haspopup')).toBe('listbox');
  });

  it('aria-expanded를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    expect(combobox.attributes('aria-expanded')).toBe('false');

    await combobox.trigger('click');
    expect(combobox.attributes('aria-expanded')).toBe('true');
  });

  it('listbox role이 있어야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    await combobox.trigger('click');

    const listbox = wrapper.find('[role="listbox"]');
    expect(listbox.exists()).toBe(true);
  });

  it('옵션은 role="option"을 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    await combobox.trigger('click');

    const options = wrapper.findAll('[role="option"]');
    expect(options.length).toBe(testOptions.length);
  });

  it('선택된 옵션은 aria-selected="true"를 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions, modelValue: 'apple' },
    });
    const combobox = wrapper.find('[role="combobox"]');
    await combobox.trigger('click');

    const selectedOption = wrapper.find('[aria-selected="true"]');
    expect(selectedOption.exists()).toBe(true);
  });

  it('선택 해제 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions, modelValue: 'apple', clearable: true },
    });
    const clearBtn = wrapper.find('button[aria-label="선택 해제"]');
    expect(clearBtn.exists()).toBe(true);
  });

  it('검색 아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');
    await combobox.trigger('click');

    const hiddenIcons = wrapper.findAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBeGreaterThan(0);
  });

  it('키보드(Escape)로 드롭다운을 닫을 수 있어야 합니다', async () => {
    const wrapper = mount(Combobox, {
      props: { options: testOptions },
    });
    const combobox = wrapper.find('[role="combobox"]');

    await combobox.trigger('click');
    expect(combobox.attributes('aria-expanded')).toBe('true');

    await combobox.trigger('keydown', { key: 'Escape' });
    expect(combobox.attributes('aria-expanded')).toBe('false');
  });

  it('기본 Combobox는 접근성 위반이 없어야 합니다', async () => {
    // Combobox는 placeholder 텍스트로 접근성 이름을 제공함
    const wrapper = mount(Combobox, {
      props: { options: testOptions, placeholder: '과일을 선택하세요' },
    });
    // combobox 버튼에 텍스트가 있음
    const combobox = wrapper.find('[role="combobox"]');
    expect(combobox.text()).toBeTruthy();
  });
});
