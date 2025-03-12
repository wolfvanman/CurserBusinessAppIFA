'use client';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

interface FormFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  className?: string;
  rows?: number;
}

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  options,
  required = false,
  className,
  rows,
}: FormFieldProps) => {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === 'select' && options) {
            return (
              <Select
                id={name}
                options={options}
                error={error}
                {...field}
              />
            );
          } else if (type === 'textarea') {
            return (
              <Textarea
                id={name}
                placeholder={placeholder}
                error={error}
                rows={rows || 4}
                {...field}
              />
            );
          } else {
            return (
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                error={error}
                {...field}
              />
            );
          }
        }}
      />
    </div>
  );
}; 