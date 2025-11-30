import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Alert from './Alert.vue';

describe('Alert 접근성', () => {
  it('기본 Alert는 role="alert"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      slots: { default: '알림 메시지' },
    });
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('status 역할은 aria-live="polite"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { role: 'status' },
      slots: { default: '상태 메시지' },
    });
    expect(wrapper.attributes('aria-live')).toBe('polite');
  });

  it('alert 역할은 aria-live="assertive"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { role: 'alert' },
      slots: { default: '중요 알림' },
    });
    expect(wrapper.attributes('aria-live')).toBe('assertive');
  });

  it('aria-atomic="true"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      slots: { default: '알림 메시지' },
    });
    expect(wrapper.attributes('aria-atomic')).toBe('true');
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      slots: { default: '알림 메시지' },
    });
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('닫기 버튼은 aria-label="닫기"를 가져야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { closable: true },
      slots: { default: '닫을 수 있는 알림' },
    });
    const closeBtn = wrapper.find('button[aria-label="닫기"]');
    expect(closeBtn.exists()).toBe(true);
  });

  it('info variant Alert는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { variant: 'info', title: '정보' },
      slots: { default: '정보 메시지입니다.' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('error variant Alert는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { variant: 'error', title: '오류' },
      slots: { default: '오류가 발생했습니다.' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('warning variant Alert는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { variant: 'warning', title: '경고' },
      slots: { default: '경고 메시지입니다.' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('success variant Alert는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Alert, {
      props: { variant: 'success', title: '성공' },
      slots: { default: '성공적으로 완료되었습니다.' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
