'use client';

import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Modal Size Variants
 */
const modalSizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
} as const;

/**
 * Modal Props Interface
 */
export interface ModalProps {
  /**
   * Control modal visibility
   */
  open: boolean;

  /**
   * Callback when modal should close
   */
  onClose: (value: boolean) => void;

  /**
   * Modal size
   * @default "md"
   */
  size?: keyof typeof modalSizes;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Additional className for modal panel
   */
  className?: string;
}

/**
 * Modal Component
 *
 * **Foundation Layer Features:**
 * - Focus Management: Auto focus trap + focus restoration on close
 * - ARIA Automation: role="dialog", aria-modal="true" (via Headless UI)
 * - Keyboard Navigation: ESC to close, Tab/Shift+Tab cyclic navigation
 * - WCAG 2.1 / KWCAG 2.2 Compliance: Focus Order, No Keyboard Trap, Meaningful Sequence
 *
 * **KRDS Standards:**
 * - Focus moves to modal or first interactive element when opened
 * - Focus returns to opening button when closed
 * - Focus remains within modal (keyboard trap) while active
 * - Close button positioned as final element for sequential navigation
 * - ESC key closes modal if close button present
 * - Tab wraps from last to first element (cyclic navigation)
 * - Overlay prevents base window interaction
 *
 * **Modal Structure:**
 * - Overlay: Visual separator between modal and base window
 * - Header: Title and description (ModalTitle)
 * - Close Button: Optional X icon (ModalCloseButton)
 * - Body: Content area (ModalBody)
 * - Footer: Action buttons (ModalFooter)
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal open={isOpen} onClose={setIsOpen}>
 *   <ModalTitle>제목</ModalTitle>
 *   <ModalBody>
 *     내용
 *   </ModalBody>
 *   <ModalFooter>
 *     <Button onClick={() => setIsOpen(false)}>확인</Button>
 *   </ModalFooter>
 *   <ModalCloseButton onClick={() => setIsOpen(false)} />
 * </Modal>
 * ```
 */
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, size = 'md', children, className }, ref) => {
    return (
      <Transition show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Backdrop */}
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* Modal Container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={ref}
                  className={cn(
                    'w-full',
                    modalSizes[size],
                    'transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all',
                    className
                  )}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);
Modal.displayName = 'Modal';

/**
 * Modal Title Component
 *
 * **Foundation Layer:**
 * - Auto-applies as Dialog.Title for ARIA labeling
 * - Semantic h3 heading
 */
export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <Dialog.Title
    as="h3"
    ref={ref}
    className={cn(
      'text-lg font-medium leading-6 text-gray-900 dark:text-gray-100',
      className
    )}
    {...props}
  >
    {children}
  </Dialog.Title>
));
ModalTitle.displayName = 'ModalTitle';

/**
 * Modal Body Component
 *
 * **Foundation Layer:**
 * - Content area for modal information and components
 */
export const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-4 text-sm text-gray-700 dark:text-gray-300', className)}
    {...props}
  />
));
ModalBody.displayName = 'ModalBody';

/**
 * Modal Footer Component
 */
export const ModalFooter = React.forwardRef<
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

/**
 * Modal Close Button Component
 *
 * **Foundation Layer:**
 * - Positioned as final element for KRDS sequential navigation
 * - Screen reader label "닫기"
 * - Focus ring for keyboard accessibility
 * - X icon with aria-hidden
 *
 * **KRDS Note:**
 * Close button must be marked up as the final modal element
 * to prevent users from missing body content during Tab navigation
 */
export const ModalCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'absolute right-4 top-4 rounded-md p-1',
      'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      className
    )}
    {...props}
  >
    <span className="sr-only">닫기</span>
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
));
ModalCloseButton.displayName = 'ModalCloseButton';
