import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Table from './Table.vue';
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';
import TableRow from './TableRow.vue';
import TableHead from './TableHead.vue';
import TableCell from './TableCell.vue';
import TableCaption from './TableCaption.vue';

describe('Table 접근성', () => {
  const createTable = (options = {}) => {
    return mount(Table, {
      ...options,
      slots: {
        default: `
          <thead>
            <tr>
              <th scope="col">이름</th>
              <th scope="col">나이</th>
              <th scope="col">이메일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>홍길동</td>
              <td>30</td>
              <td>hong@example.com</td>
            </tr>
            <tr>
              <td>김철수</td>
              <td>25</td>
              <td>kim@example.com</td>
            </tr>
          </tbody>
        `,
      },
    });
  };

  it('table 요소로 렌더링되어야 합니다', async () => {
    const wrapper = createTable();
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('overflow 컨테이너를 포함해야 합니다', async () => {
    const wrapper = createTable();
    expect(wrapper.find('.overflow-auto').exists()).toBe(true);
  });

  it('기본 Table은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = createTable();
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('small variant도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = createTable({ props: { small: true } });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});

describe('TableCaption 접근성', () => {
  it('caption 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableCaption, {
      slots: { default: '사용자 목록' },
    });
    expect(wrapper.element.tagName).toBe('CAPTION');
  });

  it('sr-only 클래스가 적용될 수 있어야 합니다', async () => {
    const wrapper = mount(TableCaption, {
      props: { class: 'sr-only' },
      slots: { default: '숨겨진 캡션' },
    });
    expect(wrapper.classes()).toContain('sr-only');
  });
});

describe('TableHeader 접근성', () => {
  it('thead 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableHeader, {
      slots: { default: '<tr><th>헤더</th></tr>' },
    });
    expect(wrapper.element.tagName).toBe('THEAD');
  });
});

describe('TableHead 접근성', () => {
  it('th 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableHead, {
      slots: { default: '열 헤더' },
    });
    expect(wrapper.element.tagName).toBe('TH');
  });
});

describe('TableBody 접근성', () => {
  it('tbody 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableBody, {
      slots: { default: '<tr><td>데이터</td></tr>' },
    });
    expect(wrapper.element.tagName).toBe('TBODY');
  });
});

describe('TableRow 접근성', () => {
  it('tr 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableRow, {
      slots: { default: '<td>셀</td>' },
    });
    expect(wrapper.element.tagName).toBe('TR');
  });
});

describe('TableCell 접근성', () => {
  it('td 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(TableCell, {
      slots: { default: '셀 데이터' },
    });
    expect(wrapper.element.tagName).toBe('TD');
  });
});
