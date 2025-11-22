'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Link Variants Definition
 */
const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-[#256ef4] hover:text-[#0b50d0] active:text-[#083891] focus-visible:ring-[#256ef4]',
        muted:
          'text-gray-600 hover:text-gray-900 active:text-gray-950 focus-visible:ring-gray-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * Whether the link is external (opens in a new tab)
   */
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, className }))}
        {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
        {...props}
      />
    );
  }
);

Link.displayName = 'Link';

export { Link, linkVariants };
