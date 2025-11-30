import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { axe } from '../test/setup';
import Accordion from './Accordion.vue';
import AccordionItem from './AccordionItem.vue';
import AccordionTrigger from './AccordionTrigger.vue';
import AccordionContent from './AccordionContent.vue';

const AccordionExample = {
  components: { Accordion, AccordionItem, AccordionTrigger, AccordionContent },
  template: `
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>섹션 1</AccordionTrigger>
        <AccordionContent>내용 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>섹션 2</AccordionTrigger>
        <AccordionContent>내용 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  `,
};

describe('Accordion 접근성', () => {
  it('AccordionTrigger는 h3 > button 구조여야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const h3 = wrapper.find('h3');
    expect(h3.exists()).toBe(true);
    const button = h3.find('button');
    expect(button.exists()).toBe(true);
  });

  it('버튼은 aria-expanded를 가져야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const buttons = wrapper.findAll('button');
    buttons.forEach((btn) => {
      expect(btn.attributes('aria-expanded')).toBeDefined();
    });
  });

  it('아이콘은 aria-hidden="true"를 가져야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const icon = wrapper.find('[aria-hidden="true"]');
    expect(icon.exists()).toBe(true);
  });

  it('클릭하면 aria-expanded가 토글되어야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const button = wrapper.find('button');

    expect(button.attributes('aria-expanded')).toBe('false');
    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');
  });

  it('키보드(Enter/Space)로 토글 가능해야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const button = wrapper.find('button');

    await button.trigger('keydown', { key: 'Enter' });
    expect(button.attributes('aria-expanded')).toBe('true');

    await button.trigger('keydown', { key: ' ' });
    expect(button.attributes('aria-expanded')).toBe('false');
  });

  it('비활성화된 트리거는 disabled 속성을 가져야 합니다', async () => {
    const wrapper = mount({
      components: {
        Accordion,
        AccordionItem,
        AccordionTrigger,
        AccordionContent,
      },
      template: `
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger disabled>비활성화됨</AccordionTrigger>
            <AccordionContent>내용</AccordionContent>
          </AccordionItem>
        </Accordion>
      `,
    });
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('Accordion은 접근성 위반이 없어야 합니다', async () => {
    const wrapper = mount(AccordionExample);
    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
