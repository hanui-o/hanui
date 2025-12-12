import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

describe('Tooltip 접근성', () => {
  it('role="tooltip"을 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const tooltip = wrapper.find('[role="tooltip"]');
    expect(tooltip.exists()).toBe(true);
    vi.useRealTimers();
  });

  it('고유한 id를 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    const tooltip = wrapper.find('[role="tooltip"]');
    expect(tooltip.attributes('id')).toMatch(/^tooltip-/);
    vi.useRealTimers();
  });

  it('마우스 호버로 표시되어야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '호버 도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
    vi.useRealTimers();
  });

  it('포커스로 표시되어야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '포커스 도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('focus');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
    vi.useRealTimers();
  });

  it('마우스 리브로 숨겨져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

    await wrapper.trigger('mouseleave');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('Escape 키로 숨길 수 있어야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '도움말', delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('disabled 상태에서는 표시되지 않아야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Tooltip, {
      props: { content: '도움말', disabled: true, delay: 0 },
      slots: { default: '<button>버튼</button>' },
    });

    await wrapper.trigger('mouseenter');
    vi.runAllTimers();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('다양한 position이 지원되어야 합니다', async () => {
    const positions = ['top', 'bottom', 'left', 'right'] as const;

    for (const position of positions) {
      vi.useFakeTimers();
      const wrapper = mount(Tooltip, {
        props: { content: '도움말', position, delay: 0 },
        slots: { default: '<button>버튼</button>' },
      });

      await wrapper.trigger('mouseenter');
      vi.runAllTimers();
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
      wrapper.unmount();
      vi.useRealTimers();
    }
  });
});
