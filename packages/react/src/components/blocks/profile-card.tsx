'use client';

import { Card, CardBody } from '../card';
import { Badge } from '../badge';
import { Button } from '../button';
import { Body } from '../body';
import { cn } from '@/lib/utils';

export interface ProfileCardProps {
  /** 이름 */
  name: string;
  /** 역할/직책 */
  role?: string;
  /** 이메일 */
  email?: string;
  /** 전화번호 */
  phone?: string;
  /** 소속/부서 */
  department?: string;
  /** 아바타 이미지 URL */
  avatarUrl?: string;
  /** 아바타 이니셜 (이미지 없을 때) */
  avatarInitials?: string;
  /** 뱃지 텍스트 */
  badgeText?: string;
  /** 뱃지 variant */
  badgeVariant?: 'gray' | 'primary' | 'success' | 'warning' | 'error';
  /** 프로필 편집 핸들러 */
  onEdit?: () => void;
  /** 추가 className */
  className?: string;
}

export function ProfileCard({
  name,
  role,
  email,
  phone,
  department,
  avatarUrl,
  avatarInitials,
  badgeText,
  badgeVariant = 'primary',
  onEdit,
  className,
}: ProfileCardProps) {
  const initials = avatarInitials || name.slice(0, 2).toUpperCase();

  return (
    <Card variant="outlined" className={cn('w-full max-w-sm', className)}>
      <CardBody className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden bg-krds-primary-10 flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name} 프로필 이미지`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-krds-primary-base">
              {initials}
            </span>
          )}
        </div>

        {/* Name & Role */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-lg font-bold text-krds-gray-95">{name}</h3>
            {badgeText && (
              <Badge variant={badgeVariant} size="md">
                {badgeText}
              </Badge>
            )}
          </div>
          {role && (
            <Body size="md" className="text-krds-gray-60">
              {role}
            </Body>
          )}
          {department && (
            <Body size="sm" className="text-krds-gray-50">
              {department}
            </Body>
          )}
        </div>

        {/* Contact Info */}
        {(email || phone) && (
          <div className="w-full border-t border-krds-gray-10 pt-4 space-y-2">
            {email && (
              <div className="flex justify-between">
                <Body as="span" size="sm" className="text-krds-gray-50">
                  이메일
                </Body>
                <Body as="span" size="sm" className="text-krds-gray-80">
                  {email}
                </Body>
              </div>
            )}
            {phone && (
              <div className="flex justify-between">
                <Body as="span" size="sm" className="text-krds-gray-50">
                  연락처
                </Body>
                <Body as="span" size="sm" className="text-krds-gray-80">
                  {phone}
                </Body>
              </div>
            )}
          </div>
        )}

        {/* Edit Button */}
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="w-full"
          >
            프로필 편집
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
