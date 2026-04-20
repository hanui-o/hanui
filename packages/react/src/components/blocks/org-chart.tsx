'use client';

import * as React from 'react';
import { Card, CardBody } from '../card';
import { Body } from '../body';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

export interface OrgNode {
  /** 직책/부서명 */
  title: string;
  /** 이름 */
  name?: string;
  /** 전화번호 */
  phone?: string;
  /** 이메일 */
  email?: string;
  /** 하위 조직 */
  children?: OrgNode[];
}

export interface OrgChartProps {
  /** 조직도 루트 노드 */
  data: OrgNode;
  /** 추가 className */
  className?: string;
}

// ============================================================================
// OrgNodeCard Component
// ============================================================================

function OrgNodeCard({ node, isRoot }: { node: OrgNode; isRoot?: boolean }) {
  return (
    <Card
      variant="outlined"
      className={cn(
        'inline-block min-w-[140px] max-w-[200px]',
        isRoot && 'border-krds-primary-base border-2'
      )}
    >
      <CardBody className="p-3 text-center">
        <Body
          size="sm"
          weight="bold"
          className={cn(
            isRoot ? 'text-krds-primary-base' : 'text-krds-gray-95'
          )}
        >
          {node.title}
        </Body>
        {node.name && (
          <Body size="sm" className="text-krds-gray-70 mt-0.5">
            {node.name}
          </Body>
        )}
        {node.phone && (
          <Body size="xs" className="text-krds-gray-50 mt-0.5">
            {node.phone}
          </Body>
        )}
      </CardBody>
    </Card>
  );
}

// ============================================================================
// OrgBranch Component (재귀)
// ============================================================================

function OrgBranch({ node, isRoot }: { node: OrgNode; isRoot?: boolean }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <OrgNodeCard node={node} isRoot={isRoot} />

      {hasChildren && (
        <>
          {/* 세로선 (부모 → 가로선) */}
          <div className="w-px h-6 bg-krds-gray-30" />

          {/* 가로선 + 자식 그룹 */}
          <div className="relative flex justify-center">
            {/* 가로선 */}
            {node.children!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-krds-gray-30"
                style={{
                  left: `calc(${100 / (node.children!.length * 2)}%)`,
                  right: `calc(${100 / (node.children!.length * 2)}%)`,
                }}
              />
            )}

            <div className="flex gap-4">
              {node.children!.map((child, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* 세로선 (가로선 → 자식) */}
                  <div className="w-px h-6 bg-krds-gray-30" />
                  <OrgBranch node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// OrgChart Component
// ============================================================================

export function OrgChart({ data, className }: OrgChartProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div className="inline-flex justify-center min-w-full py-4">
        <OrgBranch node={data} isRoot />
      </div>
    </div>
  );
}
