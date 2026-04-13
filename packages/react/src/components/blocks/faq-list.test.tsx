import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../../test/setup';
import { FaqList } from './faq-list';

const items = [
  { id: 1, question: '질문 1', answer: '답변 1', category: '일반' },
  { id: 2, question: '질문 2', answer: '답변 2', category: '기술' },
];

describe('FaqList', () => {
  it('aria-label이 있는 section으로 렌더링되어야 합니다', () => {
    render(<FaqList items={items} />);
    expect(screen.getByLabelText('자주 묻는 질문')).toBeInTheDocument();
  });

  it('질문들이 표시되어야 합니다', () => {
    render(<FaqList items={items} />);
    expect(screen.getByText('질문 1')).toBeInTheDocument();
    expect(screen.getByText('질문 2')).toBeInTheDocument();
  });

  it('질문 클릭 시 답변이 열려야 합니다', async () => {
    const user = userEvent.setup();
    render(<FaqList items={items} />);
    await user.click(screen.getByText('질문 1'));
    expect(screen.getByText('답변 1')).toBeVisible();
  });

  it('카테고리 뱃지가 표시되어야 합니다', () => {
    render(<FaqList items={items} />);
    expect(screen.getByText('일반')).toBeInTheDocument();
    expect(screen.getByText('기술')).toBeInTheDocument();
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<FaqList items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
