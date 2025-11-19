import { Card, List } from '@hanui/react';
import { ReactNode } from 'react';

interface DontCardProps {
  title?: string;
  children: ReactNode;
}

export function DontCard({
  title = '✗ 이럴 때는 다른 방법을 고려하세요',
  children,
}: DontCardProps) {
  return (
    <Card
      variant="outlined"
      className="bg-krds-warning-5 border-krds-warning-20"
    >
      <h3 className="text-[19px] font-bold leading-[150%] text-krds-gray-95 mb-3">
        {title}
      </h3>
      <List className="text-krds-gray-70">{children}</List>
    </Card>
  );
}
