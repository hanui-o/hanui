import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './accordion';

const TestAccordion = () => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>섹션 1</AccordionTrigger>
      <AccordionContent>섹션 1 내용</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>섹션 2</AccordionTrigger>
      <AccordionContent>섹션 2 내용</AccordionContent>
    </AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  it('트리거들이 렌더링되어야 합니다', () => {
    render(<TestAccordion />);
    expect(screen.getByText('섹션 1')).toBeInTheDocument();
    expect(screen.getByText('섹션 2')).toBeInTheDocument();
  });

  it('기본적으로 콘텐츠가 숨겨져 있어야 합니다', () => {
    render(<TestAccordion />);
    const triggers = screen.getAllByRole('button');
    expect(triggers[0]).toHaveAttribute('data-state', 'closed');
  });

  it('트리거 클릭 시 콘텐츠가 열려야 합니다', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText('섹션 1'));
    expect(screen.getByText('섹션 1').closest('button')).toHaveAttribute(
      'data-state',
      'open'
    );
  });

  it('다른 트리거 클릭 시 이전 항목이 닫혀야 합니다 (single 모드)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText('섹션 1'));
    expect(screen.getByText('섹션 1').closest('button')).toHaveAttribute(
      'data-state',
      'open'
    );
    await user.click(screen.getByText('섹션 2'));
    expect(screen.getByText('섹션 1').closest('button')).toHaveAttribute(
      'data-state',
      'closed'
    );
    expect(screen.getByText('섹션 2').closest('button')).toHaveAttribute(
      'data-state',
      'open'
    );
  });

  it('트리거는 button role을 가져야 합니다', () => {
    render(<TestAccordion />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<TestAccordion />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
