import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Tabs from './Tabs.vue';
import TabsList from './TabsList.vue';
import TabsTrigger from './TabsTrigger.vue';
import TabsContent from './TabsContent.vue';

const TabsExample = {
  components: { Tabs, TabsList, TabsTrigger, TabsContent },
  template: `
    <Tabs default-value="tab1">
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>탭 3 (비활성화)</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">탭 1 내용</TabsContent>
      <TabsContent value="tab2">탭 2 내용</TabsContent>
      <TabsContent value="tab3">탭 3 내용</TabsContent>
    </Tabs>
  `,
};

describe('Tabs 접근성', () => {
  it('TabsList는 role="tablist"를 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tablist = wrapper.find('[role="tablist"]');
    expect(tablist.exists()).toBe(true);
  });

  it('TabsTrigger는 role="tab"을 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs.length).toBe(3);
  });

  it('활성 탭은 aria-selected="true"를 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const activeTab = wrapper.find('[aria-selected="true"]');
    expect(activeTab.exists()).toBe(true);
    expect(activeTab.text()).toBe('탭 1');
  });

  it('비활성 탭은 aria-selected="false"를 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const inactiveTabs = wrapper.findAll('[aria-selected="false"]');
    expect(inactiveTabs.length).toBe(2);
  });

  it('탭은 aria-controls로 패널을 참조해야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tab = wrapper.find('[role="tab"]');
    expect(tab.attributes('aria-controls')).toBeDefined();
  });

  it('TabsContent는 role="tabpanel"을 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tabpanel = wrapper.find('[role="tabpanel"]');
    expect(tabpanel.exists()).toBe(true);
  });

  it('TabsContent는 aria-labelledby로 탭을 참조해야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tabpanel = wrapper.find('[role="tabpanel"]');
    expect(tabpanel.attributes('aria-labelledby')).toBeDefined();
  });

  it('비활성화된 탭은 disabled 속성을 가져야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const disabledTab = wrapper.find('[role="tab"][disabled]');
    expect(disabledTab.exists()).toBe(true);
    expect(disabledTab.text()).toContain('비활성화');
  });

  it('탭 클릭 시 aria-selected가 변경되어야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const tab2 = wrapper.findAll('[role="tab"]')[1];

    await tab2.trigger('click');

    expect(tab2.attributes('aria-selected')).toBe('true');
    const tab1 = wrapper.findAll('[role="tab"]')[0];
    expect(tab1.attributes('aria-selected')).toBe('false');
  });

  it('스크롤 버튼은 aria-label을 가져야 합니다', async () => {
    const wrapper = mount({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs default-value="tab1">
          <TabsList scrollable>
            <TabsTrigger value="tab1">탭 1</TabsTrigger>
            <TabsTrigger value="tab2">탭 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">내용</TabsContent>
        </Tabs>
      `,
    });
    const prevBtn = wrapper.find('button[aria-label="이전 탭 보기"]');
    const nextBtn = wrapper.find('button[aria-label="다음 탭 보기"]');
    expect(prevBtn.exists()).toBe(true);
    expect(nextBtn.exists()).toBe(true);
  });

  it('Tabs는 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(TabsExample);
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
