import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Breadcrumb Props Interface
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Custom separator between items
   * @default ">"
   */
  separator?: React.ReactNode;

  /**
   * Additional className for nav element
   */
  className?: string;

  /**
   * Breadcrumb items
   */
  children: React.ReactNode;
}

/**
 * Breadcrumb Item Props Interface
 */
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * Link href (if not current page)
   */
  href?: string;

  /**
   * Whether this is the current page
   */
  current?: boolean;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Item content
   */
  children: React.ReactNode;
}

/**
 * Breadcrumb Context
 */
interface BreadcrumbContextValue {
  separator: React.ReactNode;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextValue>({
  separator: '>',
});

/**
 * Breadcrumb Component
 *
 * KRDS-compliant breadcrumb navigation with accessibility
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">홈</BreadcrumbItem>
 *   <BreadcrumbItem href="/notice">공지사항</BreadcrumbItem>
 *   <BreadcrumbItem current>상세보기</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '>', className, children, ...props }, ref) => {
    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="breadcrumb"
          className={cn('text-sm', className)}
          {...props}
        >
          <ol className="flex items-center flex-wrap gap-2">{children}</ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

/**
 * Breadcrumb Item Component
 */
export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ href, current, className, children, ...props }, ref) => {
  const { separator } = React.useContext(BreadcrumbContext);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        setIsOverflowing(
          textRef.current.scrollWidth > textRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  const content = (
    <span
      ref={textRef}
      className={cn(
        'max-w-[200px] truncate inline-block align-middle',
        isOverflowing && 'cursor-help'
      )}
      title={isOverflowing ? String(children) : undefined}
    >
      {children}
    </span>
  );

  return (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    >
      {href && !current ? (
        <a
          href={href}
          className={cn(
            'text-gray-600 hover:text-[#256ef4] transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-[#256ef4] rounded px-1'
          )}
        >
          {content}
        </a>
      ) : (
        <span
          className={cn(
            current
              ? 'text-gray-900 font-medium'
              : 'text-gray-600 cursor-default'
          )}
          aria-current={current ? 'page' : undefined}
        >
          {content}
        </span>
      )}

      {/* Separator - hide for last item */}
      <span
        className="text-gray-400 select-none last:hidden"
        aria-hidden="true"
      >
        {separator}
      </span>
    </li>
  );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';
