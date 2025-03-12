'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action && (
        <div className="mt-3 sm:mt-0 sm:ml-4">
          {action.href ? (
            <Link href={action.href}>
              <Button
                variant="default"
                size="sm"
              >
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={action.onClick}
              variant="default"
              size="sm"
            >
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}; 