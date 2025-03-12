'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-900 border-gray-200',
        info: 'bg-blue-50 text-blue-900 border-blue-200',
        success: 'bg-green-50 text-green-900 border-green-200',
        warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
        error: 'bg-red-50 text-red-900 border-red-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, title, children, icon, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <div className="flex items-start">
          {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
          <div className="flex-1">
            {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
            <div className="text-sm">{children}</div>
          </div>
          {onClose && (
            <button
              type="button"
              className="ml-3 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert'; 