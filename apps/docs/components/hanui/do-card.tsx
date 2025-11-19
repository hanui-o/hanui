import { Card, List } from '@hanui/react';
import { ReactNode } from 'react';

interface DoCardProps {
  title?: string;
  children: ReactNode;
}

export function DoCard({
  title = '이럴 때 사용하세요',
  children,
}: DoCardProps) {
  return (
    <Card
      variant="outlined"
      className="bg-krds-success-5 border-krds-success-20"
    >
      <h3 className="text-[19px] font-bold leading-[150%] text-krds-gray-95 mb-3">
        {title}
      </h3>
      <List className="text-krds-gray-70">{children}</List>
    </Card>
  );
}
