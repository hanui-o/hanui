import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Progress from './Progress.vue';

describe('Progress 접근성', () => {
  it('role="progressbar"를 가져야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 50 },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.exists()).toBe(true);
  });

  it('aria-valuenow를 올바르게 설정해야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 75 },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-valuenow')).toBe('75');
  });

  it('aria-valuemin과 aria-valuemax를 가져야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 50, max: 200 },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-valuemin')).toBe('0');
    expect(progressbar.attributes('aria-valuemax')).toBe('200');
  });

  it('aria-label을 가져야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 50, label: '파일 업로드' },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-label')).toBe('파일 업로드');
  });

  it('기본 aria-label은 "진행률"이어야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 50 },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-label')).toBe('진행률');
  });

  it('indeterminate 상태에서는 aria-busy="true"를 가져야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: null },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-busy')).toBe('true');
  });

  it('indeterminate 상태에서는 aria-valuenow가 없어야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: null },
    });
    const progressbar = wrapper.find('[role="progressbar"]');
    expect(progressbar.attributes('aria-valuenow')).toBeUndefined();
  });

  it('기본 Progress는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(Progress, {
      props: { value: 50, label: '진행 상태' },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('다양한 variant도 접근성 위반이 없어야 합니다', async () => {
    const variants = [
      'default',
      'primary',
      'success',
      'warning',
      'error',
    ] as const;

    for (const variant of variants) {
      const wrapper = mount(Progress, {
        props: { value: 50, variant, label: `${variant} 진행률` },
      });
      const results = await axe(wrapper.element);
      expect(results).toHaveNoViolations();
    }
  });
});
