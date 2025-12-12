import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import DataTable from './DataTable.vue';

interface TestRow {
  id: number;
  name: string;
  email: string;
}

const testColumns = [
  { key: 'id', header: 'ID', sortable: true },
  { key: 'name', header: '이름', sortable: true },
  { key: 'email', header: '이메일' },
];

const testData: TestRow[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com' },
  { id: 2, name: '김철수', email: 'kim@example.com' },
  { id: 3, name: '이영희', email: 'lee@example.com' },
];

describe('DataTable 접근성', () => {
  it('table 요소로 렌더링되어야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData },
    });
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('caption을 sr-only로 제공해야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, caption: '사용자 목록' },
    });
    const caption = wrapper.find('caption');
    expect(caption.exists()).toBe(true);
    expect(caption.classes()).toContain('sr-only');
    expect(caption.text()).toBe('사용자 목록');
  });

  it('검색 input은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, enableGlobalFilter: true },
    });
    // Input 컴포넌트가 aria-label prop을 전달받음
    expect(wrapper.html()).toContain('테이블 검색');
  });

  it('전체 선택 체크박스는 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, enableRowSelection: true },
    });
    // Checkbox 컴포넌트 내부에 aria-label이 있음
    const selectAllLabel = wrapper.find(
      'th input[type="checkbox"], th button[role="checkbox"]'
    );
    // Checkbox가 aria-label="전체 선택"을 가져야 함
    expect(wrapper.html()).toContain('전체 선택');
  });

  it('행 선택 체크박스는 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, enableRowSelection: true },
    });
    expect(wrapper.html()).toContain('행 선택');
  });

  it('페이지당 행 수 선택은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, enablePagination: true },
    });
    const pageSelect = wrapper.find('select[aria-label="페이지당 행 수"]');
    expect(pageSelect.exists()).toBe(true);
  });

  it('페이지네이션 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData, enablePagination: true },
    });
    const firstPageBtn = wrapper.find('button[aria-label="첫 페이지"]');
    const prevPageBtn = wrapper.find('button[aria-label="이전 페이지"]');
    const nextPageBtn = wrapper.find('button[aria-label="다음 페이지"]');
    const lastPageBtn = wrapper.find('button[aria-label="마지막 페이지"]');

    expect(firstPageBtn.exists()).toBe(true);
    expect(prevPageBtn.exists()).toBe(true);
    expect(nextPageBtn.exists()).toBe(true);
    expect(lastPageBtn.exists()).toBe(true);
  });

  it('정렬 버튼이 키보드로 접근 가능해야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData },
    });
    const sortButton = wrapper.find('button');
    expect(sortButton.exists()).toBe(true);
    expect(sortButton.attributes('type')).toBe('button');
  });

  it('thead와 tbody가 올바르게 구조화되어야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: { columns: testColumns, data: testData },
    });
    expect(wrapper.find('thead').exists()).toBe(true);
    expect(wrapper.find('tbody').exists()).toBe(true);
    expect(wrapper.findAll('th').length).toBe(testColumns.length);
    expect(wrapper.findAll('tbody tr').length).toBe(testData.length);
  });

  it('기본 DataTable은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: testColumns,
        data: testData,
        caption: '사용자 데이터 테이블',
      },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });

  it('페이지네이션이 있는 DataTable도 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(DataTable, {
      props: {
        columns: testColumns,
        data: testData,
        caption: '페이지네이션 테이블',
        enablePagination: true,
      },
    });
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
