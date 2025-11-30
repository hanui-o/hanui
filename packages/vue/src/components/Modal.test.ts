import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { axe } from '../test/setup';
import Modal from './Modal.vue';

describe('Modal 접근성', () => {
  let wrapper: VueWrapper | null = null;

  // 각 테스트 후 DOM 정리
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
    // Teleport로 인해 body에 남은 모달 요소 제거
    document.body.innerHTML = '';
  });

  it('role="dialog"를 가져야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('aria-modal="true"를 가져야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });

  it('닫기 버튼은 sr-only 텍스트를 가져야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });
    const srOnly = document.querySelector('.sr-only');
    expect(srOnly?.textContent).toBe('닫기');
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });
    const icon = document.querySelector('[aria-hidden="true"]');
    expect(icon).toBeTruthy();
  });

  it('Escape 키로 닫을 수 있어야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });

    // Escape 키 이벤트 발생
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
  });

  it('닫힌 상태에서는 렌더링되지 않아야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: false, ariaLabel: '테스트 모달' },
      slots: { default: '<p>모달 내용</p>' },
    });
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeFalsy();
  });

  it('열린 모달은 접근성 위반이 없어야 합니다', async () => {
    wrapper = mount(Modal, {
      props: { open: true, ariaLabel: '테스트 모달' },
      slots: { default: '<h2>모달 제목</h2><p>모달 내용</p>' },
    });
    const dialog = document.querySelector('[role="dialog"]');
    if (dialog) {
      const results = await axe(dialog as Element);
      expect(results).toHaveNoViolations();
    }
  });
});
