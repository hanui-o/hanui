import { describe, it, expect, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { axe } from '../test/setup';
import AlertDialog from './AlertDialog.vue';

describe('AlertDialog 접근성', () => {
  let wrapper: VueWrapper | null = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
    document.body.innerHTML = '';
  });

  it('role="alertdialog"를 가져야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '확인' },
    });
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog).toBeTruthy();
  });

  it('aria-modal="true"를 가져야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '확인' },
    });
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });

  it('aria-labelledby로 제목과 연결되어야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '삭제 확인' },
    });
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('삭제 확인');
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '경고', variant: 'warning' },
    });
    const icon = document.querySelector('[aria-hidden="true"]');
    expect(icon).toBeTruthy();
  });

  it('Escape 키로 닫을 수 있어야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '확인' },
    });

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('확인 버튼 클릭시 confirm 이벤트가 발생해야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '확인' },
    });

    const confirmBtn = document.querySelector('button:last-child');
    confirmBtn?.dispatchEvent(new Event('click'));

    expect(wrapper.emitted('confirm')).toBeTruthy();
  });

  it('취소 버튼 클릭시 cancel 이벤트가 발생해야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: true, title: '확인' },
    });

    const cancelBtn = document.querySelector('button:first-of-type');
    cancelBtn?.dispatchEvent(new Event('click'));

    expect(wrapper.emitted('cancel')).toBeTruthy();
  });

  it('닫힌 상태에서는 렌더링되지 않아야 합니다', async () => {
    wrapper = mount(AlertDialog, {
      props: { open: false, title: '확인' },
    });
    const dialog = document.querySelector('[role="alertdialog"]');
    expect(dialog).toBeFalsy();
  });
});
