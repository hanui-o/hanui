'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const modalSizes = {
  // Modal 크기 variants
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
} as const;

export interface ModalProps {
  // Modal Props
  open: boolean; // Modal 표시 여부
  onClose: (value: boolean) => void; // Modal 닫기 콜백
  size?: keyof typeof modalSizes; // Modal 크기 (기본값: md)
  children: React.ReactNode; // Modal 콘텐츠
  className?: string; // Modal 패널 추가 className
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>( // KRDS Modal 컴포넌트 (Radix UI Dialog, focus 관리, ESC/Tab 키보드 내비게이션, ARIA 자동화)
  ({ open, onClose, size = 'md', children, className }, ref) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onClose}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay // 배경 Overlay (클릭 시 닫기 비활성화)
            className={cn(
              'fixed inset-0 z-50 bg-[#000000bf]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
            )}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {' '}
            {/* Modal 컨테이너 */}
            <DialogPrimitive.Content
              ref={ref}
              className={cn(
                'z-50 w-full',
                modalSizes[size],
                'relative',
                'bg-krds-white',
                'border border-krds-gray-30',
                'rounded-lg pt-14 px-10 pb-10',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
                'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
                'duration-200',
                'shadow-lg',
                className
              )}
            >
              {children}
              <DialogPrimitive.Close // 기본 닫기 버튼 (오른쪽 상단 X 아이콘, footer 버튼 다음 포커스)
                className={cn(
                  'absolute right-4 top-4 rounded-md w-10 h-10 p-1',
                  'flex items-center justify-center',
                  'text-krds-gray-90 hover:text-krds-gray-95',
                  'focus:outline-none focus:ring-2 focus:ring-krds-primary-50 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">닫기</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </div>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);
Modal.displayName = 'Modal';

export const ModalTitle = React.forwardRef<
  // ModalTitle 컴포넌트 (Dialog.Title, ARIA labeling, semantic h3)
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-2xl font-bold leading-6 text-krds-gray-90', className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
));
ModalTitle.displayName = 'ModalTitle';

export const ModalBody = React.forwardRef<
  // ModalBody 컴포넌트 (Modal 콘텐츠 영역)
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-4 text-krds-gray-70', className)}
    {...props}
  />
));
ModalBody.displayName = 'ModalBody';

export const ModalFooter = React.forwardRef<
  // ModalFooter 컴포넌트 (액션 버튼 영역)
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-6 flex justify-end gap-2', className)}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

export const ModalDescription = React.forwardRef<
  // ModalDescription 컴포넌트 (Dialog.Description, ARIA)
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-krds-gray-60', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';
