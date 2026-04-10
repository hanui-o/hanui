import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from '../test/setup';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const TestTabs = () => (
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabsTrigger value="tab1">탭 1</TabsTrigger>
      <TabsTrigger value="tab2">탭 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">탭 1 내용</TabsContent>
    <TabsContent value="tab2">탭 2 내용</TabsContent>
  </Tabs>
);

describe('Tabs', () => {
  it('tablist role로 렌더링되어야 합니다', () => {
    render(<TestTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('tab role 요소들이 렌더링되어야 합니다', () => {
    render(<TestTabs />);
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('기본 탭의 콘텐츠가 표시되어야 합니다', () => {
    render(<TestTabs />);
    expect(screen.getByText('탭 1 내용')).toBeInTheDocument();
  });

  it('탭 클릭 시 콘텐츠가 전환되어야 합니다', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    await user.click(screen.getByText('탭 2'));
    expect(screen.getByText('탭 2 내용')).toBeInTheDocument();
  });

  it('활성 탭에 aria-selected="true"가 있어야 합니다', () => {
    render(<TestTabs />);
    expect(screen.getByText('탭 1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('탭 2')).toHaveAttribute('aria-selected', 'false');
  });

  it('접근성 위반이 없어야 합니다', async () => {
    const { container } = render(<TestTabs />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
