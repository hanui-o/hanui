import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Toast from './Toast.vue';

describe('Toast 접근성', () => {
  it('role="alert"를 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Toast, {
      props: { title: '알림', duration: 0 },
    });
    const alert = wrapper.find('[role="alert"]');
    expect(alert.exists()).toBe(true);
    vi.useRealTimers();
  });

  it('aria-live="polite"를 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Toast, {
      props: { title: '알림', duration: 0 },
    });
    const alert = wrapper.find('[aria-live="polite"]');
    expect(alert.exists()).toBe(true);
    vi.useRealTimers();
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Toast, {
      props: { title: '알림', showIcon: true, duration: 0 },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
    vi.useRealTimers();
  });

  it('닫기 버튼은 aria-label="닫기"를 가져야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Toast, {
      props: { title: '알림', duration: 0 },
    });
    const closeBtn = wrapper.find('button[aria-label="닫기"]');
    expect(closeBtn.exists()).toBe(true);
    vi.useRealTimers();
  });

  it('닫기 버튼 클릭시 close 이벤트가 발생해야 합니다', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Toast, {
      props: { title: '알림', duration: 0 },
    });
    const closeBtn = wrapper.find('button[aria-label="닫기"]');
    await closeBtn.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
    vi.useRealTimers();
  });

  it('기본 Toast는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Toast, {
      props: {
        title: '알림 제목',
        description: '알림 내용입니다.',
        duration: 0,
      },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('info variant도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Toast, {
      props: { title: '정보', variant: 'info', duration: 0 },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
