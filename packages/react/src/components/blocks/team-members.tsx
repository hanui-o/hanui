'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardBody,
} from '../card';
import { Button } from '../button';
import { Badge } from '../badge';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface TeamMember {
  /** 멤버 ID */
  id: string;
  /** 이름 */
  name: string;
  /** 이메일 */
  email: string;
  /** 역할 */
  role: string;
  /** 아바타 URL */
  avatarUrl?: string;
  /** 상태 */
  status?: 'active' | 'invited' | 'inactive';
}

export interface TeamMembersProps {
  /** 팀 멤버 목록 */
  members?: TeamMember[];
  /** 초대 핸들러 */
  onInvite?: () => void;
  /** 멤버 제거 핸들러 */
  onRemove?: (memberId: string) => void;
  /** 추가 className */
  className?: string;
  /** 카드 제목 */
  title?: string;
  /** 카드 설명 */
  description?: string;
}

const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: '김미아',
    email: 'mia@example.com',
    role: '관리자',
    status: 'active',
  },
  {
    id: '2',
    name: '이영희',
    email: 'younghee@example.com',
    role: '편집자',
    status: 'active',
  },
  {
    id: '3',
    name: '박철수',
    email: 'cheolsu@example.com',
    role: '뷰어',
    status: 'invited',
  },
];

const statusMap = {
  active: { label: '활성', variant: 'success' as const },
  invited: { label: '초대됨', variant: 'warning' as const },
  inactive: { label: '비활성', variant: 'gray' as const },
};

export function TeamMembers({
  members = defaultMembers,
  onInvite,
  onRemove,
  className,
  title = '팀 멤버',
  description = '팀 멤버를 관리하고 새 멤버를 초대합니다.',
}: TeamMembersProps) {
  return (
    <Card variant="outlined" className={cn('w-full max-w-2xl', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {onInvite && (
          <Button variant="primary" size="sm" onClick={onInvite}>
            멤버 초대
          </Button>
        )}
      </CardHeader>

      <CardBody>
        <div className="divide-y divide-krds-gray-10">
          {members.map((member) => {
            const statusInfo = statusMap[member.status || 'active'];
            const initials = member.name.slice(0, 2);

            return (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-krds-primary-10 flex items-center justify-center flex-shrink-0">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-krds-primary-base">
                        {initials}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <Body
                        as="span"
                        size="md"
                        weight="bold"
                        className="text-krds-gray-95"
                      >
                        {member.name}
                      </Body>
                      <Badge variant={statusInfo.variant} size="md">
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <Body size="sm" className="text-krds-gray-50">
                      {member.email}
                    </Body>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Body size="sm" className="text-krds-gray-60">
                    {member.role}
                  </Body>
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(member.id)}
                    >
                      제거
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
